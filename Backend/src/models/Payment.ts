import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  appointmentId: mongoose.Schema.Types.ObjectId;
  patientId: mongoose.Schema.Types.ObjectId;
  hospitalId: mongoose.Schema.Types.ObjectId;
  amount: number;
  paymentDate: Date;
  status: string;
}

const PaymentSchema: Schema = new Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
});

export default mongoose.model<IPayment>("Payment", PaymentSchema);
