// models/Patient.ts
import mongoose, { Schema, Document, CallbackError } from "mongoose";
import { Counter } from "./Counter"; // Import the Counter model
import bcrypt from "bcrypt";

interface IPatient extends Document {
  pid: string; // Patient ID in the format PXXXXXX
  name: string;
  gender: string;
  contactNumber: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the PatientSchema with the updated fields
const PatientSchema: Schema = new Schema({
  pid: { type: String, unique: true }, // Auto-generated patient ID
  name: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook to generate the pid and hash the password before saving a new patient
PatientSchema.pre<IPatient>("save", async function (next: (err?: CallbackError) => void) {
  try {
    // If the document is new, generate the pid
    if (this.isNew) {
      // Get the next sequence number from the Counter
      const counter = await Counter.findByIdAndUpdate(
        { _id: "patientId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Generate the patient ID in the desired format
      this.pid = `P${String(counter?.seq).padStart(6, "0")}`;
    }

    // Hash the password if it has been modified
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    next(); // No errors, continue saving
  } catch (error) {
    console.error("Error in PatientSchema pre-save hook:", error);
    next(error as CallbackError); // Cast error to CallbackError
  }
});

// Compare password for login validation
PatientSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the Patient model with the updated schema
export default mongoose.model<IPatient>("Patient", PatientSchema);
