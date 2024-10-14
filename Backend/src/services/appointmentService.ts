//appointment service.tsx
import mongoose from "mongoose";
import Appointment from "../models/Appointment";

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const appointments = await Appointment.find().populate(
      "doctorId hospitalId"
    );
    return appointments;
  } catch (error) {
    console.log("Error fetching appointments:", error); // Detailed error log
    throw new Error("Error fetching appointments");
  }
};

// Get all appointments for a specific doctor
export const getAppointmentsByDoctor = async (doctorId: string) => {
  try {
    const appointments = await Appointment.find({ doctorId }).populate(
      "doctorId hospitalId"
    );
    return appointments;
  } catch (error) {
    console.log("Error fetching appointments for the doctor:", error);
    throw new Error("Error fetching appointments for the doctor");
  }
};

// Create a new appointment
export const createAppointment = async (appointmentData: {
  patientName: string;
  doctorId: mongoose.Schema.Types.ObjectId;
  hospitalId: mongoose.Schema.Types.ObjectId;
  appointmentDate: Date;
  status: string;
}) => {
  try {
    const appointment = new Appointment(appointmentData);
    const savedAppointment = await appointment.save();
    return savedAppointment;
  } catch (error) {
    console.log("Error creating appointment:", error); // Detailed error log
    throw new Error("Error creating appointment");
  }
};

// Update an appointment
export const updateAppointment = async (
  id: string,
  appointmentData: {
    patientName?: string;
    appointmentDate?: Date;
    status?: string;
  }
) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      appointmentData,
      { new: true }
    );
    if (!updatedAppointment) {
      console.log(`Appointment with ID ${id} not found`); // Log if appointment not found
      throw new Error("Appointment not found");
    }
    return updatedAppointment;
  } catch (error) {
    console.log("Error updating appointment:", error); // Detailed error log
    throw new Error("Error updating appointment");
  }
};

// Delete an appointment
export const deleteAppointment = async (id: string) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      console.log(`Appointment with ID ${id} not found`); // Log if appointment not found
      throw new Error("Appointment not found");
    }
    return deletedAppointment;
  } catch (error) {
    console.log("Error deleting appointment:", error); // Detailed error log
    throw new Error("Error deleting appointment");
  }
};
