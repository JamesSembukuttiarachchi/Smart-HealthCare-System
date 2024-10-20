import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Tabs, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const TabsLayout = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#049BD7" }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          tabBarLabel: "Appointments",
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          tabBarLabel: "QR",
          tabBarIcon: ({ color }) => (
            <Feather name="code" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />

    </Tabs>
  );
};

export default TabsLayout;
