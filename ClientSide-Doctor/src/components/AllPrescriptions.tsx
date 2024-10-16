import React from 'react';
import { useNavigate } from 'react-router-dom';

const AllPrescriptions: React.FC = () => {
    const navigate = useNavigate();

    const handlePrescriptionClick = () => {
        navigate('/prescription');
    };

    const prescriptions = [
        { name: 'Gayashan D', count: 4, description: 'Augmentin 625 Duo Tablet' },
        { name: 'Janith Fernando', count: 2, description: 'Azithral 500 Tablet' },
        { name: 'Anjana Horagolla', count: 3, description: 'Anapthaline Cite' },
    ];

    return (
        <div className="bg-[#84D3E9] min-h-screen flex justify-center p-8">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">List of Prescriptions</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-72 bg-gray-100"
                        />
                        <div className="flex items-center space-x-3">

                            <img
                                src="https://via.placeholder.com/30"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full border-2 border-gray-200"
                            />
                            <span className="text-gray-700 font-medium">Dr. Diniith</span>
                        </div>
                    </div>
                </div>

                {/* Prescription Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="text-gray-900 text-sm leading-normal bg-gray-100">
                                <th className="py-3 px-6 text-left font-bold">Patient Name</th>
                                <th className="py-3 px-6 text-left font-bold">No of Prescriptions</th>
                                <th className="py-3 px-6 text-left font-bold">Medications</th>
                                <th className="py-3 px-6 text-center font-semibold"></th>
                                <th className="py-3 px-6 text-center font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 text-sm">
                            {prescriptions.map((prescription, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="py-4 px-6 text-left font-bold">{prescription.name}</td>
                                    <td className="py-4 px-6 text-left">{prescription.count}</td>
                                    <td className="py-4 px-6 text-left">{prescription.description}</td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            className="bg-purple-600 text-white p-3 rounded-md w-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                            aria-label={`view prescription for ${prescription.name}`}
                                            onClick={handlePrescriptionClick}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            className="bg-red-600 text-white p-3 rounded-md w-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                            aria-label={`Remove prescription for ${prescription.name}`}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllPrescriptions;
