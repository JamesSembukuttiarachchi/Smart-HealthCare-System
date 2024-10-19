import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import PrescriptionForm from "../src/components/PrescriptionForm";
import AllPrescriptions from "./components/AllPrescriptions";
import DoctorSignup from "./components/DoctorSignup";
import DoctorLogin from "./components/DoctorLogin";
import PrescriptionView from "./components/PrescriptionView";
import { AuthProvider } from "./context/AuthContext";

// Create a sample prescription data object
const samplePrescriptionData = {
  patientName: "John Doe",
  age: 30,
  address: "123 Main St, Anytown, USA",
  contactNo: "555-1234",
  prescriptionNo: "RX123456",
  date: "2024-10-16",
  medicines: [
    {
      name: "Medicine A",
      dosage: "500mg",
      quantity: 30,
      instructions: "Take one tablet daily",
    },
    {
      name: "Medicine B",
      dosage: "250mg",
      quantity: 15,
      instructions: "Take one tablet twice a day",
    },
  ],
};

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<DoctorLogin />} />
            <Route path="/doctorsignup" element={<DoctorSignup />} />
            <Route path="/doctordashboard" element={<DoctorDashboard />} />
            <Route path="/prescriptionform/:appointmentId" element={<PrescriptionForm />} />
            <Route path="/allprescriptions" element={<AllPrescriptions />} />
            {/* Pass the required props to the PrescriptionView component */}
            <Route
              path="/prescription"
              element={
                <PrescriptionView prescriptionData={samplePrescriptionData} />
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
