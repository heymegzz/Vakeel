import Transaction, { ITransaction } from './transaction.model';

/**
 * Get all transactions for a user, sorted by date (newest first)
 */
export const getTransactionsByUser = async (
  userId: string
): Promise<ITransaction[]> => {
  return Transaction.find({ userId }).sort({ date: -1 });
};
