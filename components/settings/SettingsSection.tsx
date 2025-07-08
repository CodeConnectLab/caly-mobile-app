import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface SettingsSectionProps {
  title?: string;
  children: ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  const { isDark } = useTheme();

  return (
    <View className="mb-6">
      {title && (
        <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {title.toUpperCase()}
        </Text>
      )}
      <View className={`rounded-xl overflow-hidden ${isDark ? 'bg-darkCard' : 'bg-white'}`}>
        <View className="px-4">
          {React.Children.map(children, (child, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <View className={`h-px ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />
              )}
              {child}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SettingsSection;