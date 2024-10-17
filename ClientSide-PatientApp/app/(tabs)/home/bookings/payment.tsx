import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import pay from "@/assets/pay2.png"

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>("Card");
  const router = useRouter();

  const handlePaymentMethodChange = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <ScrollView className="flex-1  bg-white">


      <View className="bg-gray-100 p-4 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-center mb-4">Payments</Text>

        <View className="mb-4 font-semibold">
          <View className="flex-row justify-between">
            <Text>Doctor Payment</Text>
            <Text>1500</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Booking Payment</Text>
            <Text>300</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Hospital Charge</Text>
            <Text>500</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Medicine</Text>
            <Text>2500</Text>
          </View>

          <View className="border-t mt-2 pt-2 flex-row justify-between">
            <Text className="font-semibold">Sub Total</Text>
            <Text>4800</Text>
          </View>
        </View>

        <Text className="font-semibold text-lg mb-2">Payment Method</Text>
        <View className="flex-row justify-between mb-4">
          {["Cash", "Card", "Insurance"].map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => handlePaymentMethodChange(method)}
              className={`flex-1 p-2 border rounded-lg mr-2 ${
                selectedMethod === method ? "bg-blue-100 border-blue-500" : "bg-white"
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

        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mt-4 shadow-md">
          <Text className="text-white text-center font-semibold">Pay</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-10 items-center">
        {/* Replace this with an appropriate image component */}
        <Image
            source={pay}
        />
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
