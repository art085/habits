import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useHabits } from '../contexts/HabitContext';
import { COLORS } from '../utils/colors';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay,
  startOfWeek,
  addMonths,
  subMonths,
} from 'date-fns';
// Victory Native charts removed due to compatibility issues

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const { habits, completions } = useHabits();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate completion stats for selected month
  const monthStats = useMemo(() => {
    const monthCompletions = completions.filter(c => {
      const date = new Date(c.date);
      return date >= monthStart && date <= monthEnd && c.completed;
    });

    const totalPossible = habits.length * daysInMonth.length;
    const completed = monthCompletions.length;
    const percentage = totalPossible > 0 ? (completed / totalPossible) * 100 : 0;

    // Days with at least one completion
    const activeDays = new Set(monthCompletions.map(c => c.date)).size;

    return {
      completed,
      totalPossible,
      percentage: Math.round(percentage),
      activeDays,
    };
  }, [completions, habits, monthStart, monthEnd, daysInMonth]);

  // Weekly data for chart
  const weeklyData = useMemo(() => {
    const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = weeks.map((day, index) => {
      const dayCompletions = completions.filter(c => {
        const date = new Date(c.date);
        const dayOfWeek = date.getDay();
        // Convert Sunday from 0 to 6
        const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        return adjustedDay === index && c.completed;
      });
      return {
        day,
        completions: dayCompletions.length,
      };
    });
    return data;
  }, [completions]);

  // Habit breakdown
  const habitBreakdown = useMemo(() => {
    return habits.map(habit => {
      const habitCompletions = completions.filter(
        c => c.habitId === habit.id && c.completed
      ).length;
      return {
        habit: habit.title,
        completions: habitCompletions,
        color: habit.color,
      };
    });
  }, [habits, completions]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedMonth(subMonths(selectedMonth, 1));
    } else {
      setSelectedMonth(addMonths(selectedMonth, 1));
    }
  };

  const getCompletionColor = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayOfWeek = date.getDay();
    
    // Filter habits that should be done on this day
    const habitsForDay = habits.filter(habit => {
      if (habit.schedule.frequency === 'daily') return true;
      if (habit.schedule.frequency === 'weekly') {
        return habit.schedule.daysOfWeek?.includes(dayOfWeek);
      }
      return habit.schedule.customDays?.includes(dateStr);
    });
    
    if (habitsForDay.length === 0) return COLORS.border;
    
    const dayCompletions = completions.filter(
      c => c.date === dateStr && c.completed
    );
    
    const completedCount = dayCompletions.length;
    if (completedCount === 0) return COLORS.border;
    if (completedCount >= habitsForDay.length) return COLORS.success;
    if (completedCount >= habitsForDay.length / 2) return '#FCD34D';
    return '#FCA5A5';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
      </View>

      {/* Monthly Stats Card */}
      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>This Month</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{monthStats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{monthStats.percentage}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{monthStats.activeDays}</Text>
            <Text style={styles.statLabel}>Active Days</Text>
          </View>
        </View>
      </View>

      {/* Calendar Heatmap */}
      <View style={styles.card}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => navigateMonth('prev')}>
            <Text style={styles.navButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {format(selectedMonth, 'MMMM yyyy')}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth('next')}>
            <Text style={styles.navButton}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendar}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <View key={i} style={styles.calendarDayHeader}>
              <Text style={styles.calendarDayHeaderText}>{day}</Text>
            </View>
          ))}
          
          {/* Empty cells for padding */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.calendarDay} />
          ))}
          
          {daysInMonth.map(date => (
            <View
              key={date.toISOString()}
              style={[
                styles.calendarDay,
                { backgroundColor: getCompletionColor(date) },
              ]}
            >
              <Text style={[
                styles.calendarDayText,
                isSameDay(date, new Date()) && styles.todayText,
              ]}>
                {format(date, 'd')}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.border }]} />
            <Text style={styles.legendText}>None</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FCA5A5' }]} />
            <Text style={styles.legendText}>Few</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FCD34D' }]} />
            <Text style={styles.legendText}>Some</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
            <Text style={styles.legendText}>All</Text>
          </View>
        </View>
      </View>

      {/* Weekly Activity Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Activity</Text>
        <View style={styles.weeklyGrid}>
          {weeklyData.map((item, index) => (
            <View key={index} style={styles.weeklyItem}>
              <Text style={styles.weeklyDay}>{item.day}</Text>
              <View style={[styles.weeklyBar, { height: Math.max(item.completions * 10, 10) }]} />
              <Text style={styles.weeklyCount}>{item.completions}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Habit Breakdown */}
      {habitBreakdown.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Habit Breakdown</Text>
          {habitBreakdown.map((item, index) => (
            <View key={index} style={styles.habitItem}>
              <View style={styles.habitItemInfo}>
                <View style={[styles.habitDot, { backgroundColor: item.color }]} />
                <Text style={styles.habitItemText}>{item.habit}</Text>
              </View>
              <Text style={styles.habitItemCount}>{item.completions}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    fontSize: 24,
    color: COLORS.primary,
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayHeader: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDayHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  calendarDay: {
    width: '13%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: '0.5%',
    marginVertical: 2,
  },
  calendarDayText: {
    fontSize: 12,
    color: COLORS.text,
  },
  todayText: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  habitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  habitItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  habitItemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  habitItemCount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: 20,
  },
  weeklyItem: {
    alignItems: 'center',
    flex: 1,
  },
  weeklyDay: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  weeklyBar: {
    width: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    marginBottom: 4,
  },
  weeklyCount: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '600',
  },
});
