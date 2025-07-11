import { useTheme } from "@/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import AppText from "./AppText";

const Streak: React.FC<{ streakCount: number }> = ({ streakCount }) => {
  const { isDark } = useTheme();
  return (
    <View
      className="flex-row items-center rounded-md p-2 gap-2 bg-white"
    >
      <View className="bg-orange-500 rounded-full w-6 h-6 items-center justify-center mr-1">
        <Ionicons name="flame" size={14} color="white" />
      </View>
      <AppText className={`text-base ${isDark ? "text-white" : "text-black"}`}
      style={{fontWeight:"500"}}
      >
        {streakCount}
      </AppText>
    </View>
  );
};

export default Streak;
