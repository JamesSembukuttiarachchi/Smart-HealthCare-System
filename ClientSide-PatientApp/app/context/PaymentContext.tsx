import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

interface Payment {
  appointmentId: string;
  amount: number;
  status: string;
}

interface PaymentContextType {
    payments: Payment[];
  processPayment: (payment: Payment) => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const router = useRouter();

  const processPayment = async (payment: Payment) => {
    try {
      // Replace with your actual API endpoint for processing payments
      const response = await axios.post(
        "http://172.28.9.237:3000/api/payments/",
        payment
      );

      if (response.status === 201) {
        const createdPayment = response.data;
        Alert.alert("Success", "Payment processed successfully.");
        setPayments([...payments, createdPayment]);
        router.push({
          pathname: "/home/bookings/success",
          params: { appointmentId: createdPayment.appointmentId },
        });
      } else {
        Alert.alert("Error", "Failed to process payment. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      Alert.alert("Error", "Something went wrong while processing payment.");
    }
  };

  return (
    <PaymentContext.Provider value={{ payments, processPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
