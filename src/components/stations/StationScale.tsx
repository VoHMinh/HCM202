'use client';

import React, { useState } from 'react';
import { scenes } from '@/content/scenes';
import { SceneHeader } from '@/components/ui/SceneHeader';
import { JourneyLink } from '@/components/ui/JourneyLink';
import { SourceRef } from '@/components/ui/SourceRef';
import { useJourney } from '@/store/useJourney';
import { cn } from '@/lib/utils';
import type { ValueId } from '@/content/types';

interface StationScaleProps {
  onAdvance?: () => void;
}

export function StationScale({ onAdvance }: StationScaleProps) {
  const data = scenes.scale;
  const payload = data.payload as any;

  const [rightPlate, setRightPlate] = useState<ValueId[]>([]);
  const [decoyWarning, setDecoyWarning] = useState<string | null>(null);

  const completeStation = useJourney((state) => state.completeStation);

  // Left plate has 'doc-lap' (weight = 2)
  const leftWeight = 2;

  // Weight calculation
  const getWeight = (items: ValueId[]) => {
    return items.reduce((sum, item) => {
      if (item === 'doc-lap') return sum + 2;
      if (item === 'tu-do') return sum + 1;
      if (item === 'hanh-phuc') return sum + 1;
      return sum;
    }, 0);
  };

  const rightWeight = getWeight(rightPlate);
  const diff = rightWeight - leftWeight; // < 0: left tilt, 0: balance, > 0: right tilt

  // Rotation angle of beam
  const beamAngle = diff < 0 ? -12 : diff > 0 ? 12 : 0;

  const isDecoy = rightPlate.length === 1 && rightPlate[0] === 'doc-lap';
  const isCorrect =
    rightPlate.includes('tu-do') &&
    rightPlate.includes('hanh-phuc') &&
    rightPlate.length === 2;

  const handleToggleBlock = (val: ValueId) => {
    let next: ValueId[];
    if (rightPlate.includes(val)) {
      next = rightPlate.filter((item) => item !== val);
    } else {
      next = [...rightPlate, val];
    }
    setRightPlate(next);

    if (next.length === 1 && next[0] === 'doc-lap') {
      setDecoyWarning(payload.decoyFeedback || 'Cân đã thăng bằng. Nhưng nó đang đo cái gì?');
    } else {
      setDecoyWarning(null);
    }

    if (next.includes('tu-do') && next.includes('hanh-phuc') && next.length === 2) {
      completeStation('scale');
    }
  };

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between select-none overflow-hidden lacquer-texture px-6 sm:px-12 lg:px-20 py-8 lg:py-12 border-r border-[#F5EFE3]/10">
      <SceneHeader
        index={6}
        kicker={data.kicker}
        accentColor="var(--gold)"
      />

      {/* Sân khấu tối tập trung cao độ (Khuôn B) */}
      <div className="w-full flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-6">
        <div>
          <span className="font-mono text-xs tracking-widest text-[#E3B341] uppercase block mb-1">
            THƯỚC ĐO Ý NGHĨA
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#F5EFE3] tracking-tight">
            {data.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#F5EFE3]/70 font-sans max-w-xl mx-auto mt-2">
            {data.lead?.[0]} <span className="text-[#E3B341] font-semibold">{data.lead?.[1]}</span>
          </p>
        </div>

        {/* MÔ HÌNH CHIẾC CÂN SVG */}
        <div className="w-full max-w-[480px] h-48 sm:h-56 relative flex items-center justify-center select-none">
          <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
            {/* Trụ cân đứng */}
            <line x1="200" y1="50" x2="200" y2="180" stroke="#4A4038" strokeWidth="4" />
            <polygon points="170,180 230,180 200,165" fill="#33291F" />
            <circle cx="200" cy="50" r="6" fill="#E3B341" />

            {/* Đòn cân xoay góc beamAngle */}
            <g
              style={{
                transform: `rotate(${beamAngle}deg)`,
                transformOrigin: '200px 50px',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <line x1="60" y1="50" x2="340" y2="50" stroke={isCorrect ? '#E3B341' : '#F5EFE3'} strokeWidth="3" />

              {/* Dây treo đĩa trái */}
              <line x1="80" y1="50" x2="50" y2="120" stroke="#7A685A" strokeWidth="1.5" />
              <line x1="80" y1="50" x2="110" y2="120" stroke="#7A685A" strokeWidth="1.5" />
              {/* Đĩa trái: Luôn có ĐỘC LẬP */}
              <line x1="40" y1="120" x2="120" y2="120" stroke="#FF4D62" strokeWidth="3" />
              <rect x="55" y="95" width="50" height="24" fill="#C8102E" opacity="0.8" />
              <text x="80" y="111" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                ĐỘC LẬP
              </text>

              {/* Dây treo đĩa phải */}
              <line x1="320" y1="50" x2="290" y2="120" stroke="#7A685A" strokeWidth="1.5" />
              <line x1="320" y1="50" x2="350" y2="120" stroke="#7A685A" strokeWidth="1.5" />
              {/* Đĩa phải */}
              <line x1="280" y1="120" x2="360" y2="120" stroke={isCorrect ? '#E3B341' : '#F5EFE3'} strokeWidth="3" />

              {/* Các khối trên đĩa phải */}
              {rightPlate.map((val, idx) => {
                const color = val === 'doc-lap' ? '#C8102E' : val === 'tu-do' ? '#7FC8D8' : '#9CC45A';
                const label = val === 'doc-lap' ? 'ĐỘC LẬP' : val === 'tu-do' ? 'TỰ DO' : 'HẠNH PHÚC';
                const yPos = 120 - (idx + 1) * 22;
                return (
                  <g key={val}>
                    <rect x="295" y={yPos} width="50" height="20" fill={color} opacity="0.85" />
                    <text x="320" y={yPos + 14} textAnchor="middle" fill="#0B0A09" fontSize="8" fontWeight="bold">
                      {label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Các khối giá trị có thể đặt lên đĩa phải */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="font-mono text-xs text-[#F5EFE3]/50 mr-2">
            Đặt vào đĩa phải:
          </span>

          <button
            type="button"
            onClick={() => handleToggleBlock('tu-do')}
            className={cn(
              'px-4 py-2 border font-mono text-xs font-bold tracking-wider transition-colors',
              rightPlate.includes('tu-do')
                ? 'border-[#7FC8D8] bg-[#7FC8D8]/20 text-[#7FC8D8]'
                : 'border-[#F5EFE3]/20 text-[#F5EFE3]/70 hover:border-[#7FC8D8]/50'
            )}
          >
            {rightPlate.includes('tu-do') ? '✓ TỰ DO' : '+ TỰ DO'}
          </button>

          <button
            type="button"
            onClick={() => handleToggleBlock('hanh-phuc')}
            className={cn(
              'px-4 py-2 border font-mono text-xs font-bold tracking-wider transition-colors',
              rightPlate.includes('hanh-phuc')
                ? 'border-[#9CC45A] bg-[#9CC45A]/20 text-[#9CC45A]'
                : 'border-[#F5EFE3]/20 text-[#F5EFE3]/70 hover:border-[#9CC45A]/50'
            )}
          >
            {rightPlate.includes('hanh-phuc') ? '✓ HẠNH PHÚC' : '+ HẠNH PHÚC'}
          </button>

          <button
            type="button"
            onClick={() => handleToggleBlock('doc-lap')}
            className={cn(
              'px-4 py-2 border font-mono text-xs font-bold tracking-wider transition-colors',
              rightPlate.includes('doc-lap')
                ? 'border-[#FF4D62] bg-[#FF4D62]/20 text-[#FF4D62]'
                : 'border-[#F5EFE3]/15 text-[#F5EFE3]/50 hover:border-[#FF4D62]/40'
            )}
          >
            {rightPlate.includes('doc-lap') ? '✓ ĐỘC LẬP' : '+ ĐỘC LẬP'}
          </button>
        </div>

        {/* Cảnh báo Decoy */}
        {decoyWarning && (
          <div className="font-serif italic text-xs sm:text-sm text-amber-300 max-w-lg mx-auto">
            {decoyWarning}
          </div>
        )}

        {/* Tiết lộ luận điểm trung tâm khi thăng bằng đúng */}
        {isCorrect && (
          <div className="border border-[#E3B341]/40 bg-[#1A150F]/60 p-6 max-w-2xl mx-auto space-y-3 animate-in fade-in zoom-in-95 duration-500">
            <span className="font-mono text-xs text-[#E3B341] tracking-[0.25em] uppercase block">
              LUẬN ĐIỂM TRUNG TÂM · BẢO TÀNG LỊCH SỬ
            </span>
            <blockquote className="font-serif italic text-lg sm:text-xl text-[#F5EFE3] leading-relaxed">
              “Ngày nay, chúng ta đã xây dựng nên nước Việt Nam Dân chủ Cộng hòa. Nhưng nếu nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì.”
            </blockquote>
            <cite className="font-mono text-xs text-[#E3B341]/80 not-italic block">
              — Hồ Chí Minh, Thư gửi Ủy ban nhân dân các kỳ, tỉnh, huyện và làng (17/10/1945)
            </cite>
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-[#F5EFE3]/10">
        <span className="font-mono text-xs text-[#F5EFE3]/40">
          Chặng 6: Chiếc cân đo ý nghĩa, không đo hình thức
        </span>

        {isCorrect && (
          <JourneyLink onClick={onAdvance} accent="gold">
            {data.cta || 'XEM KẾT LUẬN'}
          </JourneyLink>
        )}
      </div>
    </section>
  );
}
