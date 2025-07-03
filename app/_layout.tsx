import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import "../global.css";
import { ThemeProvider } from "../theme/ThemeContext";
// NativeWind setup - no need to import CSS file in React Native

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#EDEFFC',
        }
      }} >
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="adjustgoals" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
