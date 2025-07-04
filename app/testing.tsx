import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../theme/ThemeContext'

const Testing = () => {
  const { isDark } = useTheme()
  
  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-darkSecondary' : 'bg-lightGray'}`}>
      <View className="p-8">
        <Text className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Testing Styles</Text>
        
        <View className="bg-red-500 p-4 rounded-xl mb-4">
          <Text className="text-white font-bold">Red Background</Text>
        </View>
        
        <View className="bg-blue-500 p-4 rounded-xl mb-4">
          <Text className="text-white font-bold">Blue Background</Text>
        </View>
        
        <View className="bg-green-500 p-4 rounded-xl mb-4">
          <Text className="text-white font-bold">Green Background</Text>
        </View>
        
        <TouchableOpacity 
          className="bg-primary p-4 rounded-xl items-center"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Testing