'use client';

import React from 'react';
import { useJourney } from '@/store/useJourney';
import { cn } from '@/lib/utils';
import type { SceneId } from '@/content/types';

interface StationInfo {
  id: SceneId;
  name: string;
  accent: string;
}

const STATIONS: StationInfo[] = [
  { id: 'intro',        name: 'Nhập đề',      accent: '#F5EFE3' },
  { id: 'doc-lap',      name: 'Ba Giá Trị',   accent: '#c3a47b' },
  { id: 'meaning-map',  name: 'Sơ đồ',        accent: '#E3B341' },
  { id: 'missing-value',name: 'Thử thách',    accent: '#7FC8D8' },
  { id: 'scale',        name: 'Chiếc cân',    accent: '#9CC45A' },
  { id: 'outro',        name: 'Kết luận',     accent: '#F5EFE3' },
];

interface PathMinimapProps {
  onSelectStation?: (index: number) => void;
}

export function PathMinimap({ onSelectStation }: PathMinimapProps) {
  const currentStationIndex = useJourney((state) => state.currentStationIndex);
  const completedStations = useJourney((state) => state.completedStations);

  return (
    <nav
      aria-label="Lộ trình hành trình"
      className="fixed bottom-6 right-8 z-40 hidden md:flex items-center gap-3 backdrop-blur-md bg-[#0B0A09]/70 px-4 py-2.5 border border-[#F5EFE3]/10"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5EFE3]/40 mr-1 select-none">
        Lộ trình
      </span>

      <div className="flex items-center gap-2">
        {STATIONS.map((station, idx) => {
          const isActive = idx === currentStationIndex;
          const isCompleted = completedStations.includes(station.id);

          return (
            <button
              key={station.id}
              type="button"
              onClick={() => onSelectStation?.(idx)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              title={`${idx + 1}. ${station.name}`}
            >
              <div
                className={cn(
                  'transition-all duration-300 rounded-none',
                  isActive
                    ? 'w-5 h-[3px]'
                    : isCompleted
                    ? 'w-2 h-[2px] opacity-70'
                    : 'w-2 h-[2px] opacity-30 group-hover:opacity-60'
                )}
                style={{
                  backgroundColor: isActive
                    ? station.accent
                    : isCompleted
                    ? '#E3B341'
                    : '#F5EFE3',
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
