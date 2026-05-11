import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * POST /api/upload
 * Handle bank statement PDF upload
 * Will be implemented in Phase 2
 */
export const uploadFile = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  reply.status(200).send({
    success: true,
    message: 'Upload endpoint ready — PDF parsing coming in Phase 2',
  });
};
