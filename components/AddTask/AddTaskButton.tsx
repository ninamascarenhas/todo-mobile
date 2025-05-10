import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress: () => void;
}

export default function AddTaskButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" bg-purple-600 w-full max-w-md py-4 rounded-xl shadow-sm active:opacity-80"
    >
      <Text className="text-white text-center font-semibold text-md">
        Adicionar
      </Text>
    </TouchableOpacity>
  );
}
