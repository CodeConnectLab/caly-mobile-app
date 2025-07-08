import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface DailyStepsCardProps {
  steps: number;
  goal: number;
}

const DailyStepsCard: React.FC<DailyStepsCardProps> = ({ steps, goal }) => {
  const { isDark } = useTheme();
  const percentage = Math.min(Math.round((steps / goal) * 100), 100);

  return (
    <View className={`p-4 rounded-xl ${isDark ? 'bg-darkCard' : 'bg-white'}`}>
      <View className="flex-row items-center">
        <View className="bg-green-100 p-2 rounded-lg mr-3">
          <Ionicons name="footsteps-outline" size={24} color="#10B981" />
        </View>
        <View>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Daily Steps</Text>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>{steps.toLocaleString()}</Text>
        </View>
      </View>
      <View className="mt-3">
        <View className="flex-row justify-between">
          <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Goal: {goal.toLocaleString()} steps</Text>
          <Text className={`text-xs font-medium ${percentage >= 100 ? 'text-green-500' : 'text-blue-500'}`}>{percentage}%</Text>
        </View>
        <View className="h-2 bg-gray-200 rounded-full mt-2">
          <View 
            className="h-2 bg-green-500 rounded-full" 
            style={{ width: `${percentage}%` }}
          />
        </View>
      </View>
    </View>
  );
};

export default DailyStepsCard;