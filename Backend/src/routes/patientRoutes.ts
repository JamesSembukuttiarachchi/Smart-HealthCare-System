import express from "express";
import {
  getAllPatients,
  createPatient,
  updatePatient,
} from "../controllers/patientController";

const router = express.Router();

router.get("/patients", getAllPatients);
router.post("/patients", createPatient); // Route for creating a new patient
router.put("/patients/:id", updatePatient); // Route for updating a patient

export default router;
