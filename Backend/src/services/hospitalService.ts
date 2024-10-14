// hospitalService.ts
import {
  getAllHospitals as getAllHospitalsFromRepo,
  createHospital as createHospitalInRepo,
  updateHospital as updateHospitalInRepo,
  deleteHospital as deleteHospitalInRepo,
} from "../repositories/hospitalRepository";

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

// Create a new hospital
export const createHospital = async (hospitalData: {
  name: string;
  location: string;
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
  hospitalData: { name?: string; location?: string; contactNumber?: string }
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
