// appointmentService.ts
import mongoose from "mongoose";
import {
  getAllAppointments as getAllAppointmentsFromRepo,
  getAppointmentsByDoctor as getAppointmentsByDoctorFromRepo,
  createAppointment as createAppointmentInRepo,
  updateAppointment as updateAppointmentInRepo,
  deleteAppointment as deleteAppointmentInRepo,
} from "../repositories/appointmentRepository";

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const appointments = await getAllAppointmentsFromRepo();
    return appointments;
  } catch (error) {
    console.log("Error fetching appointments:", error);
    throw new Error("Error fetching appointments");
  }
};

// Get all appointments for a specific doctor
export const getAppointmentsByDoctor = async (doctorId: string) => {
  try {
    const appointments = await getAppointmentsByDoctorFromRepo(doctorId);
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
    const appointment = await createAppointmentInRepo(appointmentData);
    return appointment;
  } catch (error) {
    console.log("Error creating appointment:", error);
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
    const updatedAppointment = await updateAppointmentInRepo(
      id,
      appointmentData
    );
    if (!updatedAppointment) {
      console.log(`Appointment with ID ${id} not found`);
      throw new Error("Appointment not found");
    }
    return updatedAppointment;
  } catch (error) {
    console.log("Error updating appointment:", error);
    throw new Error("Error updating appointment");
  }
};

// Delete an appointment
export const deleteAppointment = async (id: string) => {
  try {
    const deletedAppointment = await deleteAppointmentInRepo(id);
    if (!deletedAppointment) {
      console.log(`Appointment with ID ${id} not found`);
      throw new Error("Appointment not found");
    }
    return deletedAppointment;
  } catch (error) {
    console.log("Error deleting appointment:", error);
    throw new Error("Error deleting appointment");
  }
};
