import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

// Sample data for favorite dishes
const favoriteDishes = [
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

// Sample data for favorite restaurants
const favoriteRestaurants = [
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
];

export default function FavoritesScreen() {
  const { theme, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('dishes'); // 'dishes' or 'restaurants'

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Favorites</Text>
          <Text className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your saved items</Text>
        </View>

        {/* Tab Selector */}
        <View className="flex-row px-6 mt-4 mb-6">
          <TouchableOpacity 
            onPress={() => setActiveTab('dishes')}
            className={`flex-1 py-3 ${activeTab === 'dishes' ? 'border-b-2 border-primary' : 'border-b border-gray-200'}`}
          >
            <Text 
              className={`text-center font-semibold ${activeTab === 'dishes' ? 'text-primary' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Dishes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('restaurants')}
            className={`flex-1 py-3 ${activeTab === 'restaurants' ? 'border-b-2 border-primary' : 'border-b border-gray-200'}`}
          >
            <Text 
              className={`text-center font-semibold ${activeTab === 'restaurants' ? 'text-primary' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Restaurants
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'dishes' ? (
          <ScrollView showsVerticalScrollIndicator={false} className="px-6">
            {favoriteDishes.length > 0 ? (
              favoriteDishes.map((dish) => (
                <TouchableOpacity 
                  key={dish.id}
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
                    source={dish.image} 
                    className="w-24 h-24"
                    resizeMode="cover"
                  />
                  <View className="flex-1 p-3 justify-center">
                    <Text className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{dish.name}</Text>
                    <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{dish.restaurant}</Text>
                    <View className="flex-row justify-between items-center mt-1">
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text className={`ml-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{dish.rating}</Text>
                      </View>
                      <Text className="text-primary font-bold">${dish.price}</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="p-3">
                    <Ionicons name="heart" size={24} color={theme.colors.primary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <View className="flex-1 justify-center items-center py-20">
                <Ionicons 
                  name="heart-outline" 
                  size={80} 
                  color={isDarkMode ? theme.colors.gray[700] : theme.colors.gray[300]} 
                />
                <Text className={`text-lg font-semibold mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No favorite dishes yet
                </Text>
                <Text className={`text-center mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Start adding dishes to your favorites
                </Text>
              </View>
            )}
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} className="px-6">
            {favoriteRestaurants.length > 0 ? (
              favoriteRestaurants.map((restaurant) => (
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
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <View className="flex-row justify-between items-center">
                      <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{restaurant.name}</Text>
                      <TouchableOpacity>
                        <Ionicons name="heart" size={24} color={theme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                    <Text className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{restaurant.cuisine}</Text>
                    <View className="flex-row justify-between items-center mt-2">
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
              ))
            ) : (
              <View className="flex-1 justify-center items-center py-20">
                <Ionicons 
                  name="heart-outline" 
                  size={80} 
                  color={isDarkMode ? theme.colors.gray[700] : theme.colors.gray[300]} 
                />
                <Text className={`text-lg font-semibold mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No favorite restaurants yet
                </Text>
                <Text className={`text-center mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Start adding restaurants to your favorites
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}