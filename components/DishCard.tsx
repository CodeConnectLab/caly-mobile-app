import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '../app/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface DishCardProps {
  name: string;
  image: ImageSourcePropType;
  restaurant: string;
  rating: number;
  price: number;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
  horizontal?: boolean;
}

const DishCard: React.FC<DishCardProps> = ({ 
  name, 
  image, 
  restaurant, 
  rating, 
  price, 
  isFavorite = false,
  onPress,
  onFavoritePress,
  horizontal = false
}) => {
  const { theme, isDarkMode } = useTheme();

  if (horizontal) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        className={`mr-4 rounded-2xl overflow-hidden w-56 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Image 
          source={image} 
          className="w-full h-32"
          resizeMode="cover"
        />
        <View className="p-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-2">
              <Text 
                className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                numberOfLines={1}
              >
                {name}
              </Text>
              <Text 
                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                numberOfLines={1}
              >
                {restaurant}
              </Text>
            </View>
            <TouchableOpacity onPress={onFavoritePress}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={20} 
                color={isFavorite ? theme.colors.primary : isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text className={`ml-1 text-xs ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{rating}</Text>
            </View>
            <Text className="text-primary font-bold text-sm">${price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress}
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
        source={image} 
        className="w-24 h-24"
        resizeMode="cover"
      />
      <View className="flex-1 p-3 justify-center">
        <Text className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{name}</Text>
        <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{restaurant}</Text>
        <View className="flex-row justify-between items-center mt-1">
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className={`ml-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{rating}</Text>
          </View>
          <Text className="text-primary font-bold">${price.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity className="p-3" onPress={onFavoritePress}>
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? theme.colors.primary : isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DishCard;