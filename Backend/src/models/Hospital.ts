import mongoose, { Schema, Document } from "mongoose";

interface IHospital extends Document {
  name: string;
  location: string;
  contactNumber: string;
  channellingFee: number;
}

const HospitalSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  channellingFee: { type: Number, required: false },
});

export default mongoose.model<IHospital>("Hospital", HospitalSchema);
