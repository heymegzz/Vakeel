import User, { IUser } from './user.model';
import { NotFoundError } from '../../shared/errors/AppError';

/**
 * Get user by ID (excluding password)
 */
export const getUserById = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
};

/**
 * Get user by email
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email }).select('-password');
};
