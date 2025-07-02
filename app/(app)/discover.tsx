import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

// Sample data for trending searches
const trendingSearches = [
  'Vegetarian', 'Burger', 'Pizza', 'Sushi', 'Salad', 'Ice Cream', 'Pasta', 'Tacos'
];

// Sample data for popular categories
const popularCategories = [
  { id: '1', name: 'Fast Food', image: require('../../assets/images/category1.png') },
  { id: '2', name: 'Healthy', image: require('../../assets/images/category2.png') },
  { id: '3', name: 'Desserts', image: require('../../assets/images/category3.png') },
  { id: '4', name: 'Asian', image: require('../../assets/images/category4.png') },
  { id: '5', name: 'Italian', image: require('../../assets/images/category5.png') },
  { id: '6', name: 'Mexican', image: require('../../assets/images/category6.png') },
];

// Sample data for popular restaurants
const popularRestaurants = [
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
  {
    id: '4',
    name: 'Sushi World',
    cuisine: 'Japanese, Sushi',
    rating: 4.6,
    distance: '1.5 km',
    image: require('../../assets/images/restaurant4.png'),
  },
];

export default function DiscoverScreen() {
  const { theme, isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4">
          <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Discover</Text>
          <Text className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find new restaurants and dishes</Text>
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
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText ? (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons 
                  name="close-circle" 
                  size={20} 
                  color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Ionicons 
                  name="options-outline" 
                  size={20} 
                  color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Trending Searches */}
        <View className="mt-6">
          <View className="px-6 mb-4">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Trending Searches</Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="pl-6"
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {trendingSearches.map((search, index) => (
              <TouchableOpacity 
                key={index}
                className={`mr-3 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                <Text className={isDarkMode ? 'text-white' : 'text-gray-900'}>{search}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Categories */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Popular Categories</Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="px-6">
            <FlatList
              data={popularCategories}
              numColumns={2}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  className={`flex-1 m-2 rounded-2xl overflow-hidden aspect-square ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <Image 
                    source={item.image} 
                    className="w-full h-3/4"
                    resizeMode="cover"
                  />
                  <View className="flex-1 justify-center items-center">
                    <Text className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        {/* Popular Restaurants */}
        <View className="mt-6 pb-6">
          <View className="flex-row justify-between items-center px-6 mb-4">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Popular Restaurants</Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="px-6">
            {popularRestaurants.map((restaurant) => (
              <TouchableOpacity 
                key={restaurant.id}
                className={`mb-4 rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
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
                  className="w-full h-48"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <View className="flex-row justify-between items-center">
                    <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{restaurant.name}</Text>
                    <View className="flex-row items-center bg-primary bg-opacity-20 px-2 py-1 rounded-full">
                      <Ionicons name="star" size={16} color={theme.colors.primary} />
                      <Text className="ml-1 text-primary font-medium">{restaurant.rating}</Text>
                    </View>
                  </View>
                  <Text className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{restaurant.cuisine}</Text>
                  <View className="flex-row items-center mt-2">
                    <Ionicons name="location-outline" size={16} color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} />
                    <Text className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{restaurant.distance}</Text>
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