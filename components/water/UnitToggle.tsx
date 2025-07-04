import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface UnitToggleProps {
  activeUnit: 'british' | 'metric';
  onToggle: (unit: 'british' | 'metric') => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ activeUnit, onToggle }) => {
  const { isDark } = useTheme();

  return (
    <View className="flex-row items-center justify-center my-4">
      <TouchableOpacity 
        onPress={() => onToggle('british')}
        className={`px-4 py-2 ${activeUnit === 'british' ? '' : 'opacity-50'}`}
      >
        <Text 
          className={`text-lg ${activeUnit === 'british' 
            ? (isDark ? 'text-white font-bold' : 'text-black font-bold') 
            : (isDark ? 'text-darkDarkGray' : 'text-darkGray')}`}
        >
          British
        </Text>
      </TouchableOpacity>
      
      <View className="w-12 h-6 bg-primary rounded-full mx-2 relative">
        <View 
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full ${activeUnit === 'british' ? 'left-0.5' : 'right-0.5'}`}
        />
      </View>
      
      <TouchableOpacity 
        onPress={() => onToggle('metric')}
        className={`px-4 py-2 ${activeUnit === 'metric' ? '' : 'opacity-50'}`}
      >
        <Text 
          className={`text-lg ${activeUnit === 'metric' 
            ? (isDark ? 'text-white font-bold' : 'text-black font-bold') 
            : (isDark ? 'text-darkDarkGray' : 'text-darkGray')}`}
        >
          Metric
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UnitToggle;