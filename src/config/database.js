import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (typeof process.env.MONGODB_URI === 'undefined') {
      throw new Error('MONGODB_URI is not defined in the environment');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

/**
 * Database configuration
 * @version 1.0.0
 * @since 2024-12-12
 * @author gauravmahto
 */
