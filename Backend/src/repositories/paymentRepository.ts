// paymentRepository.ts
import Payment from "../models/Payment";

// Create a payment for a booked appointment
export const createPaymentForAppointment = async (paymentData: {
  appointmentId: string;
  patientId: string;
  hospitalId: string;
  amount: number;
}) => {
  const payment = new Payment({
    ...paymentData,
    paymentDate: new Date(),
    status: "Pending",
  });
  return await payment.save();
};

// Get all payments
export const getAllPayments = async () => {
  return await Payment.find().populate("appointmentId patientId hospitalId");
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
