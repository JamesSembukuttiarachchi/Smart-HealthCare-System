// appointmentModel.ts
import mongoose, { Schema, Document } from "mongoose";

interface IAppointment extends Document {
  patientName: string;
  doctorId: mongoose.Types.ObjectId; // Reference to the Doctor model
  hospitalId: mongoose.Types.ObjectId; // Reference to the Hospital model
  appointmentDate: Date;
  status: string; // e.g., "Scheduled", "Completed", "Cancelled"
}

const AppointmentSchema: Schema = new Schema({
  patientName: { type: String, required: true },
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
  status: {
    type: String,
    required: true,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
});

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
