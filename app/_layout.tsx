import { Stack } from "expo-router";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { ThemeProvider, useTheme } from "../theme/ThemeContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isDark } = useTheme();

  return (
    <ThemeProvider>
      <SafeAreaProvider
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <SafeAreaView
          className={`flex-1 ${isDark ? "bg-darkSecondary" : "bg-lightGray"}`}
        >
          <StatusBar
          translucent={true}
        backgroundColor={isDark ? "#1A1A1A" : "#EDEFFC"}
        barStyle={isDark ? "light-content" : "dark-content"}
        />

          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#EDEFFC",
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* <Stack.Screen name="dashboard" options={{ headerShown: false }} /> */}
            <Stack.Screen name="adjustgoals" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
