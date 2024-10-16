import React from 'react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

// Define TypeScript interfaces for prescription data and medicine details
interface Medicine {
    name: string;
    dosage: string;
    quantity: number;
    instructions: string;
}

interface PrescriptionData {
    patientName: string;
    age: number;
    address: string;
    contactNo: string;
    prescriptionNo: string;
    date: string;
    medicines: Medicine[];
}

interface PrescriptionViewProps {
    prescriptionData: PrescriptionData;
}

const PrescriptionView: React.FC<PrescriptionViewProps> = ({ prescriptionData }) => {
    const navigate = useNavigate();

    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        doc.text('Prescription Details', 10, 10);
        doc.text(`Patient Name: ${prescriptionData.patientName}`, 10, 20);
        doc.text(`Age: ${prescriptionData.age}`, 10, 30);
        doc.text(`Address: ${prescriptionData.address}`, 10, 40);
        doc.text(`Contact No: ${prescriptionData.contactNo}`, 10, 50);
        doc.text(`Prescription No: ${prescriptionData.prescriptionNo}`, 10, 60);
        doc.text(`Date: ${prescriptionData.date}`, 10, 70);
        doc.text('Medicine Details:', 10, 80);

        prescriptionData.medicines.forEach((medicine, index) => {
            doc.text(
                `${medicine.name}, ${medicine.dosage}; ${medicine.quantity}; ${medicine.instructions}`,
                10,
                90 + index * 10
            );
        });

        doc.save('prescription.pdf');
    };

    const handleExitPdf = () => {
        navigate('/allprescriptions');
    }

    return (
        <div className="bg-[#84D3E9] min-h-screen flex flex-col items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-md">
                <h2 className="text-center font-bold text-2xl mb-4">Patient's Prescription</h2>

                <div className="patient-details mb-4">
                    <h3 className="font-bold">Patient Details</h3>
                    <p>{prescriptionData.patientName}</p>
                    <p>Age: {prescriptionData.age}</p>
                    <p>Address: {prescriptionData.address}</p>
                    <p>Contact No: {prescriptionData.contactNo}</p>
                    <p>Prescription no: {prescriptionData.prescriptionNo}</p>
                    <p>Date: {prescriptionData.date}</p>
                </div>

                <hr className="my-4" />

                <div className="medicine-details mb-4">
                    <h3 className="font-bold">Medicine Details</h3>
                    {prescriptionData.medicines.map((medicine, index) => (
                        <p key={index}>
                            {medicine.name}, {medicine.dosage}; {medicine.quantity}; {medicine.instructions}
                        </p>
                    ))}
                </div>
                <div className='flex justify-center items-center gap-32 mb-8'>
                    <button
                        onClick={handleExitPdf}
                        className="download-button bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleDownloadPdf}
                        className="download-button bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionView;
