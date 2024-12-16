import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../src/app.js';
import Feedback from '../src/models/feedback.js';

const { expect } = chai;
chai.use(chaiHttp);

// Describe the Feedback Routes test suite
describe('Feedback Routes', () => {
  // Before running tests, clear the Feedback collection
  before(async () => {
    await Feedback.deleteMany({});
  });

  // Test the GET /feedback route
  describe('GET /feedback', () => {
    it('should get all feedback', (done) => {
      chai.request(app)
        .get('/feedback')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  // Test the POST /feedback route
  describe('POST /feedback', () => {
    it('should create new feedback', (done) => {
      const feedback = {
        customerId: '60d5ec49f1d2b341d8f9e8b7',
        feedback: 'Excellent service!'
      };

      chai.request(app)
        .post('/feedback')
        .send(feedback)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('feedback');
          done();
        });
    });

    it('should return an error if required fields are missing', (done) => {
      const feedback = {
        feedback: 'Good service!'
      };

      chai.request(app)
        .post('/feedback')
        .send(feedback)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});

/**
 * @since 2024-12-12
 * @author gauravmahto
 */
