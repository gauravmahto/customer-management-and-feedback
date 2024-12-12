import express from 'express';
import Feedback from '../models/feedback.js';

const router = express.Router();

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create new feedback
router.post('/', async (req, res) => {
  try {
    const { customerId, feedback } = req.body;
    if (!customerId || !feedback) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const newFeedback = new Feedback({ customerId, feedback });
    await newFeedback.save();
    res.status(201).json({ feedback: newFeedback });
  } catch (err) {
    console.error('Error creating feedback:', err);
    res.status(500).json({ error: 'Internal Server Error' });
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
