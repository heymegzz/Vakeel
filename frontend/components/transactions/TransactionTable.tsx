'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt } from 'lucide-react';

/**
 * Transaction table component
 * Will display parsed transactions from bank statements in Phase 2
 */
export default function TransactionTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-emerald-600" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Empty state — no transactions yet */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            <Receipt className="h-7 w-7 text-zinc-400" />
          </div>
          <h3 className="mb-1 text-base font-semibold text-zinc-700 dark:text-zinc-300">
            No transactions yet
          </h3>
          <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            Upload a bank statement to see your transactions appear here. We&apos;ll automatically parse and categorize them.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
