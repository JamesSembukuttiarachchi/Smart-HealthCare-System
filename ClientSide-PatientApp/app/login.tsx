import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import loginImg from "@/assets/login.png";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import CustomTextInput from "@/components/CustomTextInput";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center px-5 bg-white">
      <Image source={loginImg} className="w-full h-2/5 " resizeMode="contain" />

      <View className="mb-10 items-center">
        <Text className="text-3xl font-bold text-center">
          Hi, Welcome Back! 👋
        </Text>
      </View>
      <CustomTextInput
        placeholder="Enter Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <CustomTextInput
        placeholder="Enter Your Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />

      <CustomButton
        title="LOGIN"
        textStyles=""
        onPress={() => router.push("/")}
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
      <TouchableOpacity className="flex-row justify-center items-center border border-gray-300 py-4 rounded-lg mb-6 w-full">
        <FontAwesome name="google" size={24} color="" />
        <Text className="ml-2 font-bold text-base text-gray-500">Signup with Google</Text>
      </TouchableOpacity>
      <View className="items-center">
        <Text className="text-gray-500">Don't have an account?</Text>
        <Text
          className="text-orange-500"
          onPress={() => router.push("/register")}
        >
          Sign up now
        </Text>
      </View>
    </View>
  );
};

export default login;
