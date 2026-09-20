'use client';

import React from 'react';
import { useJourney } from '@/store/useJourney';
import { sourceById } from '@/content/scenes';

interface SourceBadgeProps {
  sourceId: string;
  className?: string;
  showLabel?: boolean;
}

export function SourceBadge({ sourceId, className = '', showLabel = false }: SourceBadgeProps) {
  const setOpenSourceId = useJourney((state) => state.setOpenSourceId);
  const source = sourceById[sourceId];

  if (!source) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setOpenSourceId(sourceId);
      }}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium 
        bg-[#1F1A15] border border-[#33291F] text-[#E3B341] hover:text-[#F5EFE3] 
        hover:border-[#E3B341]/60 hover:bg-[#2A231C] transition-all cursor-pointer 
        focus:outline-none focus:ring-2 focus:ring-[#E3B341]/50 ${className}`}
      title={`Xem nguồn trực tiếp: ${source.title} (${source.year})`}
      aria-label={`Xem nguồn trực tiếp: ${source.title}`}
    >
      <span className="text-sm select-none" role="img" aria-hidden="true">📜</span>
      {showLabel ? (
        <span className="truncate max-w-[140px] font-sans text-[11px] text-[#F5EFE3]/80">
          {source.title}
        </span>
      ) : (
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">Nguồn</span>
      )}
    </button>
  );
}
