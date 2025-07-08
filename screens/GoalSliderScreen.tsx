import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import CustomSlider from '../components/common/CustomSlider';
import HeaderBar from '../components/common/HeaderBar';
import SaveButton from '../components/common/SaveButton';
import UnitToggle from '../components/water/UnitToggle';
import { useTheme } from '../theme/ThemeContext';

interface GoalSliderScreenProps {
  title: string;
  questionText: string;
  motivationalText: string;
  initialValue: number;
  minValue?: number;
  maxValue?: number;
  showUnitToggle?: boolean;
  metricUnit?: string;
  britishUnit?: string;
  fillColor?: {
    light: string;
    dark: string;
  };
  onSave?: (value: number, unit?: string) => void;
}

export default function GoalSliderScreen({
  title,
  questionText,
  motivationalText,
  initialValue,
  minValue = 0,
  maxValue = 10,
  showUnitToggle = false,
  metricUnit = 'Liter',
  britishUnit = 'Gallon',
  fillColor = {
    light: 'bg-lightBlue',
    dark: 'bg-darkLightBlue'
  },
  onSave
}: GoalSliderScreenProps) {
  const { isDark } = useTheme();
  
  // State for value and unit
  const [value, setValue] = useState(initialValue);
  const [unit, setUnit] = useState<'british' | 'metric'>('metric');
  
  const handleUnitToggle = (newUnit: 'british' | 'metric') => {
    setUnit(newUnit);
    // Convert value if needed
    if (newUnit === 'british' && unit === 'metric') {
      // Convert metric to british (approximate)
      setValue(Math.round(value * 0.264 * 10) / 10);
    } else if (newUnit === 'metric' && unit === 'british') {
      // Convert british to metric (approximate)
      setValue(Math.round(value * 3.785 * 10) / 10);
    }
  };
  
  const handleValueChange = (newValue: number) => {
    setValue(newValue);
  };
  
  const handleSave = () => {
    // Call the onSave callback if provided
    if (onSave) {
      onSave(value, unit === 'metric' ? metricUnit : britishUnit);
    }
    router.back();
  };
  
  const currentUnit = unit === 'metric' ? metricUnit : britishUnit;
  
  return (
    // <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkSecondary' : 'bg-lightGray'}`}>
      // <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <HeaderBar title={title} />
        
        {/* Main content */}
        <View className="flex-1 px-4">
          <Text className={`text-3xl font-bold mt-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {questionText}
          </Text>
          
          {/* Unit toggle */}
          {showUnitToggle && (
            <UnitToggle activeUnit={unit} onToggle={handleUnitToggle} />
          )}
          
          {/* Motivational message */}
          <View className="items-center mt-8">
            <Text className={`text-lg ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              {motivationalText}
            </Text>
            <Text className={`text-4xl font-bold mt-2 ${isDark ? 'text-white' : 'text-black'}`}>
              {value} {currentUnit}
            </Text>
          </View>
          
          {/* Slider */}
          <CustomSlider 
            value={value} 
            onChange={handleValueChange} 
            min={minValue}
            max={maxValue}
            fillColor={fillColor}
          />
        </View>
        
        {/* Save button */}
        <View className="px-4 py-6">
          <SaveButton onPress={handleSave} />
        </View>
      </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}