import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface DailyStepsCardProps {
  steps: number;
  goal: number;
  onTimeframeChange?: (timeframe: string) => void;
  activeTimeframe?: string;
}

const DailyStepsCard: React.FC<DailyStepsCardProps> = ({ steps, goal, onTimeframeChange, activeTimeframe = '30 Days' }) => {
  const { isDark } = useTheme();
  const percentage = Math.min(Math.round((steps / goal) * 100), 100);
  
  // Time frame options
  const timeFrameOptions = ['30 Days', '6 Months', '1 Year', 'All time'];

  return (
    <View className={`p-4 rounded-xl ${isDark ? 'bg-darkCard' : 'bg-white'}`}>
      <Text className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Daily Steps</Text>
      
      {/* Time Frame Selector */}
      <View className="mb-4">
        <View className="flex-row bg-gray-100 rounded-lg p-1">
          {timeFrameOptions.map((timeframe) => (
            <TouchableOpacity
              key={timeframe}
              onPress={() => onTimeframeChange && onTimeframeChange(timeframe)}
              className={`py-1 px-3 rounded-lg flex-1 ${activeTimeframe === timeframe ? 'bg-white shadow' : ''}`}
            >
              <Text
                className={`text-center ${activeTimeframe === timeframe ? 'text-blue-600' : 'text-gray-500'}`}
                style={{ fontSize: 12 }}
              >
                {timeframe}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Chart */}
      <View className="h-40 mb-4">
        {/* This is a placeholder for the bar chart shown in the image */}
        {/* In a real implementation, you would use react-native-chart-kit or another library */}
        <View className="flex-row h-full items-end justify-between">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
            const height = index === 7 ? 100 : index === 6 ? 30 : Math.random() * 20;
            return (
              <View 
                key={index} 
                className="bg-blue-600 w-6 rounded-t-md"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-xs text-gray-500">30</Text>
          <Text className="text-xs text-gray-500">22</Text>
          <Text className="text-xs text-gray-500">14</Text>
          <Text className="text-xs text-gray-500">6</Text>
          <Text className="text-xs text-gray-500"></Text>
          <Text className="text-xs text-gray-500"></Text>
          <Text className="text-xs text-gray-500"></Text>
          <Text className="text-xs text-gray-500"></Text>
        </View>
      </View>
      
      {/* Y-axis labels */}
      <View className="absolute right-4 top-16 h-40 justify-between">
        <Text className="text-xs text-gray-500">10000</Text>
        <Text className="text-xs text-gray-500">8000</Text>
        <Text className="text-xs text-gray-500">6000</Text>
        <Text className="text-xs text-gray-500">4000</Text>
        <Text className="text-xs text-gray-500">2000</Text>
        <Text className="text-xs text-gray-500">0</Text>
      </View>
    </View>
  );
};

export default DailyStepsCard;