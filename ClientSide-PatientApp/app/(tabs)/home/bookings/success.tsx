import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useRef, useEffect } from "react";
import check from "@/assets/Group168.png";
import { useRouter } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import ConfettiCannon from "react-native-confetti-cannon";
import { FontAwesome } from "@expo/vector-icons"; // For download icon
import RNHTMLtoPDF from "react-native-html-to-pdf"; // For PDF generation
import * as FileSystem from "expo-file-system"; // For managing files
import CustomButton from "@/components/CustomButton";


const Success = () => {
  const router = useRouter();
  const confettiRef = useRef(null);

  const downloadSummary = async () => {
    try {
      const htmlContent = `
        <h1>Payment Summary</h1>
        <p>Your payment was successful.</p>
        <p>Thank you for using our service!</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Amount:</strong> $100.00</p>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      // Check if the Sharing module is available
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Sharing is not available on this device.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to download the summary.");
    }
  };

  return (
    <View className="flex-1 p-16">
      <View className="flex flex-col items-center">
        <Image source={check} />
        <Text className="text-center text-2xl font-bold mb-8 text-black">
          Your Payment is Successful
        </Text>
      </View>

      {/* Confetti Animation */}
      {/* Confetti Animation */}
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={true}
        fadeOut={true}
      />

      {/* Download Summary Icon */}
      <View className="absolute bottom-20 p-4">
        <TouchableOpacity onPress={downloadSummary} className="flex-row w-full bg-orange-500 py-4 rounded-lg items-center ">
          <FontAwesome name="download" size={24} color="black" />
          <Text className="text-black text-lg font-semibold">Download Summary</Text>
        </TouchableOpacity>
      </View>

      {/* Back To Home Button fixed at the bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4">
        <CustomButton
          title="Back To Home"
          onPress={() => router.push("/(tabs)/home/homeScreen")}
        />

      </View>
    </View>
  );
};

export default Success;
