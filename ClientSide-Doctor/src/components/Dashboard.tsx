import React, { useState } from 'react';
import PrescriptionForm from './PrescriptionForm'; // Import the PrescriptionForm component

const Dashboard: React.FC = () => {
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

    const handleNewPrescriptionClick = () => {
        setShowPrescriptionForm(true); // Show the PrescriptionForm component
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-8">
            {/* Header Section */}
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Hello, <span className="text-purple-600">Dr. Dinith!</span>
                </h1>
                <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 rounded-full p-2 pl-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </header>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Main Content Area */}
                <div className="col-span-8 space-y-6">
                    {/* Visit Stats Section */}
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">Visits for Today</h2>
                            <p className="text-5xl font-bold">12</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">New Patients</h2>
                            <p className="text-5xl font-bold">4</p>
                            <p className="text-sm text-green-100 mt-2">2% increase</p>
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-red-400 text-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">Old Patients</h2>
                            <p className="text-5xl font-bold">8</p>
                            <p className="text-sm text-red-100 mt-2">12% decrease</p>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="grid grid-cols-2 gap-6">
                        <div
                            className="bg-pink-100 text-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-pink-200 transition"
                            onClick={handleNewPrescriptionClick}
                        >
                            <h3 className="text-xl font-semibold">+ New Prescription</h3>
                        </div>
                        <div className="bg-blue-100 text-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-blue-200 transition">
                            <h3 className="text-xl font-semibold">Prescription History</h3>
                        </div>
                    </div>

                    {/* Patient List */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Patient List</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">Kirushan A</span>
                                <span className="text-xs text-gray-500">9:50 AM</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">Anjana Horagolla</span>
                                <span className="text-xs text-gray-500">9:15 AM</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">Gayashan D</span>
                                <span className="text-xs text-gray-500">9:30 AM</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">Janith Fernando</span>
                                <span className="text-xs text-gray-500">9:50 AM</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">Muditha Perera</span>
                                <span className="text-xs text-gray-500">10:15 AM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Sidebar Section */}
                <div className="col-span-4 space-y-6">
                    {/* Messages Section */}
                    <div className="bg-gradient-to-r from-teal-400 to-teal-300 p-6 rounded-lg shadow-md text-center text-white">
                        <h3 className="text-xl font-semibold mb-2">Messages</h3>
                        <p className="text-sm">No messages to display</p>
                    </div>

                    {/* Calendar Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Calendar</h3>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600">
                            <div className="font-bold">Sun</div>
                            <div className="font-bold">Mon</div>
                            <div className="font-bold">Tue</div>
                            <div className="font-bold">Wed</div>
                            <div className="font-bold">Thu</div>
                            <div className="font-bold">Fri</div>
                            <div className="font-bold">Sat</div>
                            <div className="text-gray-400">4</div>
                            <div className="text-gray-400">11</div>
                            <div className="text-gray-400">18</div>
                        </div>
                    </div>

                    {/* Upcoming Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Upcoming</h3>
                        <p className="text-sm text-gray-500">No upcoming events</p>
                    </div>
                </div>
            </div>

            {/* Conditionally render the PrescriptionForm component */}
            {showPrescriptionForm && <PrescriptionForm />}
        </div>
    );
};

export default Dashboard;
