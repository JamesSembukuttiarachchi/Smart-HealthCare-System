import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import pay from "@/assets/pay2.png";
import CustomButton from "@/components/CustomButton";
import { useAppointments } from "@/app/context/AppointmentContext";

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("Card");
  const { appointmentId } = useLocalSearchParams();
  const {getAppointmentById} = useAppointments();
  const [appointment, setAppointment] = useState<any>(null);
  const router = useRouter();

  // Fetch the appointment details when the component mounts
  useEffect(() => {
    const fetchAppointment = async () => {
      if (appointmentId) {
        try {
          const data = await getAppointmentById(appointmentId as string);
          if (data) {
            setAppointment(data);
          } else {
            Alert.alert("Error", "Failed to fetch appointment details.");
          }
        } catch (error) {
          console.error("Error fetching appointment details:", error);
          Alert.alert("Error", "Something went wrong while fetching details.");
        }
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  const handlePaymentMethodChange = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <ScrollView className="flex-1  bg-white">
      <View className="bg-gray-100 p-4 rounded-lg shadow-md">
        <Text className="text-3xl font-bold text-center mb-4">Payments {appointmentId}</Text>

        {appointment ? (
          <View className="mb-4">
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">
                Doctor ID: {appointment.doctorId.name}
              </Text>
              <Text className="font-bold text-lg">1500</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">Booking Payment</Text>
              <Text className="font-bold text-lg">300</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">Hospital {appointment.hospitalId.name}</Text>
              <Text className="font-bold text-lg">500</Text>
            </View>
            <View className="border-t mt-2 pt-2 flex-row justify-between">
              <Text className="font-bold text-lg">Sub Total</Text>
              <Text className="font-bold text-lg">4800</Text>
            </View>
          </View>
        ) : (
          <Text>Loading appointment details...</Text>
        )}

        <Text className="font-semibold text-lg mb-2">Payment Method</Text>
        <View className="flex-row justify-between mb-4">
          {["Cash", "Card"].map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => handlePaymentMethodChange(method)}
              className={`flex-1 p-2 border rounded-lg mr-2 ${
                selectedMethod === method
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white"
              }`}
            >
              <Text
                className={`text-center ${
                  selectedMethod === method ? "text-blue-500" : "text-gray-700"
                }`}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Email Address"
          className="border rounded-lg p-2 mb-2"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Card Number"
          className="border rounded-lg p-2 mb-2"
          keyboardType="numeric"
        />
        <View className="flex-row justify-between mb-2">
          <TextInput
            placeholder="MM/YY"
            className="border rounded-lg p-2 flex-1 mr-2"
            keyboardType="numeric"
          />
          <TextInput
            placeholder="CVV"
            className="border rounded-lg p-2 flex-1"
            keyboardType="numeric"
            secureTextEntry
          />
        </View>

        <CustomButton title="Pay" onPress={() => router.push("/")} />
      </View>

      <View className="mt-10 items-center">
        {/* Replace this with an appropriate image component */}
        <Image source={pay} />
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
