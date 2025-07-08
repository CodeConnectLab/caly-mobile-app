import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const WaterMeter = ({navigateToWaterIntake}:{navigateToWaterIntake:()=>void}) => {
const { isDark } = useTheme();

  return (
   <View className={`mt-4 p-4 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} shadow-sm`}>
            <View className="flex-row justify-between items-center mb-2">
              <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                Water Intake
              </Text>
              <TouchableOpacity onPress={navigateToWaterIntake}>
                <Ionicons name="pencil" size={18} color={isDark ? '#3A5AE8' : '#2846D0'} />
              </TouchableOpacity>
            </View>
            
            <View className="flex-row items-center">
              <Ionicons name="water" size={24} color={isDark ? '#8A94E8' : '#AAB2FF'} />
              <View className="ml-2">
                <Text className={`text-sm ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
                  Daily Goal
                </Text>
                <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  5 Liter
                </Text>
              </View>
              <View className="flex-1 ml-4">
                <View className="h-3 bg-lightGray rounded-full overflow-hidden">
                  <View className="h-full bg-lightBlue" style={{ width: '60%' }} />
                </View>
                <Text className={`text-xs mt-1 text-right ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
                  3/5 L
                </Text>
              </View>
            </View>
          </View>
  )
}

export default WaterMeter