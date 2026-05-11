import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from '../shared/errors/AppError';
import logger from '../shared/utils/logger';
import { ZodError } from 'zod';

/**
 * Standard API response shape
 */
interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}

/**
 * Global error handler for Fastify
 * Catches all errors and returns consistent JSON responses
 */
export const errorHandler = (
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply
): void => {
  logger.error(
    {
      err: error,
      url: request.url,
      method: request.method,
    },
    'Request error'
  );

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const response: ApiErrorResponse = {
      success: false,
      message: 'Validation failed',
      error: error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
    reply.status(400).send(response);
    return;
  }

  // Handle custom application errors
  if (error instanceof AppError) {
    const response: ApiErrorResponse = {
      success: false,
      message: error.message,
    };
    reply.status(error.statusCode).send(response);
    return;
  }

  // Handle Fastify validation errors
  if ('validation' in error && error.validation) {
    const response: ApiErrorResponse = {
      success: false,
      message: 'Validation failed',
      error: error.message,
    };
    reply.status(400).send(response);
    return;
  }

  // Handle unknown errors
  const response: ApiErrorResponse = {
    success: false,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message || 'Internal server error',
  };
  reply.status(500).send(response);
};
