import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen3() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-1 px-6 pt-10">
        {/* Main content */}
        <View className="flex-1 justify-center items-center">
          <View className="w-full aspect-square mb-10">
            <Image 
              source={require('../../assets/images/onboarding3.png')} 
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <Text className="text-3xl font-bold text-center mb-4 text-gray-900">
            Track Your Nutrition Goals
          </Text>
          
          <Text className="text-base text-gray-500 text-center mb-10 px-4">
            Monitor your daily intake and maintain a healthy diet with ease
          </Text>
        </View>

        {/* Navigation buttons */}
        <View className="mb-10">
          <TouchableOpacity 
            onPress={() => router.push('/(app)')}
            className="bg-primary py-4 rounded-full items-center"
          >
            <Text className="text-white font-semibold text-lg">Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        <View className="flex-row justify-center mb-8 space-x-2">
          <View className="w-2 h-2 rounded-full bg-gray-200" />
          <View className="w-2 h-2 rounded-full bg-gray-200" />
          <View className="w-8 h-2 rounded-full bg-primary" />
        </View>
      </View>
    </SafeAreaView>
  );
}