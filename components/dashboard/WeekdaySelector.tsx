import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface Day {
  id: number;
  name: string;
  date: number;
  isActive: boolean;
  isToday: boolean;
}

interface WeekdaySelectorProps {
  days: Day[];
  onSelectDay: (id: number) => void;
}

const WeekdaySelector: React.FC<WeekdaySelectorProps> = ({ days, onSelectDay }) => {
  const { isDark } = useTheme();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      className="mb-4"
    >
      {days.map((day) => (
        <TouchableOpacity 
          key={day.id}
          onPress={() => onSelectDay(day.id)}
          className="items-center mr-4"
        >
          <Text 
            className={`text-xs font-medium mb-1 ${isDark ? 'text-white' : 'text-black'}`}
          >
            {day.name}
          </Text>
          <View 
            className={`w-10 h-10 rounded-full items-center justify-center
              ${day.isActive && day.isToday ? 'bg-primary' : ''}
              ${day.isActive && !day.isToday ? 'bg-lightBlue' : ''}
              ${!day.isActive ? (isDark ? 'border border-darkLightGray' : 'border border-lightGray') : ''}
            `}
          >
            <Text 
              className={`font-medium
                ${day.isActive ? 'text-white' : (isDark ? 'text-white' : 'text-darkGray')}
              `}
            >
              {day.date}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default WeekdaySelector;