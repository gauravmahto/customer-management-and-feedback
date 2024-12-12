import mongoose from 'mongoose';

// Define the Customer schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: false
  }
}, { timestamps: true });

// Export the Customer model
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;

/**
 * @class Customer
 * @description Customer model for managing customer data and feedback
 * @version 1.0.0
 * @since 2024-12-12
 * @author gauravmahto
 */
