import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'KUVERA AI — AI-Powered Financial Intelligence',
  description:
    'Upload your bank statement and get instant AI-powered insights about your spending habits. Understand your money in 30 seconds.',
  keywords: ['finance', 'AI', 'bank statement', 'spending insights', 'India', 'personal finance'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
