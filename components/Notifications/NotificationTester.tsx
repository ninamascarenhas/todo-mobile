import React, { useEffect } from "react";
import { Button, Platform, TouchableOpacity, View, Text } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export default function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      await Notifications.requestPermissionsAsync();

      if (Platform.OS === "android" && Constants.appOwnership !== "expo") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };

    setupNotifications();
  }, []);

  const scheduleNotification = async () => {
    if (Constants.appOwnership === "expo" && Platform.OS === "android") {
      console.warn(
        "Notificações não funcionam no Expo Go Android. Use um Dev Build."
      );
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🔔 Lembrete de tarefa",
          body: "Você tem uma tarefa pendente hoje!",
        },
        trigger: {
          seconds: 5,
          repeats: false,
        } as any,
      });
      console.log("Notificação agendada com sucesso!");
    } catch (error) {
      console.error("Erro ao agendar notificação:", error);
    }
  };

  return (
    <View
      style={{ paddingTop: 20, justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity
        onPress={scheduleNotification}
        style={{
          backgroundColor: "#f3e8ff",
          paddingVertical: 12,
          paddingHorizontal: 28,
          borderRadius: 8,
          width: "100%",
        }}
      >
        <Text
          style={{ color: "#4b5563", fontWeight: "600", textAlign: "center" }}
        >
          Agendar Notificação
        </Text>
      </TouchableOpacity>
    </View>
  );
}
