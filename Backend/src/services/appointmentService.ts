// appointmentService.ts
import mongoose from "mongoose";
import {
  getAllAppointments as getAllAppointmentsFromRepo,
  getAppointmentById as getAppointmentByIdFromRepo,
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

// Fetch a appointment by Id
export const getAppointmentById = async (id: string) => {
  try {
    const appointment = await getAppointmentByIdFromRepo(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  } catch (error) {
    console.error("Error fetching appointment by id in service:", error);
    throw error;
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
  patientId: mongoose.Schema.Types.ObjectId;
  doctorId: mongoose.Schema.Types.ObjectId;
  hospitalId: mongoose.Schema.Types.ObjectId;
  appointmentDate: Date;
  appointmentTime: string;
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
    patientId?: mongoose.Schema.Types.ObjectId;
    appointmentDate?: Date;
    appointmentTime?: string;
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
