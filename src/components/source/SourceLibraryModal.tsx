'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useJourney } from '@/store/useJourney';
import { sources, layers, PROJECT } from '@/content/scenes';
import { X, BookOpen, ExternalLink, Calendar, Bookmark, AlertCircle } from 'lucide-react';

export function SourceLibraryModal() {
  const isOpen = useJourney((state) => state.isSourceLibraryOpen);
  const setOpen = useJourney((state) => state.setSourceLibraryOpen);
  const setOpenSourceId = useJourney((state) => state.setOpenSourceId);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 animate-fadeIn" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[90vh] w-[95vw] max-w-4xl translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-2xl border border-[#33291F] bg-[#14110E] p-6 sm:p-8 shadow-2xl focus:outline-none text-[#F5EFE3]">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#33291F] pb-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#E3B341] font-semibold mb-1">
                {PROJECT.courseCode} · Thư mục tư liệu
              </div>
              <Dialog.Title className="text-2xl sm:text-3xl font-bold text-[#F5EFE3]">
                Thư mục 8 Nguồn Trực tiếp
              </Dialog.Title>
              <Dialog.Description className="text-sm text-[#F5EFE3]/70 mt-1">
                Các văn kiện, bài phát biểu và sắc lệnh gốc được trích dẫn trong hành trình.
                Đối chiếu theo <em>Hồ Chí Minh Toàn tập</em> (NXB Chính trị quốc gia Sự thật, 2011).
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                className="rounded-full p-2 text-[#F5EFE3]/60 hover:text-[#F5EFE3] hover:bg-[#1F1A15] transition-colors"
                aria-label="Đóng"
              >
                <X className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </div>

          {/* Academic disclaimer */}
          <div className="mt-4 p-4 rounded-xl bg-[#1F1A15] border border-[#33291F] flex items-start gap-3 text-xs text-[#F5EFE3]/75">
            <AlertCircle className="w-5 h-5 text-[#E3B341] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#E3B341]">Phạm vi & Giới hạn học thuật: </strong>
              {PROJECT.scopeNote}
            </div>
          </div>

          {/* Source List */}
          <div className="mt-6 space-y-4">
            {sources.map((source, index) => {
              const layer = layers[source.layer];
              return (
                <div
                  key={source.id}
                  onClick={() => {
                    setOpen(false);
                    setOpenSourceId(source.id);
                  }}
                  className="group p-4 sm:p-5 rounded-xl bg-[#0B0A09] border border-[#33291F] hover:border-[#E3B341]/60 
                    hover:bg-[#1F1A15]/60 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#E3B341] bg-[#1F1A15] px-2 py-0.5 rounded border border-[#33291F]">
                        #{index + 1} · {source.year}
                      </span>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor:
                            source.layer === 'political'
                              ? 'rgba(200, 16, 46, 0.15)'
                              : source.layer === 'social'
                              ? 'rgba(127, 200, 216, 0.15)'
                              : 'rgba(156, 196, 90, 0.15)',
                          color:
                            source.layer === 'political'
                              ? 'var(--doclap-glow)'
                              : source.layer === 'social'
                              ? 'var(--tudo-glow)'
                              : 'var(--hanhphuc-glow)',
                        }}
                      >
                        Tầng {layer.label}
                      </span>
                      <span className="text-xs text-[#F5EFE3]/50 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {source.date || source.year}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-[#F5EFE3] group-hover:text-[#E3B341] transition-colors">
                      {source.title}
                    </h4>

                    <p className="text-sm font-quote text-[#F5EFE3]/80 line-clamp-2 italic">
                      “{source.quote}”
                    </p>

                    <div className="text-xs text-[#F5EFE3]/50 flex items-center gap-1 font-mono pt-1">
                      <Bookmark className="w-3 h-3 text-[#E3B341]" />
                      <span>{source.citation}</span>
                    </div>
                  </div>

                  <div className="self-end sm:self-center shrink-0 flex items-center gap-1.5 text-xs text-[#E3B341] font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Xem chi tiết</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
