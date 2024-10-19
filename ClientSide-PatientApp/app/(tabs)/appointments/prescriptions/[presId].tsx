import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import pres from "@/assets/dt1.png";
import { usePrescription } from "@/app/context/PrescriptionContext";

const Prescription = () => {
  const { prescriptions, loading, error } = usePrescription(); // Include loading and error states
  const { presId } = useLocalSearchParams();

  // Handle loading or error state
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  // Find the prescription by appointmentId
  const selectedPrescription = prescriptions.find(
    (prescription) => prescription?.appointmentId?._id === String(presId)
  );

  if (!selectedPrescription) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">
          No prescription found for this appointment.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      {/* Prescription Details */}
      <ScrollView className="p-4">
        {/* Doctor Illustration */}
        <View className="w-full h-auto bg-gray-200 mb-4 justify-center items-center">
          {/* Replace with an SVG/Image illustration */}
          <Image source={pres} />
        </View>

        {/* Title */}
        <Text className="text-center text-2xl font-bold text-gray-800 mb-6">
          My prescription
        </Text>

        {/* Medicine Details */}
        <View className="mb-8">
          <Text className="font-bold text-gray-700 mb-2">Notes</Text>
          <Text className="text-gray-600">{selectedPrescription.notes}</Text>
        </View>

        {/* Medicine Details */}
        <View className="mb-8">
          <Text className="font-bold text-gray-700 mb-2">Medicine Details</Text>
          <Text className="text-gray-600">
            {selectedPrescription.medicationDetails}
          </Text>
        </View>

        {/* Patient Details */}
        <View className="mb-6">
          <Text className="font-bold text-gray-700 mb-2">Doctor Details</Text>
          <Text className="text-gray-600">
            Issued by: {selectedPrescription.appointmentId.doctorId.name}
          </Text>
          <Text className="text-gray-600">
            Contact No: {selectedPrescription.appointmentId.doctorId.phone}
          </Text>
          <Text className="text-gray-600">Prescription no: 829883A</Text>
          <Text className="text-gray-600">
            Date:{" "}
            {new Date(selectedPrescription.issueDate).toLocaleDateString()}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity className="bg-blue-500 p-4 rounded-full">
          <Text className="text-white text-center font-semibold">
            Online medical shop
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Prescription;
