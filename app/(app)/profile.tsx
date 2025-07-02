import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Personal Information', action: () => {} },
        { icon: 'notifications-outline', label: 'Notifications', action: () => {} },
        { icon: 'lock-closed-outline', label: 'Privacy & Security', action: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'language-outline', label: 'Language', value: 'English', action: () => {} },
        { 
          icon: 'moon-outline', 
          label: 'Dark Mode', 
          isToggle: true, 
          value: isDarkMode, 
          action: toggleTheme 
        },
        { icon: 'location-outline', label: 'Location', action: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help Center', action: () => {} },
        { icon: 'chatbubble-outline', label: 'Contact Us', action: () => {} },
        { icon: 'document-text-outline', label: 'Terms & Policies', action: () => {} },
      ],
    },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Profile Header */}
        <View className="items-center pt-6 pb-8">
          <View className="relative">
            <Image 
              source={require('../../assets/images/react-logo.png')} 
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-primary rounded-full p-2"
              onPress={() => {}}
            >
              <Ionicons name="camera-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text className={`text-xl font-bold mt-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Alex Johnson
          </Text>
          <Text className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            alex.johnson@example.com
          </Text>
          
          <TouchableOpacity 
            className="mt-4 px-6 py-2 border border-primary rounded-full"
            onPress={() => {}}
          >
            <Text className="text-primary font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className={`flex-row justify-around mx-6 py-4 rounded-xl mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <View className="items-center">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>28</Text>
            <Text className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Scanned</Text>
          </View>
          <View className="items-center">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>16</Text>
            <Text className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Favorites</Text>
          </View>
          <View className="items-center">
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>5</Text>
            <Text className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Reviews</Text>
          </View>
        </View>

        {/* Settings Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-6">
            <Text className={`px-6 mb-2 text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {section.title}
            </Text>
            <View className={`mx-6 rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex}
                  onPress={item.isToggle ? undefined : item.action}
                  className={`flex-row items-center justify-between px-4 py-3.5 ${itemIndex !== section.items.length - 1 ? isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200' : ''}`}
                >
                  <View className="flex-row items-center">
                    <Ionicons 
                      name={item.icon} 
                      size={22} 
                      color={isDarkMode ? theme.colors.gray[300] : theme.colors.gray[600]} 
                    />
                    <Text className={`ml-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.label}
                    </Text>
                  </View>
                  
                  {item.isToggle ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.action}
                      trackColor={{ false: '#767577', true: theme.colors.primary }}
                      thumbColor="#f4f3f4"
                    />
                  ) : item.value ? (
                    <View className="flex-row items-center">
                      <Text className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.value}</Text>
                      <Ionicons 
                        name="chevron-forward" 
                        size={18} 
                        color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
                      />
                    </View>
                  ) : (
                    <Ionicons 
                      name="chevron-forward" 
                      size={18} 
                      color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[500]} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity 
          className={`mx-6 mb-8 py-3.5 rounded-xl flex-row justify-center items-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
          onPress={() => {}}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text className="ml-2 text-[#FF3B30] font-semibold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}