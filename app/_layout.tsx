import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "../theme/ThemeContext";
// NativeWind setup - no need to import CSS file in React Native
import "@/global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#EDEFFC',
        }
      }} />
    </ThemeProvider>
  );
}
