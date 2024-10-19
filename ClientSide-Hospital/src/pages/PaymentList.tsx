import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Payment {
  _id: string;
  appointmentId: {
    _id: string;
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
        console.log('API Response:', response.data);

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
    return <div className="text-center text-xl py-8">Loading payments...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg py-8">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Payments List</h2>

      {payments.length === 0 ? (
        <div className="text-center text-gray-600">No payments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-100 rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Appointment ID</th>
                <th className="px-6 py-3 text-left font-semibold">Amount</th>
                <th className="px-6 py-3 text-left font-semibold">Payment Date</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments.map((payment) => (
                <tr key={payment._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{payment.appointmentId._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        payment.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentList;
