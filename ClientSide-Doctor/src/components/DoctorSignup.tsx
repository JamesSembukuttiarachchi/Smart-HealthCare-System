import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorImg from '../assets/DoctorLoginSignup.jpg';
import { useAuth } from '../context/AuthContext'; // Import the custom hook

const DoctorSignup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth(); // Destructure signup function and loading state from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    phone: '',
    password: '',
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
        formData.email,
        formData.specialization,
        formData.phone,
        formData.password
      );
      setSuccessMessage('Signup successful! Welcome aboard.');
      setFormData({ name: '', email: '', specialization: '', phone: '', password: '' });
      navigate('/doctordashboard'); // Redirect to doctor dashboard after signup
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
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your specialization"
              />
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
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Signing up...' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-light-blue-300">
        <img src={DoctorImg} alt="Signup Illustration" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default DoctorSignup;
