import { useEffect } from "react";
import { Platform } from "react-native";

export function useToggleDarkMode(isDark: boolean) {
  useEffect(() => {
    if (Platform.OS === "web") {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, [isDark]);
}
