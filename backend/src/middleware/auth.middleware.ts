import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../shared/errors/AppError';
import logger from '../shared/utils/logger';

/**
 * JWT payload interface
 */
export interface JwtPayload {
  userId: string;
  email: string;
}

/**
 * Extend FastifyRequest to include the authenticated user
 */
declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}

/**
 * JWT authentication middleware
 * Verifies the Bearer token from the Authorization header
 */
export const authMiddleware = async (
  request: FastifyRequest,
  _reply: FastifyReply
): Promise<void> => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Invalid token format');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      logger.error('JWT_SECRET is not defined');
      throw new UnauthorizedError('Server configuration error');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    request.user = decoded;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    throw new UnauthorizedError('Invalid or expired token');
  }
};
