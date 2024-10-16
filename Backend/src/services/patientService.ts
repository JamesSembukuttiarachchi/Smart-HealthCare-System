// patientService.ts
import {
  getAllPatients as getAllPatientsFromRepo,
  getPatientByPid as getPatientByPidFromRepo,
  createPatient as createPatientInRepo,
  updatePatient as updatePatientInRepo,
  deletePatient as deletePatientInRepo,
} from "../repositories/patientRepository";

// Fetch all patients
export const getAllPatients = async () => {
  try {
    const patients = await getAllPatientsFromRepo();
    return patients;
  } catch (error) {
    console.error("Error fetching patients in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Fetch a patient by pid
export const getPatientByPid = async (pid: string) => {
  try {
    const patient = await getPatientByPidFromRepo(pid);
    if (!patient) {
      throw new Error("Patient not found");
    }
    return patient;
  } catch (error) {
    console.error("Error fetching patient by pid in service:", error);
    throw error;
  }
};

// Create a new patient
export const createPatient = async (patientData: {
  name: string;
  gender: string;
  contactNumber: string;
  email: string;
}) => {
  try {
    const savedPatient = await createPatientInRepo(patientData);
    return savedPatient;
  } catch (error) {
    console.error("Error creating patient in service:", error);
    throw error;
  }
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
  try {
    const updatedPatient = await updatePatientInRepo(pid, patientData);
    if (!updatedPatient) {
      throw new Error("Patient not found");
    }
    return updatedPatient;
  } catch (error) {
    console.error("Error updating patient in service:", error);
    throw error;
  }
};

// Delete a patient using pid
export const deletePatient = async (pid: string) => {
  try {
    const deletedPatient = await deletePatientInRepo(pid);
    if (!deletedPatient) {
      throw new Error("Patient not found");
    }
    return deletedPatient;
  } catch (error) {
    console.error("Error deleting patient in service:", error);
    throw error;
  }
};
