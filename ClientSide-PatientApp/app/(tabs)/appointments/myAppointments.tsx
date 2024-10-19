import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAppointments } from "@/app/context/AppointmentContext";
import { useAuth } from "@/app/context/AuthContext";

const MyProfile = () => {
  const { getAppointmentsForUser, appointments } = useAppointments();
  const { user } = useAuth();
  const userId = user._id;

  const router = useRouter();

  useEffect(() => {
    console.log("Fetching appointments for user:", userId);
    getAppointmentsForUser(userId);
  }, [userId]);

  // Mock data for appointments

  const renderAppointmentCard = (appointment: any) => (
    <View key={appointment.date} className="bg-blue-500 rounded-lg p-4 mb-4">
      <Text className="text-white font-bold">{appointment.doctorId.name}</Text>
      <Text className="text-white mb-4">
        {appointment.doctorId.specialization}
      </Text>
      <View className="flex-row justify-between">
        <TouchableOpacity className="bg-white px-3 py-2 rounded-lg">
          <Text className="text-blue-500">Lab Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white px-3 py-2 rounded-lg" onPress={() => router.push(`/(tabs)/appointments/prescriptions/${appointment._id}`)}>
          <Text className="text-blue-500">Prescriptions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 flex-row items-center">
        <View className="ml-4">
          <Text className="text-xl font-bold">{user.name}</Text>
          <Text className="text-gray-600">Age: 23</Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around border-b border-gray-200">
        <TouchableOpacity className="pb-2 border-b-2 border-blue-500">
          <Text className="text-blue-500 font-bold">Information</Text>
        </TouchableOpacity>
        <TouchableOpacity className="pb-2">
          <Text className="text-gray-500">Appointment History</Text>
        </TouchableOpacity>
      </View>

      {/* Appointment History */}
      <ScrollView className="p-4">
        {appointments.map((appointment, index) => (
          <View key={index} className="flex-row mb-6">
            <View className="items-center">
              <Text className="text-gray-600 font-bold">
                {appointment.appointmentTime}
              </Text>
              <Text className="text-blue-500 text-lg">
              {new Date(appointment.appointmentDate).toISOString().slice(0, 10)}
              </Text>
              {/* Vertical Line */}
              {index < appointments.length - 1 && (
                <View className="w-[2px] bg-blue-500 flex-grow mt-2"></View>
              )}
            </View>
            <View className="ml-4 flex-1">
              {renderAppointmentCard(appointment)}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyProfile;
