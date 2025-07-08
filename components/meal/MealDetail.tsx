import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import SaveButton from '../common/SaveButton';

interface NutrientInfo {
  label: string;
  value: number;
  unit: string;
  editable?: boolean;
}

interface MealDetailProps {
  imageUri?: string;
  mealName: string;
  calories: number;
  nutrients: {
    mainNutrients: NutrientInfo[];
    macroNutrients: NutrientInfo[];
  };
  onSave: () => void;
  onDelete?: () => void;
}

const MealDetail: React.FC<MealDetailProps> = ({
  imageUri,
  mealName,
  calories,
  nutrients,
  onSave,
  onDelete,
}) => {
  const { isDark } = useTheme();
  const [measurementUnit, setMeasurementUnit] = useState<'Cup' | 'g' | 'Serving'>('Cup');
  const [servings, setServings] = useState(1);

  const handleUnitChange = (unit: 'Cup' | 'g' | 'Serving') => {
    setMeasurementUnit(unit);
  };

  const increaseServings = () => {
    setServings(prev => Math.min(prev + 1, 10));
  };

  const decreaseServings = () => {
    setServings(prev => Math.max(prev - 1, 1));
  };

  return (
    <ScrollView>
    <View className="flex-1 bg-white">
      {/* Image Header */}
      <ImageBackground
        source={imageUri ? { uri: imageUri } : require('../../assets/images/icon.png')}
        className="h-56 w-full"
      >
        <SafeAreaView className="flex-1">
          <View className="flex-row justify-between items-center px-4 pt-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-semibold">Meal Details</Text>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Content */}
      <View className="flex-1 bg-white rounded-t-3xl -mt-6 px-4 pt-6">
        {/* Meal Name */}
        <Text className="text-2xl font-bold text-black mb-4">{mealName}</Text>

        {/* Measurement Unit Toggle */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-black mb-2">Measurement</Text>
          <View className="flex-row bg-gray-100 rounded-lg overflow-hidden">
            <TouchableOpacity
              className={`py-2 px-4 ${measurementUnit === 'Cup' ? 'bg-primary' : 'bg-gray-100'}`}
              onPress={() => handleUnitChange('Cup')}
            >
              <Text className={`${measurementUnit === 'Cup' ? 'text-white' : 'text-black'}`}>Cup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-2 px-4 ${measurementUnit === 'g' ? 'bg-primary' : 'bg-gray-100'}`}
              onPress={() => handleUnitChange('g')}
            >
              <Text className={`${measurementUnit === 'g' ? 'text-white' : 'text-black'}`}>g</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-2 px-4 ${measurementUnit === 'Serving' ? 'bg-primary' : 'bg-gray-100'}`}
              onPress={() => handleUnitChange('Serving')}
            >
              <Text className={`${measurementUnit === 'Serving' ? 'text-white' : 'text-black'}`}>Serving</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Number of Servings */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-black mb-2">Number of Servings</Text>
          <View className="flex-row items-center justify-end bg-white rounded-full border border-gray-200 py-1 px-2">
            <TouchableOpacity onPress={decreaseServings} className="bg-gray-100 rounded-full p-1">
              <Ionicons name="remove" size={18} color="black" />
            </TouchableOpacity>
            <Text className="mx-4 text-center text-black font-bold">{servings}</Text>
            <TouchableOpacity onPress={increaseServings} className="bg-gray-100 rounded-full p-1">
              <Ionicons name="add" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Nutrients */}
        {nutrients.mainNutrients.map((nutrient, index) => (
          <NutrientRow
            key={index}
            label={nutrient.label}
            value={nutrient.value}
            unit={nutrient.unit}
            editable={nutrient.editable}
          />
        ))}

        {/* Macro Nutrients Section */}
        <Text className="text-base font-semibold text-black mt-4 mb-2">Macro Nutrients</Text>
        {nutrients.macroNutrients.map((nutrient, index) => (
          <NutrientRow
            key={index}
            label={nutrient.label}
            value={nutrient.value}
            unit={nutrient.unit}
            editable={nutrient.editable}
          />
        ))}

        {/* Save Button */}
        <View className="mt-6 mb-8">
          <SaveButton onPress={onSave} />
          {onDelete && (
            <TouchableOpacity onPress={onDelete} className="mt-2">
              <Text className="text-center text-red-500">Delete Meal</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
        </ScrollView>

  );
};

interface NutrientRowProps {
  label: string;
  value: number;
  unit: string;
  editable?: boolean;
}

const NutrientRow: React.FC<NutrientRowProps> = ({ label, value, unit, editable }) => {
  return (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
      <Text className="text-black font-medium">{label}</Text>
      <View className="flex-row items-center">
        <Text className="text-black font-bold mr-1">{value}</Text>
        <Text className="text-gray-500">{unit}</Text>
        {editable && (
          <TouchableOpacity className="ml-2">
            <Ionicons name="pencil" size={16} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MealDetail;