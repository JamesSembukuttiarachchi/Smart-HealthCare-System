import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { FaFilePen } from 'react-icons/fa6';

interface Prescription {
    _id: string;
    appointmentId: { patientId: { name: string }, hospitalId: string, doctorId: { _id: string } };
    medicationDetails: string;
    appointmentDate: string;
}

const AllPrescriptions: React.FC = () => {
    const { user } = useAuth(); // Get the user details from AuthContext

    const navigate = useNavigate();

    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

    useEffect(() => {
        const fetchPrescription = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/prescriptions`
                );
                setPrescriptions(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchPrescription();

    }, []);

    const handlePrescriptionClick = (prescriptionId: string) => {
        navigate(`/prescription/${prescriptionId}`);
    };

    const handleBackButtonClick = () => {
        navigate('/doctordashboard');
    };

    return (
        <div className="bg-[#84D3E9] min-h-screen flex justify-center p-8">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button className="bg-green-600 text-white p-2 rounded-md w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            onClick={handleBackButtonClick}
                        >
                            <div className="flex flex-row items-center justify-between gap-2">
                                <IoIosArrowBack className="text-2xl" /> Back
                            </div>
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">List of Prescriptions</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-72 bg-gray-100"
                        />
                        <div className="flex items-center space-x-3">
                            <span className="text-purple-600">Dr. {user.name}</span>
                        </div>
                    </div>
                </div>

                {/* Prescription Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="text-gray-900 text-sm leading-normal bg-gray-100">
                                <th className="py-3 px-6 text-left font-bold">Patient Name</th>
                                <th className="py-3 px-6 text-left font-bold">Medications</th>
                                <th className="py-3 px-6 text-left font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 text-sm">
                            {prescriptions
                                .filter(prescription => prescription?.appointmentId?.doctorId?._id === user._id) // Filter prescriptions for the logged-in doctor
                                .map((prescription, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                        <td className="py-3 px-6 text-left font-bold">{prescription?.appointmentId?.patientId?.name}</td>
                                        <td className="py-3 px-6 text-left">{prescription.medicationDetails}</td>
                                        <td className="py-3 px-6 text-right">
                                            <button
                                                className="bg-purple-600 text-white p-2 rounded-md w-30 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                                onClick={() => handlePrescriptionClick(prescription._id)}
                                            >
                                                <div className="flex items-center">
                                                    <FaFilePen className="text-xl" />View
                                                </div>
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
