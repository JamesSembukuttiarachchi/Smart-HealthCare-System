import mongoose, { Schema, Document } from "mongoose";

interface IPrescription extends Document {
  patientName: string;
  medicationDetails: string;
  issueDate: Date;
  notes: string;
}

const PrescriptionSchema: Schema = new Schema({
  patientName: { type: String, required: true },
  medicationDetails: { type: String, required: true },
  issueDate: { type: Date, required: true, default: Date.now },
  notes: { type: String, required: false },
});

export default mongoose.model<IPrescription>(
  "Prescription",
  PrescriptionSchema
);
