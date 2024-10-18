import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import PaymentList from './pages/PaymentList';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/payment-list" element={<PaymentList />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App