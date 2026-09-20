'use client';

import React, { useState } from 'react';
import { scenes } from '@/content/scenes';
import { SceneHeader } from '@/components/ui/SceneHeader';
import { JourneyLink } from '@/components/ui/JourneyLink';
import { SourceRef } from '@/components/ui/SourceRef';
import { useJourney } from '@/store/useJourney';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StationDocLapProps {
  onAdvance?: () => void;
}

export function StationDocLap({ onAdvance }: StationDocLapProps) {
  const data = scenes['doc-lap'];
  const rows = (data.payload as any)?.decisionRows || [];
  const [transferred, setTransferred] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const completeStation = useJourney((state) => state.completeStation);
  const unlockValue = useJourney((state) => state.unlockValue);

  const toggleRow = (id: string) => {
    if (transferred.includes(id)) {
      setTransferred((prev) => prev.filter((item) => item !== id));
    } else {
      const next = [...transferred, id];
      setTransferred(next);
      if (next.length === rows.length) {
        completeStation('doc-lap');
        unlockValue('doc-lap');
      }
    }
  };

  const isAllTransferred = transferred.length === rows.length;

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between select-none overflow-hidden lacquer-texture px-6 sm:px-12 lg:px-20 py-8 lg:py-12 border-r border-[#F5EFE3]/10">
      {/* Header bar */}
      <SceneHeader
        index={1}
        kicker={data.kicker}
        accentColor="var(--doclap-glow)"
      />

      <div className="grid-editorial w-full flex-1 items-center py-4">
        {/* Cột 1–5: Khối biên tập tư tưởng */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-start space-y-6 pr-0 lg:pr-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#FF4D62] uppercase block mb-1">
              CHỦ QUYỀN DÂN TỘC
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#FF4D62] tracking-tight drop-shadow-[0_0_24px_rgba(200,16,46,0.6)]">
              {data.title}
            </h2>
          </div>

          <div className="space-y-2 text-[#F5EFE3]/80 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-[#F5EFE3]">
              {data.lead?.[0]}
            </p>
            <p className="text-xs sm:text-sm text-[#F5EFE3]/60 font-light">
              {data.instruction}
            </p>
          </div>

          {/* Định nghĩa học thuật */}
          <div className="border-l-2 border-[#FF4D62]/60 pl-4 py-1 text-xs sm:text-sm text-[#F5EFE3]/70 italic font-serif">
            “{data.definition?.body}”
          </div>

          {/* Nguồn căn cứ */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs pt-2">
            <SourceRef sourceId="viet-minh-1941" label="Chương trình Việt Minh (1941)" />
            <SourceRef sourceId="tuyen-ngon-1945" label="Tuyên ngôn Độc lập (1945)" />
          </div>
        </div>

        {/* Cột 6–12: 5 Quyền lực tối cao cần chuyển giao */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-3 pt-6 lg:pt-0">
          <div className="flex items-center justify-between text-xs font-mono text-[#F5EFE3]/50 pb-2 border-b border-[#F5EFE3]/10">
            <span>QUYỀN LỰC TỐI CAO CỦA QUỐC GIA</span>
            <span>{transferred.length}/{rows.length} ĐÃ CHUYỂN GIAO</span>
          </div>

          {rows.map((row: any) => {
            const isDone = transferred.includes(row.id);
            return (
              <div
                key={row.id}
                onClick={() => toggleRow(row.id)}
                className={cn(
                  'group flex items-center justify-between p-3.5 sm:p-4 border transition-all duration-300 cursor-pointer',
                  isDone
                    ? 'border-[#FF4D62]/70 bg-[#1A0A0E]/50'
                    : 'border-[#F5EFE3]/10 hover:border-[#F5EFE3]/30 bg-[#14110E]/30'
                )}
              >
                <div className="space-y-1 pr-4">
                  <div className="text-xs sm:text-sm font-semibold text-[#F5EFE3] group-hover:text-white">
                    {row.question}
                  </div>
                  <div className="text-[11px] font-mono text-[#F5EFE3]/50">
                    {row.note}
                  </div>
                </div>

                {/* Nút đóng dấu chủ quyền */}
                <button
                  type="button"
                  className={cn(
                    'shrink-0 flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-all duration-300',
                    isDone
                      ? 'bg-[#FF4D62] text-white font-bold shadow-[0_0_12px_rgba(255,77,98,0.7)]'
                      : 'border border-[#F5EFE3]/20 text-[#F5EFE3]/60 group-hover:border-[#FF4D62]/60 group-hover:text-[#FF4D62]'
                  )}
                >
                  {isDone ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>NHÂN DÂN</span>
                    </>
                  ) : (
                    <span>ĐÓNG DẤU</span>
                  )}
                </button>
              </div>
            );
          })}

          {/* Khi hoàn thành: Mở câu hỏi chuyển tiếp biện chứng */}
          {isAllTransferred && data.transition && (
            <div className="pt-4 border-t border-[#FF4D62]/30 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="font-serif italic text-sm sm:text-base text-[#F5EFE3]/90">
                {data.transition.prompt?.[1]} <span className="text-[#FF4D62] font-semibold">{data.transition.prompt?.[2]}</span>
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
                        ? 'border-[#FF4D62] bg-[#FF4D62]/20 text-white'
                        : 'border-[#F5EFE3]/20 text-[#F5EFE3]/70 hover:border-[#FF4D62]/50'
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
      </div>

      {/* Chân trang hành trình */}
      <div className="w-full flex items-center justify-between pt-4 border-t border-[#F5EFE3]/10">
        <span className="font-mono text-xs text-[#F5EFE3]/40">
          Chặng 1: Hoàn thành để lại vệt sáng đỏ trên con đường
        </span>

        {isAllTransferred && (
          <JourneyLink onClick={onAdvance} accent="doclap">
            {data.cta || 'MỞ CÁNH CỬA THỨ HAI'}
          </JourneyLink>
        )}
      </div>
    </section>
  );
}
