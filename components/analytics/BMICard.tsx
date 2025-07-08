import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface BMICardProps {
  bmi: number;
  status: string;
}

const BMICard: React.FC<BMICardProps> = ({ bmi, status }) => {
  const { isDark } = useTheme();
  
  // Determine color based on BMI status
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'text-green-500';
      case 'overweight':
        return 'text-orange-500';
      case 'underweight':
        return 'text-yellow-500';
      case 'obese':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <View className={`p-4 rounded-xl ${isDark ? 'bg-darkCard' : 'bg-white'}`}>
      <Text className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Your BMI</Text>
      <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>BMI is based on height and current weight.</Text>
      <View className="flex-row justify-between items-center mt-3">
        <Text className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{bmi.toFixed(1)}</Text>
        <View className="absolute right-0">
          <Ionicons name="warning-outline" size={24} color="black" />
        </View>
      </View>
      <View className="mt-3">
        <View className="flex-row justify-between mb-1">
          <Text className="text-blue-500 font-medium">Underweight</Text>
          <Text className="text-green-500 font-medium">Healthy</Text>
          <Text className="text-orange-500 font-medium">Overweight</Text>
          <Text className="text-red-500 font-medium">Obese</Text>
        </View>
        <View className="h-2 flex-row">
          <View className="h-2 bg-blue-500 flex-1 rounded-l-full" />
          <View className="h-2 bg-green-500 flex-1" />
          <View className="h-2 bg-orange-500 flex-1" />
          <View className="h-2 bg-red-500 flex-1 rounded-r-full" />
        </View>
        <View className="relative">
          <View 
            className="absolute top-0 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-black"
            style={{ left: `${Math.min(Math.max(bmi / 40 * 100, 0), 100)}%`, marginLeft: -4 }}
          />
        </View>
      </View>
    </View>
  );
};

export default BMICard;