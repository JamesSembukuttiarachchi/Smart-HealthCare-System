// prescriptionRepository.ts
import Prescription from "../models/Prescription";

// Get all prescriptions
export const getAllPrescriptions = async () => {
  return await Prescription.find().populate("appointmentId");
};

// Fetch a prescription by Id
export const getPrescriptionById = async (id: string) => {
  return await Prescription.findById(id).populate("appointmentId");
};

// Create a new prescription
export const createPrescription = async (prescriptionData: {
  appointmentId: string;
  medicationDetails: string;
  issueDate: Date;
  notes: string;
}) => {
  const prescription = new Prescription(prescriptionData);
  return await prescription.save();
};

// Update a prescription
export const updatePrescription = async (
  id: string,
  prescriptionData: {
    appointmentId?: string;
    medicationDetails?: string;
    issueDate?: Date;
    notes?: string;
  }
) => {
  return await Prescription.findByIdAndUpdate(id, prescriptionData, {
    new: true,
  });
};

// Delete a prescription
export const deletePrescription = async (id: string) => {
  return await Prescription.findByIdAndDelete(id);
};
