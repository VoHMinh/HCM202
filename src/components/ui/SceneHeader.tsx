'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SceneHeaderProps {
  index: number;
  total?: number;
  kicker?: string;
  accentColor?: string;
  className?: string;
}

export function SceneHeader({
  index,
  total = 8,
  kicker = '',
  accentColor,
  className,
}: SceneHeaderProps) {
  const currentFormatted = String(index).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');
  const progressPercent = ((index + 1) / total) * 100;

  return (
    <div className={cn('w-full select-none pt-4 pb-6', className)}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#F5EFE3]/50 uppercase">
          {kicker}
        </span>
        <span className="font-mono text-xs tracking-widest text-[#F5EFE3]/70 font-medium">
          <span style={{ color: accentColor || 'var(--ink-100)' }}>{currentFormatted}</span>
          <span className="text-[#F5EFE3]/30 mx-1">/</span>
          <span className="text-[#F5EFE3]/40">{totalFormatted}</span>
        </span>
      </div>

      {/* 2px minimal progress line across width */}
      <div className="w-full h-[2px] bg-[#F5EFE3]/10 overflow-hidden relative">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: accentColor || 'var(--gold)',
          }}
        />
      </div>
    </div>
  );
}
