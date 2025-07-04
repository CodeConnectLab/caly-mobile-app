import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';

export default function ScanScreen() {
  const router = useRouter();
  // Use string literals instead of CameraType enum
  const [type, setType] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    // Camera permissions are not granted yet
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mb-4">We need your permission to show the camera</Text>
        <TouchableOpacity 
          className="bg-primary px-4 py-2 rounded-lg"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        >
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current && !isTakingPicture) {
      try {
        setIsTakingPicture(true);
        const photo = await cameraRef.current.takePictureAsync();
        
        // Save the image to a temporary location
        const fileName = `${FileSystem.cacheDirectory}temp_meal_${Date.now()}.jpg`;
        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileName
        });
        
        // Navigate to meal detail screen with the image URI
        router.push({
          pathname: '/mealdetail',
          params: { imageUri: fileName }
        });
      } catch (error) {
        console.error('Error taking picture:', error);
      } finally {
        setIsTakingPicture(false);
      }
    }
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        facing={type}
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
              
              <TouchableOpacity 
                onPress={takePicture}
                disabled={isTakingPicture}
                className="bg-white rounded-full w-16 h-16 items-center justify-center border-4 border-gray-300">
                <View className="bg-white rounded-full w-14 h-14" />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={toggleCameraType}>
                <Ionicons name="flash" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}