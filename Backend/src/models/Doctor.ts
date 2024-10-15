import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IDoctor extends Document {
  name: string;
  email: string;
  specialization: string;
  phone: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving the doctor
DoctorSchema.pre<IDoctor>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login validation
DoctorSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IDoctor>("Doctor", DoctorSchema);
