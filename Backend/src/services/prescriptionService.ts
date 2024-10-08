// prescriptionService.ts
import Prescription from "../models/Prescription";

// Get all prescriptions
export const getAllPrescriptions = async () => {
  try {
    const prescriptions = await Prescription.find().populate(
      "patientId doctorId"
    );
    return prescriptions;
  } catch (error) {
    console.log("Error fetching prescriptions:", error); // Detailed error log
    throw new Error("Error fetching prescriptions");
  }
};

// Create a new prescription
export const createPrescription = async (prescriptionData: {
  patientId: string;
  doctorId: string;
  medicationDetails: string;
  issueDate: Date;
  notes: string;
}) => {
  try {
    const prescription = new Prescription(prescriptionData);
    const savedPrescription = await prescription.save();
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
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      id,
      prescriptionData,
      { new: true }
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
    const deletedPrescription = await Prescription.findByIdAndDelete(id);
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
