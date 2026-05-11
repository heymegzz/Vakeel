'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Upload,
  Receipt,
  MessageSquare,
  Settings,
} from 'lucide-react';

/**
 * Sidebar navigation items
 */
const sidebarItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Upload', href: '/upload', icon: Upload },
  { label: 'Transactions', href: '/transactions', icon: Receipt },
  { label: 'AI Chat', href: '/chat', icon: MessageSquare },
];

/**
 * Sidebar component for authenticated pages
 * Highlights the active route
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-zinc-50/50 lg:block dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="flex h-full flex-col justify-between p-4">
        {/* Navigation Links */}
        <nav className="mt-4 flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm dark:bg-emerald-950 dark:text-emerald-400'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200'
                )}
              >
                <Icon className={cn('h-4.5 w-4.5', isActive ? 'text-emerald-600' : '')} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900"
          >
            <Settings className="h-4.5 w-4.5" />
            Settings
          </Link>
          <p className="mt-4 px-3 text-xs text-zinc-400">KUVERA AI v1.0</p>
        </div>
      </div>
    </aside>
  );
}
