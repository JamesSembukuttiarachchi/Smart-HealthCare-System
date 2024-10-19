import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/DoctorDashboard";
import PrescriptionForm from "../src/components/PrescriptionForm";
import AllPrescriptions from "./components/AllPrescriptions";
import DoctorSignup from "./components/DoctorSignup";
import DoctorLogin from "./components/DoctorLogin";
import PrescriptionView from "./components/PrescriptionView";
import { AuthProvider } from "./context/AuthContext";

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
              path="/prescription" element={<PrescriptionView />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
