import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrescriptionForm: React.FC = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };
    return (
        <div className="bg-[#84D3E9] min-h-screen flex flex-col items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Patient's Prescription</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
                            Patient Name
                        </label>
                        <input
                            id="patientName"
                            type="text"
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
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

                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientGroup">
                            Patient Group
                        </label>
                        <select
                            id="patientGroup"
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            <option>Select Group</option>
                        </select>
                    </div> */}

                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
                            Patient ID
                        </label>
                        <input
                            id="patientId"
                            type="text"
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div> */}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medication">
                            Medication
                        </label>
                        <textarea
                            id="medication"
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
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-purple-600 text-white p-3 rounded-md w-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        onClick={handleButtonClick}
                    >
                        Save Prescription
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PrescriptionForm;
