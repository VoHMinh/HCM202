'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BookCoverArt } from './BookCoverArt';
import { OpenBookReader, type BookType } from './OpenBookReader';
import { DialecticalScaleModal } from './DialecticalScaleModal';

export function BookShowcaseScene() {
  const [activeBook, setActiveBook] = useState<BookType | null>(null);
  const [isScaleOpen, setIsScaleOpen] = useState(false);
  const [hoveredBook, setHoveredBook] = useState<BookType | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse move listener with smooth damping
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const books: Array<{
    id: BookType;
    title: string;
    subtitle: string;
    pos: { x: string; y: string; w: string; r: string; yaw: string; z: number };
  }> = [
    {
      id: 'doclap',
      title: 'Độc Lập',
      subtitle: 'Quyển I · Chủ quyền dân tộc',
      pos: { x: '24%', y: '42%', w: 'min(29vw, 410px)', r: '-8deg', yaw: '-8deg', z: 1 },
    },
    {
      id: 'tudo',
      title: 'Tự Do',
      subtitle: 'Quyển II · Quyền con người',
      pos: { x: '50%', y: '34%', w: 'min(31vw, 445px)', r: '.8deg', yaw: '-3deg', z: 3 },
    },
    {
      id: 'hanhphuc',
      title: 'Hạnh Phúc',
      subtitle: 'Quyển III · Ấm no & Hạnh phúc',
      pos: { x: '76%', y: '43%', w: 'min(29vw, 410px)', r: '8deg', yaw: '8deg', z: 2 },
    },
  ];

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{
        background: `
          radial-gradient(ellipse at 50% 88%, rgba(195,145,70,0.18) 0%, rgba(120,80,30,0.06) 42%, transparent 72%),
          radial-gradient(circle at 18% 10%, rgba(138,58,42,0.10) 0%, transparent 35%),
          radial-gradient(circle at 82% 15%, rgba(45,88,40,0.08) 0%, transparent 35%),
          linear-gradient(180deg, #221D16 0%, #18140F 52%, #0F0D0A 100%)
        `,
      }}
    >
      {/* Subtle organic noise & vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.86' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.24'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(10,8,6,0.65) 100%)',
        }}
      />

      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 py-5 pointer-events-auto">
        <div className="flex flex-col">
          <span className="font-serif italic text-xl sm:text-2xl font-semibold text-[#DBC39C] tracking-tight">
            Ba Giá Trị
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#A8987E] -mt-0.5">
            Tư Tưởng Hồ Chí Minh · HCM202
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsScaleOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#DBC39C]/35 bg-[#FAF4E6]/10 hover:bg-[#FAF4E6]/20 text-[#EADFC7] text-xs font-serif tracking-wide transition-all shadow-lg backdrop-blur-sm transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>⚖️</span>
            <span>Chiếc Cân Biện Chứng</span>
          </button>
        </div>
      </header>

      {/* GIANT BACKGROUND TYPOGRAPHY: "Hồ Chí Minh" */}
      <div
        className="absolute top-[13vh] inset-x-0 flex justify-center pointer-events-none select-none z-0"
        style={{
          transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -8}px, 0)`,
          transition: 'transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <h1
          className="font-serif italic font-normal text-[clamp(110px,18vw,260px)] tracking-[-0.06em] leading-none whitespace-nowrap"
          style={{
            color: '#DBC39C',
            opacity: 0.14,
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))',
          }}
        >
          Hồ Chí Minh
        </h1>
      </div>

      {/* 3D BOOKSHELF DESK GALLERY */}
      <main
        className="relative z-10 w-full h-full"
        style={{
          perspective: 1500,
          perspectiveOrigin: '50% 48%',
          transformStyle: 'flat',
        }}
      >
        {books.map((b) => {
          const isHovered = hoveredBook === b.id;

          return (
            <div
              key={b.id}
              onClick={() => setActiveBook(b.id)}
              onMouseEnter={() => setHoveredBook(b.id)}
              onMouseLeave={() => setHoveredBook(null)}
              className="absolute group cursor-pointer"
              style={{
                left: b.pos.x,
                top: b.pos.y,
                width: b.pos.w,
                aspectRatio: '0.672 / 1',
                zIndex: isHovered ? 12 : b.pos.z,
                transform: `
                  translate3d(
                    calc(-50% + ${mousePos.x * (b.id === 'tudo' ? 6 : 10)}px),
                    calc(-50% + ${isHovered ? -26 : 0}px + ${mousePos.y * 6}px),
                    ${isHovered ? 40 : 0}px
                  )
                  rotate(${b.pos.r})
                  rotateY(${b.pos.yaw})
                `,
                transformStyle: 'preserve-3d',
                transition: 'transform 480ms cubic-bezier(0.2, 0.78, 0.2, 1), z-index 0s',
                willChange: 'transform',
              }}
              aria-label={`Mở sách: ${b.title}`}
            >
              {/* BOOK OBJECT (3D Wrapper) */}
              <div
                className="relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isHovered ? 'scale(1.035) rotateX(-2deg)' : 'none',
                  transition: 'transform 600ms cubic-bezier(0.2, 0.78, 0.2, 1)',
                }}
              >
                {/* 1. Ambient & Contact Shadow Pool beneath book */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    inset: '6% -6% -4% 6%',
                    borderRadius: 14,
                    background: 'radial-gradient(ellipse at 50% 60%, rgba(10,7,4,0.78) 0%, rgba(10,7,4,0.4) 50%, transparent 74%)',
                    filter: 'blur(20px)',
                    transform: 'translate3d(16px, 32px, -60px)',
                    zIndex: -2,
                  }}
                />

                {/* 2. Book Back Cover */}
                <div
                  className="absolute inset-0 rounded-[3px_8px_8px_3px]"
                  style={{
                    background: '#2B2219',
                    boxShadow: '0 16px 32px rgba(12,8,4,0.5)',
                    transform: 'translate3d(8px, 2px, -26px)',
                    zIndex: 0,
                  }}
                />

                {/* 3. Book Paper Block (Pages edge) */}
                <div
                  className="absolute rounded-[2px_5px_5px_2px]"
                  style={{
                    top: '1.6%',
                    bottom: '1.6%',
                    left: '3.6%',
                    right: '1.2%',
                    border: '1px solid rgba(110,85,55,0.25)',
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        rgba(120,95,65,0.15) 0,
                        rgba(120,95,65,0.15) 1px,
                        transparent 1px,
                        transparent 2.8px
                      ),
                      linear-gradient(90deg, #CFC1A4 0%, #F5E8D2 12%, #E9DAC0 88%, #CBBA94 100%)
                    `,
                    boxShadow: '6px 5px 16px rgba(25,18,10,0.3)',
                    transform: 'translate3d(7px, 1px, -12px)',
                    zIndex: 1,
                  }}
                >
                  {/* Top page edge bevel */}
                  <div
                    className="absolute -top-[7px] left-0 right-0 h-[8px] rounded-t"
                    style={{
                      background: 'repeating-linear-gradient(90deg, #D9CBAE 0, #D9CBAE 2px, #F2E7CF 2px, #F2E7CF 5px)',
                      transform: 'skewX(-8deg)',
                      transformOrigin: 'bottom left',
                    }}
                  />
                  {/* Right page edge bevel */}
                  <div
                    className="absolute top-0 bottom-0 -right-[7px] w-[8px] rounded-r"
                    style={{
                      background: 'repeating-linear-gradient(0deg, #CBBA94 0, #CBBA94 1px, #EEE3CD 1px, #EEE3CD 3px)',
                      transform: 'skewY(-2deg)',
                      transformOrigin: 'left center',
                    }}
                  />
                </div>

                {/* 4. Realistic Page-Fan effect (4 leaves subtly spread) */}
                {[1, 2, 3, 4].map((leaf) => (
                  <div
                    key={leaf}
                    className="absolute rounded-[2px_5px_5px_2px] pointer-events-none"
                    style={{
                      top: '2.4%',
                      bottom: '2.4%',
                      left: '4.2%',
                      right: '1.8%',
                      border: '1px solid rgba(110,85,55,0.18)',
                      background: 'linear-gradient(90deg, rgba(120,95,65,0.2) 0%, transparent 8%), repeating-linear-gradient(0deg, #F2E9D4 0, #F2E9D4 2px, #E7DABB 2px, #E7DABB 3px)',
                      opacity: isHovered ? 0.9 : 0.2,
                      transform: isHovered
                        ? `translate3d(0, 0, ${7 + leaf * 2}px) rotateY(${-leaf * 1.8}deg)`
                        : `translate3d(0, 0, ${3 + leaf}px) rotateY(0deg)`,
                      transformOrigin: '1.5% center',
                      transition: 'transform 600ms cubic-bezier(0.2, 0.78, 0.2, 1), opacity 400ms ease',
                      zIndex: 2,
                    }}
                  />
                ))}

                {/* 5. Front Cover with ThreeUI Vector Artwork */}
                <div
                  className="absolute inset-0 rounded-[3px_8px_8px_3px] overflow-hidden"
                  style={{
                    boxShadow: isHovered
                      ? '0 30px 48px rgba(12,8,4,0.5), inset -12px 0 18px rgba(0,0,0,0.22), inset 4px 0 10px rgba(255,255,255,0.25)'
                      : '0 22px 36px rgba(12,8,4,0.42), inset -12px 0 18px rgba(0,0,0,0.22), inset 4px 0 10px rgba(255,255,255,0.18)',
                    transform: isHovered
                      ? 'translate3d(0, 0, 18px) rotateY(-8deg)'
                      : 'translate3d(0, 0, 12px)',
                    transformOrigin: '1.5% center',
                    transition: 'transform 600ms cubic-bezier(0.2, 0.78, 0.2, 1), box-shadow 500ms ease',
                    zIndex: 3,
                  }}
                >
                  <BookCoverArt type={b.id} />
                </div>
              </div>

              {/* AUTHENTIC BADGE "MỞ ĐỌC" (revealed on hover) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.8}) rotate(-3deg)`,
                  transition: 'opacity 250ms ease, transform 350ms cubic-bezier(0.2, 0.78, 0.2, 1)',
                }}
              >
                <div
                  className="flex flex-col items-center justify-center w-24 h-16 text-[#2A1E14] font-serif shadow-xl"
                  style={{
                    background: '#F7EED9',
                    clipPath:
                      'polygon(3% 22%, 10% 8%, 25% 7%, 38% 1%, 51% 6%, 66% 2%, 77% 10%, 92% 11%, 96% 26%, 100% 39%, 95% 52%, 99% 67%, 88% 79%, 83% 93%, 68% 94%, 55% 100%, 42% 94%, 27% 98%, 17% 88%, 4% 84%, 5% 69%, 0 57%, 5% 43%, 1% 34%)',
                  }}
                >
                  <span className="font-serif italic font-bold text-xs tracking-wider">
                    Mở Đọc
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#6E553B]">
                    Click xem
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* FOOTER BAR */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-10 py-4 pointer-events-none text-xs text-[#A8987E]/70 font-serif">
        <div className="pointer-events-auto flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#DBC39C]">
            HƯỚNG DẪN:
          </span>
          <span className="hidden sm:inline">Nhấp vào từng cuốn sách để mở và lật đọc nội dung 3D</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-3 font-mono text-[10px] tracking-wider text-[#A8987E]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#81C784] animate-pulse" />
          <span>60 FPS</span>
        </div>
      </footer>

      {/* OPEN BOOK READER MODAL */}
      {activeBook && (
        <OpenBookReader
          bookType={activeBook}
          onClose={() => setActiveBook(null)}
          onOpenScale={() => {
            setActiveBook(null);
            setIsScaleOpen(true);
          }}
        />
      )}

      {/* DIALECTICAL SCALE & MEANING MAP MODAL */}
      <DialecticalScaleModal
        isOpen={isScaleOpen}
        onClose={() => setIsScaleOpen(false)}
      />
    </div>
  );
}
