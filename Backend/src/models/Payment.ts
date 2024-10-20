import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  appointmentId: mongoose.Schema.Types.ObjectId;
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
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Completed", "Failed"],
    default: "Completed",
  },
});

export default mongoose.model<IPayment>("Payment", PaymentSchema);
