import React from "react";
import "../../globals.css";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, StatusBar, View } from "react-native";
import { useColorScheme } from "nativewind";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={26} style={{ marginBottom: -3 }} {...props} />;
}

export const unstable_settings = {
  unmountOnBlur: true,
};

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const statusBarColor = isDarkMode ? "#030711" : "#9333ea";

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? 20 : 60,
          backgroundColor: statusBarColor,
        }}
      >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
            tabBarInactiveTintColor: isDarkMode ? "#aaa" : "#ccc",
            tabBarStyle: {
              backgroundColor: isDarkMode ? "#030711" : "#fff",
              height: 55,
              paddingTop: Platform.OS === "ios" ? 5 : 0,
              paddingBottom: Platform.OS === "ios" ? 64 : 0,
              borderTopWidth: 0.2,
              borderTopColor: isDarkMode ? "#030711" : "#ccc",
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Tasks",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="checkmark-done" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="two"
            options={{
              title: "Nova",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="add-circle" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="three"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="person" color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </>
  );
}
