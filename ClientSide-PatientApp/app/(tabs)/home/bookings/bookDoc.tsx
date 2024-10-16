// screens/BookingScreen.tsx
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Button from "@/components/CustomButton"; // Make sure you have the Button component in the components folder
import { useRouter } from "expo-router";
import physio from "@/assets/physio.png";
import patients from "@/assets/patients.png";
import experience from "@/assets/experience.png";
import ratings from "@/assets/ratings.png";
import message from "@/assets/Message.png";
import video from "@/assets/video call.png";
import audio from "@/assets/audio.png";

const BookingScreen = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <View className="flex-1 bg-gray-100">
        <View className="px-6 py-4">
          <Text className="text-black text-2xl font-bold">
            Book a Doctor
          </Text>
        </View>
        <View className="mt-3 bg-white rounded-b-3xl">
          <Image source={physio} className="rounded-full self-center" />
          <View className="py-[-12px]">
            <Text className="text-xl font-bold text-center">
              Dr. Bellamy Nicholas
            </Text>
            <Text className="text-base text-gray-600 text-center mb-6">
              Virologist
            </Text>
          </View>

          <View className="flex-row justify-around mb-3">
            <Image source={patients} />
            <Image source={experience} />
            <Image source={ratings} />
          </View>
        </View>

        <View className="px-4 mt-4">
          <Text className="text-xl font-bold mb-2">About Doctor</Text>
          <Text className="text-base text-gray-500 mb-6">
            Dr. Bellamy Nicholas is a top specialist at London Bridge Hospital
            at London. He has achieved several awards and recognition for is
            contribution and service in his own field. He is available for
            private consultation.
          </Text>
        </View>

        <View className="px-4">
          <Text className="text-xl font-bold mb-2">Working Time</Text>
          <Text className="text-base text-gray-500 mb-6">
            Mon - Sat (08:30 AM - 09:00 PM)
          </Text>
        </View>

        <View className="px-4 mb-6">
          <Text className="text-xl font-bold mb-2">Communication</Text>
          <View className="flex flex-col gap-2">
            <Image source={message} />
            <Image source={audio} />
            <Image source={video} />
          </View>
        </View>

        <TouchableOpacity
          className="bg-orange-500 py-3 rounded-2xl items-center mb-6 w-3/4 self-center"
          onPress={() => router.push("/(tabs)/home/bookings/bookDoc")}
        >
          <Text className="text-white font-bold text-base">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingScreen;