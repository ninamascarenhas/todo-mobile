import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

type IconName = keyof typeof Ionicons.glyphMap;

interface IconData {
  name: IconName;
  color: string;
}

interface Props {
  title: string;
  date: string;
  done: boolean;
  iconData: IconData;
}

export default function TaskInfo({ title, date, done, iconData }: Props) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const statusBarColor = isDarkMode ? "#030711" : "#9333ea";

  function formatDate(dateString: string) {
    const [year, month, day] = dateString.split("-");
    const localDate = new Date(Number(year), Number(month) - 1, Number(day));
    return localDate.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: iconData.color }]}>
        <Ionicons name={iconData.name} size={24} color="white" />
      </View>
      <View>
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? "#FFFFFF" : "#1F2937" },
            ,
            done && styles.done,
          ]}
          className=""
        >
          {title}
        </Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    color: "#1F2937",
  },
  done: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  date: {
    fontSize: 14,
    color: "#6B7280",
  },
});
