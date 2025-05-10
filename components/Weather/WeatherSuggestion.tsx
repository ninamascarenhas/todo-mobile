import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Constants from "expo-constants";

const WeatherSuggestion = () => {
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = Constants.expoConfig?.extra?.WEATHER_API_KEY;

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip`
        );

        const data = await response.json();

        const condition = data.current?.condition?.text?.toLowerCase();

        if (condition?.includes("rain")) {
          setSuggestion(
            "Dia chuvoso... Ótimo para organizar documentos em casa! ☔"
          );
        } else {
          setSuggestion(
            "Dia ensolarado! Que tal fazer aquela caminhada pendente? 🚶 "
          );
        }
      } catch (err) {
        setError(true);
        console.error("Erro ao buscar clima:", err);
      }
    };

    fetchWeather();
  }, []);

  if (error) return null;
  if (!suggestion) return null;

  return (
    <View className="bg-blue-50 dark:bg-[#1f2937] px-4 py-6 rounded-xl mt-4">
      <View className="flex-col gap-2">
        <Text className="text-gray-800 font-semibold dark:text-white">
          🌦️ Sugestão do dia:
        </Text>
        <Text className="text-gray-800 dark:text-white">{suggestion}</Text>
      </View>
    </View>
  );
};

export default WeatherSuggestion;
