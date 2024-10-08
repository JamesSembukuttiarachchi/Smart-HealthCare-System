import express from "express";
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController";

const router = express.Router();

router.get("/patients", getAllPatients); // Route for fetching all patients
router.post("/patients", createPatient); // Route for creating a new patient
router.put("/patients/:id", updatePatient); // Route for updating a patient
router.delete("/patients/:id", deletePatient); // Route for deleting a patient

export default router;
