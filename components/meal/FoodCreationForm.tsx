import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import HeaderBar from '../common/HeaderBar';
import SaveButton from '../common/SaveButton';

interface NutrientField {
  label: string;
  value: string;
  unit: string;
  required?: boolean;
}

interface FoodCreationFormProps {
  onSubmit: (foodData: any) => void;
}

const FoodCreationForm: React.FC<FoodCreationFormProps> = ({ onSubmit }) => {
  const { isDark } = useTheme();
  const [foodName, setFoodName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [servingSize, setServingSize] = useState('1');
  const [servingUnit, setServingUnit] = useState('Serving');
  
  // Macro nutrients
  const [macroNutrients, setMacroNutrients] = useState<NutrientField[]>([
    { label: 'Calories', value: '', unit: 'kcal', required: true },
    { label: 'Total Fat', value: '', unit: 'g', required: true },
    { label: 'Total Carbohydrate', value: '', unit: 'g', required: true },
    { label: 'Protein', value: '', unit: 'g', required: true },
  ]);

  // Additional nutrients
  const [additionalNutrients, setAdditionalNutrients] = useState<NutrientField[]>([
    { label: 'Saturated Fat', value: '', unit: 'g' },
    { label: 'Cholesterol', value: '', unit: 'mg' },
    { label: 'Sodium', value: '', unit: 'mg' },
    { label: 'Dietary Fiber', value: '', unit: 'g' },
    { label: 'Total Sugars', value: '', unit: 'g' },
    { label: 'Vitamin D', value: '', unit: 'mcg' },
    { label: 'Iron', value: '', unit: 'mg' },
    { label: 'Potassium', value: '', unit: 'mg' },
  ]);

  const updateMacroNutrient = (index: number, value: string) => {
    const updated = [...macroNutrients];
    updated[index].value = value;
    setMacroNutrients(updated);
  };

  const updateAdditionalNutrient = (index: number, value: string) => {
    const updated = [...additionalNutrients];
    updated[index].value = value;
    setAdditionalNutrients(updated);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!foodName) {
      alert('Food name is required');
      return;
    }

    const requiredMacros = macroNutrients.filter(n => n.required && !n.value);
    if (requiredMacros.length > 0) {
      alert(`${requiredMacros[0].label} is required`);
      return;
    }

    // Prepare data for submission
    const foodData = {
      name: foodName,
      brand: brandName,
      description,
      servingSize: parseFloat(servingSize),
      servingUnit,
      nutrients: {
        macroNutrients: macroNutrients.map(n => ({
          ...n,
          value: n.value ? parseFloat(n.value) : 0
        })),
        additionalNutrients: additionalNutrients.map(n => ({
          ...n,
          value: n.value ? parseFloat(n.value) : 0
        }))
      }
    };

    onSubmit(foodData);
    router.back();
  };

  return (
    <ScrollView className={`flex-1 ${isDark ? 'bg-darkBackground' : 'bg-lightGray'}`}>
      <HeaderBar title="Create Food" />
      
      <View className="px-4 py-2">
        {/* Food Details Section */}
        <Text className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Food Details</Text>
        
        <View className="mb-4">
          <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Food Name <Text className="text-red-500">*</Text></Text>
          <TextInput
            className={`border ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-3`}
            placeholder="Coffee"
            placeholderTextColor={isDark ? '#999' : '#BBBBBB'}
            value={foodName}
            onChangeText={setFoodName}
          />
        </View>

        <View className="mb-4">
          <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Brand Name</Text>
          <TextInput
            className={`border ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-3`}
            placeholder="Nestle Fresh Brued Coffee"
            placeholderTextColor={isDark ? '#999' : '#BBBBBB'}
            value={brandName}
            onChangeText={setBrandName}
          />
        </View>

        <View className="mb-4">
          <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Description</Text>
          <TextInput
            className={`border ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-3`}
            placeholder="Hi Calcium Fresh Milk and Fresh Coffee"
            placeholderTextColor={isDark ? '#999' : '#BBBBBB'}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Serving Size Section */}
        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Amount</Text>
            <TextInput
              className={`border ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-3`}
              placeholder="1"
              placeholderTextColor={isDark ? '#999' : '#BBBBBB'}
              value={servingSize}
              onChangeText={setServingSize}
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1 ml-2">
            <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-black'}`}>Serving</Text>
            <TouchableOpacity 
              className={`border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'} rounded-lg p-3 flex-row justify-between items-center`}
              // In a real app, this would open a dropdown
            >
              <Text className={isDark ? 'text-white' : 'text-black'}>{servingUnit}</Text>
              <Ionicons name="chevron-down" size={16} color={isDark ? '#999' : '#888'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Macro Nutrients Section */}
        <Text className={`text-lg font-semibold mb-2 mt-4 ${isDark ? 'text-white' : 'text-black'}`}>Macro Nutrients <Text className="text-red-500">*</Text></Text>
        
        {macroNutrients.map((nutrient, index) => (
          <View key={nutrient.label} className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                {nutrient.label} {nutrient.required && <Text className="text-red-500">*</Text>}
              </Text>
              <TextInput
                className={`border ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-3`}
                placeholder="0"
                placeholderTextColor={isDark ? '#999' : '#BBBBBB'}
                value={nutrient.value}
                onChangeText={(value) => updateMacroNutrient(index, value)}
                keyboardType="numeric"
              />
            </View>
            <View className="w-16 justify-center items-center">
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-6`}>{nutrient.unit}</Text>
            </View>
          </View>
        ))}

        {/* Additional Nutrients */}
        {additionalNutrients.map((nutrient, index) => (
          <View key={nutrient.label} className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{nutrient.label}</Text>
              <TextInput
                className={`border ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-3`}
                placeholder="0"
                placeholderTextColor={isDark ? '#999' : '#BBBBBB'}
                value={nutrient.value}
                onChangeText={(value) => updateAdditionalNutrient(index, value)}
                keyboardType="numeric"
              />
            </View>
            <View className="w-16 justify-center items-center">
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-6`}>{nutrient.unit}</Text>
            </View>
          </View>
        ))}

        {/* Submit Button */}
        <View className="my-6">
          <SaveButton onPress={handleSubmit} label="Submit" />
        </View>
      </View>
    </ScrollView>
  );
};

export default FoodCreationForm;