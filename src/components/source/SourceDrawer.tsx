'use client';

import React from 'react';
import { useJourney } from '@/store/useJourney';
import { sources } from '@/content/scenes';
import { layers } from '@/content/scenes';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

export function SourceDrawer() {
  const openSourceId = useJourney((state) => state.openSourceId);
  const setOpenSourceId = useJourney((state) => state.setOpenSourceId);
  const isSourceLibraryOpen = useJourney((state) => state.isSourceLibraryOpen);
  const setSourceLibraryOpen = useJourney((state) => state.setSourceLibraryOpen);

  const activeSource = sources.find((s) => s.id === openSourceId);
  const isOpen = Boolean(openSourceId || isSourceLibraryOpen);

  const handleClose = () => {
    setOpenSourceId(null);
    setSourceLibraryOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
    >
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Side drawer panel */}
      <aside className="relative z-10 w-full max-w-2xl h-full bg-[#0E0C0A] border-l border-[#F5EFE3]/15 overflow-y-auto px-6 sm:px-12 py-10 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Top header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#F5EFE3]/10">
            <span className="font-mono text-xs tracking-[0.25em] text-[#E3B341] uppercase">
              {isSourceLibraryOpen ? 'THƯ MỤC NGUỒN TRỰC TIẾP' : 'TƯ LIỆU GỐC & CĂN CỨ'}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-[#F5EFE3]/60 hover:text-[#F5EFE3] transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Single source view */}
          {activeSource && !isSourceLibraryOpen && (
            <div className="mt-8 space-y-8">
              <div>
                <span className="font-mono text-xs text-[#E3B341] tracking-widest uppercase block mb-1">
                  Năm {activeSource.year} • {layers[activeSource.layer].label}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5EFE3] leading-tight">
                  {activeSource.title}
                </h2>
                <p className="font-mono text-xs text-[#F5EFE3]/50 mt-1">
                  {activeSource.publication}
                </p>
              </div>

              {/* Nguyên văn trích dẫn */}
              <div className="border-l-2 border-[#E3B341]/60 pl-5 py-1">
                <span className="font-mono text-[11px] text-[#E3B341]/70 tracking-widest uppercase block mb-2">
                  Nguyên văn trích dẫn
                </span>
                <blockquote className="font-serif italic text-lg sm:text-xl text-[#F5EFE3] leading-relaxed">
                  “{activeSource.quote}”
                </blockquote>
              </div>

              {/* Diễn giải học thuật */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] text-[#F5EFE3]/50 tracking-widest uppercase block">
                  Ý nghĩa đối với lập luận
                </span>
                <p className="text-sm sm:text-base text-[#F5EFE3]/80 leading-relaxed font-sans">
                  {activeSource.gloss}
                </p>
              </div>

              {/* Xuất xứ & Xác minh */}
              <div className="pt-6 border-t border-[#F5EFE3]/10 space-y-2 text-xs">
                <div className="font-mono text-[#F5EFE3]/50">
                  Xuất xứ: <span className="text-[#F5EFE3]/80">{activeSource.citation}</span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  {activeSource.verified ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5" /> Đã đối chiếu Hồ Chí Minh Toàn tập (2011)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-amber-400/90 font-mono text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5" /> Bản khảo sát tư liệu (Cần đối chiếu số tập/trang trước khi nộp)
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Full library view */}
          {isSourceLibraryOpen && (
            <div className="mt-8 space-y-8">
              <p className="text-sm text-[#F5EFE3]/70 font-sans">
                Toàn bộ 8 văn kiện và phát biểu trực tiếp được đối chiếu trong hành trình tư tưởng:
              </p>
              <div className="space-y-6">
                {sources.map((s) => (
                  <div
                    key={s.id}
                    className="pb-6 border-b border-[#F5EFE3]/10 space-y-2"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-base font-bold text-[#F5EFE3]">
                        {s.title}
                      </h3>
                      <span className="font-mono text-xs text-[#E3B341] shrink-0">
                        {s.year}
                      </span>
                    </div>
                    <blockquote className="font-serif italic text-sm text-[#F5EFE3]/90 pl-3 border-l border-[#E3B341]/40">
                      “{s.quote}”
                    </blockquote>
                    <p className="text-xs text-[#F5EFE3]/60">{s.gloss}</p>
                    <p className="font-mono text-[11px] text-[#F5EFE3]/40">{s.citation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 mt-8 border-t border-[#F5EFE3]/10 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="font-mono text-xs uppercase tracking-widest text-[#F5EFE3]/60 hover:text-[#F5EFE3] transition-colors"
          >
            Đóng [Esc]
          </button>
        </div>
      </aside>
    </div>
  );
}
