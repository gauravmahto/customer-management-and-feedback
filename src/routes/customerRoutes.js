import express from 'express';
import Customer from '../models/customer.js';
import Feedback from '../models/feedback.js';

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.render('customers/index', { customers, error: null });
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.render('customers/index', { customers: [], error: 'Internal Server Error' });
  }
});

// Create new customer
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, feedback } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).render('customers/index', { customers: [], error: 'Bad Request' });
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

    res.redirect('/customers');
  } catch (err) {
    console.error('Error creating customer:', err);
    res.render('customers/index', { customers: [], error: 'Internal Server Error' });
  }
});

export default router;

/**
 * @class CustomerRoutes
 * @description Routes for managing customers
 * @version 1.0.0
 * @since 2024-12-12
 * @author gauravmahto
 */
