import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface HeaderBarProps {
  title: string;
  onBack?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ 
  title, 
  onBack = () => router.back() 
}) => {
  const { isDark } = useTheme();

  return (
    <View className="flex-row items-center px-4 py-4">
      <TouchableOpacity onPress={onBack} className="mr-4">
        <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
      </TouchableOpacity>
      <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderBar;