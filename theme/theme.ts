// Theme configuration with light and dark mode colors

export const lightTheme = {
  primary: '#2846D0',
  secondary: '#FFFFFF',
  lightBlue: '#AAB2FF',
  lightGray: '#EDEFFC',
  black: '#000000',
  carbs: '#FFAE38',
  fat: '#F45641',
  protein: '#72A91B',
  darkGray: '#BBBBBB',
  background: '#FFFFFF',
  text: '#000000',
};

export const darkTheme = {
  primary: '#3A5AE8',
  secondary: '#1A1A1A',
  lightBlue: '#8A94E8',
  lightGray: '#2A2A2A',
  black: '#FFFFFF',
  carbs: '#FFB84D',
  fat: '#FF6B59',
  protein: '#8BC034',
  darkGray: '#666666',
  background: '#121212',
  text: '#FFFFFF',
};

export type ThemeColors = typeof lightTheme;

export const getThemeColors = (isDark: boolean): ThemeColors => {
  return isDark ? darkTheme : lightTheme;
};