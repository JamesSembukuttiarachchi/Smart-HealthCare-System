// paymentRoutes.ts
import express from "express";
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController";

const router = express.Router();

router.get("/payments", getAllPayments); // Route to get all payments
router.post("/payments", createPayment)
router.put("/payments/:id", updatePayment); // Route to update a payment
router.delete("/payments/:id", deletePayment); // Route to delete a payment

export default router;
