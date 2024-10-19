import mongoose, { Schema, Document } from "mongoose";

interface IPrescription extends Document {
  appointmentId: mongoose.Types.ObjectId;
  medicationDetails: string;
  issueDate: Date;
  notes: string;
}

const PrescriptionSchema: Schema = new Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  medicationDetails: { type: String, required: true },
  issueDate: { type: Date, required: true, default: Date.now },
  notes: { type: String, required: false },
});

export default mongoose.model<IPrescription>(
  "Prescription",
  PrescriptionSchema
);
