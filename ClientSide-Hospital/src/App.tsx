import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HospitalHome from './pages/HospitalHome';
import AppointmentPage from './pages/Appointmentpage';
import { AuthProvider } from './context/AuthContext';
import HospitalSignup from './components/HospitalSignup';
import HospitalLogin from './components/HospitalLogin';
import PaymentList from './pages/PaymentList';


const App: React.FC = () => {


  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/hospitalhome" element={<HospitalHome/>} />
          <Route path="/appointmentpage" element={<AppointmentPage/>} />
          <Route path="/hospitalSignup" element={<HospitalSignup/>} />
          <Route path="/hospitalLogin" element={<HospitalLogin/>} />
          <Route path="/payment-list" element={<PaymentList />} />
          
          {/* Pass the required props to the PrescriptionView component */}
         
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
