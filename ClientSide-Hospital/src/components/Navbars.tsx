import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { CiLogout } from 'react-icons/ci';

const Navbars = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Assuming your AuthContext has a logout method
        logout();
        navigate("/hospitalLogin"); // Redirect to login page after logout
      };
  return (
    <nav className="p-4 bg-blue-600 flex items-center justify-between mb-2">
        <ul className="flex justify-center space-x-16 font-semibold text-white">
        <li>
            <a href="/hospitalhome" className="hover:text-gray-200">
              Dashboard
            </a>
          </li>
          <li>
            <Link to="/appointmentpage" className="hover:text-gray-200">
              Appointments
            </Link>{" "}
            {/* Link added */}
          </li>
          <li>
            <a href="#doctors" className="hover:text-gray-200">
              Doctors
            </a>
          </li>
          <li>
            <a href="/payment-list" className="hover:text-gray-200">
              Payments
            </a>
          </li>
          <li>
            <a href="/scan" className="hover:text-gray-200">
              Scan
            </a>
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
  )
}

export default Navbars;