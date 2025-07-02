import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const BottomTabBar = () => {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { name: 'Home', icon: 'home', route: '/dashboard' },
    { name: 'Meals', icon: 'fast-food', route: '/meals' },
    { name: 'Scan', icon: 'scan-circle', route: '/scan' },
    { name: 'Analytics', icon: 'analytics', route: '/analytics' },
    { name: 'Settings', icon: 'settings', route: '/settings' },
  ];

  return (
    <View className={`flex-row justify-between items-center px-4 py-2 ${isDark ? 'bg-darkSecondary' : 'bg-secondary'} border-t ${isDark ? 'border-darkLightGray' : 'border-lightGray'}`}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            className="items-center justify-center py-2"
            // onPress={() => router.push(tab.route)}
          >
            {tab.name === 'Scan' ? (
              <View className="bg-primary rounded-full p-3 -mt-6">
                <Ionicons name={tab.icon as any} size={24} color="white" />
              </View>
            ) : (
              <>
                <Ionicons
                  name={tab.icon as any}
                  size={20}
                  color={isActive ? (isDark ? '#3A5AE8' : '#2846D0') : (isDark ? '#666666' : '#BBBBBB')}
                />
                <Text
                  className={`text-xs mt-1 ${isActive ? (isDark ? 'text-darkPrimary' : 'text-primary') : (isDark ? 'text-darkDarkGray' : 'text-darkGray')}`}
                >
                  {tab.name}
                </Text>
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;