// paymentRepository.ts
import mongoose from "mongoose";
import Payment from "../models/Payment";

// Create a payment for a booked appointment
export const createPaymentForAppointment = async (paymentData: {
  appointmentId: mongoose.Schema.Types.ObjectId;
  amount: number;
  status: string;
}) => {
  const payment = new Payment({
    ...paymentData,
    paymentDate: new Date(),

  });
  return await payment.save();
};

// Get all payments
export const getAllPayments = async () => {
  return await Payment.find().populate({
    path: "appointmentId",
    populate: [
      {
        path: "patientId", // Populate patient details
        //select: "name", // Only populate the name of the patient
      },
      {
        path: "hospitalId", // Populate hospital details
        //select: "name", // Only populate the name of the hospital
      },
      {
        path: "doctorId", // Populate hospital details
        //select: "name", // Only populate the name of the hospital
      },
    ],
  });
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
