import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconData = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
};

interface Props {
  icons: IconData[];
  onSelect: (icon: string) => void;
  selected: string;
}

function darkenColor(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export default function TaskIconSelector({ icons, onSelect, selected }: Props) {
  return (
    <View className="w-full max-w-md flex-row justify-between mb-4">
      {icons.map((icon, index) => {
        const isSelected = icon.name === selected;
        const borderColor = isSelected
          ? darkenColor(icon.color, 25)
          : "transparent";
        const opacity = selected === "" || isSelected ? 1 : 0.4;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(icon.name)}
            style={{
              width: 50,
              height: 50,
              borderRadius: 9999,
              backgroundColor: icon.color,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 4,
              borderWidth: 2,
              borderColor,
              opacity,
            }}
          >
            <Ionicons name={icon.name} size={24} color="#FFF" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
