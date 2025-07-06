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
    <ScrollView className="flex-1 bg-lightGray">
      <HeaderBar title="Create Food" />
      
      <View className="px-4 py-2">
        {/* Food Details Section */}
        <Text className="text-lg font-semibold mb-2">Food Details</Text>
        
        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Food Name <Text className="text-red-500">*</Text></Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-black bg-white"
            placeholder="Coffee"
            value={foodName}
            onChangeText={setFoodName}
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Brand Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-black"
            placeholder="Nestle Fresh Brued Coffee"
            value={brandName}
            onChangeText={setBrandName}
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium mb-1">Description</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-black"
            placeholder="Hi Calcium Fresh Milk and Fresh Coffee"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Serving Size Section */}
        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-sm font-medium mb-1">Amount</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-black"
              placeholder="1"
              value={servingSize}
              onChangeText={setServingSize}
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-sm font-medium mb-1">Serving</Text>
            <TouchableOpacity 
              className="border border-gray-300 rounded-lg p-3 flex-row justify-between items-center"
              // In a real app, this would open a dropdown
            >
              <Text className="text-black">{servingUnit}</Text>
              <Ionicons name="chevron-down" size={16} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Macro Nutrients Section */}
        <Text className="text-lg font-semibold mb-2 mt-4">Macro Nutrients <Text className="text-red-500">*</Text></Text>
        
        {macroNutrients.map((nutrient, index) => (
          <View key={nutrient.label} className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-medium mb-1">
                {nutrient.label} {nutrient.required && <Text className="text-red-500">*</Text>}
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-black"
                placeholder="0"
                value={nutrient.value}
                onChangeText={(value) => updateMacroNutrient(index, value)}
                keyboardType="numeric"
              />
            </View>
            <View className="w-16 justify-center items-center">
              <Text className="text-sm text-gray-500 mt-6">{nutrient.unit}</Text>
            </View>
          </View>
        ))}

        {/* Additional Nutrients */}
        {additionalNutrients.map((nutrient, index) => (
          <View key={nutrient.label} className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-medium mb-1">{nutrient.label}</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-black"
                placeholder="0"
                value={nutrient.value}
                onChangeText={(value) => updateAdditionalNutrient(index, value)}
                keyboardType="numeric"
              />
            </View>
            <View className="w-16 justify-center items-center">
              <Text className="text-sm text-gray-500 mt-6">{nutrient.unit}</Text>
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