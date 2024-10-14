// patientRepository.ts
import Patient from "../models/Patient";

// Fetch all patients
export const getAllPatients = async () => {
  return await Patient.find();
};

// Fetch a patient by pid
export const getPatientByPid = async (pid: string) => {
  return await Patient.findOne({ pid });
};

// Create a new patient
export const createPatient = async (patientData: {
  name: string;
  gender: string;
  contactNumber: string;
  email: string;
}) => {
  const patient = new Patient(patientData);
  return await patient.save();
};

// Update a patient's information using pid
export const updatePatient = async (
  pid: string,
  patientData: {
    name?: string;
    gender?: string;
    contactNumber?: string;
    email?: string;
  }
) => {
  const { ...updateData } = patientData; // Exclude pid
  return await Patient.findOneAndUpdate({ pid }, updateData, { new: true });
};

// Delete a patient using pid
export const deletePatient = async (pid: string) => {
  return await Patient.findOneAndDelete({ pid });
};
