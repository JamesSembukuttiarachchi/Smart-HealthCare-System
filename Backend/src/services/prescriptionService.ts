// prescriptionService.ts
import {
  getAllPrescriptions as getAllPrescriptionsFromRepo,
  getPrescriptionById as getPrescriptionByIdRepo,
  createPrescription as createPrescriptionInRepo,
  updatePrescription as updatePrescriptionInRepo,
  deletePrescription as deletePrescriptionInRepo,
} from "../repositories/prescriptionRepository";

// Get all prescriptions
export const getAllPrescriptions = async () => {
  try {
    const prescriptions = await getAllPrescriptionsFromRepo();
    return prescriptions;
  } catch (error) {
    console.log("Error fetching prescriptions:", error);
    throw new Error("Error fetching prescriptions");
  }
};

// Fetch a prescription by Id
export const getPrescriptionById = async (id: string) => {
  try {
    const prescription = await getPrescriptionByIdRepo(id);
    if (!prescription) {
      throw new Error("Prescription not found");
    }
    return prescription;
  } catch (error) {
    console.error("Error fetching prescription by id in service:", error);
    throw error;
  }
};

// Create a new prescription
export const createPrescription = async (prescriptionData: {
  appointmentId: string;
  medicationDetails: string;
  issueDate: Date;
  notes: string;
}) => {
  try {
    const savedPrescription = await createPrescriptionInRepo(prescriptionData);
    return savedPrescription;
  } catch (error) {
    console.log("Error creating prescription:", error); // Detailed error log
    throw new Error("Error creating prescription");
  }
};

// Update a prescription
export const updatePrescription = async (
  id: string,
  prescriptionData: {
    medicationDetails?: string;
    issueDate?: Date;
    notes?: string;
  }
) => {
  try {
    const updatedPrescription = await updatePrescriptionInRepo(
      id,
      prescriptionData
    );
    if (!updatedPrescription) {
      console.log(`Prescription with ID ${id} not found`); // Log if prescription not found
      throw new Error("Prescription not found");
    }
    return updatedPrescription;
  } catch (error) {
    console.log("Error updating prescription:", error); // Detailed error log
    throw new Error("Error updating prescription");
  }
};

// Delete a prescription
export const deletePrescription = async (id: string) => {
  try {
    const deletedPrescription = await deletePrescriptionInRepo(id);
    if (!deletedPrescription) {
      console.log(`Prescription with ID ${id} not found`); // Log if prescription not found
      throw new Error("Prescription not found");
    }
    return deletedPrescription;
  } catch (error) {
    console.log("Error deleting prescription:", error); // Detailed error log
    throw new Error("Error deleting prescription");
  }
};
