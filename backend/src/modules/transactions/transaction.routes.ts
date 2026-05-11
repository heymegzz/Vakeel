import { FastifyInstance } from 'fastify';
import { getTransactions } from './transaction.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

/**
 * Transaction routes (all protected)
 * - GET /api/transactions — Get all user transactions
 */
export const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/', { preHandler: [authMiddleware] }, getTransactions);
};
