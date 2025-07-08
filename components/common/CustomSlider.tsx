import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface CustomSliderProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  fillColor?: {
    light: string;
    dark: string;
  };
  label?: string;
  unit?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ 
  value, 
  onChange,
  min = 0,
  max = 10,
  fillColor = {
    light: 'bg-lightBlue',
    dark: 'bg-darkLightBlue'
  },
  label,
  unit
}) => {
  const { isDark } = useTheme();
  const [localValue, setLocalValue] = useState(value);
  const sliderWidth = useRef(0);
  const pan = useRef(new Animated.Value(0)).current;
  
  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  // Calculate the position percentage based on value
  const getPositionPercentage = useCallback((val: number) => {
    return Math.min(Math.max(((val - min) / (max - min)) * 100, 0), 100);
  }, [min, max]);
  
  const markerPosition = getPositionPercentage(localValue);
  
  // Create pan responder for dragging
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // @ts-ignore - __getValue is not in the type definitions but exists in the API
        pan.setOffset(pan.__getValue());
        pan.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        pan.setValue(gestureState.dx);
        
        // Calculate new value based on drag position
        if (sliderWidth.current > 0) {
          // @ts-ignore - __getValue is not in the type definitions but exists in the API
          const newPosition = pan.__getValue() / sliderWidth.current * 100;
          const newPercentage = Math.min(Math.max(markerPosition + newPosition, 0), 100);
          const newValue = min + (newPercentage / 100) * (max - min);
          
          // Round to 1 decimal place
          const roundedValue = Math.round(newValue * 10) / 10;
          setLocalValue(roundedValue);
          
          if (onChange) {
            onChange(roundedValue);
          }
        }
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        pan.setValue(0);
      },
    })
  ).current;
  
  // Handle slider layout to get width
  const onSliderLayout = (event: any) => {
    sliderWidth.current = event.nativeEvent.layout.width;
  };
  
  return (
    <View className="w-full px-4 mt-4">
      {/* Triangle marker */}
      <View className="relative">
        <Animated.View 
          {...panResponder.panHandlers}
          className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary z-10" 
          style={{
            left: `${markerPosition}%`,
            transform: [{ translateX: -8 }]
          }}
        />
      </View>
      
      {/* Slider bar */}
      <View 
        className="w-full h-6 flex-row mt-1"
        onLayout={onSliderLayout}
      >
        {/* Left part (empty) */}
        <View 
          className="h-full bg-lightGray" 
          style={{ width: `${markerPosition}%` }} 
        />
        
        {/* Right part (filled) */}
        <View 
          className={`h-full ${isDark ? fillColor.dark : fillColor.light}`} 
          style={{ width: `${100 - markerPosition}%` }} 
        />
      </View>
      
      {/* Tick marks */}
      <View className="w-full h-12 flex-row justify-between mt-1">
        {Array.from({ length: 11 }).map((_, index) => {
          const tickValue = min + (index / 10) * (max - min);
          return (
            <View key={index} className="items-center">
              <View 
                className={`w-0.5 ${index % 5 === 0 ? 'h-4' : 'h-2'} ${isDark ? 'bg-darkDarkGray' : 'bg-darkGray'}`} 
              />
              {index % 5 === 0 && (
                <Text 
                  className={`text-xs mt-1 ${isDark ? 'text-darkDarkGray' : 'text-darkGray'}`}
                >
                  {tickValue}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CustomSlider;