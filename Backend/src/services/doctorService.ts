// doctorService.ts
import {
  getAllDoctors as getAllDoctorsFromRepo,
  createDoctor as createDoctorInRepo,
  updateDoctor as updateDoctorInRepo,
  deleteDoctor as deleteDoctorInRepo,
} from "../repositories/doctorRepository";

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
