import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import { connectDB } from './config/db';
import redis from './config/redis';
import { errorHandler } from './middleware/error.middleware';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/user/user.routes';
import { transactionRoutes } from './modules/transactions/transaction.routes';
import { uploadRoutes } from './modules/upload/upload.routes';
import logger from './shared/utils/logger';

/**
 * Build and configure the Fastify application
 */
const buildApp = async () => {
  const app = Fastify({
    logger: false, // We use our own Pino logger
  });

  // ─── Security & CORS ────────────────────────────────────────────────
  await app.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  await app.register(helmet, {
    contentSecurityPolicy: false, // Disable in dev
  });

  // ─── File Uploads ───────────────────────────────────────────────────
  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB max
    },
  });

  // ─── Global Error Handler ───────────────────────────────────────────
  app.setErrorHandler(errorHandler);

  // ─── Health Check ───────────────────────────────────────────────────
  app.get('/api/health', async (_request, reply) => {
    reply.status(200).send({
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
    });
  });

  // ─── API Routes ─────────────────────────────────────────────────────
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(userRoutes, { prefix: '/api/users' });
  await app.register(transactionRoutes, { prefix: '/api/transactions' });
  await app.register(uploadRoutes, { prefix: '/api/upload' });

  return app;
};

/**
 * Start the server
 */
const start = async () => {
  try {
    // Connect to databases
    await connectDB();

    try {
      await redis.connect();
    } catch (redisErr) {
      logger.warn({ err: redisErr }, 'Redis connection failed — continuing without cache');
    }

    // Build and start the Fastify app
    const app = await buildApp();
    const port = parseInt(process.env.PORT || '5000', 10);

    await app.listen({ port, host: '0.0.0.0' });

    logger.info(`🚀 KUVERA AI server running on http://localhost:${port}`);
    logger.info(`📋 Health check: http://localhost:${port}/api/health`);
    logger.info(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
};

// ─── Graceful Shutdown ─────────────────────────────────────────────────
const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received — shutting down gracefully`);

  try {
    await redis.quit();
    logger.info('Redis disconnected');
  } catch {
    // Ignore redis disconnect errors
  }

  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start the application
start();
