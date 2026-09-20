'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useJourney } from '@/store/useJourney';
import { sourceById, layers } from '@/content/scenes';
import { X, BookOpen, AlertCircle, Calendar, MapPin, Bookmark } from 'lucide-react';

export function SourceCard() {
  const openSourceId = useJourney((state) => state.openSourceId);
  const setOpenSourceId = useJourney((state) => state.setOpenSourceId);

  const source = openSourceId ? sourceById[openSourceId] : null;
  const layerInfo = source ? layers[source.layer] : null;

  return (
    <Dialog.Root open={!!source} onOpenChange={(open) => !open && setOpenSourceId(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 animate-fadeIn" />
        <Dialog.Content
          className="fixed left-[50%] top-[50%] z-50 max-h-[88vh] w-[92vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] 
            overflow-y-auto rounded-2xl border border-[#33291F] bg-[#14110E] p-6 shadow-2xl focus:outline-none 
            text-[#F5EFE3] animate-scaleIn border-t-2"
          style={{
            borderTopColor:
              source?.layer === 'political'
                ? 'var(--doclap)'
                : source?.layer === 'social'
                ? 'var(--tudo)'
                : 'var(--hanhphuc)',
          }}
        >
          {source && (
            <div className="space-y-5">
              {/* Header: Layer badge & close button */}
              <div className="flex items-start justify-between gap-4 border-b border-[#33291F] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor:
                          source.layer === 'political'
                            ? 'rgba(200, 16, 46, 0.2)'
                            : source.layer === 'social'
                            ? 'rgba(127, 200, 216, 0.2)'
                            : 'rgba(156, 196, 90, 0.2)',
                        color:
                          source.layer === 'political'
                            ? 'var(--doclap-glow)'
                            : source.layer === 'social'
                            ? 'var(--tudo-glow)'
                            : 'var(--hanhphuc-glow)',
                        border:
                          source.layer === 'political'
                            ? '1px solid rgba(200, 16, 46, 0.4)'
                            : source.layer === 'social'
                            ? '1px solid rgba(127, 200, 216, 0.4)'
                            : '1px solid rgba(156, 196, 90, 0.4)',
                      }}
                    >
                      Tầng {layerInfo?.label || source.layer} · {layerInfo?.subject}
                    </span>
                    <span className="text-xs text-[#F5EFE3]/50 font-mono">#{source.id}</span>
                  </div>
                  <Dialog.Title className="text-xl sm:text-2xl font-bold text-[#F5EFE3] pt-1">
                    {source.title}
                  </Dialog.Title>
                </div>

                <Dialog.Close asChild>
                  <button
                    className="rounded-full p-2 text-[#F5EFE3]/60 hover:text-[#F5EFE3] hover:bg-[#1F1A15] transition-colors"
                    aria-label="Đóng"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </div>

              {/* 5 fixed lines specification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-[#1F1A15]/70 border border-[#33291F]/60 text-sm">
                <div className="flex items-center gap-2 text-[#F5EFE3]/80">
                  <Calendar className="w-4 h-4 text-[#E3B341] shrink-0" />
                  <span>
                    <strong className="text-[#F5EFE3]/50 font-normal">Ngày tháng: </strong>
                    <span className="font-semibold text-[#F5EFE3]">{source.date || source.year}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#F5EFE3]/80">
                  <MapPin className="w-4 h-4 text-[#E3B341] shrink-0" />
                  <span className="truncate">
                    <strong className="text-[#F5EFE3]/50 font-normal">Nơi công bố: </strong>
                    <span className="text-[#F5EFE3]">{source.publication}</span>
                  </span>
                </div>
              </div>

              {/* Quote box - Serif italic, in quotes */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#E3B341] uppercase tracking-wider font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <span>Trích dẫn nguyên văn văn kiện gốc</span>
                </div>
                <blockquote className="p-4 rounded-xl bg-[#0B0A09] border-l-4 border-[#E3B341] text-[#F5EFE3] text-base sm:text-lg leading-relaxed font-quote">
                  “{source.quote}”
                </blockquote>
              </div>

              {/* Group commentary - Sans-serif regular */}
              {source.gloss && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs text-[#F5EFE3]/50 uppercase tracking-wider font-semibold">
                    Diễn giải của nhóm nghiên cứu
                  </div>
                  <p className="text-sm sm:text-base text-[#F5EFE3]/85 leading-relaxed font-sans">
                    {source.gloss}
                  </p>
                </div>
              )}

              {/* Citation & Academic Verification Notice */}
              <div className="border-t border-[#33291F] pt-4 space-y-3">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#F5EFE3]/70 font-mono">
                  <Bookmark className="w-4 h-4 text-[#E3B341] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#F5EFE3]/40">Dẫn nguồn: </span>
                    <span className="text-[#E3B341]/90">{source.citation}</span>
                  </div>
                </div>

                {!source.verified && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-[#C8102E]/10 border border-[#C8102E]/30 text-xs text-[#FF4D62]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Lưu ý học thuật:</strong> Nguồn này cần đối chiếu lại số tập/số trang cụ thể với{' '}
                      <em>Hồ Chí Minh Toàn tập</em> (bộ 15 tập, NXB Chính trị quốc gia Sự thật, 2011) trước khi nộp sản phẩm chính thức.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
