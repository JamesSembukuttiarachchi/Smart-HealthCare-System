import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import config from "@/config";

// Appointment type definition
interface Appointment {
    _id?: string; // Include _id to represent the ID from the backend
  patientId: {_id: string};
  doctorId: string;
  hospitalId: string;
  appointmentDate: string;
  appointmentTime: string;
}


interface AppointmentContextType {
  appointments: Appointment[];
  createAppointment: (appointment: Appointment) => Promise<void>;
  getAppointmentById: (appointmentId: string) => Promise<Appointment | null>;
  getAppointmentsForUser: (userId: string) => Promise<void>;
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
        `${config.API_URL}/api/appointments`,
        appointment
      );

      if (response.status === 201) {
        const createdAppointment = response.data;
        Alert.alert("Success", "Appointment created successfully!");
        setAppointments([...appointments, createdAppointment]);
        router.push({
            pathname: "/home/bookings/payment",
            params: { appointmentId: createdAppointment._id },
          }); // Redirect after successful creation

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

  // Get appointment by ID function
  const getAppointmentById = async (appointmentId: string): Promise<Appointment | null> => {
    try {
      const response = await axios.get(
        `${config.API_URL}/appointments/${appointmentId}`
      );

      if (response.status === 200) {
        return response.data; // Return the fetched appointment object
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Appointment not found."
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
      Alert.alert("Error", "Something went wrong while fetching the appointment.");
      return null;
    }
  };

  const getAppointmentsForUser = async (userId: string) => {
    try {
      const response = await axios.get(
        `${config.API_URL}/api/appointments`
      );

      if (response.status === 200) {


        // Filter appointments safely, ensuring patientId and _id exist
        const userAppointments = response.data.filter((appointment: Appointment) => {
          return appointment.patientId && appointment.patientId._id === userId;
        });

        //console.log("Filtered appointments for user:", userAppointments);

        setAppointments(userAppointments);
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to fetch appointments."
        );
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Alert.alert("Error", "Something went wrong while fetching appointments.");
    }
  };



  return (
    <AppointmentContext.Provider value={{ appointments, createAppointment, getAppointmentById, getAppointmentsForUser }}>
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
