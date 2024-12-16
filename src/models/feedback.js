import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  feedback: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Export the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;

/**
 * @class Feedback
 * @description Feedback model for managing customer feedback
 * @since 2024-12-12
 * @author gauravmahto
 */
