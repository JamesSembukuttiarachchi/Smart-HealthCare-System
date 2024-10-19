import React, { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorImg from '../assets/hospitalHeader1.png'
import { useAuth } from '../context/AuthContext';

const HospitalLogin: React.FC = () => {
    const {login,loading}=useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
    
        try {
          // Use the login function from AuthContext
          await login(email, password);
          setSuccessMessage('Login successful! Welcome back.');
          navigate('/hospitalhome'); // Redirect to doctor dashboard after login
        } catch (error) {
          setErrorMessage('Login failed. Please check your credentials and try again.');
          console.error('Login failed', error);
        }
      };

    return (
        <div className="flex h-screen bg-[#84D3E9]">
            <div className="flex items-center justify-center w-1/2">
                <div className="p-8 bg-white rounded-lg shadow-md w-96">
                    <h2 className="mb-4 text-2xl font-semibold text-center">Welcome!</h2>
                    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                    {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
                    </form>
                </div>
            </div>
            <div className="flex items-center justify-center w-1/2 bg-light-blue-300">
                <img src={DoctorImg} alt="Login Illustration" className="h-auto max-w-full" />
            </div>
        </div>
    );
};

export default HospitalLogin;
