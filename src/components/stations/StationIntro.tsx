'use client';

import React from 'react';
import { scenes, PROJECT } from '@/content/scenes';
import { ValueTitle } from '@/components/ui/ValueTitle';
import { JourneyLink } from '@/components/ui/JourneyLink';
import { SourceRef } from '@/components/ui/SourceRef';
import { useJourney } from '@/store/useJourney';

interface StationIntroProps {
  onAdvance?: () => void;
}

export function StationIntro({ onAdvance }: StationIntroProps) {
  const intro = scenes.intro;
  const setSourceLibraryOpen = useJourney((state) => state.setSourceLibraryOpen);

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex items-center select-none overflow-hidden lacquer-texture paper-grain">
      <div className="grid-editorial w-full items-center py-12">
        {/* Cột 1–7: Khối biên tập chính */}
        <div className="col-span-12 lg:col-span-7 flex flex-col items-start space-y-6 lg:space-y-8 pr-0 lg:pr-8">
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E3B341] uppercase">
              {PROJECT.courseCode}
            </span>
            <div className="h-[1px] w-24 bg-[#E3B341]/40" />
          </div>

          {/* Ba đại tự xếp chồng, mặc định xám, rê chuột bừng sáng */}
          <div className="space-y-2">
            <ValueTitle />
          </div>

          {/* Đoạn văn dẫn nhập - font serif & sans */}
          <div className="space-y-3 max-w-xl text-[#F5EFE3]/80 text-sm sm:text-base leading-relaxed font-sans">
            <p className="font-light">{intro.lead?.[0]}</p>
            <p className="font-serif italic text-[#F5EFE3]/90 text-base sm:text-lg">
              {intro.lead?.[1]}
            </p>
            <p className="text-[#E3B341] font-medium pt-1">
              {intro.lead?.[4]}
            </p>
          </div>

          {/* Dẫn nguồn trực tiếp: Sắc lệnh 49 */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#F5EFE3]/60">
            <span>Căn cứ pháp lý tiêu ngữ:</span>
            <SourceRef sourceId="sac-lenh-49" label="Sắc lệnh số 49 (12/10/1945)" />
          </div>

          {/* Hành động CTA: chữ hoa gạch chân chạy */}
          <div className="pt-4 flex items-center gap-8">
            <JourneyLink onClick={onAdvance} accent="gold">
              BẮT ĐẦU HÀNH TRÌNH
            </JourneyLink>

            <button
              type="button"
              onClick={() => setSourceLibraryOpen(true)}
              className="text-xs font-mono text-[#F5EFE3]/50 hover:text-[#E3B341] transition-colors border-b border-dotted border-[#F5EFE3]/30 pb-0.5"
            >
              Thư mục nguồn (8 văn kiện)
            </button>
          </div>
        </div>

        {/* Cột 8–12: Bố cục bất đối xứng - Trục thông tin chiêm nghiệm */}
        <div className="hidden lg:flex col-span-5 flex-col justify-center border-l border-[#F5EFE3]/10 pl-12 space-y-8">
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#F5EFE3]/40 block">
              Ý niệm thiết kế
            </span>
            <blockquote className="font-serif italic text-xl text-[#F5EFE3]/75 leading-relaxed">
              “Nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì.”
            </blockquote>
            <span className="font-mono text-xs text-[#E3B341]/80 block">
              — Hồ Chí Minh, 17/10/1945
            </span>
          </div>

          <div className="editorial-line-left" />

          <div className="space-y-2 text-xs font-mono text-[#F5EFE3]/50">
            <div>• Hình thức: Visual Essay & Meaning Map tương tác</div>
            <div>• Thời lượng dự kiến: 6–8 phút</div>
            <div>• Thao tác: Cuộn chuột dọc để đưa camera lướt theo con đường</div>
          </div>
        </div>
      </div>
    </section>
  );
}
