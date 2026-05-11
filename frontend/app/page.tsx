'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Upload,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

/**
 * Landing page — the first thing users see
 * Redirects to /dashboard if already authenticated
 */
export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  // Auto-redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Don't flash landing page for authenticated users
  if (isLoading || isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* ─── Background Gradient Orbs ────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl animate-float" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-36">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <Sparkles className="h-4 w-4" />
            AI-Powered Financial Intelligence
          </div>

          {/* Headline */}
          <h1 className="animate-slide-up max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Upload your bank statement.{' '}
            <span className="text-gradient">Understand your money</span>{' '}
            in 30 seconds.
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up mt-6 max-w-2xl text-lg text-zinc-500 sm:text-xl" style={{ animationDelay: '0.15s' }}>
            KUVERA AI reads your bank statement PDFs and gives you plain-English insights about where your money goes — no bank linking, no complicated setup.
          </p>

          {/* CTA Buttons */}
          <div className="animate-slide-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '0.3s' }}>
            <Link href="/signup">
              <Button variant="gradient" size="xl" className="gap-2 shadow-lg shadow-emerald-500/20">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="xl" className="gap-2">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features Section ────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-zinc-500">
            Three simple steps to financial clarity
          </p>
        </div>

        <div className="stagger-children grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900">1. Upload Statement</h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Drop your bank statement PDF — we support all major Indian banks including SBI, HDFC, ICICI, Axis, and more.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 transition-colors group-hover:bg-teal-500 group-hover:text-white">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900">2. Get AI Insights</h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Our AI reads every transaction, categorizes your spending, and generates a conversational summary you&apos;ll actually understand.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group relative rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 transition-colors group-hover:bg-cyan-500 group-hover:text-white">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900">3. Chat with AI</h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Ask questions about your finances in plain English: &quot;How much did I spend on food this month?&quot; — and get instant answers.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Trust Section ───────────────────────────────────────────── */}
      <section className="relative border-t border-zinc-200 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-16">
            <div className="flex items-center gap-3 text-zinc-500">
              <Shield className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium">Your data stays private</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <Zap className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium">Results in under 30 seconds</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium">All major Indian banks supported</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-600">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-zinc-700">KUVERA AI</span>
            </div>
            <p className="text-xs text-zinc-400">
              © {new Date().getFullYear()} KUVERA AI. Built with ❤️ for smarter personal finance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
