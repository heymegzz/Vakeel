import { FastifyInstance } from 'fastify';
import { register, login, me } from './auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

/**
 * Auth routes
 * - POST /api/auth/register — Create a new user account
 * - POST /api/auth/login    — Authenticate and receive JWT
 * - GET  /api/auth/me       — Get current user (protected)
 */
export const authRoutes = async (fastify: FastifyInstance): Promise<void> => {
  // Public routes
  fastify.post('/register', register);
  fastify.post('/login', login);

  // Protected routes
  fastify.get('/me', { preHandler: [authMiddleware] }, me);
};
