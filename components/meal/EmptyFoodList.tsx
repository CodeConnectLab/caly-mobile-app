import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface EmptyFoodListProps {
  onCreateFood?: () => void;
}

const EmptyFoodList: React.FC<EmptyFoodListProps> = ({ onCreateFood }) => {
  const { isDark } = useTheme();

  const handleCreateFood = () => {
    if (onCreateFood) {
      onCreateFood();
    } else {
      router.push('/createfood');
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons 
        name="fast-food-outline" 
        size={80} 
        color={isDark ? 'white' : '#888'} 
        style={styles.icon}
      />
      <Text style={[
        styles.title,
        { color: isDark ? 'white' : 'black' }
      ]}>
        No foods created yet
      </Text>
      <Text style={[
        styles.subtitle,
        { color: isDark ? '#9CA3AF' : '#6B7280' }
      ]}>
        Create your first food item to get started
      </Text>
      <TouchableOpacity 
        onPress={handleCreateFood}
        style={styles.button}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.buttonText}>Create a Food</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF', // You may want to replace this with your primary color
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default EmptyFoodList;