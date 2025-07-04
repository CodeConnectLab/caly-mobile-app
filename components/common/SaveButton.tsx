import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface SaveButtonProps {
  onPress: () => void;
  label?: string;
  className?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ 
  onPress, 
  label = 'Save', 
  className = ''
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`bg-primary py-4 rounded-xl items-center justify-center ${className}`}
    >
      <Text className="text-white font-bold text-lg">{label}</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;