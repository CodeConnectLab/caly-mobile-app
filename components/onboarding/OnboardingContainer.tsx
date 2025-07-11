import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { fetchSurveyQuestions, submitOnboardingData } from '../../services/onboardingService';
import { useTheme } from '../../theme/ThemeContext';
import { SurveyQuestion } from '../../types/onboarding';
import ComparisonScreen from './screens/ComparisonScreen';
import DateScreen from './screens/DateScreen';
import IconSelectionScreen from './screens/IconSelectionScreen';
import InfoScreen from './screens/InfoScreen';
import NumericScreen from './screens/NumericScreen';
import SelectionScreen from './screens/SelectionScreen';

const OnboardingContainer: React.FC = () => {
  const { isDark } = useTheme();
  const { isOnboarded, updateOnboardingData, completeOnboarding, currentStep, setCurrentStep } = useOnboarding();
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Redirect to dashboard if already onboarded
  useEffect(() => {
    if (isOnboarded) {
      router.replace('/dashboard');
    }
  }, [isOnboarded]);

  // Fetch survey questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchSurveyQuestions();
        // Sort questions by sequence number
        const sortedQuestions = [...data].sort((a, b) => a.seqNo - b.seqNo);
        setQuestions(sortedQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleNext = async (data: Record<string, any>) => {
    // Update onboarding data with the new values
    Object.entries(data).forEach(([key, value]) => {
      updateOnboardingData(key, value);
    });

    // If this is the last question, complete onboarding
    if (currentStep === questions.length - 1) {
      setSubmitting(true);
      try {
        await submitOnboardingData(data);
        await completeOnboarding();
        // Redirect to dashboard after completion
        router.replace('/dashboard');
      } catch (error) {
        console.error('Error completing onboarding:', error);
      } finally {
        setSubmitting(false);
      }
    } else {
      // Move to the next question
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Show loading indicator while fetching questions
  if (loading || submitting) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-darkPrimary' : 'bg-lightGray'}`}>
        <ActivityIndicator size="large" color="#2846D0" />
      </View>
    );
  }

  // If no questions are available, redirect to dashboard
  if (questions.length === 0) {
    router.replace('/dashboard');
    return null;
  }

  // Get the current question
  const currentQuestion = questions[currentStep];

  // Render the appropriate screen based on the question type
  const renderScreen = () => {
    // Check for explicit question type first
    if (currentQuestion.questionType) {
      switch (currentQuestion.questionType) {
        case 'selection':
          // Check if options have icons and should be displayed in a grid
          if (currentQuestion.options.some(option => option.icon) && currentQuestion.options.length > 3) {
            return (
              <IconSelectionScreen
                question={currentQuestion}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={questions.length}
              />
            );
          }
          return (
            <SelectionScreen
              question={currentQuestion}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={questions.length}
            />
          );
        case 'numeric':
          return (
            <NumericScreen
              question={currentQuestion}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={questions.length}
            />
          );
        case 'date':
          return (
            <DateScreen
              question={currentQuestion}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={questions.length}
            />
          );
        case 'info':
          return (
            <InfoScreen
              question={currentQuestion}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={questions.length}
            />
          );
        case 'comparison':
          return (
            <ComparisonScreen
              question={currentQuestion}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={questions.length}
            />
          );
      }
    }

    // Fall back to the previous logic for backward compatibility
    if (currentQuestion.options && currentQuestion.options.length > 0) {
      return (
        <SelectionScreen
          question={currentQuestion}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={questions.length}
        />
      );
    }

    // For questions without options (like weight, height), use numeric input
    return (
      <NumericScreen
        question={currentQuestion}
        onNext={handleNext}
        onBack={handleBack}
        currentStep={currentStep}
        totalSteps={questions.length}
      />
    );
  };

  return renderScreen();
};

export default OnboardingContainer;