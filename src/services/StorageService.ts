import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, HabitCompletion, UserStats, Achievement, ACHIEVEMENTS_CONFIG } from '../types/Habit';

const STORAGE_KEYS = {
  HABITS: '@habits',
  COMPLETIONS: '@completions',
  USER_STATS: '@user_stats',
};

class StorageService {
  // Habits
  async getHabits(): Promise<Habit[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting habits:', error);
      return [];
    }
  }

  async saveHabit(habit: Habit): Promise<void> {
    try {
      const habits = await this.getHabits();
      const existingIndex = habits.findIndex(h => h.id === habit.id);
      
      if (existingIndex >= 0) {
        habits[existingIndex] = habit;
      } else {
        habits.push(habit);
      }
      
      await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habit:', error);
      throw error;
    }
  }

  async deleteHabit(habitId: string): Promise<void> {
    try {
      const habits = await this.getHabits();
      const filtered = habits.filter(h => h.id !== habitId);
      await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(filtered));
      
      // Also delete associated completions
      const completions = await this.getCompletions();
      const filteredCompletions = completions.filter(c => c.habitId !== habitId);
      await AsyncStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(filteredCompletions));
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  }

  // Completions
  async getCompletions(): Promise<HabitCompletion[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting completions:', error);
      return [];
    }
  }

  async toggleCompletion(habitId: string, date: string): Promise<void> {
    try {
      const completions = await this.getCompletions();
      const existingIndex = completions.findIndex(
        c => c.habitId === habitId && c.date === date
      );

      if (existingIndex >= 0) {
        completions[existingIndex].completed = !completions[existingIndex].completed;
        completions[existingIndex].timestamp = new Date().toISOString();
      } else {
        completions.push({
          habitId,
          date,
          completed: true,
          timestamp: new Date().toISOString(),
        });
      }

      await AsyncStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(completions));
      
      // Update stats after completion
      await this.updateStats();
    } catch (error) {
      console.error('Error toggling completion:', error);
      throw error;
    }
  }

  async isHabitCompleted(habitId: string, date: string): Promise<boolean> {
    try {
      const completions = await this.getCompletions();
      const completion = completions.find(
        c => c.habitId === habitId && c.date === date
      );
      return completion?.completed || false;
    } catch (error) {
      console.error('Error checking completion:', error);
      return false;
    }
  }

  // User Stats
  async getUserStats(): Promise<UserStats> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATS);
      if (data) {
        return JSON.parse(data);
      }
      
      // Initialize default stats
      const defaultStats: UserStats = {
        totalPoints: 0,
        currentStreak: 0,
        longestStreak: 0,
        achievements: ACHIEVEMENTS_CONFIG.map(a => ({
          ...a,
          progress: 0,
        })),
      };
      
      await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(defaultStats));
      return defaultStats;
    } catch (error) {
      console.error('Error getting user stats:', error);
      return {
        totalPoints: 0,
        currentStreak: 0,
        longestStreak: 0,
        achievements: [],
      };
    }
  }

  async updateStats(): Promise<void> {
    try {
      const completions = await this.getCompletions();
      const stats = await this.getUserStats();
      
      // Calculate total points (10 points per completion)
      const completedCount = completions.filter(c => c.completed).length;
      stats.totalPoints = completedCount * 10;
      
      // Calculate streaks
      const { currentStreak, longestStreak } = this.calculateStreaks(completions);
      stats.currentStreak = currentStreak;
      stats.longestStreak = Math.max(longestStreak, stats.longestStreak);
      
      // Update achievements
      stats.achievements = this.updateAchievements(stats, completedCount);
      
      await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  }

  private calculateStreaks(completions: HabitCompletion[]): { currentStreak: number; longestStreak: number } {
    if (completions.length === 0) return { currentStreak: 0, longestStreak: 0 };

    // Group completions by date
    const dateMap = new Map<string, boolean>();
    completions
      .filter(c => c.completed)
      .forEach(c => {
        dateMap.set(c.date, true);
      });

    const sortedDates = Array.from(dateMap.keys()).sort();
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate: Date | null = null;

    for (const dateStr of sortedDates) {
      const currentDate = new Date(dateStr);
      
      if (lastDate === null) {
        tempStreak = 1;
      } else {
        const daysDiff = Math.floor(
          (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysDiff === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      
      lastDate = currentDate;
    }
    
    longestStreak = Math.max(longestStreak, tempStreak);
    
    // Check if current streak is still active
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (lastDate) {
      const daysSinceLastCompletion = Math.floor(
        (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSinceLastCompletion <= 1) {
        currentStreak = tempStreak;
      } else {
        currentStreak = 0;
      }
    }

    return { currentStreak, longestStreak };
  }

  private updateAchievements(stats: UserStats, completedCount: number): Achievement[] {
    return stats.achievements.map(achievement => {
      let progress = achievement.progress;
      let unlockedAt = achievement.unlockedAt;

      switch (achievement.id) {
        case 'first_habit':
          progress = Math.min(1, completedCount > 0 ? 1 : 0);
          break;
        case 'streak_7':
          progress = Math.min(achievement.maxProgress, stats.currentStreak);
          break;
        case 'streak_30':
          progress = Math.min(achievement.maxProgress, stats.currentStreak);
          break;
        case 'points_100':
          progress = Math.min(achievement.maxProgress, stats.totalPoints);
          break;
        case 'points_500':
          progress = Math.min(achievement.maxProgress, stats.totalPoints);
          break;
        case 'complete_50':
          progress = Math.min(achievement.maxProgress, completedCount);
          break;
      }

      // Unlock achievement if completed
      if (progress >= achievement.maxProgress && !unlockedAt) {
        unlockedAt = new Date().toISOString();
      }

      return { ...achievement, progress, unlockedAt };
    });
  }
}

export default new StorageService();
