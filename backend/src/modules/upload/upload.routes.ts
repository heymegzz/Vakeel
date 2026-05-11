import { FastifyInstance } from 'fastify';
import { uploadFile } from './upload.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

/**
 * Upload routes (all protected)
 * - POST /api/upload — Upload a bank statement PDF
 */
export const uploadRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/', { preHandler: [authMiddleware] }, uploadFile);
};
