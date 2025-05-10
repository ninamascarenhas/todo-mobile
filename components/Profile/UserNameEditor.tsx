import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface Props {
  name: string;
  isEditing: boolean;
  onChangeName: (text: string) => void;
  onToggleEdit: () => void;
}
export default function UserNameEditorComponent({
  name,
  isEditing,
  onChangeName,
}: Props) {
  return (
    <View
      className="flex-row items-center gap-4"
      style={{ justifyContent: "center" }}
    >
      {isEditing ? (
        <TextInput
          value={name}
          onChangeText={onChangeName}
          className="text-2xl font-bold text-gray-800 dark:text-white border-b border-gray-300 px-2"
          autoFocus
          maxLength={25}
        />
      ) : (
        <Text className="text-2xl font-bold text-gray-800 dark:text-white">
          {name}
        </Text>
      )}
    </View>
  );
}
