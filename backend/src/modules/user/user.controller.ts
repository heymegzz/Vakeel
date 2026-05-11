import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserById } from './user.service';

/**
 * GET /api/users/:id
 * Get a user's profile by ID
 */
export const getUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const user = await getUserById(request.params.id);

  reply.status(200).send({
    success: true,
    data: { user },
  });
};
