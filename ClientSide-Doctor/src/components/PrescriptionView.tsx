import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface PatientId {
    name: string;
    gender: string;
    contactNumber: string;
}

interface HospitalId {
    name: string;
    location: string;
}

interface AppointmentId {
    patientId: PatientId;
    hospitalId: HospitalId;
}

interface PrescriptionData {
    appointmentId: AppointmentId;
    medicationDetails: string;
    issueDate: string;
    notes: string;
}

const PrescriptionView: React.FC = () => {
    const navigate = useNavigate();
    const { prescriptionId } = useParams<{ prescriptionId: string }>();
    const [prescriptionData, setPrescriptionData] = useState<PrescriptionData | null>(null);

    useEffect(() => {
        const fetchPrescription = async () => {
            try {
                const response = await axios.get<PrescriptionData>(`http://localhost:3000/api/prescription/${prescriptionId}`);
                setPrescriptionData(response.data);
            } catch (error) {
                console.error('Error fetching prescription:', error);
            }
        };

        fetchPrescription();
    }, [prescriptionId]);

    const handleDownloadPdf = () => {
        if (prescriptionData) {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text(`${prescriptionData?.appointmentId?.patientId?.name}'s Prescription`, 14, 15);

            doc.setFontSize(12);
            doc.text('Patient Details', 14, 25);
            doc.autoTable({
                startY: 28,
                body: [
                    ['Patient Name', prescriptionData?.appointmentId?.patientId?.name],
                    ['Date', new Date(prescriptionData.issueDate).toISOString().split('T')[0]],
                    ['Gender', prescriptionData?.appointmentId?.patientId?.gender],
                    ['Contact No', prescriptionData?.appointmentId?.patientId?.contactNumber],
                ],
                theme: 'grid',
                styles: { cellPadding: 3, fontSize: 10 },
                headStyles: { fillColor: [211, 211, 211] },
            });

            doc.text('Medication Details', 14, doc.lastAutoTable.finalY + 10);
            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 12,
                body: [
                    ['Medication Details', prescriptionData.medicationDetails],
                    ['Notes', prescriptionData.notes],
                ],
                theme: 'grid',
                styles: { cellPadding: 3, fontSize: 10 },
                headStyles: { fillColor: [211, 211, 211] },
            });

            doc.text('Hospital Details', 14, doc.lastAutoTable.finalY + 10);
            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 12,
                body: [
                    ['Hospital Name', prescriptionData?.appointmentId?.hospitalId?.name],
                    ['Location', prescriptionData?.appointmentId?.hospitalId?.location],
                ],
                theme: 'grid',
                styles: { cellPadding: 3, fontSize: 10 },
                headStyles: { fillColor: [211, 211, 211] },
            });

            doc.save(`${prescriptionData?.appointmentId?.patientId?.name}_Prescription.pdf`);
        }
    };

    const handleExitPdf = () => {
        navigate('/allprescriptions');
    };

    return (
        <div className="bg-[#84D3E9] min-h-screen flex flex-col items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-md">
                <h2 className="text-center font-bold text-2xl mb-4">{prescriptionData?.appointmentId?.patientId?.name}'s Prescription</h2>
                {prescriptionData && (
                    <>
                        <div className="mb-4">
                            <h3 className="font-bold mb-2">Patient Details</h3>
                            <table className="w-full text-left border border-gray-300">
                                <tbody className="text-left">
                                    <tr className="border-b border-gray-300">
                                        <td className="font-semibold py-1 px-4 border-r border-gray-300 w-1/2">Patient Name:</td>
                                        <td className="py-1 px-4 w-1/2">{prescriptionData?.appointmentId?.patientId?.name}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-semibold py-1 px-4 border-r border-gray-300 w-1/2">Date:</td>
                                        <td className="py-1 px-4 w-1/2">{new Date(prescriptionData.issueDate).toISOString().split('T')[0]}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-semibold py-1 px-4 border-r border-gray-300 w-1/2">Gender:</td>
                                        <td className="py-1 px-4 w-1/2">{prescriptionData?.appointmentId?.patientId?.gender}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1 px-4 border-r border-gray-300 w-1/2">Contact No:</td>
                                        <td className="py-1 px-4 w-1/2">{prescriptionData?.appointmentId?.patientId?.contactNumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr className="my-2" />
                            <h3 className="font-bold mb-2">Medication Details</h3>
                            <table className="w-full text-left border border-gray-300">
                                <tbody className="text-left">
                                    <tr className="border-b border-gray-300">
                                        <td className="font-semibold py-1 px-4 border-r border-gray-300 w-1/2">Medication Details:</td>
                                        <td className="py-1 px-4 w-1/2">{prescriptionData.medicationDetails}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1 px-4 border-r border-gray-300 w-1/2">Notes:</td>
                                        <td className="py-1 px-4 w-1/2">{prescriptionData.notes}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr className="my-2" />
                            <h3 className="font-bold mb-2">Hospital Details</h3>
                            <table className="w-full text-left border border-gray-300">
                                <tbody className="text-left">
                                    <tr className="border-b border-gray-300">
                                        <td className="font-semibold py-1 px-4 border-r border-gray-300 w-1/2">Hospital Name:</td>
                                        <td className="py-1 px-4 w-1/2">{prescriptionData?.appointmentId?.hospitalId?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1 px-4 border-r border-gray-300 w-1/2">Location:</td>
                                        <td className="py-1 px-4 w-1/2">{prescriptionData?.appointmentId?.hospitalId?.location}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                <div className="flex justify-center items-center gap-32 mb-8">
                    <button onClick={handleExitPdf} className="download-button bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Back</button>
                    <button onClick={handleDownloadPdf} className="download-button bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Download PDF</button>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionView;
