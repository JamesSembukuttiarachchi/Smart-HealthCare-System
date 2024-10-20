import request from 'supertest';
import app from '../app'; // Adjust to your app entry point
import * as paymentService from '../services/paymentService';

// Mock the paymentService module
jest.mock('../services/paymentService');

describe('Payment Controller', () => {
  describe('getAllPayments', () => {
    it('should fetch all payments successfully', async () => {
      const mockPayments = [{ id: '1', amount: 100 }];
      (paymentService.getAllPayments as jest.Mock).mockResolvedValue(mockPayments);

      const response = await request(app).get('/api/payments');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPayments);
    });

    it('should return 500 if the fetched payments are not an array', async () => {
      (paymentService.getAllPayments as jest.Mock).mockResolvedValue({});

      const response = await request(app).get('/api/payments');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Expected an array of payments" });
    });

    it('should return 500 on error fetching payments', async () => {
      const errorMessage = 'Error fetching payments';
      (paymentService.getAllPayments as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/api/payments');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('createPayment', () => {
    it('should create a new payment successfully', async () => {
      const mockPaymentData = { appointmentId: '1', amount: 100 };
      (paymentService.createPaymentForAppointment as jest.Mock).mockResolvedValue(mockPaymentData);

      const response = await request(app)
        .post('/api/payments')
        .send(mockPaymentData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockPaymentData);
    });

    it('should return 500 on error creating payment', async () => {
      const errorMessage = 'Error creating payment';
      (paymentService.createPaymentForAppointment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/api/payments')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('updatePayment', () => {
    it('should update a payment successfully', async () => {
      const mockPaymentData = { id: '1', amount: 150 };
      (paymentService.updatePayment as jest.Mock).mockResolvedValue(mockPaymentData);

      const response = await request(app)
        .put('/api/payments/1')
        .send(mockPaymentData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPaymentData);
    });

    it('should return 500 on error updating payment', async () => {
      const errorMessage = 'Error updating payment';
      (paymentService.updatePayment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .put('/api/payments/1')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('deletePayment', () => {
    it('should delete a payment successfully', async () => {
      const mockDeletedPayment = { id: '1', amount: 100 };
      (paymentService.deletePayment as jest.Mock).mockResolvedValue(mockDeletedPayment);

      const response = await request(app).delete('/api/payments/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDeletedPayment);
    });

    it('should return 500 on error deleting payment', async () => {
      const errorMessage = 'Error deleting payment';
      (paymentService.deletePayment as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/api/payments/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });
});
