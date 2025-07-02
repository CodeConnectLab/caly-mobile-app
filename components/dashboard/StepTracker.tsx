import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface StepTrackerProps {
  steps: number;
  stepsGoal: number;
  distance: number;
  duration: number;
  calories: number;
}

const StepTracker: React.FC<StepTrackerProps> = ({
  steps,
  stepsGoal,
  distance,
  duration,
  calories,
}) => {
  const { isDark } = useTheme();
  const progress = Math.min(Math.round((steps / stepsGoal) * 100), 100);

  return (
    <View className={`p-4 rounded-xl ${isDark ? 'bg-primary' : 'bg-primary'} shadow-sm`}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-white">
          Step Tracker
        </Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white font-medium">{steps}</Text>
          <Text className="text-white font-medium">{stepsGoal} Goal</Text>
        </View>
        <View className="h-2 bg-lightBlue/30 rounded-full overflow-hidden">
          <View 
            className="h-full bg-white" 
            style={{ width: `${progress}%` }} 
          />
        </View>
      </View>

      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Ionicons name="walk" size={20} color="white" />
          <Text className="text-white ml-1">{distance} km</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time" size={20} color="white" />
          <Text className="text-white ml-1">{duration} min</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="flame" size={20} color="white" />
          <Text className="text-white ml-1">{calories} cal</Text>
        </View>
      </View>
    </View>
  );
};

export default StepTracker;