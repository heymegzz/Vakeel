'use client';

import { useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * Upload dropzone component
 * Supports drag-and-drop and click-to-upload for PDF files
 * Will be fully functional in Phase 2
 */
export default function UploadZone() {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    // Phase 2: Handle file upload
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed',
        'border-zinc-300 bg-zinc-50/50 p-12 transition-all duration-300',
        'hover:border-emerald-400 hover:bg-emerald-50/30',
        'dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/20',
        'cursor-pointer group'
      )}
    >
      {/* Upload Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-900/50">
        <Upload className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Text */}
      <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Upload your bank statement
      </h3>
      <p className="mb-6 max-w-sm text-center text-sm text-zinc-500 dark:text-zinc-400">
        Drag and drop your PDF here, or click to browse. We support statements from all major Indian banks.
      </p>

      {/* Action Button */}
      <Button variant="gradient" size="lg" className="gap-2">
        <FileText className="h-4 w-4" />
        Select PDF File
      </Button>

      {/* Supported formats */}
      <p className="mt-4 text-xs text-zinc-400">
        Supported: PDF files up to 10 MB
      </p>
    </div>
  );
}
