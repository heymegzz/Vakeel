import mongoose from 'mongoose';
import logger from '../shared/utils/logger';

/**
 * Connect to MongoDB with retry logic
 * Retries up to 5 times with a 5-second delay between attempts
 */
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    logger.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri);
      logger.info('✅ MongoDB connected successfully');

      // Handle connection events
      mongoose.connection.on('error', (err) => {
        logger.error({ err }, 'MongoDB connection error');
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
      });

      return;
    } catch (error) {
      logger.error(
        { attempt, maxRetries: MAX_RETRIES, error },
        `MongoDB connection attempt ${attempt}/${MAX_RETRIES} failed`
      );

      if (attempt === MAX_RETRIES) {
        logger.error('All MongoDB connection attempts exhausted. Exiting.');
        process.exit(1);
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};
