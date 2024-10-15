// prescriptionRepository.ts
import Prescription from "../models/Prescription";

// Get all prescriptions
export const getAllPrescriptions = async () => {
  return await Prescription.find().populate("patientId doctorId");
};

// Create a new prescription
export const createPrescription = async (prescriptionData: {
  patientName: string;
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
    patientName?: string;
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
