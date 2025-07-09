import React from 'react';
import { View } from 'react-native';
import { OnboardingProvider } from '../context/OnboardingContext';
import OnboardingContainer from '../components/onboarding/OnboardingContainer';

export default function OnboardingScreen() {
  return (
    <OnboardingProvider>
      <View className="flex-1">
        <OnboardingContainer />
      </View>
    </OnboardingProvider>
  );
}