import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../theme/ThemeContext';
import OnboardingScreen from '../OnboardingScreen';
import { OnboardingScreenProps } from '../../../types/onboarding';
import OnboardingButton from '../OnboardingButton';

interface DateScreenProps extends OnboardingScreenProps {}

const DateScreen: React.FC<DateScreenProps> = ({ 
  question, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}) => {
  const { isDark } = useTheme();
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleNext = () => {
    onNext({ [question.profileKey]: date.toISOString() });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <View className="flex-1 justify-center items-center">
        <View className={`w-full p-6 rounded-xl mb-6 ${isDark ? 'bg-darkSecondary' : 'bg-white'}`}>
          {Platform.OS === 'android' && (
            <TouchableOpacity 
              onPress={showDatepicker}
              className={`flex-row items-center justify-between p-4 rounded-lg ${isDark ? 'bg-darkPrimary' : 'bg-gray-100'}`}
            >
              <Text className={isDark ? 'text-white' : 'text-black'}>
                {formatDate(date)}
              </Text>
              <Ionicons name="calendar-outline" size={24} color={isDark ? 'white' : 'black'} />
            </TouchableOpacity>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              style={{ width: '100%' }}
              textColor={isDark ? 'white' : 'black'}
              maximumDate={new Date()}
              minimumDate={new Date(1920, 0, 1)}
            />
          )}
        </View>

        <OnboardingButton 
          label="Continue"
          onPress={handleNext}
          isPrimary
        />
      </View>
    </OnboardingScreen>
  );
};

export default DateScreen;