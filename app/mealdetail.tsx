import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import MealDetail from '../components/meal/MealDetail';

export default function MealDetailScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  // Sample data - in a real app, this would come from an API or state management
  const mealData = {
    mealName: 'Caesar Salad with Romaine',
    calories: 250,
    nutrients: {
      mainNutrients: [
        { label: 'Calories', value: 250, unit: 'kcal', editable: true },
        { label: 'Total Fat', value: 5, unit: 'g', editable: true },
        { label: 'Total Carbohydrate', value: 10.6, unit: 'g', editable: true },
        { label: 'Protein', value: 15.3, unit: 'g', editable: true },
      ],
      macroNutrients: [
        { label: 'Saturated Fat', value: 2.5, unit: 'g' },
        { label: 'Cholesterol', value: 42.9, unit: 'mg' },
        { label: 'Sodium', value: 183.7, unit: 'mg' },
        { label: 'Dietary Fiber', value: 0, unit: 'g' },
        { label: 'Total Sugars', value: 9.9, unit: 'g' },
        { label: 'Vitamin D', value: 12.2, unit: 'mcg' },
        { label: 'Iron', value: 0.2, unit: 'mg' },
        { label: 'Potassium', value: 455.6, unit: 'mg' },
      ],
    },
  };

  const handleSave = () => {
    // In a real app, this would save the meal data
    console.log('Saving meal data');
  };

  const handleDelete = () => {
    // In a real app, this would delete the meal
    console.log('Deleting meal');
  };

  return (
    <View className="flex-1">
      <MealDetail
        imageUri={imageUri}
        mealName={mealData.mealName}
        calories={mealData.calories}
        nutrients={mealData.nutrients}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </View>
  );
}