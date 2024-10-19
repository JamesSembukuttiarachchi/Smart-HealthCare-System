import React from "react";
import { View, Text, ScrollView } from "react-native";
import QRCode from "react-native-qrcode-svg"; // QR code library for Expo/React Native
import { useAuth } from "@/app/context/AuthContext";

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const patientId = user._id; // Get the patient ID from the user context

  // Data to be encoded in the QR Code
  const qrData = `PatientID: ${patientId}`;

  return (
    <View className="flex-1 bg-white justify-around items-center p-4">
      <View className="flex-1 items-center justify-center p-4">
        {/* Profile Title */}
        <Text className="text-2xl font-bold mb-4 text-gray-800">My QR Code</Text>

        {/* QR Code Container */}
        <View className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <QRCode
            value={qrData} // The patientId encoded into the QR code
            size={300}     // Size of the QR code
          />
        </View>


      </View>
    </View>
  );
};

export default ProfileScreen;
