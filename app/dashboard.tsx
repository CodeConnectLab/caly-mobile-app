import AppText from '@/components/common/AppText';
import Streak from '@/components/common/Streak';
import WaterMeter from '@/components/water/WaterMeter';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import DailyMeals from '../components/dashboard/DailyMeals';
import DailyProgress from '../components/dashboard/DailyProgress';
import StepTracker from '../components/dashboard/StepTracker';
import WeekdaySelector from '../components/dashboard/WeekdaySelector';
import BottomTabBar from '../components/navigation/BottomTabBar';
import { useTheme } from '../theme/ThemeContext';

export default function Dashboard() {
  const { isDark } = useTheme();
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });
  
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
console.log({selectedDay});

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

  const navigateToAdjustGoals = () => {
    router.push('/adjustgoals');
  };

  const navigateToWaterIntake = () => {
    router.push('/waterintake');
  };

  const navigateToStepsTracker = () => {
    router.push('/stepstracker');
  };

  // useEffect(() => {
  //   router.replace('/onboarding');
  // }, []);

  // Show loading state if fonts aren't loaded yet
  if (!fontsLoaded) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-darkPrimary' : 'bg-lightGray'}`}>
        <ActivityIndicator size="large" color="#2846D0" />
      </View>
    );
  }

  return (
    <>
      <View className="flex-1">
        <View className="flex-row justify-between items-center px-4 pt-2">
          <AppText className={`text-3xl ${isDark ? 'text-white' : 'text-black'}`} style={{fontWeight:"bold"}}>Logo</AppText>
        <Streak streakCount={7}/>
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
            onAdjustGoals={navigateToAdjustGoals}
          />
          
          <View className="h-4" />
          
          <StepTracker 
            steps={3000}
            stepsGoal={10000}
            distance={2.84}
            duration={15}
            calories={224}
            onEditSteps={navigateToStepsTracker}
          />
          
          {/* Water Intake Section */}
          <WaterMeter navigateToWaterIntake={navigateToWaterIntake} />
          
          <DailyMeals meals={meals} />
          
          <View className="h-20" />
        </ScrollView>
      </View>
      
      <BottomTabBar />
    </>
  );
}