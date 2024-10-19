import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoctorImg from '../assets/DoctorLoginSignup.jpg';
import { useAuth } from '../context/AuthContext';

const DoctorSignup: React.FC = () => {
    const navigate = useNavigate();
    const { signup, loading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialization: '',
        phone: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await signup(
                formData.name,
                formData.email,
                formData.specialization,
                formData.phone,
                formData.password
            );
            setSuccessMessage('Signup successful! Please Login using your credentials.');
            setFormData({ name: '', email: '', specialization: '', phone: '', password: '' });
            navigate('/');
        } catch (error) {
            setErrorMessage('Signup failed. Please try again.');
            console.error('Signup failed', error);
        }
    };

    return (
        <div className="flex h-screen bg-[#84D3E9]">
            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-semibold text-center mb-4">Get Started</h2>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={`Dr. ${formData.name}`}
                                onChange={(e) => {
                                    const nameWithoutPrefix = e.target.value.replace(/^Dr\. /i, '');
                                    setFormData({ ...formData, name: nameWithoutPrefix });
                                }}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your name"
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
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="" disabled>Select your specialization</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Endocrinology">Endocrinology</option>
                                <option value="Gastroenterology">Gastroenterology</option>
                                <option value="General Practice">General Practice</option>
                                <option value="Gynecology">Gynecology</option>
                                <option value="Infectious Disease">Infectious Disease</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Ophthalmology">Ophthalmology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Otolaryngology (ENT)">Otolaryngology (ENT)</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Psychiatry">Psychiatry</option>
                                <option value="Rheumatology">Rheumatology</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your phone number"
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
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Signup'}
                        </button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-light-blue-300">
                <img src={DoctorImg} alt="Signup Illustration" className="max-w-full h-auto" />
            </div>
        </div>
    );
};

export default DoctorSignup;
