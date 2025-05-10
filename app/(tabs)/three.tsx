import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getGreeting } from "@/utils/dateUtils";
import ProfileImagePicker from "@/components/Profile/ProfileImagePicker";
import UserNameEditor from "@/components/Profile/UserNameEditor";
import ProfileActions from "@/components/Profile/ProfileActions";
import TaskHeader from "@/components/Greetings/TaskHeader";
import WeatherSuggestion from "@/components/Weather/WeatherSuggestion";
import TaskSummary from "@/components/Profile/TaskSummary";
import { mockTasks, Task } from "@/types/task";
import { getTodos, getUser, saveUser } from "@/src/database";
import NotificationTester from "@/components/Notifications/NotificationTester";
import { Feather } from "@expo/vector-icons";

export default function PerfilScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("Nina");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      if (user) {
        setUserName(user.name);
        setProfileImage(user.avatar);
      }
    };
    loadUser();
  }, []);

  const pickImage = useCallback(() => {
    Alert.alert("Selecionar imagem", "Escolha uma opção:", [
      {
        text: "Câmera",
        onPress: async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (!permission.granted) {
            alert("Permissão para usar a câmera negada.");
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled && result.assets?.[0]?.uri) {
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            await saveUser(userName, "nina@example.com", uri);
          }
        },
      },
      {
        text: "Galeria",
        onPress: async () => {
          const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!permission.granted) {
            alert("Permissão para acessar a galeria negada.");
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled && result.assets?.[0]?.uri) {
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            await saveUser(userName, "nina@example.com", uri);
          }
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  }, [userName]);

  const onChangeName = useCallback((text: string) => {
    setUserName(text);
  }, []);

  const onToggleEdit = useCallback(() => {
    if (isEditingName) {
      saveUser(userName, "nina@example.com", profileImage ?? "");
    }
    setIsEditingName((prev) => !prev);
  }, [isEditingName, userName, profileImage]);

  const navigateToAddTask = useCallback(() => {
    navigation.navigate("two" as never);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    console.log("Logout...");
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchTasks = async () => {
        const result = await getTodos();
        setTasks(result);
      };

      fetchTasks();
    }, [])
  );

  return (
    <View className="flex-1 bg-purple-600 dark:bg-[#030712] pt-8">
      <TaskHeader
        greeting={getGreeting()}
        userName="Nina"
        currentDate={new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      >
        <WeatherSuggestion />
      </TaskHeader>

      <View className="flex flex-col justify-center items-center p-4 bg-white dark:bg-[#1f2937] rounded-t-3xl gap-4 flex-1">
        <TouchableOpacity
          onPress={onToggleEdit}
          className="absolute top-4 right-4 z-10 "
        >
          <Feather
            name={isEditingName ? "check" : "edit-2"}
            size={22}
            color="gray"
          />
        </TouchableOpacity>

        <View className="mt-10">
          <ProfileImagePicker image={profileImage} onPickImage={pickImage} />
        </View>

        <View className="w-full max-w-md flex flex-col items-center">
          <UserNameEditor
            name={userName}
            isEditing={isEditingName}
            onChangeName={onChangeName}
            onToggleEdit={onToggleEdit}
          />
          <Text className="text-lg text-gray-600 dark:text-gray-300">
            nina@example.com
          </Text>
        </View>

        <TaskSummary tasks={tasks} />

        <View className="flex-1 w-full text-center">
          <ProfileActions
            onAddTask={navigateToAddTask}
            onLogout={handleLogout}
          />
          <NotificationTester />
        </View>
      </View>
    </View>
  );
}
