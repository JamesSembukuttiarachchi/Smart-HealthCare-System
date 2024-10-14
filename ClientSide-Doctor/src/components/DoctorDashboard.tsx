import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

// Define types for Appointment
interface Appointment {
    _id: string;
    patientName: string;
    appointmentDate: string;
}

const DoctorDashboard: React.FC = () => {
    const doctorId = "6502a8c5c1256f9c1a2b3456";
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [currentDate, setCurrentDate] = useState(dayjs());

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/appointments/doctor/${doctorId}`);
                setAppointments(response.data); // Ensure the data matches Appointment type
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        if (doctorId) {
            fetchAppointments();
        }
    }, [doctorId]);

    const startOfMonth = currentDate.startOf('month');
    const startDayOfWeek = startOfMonth.day(); // 0 (Sunday) to 6 (Saturday)
    const daysInMonth = currentDate.daysInMonth();

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    const renderDays = () => {
        const days = [];
        const today = dayjs(); // Get the current date

        // Fill in the empty cells before the start of the month
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="text-gray-300"></div>);
        }

        // Render each day of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = startOfMonth.date(day);
            const isToday = today.isSame(currentDate, 'day');

            days.push(
                <div
                    key={day}
                    className={`p-2 rounded-full cursor-pointer ${isToday ? 'bg-purple-500 text-white' : 'hover:bg-purple-200'
                        }`}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const handleNewPrescriptionClick = () => {
        navigate('/prescriptionform');
    };

    const handlePrescriptionHistoryClick = () => {
        navigate('/allprescriptions');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-8 relative">
            {/* Header Section */}
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Hello, <span className="text-purple-600">Dr. Dinith!</span> Welcome to your Dashboard
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
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-red-400 text-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">Old Patients</h2>
                            <p className="text-5xl font-bold">8</p>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="grid grid-cols-2 gap-6">
                        <div
                            className="bg-pink-100 text-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-pink-200 transition"
                            onClick={handleNewPrescriptionClick}
                        >
                            <h3 className="text-xl font-semibold">New Prescription</h3>
                        </div>
                        <div className="bg-blue-100 text-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-blue-200 transition"
                            onClick={handlePrescriptionHistoryClick}>
                            <h3 className="text-xl font-semibold">Prescription History</h3>
                        </div>
                    </div>

                    {/* Patient List */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Patient List</h3>
                        <ul className="space-y-3">
                            {appointments.map((appointment) => (
                                <li key={appointment._id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-gray-700">{appointment.patientName}</span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(appointment.appointmentDate).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </li>
                            ))}
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
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-800">
                                &lt; Prev
                            </button>
                            <h3 className="text-xl font-semibold text-gray-800">
                                {currentDate.format('MMMM YYYY')}
                            </h3>
                            <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800">
                                Next &gt;
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600">
                            <div className="font-bold">Sun</div>
                            <div className="font-bold">Mon</div>
                            <div className="font-bold">Tue</div>
                            <div className="font-bold">Wed</div>
                            <div className="font-bold">Thu</div>
                            <div className="font-bold">Fri</div>
                            <div className="font-bold">Sat</div>
                            {renderDays()}
                        </div>
                    </div>

                    {/* Upcoming Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Upcoming</h3>
                        <p className="text-sm text-gray-500">No upcoming events</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
