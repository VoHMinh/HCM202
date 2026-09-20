'use client';

import React, { useState } from 'react';
import { scenes } from '@/content/scenes';
import { SceneHeader } from '@/components/ui/SceneHeader';
import { JourneyLink } from '@/components/ui/JourneyLink';
import { SourceRef } from '@/components/ui/SourceRef';
import { useJourney } from '@/store/useJourney';
import { cn } from '@/lib/utils';
import type { QuizItem, ValueId } from '@/content/types';

interface StationQuizProps {
  onAdvance?: () => void;
}

const VALUES: { id: ValueId; label: string; accent: string }[] = [
  { id: 'doc-lap', label: 'ĐỘC LẬP', accent: '#FF4D62' },
  { id: 'tu-do', label: 'TỰ DO', accent: '#7FC8D8' },
  { id: 'hanh-phuc', label: 'HẠNH PHÚC', accent: '#9CC45A' },
];

export function StationQuiz({ onAdvance }: StationQuizProps) {
  const data = scenes['missing-value'];
  const quizList: QuizItem[] = (data.payload as any)?.quizItems || [];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedValues, setSelectedValues] = useState<ValueId[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [solvedCount, setSolvedCount] = useState<number>(0);

  const completeStation = useJourney((state) => state.completeStation);
  const currentQuiz = quizList[currentIdx];

  const handleToggleValue = (valId: ValueId) => {
    if (selectedValues.includes(valId)) {
      setSelectedValues((prev) => prev.filter((id) => id !== valId));
    } else {
      setSelectedValues((prev) => [...prev, valId]);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentQuiz) return;

    // Check if selectedValues match currentQuiz.answerIds
    const expected = currentQuiz.answerIds;
    const isMatch =
      selectedValues.length === expected.length &&
      selectedValues.every((val) => expected.includes(val));

    if (isMatch) {
      setFeedback({ isCorrect: true, text: currentQuiz.explanation });
      const nextSolved = solvedCount + 1;
      setSolvedCount(nextSolved);

      if (nextSolved === quizList.length) {
        completeStation('missing-value');
      }
    } else {
      setFeedback({
        isCorrect: false,
        text: currentQuiz.nudge || 'Chưa hoàn toàn chính xác. Hãy suy nghĩ về chủ thể và điều kiện cốt lõi.',
      });
    }
  };

  const handleNextQuiz = () => {
    setFeedback(null);
    setSelectedValues([]);
    if (currentIdx + 1 < quizList.length) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const isAllSolved = solvedCount === quizList.length;

  return (
    <section className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between select-none overflow-hidden lacquer-texture px-6 sm:px-12 lg:px-20 py-8 lg:py-12 border-r border-[#F5EFE3]/10">
      <SceneHeader
        index={5}
        kicker={data.kicker}
        accentColor="var(--gold)"
      />

      <div className="grid-editorial w-full flex-1 items-center py-2">
        {/* Cột 1–5: Khối đề bài & Bối cảnh logic */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-start space-y-5 pr-0 lg:pr-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#E3B341] uppercase block mb-1">
              BÀI TẬP LOGIC BIỆN CHỨNG
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#F5EFE3] tracking-tight">
              {data.title}
            </h2>
          </div>

          <p className="font-mono text-xs text-[#F5EFE3]/50 border-l border-[#F5EFE3]/20 pl-3">
            {data.lead?.[0]}
          </p>

          <p className="text-xs sm:text-sm text-[#F5EFE3]/80 font-sans leading-relaxed">
            {data.instruction}
          </p>

          <div className="text-xs pt-1">
            <SourceRef sourceId="thu-ubnd-1945" label="Thư gửi UBND các cấp (17/10/1945)" />
          </div>
        </div>

        {/* Cột 6–12: Khu vực tình huống & Lựa chọn giá trị còn thiếu */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#F5EFE3]/50 pb-2 border-b border-[#F5EFE3]/10">
            <span>TÌNH HUỐNG THỬ THÁCH</span>
            <span>{currentIdx + 1} / {quizList.length}</span>
          </div>

          {currentQuiz && (
            <div className="p-6 border border-[#F5EFE3]/20 bg-[#14110E]/50 space-y-4">
              <span className="font-mono text-[11px] text-[#E3B341] tracking-widest uppercase block">
                TÌNH HUỐNG SỐ 0{currentIdx + 1}
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#F5EFE3] leading-relaxed">
                “{currentQuiz.situation}”
              </p>
            </div>
          )}

          {/* 3 Viên đá giá trị để người dùng bấm chọn */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#F5EFE3]/60">
              Chọn một hoặc nhiều giá trị còn thiếu trong tình huống trên:
            </div>

            <div className="grid grid-cols-3 gap-3">
              {VALUES.map((val) => {
                const isSelected = selectedValues.includes(val.id);
                return (
                  <button
                    key={val.id}
                    type="button"
                    onClick={() => handleToggleValue(val.id)}
                    className={cn(
                      'py-3 px-4 border text-center font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200',
                      isSelected
                        ? 'border-[#E3B341] bg-[#E3B341]/20 text-white shadow-[0_0_14px_rgba(227,179,65,0.4)]'
                        : 'border-[#F5EFE3]/15 text-[#F5EFE3]/60 hover:border-[#F5EFE3]/40 hover:text-[#F5EFE3]'
                    )}
                  >
                    {val.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Nút kiểm tra / tiếp tục */}
          <div className="space-y-3 pt-2">
            {!feedback && (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={selectedValues.length === 0}
                className="px-6 py-2.5 bg-[#E3B341] text-[#0B0A09] font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#FFE380] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                XÁC NHẬN CHẨN ĐOÁN
              </button>
            )}

            {feedback && (
              <div
                className={cn(
                  'p-4 border text-xs sm:text-sm space-y-3 animate-in fade-in duration-300',
                  feedback.isCorrect
                    ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-200'
                    : 'border-amber-500/60 bg-amber-950/20 text-amber-200'
                )}
              >
                <div className="font-bold font-mono">
                  {feedback.isCorrect ? '✓ CHÍNH XÁC' : '✗ HÃY THỬ LẠI'}
                </div>
                <p className="font-sans leading-relaxed text-[#F5EFE3]/90">
                  {feedback.text}
                </p>

                <div className="pt-2">
                  {feedback.isCorrect ? (
                    currentIdx + 1 < quizList.length ? (
                      <button
                        type="button"
                        onClick={handleNextQuiz}
                        className="px-4 py-1.5 border border-emerald-400 text-emerald-200 font-mono text-xs hover:bg-emerald-400/20 transition-colors"
                      >
                        TÌNH HUỐNG TIẾP THEO →
                      </button>
                    ) : (
                      <div className="font-mono text-xs text-[#E3B341]">
                        ★ ĐÃ HOÀN THÀNH TẤT CẢ 4 TÌNH HUỐNG!
                      </div>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() => setFeedback(null)}
                      className="px-4 py-1.5 border border-amber-400 text-amber-200 font-mono text-xs hover:bg-amber-400/20 transition-colors"
                    >
                      THỬ LỰA CHỌN LẠI
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-4 border-t border-[#F5EFE3]/10">
        <span className="font-mono text-xs text-[#F5EFE3]/40">
          Chặng 5: Độc lập thiếu tự do hoặc hạnh phúc thì trở nên vô nghĩa
        </span>

        {isAllSolved && (
          <JourneyLink onClick={onAdvance} accent="gold">
            {data.cta || 'ĐẾN MÀN CUỐI'}
          </JourneyLink>
        )}
      </div>
    </section>
  );
}
