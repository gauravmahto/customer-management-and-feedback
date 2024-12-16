import express from 'express';

import Feedback from '../models/feedback.js';
import { analyzeSentiment, getFeedbackTrends } from '../utils/feedbackAnalysis.js';

const router = express.Router();

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('customerId', 'name');
    const sentimentAnalysis = analyzeSentiment(feedbacks);
    const feedbackTrends = getFeedbackTrends(feedbacks);
    res.render('feedback/index', { feedbacks, sentimentAnalysis, feedbackTrends });
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
 * @description Routes for managing customer feedback
 * @since 2024-12-12
 * @author gauravmahto
 */
