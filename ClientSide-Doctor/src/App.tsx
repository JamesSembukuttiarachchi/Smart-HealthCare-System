import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorDashboard from '../src/components/DoctorDashboard';
import PrescriptionForm from '../src/components/PrescriptionForm';
import AllPrescriptions from './components/AllPrescriptions';
import DoctorSignup from './components/DoctorSignup';
import DoctorLogin from './components/DoctorLogin';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/doctorlogin" element={<DoctorLogin />} />
          <Route path="/doctorsignup" element={<DoctorSignup />} />
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
          <Route path="/prescriptionform" element={<PrescriptionForm />} />
          <Route path="/allprescriptions" element={<AllPrescriptions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
