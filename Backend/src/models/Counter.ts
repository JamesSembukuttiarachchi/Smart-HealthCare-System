import mongoose, { Schema, Document } from "mongoose";

// Define the Counter interface
interface ICounter extends Document {
  seq: number; // Current sequence number
}

// Create the Counter Schema to keep track of the sequence for pid
const CounterSchema: Schema = new Schema({
  _id: { type: String, required: true }, // Unique identifier for the counter (e.g., "patientId")
  seq: { type: Number, default: 0 }, // The current sequence number
});

// Export the Counter model
export const Counter = mongoose.model<ICounter>("Counter", CounterSchema);
