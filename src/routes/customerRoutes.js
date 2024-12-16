import express from 'express';

import Customer from '../models/customer.js';
import Feedback from '../models/feedback.js';
import { analyzeSentiment, getFeedbackTrends } from '../utils/feedbackAnalysis.js';

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    const feedbacks = await Feedback.find();
    const sentimentAnalysis = analyzeSentiment(feedbacks);
    const feedbackTrends = getFeedbackTrends(feedbacks);
    res.render('customers/index', { customers, error: null, success: null, sentimentAnalysis, feedbackTrends });
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.render('customers/index', { customers: [], error: 'Internal Server Error', success: null, sentimentAnalysis: {}, feedbackTrends: {} });
  }
});

// Create new customer
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, feedback } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).render('customers/index', { customers: [], error: 'Bad Request', success: null });
    }

    const customer = new Customer({ name, email, phone });
    await customer.save();

    if (feedback) {
      const customerFeedback = new Feedback({
        customerId: customer._id,
        feedback
      });
      await customerFeedback.save();
    }

    const customers = await Customer.find();
    res.render('customers/index', { customers, error: null, success: 'Customer and feedback added successfully!' });
  } catch (err) {
    console.error('Error creating customer:', err);
    res.render('customers/index', { customers: [], error: 'Internal Server Error', success: null });
  }
});

export default router;

/**
 * @description Routes for managing customers
 * @since 2024-12-12
 * @author gauravmahto
 */
