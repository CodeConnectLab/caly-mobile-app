import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
}

interface DailyMealsProps {
  meals: MealItem[];
}

const DailyMeals: React.FC<DailyMealsProps> = ({ meals }) => {
  const { isDark } = useTheme();

  return (
    <View className="mt-4">
      <Text className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
        Daily Meals
      </Text>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="space-y-3"
      >
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} isDark={isDark} />
        ))}
      </ScrollView>
    </View>
  );
};

interface MealCardProps {
  meal: MealItem;
  isDark: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal, isDark }) => {
  return (
    <TouchableOpacity 
      className={`flex-row items-center p-3 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-secondary'} shadow-sm`}
    >
      {meal.image ? (
        <Image 
          source={{ uri: meal.image }} 
          className="w-16 h-16 rounded-lg mr-3" 
          resizeMode="cover"
        />
      ) : (
        <View className={`w-16 h-16 rounded-lg mr-3 items-center justify-center ${isDark ? 'bg-darkLightGray' : 'bg-lightGray'}`}>
          <Text className={`${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>No image</Text>
        </View>
      )}
      
      <View className="flex-1">
        <Text className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
          {meal.name}
        </Text>
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          {meal.calories} <Text className="text-sm font-normal">kcal</Text>
        </Text>
        <View className="flex-row mt-1">
          <NutrientBadge label="P" value={meal.protein} isDark={isDark} />
          <NutrientBadge label="C" value={meal.carbs} isDark={isDark} />
          <NutrientBadge label="F" value={meal.fat} isDark={isDark} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface NutrientBadgeProps {
  label: string;
  value: number;
  isDark: boolean;
}

const NutrientBadge: React.FC<NutrientBadgeProps> = ({ label, value, isDark }) => {
  return (
    <View className="flex-row items-center mr-2">
      <Text className={`text-xs ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
        {label} {value}g
      </Text>
    </View>
  );
};

export default DailyMeals;