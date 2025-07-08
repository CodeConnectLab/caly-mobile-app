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
      <View className="flex-row items-center">
        <View className="bg-blue-100 p-2 rounded-lg mr-3">
          <Ionicons name="fitness-outline" size={24} color="#3B82F6" />
        </View>
        <View>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>BMI</Text>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>{bmi.toFixed(1)}</Text>
        </View>
      </View>
      <View className="mt-3">
        <Text className={`font-medium ${getStatusColor()}`}>{status}</Text>
        <View className="h-2 bg-gray-200 rounded-full mt-2">
          <View 
            className={`h-2 rounded-full ${status.toLowerCase() === 'normal' ? 'bg-green-500' : 
              status.toLowerCase() === 'overweight' ? 'bg-orange-500' : 
              status.toLowerCase() === 'underweight' ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min(bmi / 40 * 100, 100)}%` }}
          />
        </View>
      </View>
    </View>
  );
};

export default BMICard;