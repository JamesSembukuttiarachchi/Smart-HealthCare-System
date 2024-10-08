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
