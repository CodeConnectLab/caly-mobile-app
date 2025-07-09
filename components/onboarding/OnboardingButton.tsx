import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface OnboardingButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  isPrimary?: boolean;
}

const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  label,
  onPress,
  disabled = false,
  isPrimary = true
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`py-4 px-6 rounded-xl w-full items-center justify-center ${isPrimary ? 'bg-primary' : 'bg-gray-200'} ${disabled ? 'opacity-50' : ''}`}
    >
      <Text className={`font-bold text-lg ${isPrimary ? 'text-white' : 'text-gray-800'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default OnboardingButton;