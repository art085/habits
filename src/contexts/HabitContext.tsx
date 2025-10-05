import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Habit, HabitCompletion, UserStats } from '../types/Habit';
import StorageService from '../services/StorageService';

interface HabitContextType {
  habits: Habit[];
  completions: HabitCompletion[];
  userStats: UserStats;
  loading: boolean;
  addHabit: (habit: Habit) => Promise<void>;
  updateHabit: (habit: Habit) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  toggleHabitCompletion: (habitId: string, date: string) => Promise<void>;
  isHabitCompleted: (habitId: string, date: string) => boolean;
  refreshData: () => Promise<void>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    achievements: [],
  });
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      setLoading(true);
      const [habitsData, completionsData, statsData] = await Promise.all([
        StorageService.getHabits(),
        StorageService.getCompletions(),
        StorageService.getUserStats(),
      ]);
      
      setHabits(habitsData);
      setCompletions(completionsData);
      setUserStats(statsData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addHabit = async (habit: Habit) => {
    await StorageService.saveHabit(habit);
    await refreshData();
  };

  const updateHabit = async (habit: Habit) => {
    await StorageService.saveHabit(habit);
    await refreshData();
  };

  const deleteHabit = async (habitId: string) => {
    await StorageService.deleteHabit(habitId);
    await refreshData();
  };

  const toggleHabitCompletion = async (habitId: string, date: string) => {
    await StorageService.toggleCompletion(habitId, date);
    await refreshData();
  };

  const isHabitCompleted = (habitId: string, date: string): boolean => {
    const completion = completions.find(
      c => c.habitId === habitId && c.date === date
    );
    return completion?.completed || false;
  };

  const value: HabitContextType = {
    habits,
    completions,
    userStats,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    isHabitCompleted,
    refreshData,
  };

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
