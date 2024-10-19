import React, { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorImg from '../assets/hospitalHeader1.png'
import { useAuth } from '../context/AuthContext';

const HospitalSignup: React.FC = () => {
    const {signup,loading}=useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        email: '',
        contactNumber: '',
       // channellingFee: '',
        password:'',
    });

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
    
        try {
          // Use the signup function from AuthContext
          await signup(
            formData.name,
            formData.location,
            formData.email,
            formData.contactNumber,
            formData.password
          );
          setSuccessMessage('Signup successful! Welcome aboard.');
          setFormData({ name: '',location: '', email: '', contactNumber: '', password: '' });
          navigate('/hospitalhome'); // Redirect to doctor dashboard after signup
        } catch (error) {
          setErrorMessage('Signup failed. Please try again.');
          console.error('Signup failed', error);
        }
      };

    return (
        <div className="flex h-screen bg-[#84D3E9]">
            <div className="flex items-center justify-center w-1/2">
                <div className="p-8 bg-white rounded-lg shadow-md w-96">
                    <h2 className="mb-4 text-2xl font-semibold text-center">Get Started</h2>
                    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                    {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Hospital Name</label>
                            <input
                                type="text"
                                name="name"
                                //value={`Dr. ${formData.name}`}
                                onChange={handleChange}
                                required
                                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your location"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">contactNumber</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your contactNumber"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
              type="submit"
              className="w-full py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-500"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Signing up...' : 'Signup'}
            </button>
                    </form>
                </div>
            </div>
            <div className="flex items-center justify-center w-1/2 bg-light-blue-300">
                <img src={DoctorImg} alt="Signup Illustration" className="h-auto max-w-full" />
            </div>
        </div>
    );
};

export default HospitalSignup;
