import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  availableHospitals: string[]; // Array of hospital IDs
};

type DoctorContextType = {
  doctors: Doctor[];
  fetchDoctors: () => void;
};

type DoctorProviderProps = {
  children: ReactNode; // Specify that children is a ReactNode type
};

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<DoctorProviderProps> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http:///192.168.1.3:3000/api/doctors'); // Replace with your actual API
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors', error);
    }
  };

  useEffect(() => {
    fetchDoctors(); // Fetch doctors on mount
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, fetchDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctors must be used within a DoctorProvider');
  }
  return context;
};
