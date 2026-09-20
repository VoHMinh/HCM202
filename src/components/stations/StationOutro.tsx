'use client';

import React, { useEffect } from 'react';
import { scenes, PROJECT, THESIS } from '@/content/scenes';
import { SceneHeader } from '@/components/ui/SceneHeader';
import { JourneyLink } from '@/components/ui/JourneyLink';
import { useJourney } from '@/store/useJourney';

interface StationOutroProps {
  onRestart?: () => void;
}

const TIMELINE = [
  { year: '1919', event: 'Yêu sách nhân dân An Nam tại Versailles: Đòi các quyền tự do tối thiểu' },
  { year: '1941', event: 'Mặt trận Việt Minh: Đem lại cho đồng bào tự do và hạnh phúc' },
  { year: '1945', event: 'Tuyên ngôn Độc lập & Thư gửi UBND: Độc lập gắn liền hạnh phúc tự do' },
  { year: '1946', event: 'Kiến quốc: Làm cho dân có ăn, có mặc, có chỗ ở, có học hành' },
  { year: '1966', event: 'Kháng chiến: Không có gì quý hơn độc lập, tự do để xây dựng đất nước đàng hoàng hơn' },
];

export function StationOutro({ onRestart }: StationOutroProps) {
  const data = scenes.outro;
  const setSourceLibraryOpen = useJourney((state) => state.setSourceLibraryOpen);
  const completeStation = useJourney((state) => state.completeStation);

  useEffect(() => {
    completeStation('outro');
  }, [completeStation]);

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between select-none overflow-hidden lacquer-texture px-6 sm:px-12 lg:px-20 py-8 lg:py-12">
      <SceneHeader
        index={7}
        kicker={data.kicker}
        accentColor="var(--gold)"
      />

      <div className="grid-editorial w-full flex-1 items-center py-2">
        {/* Cột 1–6: Luận điểm kết bài */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-start space-y-5 pr-0 lg:pr-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#E3B341] uppercase block mb-1">
              HÀNH TRÌNH TƯ TƯỞNG
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#F5EFE3] tracking-tight">
              {data.title}
            </h2>
          </div>

          <div className="space-y-2 border-l-2 border-[#E3B341]/60 pl-4 py-1 text-[#F5EFE3]/90 text-sm sm:text-base font-sans">
            <p>{data.lead?.[0]}</p>
            <p>{data.lead?.[1]}</p>
            <p className="font-bold text-[#E3B341]">{data.lead?.[2]}</p>
          </div>

          <p className="text-xs text-[#F5EFE3]/60 font-sans leading-relaxed">
            {THESIS}
          </p>

          <div className="flex items-center gap-6 pt-2">
            <button
              type="button"
              onClick={() => setSourceLibraryOpen(true)}
              className="px-4 py-2 border border-[#E3B341] bg-[#E3B341]/10 text-xs font-mono font-bold text-[#E3B341] tracking-wider uppercase hover:bg-[#E3B341]/20 transition-colors"
            >
              Xem toàn bộ 8 văn kiện nguồn ↗
            </button>

            <JourneyLink onClick={onRestart} accent="default">
              QUAY LẠI TỪ ĐẦU
            </JourneyLink>
          </div>
        </div>

        {/* Cột 7–12: Dòng thời gian 1919–1966 */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center space-y-4 pt-4 lg:pt-0">
          <span className="font-mono text-[11px] text-[#F5EFE3]/50 uppercase tracking-widest">
            TRỤC THỜI GIAN VĂN KIỆN (1919–1966)
          </span>

          <div className="space-y-3">
            {TIMELINE.map((t) => (
              <div
                key={t.year}
                className="flex items-start gap-4 pb-2 border-b border-[#F5EFE3]/10"
              >
                <span className="font-mono text-sm font-bold text-[#E3B341] shrink-0 pt-0.5">
                  {t.year}
                </span>
                <p className="text-xs sm:text-sm text-[#F5EFE3]/80 font-sans">
                  {t.event}
                </p>
              </div>
            ))}
          </div>

          {/* Thông tin tín chỉ học phần */}
          <div className="pt-2 text-[11px] font-mono text-[#F5EFE3]/40 space-y-1">
            <div>• {PROJECT.courseCode}</div>
            <div>• Căn cứ: Hồ Chí Minh Toàn tập, NXB Chính trị quốc gia Sự thật (2011)</div>
            <div>• {PROJECT.scopeNote}</div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-[#F5EFE3]/10">
        <span className="font-mono text-xs text-[#F5EFE3]/40">
          Sản phẩm sáng tạo HCM202 · Ba Giá Trị — Một Hành Trình
        </span>
        <span className="font-mono text-xs text-[#E3B341]">
          HOÀN THÀNH TOÀN BỘ LỘ TRÌNH ★
        </span>
      </div>
    </section>
  );
}
