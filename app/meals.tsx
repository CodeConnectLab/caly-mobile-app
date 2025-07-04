import HeaderBar from '@/components/common/HeaderBar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
}

export default function MealsScreen() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  // Sample food data - in a real app, this would come from an API
  const foodItems: FoodItem[] = Array(10).fill(null).map((_, index) => ({
    id: `food-${index}`,
    name: 'Caesar Salad with Romaine',
    portion: '1 cup',
    calories: 219,
  }));

  const handleFoodSelect = (foodId: string, foodName: string) => {
    // If already selected, navigate to detail screen
    if (selectedFood === foodId) {
      router.push({
        pathname: '/mealdetail',
        params: { foodName: foodName }
      });
    } else {
      // Otherwise, just select it
      setSelectedFood(foodId);
    }
  };

  const filteredFoodItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <View className="px-4  pb-4">
        <HeaderBar title='Food Database' customTextClassname={`!text-2xl`}/>
        {/* <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          Food Database
        </Text> */}

        {/* Search Bar */}
        <View className="mt-4 mb-4 bg-white rounded-lg flex-row items-center px-3 py-2">
          <Ionicons name="search" size={20} color="#BBBBBB" />
          <TextInput
            className="flex-1 ml-2 text-black"
            placeholder="Search foods"
            placeholderTextColor="#BBBBBB"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Tabs */}
        <View className="flex-row mb-2">
          {['All', 'My Foods', 'Saved Food'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`mr-4 pb-1 ${activeTab === tab ? 'border-b-2 border-primary' : ''}`}
            >
              <Text
                className={`${activeTab === tab
                  ? isDark ? 'text-darkPrimary' : 'text-black'
                  : isDark ? 'text-darkLightGray' : 'text-darkGray'
                  }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-gray-500 text-sm mb-2">Select from database</Text>

        {/* Food List */}
        <FlatList
          data={filteredFoodItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = selectedFood === item.id;
            return (
              <TouchableOpacity
                onPress={() => handleFoodSelect(item.id, item.name)}
                className={`flex-row justify-between items-center p-4 mb-2 rounded-lg ${isSelected ? 'bg-primary' : 'bg-white'}`}
              >
                <View>
                  <Text className={`font-medium ${isSelected ? 'text-white' : 'text-black'}`}>
                    {item.name}
                  </Text>
                  <Text className={`text-sm ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                    {item.portion}, {item.calories} kcal
                  </Text>
                </View>
                <Ionicons
                  name={isSelected ? 'remove' : 'add'}
                  size={24}
                  color={isSelected ? 'white' : 'black'}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
  );
}