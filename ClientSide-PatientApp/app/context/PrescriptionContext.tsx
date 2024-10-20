import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import config from '@/config';

// Define the structure for the Prescription type
type Prescription = {
  _id: string;
  appointmentId: { _id: string, doctorId: Doctor };
  medicationDetails: string;
  issueDate: string;
  notes: string;
};

type Doctor = {
  _id: string;
  name: string;
  phone: string;
}

// Define the structure for the context data
interface PrescriptionContextData {
  prescriptions: Prescription[];
  loading: boolean;
  error: string | null;
  fetchPrescriptions: () => Promise<void>;
}

// Create the initial context
const PrescriptionContext = createContext<PrescriptionContextData | undefined>(undefined);

// Create a custom hook for easier usage
export const usePrescription = () => {
  const context = useContext(PrescriptionContext);
  if (!context) {
    throw new Error('usePrescriptionContext must be used within a PrescriptionProvider');
  }
  return context;
};

// Create the context provider component
export const PrescriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all prescriptions from an API using Axios
  const fetchPrescriptions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make an API request with Axios
      const response = await axios.get(`${config.API_URL}/prescriptions`); // Correct the URL

      // Log the actual response data
      console.log('Fetched Prescriptions:', response.data);

      // Set the fetched prescriptions
      setPrescriptions(response.data);
    } catch (err: unknown) {
      // Handle AxiosError specifically
      if (axios.isAxiosError(err)) {
        // AxiosError type with response information
        if (err.response) {
          setError(`Error: ${err.response.status} - ${err.response.data}`);
        } else if (err.request) {
          setError('Network error: No response received from the server');
        } else {
          setError(`Axios error: ${err.message}`);
        }
      } else if (err instanceof Error) {
        // Handle general JavaScript errors
        setError(`General error: ${err.message}`);
      } else {
        // Handle unexpected error types
        setError('An unknown error occurred');
      }
    } finally {
      // Always set loading to false, whether the request succeeds or fails
      setLoading(false);
    }
  };

  // Fetch prescriptions when the provider mounts
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <PrescriptionContext.Provider value={{ prescriptions, loading, error, fetchPrescriptions }}>
      {children}
    </PrescriptionContext.Provider>
  );
};
