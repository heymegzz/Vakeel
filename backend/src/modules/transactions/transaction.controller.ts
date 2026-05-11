import { FastifyReply, FastifyRequest } from 'fastify';
import { getTransactionsByUser } from './transaction.service';

/**
 * GET /api/transactions
 * Get all transactions for the authenticated user
 */
export const getTransactions = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const userId = request.user!.userId;

  const transactions = await getTransactionsByUser(userId);

  reply.status(200).send({
    success: true,
    data: { transactions },
  });
};
