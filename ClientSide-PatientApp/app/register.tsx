import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import CheckBox from "react-native-check-box";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import regiseter from "@/assets/register.png";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4">
      <View className="mt-4">
        <BackButton />
        {/* Register Heading */}
        <Text className="text-3xl font-bold">Register</Text>
        <Text className="text-lg font-semibold mt-1 mb-3">
          Don’t have an account ?{" "}
          <Text className="text-blue-500">Create your account</Text>
          {"\n"}it takes a less than a minute
        </Text>

        {/* Input Fields */}
        <CustomTextInput
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
        />

        <CustomTextInput
          placeholder="Enter Your Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <CustomTextInput
          placeholder="Enter Your Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <View className="mb-4">
          <View className="relative">
            <CustomTextInput
              placeholder="Enter Your Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4"
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
                className=""
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Checkbox */}
      <View className="flex-row items-center my-4">
        {/* <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          rightText={"I Accept terms and conditions & privacy policy"}
          rightTextStyle={{ fontSize: 14 }}
          checkBoxColor={"#049BD7"}
        /> */}
      </View>

      {/* Register Button */}
      <CustomButton title="Register" onPress={() => router.push("/")} />

      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      {/* Sign In */}
      <View className="items-center">
        <Text className="text-sm">Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-blue-500">Sign In now</Text>
        </TouchableOpacity>
      </View>

      {/* Image at Bottom */}
      <View className="mt-10 items-center">
        <Image source={regiseter} className="w-full h-24" resizeMode="cover" />
      </View>
    </View>
  );
};

export default Register;
