import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from "../context/AuthContext";

interface Appointment {
  id: string;
  patientId: { name: string } | null;
  doctorId: {_id:string}| null;
  hospitalId: {id:string} | null;
  status: string | null;
}

const AppointmentPage: React.FC = () => {
  const { user } = useAuth();
  const [value, setValue] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);

  // Fetch all appointments and filter them based on logged-in hospital ID
  useEffect(() => {
    if (user && user._id) {
      // Fetch all appointments
      axios.get('http://localhost:3000/api/appointments')
        .then(response => {
          console.log("Fetched appointments:", response.data); // Log to check if appointments are fetched
          const fetchedAppointments = response.data;
          if (Array.isArray(fetchedAppointments)) {
            // Set the appointments in state
            setAppointments(fetchedAppointments);

            // Now filter the appointments by logged-in hospital ID
            const filtered = fetchedAppointments.filter(
              appointment => String(appointment.hospitalId._id) === String(user._id)
            );

            console.log("Filtered Appointments:", filtered); // Log to see the filtered appointments
            setFilteredAppointments(filtered);
          } else {
            console.error("Unexpected data format: not an array");
          }
        })
        .catch(error => {
          console.error("There was an error fetching the appointments!", error);
        });
    }
  }, [user]); // Only run when `user` is available

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <nav className="p-4 bg-blue-600">
        <ul className="flex justify-center space-x-8 font-semibold text-white">
          <li>
            <a href="#appointmentpage" className="hover:text-gray-200">Home</a>
          </li>
          <li>
            <a href="#doctors" className="hover:text-gray-200">Doctors</a>
          </li>
          <li>
            <a href="#payments" className="hover:text-gray-200">Payments</a>
          </li>
        </ul>
      </nav>

      <h1 className="mb-8 text-3xl font-bold text-black-600">Appointments</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

        {/* Appointment List */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-800">Upcoming Appointments</h2>
          <ul className="space-y-4">
            {Array.isArray(filteredAppointments) && filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <li key={appointment.id} className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-blue-600">
                    {appointment.patientId?.name || 'Unknown Patient'}
                  </h3>
                  <p className="text-gray-700">Status: {appointment.status || 'No status available'}</p>
                </li>
              ))
            ) : (
              <p>No upcoming appointments for your hospital.</p>
            )}
          </ul>
        </div>

        {/* Calendar */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-gray-800">Schedule</h2>
          <Calendar 
           // onChange={setValue} 
            value={value} 
            className="rounded-lg shadow-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default AppointmentPage;
