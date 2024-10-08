import express from "express";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController";

const router = express.Router();

router.get("/doctors", getAllDoctors);
router.post("/doctors", createDoctor); // Route for creating a new doctor
router.put("/doctors/:id", updateDoctor); // Route for updating a doctor's information
router.delete("/doctors/:id", deleteDoctor); // Route for deleting a doctor

export default router;
