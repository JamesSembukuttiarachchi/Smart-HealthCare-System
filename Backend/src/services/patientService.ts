import Patient from "../models/Patient";

// Fetch all patients
export const getAllPatients = async () => {
  try {
    const patients = await Patient.find();
    return patients;
  } catch (error) {
    console.error("Error fetching patients in service:", error);
    throw error;
  }
};

// Fetch a patient by pid
export const getPatientByPid = async (pid: string) => {
  try {
    const patient = await Patient.findOne({ pid }); // Find by pid
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
    const patient = new Patient(patientData);
    const savedPatient = await patient.save();
    return savedPatient;
  } catch (error) {
    console.error("Error creating patient in service:", error);
    throw error;
  }
};

// Update a patient's information using pid
export const updatePatient = async (
  pid: string, // Use pid instead of id
  patientData: {
    name?: string;
    gender?: string;
    contactNumber?: string;
    email?: string;
  }
) => {
  try {
    // Exclude pid from patientData to prevent it from being updated
    const { ...updateData } = patientData;

    const updatedPatient = await Patient.findOneAndUpdate(
      { pid }, // Find by pid
      updateData, // Use only the fields to be updated
      { new: true }
    );
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
    const deletedPatient = await Patient.findOneAndDelete({ pid }); // Find and delete by pid
    if (!deletedPatient) {
      throw new Error("Patient not found");
    }
    return deletedPatient;
  } catch (error) {
    console.error("Error deleting patient in service:", error);
    throw error;
  }
};
