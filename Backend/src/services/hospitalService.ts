import Hospital from "../models/Hospital";

// Fetch all hospitals
export const getAllHospitals = async () => {
  try {
    const hospitals = await Hospital.find();
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
    const hospital = new Hospital(hospitalData);
    const savedHospital = await hospital.save();
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
    const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalData, {
      new: true,
    });
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
    const deletedHospital = await Hospital.findByIdAndDelete(id);
    if (!deletedHospital) {
      throw new Error("Hospital not found");
    }
    return deletedHospital;
  } catch (error) {
    console.error("Error deleting hospital in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};
