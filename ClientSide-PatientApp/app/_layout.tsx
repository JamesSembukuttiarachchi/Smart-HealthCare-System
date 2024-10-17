import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
};

export default RootLayout;
