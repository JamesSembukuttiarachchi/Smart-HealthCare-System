import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Define types for Appointment
interface Appointment {
    _id: string;
    patientName: string;
    patientId: { name: string };
    hospitalId: { name: string; _id: string };
    appointmentDate: string;
}

const PrescriptionForm: React.FC = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();
    const [appointment, setAppointment] = useState<Appointment>();
    const [medicationDetails, setMedicationDetails] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate('/doctordashboard');
    };
    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/appointments/${appointmentId}`
                );
                setAppointment(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointment();

    }, [appointmentId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/prescriptions', {
                appointmentId,
                medicationDetails,
                issueDate: new Date(), // Issue date will be the current date
                notes,
            });

            console.log('Prescription saved successfully:', response.data);
            navigate('/'); // Navigate to the home page on successful submission
        } catch (error) {
            console.error('Error saving prescription:', error);
        }
    };


    return (
        <div className="bg-[#84D3E9] min-h-screen flex flex-col items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">{appointment?.patientId.name}'s Prescription</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
                            {appointment?.patientId.name}
                        </label>
                        <input
                            id="patientName"
                            type="text"
                            value={appointment?.patientId.name}
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            readOnly
                        />
                    </div>

                    {/* Date Input Section */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issuedDate">
                            Issued Date
                        </label>
                        <input
                            id="issuedDate"
                            type="date"
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-not-allowed"
                            value={new Date().toISOString().split('T')[0]}  // Sets the current date
                            readOnly  // Makes the input read-only
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medication">
                            Medication
                        </label>
                        <textarea
                            id="medication"
                            value={medicationDetails}
                            onChange={(e) => setMedicationDetails(e.target.value)}
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div className='flex justify-center items-center gap-32 mb-8'>
                        <button
                            className="bg-green-600 text-white p-3 rounded-md w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            onClick={handleBackButtonClick}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-600 text-white p-3 rounded-md w-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            Save Prescription
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default PrescriptionForm;
