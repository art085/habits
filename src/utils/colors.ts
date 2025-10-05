export const HABIT_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Salmon
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#85C1E2', // Sky Blue
  '#F8B500', // Orange
  '#2ECC71', // Green
];

export const HABIT_ICONS = [
  '💪', '📚', '🏃', '🧘', '💧', '🎨', '🎵', '✍️', 
  '🌱', '🎯', '🔬', '📝', '🏋️', '🎸', '👨‍💻', '🍎',
  '😊', '🌟', '⚡', '🚀', '🎓', '💼', '🏆', '❤️',
];

export const COLORS = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  disabled: '#D1D5DB',
};

export const getColorOpacity = (color: string, opacity: number): string => {
  // Simple opacity for hex colors
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `${color}${alpha}`;
};
