import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";

const ProfileSettings = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-gray-700 py-6 rounded-b-3xl flex items-center relative">
        <Text className="text-white text-xl font-bold">Profile</Text>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }} // Replace with actual image URL
          className="w-24 h-24 rounded-full border-4 border-white mt-4"
        />
        <TouchableOpacity
          className="bg-blue-500 px-6 py-2 rounded-full mt-4"
          onPress={() => router.push("/(tabs)/profile/update")}
        >
          <Text className="text-white text-lg font-bold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="px-6 mt-4">
        {/* Mimi Headline */}
        <Text className="text-gray-500 font-bold mt-4">Mimi Headline</Text>
        <View className="bg-white rounded-xl py-4 px-4 mt-2 shadow">
          <TouchableOpacity className="py-2">
            <Text className="text-lg">Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg">Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2">
            <Text className="text-lg">Today</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <Text className="text-gray-500 font-bold mt-4">Content</Text>
        <View className="bg-white rounded-xl py-4 px-4 mt-2 shadow">
          <TouchableOpacity className="py-2 flex flex-row items-center">
            <Text className="text-lg mr-2">❤️ Favourite</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2 flex flex-row items-center">
            <Text className="text-lg mr-2">⬇️ Download</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <Text className="text-gray-500 font-bold mt-4">Preferences</Text>
        <View className="bg-white rounded-xl py-4 px-4 mt-2 shadow">
          <TouchableOpacity className="py-2 flex flex-row items-center">
            <Text className="text-lg mr-2">🌐 Language</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2 flex flex-row items-center">
            <Text className="text-lg mr-2">🌙 Darkmode</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2 flex flex-row items-center">
            <Text className="text-lg mr-2">📶 Only Download via Wifi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSettings;
