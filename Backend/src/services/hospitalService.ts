// hospitalService.ts
import {
  getAllHospitals as getAllHospitalsFromRepo,
  findHospitalByEmail,
  createHospital as createHospitalInRepo,
  updateHospital as updateHospitalInRepo,
  deleteHospital as deleteHospitalInRepo,
} from "../repositories/hospitalRepository";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

// Fetch all hospitals
export const getAllHospitals = async () => {
  try {
    const hospitals = await getAllHospitalsFromRepo();
    return hospitals;
  } catch (error) {
    console.error("Error fetching hospitals in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

//signup doctor
export const signupHospital = async (hospitalData: {
  name: string;
  location: string;
  email: string;
  contactNumber: string;
  channellingFee: number;
  password: string;
}) => {
  const existingHospital = await findHospitalByEmail(hospitalData.email);
  if (existingHospital) {
    throw new Error("Doctor already registered with this email.");
  }
  const newHospital = await createHospitalInRepo(hospitalData);
  return newHospital;
};
//login doctor
export const loginHospital = async (email: string, password: string) => {
  const hospital = await findHospitalByEmail(email);
  if (!hospital) {
    throw new Error("Hospital not found with this email.");
  }
  const isMatch = await hospital.comparePassword(password);
  if (!isMatch) {
    throw new Error("Incorrect password.");
  }
  const token = jwt.sign({ id: hospital._id }, SECRET_KEY, { expiresIn: "1h" });
  return { token, hospital };
};
// Create a new hospital
export const createHospital = async (hospitalData: {
  name: string;
  location: string;
  email: string;
  contactNumber: string;
}) => {
  try {
    const savedHospital = await createHospitalInRepo(hospitalData);
    return savedHospital;
  } catch (error) {
    console.error("Error creating hospital in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Update a hospital's information
export const updateHospital = async (
  id: string,
  hospitalData: {
    name?: string;
    location?: string;
    email?: string;
    contactNumber?: string;
    chennellingFee?: number;
  }
) => {
  try {
    const updatedHospital = await updateHospitalInRepo(id, hospitalData);
    if (!updatedHospital) {
      throw new Error("Hospital not found");
    }
    return updatedHospital;
  } catch (error) {
    console.error("Error updating hospital in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Delete a hospital
export const deleteHospital = async (id: string) => {
  try {
    const deletedHospital = await deleteHospitalInRepo(id);
    if (!deletedHospital) {
      throw new Error("Hospital not found");
    }
    return deletedHospital;
  } catch (error) {
    console.error("Error deleting hospital in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};
