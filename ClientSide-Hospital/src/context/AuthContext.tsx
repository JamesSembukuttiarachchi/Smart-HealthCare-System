import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
  } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  // Define the AuthContext with a more specific type
  interface AuthContextType {
    token: string | null;
    user: any | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (
      name: string,
      location: string,
      email: string,
      contactNumber: string,
      password: string
    ) => Promise<void>;
    logout: () => void;
    loading: boolean;
  }
  
  // Create the AuthContext
  const AuthContext = createContext<AuthContextType | null>(null);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null); // To store user details
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    // Check if token is stored in localStorage (for auto-login)
    useEffect(() => {
      const checkToken = () => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      };
      checkToken();
    }, []);
  
    // Login function using Axios
    const login = async (email: string, password: string) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/hospitals/login",
          {
            email,
            password,
          }
        );
  
        const token = response.data.token;
        const hospital = response.data.hospital;
  
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(hospital));
          setToken(token);
          setUser(hospital);
          navigate("/hospitalhome"); // Redirect to the home page
        }
      } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed");
      }
    };
  
    // Signup function using Axios
    const signup = async (
        name: string,
        location: string,
        email: string,
        contactNumber: string,
        password: string
    ) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/hospitals/signup",
          {
            name,
            location,
            email,
            contactNumber,
            password
          }
        );
  
        const token = response.data.token;
        const hospital = response.data.hospital;
  
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(hospital));
          setToken(token);
          setUser(hospital);
          navigate("/hospitalhome"); // Redirect to the home page
        }
      } catch (error) {
        console.error("Signup error:", error);
        throw new Error("Signup failed");
      }
    };
  
    // Logout function
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      navigate("/login"); // Redirect to login after logging out
    };
  
    return (
      <AuthContext.Provider
        value={{ token, user, login, signup, logout, loading }}
      >
        {!loading && children}
      </AuthContext.Provider>
    );
  };
  
  // Custom hook to use the AuthContext
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };