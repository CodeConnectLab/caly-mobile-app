import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingContextType {
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onboardingData: Record<string, any>;
  updateOnboardingData: (key: string, value: any) => void;
  resetOnboardingData: () => void;
  completeOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType>({
  isOnboarded: false,
  setIsOnboarded: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  onboardingData: {},
  updateOnboardingData: () => {},
  resetOnboardingData: () => {},
  completeOnboarding: async () => {},
});

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [onboardingData, setOnboardingData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already onboarded on initial load
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardedStatus = await AsyncStorage.getItem('isOnboarded');
        if (onboardedStatus === 'true') {
          setIsOnboarded(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  const updateOnboardingData = (key: string, value: any) => {
    setOnboardingData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const resetOnboardingData = () => {
    setOnboardingData({});
    setCurrentStep(0);
  };

  const completeOnboarding = async () => {
    try {
      // Save onboarding data to AsyncStorage
      await AsyncStorage.setItem('onboardingData', JSON.stringify(onboardingData));
      // Mark user as onboarded
      await AsyncStorage.setItem('isOnboarded', 'true');
      setIsOnboarded(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  if (isLoading) {
    // You could return a loading component here if needed
    return null;
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarded,
        setIsOnboarded,
        currentStep,
        setCurrentStep,
        onboardingData,
        updateOnboardingData,
        resetOnboardingData,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);