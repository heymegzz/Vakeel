import api from './api';
import type { ApiResponse, AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types';

/**
 * Auth API helper functions
 */

/**
 * Register a new user
 */
export const registerUser = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    '/api/auth/register',
    credentials
  );
  return data.data!;
};

/**
 * Login an existing user
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    '/api/auth/login',
    credentials
  );
  return data.data!;
};

/**
 * Get the current authenticated user's profile
 */
export const fetchCurrentUser = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<{ user: User }>>('/api/auth/me');
  return data.data!.user;
};

/**
 * Save auth data to localStorage
 */
export const saveAuth = (token: string, user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('kuvera_token', token);
    localStorage.setItem('kuvera_user', JSON.stringify(user));
  }
};

/**
 * Clear auth data from localStorage
 */
export const clearAuth = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('kuvera_token');
    localStorage.removeItem('kuvera_user');
  }
};

/**
 * Get stored token
 */
export const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('kuvera_token');
  }
  return null;
};

/**
 * Get stored user
 */
export const getStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('kuvera_user');
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch {
        return null;
      }
    }
  }
  return null;
};
