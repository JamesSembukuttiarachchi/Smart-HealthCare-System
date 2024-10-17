// appointmentRepository.ts
import mongoose from "mongoose";
import Appointment from "../models/Appointment";

export const getAllAppointments = async () => {
  return await Appointment.find().populate("doctorId hospitalId");
};

export const getAppointmentsByDoctor = async (doctorId: string) => {
  return await Appointment.find({ doctorId }).populate("doctorId hospitalId");
};

export const createAppointment = async (appointmentData: {
  patientId: mongoose.Schema.Types.ObjectId;
  doctorId: mongoose.Schema.Types.ObjectId;
  hospitalId: mongoose.Schema.Types.ObjectId;
  appointmentDate: Date;
  appointmentTime: string;
  status: string;
}) => {
  const appointment = new Appointment(appointmentData);
  return await appointment.save();
};

export const updateAppointment = async (
  id: string,
  appointmentData: {
    patientId?: mongoose.Schema.Types.ObjectId;
    appointmentDate?: Date;
    appointmentTime?: string;
    status?: string;
  }
) => {
  return await Appointment.findByIdAndUpdate(id, appointmentData, {
    new: true,
  });
};

export const deleteAppointment = async (id: string) => {
  return await Appointment.findByIdAndDelete(id);
};
