import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  image: string | null;
  onPickImage: () => void;
}

export default function ProfileImagePicker({ image, onPickImage }: Props) {
  return (
    <TouchableOpacity onPress={onPickImage} className="mb-4">
      <Image
        source={
          image ? { uri: image } : require("@/assets/images/default-pfp.png")
        }
        className="w-24 h-24 rounded-full"
      />
      <Ionicons
        name="camera"
        size={24}
        color="#6B21A8"
        className="absolute bottom-0 right-0"
      />
    </TouchableOpacity>
  );
}
