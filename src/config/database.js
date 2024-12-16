import mongoose from 'mongoose';

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    const dbURI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
    if (!dbURI) {
      throw new Error('Database URI is not defined in the environment');
    }

    const conn = await mongoose.connect(dbURI, {
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
 * @since 2024-12-12
 * @author gauravmahto
 */
