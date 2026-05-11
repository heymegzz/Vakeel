import Redis from 'ioredis';
import logger from '../shared/utils/logger';

/**
 * Redis client instance
 * Connects to the Redis URL from environment variables
 */
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times: number): number | null {
    if (times > 5) {
      logger.error('Redis: max retries reached. Giving up.');
      return null; // Stop retrying
    }
    const delay = Math.min(times * 1000, 5000);
    logger.warn(`Redis: retrying connection in ${delay}ms (attempt ${times})`);
    return delay;
  },
  lazyConnect: true, // Don't connect immediately — we'll call connect() manually
});

redis.on('connect', () => {
  logger.info('✅ Redis connected successfully');
});

redis.on('error', (err) => {
  logger.error({ err }, 'Redis connection error');
});

redis.on('close', () => {
  logger.warn('Redis connection closed');
});

export default redis;
