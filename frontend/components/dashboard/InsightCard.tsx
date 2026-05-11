'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success';
}

const typeConfig = {
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-900 dark:text-blue-200',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
    titleColor: 'text-amber-900 dark:text-amber-200',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    titleColor: 'text-emerald-900 dark:text-emerald-200',
  },
};

/**
 * AI-generated insight card
 * Shows contextual financial insights with type-specific styling
 */
export default function InsightCard({ title, description, type }: InsightCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Card className={cn('border', config.border, config.bg, 'transition-all duration-300 hover:shadow-md')}>
      <CardContent className="flex items-start gap-3 p-4">
        <div className="mt-0.5 shrink-0">
          <Icon className={cn('h-5 w-5', config.iconColor)} />
        </div>
        <div>
          <h4 className={cn('text-sm font-semibold', config.titleColor)}>{title}</h4>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
