import { Task } from "@/types/task";
import React from "react";
import { View, Text } from "react-native";

interface TaskSummaryProps {
  tasks: Task[];
}

export default function TaskSummary({ tasks }: TaskSummaryProps) {
  const completedCount = tasks.filter((task) => task.done).length;
  const pendingCount = tasks.filter((task) => !task.done).length;

  return (
    <View className="w-full max-w-md flex-row gap-4 my-4">
      <View className="flex-1 bg-purple-100 dark:bg-[#030711] rounded-xl p-4 items-center">
        <Text className="text-2xl font-bold text-purple-600 dark:text-white">
          {completedCount}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          Tarefas Completas
        </Text>
      </View>
      <View className="flex-1 bg-purple-100 dark:bg-[#030711] rounded-xl p-4 items-center">
        <Text className="text-2xl font-bold text-purple-600 dark:text-white">
          {pendingCount}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          Tarefas Pendentes
        </Text>
      </View>
    </View>
  );
}
