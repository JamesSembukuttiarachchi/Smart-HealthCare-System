// appointmentModel.ts
import mongoose, { Schema, Document } from "mongoose";

interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId; // Reference to the Doctor model
  hospitalId: mongoose.Types.ObjectId; // Reference to the Hospital model
  appointmentDate: Date;
  appointmentTime: String;
  status: string; // e.g., "Scheduled", "Completed", "Cancelled"
}

const AppointmentSchema: Schema = new Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  appointmentDate: { type: Date, required: true },
  appointmentTime: {type: String, required: true},
  status: {
    type: String,
    required: true,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
});

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
