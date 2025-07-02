import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import WeekdaySelector from '../components/dashboard/WeekdaySelector';
import DailyProgress from '../components/dashboard/DailyProgress';
import StepTracker from '../components/dashboard/StepTracker';
import DailyMeals from '../components/dashboard/DailyMeals';
import BottomTabBar from '../components/navigation/BottomTabBar';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const { isDark } = useTheme();
  
  // Sample data for the dashboard
  const [days] = useState([
    { id: 1, name: 'TUE', date: 18, isActive: false, isToday: false },
    { id: 2, name: 'WED', date: 19, isActive: false, isToday: false },
    { id: 3, name: 'THU', date: 20, isActive: true, isToday: false },
    { id: 4, name: 'FRI', date: 21, isActive: false, isToday: true },
    { id: 5, name: 'SAT', date: 22, isActive: false, isToday: false },
    { id: 6, name: 'SUN', date: 23, isActive: false, isToday: false },
    { id: 7, name: 'MON', date: 24, isActive: false, isToday: false },
  ]);

  const [selectedDay, setSelectedDay] = useState(3);

  const [meals] = useState([
    {
      id: '1',
      name: 'Peanut Butter & Banana Toast',
      calories: 250,
      protein: 6,
      carbs: 30,
      fat: 12,
    },
    {
      id: '2',
      name: 'Watermelon, pumpkin & pine nuts',
      calories: 100,
      protein: 2,
      carbs: 20,
      fat: 1,
    },
    {
      id: '3',
      name: 'Lemon grass rice',
      calories: 150,
      protein: 3,
      carbs: 30,
      fat: 2,
    },
    {
      id: '4',
      name: 'Salmon and zucchini',
      calories: 375,
      protein: 30,
      carbs: 5,
      fat: 25,
    },
    {
      id: '5',
      name: 'Avocado Toast',
      calories: 250,
      protein: 6,
      carbs: 20,
      fat: 12,
    },
  ]);

  const handleSelectDay = (id: number) => {
    setSelectedDay(id);
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkSecondary' : 'bg-lightGray'}`}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View className="flex-1">
        <View className="flex-row justify-between items-center px-4 pt-2">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Logo</Text>
          <View className="flex-row items-center">
            <View className="bg-orange-500 rounded-full w-6 h-6 items-center justify-center mr-1">
              <Ionicons name="flame" size={14} color="white" />
            </View>
            <Text className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>07</Text>
          </View>
        </View>

        <ScrollView 
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <WeekdaySelector days={days} onSelectDay={handleSelectDay} />
          
          <DailyProgress 
            caloriesLeft={1228}
            caloriesGoal={1500}
            caloriesBurned={224}
            caloriesConsumed={200}
          />
          
          <View className="h-4" />
          
          <StepTracker 
            steps={3000}
            stepsGoal={10000}
            distance={2.84}
            duration={15}
            calories={224}
          />
          
          <DailyMeals meals={meals} />
          
          <View className="h-20" />
        </ScrollView>
      </View>
      
      <BottomTabBar />
    </SafeAreaView>
  );
}
