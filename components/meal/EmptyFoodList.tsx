import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';

interface EmptyFoodListProps {
  onCreateFood: () => void;
}

const EmptyFoodList: React.FC<EmptyFoodListProps> = ({ onCreateFood }) => {
  const { isDark } = useTheme();
  
  return (
    <View className="flex-1 items-center justify-center py-8">
      <Text className="text-2xl font-bold text-center mb-2">
        You have created no foods.
      </Text>
      
      <TouchableOpacity 
        onPress={onCreateFood}
        className="bg-primary py-4 px-6 rounded-full flex-row items-center justify-center mt-6 w-full"
      >
        <Ionicons name="restaurant-outline" size={20} color="white" />
        <Text className="text-white font-bold text-lg ml-2">Create a Food</Text>
      </TouchableOpacity>
      
      <Text className="text-gray-500 text-center mt-4">
        Create a food to add it to your database
      </Text>
    </View>
  );
};

export default EmptyFoodList;