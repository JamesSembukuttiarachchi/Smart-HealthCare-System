import express from "express";
import {
  getAllPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
} from "../controllers/prescriptionController";

const router = express.Router();

router.get("/prescriptions", getAllPrescriptions); // Route to get all prescriptions
router.get("/prescription/:id", getPrescriptionById);
router.post("/prescriptions", createPrescription); // Route to create a new prescription
router.put("/prescriptions/:id", updatePrescription); // Route to update a prescription
router.delete("/prescriptions/:id", deletePrescription); // Route to delete a prescription

export default router;
