import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { OnboardingScreenProps } from '../../types/onboarding';
import OnboardingButton from './OnboardingButton';
import OnboardingHeader from './OnboardingHeader';

interface OnboardingScreenWrapperProps extends OnboardingScreenProps {
  children: React.ReactNode;
  buttonLabel?: string;
  onButtonPress: () => void;
  buttonDisabled?: boolean;
}

const OnboardingScreen: React.FC<OnboardingScreenWrapperProps> = ({
  question,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  children,
  buttonLabel = 'Continue',
  onButtonPress,
  buttonDisabled = false
}) => {
  const { isDark } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className={`flex-1 ${isDark ? 'bg-darkPrimary' : 'bg-lightGray'}`}>
        <OnboardingHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBack={onBack}
          showBackButton={currentStep > 0}
        />
        <ScrollView 
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="mb-6">
            <Text className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              {question.title}
            </Text>
            {question.subTitle && (
              <Text className={`text-base ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
                {question.subTitle}
              </Text>
            )}
          </View>
          
          {children}
          
          <View className="my-8">
            <OnboardingButton
              label={buttonLabel}
              onPress={onButtonPress}
              disabled={buttonDisabled}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OnboardingScreen;