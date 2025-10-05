# 📱 App Flow & Screen Navigation

## Visual App Structure

```
┌─────────────────────────────────────────┐
│         Smart Habits App                │
│                                         │
│  ┌────────────────────────────────┐    │
│  │     Bottom Tab Navigator       │    │
│  │  [🏠] [📊] [🏆] [📋]           │    │
│  └────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Screen Flow

### 1. 🏠 Home Screen (Default)
```
┌─────────────────────────────────┐
│ Hello! 👋                       │
│ Wednesday, October 5            │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │  🔥 Streak    ⭐ Points    │ │
│ │      7          150         │ │
│ │                             │ │
│ │  ✅ Today: 3/5              │ │
│ │  [████████░░] 60%           │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Today's Habits                  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 💪 Morning Exercise      ☐  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 📚 Read 20 pages         ☑  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 💧 Drink water           ☐  │ │
│ └─────────────────────────────┘ │
│                                 │
│                         [  +  ] │ ← Floating button
└─────────────────────────────────┘
```

**Actions**:
- Tap habit → Toggle completion
- Tap + button → Open Add Habit modal
- Checkboxes animate on tap

---

### 2. 📊 Progress Screen
```
┌─────────────────────────────────┐
│ Progress                        │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ This Month                  │ │
│ │  15      75%      20        │ │
│ │ Completed  Rate  Active Days│ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │  ←  October 2025  →         │ │
│ │                             │ │
│ │  S M T W T F S              │ │
│ │  ░ ░ 1 2 3 4 5              │ │
│ │  6 █ █ ░ █ █ █              │ │ ← Heatmap
│ │  █ █ ░ █ █ █ █              │ │
│ │ ...                         │ │
│ │                             │ │
│ │ □ None  □ Few  □ Some  ■ All│ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Weekly Activity                 │
│  ┌───────────────────────────┐ │
│  │ [Bar Chart]               │ │ ← Victory chart
│  └───────────────────────────┘ │
├─────────────────────────────────┤
│ Habit Breakdown                 │
│  • Morning Exercise      12    │
│  • Read 20 pages         10    │
│  • Drink water            8    │
└─────────────────────────────────┘
```

**Features**:
- Color-coded calendar heatmap
- Navigate months with arrows
- Today highlighted
- Statistics update in real-time

---

### 3. 🏆 Achievements Screen
```
┌─────────────────────────────────┐
│ Achievements                    │
│ 2 of 6 unlocked                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │  🔥    ⭐    🏆             │ │
│ │   7    150    10            │ │
│ │ Streak Points Best          │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Your Badges                     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🎯 Getting Started      ✓   │ │ ← Unlocked
│ │ Create your first habit     │ │
│ │ Unlocked Oct 1, 2025        │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔥 7 Day Warrior            │ │ ← In progress
│ │ Maintain a 7-day streak     │ │
│ │ [████████░░] 7/7            │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 💯 Century Club             │ │ ← Locked
│ │ Earn 100 points             │ │
│ │ [████░░░░░░] 15/100         │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │      🌟 Keep Going!         │ │
│ │ Every habit completed...    │ │ ← Motivation
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

**Features**:
- Visual progress bars
- Unlock animations
- Real-time progress updates
- Motivational messages

---

### 4. 📋 Habits Screen
```
┌─────────────────────────────────┐
│ My Habits            [+ Add New]│
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 💪                          │ │
│ │ Morning Exercise            │ │
│ │ Start your day with energy  │ │
│ │                             │ │
│ │ Every day      ✓ 12 times   │ │
│ │                             │ │
│ │ [ Edit ]      [ Delete ]    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📚                          │ │
│ │ Read 20 pages               │ │
│ │ Expand your knowledge       │ │
│ │                             │ │
│ │ Mon, Wed, Fri  ✓ 10 times   │ │
│ │                             │ │
│ │ [ Edit ]      [ Delete ]    │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

**Actions**:
- Tap "Edit" → Open edit modal
- Tap "Delete" → Confirmation dialog
- Tap "+ Add New" → Create new habit

---

### 5. ➕ Add/Edit Habit Modal
```
┌─────────────────────────────────┐
│ [Cancel]  New Habit      [Save] │
├─────────────────────────────────┤
│ Habit Name                      │
│ ┌─────────────────────────────┐ │
│ │ Morning Exercise            │ │
│ └─────────────────────────────┘ │
│                                 │
│ Description (Optional)          │
│ ┌─────────────────────────────┐ │
│ │ 30 minutes of exercise...   │ │
│ └─────────────────────────────┘ │
│                                 │
│ Choose an Icon                  │
│ [💪] [📚] [🏃] [🧘] [💧] ...   │ ← Horizontal scroll
│                                 │
│ Choose a Color                  │
│ (🔴) (🔵) (🟢) (🟡) (🟣) ...   │ ← Grid
│                                 │
│ Frequency                       │
│ [Every Day] [Specific Days]     │ ← Toggle buttons
│                                 │
│ Select Days                     │
│ [S] [M] [T] [W] [T] [F] [S]    │ ← Day selector
│  ☐   ☑   ☑   ☑   ☐   ☐   ☐     │
└─────────────────────────────────┘
```

**Interactions**:
- Tap icon → Select icon
- Tap color → Select color
- Tap frequency → Switch mode
- Tap days → Toggle selection
- Cancel → Discard changes
- Save → Create/update habit

---

## User Journey Examples

### New User Flow
```
1. Launch app
   ↓
2. See empty home screen
   "No habits for today"
   ↓
3. Tap "+ Add Your First Habit"
   ↓
4. Fill in habit details
   - Name: "Morning Exercise"
   - Icon: 💪
   - Color: Red
   - Frequency: Every day
   ↓
5. Tap Save
   ↓
6. Return to home with new habit
   ↓
7. Tap habit to mark complete
   ↓
8. See animation + progress update
   ↓
9. Earn first achievement! 🎯
```

### Daily Usage Flow
```
1. Open app in morning
   ↓
2. See today's habits
   ↓
3. Complete habits throughout day
   - Tap to check off
   - Watch progress bar fill
   ↓
4. Check Progress tab
   - See calendar fill in
   - Watch stats grow
   ↓
5. Check Achievements
   - See progress toward next badge
   - Stay motivated!
```

### Habit Management Flow
```
1. Go to Habits tab
   ↓
2. View all habits
   ↓
3. Tap Edit on a habit
   ↓
4. Update details
   - Change icon/color
   - Modify schedule
   ↓
5. Save changes
   ↓
   OR
   ↓
6. Tap Delete
   ↓
7. Confirm deletion
   ↓
8. Habit removed (with completions)
```

---

## Navigation Paths

```
Home → Add Habit (Modal) → Save → Back to Home
Home → Tap on habit → Toggle completion (stays on Home)

Progress → (View only, no actions)

Achievements → (View only, no actions)

Habits → Add New → Add Habit (Modal) → Save → Back to Habits
Habits → Edit → Add Habit (Modal) → Save → Back to Habits
Habits → Delete → Confirmation → Back to Habits
```

---

## State Updates Flow

```
User Action
    ↓
Context Update
    ↓
AsyncStorage Write
    ↓
State Refresh
    ↓
UI Re-render
    ↓
User Sees Change
```

**Real-time Updates**:
- Habit completion → Progress bar updates
- Points increase → Stats update everywhere
- Streak builds → All streak displays update
- Achievement unlocked → Badge shows unlocked

---

## Key Interactions

### Home Screen
- **Tap habit**: Checkbox animates, completes habit
- **Tap +**: Modal slides up
- **Scroll**: View all today's habits

### Progress Screen
- **Tap ←/→**: Navigate months
- **View heatmap**: See completion patterns
- **Scroll**: View all statistics

### Achievements Screen
- **Scroll**: View all achievements
- **Progress bars**: Visual feedback

### Habits Screen
- **Tap Edit**: Open edit modal
- **Tap Delete**: Show confirmation
- **Tap + Add New**: Open create modal

### Add/Edit Screen
- **Tap Cancel**: Discard and close
- **Tap Save**: Validate and save
- **Select options**: Immediate visual feedback

---

**This flow ensures intuitive navigation and a delightful user experience! ✨**
