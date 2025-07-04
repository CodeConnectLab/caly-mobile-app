import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

export default function ScanScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mb-4">We need your permission to show the camera</Text>
        <TouchableOpacity 
          className="bg-primary px-4 py-2 rounded-lg"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current: CameraType) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }

  return (
    <View className="flex-1 bg-black">
      <Camera 
        style={StyleSheet.absoluteFillObject}
        type={type}
        ref={cameraRef}
      >
        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-center px-4 pt-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-semibold">Scan meal</Text>
            <View style={{ width: 28 }} />
          </View>

          {/* Camera frame */}
          <View className="flex-1 justify-center items-center">
            <View className="w-full h-full justify-center items-center">
              {/* Corner indicators */}
              <View className="absolute top-0 left-0 border-t-4 border-l-4 border-white w-20 h-20" />
              <View className="absolute top-0 right-0 border-t-4 border-r-4 border-white w-20 h-20" />
              <View className="absolute bottom-0 left-0 border-b-4 border-l-4 border-white w-20 h-20" />
              <View className="absolute bottom-0 right-0 border-b-4 border-r-4 border-white w-20 h-20" />
            </View>
          </View>

          {/* Bottom controls */}
          <View className="pb-8">
            {/* Scan options */}
            <View className="flex-row justify-center space-x-4 mb-8">
              <TouchableOpacity className="bg-white/80 rounded-full px-6 py-3 items-center">
                <Ionicons name="camera" size={24} color="black" />
                <Text className="text-black font-medium mt-1">Meal Scan</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="bg-white/80 rounded-full px-6 py-3 items-center">
                <Ionicons name="barcode" size={24} color="black" />
                <Text className="text-black font-medium mt-1">Barcode</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="bg-white/80 rounded-full px-6 py-3 items-center">
                <Ionicons name="pricetag" size={24} color="black" />
                <Text className="text-black font-medium mt-1">Food Label</Text>
              </TouchableOpacity>
            </View>

            {/* Camera controls */}
            <View className="flex-row justify-around items-center">
              <TouchableOpacity>
                <Ionicons name="images" size={30} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity className="bg-white rounded-full w-16 h-16 items-center justify-center border-4 border-gray-300">
                <View className="bg-white rounded-full w-14 h-14" />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={toggleCameraType}>
                <Ionicons name="flash" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Camera>
    </View>
  );
}