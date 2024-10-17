import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

// Appointment type definition
interface Appointment {
  patientId: string;
  doctorId: string;
  hospitalId: string;
  appointmentDate: string;
  appointmentTime: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  createAppointment: (appointment: Appointment) => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

// Provider component
export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  // Create appointment function
  const createAppointment = async (appointment: Appointment) => {
    try {
      const response = await axios.post(
        "http://192.168.1.3:3000/api/appointments",
        appointment
      );

      if (response.status === 201) {
        Alert.alert("Success", "Appointment created successfully!");
        setAppointments([...appointments, appointment]);
        router.push("/home/bookings/payment"); // Redirect after successful creation
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to create appointment."
        );
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <AppointmentContext.Provider value={{ appointments, createAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook to use AppointmentContext
export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointments must be used within an AppointmentProvider"
    );
  }
  return context;
};
