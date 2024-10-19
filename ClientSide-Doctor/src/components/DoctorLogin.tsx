import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorImg from '../assets/DoctorLoginSignup.jpg';
import { useAuth } from '../context/AuthContext'; // Import the custom hook

const DoctorLogin: React.FC = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth(); // Destructure login function and loading state from context
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
            navigate('/doctordashboard'); // Redirect to doctor dashboard after login
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials and try again.');
            console.error('Login failed', error);
        }
    };

    const handleSignupRedirect = () => {
        navigate('/doctorsignup'); // Redirect to the signup page
    };

    return (
        <div className="flex h-screen bg-[#84D3E9]">
            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-semibold text-center mb-4">Welcome!</h2>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
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
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-300"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <button
                                onClick={handleSignupRedirect}
                                className="text-blue-600 hover:underline focus:outline-none"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-light-blue-300">
                <img src={DoctorImg} alt="Login Illustration" className="max-w-full h-auto" />
            </div>
        </div>
    );
};

export default DoctorLogin;
