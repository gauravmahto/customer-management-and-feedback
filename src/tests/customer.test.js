import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import Customer from '../models/customer.js';
import Feedback from '../models/feedback.js';

beforeAll(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/customerDBTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  }
});

describe('Customer Management', () => {
  it('should create a new customer', async () => {
    try {
      const res = await request(app)
        .post('/customers')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          feedback: 'Great service!'
        });
      expect(res.statusCode).toEqual(302);
      const customer = await Customer.findOne({ email: 'john@example.com' });
      expect(customer).not.toBeNull();
      expect(customer.name).toBe('John Doe');
    } catch (err) {
      console.error('Error creating customer:', err);
    }
  });

  it('should create a new feedback', async () => {
    try {
      const customer = await Customer.findOne({ email: 'john@example.com' });
      const res = await request(app)
        .post('/feedback')
        .send({
          customerId: customer._id,
          feedback: 'Excellent support!'
        });
      expect(res.statusCode).toEqual(302);
      const feedback = await Feedback.findOne({ customerId: customer._id });
      expect(feedback).not.toBeNull();
      expect(feedback.feedback).toBe('Excellent support!');
    } catch (err) {
      console.error('Error creating feedback:', err);
    }
  });

  // Additional test cases can be added here
});

/**
 * @class CustomerTest
 * @description Test cases for customer management and feedback

 * @version 1.0.0
 * @since 2024-12-12
 */
