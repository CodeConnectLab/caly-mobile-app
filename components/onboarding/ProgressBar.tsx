import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const { isDark } = useTheme();
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <View className="w-full h-1 bg-lightGray rounded-full overflow-hidden">
      <View 
        className="h-full bg-primary rounded-full" 
        style={{ width: `${progress}%` }} 
      />
    </View>
  );
};

export default ProgressBar;