import { Request, Response } from "express";
import * as doctorService from "../services/doctorService";

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

// Implement other CRUD operations similarly
