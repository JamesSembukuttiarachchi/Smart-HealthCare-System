import Doctor from "../models/Doctor";

// Fetch all doctors
export const getAllDoctors = async () => {
  try {
    const doctors = await Doctor.find();
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
    const doctor = new Doctor(doctorData);
    const savedDoctor = await doctor.save();
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
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorData, {
      new: true,
    });
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
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      throw new Error("Doctor not found");
    }
    return deletedDoctor;
  } catch (error) {
    console.error("Error deleting doctor in service:", error);
    throw error; // Rethrow the error to be handled in the controller
  }
};
