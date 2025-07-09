import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface NumericInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  unit?: string;
}

const NumericInput: React.FC<NumericInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  unit
}) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    // Only allow numbers and decimal point
    const numericRegex = /^\d*\.?\d*$/;
    if (text === '' || numericRegex.test(text)) {
      onChangeText(text);
    }
  };

  return (
    <View className="mb-4">
      <Text className={`text-sm mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
        {label}
      </Text>
      <View 
        className={`flex-row items-center px-4 py-3 rounded-xl ${isDark ? 'bg-darkSecondary' : 'bg-white'} ${isFocused ? 'border border-primary' : ''}`}
      >
        <TextInput
          className={`flex-1 text-lg ${isDark ? 'text-white' : 'text-black'}`}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          keyboardType="numeric"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {unit && (
          <Text className={`text-lg ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}>
            {unit}
          </Text>
        )}
      </View>
    </View>
  );
};

export default NumericInput;