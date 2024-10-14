// paymentService.ts
import {
  createPaymentForAppointment as createPaymentInRepo,
  getAllPayments as getAllPaymentsFromRepo,
  updatePayment as updatePaymentInRepo,
  deletePayment as deletePaymentInRepo,
} from "../repositories/paymentRepository";

// Create a payment for a booked appointment
export const createPaymentForAppointment = async (paymentData: {
  appointmentId: string;
  patientId: string;
  hospitalId: string;
  amount: number;
}) => {
  try {
    const savedPayment = await createPaymentInRepo(paymentData);
    return savedPayment;
  } catch (error) {
    console.log("Error creating payment for appointment:", error); // Detailed error log
    throw new Error("Error creating payment for appointment");
  }
};

// Get all payments
export const getAllPayments = async () => {
  try {
    const payments = await getAllPaymentsFromRepo();
    return payments;
  } catch (error) {
    console.log("Error fetching payments:", error); // Detailed error log
    throw new Error("Error fetching payments");
  }
};

// Update a payment
export const updatePayment = async (
  id: string,
  paymentData: {
    status?: string;
  }
) => {
  try {
    const updatedPayment = await updatePaymentInRepo(id, paymentData);
    if (!updatedPayment) {
      console.log(`Payment with ID ${id} not found`); // Log if payment not found
      throw new Error("Payment not found");
    }
    return updatedPayment;
  } catch (error) {
    console.log("Error updating payment:", error); // Detailed error log
    throw new Error("Error updating payment");
  }
};

// Delete a payment
export const deletePayment = async (id: string) => {
  try {
    const deletedPayment = await deletePaymentInRepo(id);
    if (!deletedPayment) {
      console.log(`Payment with ID ${id} not found`); // Log if payment not found
      throw new Error("Payment not found");
    }
    return deletedPayment;
  } catch (error) {
    console.log("Error deleting payment:", error); // Detailed error log
    throw new Error("Error deleting payment");
  }
};
