import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { OnboardingScreenProps } from '../../../types/onboarding';
import OnboardingScreen from '../OnboardingScreen';
import SelectableOption from '../SelectableOption';

const SelectionScreen: React.FC<OnboardingScreenProps> = (props) => {
  const { question, onNext } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Reset selected options when question changes
  useEffect(() => {
    setSelectedOptions([]);
  }, [question._id]);

  const handleOptionSelect = (value: string) => {
    if (question.isMultiSelect) {
      // For multi-select, toggle the selection
      if (selectedOptions.includes(value)) {
        setSelectedOptions(selectedOptions.filter(option => option !== value));
      } else {
        // Check if we're at the max selection limit
        if (question.validation?.max && selectedOptions.length >= question.validation.max) {
          // Remove the first selected option if we're at the limit
          const newSelection = [...selectedOptions.slice(1), value];
          setSelectedOptions(newSelection);
        } else {
          setSelectedOptions([...selectedOptions, value]);
        }
      }
    } else {
      // For single select, just set the value
      setSelectedOptions([value]);
    }
  };

  const handleContinue = () => {
    // For single select, pass the single value
    if (!question.isMultiSelect && selectedOptions.length > 0) {
      onNext({ [question.profileKey]: selectedOptions[0] });
    } else {
      // For multi-select, pass the array of values
      onNext({ [question.profileKey]: selectedOptions });
    }
  };

  // Check if button should be disabled
  const isButtonDisabled = () => {
    if (question.isOptional) return false;
    
    if (question.validation?.min) {
      return selectedOptions.length < question.validation.min;
    }
    
    return selectedOptions.length === 0;
  };

  return (
    <OnboardingScreen
      {...props}
      onButtonPress={handleContinue}
      buttonDisabled={isButtonDisabled()}
    >
      <View className="mt-4">
        {question.options.map((option) => (
          <SelectableOption
            key={option.value}
            name={option.name}
            value={option.value}
            description={option.description}
            isSelected={selectedOptions.includes(option.value)}
            onSelect={() => handleOptionSelect(option.value)}
            multiSelect={question.isMultiSelect}
          />
        ))}
      </View>
    </OnboardingScreen>
  );
};

export default SelectionScreen;