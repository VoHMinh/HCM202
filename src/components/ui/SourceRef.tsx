'use client';

import React from 'react';
import { useJourney } from '@/store/useJourney';
import { sources } from '@/content/scenes';
import { cn } from '@/lib/utils';

interface SourceRefProps {
  sourceId: string;
  label?: string;
  className?: string;
}

export function SourceRef({ sourceId, label, className }: SourceRefProps) {
  const setOpenSourceId = useJourney((state) => state.setOpenSourceId);
  const source = sources.find((s) => s.id === sourceId);

  if (!source) return null;

  const displayLabel = label || `${source.title} (${source.year})`;

  return (
    <button
      type="button"
      onClick={() => setOpenSourceId(sourceId)}
      className={cn(
        'group inline-flex items-center text-xs font-mono text-[#F5EFE3]/70 hover:text-[#E3B341] transition-colors border-b border-dotted border-[#F5EFE3]/40 hover:border-[#E3B341] pb-0.5 cursor-pointer text-left',
        className
      )}
      title={`Xem nguồn gốc: ${source.title}`}
    >
      <span>{displayLabel}</span>
      <span className="ml-1 text-[10px] text-[#E3B341]/80 opacity-60 group-hover:opacity-100 transition-opacity">
        ↗
      </span>
    </button>
  );
}
