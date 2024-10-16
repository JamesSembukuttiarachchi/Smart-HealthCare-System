import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} className="mb-4">
      <Ionicons
              name={"arrow-back-circle"}
              size={24}
              color="gray"
              className=""
            />
    </TouchableOpacity>
  );
};

export default BackButton;