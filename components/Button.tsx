import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../app/context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left'
}) => {
  const { theme, isDarkMode } = useTheme();

  // Button background styles based on variant
  const getBackgroundClass = () => {
    if (disabled) return isDarkMode ? 'bg-gray-700' : 'bg-gray-300';
    
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
      case 'outline':
        return 'bg-transparent';
      case 'text':
        return 'bg-transparent';
      default:
        return 'bg-primary';
    }
  };

  // Button border styles based on variant
  const getBorderClass = () => {
    if (variant === 'outline') {
      return disabled 
        ? isDarkMode ? 'border border-gray-700' : 'border border-gray-300'
        : 'border border-primary';
    }
    return '';
  };

  // Button text color based on variant
  const getTextColorClass = () => {
    if (disabled) return isDarkMode ? 'text-gray-500' : 'text-gray-500';
    
    switch (variant) {
      case 'primary':
        return 'text-white';
      case 'secondary':
        return isDarkMode ? 'text-white' : 'text-gray-800';
      case 'outline':
        return 'text-primary';
      case 'text':
        return 'text-primary';
      default:
        return 'text-white';
    }
  };

  // Button padding based on size
  const getPaddingClass = () => {
    switch (size) {
      case 'small':
        return 'py-1.5 px-3';
      case 'medium':
        return 'py-2.5 px-5';
      case 'large':
        return 'py-3.5 px-7';
      default:
        return 'py-2.5 px-5';
    }
  };

  // Button text size based on size
  const getTextSizeClass = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  // Width class
  const getWidthClass = () => {
    return fullWidth ? 'w-full' : '';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-xl flex-row items-center justify-center ${getBackgroundClass()} ${getBorderClass()} ${getPaddingClass()} ${getWidthClass()}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : theme.colors.primary} 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text 
            className={`font-semibold ${getTextColorClass()} ${getTextSizeClass()} ${icon && iconPosition === 'left' ? 'ml-2' : ''} ${icon && iconPosition === 'right' ? 'mr-2' : ''}`}
            style={textStyle}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;