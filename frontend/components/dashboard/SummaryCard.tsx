'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

/**
 * Dashboard summary card
 * Displays a key metric with icon and optional trend
 */
export default function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: SummaryCardProps) {
  return (
    <Card className={cn('transition-all duration-300 hover:shadow-md', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-zinc-500">{title}</CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950">
          <Icon className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
        {subtitle && (
          <p
            className={cn(
              'mt-1 text-xs',
              trend === 'up' && 'text-green-600',
              trend === 'down' && 'text-red-500',
              (!trend || trend === 'neutral') && 'text-zinc-500'
            )}
          >
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
