import { Request, Response } from "express";
import * as patientService from "../services/patientService";

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all patients...");
    const patients = await patientService.getAllPatients();
    console.log("Patients fetched successfully:", patients);
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Create a new patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    console.log("Creating a new patient...");
    const patientData = req.body;
    const newPatient = await patientService.createPatient(patientData);
    console.log("Patient created successfully:", newPatient);
    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Error creating patient:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update a patient's information
export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const patientData = req.body;
  try {
    console.log(`Updating patient with ID: ${id}...`);
    const updatedPatient = await patientService.updatePatient(id, patientData);
    console.log("Patient updated successfully:", updatedPatient);
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Delete a patient
export const deletePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(`Deleting patient with ID: ${id}...`);
    const deletedPatient = await patientService.deletePatient(id);
    console.log("Patient deleted successfully:", deletedPatient);
    res
      .status(200)
      .json({ message: "Patient deleted successfully", deletedPatient });
  } catch (error) {
    console.error("Error deleting patient:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
