import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import ProgressBar from './ProgressBar';

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  showBackButton?: boolean;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ 
  currentStep, 
  totalSteps, 
  onBack,
  showBackButton = true
}) => {
  const { isDark } = useTheme();

  return (
    <View className="w-full px-4 py-4">
      <View className="flex-row items-center mb-4">
        {showBackButton && (
          <TouchableOpacity onPress={onBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
        )}
      </View>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </View>
  );
};

export default OnboardingHeader;