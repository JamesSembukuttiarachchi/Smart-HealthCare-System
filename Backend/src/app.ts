import "dotenv/config";
import express from "express";
import doctorRoutes from "./routes/doctorRoutes";
import patientRoutes from "./routes/patientRoutes";
import hospitalRoutes from "./routes/hospitalRoutes";

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Simple route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World");
});

// Integrate the routes for Doctor, Patient, and Hospital
app.use("/api", doctorRoutes);
app.use("/api", patientRoutes);
app.use("/api", hospitalRoutes);

export default app;
