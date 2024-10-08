import { Request, Response } from "express";
import * as hospitalService from "../services/hospitalService";

export const getAllHospitals = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all hospitals...");
    const hospitals = await hospitalService.getAllHospitals();
    console.log("Hospitals fetched successfully:", hospitals);
    res.status(200).json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Create a new hospital
export const createHospital = async (req: Request, res: Response) => {
  try {
    console.log("Creating a new hospital...");
    const hospitalData = req.body; // Assuming hospital data is sent in the request body
    const newHospital = await hospitalService.createHospital(hospitalData);
    console.log("Hospital created successfully:", newHospital);
    res.status(201).json(newHospital);
  } catch (error) {
    console.error("Error creating hospital:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update a hospital's information
export const updateHospital = async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming the hospital ID is passed as a URL parameter
  const hospitalData = req.body; // Assuming the updated data is sent in the request body
  try {
    console.log(`Updating hospital with ID: ${id}...`);
    const updatedHospital = await hospitalService.updateHospital(
      id,
      hospitalData
    );
    console.log("Hospital updated successfully:", updatedHospital);
    res.status(200).json(updatedHospital);
  } catch (error) {
    console.error("Error updating hospital:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Delete a hospital
export const deleteHospital = async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming the hospital ID is passed as a URL parameter
  try {
    console.log(`Deleting hospital with ID: ${id}...`);
    const deletedHospital = await hospitalService.deleteHospital(id);
    console.log("Hospital deleted successfully:", deletedHospital);
    res.status(200).json(deletedHospital);
  } catch (error) {
    console.error("Error deleting hospital:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
