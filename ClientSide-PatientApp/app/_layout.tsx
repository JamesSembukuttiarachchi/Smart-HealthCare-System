import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default RootLayout;
