import { Ionicons, FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface SelectableOptionProps {
  name: string;
  value: string;
  description?: string;
  icon?: string;
  isSelected: boolean;
  onSelect: () => void;
  multiSelect?: boolean;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
}

const SelectableOption: React.FC<SelectableOptionProps> = ({
  name,
  value,
  description,
  icon,
  isSelected,
  onSelect,
  multiSelect = false,
  iconPosition = 'left',
  iconSize = 24
}) => {
  const { isDark } = useTheme();

  const renderIcon = () => {
    if (!icon) return null;
    
    // Handle different icon types
    if (icon.startsWith('fa-')) {
      return <FontAwesome name={icon.replace('fa-', '')} size={iconSize} color={isSelected ? 'white' : '#2846D0'} />;
    } else if (icon.startsWith('fa5-')) {
      return <FontAwesome5 name={icon.replace('fa5-', '')} size={iconSize} color={isSelected ? 'white' : '#2846D0'} />;
    } else if (icon.startsWith('mc-')) {
      return <MaterialCommunityIcons name={icon.replace('mc-', '')} size={iconSize} color={isSelected ? 'white' : '#2846D0'} />;
    } else if (icon.startsWith('feather-')) {
      return <Feather name={icon.replace('feather-', '')} size={iconSize} color={isSelected ? 'white' : '#2846D0'} />;
    } else if (icon.startsWith('http')) {
      return <Image source={{ uri: icon }} style={{ width: iconSize, height: iconSize }} />;
    } else {
      return <Ionicons name={icon as any} size={iconSize} color={isSelected ? 'white' : '#2846D0'} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={onSelect}
      className={`flex-row justify-between items-center p-4 mb-3 rounded-xl ${isSelected ? 'bg-primary' : (isDark ? 'bg-darkSecondary' : 'bg-white')}`}
    >
      {icon && iconPosition === 'left' && (
        <View className="mr-3">
          {renderIcon()}
        </View>
      )}
      <View className="flex-1">
        <Text className={`font-medium text-lg ${isSelected ? 'text-white' : (isDark ? 'text-white' : 'text-black')}`}>
          {name}
        </Text>
        {description && (
          <Text className={`text-sm mt-1 ${isSelected ? 'text-white' : (isDark ? 'text-darkDarkGray' : 'text-darkGray')}`}>
            {description}
          </Text>
        )}
      </View>
      {icon && iconPosition === 'right' ? (
        <View className="ml-3">
          {renderIcon()}
        </View>
      ) : (
        <View className={`w-6 h-6 rounded-full items-center justify-center ${isSelected ? 'bg-white' : 'border border-gray-300'}`}>
          {isSelected && (
            <Ionicons 
              name={multiSelect ? "checkmark" : "checkmark"} 
              size={16} 
              color="#2846D0" 
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SelectableOption;