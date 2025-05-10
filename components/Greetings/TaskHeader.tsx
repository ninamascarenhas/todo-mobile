import React from "react";
import { View, Text } from "react-native";

interface Props {
  greeting: string;
  userName: string;
  currentDate: string;
  children?: React.ReactNode;
}

export default function TaskHeader({
  greeting,
  userName,
  currentDate,
  children,
}: Props) {
  return (
    <View className="px-4 pb-8">
      <Text className="text-2xl font-bold text-white ">
        {greeting}, {userName}
      </Text>
      <Text className="text-base text-white">{currentDate}</Text>
      {children}
    </View>
  );
}
