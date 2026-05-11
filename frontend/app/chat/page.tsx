'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Sparkles } from 'lucide-react';

/**
 * AI Chat page — protected route
 * Chat with AI about your financial transactions
 * Will be fully implemented in a later phase
 */
export default function ChatPage() {
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
            <h1 className="text-3xl font-bold text-zinc-900">AI Chat</h1>
            <p className="mt-2 text-zinc-500">
              Ask questions about your finances in plain English.
            </p>
          </div>

          {/* Coming Soon State */}
          <Card className="animate-slide-up">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50">
                  <MessageSquare className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-zinc-900">
                AI Chat — Coming Soon
              </h3>
              <p className="max-w-md text-sm text-zinc-500">
                Soon you&apos;ll be able to ask questions like &quot;How much did I spend on food this month?&quot; 
                and get instant, intelligent answers based on your transaction data.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'How much did I spend on Zomato?',
                  'What\'s my biggest expense category?',
                  'Show my weekend spending pattern',
                ].map((example) => (
                  <span
                    key={example}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs text-zinc-500"
                  >
                    &quot;{example}&quot;
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
