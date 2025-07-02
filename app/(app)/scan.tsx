import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function ScanScreen() {
  const { theme, isDarkMode } = useTheme();
  const [flashOn, setFlashOn] = useState(false);
  const [scanning, setScanning] = useState(false);

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  const startScan = () => {
    setScanning(true);
    // In a real app, this would activate the camera and start scanning
    // For this demo, we'll just simulate scanning for a few seconds
    setTimeout(() => {
      setScanning(false);
      // Here you would navigate to a results screen or show results
    }, 3000);
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Camera View (simulated) */}
      <View className="flex-1 justify-center items-center">
        {/* Camera frame */}
        <View 
          className={`w-full aspect-square max-w-md border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-3xl overflow-hidden`}
          style={styles.cameraView}
        >
          {/* Scanning animation */}
          {scanning && (
            <View className="absolute top-0 left-0 right-0 h-1 bg-primary" style={styles.scanLine} />
          )}
          
          {/* Scan area guides */}
          <View className="absolute inset-0 flex-row justify-between p-4">
            <View className="flex-row justify-between w-full">
              <View className="h-16 w-16 border-t-4 border-l-4 border-primary rounded-tl-lg" />
              <View className="h-16 w-16 border-t-4 border-r-4 border-primary rounded-tr-lg" />
            </View>
          </View>
          <View className="absolute inset-0 flex-row justify-between items-end p-4">
            <View className="flex-row justify-between w-full">
              <View className="h-16 w-16 border-b-4 border-l-4 border-primary rounded-bl-lg" />
              <View className="h-16 w-16 border-b-4 border-r-4 border-primary rounded-br-lg" />
            </View>
          </View>
          
          {/* Scan instructions */}
          <View className="absolute bottom-10 left-0 right-0 items-center">
            <Text className="text-white text-lg font-semibold text-center px-6 py-2 bg-black bg-opacity-50 rounded-full">
              {scanning ? 'Scanning...' : 'Position food in frame'}
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View className="flex-row justify-around items-center w-full mt-10 px-6">
          {/* Flash toggle */}
          <TouchableOpacity 
            onPress={toggleFlash}
            className={`p-4 rounded-full ${flashOn ? 'bg-primary' : isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={styles.controlButton}
          >
            <Ionicons 
              name={flashOn ? 'flash' : 'flash-off'} 
              size={24} 
              color={flashOn ? 'white' : isDarkMode ? theme.colors.gray[400] : theme.colors.gray[700]} 
            />
          </TouchableOpacity>
          
          {/* Scan button */}
          <TouchableOpacity 
            onPress={startScan}
            className="bg-primary p-6 rounded-full"
            style={styles.scanButton}
            disabled={scanning}
          >
            <Ionicons name="camera" size={32} color="white" />
          </TouchableOpacity>
          
          {/* Gallery button */}
          <TouchableOpacity 
            className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={styles.controlButton}
          >
            <Ionicons 
              name="images-outline" 
              size={24} 
              color={isDarkMode ? theme.colors.gray[400] : theme.colors.gray[700]} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Bottom info */}
      <View className="pb-6 px-6">
        <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Scan any food to get instant nutritional information
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cameraView: {
    backgroundColor: '#000',
  },
  scanLine: {
    height: 2,
    width: '100%',
    animation: 'scan 2s linear infinite',
  },
  controlButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});