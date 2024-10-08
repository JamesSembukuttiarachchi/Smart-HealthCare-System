// paymentService.ts
import Payment from "../models/Payment";

// Create a payment for a booked appointment
export const createPaymentForAppointment = async (paymentData: {
  appointmentId: string;
  patientId: string;
  hospitalId: string;
  amount: number;
}) => {
  try {
    const payment = new Payment({
      ...paymentData,
      paymentDate: new Date(),
      status: "Pending",
    });
    const savedPayment = await payment.save();
    return savedPayment;
  } catch (error) {
    console.log("Error creating payment for appointment:", error); // Detailed error log
    throw new Error("Error creating payment for appointment");
  }
};

// Get all payments
export const getAllPayments = async () => {
  try {
    const payments = await Payment.find().populate(
      "appointmentId patientId hospitalId"
    );
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
    const updatedPayment = await Payment.findByIdAndUpdate(id, paymentData, {
      new: true,
    });
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
    const deletedPayment = await Payment.findByIdAndDelete(id);
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
