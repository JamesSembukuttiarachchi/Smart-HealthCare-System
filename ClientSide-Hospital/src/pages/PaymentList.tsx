import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

interface Payment {
  _id: string;
  appointmentId: string;
  amount: number;
  paymentDate: string;
  status: string;
  hospitalId: string;
}

const PaymentList: React.FC = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);

  // Fetch all payments and filter them by logged-in hospital ID
  useEffect(() => {
    if (user && user._id) {
      axios.get('http://localhost:3000/api/payments')
        .then(response => {
          const fetchedPayments = response.data;
          
          if (Array.isArray(fetchedPayments)) {
            setPayments(fetchedPayments);

            // Filter payments by hospitalId (for the logged-in hospital)
            const filtered = fetchedPayments.filter(
              payment => String(payment.hospitalId) === String(user._id)
            );
            setFilteredPayments(filtered);
          } else {
            console.error("Unexpected data format");
          }
        })
        .catch(error => {
          console.error("Error fetching payments:", error);
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-200">
      <nav className="p-6 mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg rounded-lg">
        <ul className="flex justify-center space-x-12 font-semibold text-white">
          <li>
            <a href="#paymentlist" className="hover:underline">Home</a>
          </li>
          <li>
            <a href="#appointments" className="hover:underline">Appointments</a>
          </li>
          <li>
            <a href="#doctors" className="hover:underline">Doctors</a>
          </li>
        </ul>
      </nav>

      <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">Payments</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

        {/* Payment List */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-700">Filtered Payments</h2>
          <ul className="space-y-6">
            {Array.isArray(filteredPayments) && filteredPayments.length > 0 ? (
              filteredPayments.map(payment => (
                <li key={payment._id} className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-blue-700">Appointment ID: {payment.appointmentId}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' 
                      : payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="mt-3 text-gray-600">
                    <p className="text-base">Amount: <span className="font-medium">${payment.amount.toFixed(2)}</span></p>
                    <p className="text-sm">Payment Date: {new Date(payment.paymentDate).toLocaleDateString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-700">No payments found for your hospital.</p>
            )}
          </ul>
        </div>

        {/* Info Section */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-700">Payment Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            Here you can view all payments associated with your hospital. The status of each payment is displayed, and you can track the amounts, appointment details, and payment dates. Payments are highlighted based on their status:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-600">
            <li><span className="text-green-800 font-medium">Completed</span> payments are highlighted in green.</li>
            <li><span className="text-yellow-800 font-medium">Pending</span> payments are highlighted in yellow.</li>
            <li><span className="text-red-800 font-medium">Failed</span> payments are highlighted in red.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default PaymentList;
