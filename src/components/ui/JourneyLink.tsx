'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface JourneyLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  accent?: 'default' | 'doclap' | 'tudo' | 'hanhphuc' | 'gold';
  disabled?: boolean;
}

export function JourneyLink({
  children,
  onClick,
  className,
  accent = 'default',
  disabled = false,
}: JourneyLinkProps) {
  const accentUnderline = {
    default: 'bg-[#F5EFE3]',
    doclap: 'bg-[#FF4D62]',
    tudo: 'bg-[#7FC8D8]',
    hanhphuc: 'bg-[#9CC45A]',
    gold: 'bg-[#E3B341]',
  }[accent];

  const accentColor = {
    default: 'text-[#F5EFE3] hover:text-[#FFFFFF]',
    doclap: 'text-[#FF4D62] hover:text-[#FFAAB5]',
    tudo: 'text-[#7FC8D8] hover:text-[#D1F2F9]',
    hanhphuc: 'text-[#9CC45A] hover:text-[#D7F5A7]',
    gold: 'text-[#E3B341] hover:text-[#FFE799]',
  }[accent];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group relative inline-flex items-center gap-3 py-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed',
        accentColor,
        className
      )}
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
        →
      </span>
      {/* Animated underline running from 0 to 100% */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100',
          accentUnderline
        )}
      />
    </button>
  );
}
