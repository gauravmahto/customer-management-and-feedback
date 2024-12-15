import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import customerRoutes from './routes/customerRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import { connectDB } from './config/database.js';
import Customer from './models/customer.js';
import Feedback from './models/feedback.js';
import { analyzeSentiment, getFeedbackTrends } from './utils/feedbackAnalysis.js';
import { fileURLToPath } from 'url';

dotenv.config();

export const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
connectDB();

// Middleware to set cache control headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// Define routes
app.use('/customers', customerRoutes);
app.use('/feedback', feedbackRoutes);

// Define the root route
app.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    const feedbacks = await Feedback.find();
    const sentimentAnalysis = analyzeSentiment(feedbacks);
    const feedbackTrends = getFeedbackTrends(feedbacks);
    res.render('index', { customers, error: null, sentimentAnalysis, feedbackTrends });
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.render('index', { customers: [], error: 'Internal Server Error', sentimentAnalysis: {}, feedbackTrends: {} });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * @class App
 * @description Express application for customer management and feedback
 * @version 1.0.0
 * @since 2024-12-12
 */
