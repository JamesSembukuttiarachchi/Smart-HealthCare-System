import express from "express";
import {
  signupPatient,
  loginPatient,
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientByPid, // Import the new function to get a patient by pid
} from "../controllers/patientController";


const router = express.Router();

router.post("/patients/signup", signupPatient);
router.post("/patients/login", loginPatient);

// Route for fetching all patients
router.get("/patients", getAllPatients);

// Route for fetching a single patient by pid
router.get("/patients/:pid", getPatientByPid); // New route for getting a patient by PID

// Route for creating a new patient
router.post("/patients", createPatient);

// Route for updating a patient by pid
router.put("/patients/:pid", updatePatient); // Updated to use pid instead of id

// Route for deleting a patient by pid
router.delete("/patients/:pid", deletePatient); // Updated to use pid instead of id

export default router;
