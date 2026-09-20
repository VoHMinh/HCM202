'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ValueId } from '@/content/types';

interface ValueTitleProps {
  activeValue?: ValueId | null;
  className?: string;
  onValueHover?: (val: ValueId | null) => void;
}

export function ValueTitle({ activeValue = null, className, onValueHover }: ValueTitleProps) {
  const [hovered, setHovered] = useState<ValueId | null>(null);

  const values: { id: ValueId; label: string; glowClass: string; colorClass: string }[] = [
    {
      id: 'doc-lap',
      label: 'ĐỘC LẬP',
      glowClass: 'drop-shadow-[0_0_28px_rgba(255,77,98,0.75)]',
      colorClass: 'text-[#FF4D62]',
    },
    {
      id: 'tu-do',
      label: 'TỰ DO',
      glowClass: 'drop-shadow-[0_0_28px_rgba(127,200,216,0.75)]',
      colorClass: 'text-[#7FC8D8]',
    },
    {
      id: 'hanh-phuc',
      label: 'HẠNH PHÚC',
      glowClass: 'drop-shadow-[0_0_28px_rgba(156,196,90,0.75)]',
      colorClass: 'text-[#9CC45A]',
    },
  ];

  return (
    <div className={cn('flex flex-col select-none tracking-tight font-black leading-[0.92]', className)}>
      {values.map((v) => {
        const isCurrentActive = activeValue === v.id;
        const isCurrentHovered = hovered === v.id;
        const isLit = isCurrentActive || isCurrentHovered;

        return (
          <span
            key={v.id}
            onMouseEnter={() => {
              setHovered(v.id);
              onValueHover?.(v.id);
            }}
            onMouseLeave={() => {
              setHovered(null);
              onValueHover?.(null);
            }}
            className={cn(
              'transition-all duration-400 ease-out cursor-default inline-block py-0.5',
              isLit ? `${v.colorClass} ${v.glowClass} translate-x-2` : 'text-[#F5EFE3]/40 hover:text-[#F5EFE3]/80'
            )}
            style={{
              fontSize: 'var(--step-3)',
            }}
          >
            {v.label}
          </span>
        );
      })}
    </div>
  );
}
