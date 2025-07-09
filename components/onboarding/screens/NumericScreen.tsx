import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { OnboardingScreenProps } from '../../../types/onboarding';
import NumericInput from '../NumericInput';
import OnboardingScreen from '../OnboardingScreen';

const NumericScreen: React.FC<OnboardingScreenProps> = (props) => {
  const { question, onNext } = props;
  const [value, setValue] = useState<string>('');

  // Reset value when question changes
  useEffect(() => {
    setValue('');
  }, [question._id]);

  const handleContinue = () => {
    // Convert to number before sending
    const numericValue = parseFloat(value);
    onNext({ [question.profileKey]: numericValue });
  };

  // Determine if the button should be disabled
  const isButtonDisabled = () => {
    if (question.isOptional) return false;
    return value.trim() === '';
  };

  // Determine the appropriate unit based on the category
  const getUnit = () => {
    if (question.category === 'your_weight') {
      return 'kg'; // Could be made dynamic based on user preferences
    }
    if (question.category === 'your_height') {
      return 'cm'; // Could be made dynamic based on user preferences
    }
    return '';
  };

  return (
    <OnboardingScreen
      {...props}
      onButtonPress={handleContinue}
      buttonDisabled={isButtonDisabled()}
    >
      <View className="mt-4">
        <NumericInput
          label={question.description || 'Enter value'}
          value={value}
          onChangeText={setValue}
          placeholder="0"
          unit={getUnit()}
        />
      </View>
    </OnboardingScreen>
  );
};

export default NumericScreen;