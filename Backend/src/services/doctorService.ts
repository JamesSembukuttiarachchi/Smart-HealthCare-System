// doctorService.ts
import {
  getAllDoctors as getAllDoctorsFromRepo,
  createDoctor as createDoctorInRepo,
  findDoctorByEmail,
  updateDoctor as updateDoctorInRepo,
  deleteDoctor as deleteDoctorInRepo,
} from "../repositories/doctorRepository";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

//signup doctor
export const signupDoctor = async (doctorData: {
  name: string;
  email: string;
  specialization: string;
  phone: string;
  password: string;
}) => {
  const existingDoctor = await findDoctorByEmail(doctorData.email);
  if (existingDoctor) {
    throw new Error("Doctor already registered with this email.");
  }
  const newDoctor = await createDoctorInRepo(doctorData);
  return newDoctor;
};
//login doctor
export const loginDoctor = async (email: string, password: string) => {
  const doctor = await findDoctorByEmail(email);
  if (!doctor) {
    throw new Error("Doctor not found with this email.");
  }
  const isMatch = await doctor.comparePassword(password);
  if (!isMatch) {
    throw new Error("Incorrect password.");
  }
  const token = jwt.sign({ id: doctor._id }, SECRET_KEY, { expiresIn: "1h" });
  return { token, doctor };
};

// Fetch all doctors
export const getAllDoctors = async () => {
  try {
    const doctors = await getAllDoctorsFromRepo();
    return doctors;
  } catch (error) {
    console.error("Error fetching doctors in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Create a new doctor
export const createDoctor = async (doctorData: {
  name: string;
  specialization: string;
  phone: string;
  email: string;
}) => {
  try {
    const savedDoctor = await createDoctorInRepo(doctorData);
    return savedDoctor;
  } catch (error) {
    console.error("Error creating doctor in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Update a doctor's information
export const updateDoctor = async (
  id: string,
  doctorData: {
    name?: string;
    specialization?: string;
    phone?: string;
    email?: string;
  }
) => {
  try {
    const updatedDoctor = await updateDoctorInRepo(id, doctorData);
    if (!updatedDoctor) {
      throw new Error("Doctor not found");
    }
    return updatedDoctor;
  } catch (error) {
    console.error("Error updating doctor in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};

// Delete a doctor
export const deleteDoctor = async (id: string) => {
  try {
    const deletedDoctor = await deleteDoctorInRepo(id);
    if (!deletedDoctor) {
      throw new Error("Doctor not found");
    }
    return deletedDoctor;
  } catch (error) {
    console.error("Error deleting doctor in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};
