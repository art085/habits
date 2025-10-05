# 🎯 Smart Habits App

A beautiful and intuitive mobile application for tracking and building habits, built with Expo Go and React Native. Focus on excellent UX and gamification features to help users maintain consistency and achieve their goals.

## ✨ Features

### 📝 Habit Management
- **Create & Edit Habits**: Add custom habits with titles, descriptions, icons, and colors
- **Flexible Scheduling**: Daily, weekly, or custom schedules for each habit
- **Easy Tracking**: Quick one-tap completion marking with satisfying animations

### 📊 Progress Visualization
- **Calendar Heatmap**: Visual representation of your habit completion history
- **Statistics Dashboard**: Track completion rates, active days, and trends
- **Weekly Charts**: See your activity patterns throughout the week
- **Habit Breakdown**: Individual statistics for each habit

### 🎮 Gamification & Motivation
- **Points System**: Earn 10 points for each completed habit
- **Streak Tracking**: Build and maintain daily streaks for consistency
- **Achievements**: Unlock badges for reaching milestones:
  - 🎯 Getting Started - Create your first habit
  - 🔥 7 Day Warrior - Maintain a 7-day streak
  - ⭐ Monthly Master - Maintain a 30-day streak
  - 💯 Century Club - Earn 100 points
  - 👑 High Achiever - Earn 500 points
  - 🏆 Consistency King - Complete habits 50 times

### 🔔 Notifications
- Push notification support for habit reminders
- Customizable reminder times (foundation implemented)

### 🎨 Beautiful UI/UX
- Modern, clean interface with smooth animations
- Color-coded habits for easy identification
- Emoji icons for personality and visual appeal
- Responsive design optimized for mobile
- Intuitive navigation with bottom tabs
- Dark shadows and elevation for depth

## 🛠️ Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: React Context API
- **Data Storage**: AsyncStorage
- **Charts**: Victory Native
- **Notifications**: Expo Notifications
- **Date Utilities**: date-fns

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Expo Go app on your mobile device

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd habits
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on your device**:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

## 📱 App Structure

```
habits/
├── src/
│   ├── contexts/
│   │   └── HabitContext.tsx          # Global state management
│   ├── navigation/
│   │   └── AppNavigator.tsx          # Navigation setup
│   ├── screens/
│   │   ├── HomeScreen.tsx            # Today's habits overview
│   │   ├── ProgressScreen.tsx        # Calendar & statistics
│   │   ├── AchievementsScreen.tsx    # Badges & motivation
│   │   ├── HabitsScreen.tsx          # Manage all habits
│   │   └── AddHabitScreen.tsx        # Create/edit habits
│   ├── services/
│   │   ├── StorageService.ts         # AsyncStorage operations
│   │   └── NotificationService.ts    # Push notifications
│   ├── types/
│   │   └── Habit.ts                  # TypeScript interfaces
│   └── utils/
│       └── colors.ts                 # Theme & constants
├── App.tsx                           # Root component
└── package.json
```

## 🎯 Key Features Explained

### Home Screen
- Displays today's scheduled habits
- Shows current streak, total points, and daily progress
- Quick completion toggle with animations
- Empty state for new users
- Floating action button for adding habits

### Progress Screen
- Monthly calendar heatmap with color-coded completion levels
- Stats overview (completed, success rate, active days)
- Weekly activity bar chart
- Individual habit breakdown
- Month navigation

### Achievements Screen
- Visual badge system with unlock animations
- Progress bars for locked achievements
- Stats overview (streak, points, best streak)
- Motivational messages

### Habits Screen
- List of all habits with details
- Edit and delete functionality
- Completion statistics per habit
- Schedule information display

### Add/Edit Habit Screen
- Custom title and description
- Icon selector (24 emoji options)
- Color picker (10 vibrant colors)
- Frequency selection (daily/weekly)
- Day-of-week selector for weekly habits
- Clean, modal-style interface

## 💾 Data Persistence

All data is stored locally using AsyncStorage:
- **Habits**: Full habit configurations
- **Completions**: Historical completion records
- **User Stats**: Points, streaks, and achievements

Data persists across app restarts and is automatically calculated on load.

## 🎨 Design Principles

1. **Simplicity**: Easy to use with minimal friction
2. **Visual Feedback**: Animations and colors for user actions
3. **Consistency**: Unified design language throughout
4. **Motivation**: Gamification to encourage habit building
5. **Accessibility**: Clear typography and sufficient contrast

## 🔮 Future Enhancements

- [ ] Full notification scheduling with time pickers
- [ ] Habit notes and journal entries
- [ ] Data export/import functionality
- [ ] Social features and habit sharing
- [ ] Habit templates and suggestions
- [ ] Custom achievement creation
- [ ] Dark mode support
- [ ] Widget support
- [ ] Cloud sync across devices
- [ ] Habit analytics and insights

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using Expo and React Native**

Happy habit building! 🌟
