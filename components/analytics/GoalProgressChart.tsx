import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../../theme/ThemeContext';

interface GoalProgressChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
  title: string;
}

const GoalProgressChart: React.FC<GoalProgressChartProps> = ({ data, title }) => {
  const { isDark } = useTheme();
  const screenWidth = Dimensions.get('window').width - 40; // Accounting for padding

  const chartConfig = {
    backgroundGradientFrom: isDark ? '#1F2937' : '#FFFFFF',
    backgroundGradientTo: isDark ? '#1F2937' : '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => isDark ? `rgba(59, 130, 246, ${opacity})` : `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(229, 231, 235, ${opacity})` : `rgba(75, 85, 99, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#3B82F6',
    },
  };

  return (
    <View className={`p-4 rounded-xl ${isDark ? 'bg-darkCard' : 'bg-white'}`}>
      <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{title}</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default GoalProgressChart;