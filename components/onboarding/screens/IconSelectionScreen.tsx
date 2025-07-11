import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import OnboardingScreen from '../OnboardingScreen';
import { OnboardingScreenProps, SurveyOption } from '../../../types/onboarding';
import OnboardingButton from '../OnboardingButton';
import SelectableOption from '../SelectableOption';

interface IconSelectionScreenProps extends OnboardingScreenProps {}

const IconSelectionScreen: React.FC<IconSelectionScreenProps> = ({ 
  question, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}) => {
  const { isDark } = useTheme();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (value: string) => {
    if (question.isMultiSelect) {
      // For multi-select questions
      if (selectedOptions.includes(value)) {
        // If already selected, remove it
        setSelectedOptions(selectedOptions.filter(option => option !== value));
      } else {
        // Check if we've reached the maximum allowed selections
        if (question.validation?.max && selectedOptions.length >= question.validation.max) {
          // If at max, replace the first selected option
          const newSelections = [...selectedOptions];
          newSelections.shift();
          setSelectedOptions([...newSelections, value]);
        } else {
          // Otherwise, add to selections
          setSelectedOptions([...selectedOptions, value]);
        }
      }
    } else {
      // For single-select questions
      setSelectedOptions([value]);
    }
  };

  const handleNext = () => {
    // Check if we have the minimum required selections
    if (question.validation?.min && selectedOptions.length < question.validation.min) {
      // Could show an error message here
      return;
    }

    // Format the data for the next step
    const data = {
      [question.profileKey]: question.isMultiSelect ? selectedOptions : selectedOptions[0]
    };

    onNext(data);
  };

  const renderItem = ({ item }: { item: SurveyOption }) => (
    <View className="flex-1 m-1">
      <SelectableOption
        name={item.name}
        value={item.value}
        description={item.description}
        icon={item.icon}
        isSelected={selectedOptions.includes(item.value)}
        onSelect={() => handleOptionSelect(item.value)}
        multiSelect={question.isMultiSelect}
        iconPosition="left"
        iconSize={28}
      />
    </View>
  );

  return (
    <OnboardingScreen
      question={question}
      onNext={onNext}
      onBack={onBack}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onButtonPress={handleNext}
      buttonDisabled={selectedOptions.length < (question.validation?.min || 1)}
    >
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {question.description && (
          <View className={`w-full p-4 rounded-xl mb-4 ${isDark ? 'bg-darkSecondary' : 'bg-white'}`}>
            <Text className={`text-base ${isDark ? 'text-white' : 'text-black'}`}>
              {question.description}
            </Text>
          </View>
        )}

        <View className="flex-1 mb-6">
          <FlatList
            data={question.options}
            renderItem={renderItem}
            keyExtractor={(item) => item.value}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>

        <OnboardingButton 
          label="Continue"
          onPress={handleNext}
          isPrimary
          disabled={selectedOptions.length < (question.validation?.min || 1)}
        />
      </ScrollView>
    </OnboardingScreen>
  );
};

export default IconSelectionScreen;