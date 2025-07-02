// Theme configuration for the app

export const COLORS = {
  primary: '#FF6B00',
  secondary: '#FFE1CC',
  background: '#FFFFFF',
  text: '#1A1A1A',
  gray: {
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const FONT = {
  regular: 'System',
  medium: 'System-Medium',
  semibold: 'System-Semibold',
  bold: 'System-Bold',
};

export const SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  xxxxl: 30,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
  },
};

// Theme object that combines all theme elements
const theme = {
  colors: COLORS,
  fonts: FONT,
  sizes: SIZES,
  spacing: SPACING,
  shadows: SHADOWS,
  // Add dark mode support
  dark: {
    colors: {
      ...COLORS,
      background: '#121212',
      text: '#FFFFFF',
      primary: '#FF8533',
      secondary: '#663D1A',
      gray: {
        100: '#171717',
        200: '#262626',
        300: '#404040',
        400: '#525252',
        500: '#737373',
        600: '#A3A3A3',
        700: '#D4D4D4',
        800: '#E5E5E5',
        900: '#F5F5F5',
      },
    },
  },
};

export default theme;