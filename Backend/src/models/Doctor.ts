import mongoose, { Schema, Document } from "mongoose";

interface IDoctor extends Document {
  name: string;
  specialization: string;
  phone: string;
  email: string;
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IDoctor>("Doctor", DoctorSchema);
