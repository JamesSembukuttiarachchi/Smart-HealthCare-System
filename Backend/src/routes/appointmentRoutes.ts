// routes.ts
import express from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctor,
} from "../controllers/appointmentController";

const router = express.Router();

router.get("/appointments", getAllAppointments); // Get all appointments
router.get("/appointments/:id", getAppointmentById)
router.get("/appointments/doctor/:doctorId", getAppointmentsByDoctor); // Get appointments for a specific doctor
router.post("/appointments", createAppointment); // Create a new appointment
router.put("/appointments/:id", updateAppointment); // Update an appointment
router.delete("/appointments/:id", deleteAppointment); // Delete an appointment

export default router;
