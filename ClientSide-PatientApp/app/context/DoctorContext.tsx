import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import config from '@/config';

type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  availableHospitals: Hospital[]; // Array of hospital IDs
};

type Hospital = {
    _id: string;
    name: string;
}

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
      const response = await axios.get(`${config.API_URL}/doctors`); // Replace with your actual API
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
