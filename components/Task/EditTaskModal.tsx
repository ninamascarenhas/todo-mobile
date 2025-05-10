import React, { useState, useEffect, memo, useCallback } from "react";
import { Modal, View, TextInput, Text, TouchableOpacity } from "react-native";

interface Props {
  visible: boolean;
  initialValue: string;
  onClose: () => void;
  onSave: (newTitle: string) => void;
}

function EditTaskModalComponent({
  visible,
  initialValue,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState(initialValue);

  useEffect(() => {
    setTitle(initialValue);
  }, [initialValue]);

  const handleSave = useCallback(() => {
    onSave(title);
  }, [onSave, title]);

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/40 px-4">
        <View className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
          <Text className="text-lg font-semibold mb-4 text-center">
            Editar Tarefa
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-100 focus:outline-none focus:border-[#D1C4E9]"
            placeholder="Digite o novo título"
            maxLength={25}
          />
          <View className="flex-row flex w-full justify-between gap-2">
            <TouchableOpacity
              className="bg-gray-300 flex-1 px-4 py-3 rounded-lg"
              onPress={onClose}
            >
              <Text className="text-gray-800  text-center">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-purple-600 flex-1 px-4 py-3 rounded-lg"
              onPress={handleSave}
            >
              <Text className="text-white  text-center">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default memo(EditTaskModalComponent);
