import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useRouter } from "expo-router";

// Define the AuthContext
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // To store user details
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if token is stored in SecureStore (for auto-login)
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      const storedUser = await SecureStore.getItemAsync('user'); // For auto login
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
        "http:///192.168.1.2:3000/api/patients/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token; // Assuming your backend responds with { token: "JWT_token_here" }
      const patient = response.data.patient;

      if (token) {
        await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync("user", JSON.stringify(patient)); // Store user details
        setToken(token);
        setUser(patient);
        router.replace("../(tabs)/home/homeScreen"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  // Signup function using Axios
  const signup = async (
    name: string,
    gender: string,
    contactNumber: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        "http://192.168.1.2:3000/api/patients/signup",
        {
          name,
          gender,
          contactNumber,
          email,
          password,
        }
      );

      const token = response.data.token; // Assuming your backend responds with { token: "JWT_token_here" }
      const patient = response.data.newPatient;
      if (token) {
        await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync('user', JSON.stringify(patient));
        setToken(token);
        setUser(patient);
        router.replace("../(tabs)/home/homeScreen"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Signup failed");
    }
  };

  // Logout function
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user"); // Remove user details
    setToken(null);
    setUser(null);
    router.replace("../auth/login"); // Redirect to login after logging out
  };

  const updateProfile = async (updatedData: any) => {
    try {
      // Check if user exists and has pid
      if (!user || !user.pid) {
        throw new Error("User not logged in or user ID missing.");
      }

      const response = await axios.put(
        `http://192.168.1.2:3000/api/patients/${user.pid}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.patient;

      // Update the user in the context and SecureStore
      setUser(updatedUser);
      await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));

    } catch (error) {
      console.error("Update profile error:", error);
      throw new Error("Profile update failed");
    }
  };


  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, updateProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
