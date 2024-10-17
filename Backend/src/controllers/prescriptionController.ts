import { Request, Response } from "express";
import * as prescriptionService from "../services/prescriptionService";

// Get all prescriptions
export const getAllPrescriptions = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all prescriptions...");
    const prescriptions = await prescriptionService.getAllPrescriptions();
    console.log("Prescriptions fetched successfully:", prescriptions);
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Fetch a prescription by id
export const getPrescriptionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(`Fetching prescription with ID: ${id}...`);
    const prescription = await prescriptionService.getPrescriptionById(id);
    console.log("prescription fetched successfully:", prescription);
    res.status(200).json(prescription);
  } catch (error) {
    console.error("Error fetching prescription by Id:", error);
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Create a new prescription
export const createPrescription = async (req: Request, res: Response) => {
  try {
    console.log("Creating a new prescription...");
    const prescriptionData = req.body; // Assuming prescription data is sent in the request body
    const newPrescription = await prescriptionService.createPrescription(
      prescriptionData
    );
    console.log("Prescription created successfully:", newPrescription);
    res.status(201).json(newPrescription);
  } catch (error) {
    console.error("Error creating prescription:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Update a prescription
export const updatePrescription = async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming the prescription ID is passed as a URL parameter
  const prescriptionData = req.body; // Assuming the updated data is sent in the request body
  try {
    console.log(`Updating prescription with ID: ${id}...`);
    const updatedPrescription = await prescriptionService.updatePrescription(
      id,
      prescriptionData
    );
    console.log("Prescription updated successfully:", updatedPrescription);
    res.status(200).json(updatedPrescription);
  } catch (error) {
    console.error("Error updating prescription:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Delete a prescription
export const deletePrescription = async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming the prescription ID is passed as a URL parameter
  try {
    console.log(`Deleting prescription with ID: ${id}...`);
    const deletedPrescription = await prescriptionService.deletePrescription(
      id
    );
    console.log("Prescription deleted successfully:", deletedPrescription);
    res.status(200).json(deletedPrescription);
  } catch (error) {
    console.error("Error deleting prescription:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
