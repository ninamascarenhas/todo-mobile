import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  done: boolean;
  onToggleDone: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskActions({
  done,
  onToggleDone,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View className="flex-row gap-1">
      <TouchableOpacity
        onPress={onToggleDone}
        className="p-1 rounded bg-green-500 flex items-center justify-center"
      >
        <Ionicons
          name={done ? "refresh" : "checkmark-circle"}
          size={18}
          color="#FFF"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onEdit}
        className="p-1 rounded bg-yellow-500 flex items-center justify-center"
      >
        <Ionicons name="brush" size={18} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDelete}
        className="p-1 rounded bg-red-500 flex items-center justify-center"
      >
        <Ionicons name="trash" size={18} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}
