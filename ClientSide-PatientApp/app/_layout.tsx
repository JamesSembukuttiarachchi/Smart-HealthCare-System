import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { PaymentProvider } from "./context/PaymentContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <PaymentProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Slot />
            </SafeAreaView>
          </SafeAreaProvider>
        </PaymentProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
};

export default RootLayout;
