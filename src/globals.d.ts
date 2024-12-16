// Declare global types for NodeJS process environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      MONGODB_URI: string;
      TEST_MONGODB_URI: string;
      // Add other environment variables here
    }
  }
}

export { };

/**
 * @class FeedbackRoutes
 * @description Routes for managing customer feedback
 * @since 2024-12-12
 * @author gauravmahto
 */
