import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface SelectableOptionProps {
  name: string;
  value: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
  multiSelect?: boolean;
}

const SelectableOption: React.FC<SelectableOptionProps> = ({
  name,
  value,
  description,
  isSelected,
  onSelect,
  multiSelect = false
}) => {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      onPress={onSelect}
      className={`flex-row justify-between items-center p-4 mb-3 rounded-xl ${isSelected ? 'bg-primary' : (isDark ? 'bg-darkSecondary' : 'bg-white')}`}
    >
      <View className="flex-1">
        <Text className={`font-medium text-lg ${isSelected ? 'text-white' : (isDark ? 'text-white' : 'text-black')}`}>
          {name}
        </Text>
        {description && (
          <Text className={`text-sm mt-1 ${isSelected ? 'text-white' : (isDark ? 'text-darkDarkGray' : 'text-darkGray')}`}>
            {description}
          </Text>
        )}
      </View>
      <View className={`w-6 h-6 rounded-full items-center justify-center ${isSelected ? 'bg-white' : 'border border-gray-300'}`}>
        {isSelected && (
          <Ionicons 
            name={multiSelect ? "checkmark" : "checkmark"} 
            size={16} 
            color="#2846D0" 
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectableOption;