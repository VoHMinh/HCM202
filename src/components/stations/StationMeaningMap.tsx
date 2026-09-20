'use client';

import React, { useState } from 'react';
import { scenes, edges } from '@/content/scenes';
import { SceneHeader } from '@/components/ui/SceneHeader';
import { JourneyLink } from '@/components/ui/JourneyLink';
import { SourceRef } from '@/components/ui/SourceRef';
import { useJourney } from '@/store/useJourney';
import { cn } from '@/lib/utils';
import type { Edge } from '@/content/types';

interface StationMeaningMapProps {
  onAdvance?: () => void;
}

export function StationMeaningMap({ onAdvance }: StationMeaningMapProps) {
  const data = scenes['meaning-map'];
  const [edgeCClosed, setEdgeCClosed] = useState<boolean>(false);
  const [activeEdgeId, setActiveEdgeId] = useState<'A' | 'B' | 'C'>('C');

  const completeStation = useJourney((state) => state.completeStation);
  const discoverEdge = useJourney((state) => state.discoverEdge);

  const handleCloseEdgeC = () => {
    setEdgeCClosed(true);
    setActiveEdgeId('C');
    completeStation('meaning-map');
    discoverEdge('C');
  };

  const activeEdge: Edge | undefined = edges.find((e) => e.id === activeEdgeId);

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between select-none overflow-hidden lacquer-texture px-6 sm:px-12 lg:px-20 py-8 lg:py-12 border-r border-[#F5EFE3]/10">
      <SceneHeader
        index={4}
        kicker={data.kicker}
        accentColor="var(--gold)"
      />

      <div className="grid-editorial w-full flex-1 items-center py-2">
        {/* Cột 1–5: Khối biện chứng & Diễn giải chi tiết */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-start space-y-5 pr-0 lg:pr-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#E3B341] uppercase block mb-1">
              TAM GIÁC BIỆN CHỨNG
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#F5EFE3] tracking-tight">
              {data.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#F5EFE3]/80 font-sans leading-relaxed">
            {data.instruction}
          </p>

          {/* Hộp diễn giải cạnh đang chọn */}
          {activeEdge && (
            <div className="w-full border-l-2 border-[#E3B341] pl-4 py-2 space-y-2 bg-[#1A150F]/40 pr-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#E3B341] font-bold uppercase tracking-wider">
                  CẠNH {activeEdge.id}: {activeEdge.relationLabel.toUpperCase()}
                </span>
                <span className="font-mono text-[11px] text-[#F5EFE3]/50">
                  {activeEdge.from.toUpperCase()} → {activeEdge.to.toUpperCase()}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-[#F5EFE3]">
                {activeEdge.thesis}
              </h4>

              <p className="text-xs text-[#F5EFE3]/70 font-sans leading-relaxed">
                {activeEdge.mechanism}
              </p>

              <div className="pt-2 text-[11px] font-mono text-[#F5EFE3]/50 border-t border-[#F5EFE3]/10 flex flex-wrap gap-2 items-center">
                <span>Căn cứ:</span>
                {activeEdge.sourceIds.map((sId) => (
                  <SourceRef key={sId} sourceId={sId} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cột 6–12: Sơ đồ tương tác hình tam giác */}
        <div className="col-span-12 lg:col-span-7 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 400 360" className="w-full h-full overflow-visible">
              <defs>
                <filter id="glow-gold" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Cạnh A: Độc lập -> Tự do */}
              <line
                x1="200"
                y1="60"
                x2="80"
                y2="280"
                stroke={activeEdgeId === 'A' ? '#E3B341' : '#FF4D62'}
                strokeWidth={activeEdgeId === 'A' ? '4' : '2'}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveEdgeId('A')}
              />

              {/* Cạnh B: Tự do -> Hạnh phúc */}
              <line
                x1="80"
                y1="280"
                x2="320"
                y2="280"
                stroke={activeEdgeId === 'B' ? '#E3B341' : '#7FC8D8'}
                strokeWidth={activeEdgeId === 'B' ? '4' : '2'}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveEdgeId('B')}
              />

              {/* Cạnh C: Hạnh phúc -> Độc lập (Kiểm chứng) */}
              {edgeCClosed ? (
                <line
                  x1="320"
                  y1="280"
                  x2="200"
                  y2="60"
                  stroke="#E3B341"
                  strokeWidth={activeEdgeId === 'C' ? '4' : '3'}
                  filter="url(#glow-gold)"
                  className="cursor-pointer transition-all duration-300 animate-pulse"
                  onClick={() => setActiveEdgeId('C')}
                />
              ) : (
                <line
                  x1="320"
                  y1="280"
                  x2="200"
                  y2="60"
                  stroke="#E3B341"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="opacity-40"
                />
              )}

              {/* 3 Đỉnh: Độc Lập, Tự Do, Hạnh Phúc */}
              {/* Đỉnh 1: Độc lập (Top) */}
              <g className="cursor-pointer" onClick={() => setActiveEdgeId('A')}>
                <circle cx="200" cy="60" r="32" fill="#14110E" stroke="#FF4D62" strokeWidth="2.5" />
                <text x="200" y="64" textAnchor="middle" fill="#F5EFE3" fontSize="10" fontWeight="bold" letterSpacing="0.1em">
                  ĐỘC LẬP
                </text>
              </g>

              {/* Đỉnh 2: Tự do (Bottom-Left) */}
              <g className="cursor-pointer" onClick={() => setActiveEdgeId('B')}>
                <circle cx="80" cy="280" r="32" fill="#14110E" stroke="#7FC8D8" strokeWidth="2.5" />
                <text x="80" y="284" textAnchor="middle" fill="#F5EFE3" fontSize="10" fontWeight="bold" letterSpacing="0.1em">
                  TỰ DO
                </text>
              </g>

              {/* Đỉnh 3: Hạnh phúc (Bottom-Right) */}
              <g className="cursor-pointer" onClick={() => setActiveEdgeId('C')}>
                <circle cx="320" cy="280" r="32" fill="#14110E" stroke="#9CC45A" strokeWidth="2.5" />
                <text x="320" y="284" textAnchor="middle" fill="#F5EFE3" fontSize="10" fontWeight="bold" letterSpacing="0.1em">
                  HẠNH PHÚC
                </text>
              </g>
            </svg>

            {/* Nút đóng cạnh C nếu chưa đóng */}
            {!edgeCClosed && (
              <button
                type="button"
                onClick={handleCloseEdgeC}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 border border-[#E3B341] bg-[#14110E] hover:bg-[#E3B341]/10 text-xs font-mono font-bold tracking-widest text-[#E3B341] transition-all shadow-[0_0_20px_rgba(227,179,65,0.3)] animate-bounce"
              >
                + KHÉP KÍN CẠNH C (KIỂM CHỨNG)
              </button>
            )}
          </div>

          {edgeCClosed && (
            <div className="text-center pt-3 font-mono text-xs text-[#E3B341] tracking-widest animate-in fade-in">
              ✓ TAM GIÁC BIỆN CHỨNG ĐÃ ĐƯỢC KHÉP KÍN HOÀN TOÀN
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-[#F5EFE3]/10">
        <span className="font-mono text-xs text-[#F5EFE3]/40">
          Chặng 4: Ba giá trị tạo thành một vòng tuần hoàn tự kiểm chứng
        </span>

        {edgeCClosed && (
          <JourneyLink onClick={onAdvance} accent="gold">
            {data.cta || 'THỬ MỘT THỬ THÁCH'}
          </JourneyLink>
        )}
      </div>
    </section>
  );
}
