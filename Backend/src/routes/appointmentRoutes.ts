import express from "express";
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController";

const router = express.Router();

router.get("/appointments", getAllAppointments); // Get all appointments
router.post("/appointments", createAppointment); // Create a new appointment
router.put("/appointments/:id", updateAppointment); // Update an appointment
router.delete("/appointments/:id", deleteAppointment); // Delete an appointment

export default router;
