import React, { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import WeatherSuggestion from "@/components/Weather/WeatherSuggestion";
import TaskHeader from "@/components/Greetings/TaskHeader";
import TaskActions from "@/components/Task/TaskActions";
import TaskInfo from "@/components/AddTask/TaskInfo";
import { iconData, mockTasks } from "@/types/task";
import EditTaskModal from "@/components/Task/EditTaskModal";
import { deleteTodo, getTodos, initDatabase, updateTodo } from "@/src/database";
import { useFocusEffect } from "@react-navigation/native";
import NotificationTester from "@/components/Notifications/NotificationTester";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export interface Task {
  id: number;
  title: string;
  done: boolean;
  date: string;
  icon: string;
}

export default function TaskManager() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const handleSave = useCallback(
    async (newTitle: string) => {
      if (editingTask) {
        await updateTodo(editingTask.id, editingTask.done ? 1 : 0, newTitle);
        setEditingTask(null);
        fetchTasks();
      }
    },
    [editingTask]
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  useFocusEffect(
    useCallback(() => {
      const start = async () => {
        await initDatabase();
        await fetchTasks();
      };

      start();
    }, [])
  );

  const fetchTasks = async () => {
    try {
      const result = await getTodos();

      const ordered = result
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .sort((a, b) => Number(a.done) - Number(b.done));
      console.log("Tarefas ordenadas:", ordered);
      setTasks(ordered);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  };
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  type RootTabParamList = {
    index: undefined;
    two: undefined;
    three: undefined;
  };

  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  const userName = "Nina";
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const greeting = getGreeting();

  const renderItem = ({ item }: { item: Task }) => (
    <View className="mt-3 m-2 p-3 rounded-xl mb-2 dark:border-gray-500 border border-gray-100 bg-white dark:bg-[#1f2937] flex-row justify-between items-center">
      <TaskInfo
        title={item.title}
        date={item.date}
        done={item.done}
        iconData={
          iconData.find((icon) => icon.name === item.icon) ?? {
            name: "alert-circle",
            color: "#EF4444",
          }
        }
      />

      <TaskActions
        done={item.done}
        onToggleDone={async () => {
          await updateTodo(item.id, item.done ? 0 : 1);
          fetchTasks();
        }}
        onEdit={() => setEditingTask(item)}
        onDelete={async () => {
          await deleteTodo(item.id);
          fetchTasks();
        }}
      />
    </View>
  );

  return (
    <View className="flex-1 bg-purple-600 dark:bg-[#030711] pt-8">
      <TaskHeader
        greeting={greeting}
        userName={userName}
        currentDate={currentDate}
      >
        <WeatherSuggestion />
      </TaskHeader>

      <View className="flex-1 bg-gray-100 dark:bg-[#1f2937] rounded-t-3xl px-3 pt-6 ">
        <FlatList
          data={[...tasks].sort((a, b) => Number(a.done) - Number(b.done))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View className="items-center justify-center mt-10">
              <Text className="text-gray-600 dark:text-gray-300 text-base font-medium">
                Nenhuma tarefa pendente.
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                Ao adicionar uma tarefa, ela aparecerá aqui! (:
              </Text>
            </View>
          }
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("two" as never)}
          className="absolute bottom-10 right-5 bg-purple-700 size-16 rounded-lg items-center justify-center shadow-lg"
        >
          <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
      </View>
      {editingTask && (
        <EditTaskModal
          visible={true}
          initialValue={editingTask.title}
          onClose={() => setEditingTask(null)}
          onSave={handleSave}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
