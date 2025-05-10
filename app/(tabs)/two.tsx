import React, { useCallback, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import TaskInput from "@/components/AddTask/TaskInput";
import TaskCalendar from "@/components/AddTask/TaskCalendar";
import TaskIconSelector from "@/components/AddTask/TaskIconSelector";
import AddTaskButton from "@/components/AddTask/AddTaskButton";
import { iconData } from "@/types/task";
import TaskHeader from "@/components/Greetings/TaskHeader";
import { getGreeting } from "@/utils/dateUtils";
import { router } from "expo-router";
import { addTodo } from "@/src/database";
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";

export default function TwoScreen() {
  const [task, setTask] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [taskType, setTaskType] = useState("general");
  const addTask = async () => {
    if (!task.trim()) {
      alert("Digite uma tarefa");
      return;
    }

    if (!selectedDate) {
      alert("Selecione uma data");
      return;
    }

    if (!taskType) {
      alert("Escolha um ícone");
      return;
    }

    try {
      await addTodo(task, selectedDate, taskType);

      setTask("");
      setSelectedDate("");
      setTaskType("");

      alert("Tarefa adicionada!");
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
      alert("Erro ao adicionar tarefa.");
    }
  };

  const handleChangeTask = useCallback((text: string) => {
    setTask(text);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <SafeAreaView className="flex-1 bg-purple-600 dark:bg-[#030711] pt-8">
          <TaskHeader
            greeting={getGreeting()}
            userName="Nina"
            currentDate={new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          ></TaskHeader>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
            className="p-4 bg-white dark:bg-[#1f2937] rounded-t-3xl"
          >
            <View className="w-full max-w-md mb-4">
              <Text className="text-md font-semibold text-gray-800 dark:text-white self-start mt-2 mb-4">
                Criar uma nova tarefa
              </Text>
              <TaskInput task={task} onChange={handleChangeTask} />
            </View>

            <View className="w-full max-w-md">
              <Text className="text-md font-semibold text-gray-800 dark:text-white self-start mb-4">
                Selecione uma data
              </Text>
              <TaskCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </View>

            <View className="w-full max-w-md">
              <Text className="text-md font-semibold text-gray-800 dark:text-white self-start mb-4">
                Escolha um ícone
              </Text>
              <TaskIconSelector
                icons={iconData}
                onSelect={setTaskType}
                selected={taskType}
              />
            </View>

            <View
              style={{
                paddingBottom: Platform.OS === "ios" ? 34 : 0,
                paddingHorizontal: 0,
                marginTop: Platform.OS === "ios" ? 34 : 2,
              }}
            >
              <AddTaskButton onPress={addTask} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
