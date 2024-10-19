import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Payment {
  _id: string;
  appointmentId: {
    _id: string; // Assuming appointmentId has an _id property
    // Include any other properties you need here
  };
  amount: number;
  paymentDate: string;
  status: string;
}

const PaymentList: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/payments');
        console.log('API Response:', response.data); // Debugging

        if (response.data && Array.isArray(response.data)) {
          setPayments(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Error fetching payments.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading payments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Payments List</h2>
      
      {payments.length === 0 ? (
        <div>No payments found.</div>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Appointment ID</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Payment Date</th>
              <th className="px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{payment.appointmentId._id}</td> {/* Ensure this is a valid string */}
                <td className="px-4 py-2">${payment.amount.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentList;
