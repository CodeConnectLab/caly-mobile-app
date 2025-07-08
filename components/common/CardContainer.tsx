import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface CardContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CardContainer: React.FC<CardContainerProps> = ({ children, style }) => {
  const { isDark } = useTheme();

  return (
    <View 
      className={`p-4 rounded-xl ${isDark ? 'bg-darkCard' : 'bg-white'}`}
      style={style}
    >
      {children}
    </View>
  );
};

export default CardContainer;