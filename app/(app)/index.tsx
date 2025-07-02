import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Sample data for categories
const categories = [
  { id: '1', name: 'All', icon: 'grid-outline' },
  { id: '2', name: 'Fast Food', icon: 'fast-food-outline' },
  { id: '3', name: 'Healthy', icon: 'leaf-outline' },
  { id: '4', name: 'Desserts', icon: 'ice-cream-outline' },
  { id: '5', name: 'Asian', icon: 'restaurant-outline' },
];

// Sample data for popular dishes
const popularDishes = [
  {
    id: '1',
    name: 'Veggie Burger',
    restaurant: 'Burger House',
    rating: 4.8,
    price: 12.99,
    image: require('../../assets/images/dish1.png'),
  },
  {
    id: '2',
    name: 'Chicken Salad',
    restaurant: 'Green Leaf',
    rating: 4.5,
    price: 9.99,
    image: require('../../assets/images/dish2.png'),
  },
  {
    id: '3',
    name: 'Pasta Carbonara',
    restaurant: 'Italian Corner',
    rating: 4.7,
    price: 14.99,
    image: require('../../assets/images/dish3.png'),
  },
];

// Sample data for nearby restaurants
const nearbyRestaurants = [
  {
    id: '1',
    name: 'Burger House',
    cuisine: 'American, Fast Food',
    rating: 4.8,
    distance: '1.2 km',
    image: require('../../assets/images/restaurant1.png'),
  },
  {
    id: '2',
    name: 'Green Leaf',
    cuisine: 'Healthy, Salads',
    rating: 4.5,
    distance: '0.8 km',
    image: require('../../assets/images/restaurant2.png'),
  },
  {
    id: '3',
    name: 'Italian Corner',
    cuisine: 'Italian, Pasta',
    rating: 4.7,
    distance: '2.0 km',
    image: require('../../assets/images/restaurant3.png'),
  },
];

export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('1');

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4">
          <View>
            <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Deliver to</Text>
            <View className="flex-row items-center">
              <Text className={`text-lg font-semibold mr-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Current Location
              </Text>
              <MaterialCommunityIcons 
                name="chevron-down" 
                size={20} 
                color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[700]} 
              />
            </View>
          </View>
          
          <TouchableOpacity className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <Image 
              source={require('../../assets/images/profile.png')} 
              className="w-full h-full"
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="px-6 mt-6">
          <View className={`flex-row items-center px-4 py-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Ionicons 
              name="search-outline" 
              size={20} 
              color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
            />
            <TextInput
              placeholder="Search for food or restaurants"
              placeholderTextColor={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]}
              className={`flex-1 ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            />
            <TouchableOpacity>
              <Ionicons 
                name="options-outline" 
                size={20} 
                color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner */}
        <View className="px-6 mt-6">
          <View className="bg-secondary rounded-2xl p-4 flex-row items-center">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-bold text-gray-900 mb-1">50% OFF</Text>
              <Text className="text-sm text-gray-700">On your first order with code: SNAPEAT50</Text>
              <TouchableOpacity className="bg-primary py-2 px-4 rounded-full mt-2 self-start">
                <Text className="text-white font-medium">Order Now</Text>
              </TouchableOpacity>
            </View>
            <Image 
              source={require('../../assets/images/banner-food.png')} 
              className="w-24 h-24"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Categories */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Categories</Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="pl-6"
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`mr-4 items-center justify-center w-16 h-16 rounded-full ${selectedCategory === category.id ? 'bg-primary' : isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                <Ionicons 
                  name={category.icon} 
                  size={24} 
                  color={selectedCategory === category.id ? 'white' : isDarkMode ? theme.colors.gray[400] : theme.colors.gray[600]} 
                />
                <Text 
                  className={`text-xs mt-1 ${selectedCategory === category.id ? 'text-primary font-medium' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Dishes */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Popular Dishes</Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="pl-6"
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {popularDishes.map((dish) => (
              <TouchableOpacity 
                key={dish.id}
                className={`mr-4 rounded-2xl overflow-hidden w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Image 
                  source={dish.image} 
                  className="w-full h-40"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{dish.name}</Text>
                  <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{dish.restaurant}</Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text className={`ml-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{dish.rating}</Text>
                    </View>
                    <Text className="text-primary font-bold">${dish.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Restaurants */}
        <View className="mt-6 pb-6">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Nearby Restaurants</Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="px-6">
            {nearbyRestaurants.map((restaurant) => (
              <TouchableOpacity 
                key={restaurant.id}
                className={`mb-4 rounded-2xl overflow-hidden flex-row ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Image 
                  source={restaurant.image} 
                  className="w-24 h-24"
                  resizeMode="cover"
                />
                <View className="flex-1 p-3 justify-center">
                  <Text className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{restaurant.name}</Text>
                  <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{restaurant.cuisine}</Text>
                  <View className="flex-row justify-between items-center mt-1">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text className={`ml-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{restaurant.rating}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="location-outline" size={16} color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} />
                      <Text className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{restaurant.distance}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}