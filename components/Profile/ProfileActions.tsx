import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TaskManager from "@/app/(tabs)";

interface Props {
  onAddTask: () => void;
  onLogout: () => void;
}

export default function ProfileActions({ onAddTask, onLogout }: Props) {
  return (
    <View className="w-full max-w-xl  mt-2">
      <TouchableOpacity
        onPress={onAddTask}
        className="dark:bg-gray-600 bg-purple-600 p-4 rounded-lg w-full"
      >
        <Text className="text-white text-center font-semibold">
          Adicionar Nova Tarefa
        </Text>
      </TouchableOpacity>
    </View>
  );
}
