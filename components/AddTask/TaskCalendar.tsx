import React from "react";
import { Calendar } from "react-native-calendars";
import { useColorScheme } from "nativewind";
import { Alert } from "react-native";

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function TaskCalendar({ selectedDate, onSelectDate }: Props) {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const calendarTheme = {
    todayTextColor: "#6B21A8",
    arrowColor: isDarkMode ? "#FFF" : "#000",
    monthTextColor: isDarkMode ? "#FFF" : "#000",
    backgroundColor: "#444",
    calendarBackground: isDarkMode ? "#030711" : "#D1C4E9",
    dayTextColor: isDarkMode ? "#FFF" : "#000",
    textDisabledColor: "#5e5e5e",
    "stylesheet.calendar.header": {
      dayTextAtIndex0: { color: "#6B21A8" },
      dayTextAtIndex1: { color: isDarkMode ? "#FFFFFF" : "#000000" },
      dayTextAtIndex2: { color: isDarkMode ? "#FFFFFF" : "#000000" },
      dayTextAtIndex3: { color: isDarkMode ? "#FFFFFF" : "#000000" },
      dayTextAtIndex4: { color: isDarkMode ? "#FFFFFF" : "#000000" },
      dayTextAtIndex5: { color: isDarkMode ? "#FFFFFF" : "#000000" },
      dayTextAtIndex6: { color: "#6B21A8" },
    },
  } as any;

  const today = new Date().toLocaleDateString("sv-SE");
  return (
    <Calendar
      key={colorScheme}
      style={{
        borderRadius: 12,
        padding: 8,
        marginBottom: 16,
      }}
      minDate={today}
      onDayPress={(day) => {
        if (day.dateString < today) {
          Alert.alert(
            "Data inválida",
            "Você não pode selecionar uma data passada."
          );
          return;
        }
        onSelectDate(day.dateString);
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: "#6B21A8",
          selectedTextColor: "#ffffff",
        },
        [today]: {
          marked: true,
          dotColor: "#6B21A8",
        },
      }}
      theme={calendarTheme}
      className="mb-4"
    />
  );
}
