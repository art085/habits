export interface Habit {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  schedule: {
    frequency: 'daily' | 'weekly' | 'custom';
    daysOfWeek?: number[]; // 0-6, Sunday = 0
    customDays?: string[]; // ISO date strings for custom schedule
  };
  createdAt: string;
  reminderTime?: string; // HH:MM format
  reminderEnabled: boolean;
}

export interface HabitCompletion {
  habitId: string;
  date: string; // ISO date string
  completed: boolean;
  timestamp: string;
}

export interface UserStats {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export const ACHIEVEMENTS_CONFIG: Omit<Achievement, 'unlockedAt' | 'progress'>[] = [
  {
    id: 'first_habit',
    title: 'Getting Started',
    description: 'Create your first habit',
    icon: '🎯',
    maxProgress: 1,
  },
  {
    id: 'streak_7',
    title: '7 Day Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    maxProgress: 7,
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '⭐',
    maxProgress: 30,
  },
  {
    id: 'points_100',
    title: 'Century Club',
    description: 'Earn 100 points',
    icon: '💯',
    maxProgress: 100,
  },
  {
    id: 'points_500',
    title: 'High Achiever',
    description: 'Earn 500 points',
    icon: '👑',
    maxProgress: 500,
  },
  {
    id: 'complete_50',
    title: 'Consistency King',
    description: 'Complete habits 50 times',
    icon: '🏆',
    maxProgress: 50,
  },
];
