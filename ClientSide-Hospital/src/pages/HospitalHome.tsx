import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import hospitalHeader from "../assets/HospitalHeader2.png";
import { useAuth } from "../context/AuthContext";
import { CiLogout } from "react-icons/ci";
import Navbars from "../components/Navbars";
//import { useNavigate } from "react-router-dom";

const HospitalHome: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    // Assuming your AuthContext has a logout method
    logout();
    navigate("/hospitalLogin"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen  bg-gray-100">
      {/* Navbar */}
      <Navbars/>

      <header className=" text-center">
        {/* Image added to the header */}
        <img
          src={hospitalHeader}
          alt="Hospital"
          className="w-full max-w-full mx-auto mb-4 rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to Smart Healthcare
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 mx-2">
        {/* Card 1 - Appointments */}
        <div id="appointments" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">
            Appointments
          </h2>
          <p className="text-gray-700">
            Schedule medical appointments for timely and convenient healthcare
            services
          </p>
          <Link to="/appointmentpage">
            <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              View
            </button>
          </Link>
        </div>

        {/* Card 2 - Doctors */}
        <div id="doctors" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Doctors</h2>
          <p className="text-gray-700">
            Connect with expert doctors for personalized and quality healthcare.
          </p>
          <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            View
          </button>
        </div>

        {/* Card 3 - Payments */}
        <div id="payments" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Payments</h2>
          <p className="text-gray-700">
            Securely manage hospital payments with ease and convenience.
          </p>
          <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalHome;
