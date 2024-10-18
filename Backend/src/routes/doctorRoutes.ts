import express from "express";
import {
  signupDoctor,
  loginDoctor,
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
} from "../controllers/doctorController";

const router = express.Router();

router.post("/doctors/signup", signupDoctor);
router.post("/doctors/login", loginDoctor);
router.get("/doctors", getAllDoctors);
router.get("/doctors/:id", getDoctorById);
router.post("/doctors", createDoctor); // Route for creating a new doctor
router.put("/doctors/:id", updateDoctor); // Route for updating a doctor's information
router.delete("/doctors/:id", deleteDoctor); // Route for deleting a doctor

export default router;
