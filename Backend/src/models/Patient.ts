import mongoose, { Schema, Document } from "mongoose";

interface IPatient extends Document {
  name: string;
  age: number;
  gender: string;
  contactNumber: string;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

export default mongoose.model<IPatient>("Patient", PatientSchema);
