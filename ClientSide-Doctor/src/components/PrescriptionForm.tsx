import React from 'react';

const PrescriptionForm: React.FC = () => {
    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Input the prescription of the patient</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
                            Patient Name
                        </label>
                        <input
                            id="patientName"
                            type="text"
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientGroup">
                            Patient Group
                        </label>
                        <select
                            id="patientGroup"
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            <option>Select Group</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
                            Patient ID
                        </label>
                        <input
                            id="patientId"
                            type="text"
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicines">
                            Medicines
                        </label>
                        <textarea
                            id="medicines"
                            className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-purple-600 text-white p-3 rounded-md w-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        Save Details
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PrescriptionForm;
