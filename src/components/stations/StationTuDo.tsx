'use client';

import React, { useState } from 'react';
import { scenes } from '@/content/scenes';
import { SceneHeader } from '@/components/ui/SceneHeader';
import { JourneyLink } from '@/components/ui/JourneyLink';
import { SourceRef } from '@/components/ui/SourceRef';
import { useJourney } from '@/store/useJourney';
import { cn } from '@/lib/utils';
import type { RightCard, RightGroup } from '@/content/types';

interface StationTuDoProps {
  onAdvance?: () => void;
}

export function StationTuDo({ onAdvance }: StationTuDoProps) {
  const data = scenes['tu-do'];
  const groups: RightGroup[] = (data.payload as any)?.rightGroups || [];
  const cards: RightCard[] = (data.payload as any)?.rightCards || [];

  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [hint, setHint] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const completeStation = useJourney((state) => state.completeStation);
  const unlockValue = useJourney((state) => state.unlockValue);

  const currentCard = cards[activeCardIndex];

  const handleAssign = (groupId: string) => {
    if (!currentCard) return;

    if (currentCard.group === groupId) {
      // Đúng nhóm
      setHint(null);
      const nextAssignments = { ...assignments, [currentCard.id]: groupId };
      setAssignments(nextAssignments);

      if (activeCardIndex + 1 < cards.length) {
        setActiveCardIndex((prev) => prev + 1);
      } else {
        completeStation('tu-do');
        unlockValue('tu-do');
      }
    } else {
      // Sai nhóm -> Hiển thị misplace hint
      setHint(currentCard.misplaceHint || 'Chưa đúng nhóm, hãy thử lại.');
    }
  };

  const isCompleted = Object.keys(assignments).length === cards.length;

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between select-none overflow-hidden lacquer-texture px-6 sm:px-12 lg:px-20 py-8 lg:py-12 border-r border-[#F5EFE3]/10">
      <SceneHeader
        index={2}
        kicker={data.kicker}
        accentColor="var(--tudo-glow)"
      />

      <div className="grid-editorial w-full flex-1 items-center py-2">
        {/* Cột 1–5: Hồ sơ công dân & Lập luận */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-start space-y-5 pr-0 lg:pr-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#7FC8D8] uppercase block mb-1">
              QUYỀN LÀM CHỦ CỦA CÔNG DÂN
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#7FC8D8] tracking-tight drop-shadow-[0_0_24px_rgba(127,200,216,0.5)]">
              {data.title}
            </h2>
          </div>

          {/* Hồ sơ Bà Tám - Nét bút biên tập lịch sử */}
          <div className="border-l-2 border-[#7FC8D8]/50 pl-4 py-2 space-y-2 bg-[#14110E]/40 pr-3">
            <span className="font-mono text-[11px] text-[#7FC8D8] uppercase tracking-wider block">
              HỒ SƠ CÔNG DÂN SỐ 01 (NĂM 1945)
            </span>
            <p className="font-serif italic text-base text-[#F5EFE3]/90">
              “{data.lead?.[1]}”
            </p>
            <p className="text-xs text-[#F5EFE3]/70 font-sans">
              {data.lead?.[2]}
            </p>
          </div>

          <div className="text-xs sm:text-sm text-[#F5EFE3]/70 font-light space-y-1">
            <p>{data.instruction}</p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs pt-1">
            <SourceRef sourceId="yeu-sach-1919" label="Yêu sách của nhân dân An Nam (1919)" />
            <SourceRef sourceId="tuyen-ngon-1945" label="Tuyên ngôn Độc lập (1945)" />
          </div>
        </div>

        {/* Cột 6–12: Khu vực tương tác phân loại quyền */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-5">
          {!isCompleted && currentCard && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#F5EFE3]/50">
                <span>PHÂN LOẠI THẺ QUYỀN</span>
                <span>{activeCardIndex + 1} / {cards.length} THẺ</span>
              </div>

              {/* Thẻ quyền hiện tại đang xuất hiện */}
              <div className="p-5 border border-[#7FC8D8]/40 bg-[#0E1719]/40 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentCard.emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F5EFE3]">
                    {currentCard.label}
                  </h3>
                </div>
                <p className="text-xs text-[#F5EFE3]/60">
                  Xếp tấm thẻ này vào nhóm quyền nào tương ứng?
                </p>
              </div>

              {/* Hint nếu nhầm */}
              {hint && (
                <div className="text-xs font-mono text-amber-300/90 border-l-2 border-amber-400/80 pl-3 py-1">
                  {hint}
                </div>
              )}

              {/* 3 Nhóm quyền bấm chọn */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {groups.map((grp) => (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => handleAssign(grp.id)}
                    className="flex flex-col text-left p-3.5 border border-[#F5EFE3]/15 hover:border-[#7FC8D8]/70 hover:bg-[#7FC8D8]/10 transition-all duration-200"
                  >
                    <span className="font-mono text-xs font-bold text-[#7FC8D8] mb-1">
                      {grp.label}
                    </span>
                    <span className="text-[11px] text-[#F5EFE3]/50">
                      {grp.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Khi phân loại xong toàn bộ 10 thẻ */}
          {isCompleted && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="p-4 border border-[#7FC8D8]/40 bg-[#7FC8D8]/5 text-xs text-[#7FC8D8] font-mono">
                ✓ ĐÃ PHÂN LOẠI XONG 10 QUYỀN CƠ BẢN CỦA CÔNG DÂN
              </div>

              {data.transition && (
                <div className="space-y-3 pt-2">
                  <p className="font-serif italic text-sm sm:text-base text-[#F5EFE3]/90">
                    {data.transition.prompt?.[0]} {data.transition.prompt?.[1]}{' '}
                    <span className="text-[#7FC8D8] font-semibold">
                      {data.transition.prompt?.[2]}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {data.transition.choices?.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedChoice(c.id)}
                        className={cn(
                          'px-4 py-2 text-xs font-mono tracking-wider transition-colors border',
                          selectedChoice === c.id
                            ? 'border-[#7FC8D8] bg-[#7FC8D8]/20 text-white'
                            : 'border-[#F5EFE3]/20 text-[#F5EFE3]/70 hover:border-[#7FC8D8]/50'
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>

                  {selectedChoice && (
                    <div className="text-xs text-[#F5EFE3]/80 pt-1 font-sans">
                      {data.transition.choices?.find((c) => c.id === selectedChoice)?.response}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-[#F5EFE3]/10">
        <span className="font-mono text-xs text-[#F5EFE3]/40">
          Chặng 2: Quyền trên giấy phải thành quyền trong đời sống
        </span>

        {isCompleted && (
          <JourneyLink onClick={onAdvance} accent="tudo">
            {data.cta || 'ĐI TIẾP'}
          </JourneyLink>
        )}
      </div>
    </section>
  );
}
