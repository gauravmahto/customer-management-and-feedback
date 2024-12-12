import express from 'express';
import Feedback from '../models/feedback.js';

const router = express.Router();

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('customerId');
    res.render('feedback/index', { feedbacks });
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Create new feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.redirect('/feedback');
  } catch (err) {
    console.error('Error creating feedback:', err);
    res.status(500).send('Internal Server Error');
  }
});

export default router;

/**
 * @class FeedbackRoutes
 * @description Routes for managing customer feedback
 * @version 1.0.0
 * @since 2024-12-12
 * @author gauravmahto
 */
