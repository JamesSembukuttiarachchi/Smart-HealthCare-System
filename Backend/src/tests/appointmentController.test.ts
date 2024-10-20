import request from 'supertest';
import app from '../app'; // Adjust to your app entry point
import * as appointmentService from '../services/appointmentService';

// Mock the appointmentService module
jest.mock('../services/appointmentService');

describe('Appointment Controller', () => {
  describe('getAllAppointments', () => {
    it('should fetch all appointments successfully', async () => {
      const mockAppointments = [{ id: '1', title: 'Test Appointment' }];
      (appointmentService.getAllAppointments as jest.Mock).mockResolvedValue(mockAppointments);

      const response = await request(app).get('/api/appointments');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointments);
    });

    it('should return 500 on error fetching appointments', async () => {
      const errorMessage = 'Error fetching appointments';
      (appointmentService.getAllAppointments as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/api/appointments');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('getAppointmentById', () => {
    it('should fetch an appointment by ID successfully', async () => {
      const mockAppointment = { id: '1', title: 'Test Appointment' };
      (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(mockAppointment);

      const response = await request(app).get('/api/appointments/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointment);
    });

    it('should return 404 if the appointment is not found', async () => {
      const errorMessage = 'Appointment not found';
      (appointmentService.getAppointmentById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/api/appointments/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('getAppointmentsByDoctor', () => {
    it('should fetch all appointments for a specific doctor', async () => {
      const mockDoctorAppointments = [{ id: '1', title: 'Test Appointment for Doctor' }];
      (appointmentService.getAppointmentsByDoctor as jest.Mock).mockResolvedValue(mockDoctorAppointments);

      const response = await request(app).get('/api/appointments/doctor/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDoctorAppointments);
    });

    it('should return 500 on error fetching appointments for a doctor', async () => {
      const errorMessage = 'Error fetching appointments for doctor';
      (appointmentService.getAppointmentsByDoctor as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/api/appointments/doctor/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('createAppointment', () => {
    it('should create a new appointment successfully', async () => {
      const mockAppointmentData = { title: 'New Appointment' };
      (appointmentService.createAppointment as jest.Mock).mockResolvedValue(mockAppointmentData);

      const response = await request(app)
        .post('/api/appointments')
        .send(mockAppointmentData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockAppointmentData);
    });

    it('should return 500 on error creating appointment', async () => {
      const errorMessage = 'Error creating appointment';
      (appointmentService.createAppointment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/api/appointments')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('updateAppointment', () => {
    it('should update an appointment successfully', async () => {
      const mockAppointmentData = { id: '1', title: 'Updated Appointment' };
      (appointmentService.updateAppointment as jest.Mock).mockResolvedValue(mockAppointmentData);

      const response = await request(app)
        .put('/api/appointments/1')
        .send(mockAppointmentData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointmentData);
    });

    it('should return 500 on error updating appointment', async () => {
      const errorMessage = 'Error updating appointment';
      (appointmentService.updateAppointment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .put('/api/appointments/1')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('deleteAppointment', () => {
    it('should delete an appointment successfully', async () => {
      const mockDeletedAppointment = { id: '1', title: 'Deleted Appointment' };
      (appointmentService.deleteAppointment as jest.Mock).mockResolvedValue(mockDeletedAppointment);

      const response = await request(app).delete('/api/appointments/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDeletedAppointment);
    });

    it('should return 500 on error deleting appointment', async () => {
      const errorMessage = 'Error deleting appointment';
      (appointmentService.deleteAppointment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/api/appointments/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });
});
