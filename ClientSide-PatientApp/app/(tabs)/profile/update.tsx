import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import CustomButton from "@/components/CustomButton";

const UpdateProfile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || ""); // Initialize with current user data
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.contactNumber || "");
  const [password, setPassword] = useState(""); // We may not want to change the password unless explicitly provided
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    const updatedData = {
      name,
      email,
      contactNumber: phoneNumber,
    };

    // if (password) {
    //   updatedData.password = password;
    // }

    try {
      await updateProfile(updatedData);
      setLoading(false);
      // Show success message or redirect user
    } catch (error) {
      setLoading(false);
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-gray-700 py-6 rounded-b-3xl flex items-center relative">
        <Text className="text-white text-xl font-bold">Edit Profile</Text>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          className="w-24 h-24 rounded-full border-4 border-white mt-4"
        />
        <Text className="text-white mt-2">Change Picture</Text>
      </View>

      {/* Form */}
      <View className="px-6 mt-4">
        {/* Username */}
        <Text className="text-gray-500 font-bold">Username</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Username"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
        />

        {/* Email */}
        <Text className="text-gray-500 font-bold mt-4">Email Id</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
        />

        {/* Phone Number */}
        <Text className="text-gray-500 font-bold mt-4">Phone Number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
        />

        {/* Password */}
        <Text className="text-gray-500 font-bold mt-4">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
        />

        {/* Update Button */}
        <View className="mt-6">
          <CustomButton title="Update" onPress={handleUpdate} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
