// prescriptionRepository.ts
import Prescription from "../models/Prescription";

// Get all prescriptions
export const getAllPrescriptions = async () => {
  return await Prescription.find().populate({
    path: "appointmentId",
    populate: [
      {
        path: "patientId", // Populate patient details
        //select: "name", // Only populate the name of the patient
      },
      {
        path: "hospitalId", // Populate hospital details
        //select: "name", // Only populate the name of the hospital
      },
    ],
  });
};

// Fetch a prescription by Id
export const getPrescriptionById = async (id: string) => {
  return await Prescription.findById(id).populate({
    path: "appointmentId",
    populate: [
      {
        path: "patientId", // Populate patient details
        //select: "name", // Only populate the name of the patient
      },
      {
        path: "hospitalId", // Populate hospital details
        //select: "name", // Only populate the name of the hospital
      },
    ],
  });
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
