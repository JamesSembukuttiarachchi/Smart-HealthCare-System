import { Request, Response } from "express";
import * as doctorService from "../services/doctorService";

// Signup doctor
export const signupDoctor = async (req: Request, res: Response) => {
  try {
    const doctorData = req.body;
    const newDoctor = await doctorService.signupDoctor(doctorData);
    res.status(201).json(newDoctor);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// Login doctor
export const loginDoctor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await doctorService.loginDoctor(email, password);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all doctors...");
    const doctors = await doctorService.getAllDoctors();
    console.log("Doctors fetched successfully:", doctors);
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Create a new doctor
export const createDoctor = async (req: Request, res: Response) => {
  try {
    console.log("Creating a new doctor...");
    const doctorData = req.body;
    const newDoctor = await doctorService.createDoctor(doctorData);
    console.log("Doctor created successfully:", newDoctor);
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update a doctor's information
export const updateDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const doctorData = req.body;
  try {
    console.log(`Updating doctor with ID: ${id}...`);
    const updatedDoctor = await doctorService.updateDoctor(id, doctorData);
    console.log("Doctor updated successfully:", updatedDoctor);
    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Delete a doctor
export const deleteDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(`Deleting doctor with ID: ${id}...`);
    const deletedDoctor = await doctorService.deleteDoctor(id);
    console.log("Doctor deleted successfully:", deletedDoctor);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
