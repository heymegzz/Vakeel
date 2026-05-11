'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Sidebar from '@/components/layout/Sidebar';
import UploadZone from '@/components/upload/UploadZone';

/**
 * Upload page — protected route
 * Allows users to upload bank statement PDFs
 */
export default function UploadPage() {
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
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-zinc-900">Upload Statement</h1>
            <p className="mt-2 text-zinc-500">
              Upload your bank statement PDF to get AI-powered insights about your spending.
            </p>
          </div>

          <div className="animate-slide-up">
            <UploadZone />
          </div>

          {/* Info Section */}
          <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6">
            <h3 className="mb-3 text-sm font-semibold text-zinc-700">Supported Banks</h3>
            <div className="flex flex-wrap gap-2">
              {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'BOB', 'Yes Bank', 'IndusInd', 'Federal'].map(
                (bank) => (
                  <span
                    key={bank}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600"
                  >
                    {bank}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
