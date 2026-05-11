import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../../middleware/auth.middleware';
import { getUserById } from './user.service';

/**
 * User routes (all protected)
 * - GET /api/users/:id — Get user profile
 */
export const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      const user = await getUserById(request.params.id);
      reply.status(200).send({
        success: true,
        data: { user },
      });
    }
  );
};
