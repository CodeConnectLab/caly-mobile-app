import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../app/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onFilterPress?: () => void;
  showFilter?: boolean;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = 'Search for food, restaurants...', 
  value, 
  onChangeText, 
  onSubmit,
  onFilterPress,
  showFilter = true,
  autoFocus = false
}) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <View className="flex-row items-center">
      <View 
        className={`flex-1 flex-row items-center px-4 py-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        <Ionicons 
          name="search-outline" 
          size={20} 
          color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
        />
        <TextInput
          className={`flex-1 ml-2 text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode ? theme.colors.gray[500] : theme.colors.gray[400]}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          autoFocus={autoFocus}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {showFilter && (
        <TouchableOpacity 
          className={`ml-3 p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
          onPress={onFilterPress}
        >
          <Ionicons 
            name="options-outline" 
            size={20} 
            color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;