import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface DailyProgressProps {
  caloriesLeft: number;
  caloriesGoal: number;
  caloriesBurned: number;
  caloriesConsumed: number;
}

const DailyProgress: React.FC<DailyProgressProps> = ({
  caloriesLeft,
  caloriesGoal,
  caloriesBurned,
  caloriesConsumed,
}) => {
  const { isDark } = useTheme();

  return (
    <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-secondary'} shadow-sm`}>
      <View className="flex-row justify-between items-center mb-2">
        <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          Daily progress (KCAL)
        </Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color={isDark ? '#666666' : '#BBBBBB'} />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-end justify-between mb-4">
        <View className="flex-row items-end">
          <Text className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            {caloriesLeft}
          </Text>
          <Text className={`ml-1 mb-1 ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
            left
          </Text>
        </View>
        <View>
          <Text className={`text-right ${isDark ? 'text-white' : 'text-black'}`}>
            {caloriesGoal} Goal
          </Text>
          <Text className={`text-right ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
            {caloriesBurned} Burned
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        className="bg-primary py-2 rounded-full items-center justify-center mb-4"
      >
        <Text className="text-white font-medium">{caloriesConsumed} KCAL</Text>
      </TouchableOpacity>

      <View className="flex-row justify-between items-center">
        <Text className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Macronutrients</Text>
        <View className="flex-1 mx-4 h-[1] bg-lightGray" />
      </View>

      <View className="flex-row justify-between mt-4">
        <MacroItem 
          label="Carbs" 
          value={281} 
          goal={380} 
          unit="g" 
          color="carbs" 
          isDark={isDark} 
        />
        <MacroItem 
          label="Protein" 
          value={20} 
          goal={100} 
          unit="g" 
          color="protein" 
          isDark={isDark} 
        />
        <MacroItem 
          label="Fat" 
          value={162} 
          goal={250} 
          unit="g" 
          color="fat" 
          isDark={isDark} 
        />
      </View>
    </View>
  );
};

interface MacroItemProps {
  label: string;
  value: number;
  goal: number;
  unit: string;
  color: 'carbs' | 'protein' | 'fat';
  isDark: boolean;
}

const MacroItem: React.FC<MacroItemProps> = ({ label, value, goal, unit, color, isDark }) => {
  const colorMap = {
    carbs: isDark ? 'bg-darkCarbs' : 'bg-carbs',
    protein: isDark ? 'bg-darkProtein' : 'bg-protein',
    fat: isDark ? 'bg-darkFat' : 'bg-fat',
  };

  const progress = Math.min(Math.round((value / goal) * 100), 100);

  return (
    <View className="items-center">
      <Text className={`${isDark ? 'text-white' : 'text-black'} font-medium mb-1`}>{label}</Text>
      <View className="flex-row items-center mb-1">
        <Text className={`${isDark ? 'text-white' : 'text-black'} font-bold mr-1`}>{value}</Text>
        <Text className={`${isDark ? 'text-darkDarkGray' : 'text-darkGray'} text-xs`}>/{goal} {unit}</Text>
      </View>
      <View className="w-16 h-1 rounded-full bg-lightGray overflow-hidden">
        <View 
          className={`h-full ${colorMap[color]}`} 
          style={{ width: `${progress}%` }} 
        />
      </View>
    </View>
  );
};

export default DailyProgress;