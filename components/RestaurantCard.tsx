import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '../app/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface RestaurantCardProps {
  name: string;
  image: ImageSourcePropType;
  cuisine: string;
  rating: number;
  distance: string;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
  style?: any;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  name, 
  image, 
  cuisine, 
  rating, 
  distance, 
  isFavorite = false,
  onPress,
  onFavoritePress,
  style
}) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`mb-4 rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        ...style
      }}
    >
      <Image 
        source={image} 
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-3">
        <View className="flex-row justify-between items-center">
          <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{name}</Text>
          <TouchableOpacity onPress={onFavoritePress}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? theme.colors.primary : isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
            />
          </TouchableOpacity>
        </View>
        <Text className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cuisine}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className={`ml-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{rating}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons 
              name="location-outline" 
              size={16} 
              color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
            />
            <Text className={`ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;