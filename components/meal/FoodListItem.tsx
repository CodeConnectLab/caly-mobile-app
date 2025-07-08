import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FoodItemProps {
  id: string;
  name: string;
  portion: string;
  calories: number;
  isSelected?: boolean;
  onPress: () => void;
}

const FoodListItem: React.FC<FoodItemProps> = ({
  name,
  portion,
  calories,
  isSelected = false,
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center p-4 mb-2 rounded-lg ${isSelected ? 'bg-primary' : 'bg-white'}`}
    >
      <View>
        <Text className={`font-medium ${isSelected ? 'text-white' : 'text-black'}`}>
          {name}
        </Text>
        <Text className={`text-sm ${isSelected ? 'text-white' : 'text-gray-500'}`}>
          {portion}, {calories} kcal
        </Text>
      </View>
      <Ionicons
        name={isSelected ? 'remove' : 'add'}
        size={24}
        color={isSelected ? 'white' : 'black'}
      />
    </TouchableOpacity>
  );
};

export default FoodListItem;