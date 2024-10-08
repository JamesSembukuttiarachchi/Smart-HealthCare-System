import mongoose, { Schema, Document } from "mongoose";
interface IPatient extends Document {
  name: string;
  gender: string;
  contactNumber: string;
  email: string;
}

// Create the PatientSchema with the updated fields
const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Export the Patient model with the updated schema
export default mongoose.model<IPatient>("Patient", PatientSchema);
