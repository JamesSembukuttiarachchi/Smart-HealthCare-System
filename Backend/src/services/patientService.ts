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

// Create a new patient
export const createPatient = async (patientData: {
  name: string;
  age: number;
  gender: string;
  contactNumber: string;
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

// Update a patient's information
export const updatePatient = async (
  id: string,
  patientData: {
    name?: string;
    age?: number;
    gender?: string;
    contactNumber?: string;
  }
) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, patientData, {
      new: true,
    });
    if (!updatedPatient) {
      throw new Error("Patient not found");
    }
    return updatedPatient;
  } catch (error) {
    console.error("Error updating patient in service:", error);
    throw error;
  }
};

// Delete a patient
export const deletePatient = async (id: string) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      throw new Error("Patient not found");
    }
    return deletedPatient;
  } catch (error) {
    console.error("Error deleting patient in service:", error);
    throw error;
  }
};
