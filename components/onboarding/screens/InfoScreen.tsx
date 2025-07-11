import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import OnboardingScreen from '../OnboardingScreen';
import { OnboardingScreenProps } from '../../../types/onboarding';
import OnboardingButton from '../OnboardingButton';

interface InfoScreenProps extends OnboardingScreenProps {}

const InfoScreen: React.FC<InfoScreenProps> = ({ 
  question, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}) => {
  const { isDark } = useTheme();

  const handleNext = () => {
    onNext({ [question.profileKey]: true });
  };

  return (
    <OnboardingScreen
      question={question}
      onNext={onNext}
      onBack={onBack}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onButtonPress={handleNext}
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

          {question.images && question.images.length > 0 && (
            <View className="w-full mb-6">
              {question.images.map((image, index) => (
                <Image 
                  key={index}
                  source={{ uri: image }}
                  className="w-full h-48 rounded-xl mb-4"
                  resizeMode="cover"
                />
              ))}
            </View>
          )}

          <OnboardingButton 
            label="Continue"
            onPress={handleNext}
            isPrimary
          />
        </View>
      </ScrollView>
    </OnboardingScreen>
  );
};

export default InfoScreen;