import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface GoalWeightCardProps {
  goalWeight: number;
  onUpdate: () => void;
}

const GoalWeightCard: React.FC<GoalWeightCardProps> = ({ goalWeight, onUpdate }) => {
  const { isDark } = useTheme();

  return (
    <View className={`p-4 rounded-xl ${isDark ? 'bg-darkCard' : 'bg-white'} flex-row justify-between items-center`}>
      <View className="flex-row items-center">
        <View className="bg-amber-100 p-2 rounded-lg mr-3">
          <Ionicons name="trophy" size={24} color="#F59E0B" />
        </View>
        <View>
          <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-black'}`}>Goal Weight <Text className="font-bold">{goalWeight} kg</Text></Text>
        </View>
      </View>
      <TouchableOpacity 
        className="bg-blue-600 px-5 py-2 rounded-full"
        onPress={onUpdate}
      >
        <Text className="text-white font-medium">Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoalWeightCard;