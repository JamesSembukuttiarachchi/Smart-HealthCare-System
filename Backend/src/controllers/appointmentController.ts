//apointment controller
import { Request, Response } from "express";
import * as appointmentService from "../services/appointmentService";

// Get all appointments
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Fetch an appointment by id
export const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(`Fetching appointment with ID: ${id}...`);
    const appointment = await appointmentService.getAppointmentById(id);
    console.log("Appointment fetched successfully:", appointment);
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment by Id:", error);
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Get all appointments for a specific doctor
export const getAppointmentsByDoctor = async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId; // assuming you send the doctor's ID in the request URL
  try {
    const appointments = await appointmentService.getAppointmentsByDoctor(
      doctorId
    );
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Create a new appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentData = req.body;
    const newAppointment = await appointmentService.createAppointment(
      appointmentData
    );
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Update an appointment
export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const appointmentData = req.body;
  try {
    const updatedAppointment = await appointmentService.updateAppointment(
      id,
      appointmentData
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Delete an appointment
export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedAppointment = await appointmentService.deleteAppointment(id);
    res.status(200).json(deletedAppointment);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
