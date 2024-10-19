// paymentController.ts
import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";

// Get all payments
export const getAllPayments = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all payments...");
    const payments = await paymentService.getAllPayments();
    
    if (!Array.isArray(payments)) {
      throw new Error("Expected an array of payments");
    }

    console.log("Payments fetched successfully:", payments);
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error instanceof Error ? error.message : error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};


// Create a new payment
export const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    const newPayment = await paymentService.createPaymentForAppointment(
      paymentData
    );
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Update a payment
export const updatePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const paymentData = req.body;
  try {
    console.log(`Updating payment with ID: ${id}...`);
    const updatedPayment = await paymentService.updatePayment(id, paymentData);
    console.log("Payment updated successfully:", updatedPayment);
    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// Delete a payment
export const deletePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(`Deleting payment with ID: ${id}...`);
    const deletedPayment = await paymentService.deletePayment(id);
    console.log("Payment deleted successfully:", deletedPayment);
    res.status(200).json(deletedPayment);
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
