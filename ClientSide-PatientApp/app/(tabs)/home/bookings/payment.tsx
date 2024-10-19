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
import { usePayment } from "@/app/context/PaymentContext";

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("Card");
  const { appointmentId } = useLocalSearchParams();
  const { getAppointmentById } = useAppointments();
  const { processPayment } = usePayment();
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

  // Calculate the doctor fee based on specialization
  const getMultiplierBySpecialization = (specialization: string) => {
    switch (specialization.toLowerCase()) {
      case "ophthalmology":
        return 0.8;
      case "cardiology":
        return 0.85;
      case "otolaryngology (ENT)":
        return 0.75;
      case "gynecology":
        return 0.8;
      case "dermatology":
        return 0.8;
      case "endocrinology":
        return 0.75;
      case "gastroenterology":
        return 0.8;
      case "general Practice":
        return 0.7;
      default:
        return 3.0; // Default multiplier if no specific specialization is matched
    }
  };

  const handlePayment = () => {
    const paymentData = {
      appointmentId: appointmentId as string,
      amount: appointment.hospitalId.channellingFee as number,
      status: selectedMethod === "Card" ? "Completed" : "Pending",
    };
    processPayment(paymentData);
  };

  const doctorFee =
    appointment?.doctorId?.specialization &&
    appointment?.hospitalId?.channellingFee
      ? appointment.hospitalId.channellingFee *
        getMultiplierBySpecialization(appointment.doctorId.specialization)
      : 0;

  const bookingFee = appointment?.hospitalId?.channellingFee
    ? appointment.hospitalId.channellingFee * 0.02
    : 0;

  const hospitalCharge = appointment?.hospitalId?.channellingFee
    ? appointment.hospitalId.channellingFee - (doctorFee + bookingFee)
    : 0;

  const handlePaymentMethodChange = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <ScrollView className="flex-1  bg-white">
      <View className="bg-gray-100 p-4 rounded-lg shadow-md">
        <Text className="text-3xl font-bold text-center mb-4">
          Payments Summary
        </Text>

        {appointment ? (
          <View className="mb-4">
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">
                Doctor Fee
              </Text>
              <Text className="font-bold text-lg">{doctorFee}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">Booking Fee</Text>
              <Text className="font-bold text-lg">{bookingFee}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">Hospital Fee</Text>
              <Text className="font-bold text-lg">{hospitalCharge}</Text>
            </View>
            <View className="border-t mt-2 pt-2 flex-row justify-between">
              <Text className="font-bold text-lg">Sub Total</Text>
              <Text className="font-bold text-lg">
                {appointment.hospitalId.channellingFee}
              </Text>
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

        {/* Render these inputs only if "Card" is selected */}
        {selectedMethod === "Card" && (
          <>
            <TextInput
              placeholder="Name on Card"
              className="border rounded-lg p-2 mb-2"
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
          </>
        )}

        <CustomButton title={"Pay"} onPress={handlePayment} />
      </View>

      <View className="mt-10 items-center">
        {/* Replace this with an appropriate image component */}
        <Image source={pay} />
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
