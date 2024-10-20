import React, { useState } from "react";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";
import Navbars from "../components/Navbars";

const QRCodeScanner: React.FC = () => {
  const [scannedValue, setScannedValue] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle QR code scanning
  const handleScan = (result: any) => {
    if (result && result[0]?.rawValue) {
      const scannedId = result[0].rawValue.split(": ")[1]; // Assuming rawValue is in format "PatientID: <id>"
      setScannedValue(scannedId);
      setIsScanning(false); // Stop scanning after getting a result
      fetchPatientInfo(scannedId);
    }
  };

  // Function to fetch patient information using axios
  const fetchPatientInfo = async (patientId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/patients/${patientId}`);
      setPatientInfo(response.data);
    } catch (error) {
      console.error("Error fetching patient information:", error);
      alert("Failed to fetch patient information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <Navbars />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>

        {isScanning ? (
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mb-4">
            <Scanner onScan={handleScan} />
          </div>
        ) : (
          <button
            onClick={() => setIsScanning(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Open Camera
          </button>
        )}

        {scannedValue && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700">Scanned Patient ID:</p>
            <p className="font-semibold text-lg">{scannedValue}</p>
          </div>
        )}

        {loading && <p>Loading patient information...</p>}

        {patientInfo && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Patient Information</h2>
            <p><strong>Name:</strong> {patientInfo.name}</p>
            <p><strong>Age:</strong> {patientInfo.email}</p>
            <p><strong>Gender:</strong> {patientInfo.gender}</p>
            <p><strong>Address:</strong> </p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeScanner;
