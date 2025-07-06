import HeaderBar from '@/components/common/HeaderBar';
import EmptyFoodList from '@/components/meal/EmptyFoodList';
import EmptySavedFoodList from '@/components/meal/EmptySavedFoodList';
import FoodListItem from '@/components/meal/FoodListItem';
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
  const allFoodItems: FoodItem[] = Array(10).fill(null).map((_, index) => ({
    id: `food-${index}`,
    name: 'Caesar Salad with Romaine',
    portion: '1 cup',
    calories: 219,
  }));
  
  // My Foods data - this would be user-created foods in a real app
  const myFoodItems: FoodItem[] = activeTab === 'My Foods' ? [
    {
      id: 'my-food-1',
      name: 'Caesar Salad with Romaine',
      portion: '1 cup',
      calories: 219,
    },
    {
      id: 'my-food-2',
      name: 'Romaine Caesar Salad',
      portion: '1 cup',
      calories: 219,
    }
  ] : [];

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

  // Get the appropriate food items based on the active tab
  const getFoodItems = () => {
    let items: FoodItem[] = [];
    
    switch (activeTab) {
      case 'All':
        items = allFoodItems;
        break;
      case 'My Foods':
        items = myFoodItems;
        break;
      case 'Saved Food':
        // In a real app, this would be saved/favorite foods
        items = [];
        break;
      default:
        items = allFoodItems;
    }
    
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const filteredFoodItems = getFoodItems();

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

        {/* Food List or Empty State */}
        {filteredFoodItems.length > 0 ? (
          <FlatList
            data={filteredFoodItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = selectedFood === item.id;
              return (
                <FoodListItem
                  id={item.id}
                  name={item.name}
                  portion={item.portion}
                  calories={item.calories}
                  isSelected={isSelected}
                  onPress={() => handleFoodSelect(item.id, item.name)}
                />
              );
            }}
          />
        ) : (
          activeTab === 'Saved Food' ? (
            <EmptySavedFoodList />
          ) : (
            <EmptyFoodList onCreateFood={() => router.push('/createfood')} />
          )
        )}
        
        {/* Create Food Button - Only shown when there are items or not on My Foods tab */}
        {(filteredFoodItems.length > 0 || activeTab !== 'My Foods') && (
          <TouchableOpacity 
            onPress={() => router.push('/createfood')}
            className="bg-primary py-4 px-6 rounded-full flex-row items-center justify-center mt-4"
          >
            <Ionicons name="restaurant-outline" size={20} color="white" />
            <Text className="text-white font-bold text-lg ml-2">Create a Food</Text>
          </TouchableOpacity>
        )}
      </View>
  );
}