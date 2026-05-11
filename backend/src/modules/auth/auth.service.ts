import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../user/user.model';
import { ConflictError, UnauthorizedError } from '../../shared/errors/AppError';
import { RegisterInput, LoginInput } from './auth.schema';
import logger from '../../shared/utils/logger';

/**
 * Auth response shape returned after register/login
 */
interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
  token: string;
}

/**
 * Format user document for API response (strip sensitive fields)
 */
const formatUser = (user: IUser) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

/**
 * Generate a JWT token for a user
 */
const generateToken = (user: IUser): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(
    { userId: String(user._id), email: user.email },
    secret,
    { expiresIn: '7d' }
  );
};

/**
 * Register a new user
 * - Checks for duplicate email
 * - Hashes the password with bcrypt
 * - Creates the user in MongoDB
 * - Returns user data + JWT token
 */
export const registerUser = async (input: RegisterInput): Promise<AuthResponse> => {
  const { name, email, password } = input;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError('A user with this email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  logger.info({ userId: user._id }, 'New user registered');

  const token = generateToken(user);

  return {
    user: formatUser(user),
    token,
  };
};

/**
 * Authenticate a user with email and password
 * - Finds user by email
 * - Compares password with bcrypt
 * - Returns user data + JWT token
 */
export const loginUser = async (input: LoginInput): Promise<AuthResponse> => {
  const { email, password } = input;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  logger.info({ userId: user._id }, 'User logged in');

  const token = generateToken(user);

  return {
    user: formatUser(user),
    token,
  };
};

/**
 * Get the current authenticated user's profile
 */
export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  return formatUser(user);
};
