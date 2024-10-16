import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IHospital extends Document {
  name: string;
  location: string;
  email: string;
  contactNumber: string;
  channellingFee: number;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const HospitalSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  channellingFee: { type: Number, required: false },
  password: { type: String, required: true },
});

// Hash password before saving the doctor
HospitalSchema.pre<IHospital>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login validation
HospitalSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IHospital>("Hospital", HospitalSchema);
