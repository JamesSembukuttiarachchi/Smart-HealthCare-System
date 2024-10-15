import express from "express";
import { signupDoctor, loginDoctor } from "../controllers/doctorController";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController";

const router = express.Router();

router.post("/doctors/signup", signupDoctor);
router.post("/doctors/login", loginDoctor);
router.get("/doctors", getAllDoctors);
router.post("/doctors", createDoctor); // Route for creating a new doctor
router.put("/doctors/:id", updateDoctor); // Route for updating a doctor's information
router.delete("/doctors/:id", deleteDoctor); // Route for deleting a doctor

export default router;
