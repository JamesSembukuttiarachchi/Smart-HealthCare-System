import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from '../src/components/Dashboard';
import PrescriptionForm from '../src/components/PrescriptionForm';

const App: React.FC = () => {
    return (
        <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/doctordashboard" element={<Dashboard />} />
          <Route path="/enterprescription" element={<PrescriptionForm />} />
          
        </Routes>
      </BrowserRouter>
    </div>
    );
};

export default App;
