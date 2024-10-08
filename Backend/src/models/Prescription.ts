import mongoose, { Schema, Document } from "mongoose";

interface IPrescription extends Document {
  patientId: mongoose.Schema.Types.ObjectId;
  doctorId: mongoose.Schema.Types.ObjectId;
  medicationDetails: string;
  issueDate: Date;
  notes: string;
}

const PrescriptionSchema: Schema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
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
