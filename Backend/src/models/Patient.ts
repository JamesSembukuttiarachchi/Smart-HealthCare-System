// models/Patient.ts
import mongoose, { Schema, Document } from "mongoose";
import { Counter } from "./Counter"; // Import the Counter model

interface IPatient extends Document {
  pid: string; // Patient ID in the format PXXXXXX
  name: string;
  gender: string;
  contactNumber: string;
  email: string;
}

// Create the PatientSchema with the updated fields
const PatientSchema: Schema = new Schema({
  pid: { type: String, unique: true }, // Auto-generated patient ID
  name: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Pre-save hook to generate the pid before saving a new patient
PatientSchema.pre<IPatient>("save", async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    // Get the next sequence number from the Counter
    const counter = await Counter.findByIdAndUpdate(
      { _id: "patientId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Generate the patient ID in the desired format
    this.pid = `P${String(counter.seq).padStart(6, "0")}`;
    next();
  } catch (error) {
    console.error("Error generating patient ID:", error);
    //next(error);
  }
});

// Export the Patient model with the updated schema
export default mongoose.model<IPatient>("Patient", PatientSchema);
