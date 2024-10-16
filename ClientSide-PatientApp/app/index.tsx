import React from "react";
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Welcome from "../assets/patient1.png"; // Make sure the image path is correct
import CustomButton from "@/components/CustomButton";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center px-5 bg-white">
      <Image
        source={Welcome}
        className="w-full h-48 mb-10"
        resizeMode="contain"
      />

      <View className="mb-10 items-center">
        <Text className="text-3xl font-bold text-center">Welcome</Text>
        <Text className="text-lg text-gray-500 mb-4 text-center">
          Welcome to Health Care, where your health and well-being are our top
          priority.
        </Text>
      </View>

      <CustomButton
        title="LOGIN"
        textStyles=""
        onPress={() => router.push("/auth/login")}
        customStyles="w-full"
      />

      <TouchableOpacity
        onPress={() => Alert.alert("Forgot Password", "Reset link sent!")}
      >
        <Text className="text-sm text-orange-500 mt-4 text-center">
          Forgot Your Password?
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center my-6 w-full">
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <View className="items-center">
        <Text className="text-gray-500">Don't have an account?</Text>
        <Text
          className="text-orange-500"
          onPress={() => router.push("/auth/register")}
        >
          Sign up now
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
