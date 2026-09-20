'use client';

import React, { useState } from 'react';
import { scenes } from '@/content/scenes';
import { SceneHeader } from '@/components/ui/SceneHeader';
import { JourneyLink } from '@/components/ui/JourneyLink';
import { SourceRef } from '@/components/ui/SourceRef';
import { useJourney } from '@/store/useJourney';
import { cn } from '@/lib/utils';
import type { HappinessCard } from '@/content/types';

interface StationHanhPhucProps {
  onAdvance?: () => void;
}

export function StationHanhPhuc({ onAdvance }: StationHanhPhucProps) {
  const data = scenes['hanh-phuc'];
  const cards: HappinessCard[] = (data.payload as any)?.happinessCards || [];
  const totalBudget = (data.payload as any)?.budget || 10;

  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const completeStation = useJourney((state) => state.completeStation);
  const unlockValue = useJourney((state) => state.unlockValue);

  // Calculate used budget
  const usedBudget = selectedCardIds.reduce((sum, id) => {
    const c = cards.find((card) => card.id === id);
    return sum + (c ? c.cost : 0);
  }, 0);

  const remainingBudget = totalBudget - usedBudget;

  const toggleCard = (card: HappinessCard) => {
    if (selectedCardIds.includes(card.id)) {
      setSelectedCardIds((prev) => prev.filter((id) => id !== card.id));
    } else {
      if (card.cost <= remainingBudget) {
        const next = [...selectedCardIds, card.id];
        setSelectedCardIds(next);
        if (next.length >= 3 || usedBudget + card.cost >= totalBudget - 1) {
          completeStation('hanh-phuc');
          unlockValue('hanh-phuc');
        }
      }
    }
  };

  // Tree growth levels
  const hasRoot = selectedCardIds.includes('com-an');
  const hasTrunk = selectedCardIds.includes('hoc-hanh');
  const hasBranch = selectedCardIds.includes('ao-mac') || selectedCardIds.includes('cho-o');
  const hasLeaf = selectedCardIds.includes('suc-khoe') || selectedCardIds.includes('tham-gia');
  const hasFlower = selectedCardIds.includes('pham-gia') && hasRoot && hasTrunk;

  const isReady = selectedCardIds.length >= 3;

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between select-none overflow-hidden lacquer-texture px-6 sm:px-12 lg:px-20 py-8 lg:py-12 border-r border-[#F5EFE3]/10">
      <SceneHeader
        index={3}
        kicker={data.kicker}
        accentColor="var(--hanhphuc-glow)"
      />

      <div className="grid-editorial w-full flex-1 items-center py-2">
        {/* Cột 1–5: Khối biên tập & Triết lý */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-start space-y-5 pr-0 lg:pr-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#9CC45A] uppercase block mb-1">
              MỤC TIÊU TỐI HẬU CỦA ĐỘC LẬP
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#9CC45A] tracking-tight drop-shadow-[0_0_24px_rgba(156,196,90,0.5)]">
              {data.title}
            </h2>
          </div>

          <div className="space-y-2 text-[#F5EFE3]/80 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-[#F5EFE3]">
              {data.lead?.[0]} {data.lead?.[1]}
            </p>
            <p className="text-xs sm:text-sm text-[#F5EFE3]/60 font-light">
              {data.instruction}
            </p>
          </div>

          {/* Ngân sách hiển thị tối giản */}
          <div className="p-3 border border-[#9CC45A]/40 bg-[#12190E]/40 w-full flex items-center justify-between">
            <span className="font-mono text-xs text-[#9CC45A] uppercase tracking-wider">
              NGUỒN LỰC QUỐC GIA (1945–1947)
            </span>
            <span className="font-mono text-sm font-bold text-[#9CC45A]">
              CÒN {remainingBudget} / {totalBudget} ĐƠN VỊ
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs pt-1">
            <SourceRef sourceId="nhiem-vu-cap-bach-1945" label="Nhiệm vụ cấp bách (3/9/1945)" />
            <SourceRef sourceId="kien-quoc-1946" label="Kế hoạch kiến quốc (10/1/1946)" />
          </div>
        </div>

        {/* Cột 6–12: Cây Hạnh Phúc & Lựa chọn thẻ */}
        <div className="col-span-12 lg:col-span-7 flex flex-col lg:flex-row items-center gap-6">
          {/* Cây Hạnh Phúc dạng SVG tối giản */}
          <div className="w-48 h-64 shrink-0 flex flex-col items-center justify-center relative select-none">
            <svg viewBox="0 0 160 220" className="w-full h-full overflow-visible">
              {/* Rễ cây: Cơm ăn (Diệt đói) */}
              <path
                d="M 80 190 Q 60 210 40 215 M 80 190 Q 100 210 120 215"
                stroke={hasRoot ? '#9CC45A' : '#33291F'}
                strokeWidth={hasRoot ? '4' : '2'}
                fill="none"
                className="transition-colors duration-500"
              />
              {/* Thân cây: Học hành (Diệt dốt) */}
              <line
                x1="80"
                y1="190"
                x2="80"
                y2="100"
                stroke={hasTrunk ? '#9CC45A' : '#33291F'}
                strokeWidth={hasTrunk ? '6' : '3'}
                className="transition-colors duration-500"
              />
              {/* Cành cây: Áo mặc & Chỗ ở */}
              <path
                d="M 80 140 Q 50 120 30 110 M 80 120 Q 110 100 130 90"
                stroke={hasBranch ? '#9CC45A' : '#33291F'}
                strokeWidth={hasBranch ? '3.5' : '2'}
                fill="none"
                className="transition-colors duration-500"
              />
              {/* Vòm lá: Sức khỏe & Tham gia xã hội */}
              <circle
                cx="80"
                cy="75"
                r="35"
                fill={hasLeaf ? 'rgba(156,196,90,0.15)' : 'none'}
                stroke={hasLeaf ? '#9CC45A' : '#33291F'}
                strokeWidth="1.5"
                strokeDasharray={hasLeaf ? 'none' : '3 3'}
                className="transition-colors duration-500"
              />
              {/* Hoa phẩm giá */}
              {hasFlower && (
                <circle
                  cx="80"
                  cy="40"
                  r="10"
                  fill="#FFE380"
                  stroke="#E3B341"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              )}
            </svg>
            <span className="font-mono text-[10px] text-[#F5EFE3]/50 mt-1">
              {hasFlower ? '🌸 CÂY TRỔ HOA PHẨM GIÁ' : hasRoot ? '🌱 CÂY ĐÃ CÓ RỄ VỮNG' : '• CHƯA ĐỦ RỄ'}
            </span>
          </div>

          {/* Danh sách các thẻ điều kiện hạnh phúc */}
          <div className="flex-1 space-y-2 w-full">
            {cards.map((card) => {
              const isSelected = selectedCardIds.includes(card.id);
              const canAfford = card.cost <= remainingBudget;

              return (
                <div
                  key={card.id}
                  onClick={() => toggleCard(card)}
                  className={cn(
                    'flex items-center justify-between p-2.5 sm:p-3 border transition-all duration-200 cursor-pointer',
                    isSelected
                      ? 'border-[#9CC45A] bg-[#12190E]/60 text-white'
                      : canAfford
                      ? 'border-[#F5EFE3]/10 hover:border-[#9CC45A]/50 bg-[#14110E]/30 text-[#F5EFE3]/70'
                      : 'border-[#F5EFE3]/5 opacity-30 cursor-not-allowed bg-transparent'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{card.emoji}</span>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[#F5EFE3]">
                        {card.label}
                      </div>
                      <div className="text-[10px] font-mono text-[#F5EFE3]/50">
                        {card.note}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#9CC45A] shrink-0 font-bold">
                    {card.cost} ĐV
                  </span>
                </div>
              );
            })}

            {isReady && data.transition && (
              <div className="pt-3 border-t border-[#9CC45A]/30 space-y-2 animate-in fade-in duration-300">
                <p className="font-serif italic text-xs sm:text-sm text-[#F5EFE3]/80">
                  {data.transition.prompt?.[0]} {data.transition.prompt?.[1]}
                </p>
                {data.transition.choices?.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedChoice(c.id)}
                    className="text-xs font-mono text-[#9CC45A] underline block pt-1"
                  >
                    {c.label} →
                  </button>
                ))}
                {selectedChoice && (
                  <p className="text-[11px] text-[#F5EFE3]/70">
                    {data.transition.choices?.[0]?.response}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-[#F5EFE3]/10">
        <span className="font-mono text-xs text-[#F5EFE3]/40">
          Chặng 3: Hạnh phúc là thước đo thực tế của Độc lập
        </span>

        {isReady && (
          <JourneyLink onClick={onAdvance} accent="hanhphuc">
            {data.cta || 'LÙI LẠI VÀ NHÌN TOÀN CẢNH'}
          </JourneyLink>
        )}
      </div>
    </section>
  );
}
