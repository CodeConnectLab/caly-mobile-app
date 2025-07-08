import React from 'react';
import { View } from 'react-native';
import FoodCreationForm from '@/components/meal/FoodCreationForm';

export default function CreateFoodScreen() {
  const handleSubmit = (foodData: any) => {
    // In a real app, this would save the food to a database or API
    console.log('Food data submitted:', foodData);
    // After saving, the form component will navigate back
  };

  return (
    <View className="flex-1 bg-white">
      <FoodCreationForm onSubmit={handleSubmit} />
    </View>
  );
}