import * as Notifications from 'expo-notifications';
import { Habit } from '../types/Habit';

class NotificationService {
  async scheduleHabitReminder(habit: Habit): Promise<string | null> {
    if (!habit.reminderEnabled || !habit.reminderTime) {
      return null;
    }

    try {
      // Parse reminder time (HH:MM format)
      const [hours, minutes] = habit.reminderTime.split(':').map(Number);

      const trigger: any = {
        hour: hours,
        minute: minutes,
        repeats: true,
      };

      // For weekly habits, schedule on specific days
      if (habit.schedule.frequency === 'weekly' && habit.schedule.daysOfWeek) {
        // Note: This would need to schedule multiple notifications, one for each day
        // For simplicity, we'll schedule daily and check in the handler
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏰ Habit Reminder',
          body: `Time for: ${habit.title}`,
          data: { habitId: habit.id },
          sound: true,
        },
        trigger,
      });

      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  }

  async cancelHabitReminder(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
    }
  }

  async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }
}

export default new NotificationService();
