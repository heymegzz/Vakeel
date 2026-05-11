import mongoose, { Document, Schema } from 'mongoose';

/**
 * Transaction document interface
 */
export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category?: string;
  balance?: number;
  source: string; // Which bank statement it came from
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Transaction schema definition
 */
const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    balance: {
      type: Number,
    },
    source: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient user-based queries
transactionSchema.index({ userId: 1, date: -1 });

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
