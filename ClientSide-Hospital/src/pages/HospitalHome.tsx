import React from "react";
import { Link,useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import hospitalHeader from "../assets/HospitalHeader2.png";
import { useAuth } from "../context/AuthContext";
import { CiLogout } from "react-icons/ci";
//import { useNavigate } from "react-router-dom";

const HospitalHome: React.FC = () => {

  const navigate = useNavigate();
  const {logout} = useAuth(); 
  const handleLogout = () => {
    // Assuming your AuthContext has a logout method
    logout();
    navigate("/hospitalLogin"); // Redirect to login page after logout
};

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Navbar */}
      <nav className="p-4 bg-blue-600">
        <ul className="flex justify-center space-x-8 font-semibold text-white">
          <li>
            <Link to="/appointmentpage" className="hover:text-gray-200">Appointments</Link> {/* Link added */}
          </li>
          <li>
            <a href="#doctors" className="hover:text-gray-200">Doctors</a>
          </li>
          <li>
            <a href="#payments" className="hover:text-gray-200">Payments</a>
          </li>
        </ul>
        <button
                    className="px-4 py-2 ml-4 text-white transition bg-red-500 rounded-md hover:bg-red-600"
                    onClick={handleLogout}
                >
                    <div className="flex flex-row items-center justify-between gap-2">
                        <CiLogout className="text-xl" /> Logout
                    </div>
                </button>
      </nav>
      

      <header className="py-8 text-center">
        {/* Image added to the header */}
        <img 
          src={hospitalHeader}
          alt="Hospital" 
          className="w-full max-w-full mx-auto mb-4 rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Smart Healthcare</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
        {/* Card 1 - Appointments */}
        <div id="appointments" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Appointments</h2>
          <p className="text-gray-700">Schedule medical appointments for timely and convenient healthcare services</p>
          <Link to="/appointmentpage">
            <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              View
            </button>
          </Link>
        </div>

        {/* Card 2 - Doctors */}
        <div id="doctors" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Doctors</h2>
          <p className="text-gray-700">Connect with expert doctors for personalized and quality healthcare.</p>
          <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            View
          </button>
        </div>

        {/* Card 3 - Payments */}
        <div id="payments" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Payments</h2>
          <p className="text-gray-700">Securely manage hospital payments with ease and convenience.</p>
          <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalHome;
