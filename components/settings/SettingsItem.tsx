import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

interface SettingsItemProps {
  icon: string;
  iconColor?: string;
  iconBgColor?: string;
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
  onPress: () => void;
  destructive?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  iconColor = '#3B82F6',
  iconBgColor = '#EFF6FF',
  title,
  subtitle,
  rightElement,
  onPress,
  destructive = false,
}) => {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity 
      className="py-3"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View 
          className="p-2 rounded-lg mr-3"
          style={{ backgroundColor: iconBgColor }}
        >
          <Ionicons name={icon as any} size={24} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text 
            className={`font-medium ${destructive ? 'text-red-500' : isDark ? 'text-white' : 'text-black'}`}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightElement ? (
          rightElement
        ) : (
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={isDark ? '#9CA3AF' : '#6B7280'} 
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;