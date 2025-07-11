import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function Index() {
  const { isDark } = useTheme();
  useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // const onboardedStatus = await AsyncStorage.getItem('isOnboarded');
        // setIsOnboarded(onboardedStatus === true);
        setIsOnboarded(false);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setIsOnboarded(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (isOnboarded !== null) {
      // Use replace to avoid adding to navigation stack
      router.replace(isOnboarded ? "/dashboard" : "/onboarding");
    }
  }, [isOnboarded, router]);

  // Show loading indicator while checking onboarding status
  return (
    <View
      className={`flex-1 items-center justify-center ${
        isDark ? "bg-darkPrimary" : "bg-lightGray"
      }`}
    >
      <ActivityIndicator size="large" color="#2846D0" />
    </View>
  );
}
