import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import HeaderBar from '@/components/common/HeaderBar';
import SectionHeader from '@/components/common/SectionHeader';
import GoalWeightCard from '@/components/analytics/GoalWeightCard';
import BMICard from '@/components/analytics/BMICard';
import DailyStepsCard from '@/components/analytics/DailyStepsCard';
import GoalProgressChart from '@/components/analytics/GoalProgressChart';
import NutritionChart from '@/components/analytics/NutritionChart';

const AnalyticsScreen: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTimeframe, setActiveTimeframe] = useState('30 Days');

  // Mock data for goal weight
  const goalWeight = 80;

  // Mock data for BMI
  const bmi = 30.9;
  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  // Mock data for daily steps
  const dailySteps = 8500;
  const stepsGoal = 10000;

  // Mock data for goal progress chart
  const goalProgressData = {
    labels: ['30', '22', '14', '6', 'Today'],
    datasets: [
      {
        data: [90, 85, 82, 80, 78],
      },
    ],
  };

  // Mock data for nutrition chart
  const nutritionData = [
    {
      name: 'Protein',
      value: 35,
      color: '#10B981',
      legendFontColor: '#4B5563',
    },
    {
      name: 'Carbs',
      value: 45,
      color: '#3B82F6',
      legendFontColor: '#4B5563',
    },
    {
      name: 'Fat',
      value: 20,
      color: '#F59E0B',
      legendFontColor: '#4B5563',
    },
  ];

  // Time frame options
  const timeFrameOptions = ['30 Days', '6 Months', '1 Year', 'All time'];

  return (
    <ScrollView
      className={`flex-1 ${isDark ? 'bg-darkBackground' : 'bg-lightGray'}`}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 pt-2 pb-6">
        <HeaderBar title="Analytics" customTextClassname="!text-2xl" />

        {/* Goal Weight Card */}
        <View className="mt-4">
          <GoalWeightCard 
            goalWeight={goalWeight} 
            onUpdate={() => console.log('Update goal weight')}
          />
        </View>

        {/* Reminder Banner */}
        <View className="mt-4 bg-blue-600 p-4 rounded-xl">
          <Text className="text-white text-sm">
            Remember to update this at least once a week so we can adapt your plan to hit your goal.
          </Text>
          <TouchableOpacity className="bg-white mt-3 py-3 rounded-lg items-center">
            <Text className="text-blue-600 font-medium">Update your Profile details</Text>
          </TouchableOpacity>
        </View>

        {/* BMI Card */}
        <View className="mt-4">
          <BMICard bmi={bmi} status={getBmiStatus(bmi)} />
        </View>

        {/* Daily Steps Card */}
        <View className="mt-4">
          <DailyStepsCard steps={dailySteps} goal={stepsGoal} />
        </View>

        {/* Time Frame Selector */}
        <View className="mt-6 mb-2">
          <SectionHeader title="Time Frame" />
          <View className="flex-row mt-2 bg-gray-100 rounded-lg p-1">
            {timeFrameOptions.map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                onPress={() => setActiveTimeframe(timeframe)}
                className={`py-1 px-3 rounded-lg ${activeTimeframe === timeframe ? 'bg-white shadow' : ''}`}
              >
                <Text
                  className={activeTimeframe === timeframe ? 'text-blue-600' : 'text-gray-500'}
                  style={{ fontSize: 12 }}
                >
                  {timeframe}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Goal Progress Chart */}
        <View className="mt-4">
          <GoalProgressChart data={goalProgressData} title="Goal Progress" />
        </View>

        {/* Nutrition Chart */}
        <View className="mt-4 mb-20">
          <NutritionChart data={nutritionData} title="Nutrition Breakdown" />
        </View>
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;