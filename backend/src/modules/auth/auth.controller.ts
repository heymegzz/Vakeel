import { FastifyReply, FastifyRequest } from 'fastify';
import { registerSchema, loginSchema } from './auth.schema';
import { registerUser, loginUser, getCurrentUser } from './auth.service';

/**
 * POST /api/auth/register
 * Register a new user account
 */
export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  // Validate request body with Zod
  const validatedData = registerSchema.parse(request.body);

  const result = await registerUser(validatedData);

  reply.status(201).send({
    success: true,
    message: 'Registration successful',
    data: result,
  });
};

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 */
export const login = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  // Validate request body with Zod
  const validatedData = loginSchema.parse(request.body);

  const result = await loginUser(validatedData);

  reply.status(200).send({
    success: true,
    message: 'Login successful',
    data: result,
  });
};

/**
 * GET /api/auth/me
 * Get the current authenticated user's profile
 */
export const me = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const userId = request.user!.userId;

  const user = await getCurrentUser(userId);

  reply.status(200).send({
    success: true,
    data: { user },
  });
};
