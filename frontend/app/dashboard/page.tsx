'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Sidebar from '@/components/layout/Sidebar';
import SummaryCard from '@/components/dashboard/SummaryCard';
import InsightCard from '@/components/dashboard/InsightCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  IndianRupee,
  TrendingDown,
  Receipt,
  Upload,
  Sparkles,
} from 'lucide-react';

/**
 * Dashboard page — protected route
 * Shows welcome message and placeholder summary cards
 * Redirects to /login if not authenticated
 */
export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();

  // Protect route — redirect if not authenticated
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
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-zinc-900">
              Welcome back, <span className="text-gradient">{user?.name}</span>! 👋
            </h1>
            <p className="mt-2 text-zinc-500">
              Here&apos;s your financial overview. Upload a statement to get started.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="stagger-children mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              title="Total Spent"
              value="₹0"
              subtitle="Upload a statement to see data"
              icon={IndianRupee}
              trend="neutral"
            />
            <SummaryCard
              title="Total Income"
              value="₹0"
              subtitle="No income data yet"
              icon={TrendingDown}
              trend="neutral"
            />
            <SummaryCard
              title="Transactions"
              value="0"
              subtitle="No transactions parsed"
              icon={Receipt}
              trend="neutral"
            />
            <SummaryCard
              title="Statements"
              value="0"
              subtitle="Upload your first PDF"
              icon={Upload}
              trend="neutral"
            />
          </div>

          {/* AI Insights Placeholder */}
          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-900">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              AI Insights
            </h2>
            <div className="stagger-children grid gap-3 md:grid-cols-2">
              <InsightCard
                title="Get started with KUVERA AI"
                description="Upload your first bank statement PDF to receive personalized financial insights powered by AI."
                type="info"
              />
              <InsightCard
                title="Your data is secure"
                description="We process your statements locally and never share your financial data with third parties."
                type="success"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="animate-fade-in rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 animate-pulse-glow">
                <Upload className="h-7 w-7 text-emerald-600" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-800">
              Ready to understand your finances?
            </h3>
            <p className="mb-6 text-sm text-zinc-500">
              Upload a bank statement PDF and let AI do the rest.
            </p>
            <Link href="/upload">
              <Button variant="gradient" size="lg" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Statement
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
