'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Sidebar from '@/components/layout/Sidebar';
import TransactionTable from '@/components/transactions/TransactionTable';

/**
 * Transactions page — protected route
 * Shows parsed transactions from uploaded statements
 */
export default function TransactionsPage() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-zinc-900">Transactions</h1>
            <p className="mt-2 text-zinc-500">
              View and explore your parsed bank transactions.
            </p>
          </div>

          <div className="animate-slide-up">
            <TransactionTable />
          </div>
        </div>
      </div>
    </div>
  );
}
