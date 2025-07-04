import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import HeaderBar from '../components/common/HeaderBar';
import SaveButton from '../components/common/SaveButton';
import UnitToggle from '../components/water/UnitToggle';
import WaterSlider from '../components/water/WaterSlider';
import { useTheme } from '../theme/ThemeContext';

export default function WaterIntake() {
  const { isDark } = useTheme();
  
  // State for water intake value and unit
  const [waterIntake, setWaterIntake] = useState(5);
  const [unit, setUnit] = useState<'british' | 'metric'>('metric');
  
  const handleUnitToggle = (newUnit: 'british' | 'metric') => {
    setUnit(newUnit);
    // Convert value if needed
    if (newUnit === 'british' && unit === 'metric') {
      // Convert liters to gallons (approximate)
      setWaterIntake(Math.round(waterIntake * 0.264 * 10) / 10);
    } else if (newUnit === 'metric' && unit === 'british') {
      // Convert gallons to liters (approximate)
      setWaterIntake(Math.round(waterIntake * 3.785 * 10) / 10);
    }
  };
  
  const handleWaterIntakeChange = (value: number) => {
    setWaterIntake(value);
  };
  
  const handleSave = () => {
    // Save logic would go here
    router.back();
  };
  
  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkSecondary' : 'bg-white'}`}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <HeaderBar title="Water Intake" />
        
        {/* Main content */}
        <View className="flex-1 px-4">
          <Text className={`text-3xl font-bold mt-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Choose your daily water intake?
          </Text>
          
          {/* Unit toggle */}
          <UnitToggle activeUnit={unit} onToggle={handleUnitToggle} />
          
          {/* Hydration message */}
          <View className="items-center mt-8">
            <Text className={`text-lg ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Just stay Hydrated
            </Text>
            <Text className={`text-4xl font-bold mt-2 ${isDark ? 'text-white' : 'text-black'}`}>
              {waterIntake} {unit === 'metric' ? 'Liter' : 'Gallon'}
            </Text>
          </View>
          
          {/* Water slider */}
          <WaterSlider 
            value={waterIntake} 
            unit={unit} 
            onChange={handleWaterIntakeChange} 
            min={0}
            max={10}
          />
        </View>
        
        {/* Save button */}
        <View className="px-4 py-6">
          <SaveButton onPress={handleSave} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}