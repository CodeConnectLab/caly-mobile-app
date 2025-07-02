import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function AdjustGoals() {
  const { isDark } = useTheme();
  
  // Initial values
  const [calorieGoal, setCalorieGoal] = useState('1600');
  const [proteinGoal, setProteinGoal] = useState('107');
  const [carbsGoal, setCarbsGoal] = useState('260');
  const [fatGoal, setFatGoal] = useState('99');
  
  // Track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Store original values for revert functionality
  const [originalValues, setOriginalValues] = useState({
    calories: calorieGoal,
    protein: proteinGoal,
    carbs: carbsGoal,
    fat: fatGoal
  });
  
  const handleEdit = () => {
    if (!isEditing) {
      // Store current values before editing
      setOriginalValues({
        calories: calorieGoal,
        protein: proteinGoal,
        carbs: carbsGoal,
        fat: fatGoal
      });
    }
    setIsEditing(!isEditing);
  };
  
  const handleRevert = () => {
    // Restore original values
    setCalorieGoal(originalValues.calories);
    setProteinGoal(originalValues.protein);
    setCarbsGoal(originalValues.carbs);
    setFatGoal(originalValues.fat);
    setIsEditing(false);
  };
  
  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
  };
  
  const handleGoBack = () => {
    router.back();
  };
  
  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkSecondary' : 'bg-lightGray'}`}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-4">
          <TouchableOpacity onPress={handleGoBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
          <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Adjust Goals
          </Text>
        </View>
        
        {/* Macronutrients Title */}
        <View className="px-4 py-2">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Macronutrients
          </Text>
        </View>
        
        {/* Macronutrient Circle */}
        <View className="items-center justify-center py-6">
          <View className="w-40 h-40 relative items-center justify-center">
            {/* Circle background */}
            <View className="w-full h-full rounded-full border-8 border-lightGray" />
            
            {/* Carbs segment (yellow) */}
            <View className="absolute top-0 right-0 w-20 h-20 rounded-tr-full border-t-8 border-r-8 border-carbs" />
            
            {/* Protein segment (red) */}
            <View className="absolute bottom-0 right-0 w-20 h-20 rounded-br-full border-b-8 border-r-8 border-protein" />
            
            {/* Fat segment (green) */}
            <View className="absolute bottom-0 left-0 w-20 h-20 rounded-bl-full border-b-8 border-l-8 border-fat" />
            
            {/* Center icon */}
            <View className="absolute">
              <Ionicons name="flame" size={32} color={isDark ? '#3A5AE8' : '#2846D0'} />
            </View>
            
            {/* Macro labels */}
            <View className="absolute top-0 right-0 -mr-16 mt-4">
              <View className="bg-carbs px-2 py-1 rounded-full">
                <Text className="text-white font-bold text-xs">260 g</Text>
              </View>
            </View>
            
            <View className="absolute bottom-0 right-0 -mr-14 mb-4">
              <View className="bg-protein px-2 py-1 rounded-full">
                <Text className="text-white font-bold text-xs">107 g</Text>
              </View>
            </View>
            
            <View className="absolute bottom-0 left-0 -ml-12 mb-4">
              <View className="bg-fat px-2 py-1 rounded-full">
                <Text className="text-white font-bold text-xs">99 g</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Goal Input Fields */}
        <View className="px-4 space-y-4">
          {/* Calorie Goal */}
          <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Calorie goal
            </Text>
            <View className="flex-row items-center justify-between">
              {isEditing ? (
                <TextInput
                  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                  value={calorieGoal}
                  onChangeText={setCalorieGoal}
                  keyboardType="number-pad"
                  autoFocus
                />
              ) : (
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {calorieGoal}
                </Text>
              )}
              <Ionicons name="flame" size={24} color={isDark ? '#3A5AE8' : '#2846D0'} />
            </View>
          </View>
          
          {/* Protein Goal */}
          <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Protein goal
            </Text>
            <View className="flex-row items-center justify-between">
              {isEditing ? (
                <TextInput
                  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                  value={proteinGoal}
                  onChangeText={setProteinGoal}
                  keyboardType="number-pad"
                />
              ) : (
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {proteinGoal}
                </Text>
              )}
              <Ionicons name="flame-outline" size={24} color="#F45641" />
            </View>
          </View>
          
          {/* Carbs Goal */}
          <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Carbs goal
            </Text>
            <View className="flex-row items-center justify-between">
              {isEditing ? (
                <TextInput
                  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                  value={carbsGoal}
                  onChangeText={setCarbsGoal}
                  keyboardType="number-pad"
                />
              ) : (
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {carbsGoal}
                </Text>
              )}
              <Ionicons name="pizza-outline" size={24} color="#FFAE38" />
            </View>
          </View>
          
          {/* Fat Goal */}
          <View className={`p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
              Fat goal
            </Text>
            <View className="flex-row items-center justify-between">
              {isEditing ? (
                <TextInput
                  className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                  value={fatGoal}
                  onChangeText={setFatGoal}
                  keyboardType="number-pad"
                />
              ) : (
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {fatGoal}
                </Text>
              )}
              <Ionicons name="water-outline" size={24} color="#72A91B" />
            </View>
          </View>
        </View>
        
        {/* Action Buttons */}
        {isEditing ? (
          <View className="flex-row px-4 py-6 space-x-4">
            <TouchableOpacity 
              onPress={handleRevert}
              className="flex-1 py-4 rounded-xl bg-gray-200 items-center justify-center"
            >
              <Text className="font-bold text-gray-700">Revert</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSave}
              className="flex-1 py-4 rounded-xl bg-primary items-center justify-center"
            >
              <Text className="font-bold text-white">Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="px-4 py-6">
            <TouchableOpacity 
              onPress={handleEdit}
              className="py-4 rounded-xl bg-primary items-center justify-center"
            >
              <Text className="font-bold text-white">Auto Generate Goals</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}