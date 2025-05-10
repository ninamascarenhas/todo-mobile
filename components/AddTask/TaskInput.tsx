import React, { memo } from "react";
import { View, TextInput, Keyboard } from "react-native";

interface Props {
  task: string;
  onChange: (text: string) => void;
}

function TaskInputComponent({ task, onChange }: Props) {
  return (
    <View className="w-full max-w-md">
      <TextInput
        placeholder="O que temos na agenda?"
        value={task}
        onChangeText={onChange}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        className="p-4 border rounded-xl border-[#D1C4E9]  dark:text-white text-gray-600"
        maxLength={25}
      />
    </View>
  );
}

export default memo(TaskInputComponent);
