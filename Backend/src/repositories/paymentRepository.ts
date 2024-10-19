// paymentRepository.ts
import mongoose from "mongoose";
import Payment from "../models/Payment";

// Create a payment for a booked appointment
export const createPaymentForAppointment = async (paymentData: {
  appointmentId: mongoose.Schema.Types.ObjectId;
  amount: number;
}) => {
  const payment = new Payment({
    ...paymentData,
    paymentDate: new Date(),
    status: "Completed",
  });
  return await payment.save();
};

// Get all payments
export const getAllPayments = async () => {
  return await Payment.find().populate("appointmentId");
};


// Update a payment
export const updatePayment = async (
  id: string,
  paymentData: {
    status?: string;
  }
) => {
  return await Payment.findByIdAndUpdate(id, paymentData, {
    new: true,
  });
};

// Delete a payment
export const deletePayment = async (id: string) => {
  return await Payment.findByIdAndDelete(id);
};
