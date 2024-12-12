import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/app.js';
import Customer from '../src/models/customer.js';
import Feedback from '../src/models/feedback.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Customer Routes', () => {
  // Before all tests, clear the Customer and Feedback collections
  before(async () => {
    await Customer.deleteMany({});
    await Feedback.deleteMany({});
  });

  describe('GET /customers', () => {
    // Test case for getting all customers
    it('should get all customers', (done) => {
      chai.request(app)
        .get('/customers')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('Customer Management');
          done();
        });
    });
  });

  describe('POST /customers', () => {
    // Test case for creating a new customer
    it('should create a new customer', (done) => {
      const customer = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        feedback: 'Great service!'
      };

      chai.request(app)
        .post('/customers')
        .send(customer)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.redirect;
          done();
        });
    });

    // Test case for handling missing required fields
    it('should return an error if required fields are missing', (done) => {
      const customer = {
        name: 'Jane Doe'
      };

      chai.request(app)
        .post('/customers')
        .send(customer)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.include('Bad Request');
          done();
        });
    });
  });
});
