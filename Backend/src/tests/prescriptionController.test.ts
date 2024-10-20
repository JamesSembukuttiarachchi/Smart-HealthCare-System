import request from 'supertest';
import app from '../app'; // Adjust to your app entry point
import * as prescriptionService from '../services/prescriptionService';

// Mock the prescriptionService module
jest.mock('../services/prescriptionService');

describe('Prescription Controller', () => {
  describe('getAllPrescriptions', () => {
    it('should fetch all prescriptions successfully', async () => {
      const mockPrescriptions = [{ id: '1', medicationDetails: 'Medication A' }];
      (prescriptionService.getAllPrescriptions as jest.Mock).mockResolvedValue(mockPrescriptions);

      const response = await request(app).get('/api/prescriptions');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPrescriptions);
    });

    it('should return 500 on error fetching prescriptions', async () => {
      const errorMessage = 'Error fetching prescriptions';
      (prescriptionService.getAllPrescriptions as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/api/prescriptions');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('getPrescriptionById', () => {
    it('should fetch a prescription by ID successfully', async () => {
      const mockPrescription = { id: '1', medication: 'Medication A' };
      (prescriptionService.getPrescriptionById as jest.Mock).mockResolvedValue(mockPrescription);

      const response = await request(app).get('/api/prescriptions/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPrescription);
    });

    it('should return 404 if prescription not found', async () => {
      const errorMessage = 'Prescription not found';
      (prescriptionService.getPrescriptionById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/api/prescriptions/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: errorMessage });
    });

    it('should return 500 on error fetching prescription by ID', async () => {
      const errorMessage = 'Error fetching prescription by ID';
      (prescriptionService.getPrescriptionById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/api/prescriptions/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('createPrescription', () => {
    it('should create a new prescription successfully', async () => {
      const mockPrescriptionData = { medication: 'Medication A', dosage: '100mg' };
      (prescriptionService.createPrescription as jest.Mock).mockResolvedValue(mockPrescriptionData);

      const response = await request(app)
        .post('/api/prescriptions')
        .send(mockPrescriptionData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockPrescriptionData);
    });

    it('should return 500 on error creating prescription', async () => {
      const errorMessage = 'Error creating prescription';
      (prescriptionService.createPrescription as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/api/prescriptions')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('updatePrescription', () => {
    it('should update a prescription successfully', async () => {
      const mockPrescriptionData = { id: '1', medication: 'Medication B' };
      (prescriptionService.updatePrescription as jest.Mock).mockResolvedValue(mockPrescriptionData);

      const response = await request(app)
        .put('/api/prescriptions/1')
        .send(mockPrescriptionData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPrescriptionData);
    });

    it('should return 500 on error updating prescription', async () => {
      const errorMessage = 'Error updating prescription';
      (prescriptionService.updatePrescription as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .put('/api/prescriptions/1')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('deletePrescription', () => {
    it('should delete a prescription successfully', async () => {
      const mockDeletedPrescription = { id: '1', medication: 'Medication A' };
      (prescriptionService.deletePrescription as jest.Mock).mockResolvedValue(mockDeletedPrescription);

      const response = await request(app).delete('/api/prescriptions/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDeletedPrescription);
    });

    it('should return 500 on error deleting prescription', async () => {
      const errorMessage = 'Error deleting prescription';
      (prescriptionService.deletePrescription as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/api/prescriptions/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });
});
