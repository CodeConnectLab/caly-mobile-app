import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  actionText, 
  onAction 
}) => {
  const { isDark } = useTheme();

  return (
    <View className="flex-row justify-between items-center mb-3">
      <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        {title}
      </Text>
      {actionText && onAction && (
        <TouchableOpacity onPress={onAction}>
          <Text className="text-blue-500 font-medium">{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;