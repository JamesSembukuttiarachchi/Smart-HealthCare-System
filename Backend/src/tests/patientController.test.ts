import request from 'supertest';
import app from '../app'; // Adjust to your app entry point
import * as patientService from '../services/patientService';

// Mock the patientService module
jest.mock('../services/patientService');

describe('Patient Controller', () => {
  describe('signupPatient', () => {
    it('should signup a patient successfully', async () => {
      const mockPatientData = { email: 'test@example.com', password: 'password123' };
      (patientService.signupPatient as jest.Mock).mockResolvedValue(mockPatientData);

      const response = await request(app)
        .post('/api/patients/signup')
        .send(mockPatientData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockPatientData);
    });

    it('should return 400 on signup failure', async () => {
      const errorMessage = 'Signup failed';
      (patientService.signupPatient as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/api/patients/signup')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('loginPatient', () => {
    it('should login a patient successfully', async () => {
      const mockResponse = { token: 'test_token' };
      (patientService.loginPatient as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .post('/api/patients/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it('should return 400 on login failure', async () => {
      const errorMessage = 'Login failed';
      (patientService.loginPatient as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/api/patients/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('getAllPatients', () => {
    it('should fetch all patients successfully', async () => {
      const mockPatients = [{ id: '1', email: 'test@example.com' }];
      (patientService.getAllPatients as jest.Mock).mockResolvedValue(mockPatients);

      const response = await request(app).get('/api/patients');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPatients);
    });

    it('should return 500 on error fetching patients', async () => {
      const errorMessage = 'Error fetching patients';
      (patientService.getAllPatients as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/api/patients');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  // Additional tests for other methods can be added here
});
