import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from '../../theme/ThemeContext';

interface NutritionChartProps {
  data: {
    name: string;
    value: number;
    color: string;
    legendFontColor: string;
  }[];
  title: string;
}

const NutritionChart: React.FC<NutritionChartProps> = ({ data, title }) => {
  const { isDark } = useTheme();
  const screenWidth = Dimensions.get('window').width - 40; // Accounting for padding

  const chartConfig = {
    backgroundGradientFrom: isDark ? '#1F2937' : '#FFFFFF',
    backgroundGradientTo: isDark ? '#1F2937' : '#FFFFFF',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  // Update legend font color based on theme
  const chartData = data.map(item => ({
    ...item,
    legendFontColor: isDark ? '#E5E7EB' : '#4B5563',
  }));

  return (
    <View className={`p-4 rounded-xl ${isDark ? 'bg-darkCard' : 'bg-white'}`}>
      <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{title}</Text>
      <PieChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default NutritionChart;