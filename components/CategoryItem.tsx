import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '../app/context/ThemeContext';

interface CategoryItemProps {
  name: string;
  image: ImageSourcePropType;
  isActive?: boolean;
  onPress?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ 
  name, 
  image, 
  isActive = false, 
  onPress 
}) => {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`mr-4 items-center ${isActive ? 'opacity-100' : 'opacity-80'}`}
    >
      <View 
        className={`w-16 h-16 rounded-full justify-center items-center mb-2 ${isActive ? 'bg-primary' : isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        <Image 
          source={image} 
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>
      <Text 
        className={`text-sm ${isActive ? 'font-semibold text-primary' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;