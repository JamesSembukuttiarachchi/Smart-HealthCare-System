import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { PaymentProvider } from "./context/PaymentContext";
import { PrescriptionProvider } from "./context/PrescriptionContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <PaymentProvider>
            <PrescriptionProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Slot />
            </SafeAreaView>
          </SafeAreaProvider>
          </PrescriptionProvider>
        </PaymentProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
};

export default RootLayout;
