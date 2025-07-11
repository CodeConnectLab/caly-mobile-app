import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../../../theme/ThemeContext';
import OnboardingScreen from '../OnboardingScreen';
import { OnboardingScreenProps } from '../../../types/onboarding';
import OnboardingButton from '../OnboardingButton';
import SelectableOption from '../SelectableOption';

interface ComparisonScreenProps extends OnboardingScreenProps {}

const ComparisonScreen: React.FC<ComparisonScreenProps> = ({ 
  question, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}) => {
  const { isDark } = useTheme();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const screenWidth = Dimensions.get('window').width - 40; // Padding on both sides

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption) {
      onNext({ [question.profileKey]: selectedOption });
    }
  };

  // Default chart data if none provided
  const chartData = question.chartData || {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(40, 70, 208, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [30, 60, 45, 70, 85, 65],
        color: (opacity = 1) => `rgba(131, 56, 236, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Your path", "Average path"]
  };

  const chartConfig = {
    backgroundGradientFrom: isDark ? "#1E1E1E" : "#ffffff",
    backgroundGradientTo: isDark ? "#1E1E1E" : "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

  return (
    <OnboardingScreen
      question={question}
      onNext={onNext}
      onBack={onBack}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onButtonPress={handleNext}
      buttonDisabled={!selectedOption}
    >
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center">
          {question.description && (
            <View className={`w-full p-6 rounded-xl mb-6 ${isDark ? 'bg-darkSecondary' : 'bg-white'}`}>
              <Text className={`text-base ${isDark ? 'text-white' : 'text-black'}`}>
                {question.description}
              </Text>
            </View>
          )}

          <View className={`w-full p-4 rounded-xl mb-6 ${isDark ? 'bg-darkSecondary' : 'bg-white'}`}>
            <LineChart
              data={chartData}
              width={screenWidth - 20} // Account for padding inside the container
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            
            {/* Display legend manually */}
            <View className="flex-row justify-center mt-2">
              {chartData.legend && chartData.legend.map((label: string, index: number) => (
                <View key={index} className="flex-row items-center mx-2">
                  <View 
                    style={{
                      width: 12, 
                      height: 12, 
                      backgroundColor: chartData.datasets[index].color(1),
                      borderRadius: 6,
                      marginRight: 4
                    }}
                  />
                  <Text className={isDark ? 'text-white' : 'text-black'}>{label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="w-full mb-6">
            {question.options.map((option) => (
              <SelectableOption
                key={option.value}
                name={option.name}
                value={option.value}
                description={option.description}
                icon={option.icon}
                isSelected={selectedOption === option.value}
                onSelect={() => handleOptionSelect(option.value)}
                multiSelect={false}
              />
            ))}
          </View>

          <OnboardingButton 
            label="Continue"
            onPress={handleNext}
            isPrimary
            disabled={!selectedOption}
          />
        </View>
      </ScrollView>
    </OnboardingScreen>
  );
};

export default ComparisonScreen;