import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useHabits } from '../contexts/HabitContext';
import { COLORS } from '../utils/colors';
import { Habit } from '../types/Habit';

export default function HabitsScreen({ navigation }: any) {
  const { habits, deleteHabit, completions } = useHabits();

  const handleDeleteHabit = (habit: Habit) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${habit.title}"? This action cannot be undone.`
      );
      if (confirmed) {
        deleteHabit(habit.id);
      }
    } else {
      Alert.alert(
        'Delete Habit',
        `Are you sure you want to delete "${habit.title}"? This action cannot be undone.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await deleteHabit(habit.id);
            },
          },
        ]
      );
    }
  };

  const getHabitStats = (habitId: string) => {
    const habitCompletions = completions.filter(
      c => c.habitId === habitId && c.completed
    );
    return habitCompletions.length;
  };

  const getScheduleText = (habit: Habit) => {
    if (habit.schedule.frequency === 'daily') {
      return 'Every day';
    }
    if (habit.schedule.frequency === 'weekly' && habit.schedule.daysOfWeek) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const selectedDays = habit.schedule.daysOfWeek.map(d => days[d]);
      return selectedDays.join(', ');
    }
    return 'Custom schedule';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Habits</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddHabit')}
        >
          <Text style={styles.addButtonText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {habits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📋</Text>
            <Text style={styles.emptyStateText}>No habits yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Create your first habit to get started on your journey!
            </Text>
          </View>
        ) : (
          habits.map(habit => (
            <View key={habit.id} style={styles.habitCard}>
              <View style={[styles.habitIcon, { backgroundColor: habit.color + '20' }]}>
                <Text style={styles.habitIconText}>{habit.icon}</Text>
              </View>

              <View style={styles.habitInfo}>
                <Text style={styles.habitTitle}>{habit.title}</Text>
                {habit.description && (
                  <Text style={styles.habitDescription} numberOfLines={2}>
                    {habit.description}
                  </Text>
                )}
                <View style={styles.habitMeta}>
                  <Text style={styles.habitSchedule}>{getScheduleText(habit)}</Text>
                  <Text style={styles.habitStats}>
                    ✓ {getHabitStats(habit.id)} times
                  </Text>
                </View>
              </View>

              <View style={styles.habitActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('AddHabit', { habit })}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteHabit(habit)}
                >
                  <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  habitCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  habitIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  habitIconText: {
    fontSize: 28,
  },
  habitInfo: {
    marginBottom: 12,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  habitDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  habitMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitSchedule: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  habitStats: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },
  habitActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.danger + '15',
  },
  deleteButtonText: {
    color: COLORS.danger,
  },
});
