import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';

interface EmptyFoodListProps {
  onCreateFood?: () => void;
}

const EmptyFoodList: React.FC<EmptyFoodListProps> = ({ onCreateFood }) => {
  const { isDark } = useTheme();

  const handleCreateFood = () => {
    if (onCreateFood) {
      onCreateFood();
    } else {
      router.push('/createfood');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Ionicons 
        name="fast-food-outline" 
        size={80} 
        color={isDark ? 'white' : '#888'} 
        className="mb-4"
      />
      <Text className={`text-xl font-semibold mb-2 text-center ${isDark ? 'text-white' : 'text-black'}`}>
        No foods created yet
      </Text>
      <Text className={`text-base mb-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Create your first food item to get started
      </Text>
      <TouchableOpacity 
        onPress={handleCreateFood}
        className="bg-primary px-6 py-3 rounded-full flex-row items-center"
      >
        <Ionicons name="add" size={20} color="white" />
        <Text className="text-white font-medium ml-2">Create a Food</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyFoodList;