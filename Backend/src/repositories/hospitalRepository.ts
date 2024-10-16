// hospitalRepository.ts
import Hospital from "../models/Hospital";

// Fetch all hospitals
export const getAllHospitals = async () => {
  return await Hospital.find();
};

// Find a doctor by email
export const findHospitalByEmail = async (email: string) => {
  return await Hospital.findOne({ email });
};

// Create a new hospital
export const createHospital = async (hospitalData: {
  name: string;
  location: string;
  email: string;
  contactNumber: string;
}) => {
  const hospital = new Hospital(hospitalData);
  return await hospital.save();
};

// Update a hospital's information
export const updateHospital = async (
  id: string,
  hospitalData: {
    name?: string;
    location?: string;
    email?: string;
    contactNumber?: string;
    channellingFee?: number;
  }
) => {
  return await Hospital.findByIdAndUpdate(id, hospitalData, { new: true });
};

// Delete a hospital
export const deleteHospital = async (id: string) => {
  return await Hospital.findByIdAndDelete(id);
};
