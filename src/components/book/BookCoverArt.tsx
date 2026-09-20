'use client';

import React from 'react';

export interface BookCoverProps {
  type: 'doclap' | 'tudo' | 'hanhphuc';
  className?: string;
}

export function BookCoverArt({ type, className = '' }: BookCoverProps) {
  if (type === 'doclap') {
    return (
      <div
        className={`relative w-full h-full select-none overflow-hidden ${className}`}
        style={{
          background: 'linear-gradient(175deg, #F8F3E6 0%, #EFE5D0 48%, #E4D6BC 100%)',
          color: '#261F18',
          boxShadow: 'inset 0 0 40px rgba(100,75,40,0.12)',
        }}
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(200,160,100,0.2) 0%, transparent 80%)`,
          }}
        />

        {/* Ornate double border */}
        <div className="absolute inset-3 sm:inset-4 border-2 border-[#7D6345]/50 pointer-events-none rounded-[2px]" />
        <div className="absolute inset-5 sm:inset-6 border border-[#7D6345]/30 pointer-events-none" />

        {/* Corner filigree accents */}
        <svg className="absolute top-3 left-3 w-5 h-5 text-[#8A6A44]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 2 H10 V6 H6 V10 H2 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="5" cy="5" r="1.5" fill="currentColor" />
        </svg>
        <svg className="absolute top-3 right-3 w-5 h-5 text-[#8A6A44]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 2 H14 V6 H18 V10 H22 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="19" cy="5" r="1.5" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-3 left-3 w-5 h-5 text-[#8A6A44]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 22 H10 V18 H6 V14 H2 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-3 right-3 w-5 h-5 text-[#8A6A44]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 22 H14 V18 H18 V14 H22 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="19" cy="19" r="1.5" fill="currentColor" />
        </svg>

        {/* Spine shadow on left edge */}
        <div
          className="absolute inset-y-0 left-0 w-8 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(30,20,10,0.35) 0%, rgba(30,20,10,0.08) 50%, transparent 100%)',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 py-7 sm:px-8 sm:py-8 text-center font-serif">
          {/* Header */}
          <div className="space-y-1">
            <span className="block font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#7D6345]/85">
              CẨM NANG NGHIÊN CỨU · I
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif tracking-[-0.03em] font-normal text-[#1E1712]">
              Độc Lập
            </h3>
            <p className="font-serif italic text-[11px] sm:text-[12px] text-[#7A6044] tracking-wide">
              Chủ quyền dân tộc & Quyền tự quyết
            </p>
          </div>

          {/* Centerpiece Vector Art: La Bàn Chủ Quyền / Trống Đồng Dát Vàng */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 my-1 flex items-center justify-center">
            {/* Ambient gold glow */}
            <div
              className="absolute inset-4 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(230,175,70,0.35) 0%, rgba(200,140,50,0.15) 50%, transparent 72%)',
                filter: 'blur(8px)',
              }}
            />

            <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 overflow-visible">
              {/* Outer decorative astronomical ring */}
              <circle cx="100" cy="100" r="92" stroke="#8C6F4B" strokeWidth="0.75" strokeDasharray="3,3" fill="none" opacity="0.6" />
              <circle cx="100" cy="100" r="84" stroke="#684F33" strokeWidth="1.2" fill="none" />
              <circle cx="100" cy="100" r="78" stroke="#8C6F4B" strokeWidth="0.5" fill="none" />

              {/* Degrees tick marks */}
              {[...Array(36)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="16"
                  x2="100"
                  y2={i % 3 === 0 ? "23" : "20"}
                  stroke="#5F472C"
                  strokeWidth={i % 3 === 0 ? "1.2" : "0.6"}
                  transform={`rotate(${i * 10} 100 100)`}
                />
              ))}

              {/* Radiating constellation network nodes */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <g key={idx} transform={`rotate(${angle} 100 100)`}>
                  <line x1="100" y1="100" x2="100" y2="30" stroke="#C49A50" strokeWidth="0.8" opacity="0.75" />
                  <circle cx="100" cy="30" r="4" fill="#F4D37A" stroke="#785324" strokeWidth="1" />
                  <circle cx="100" cy="48" r="2.5" fill="#E6AE42" />
                  <rect x="97" y="60" width="6" height="6" fill="#FBF0D2" stroke="#8A6635" strokeWidth="0.8" transform="rotate(45 100 63)" />
                </g>
              ))}

              {/* Central Dong Son sunburst / Compass Star */}
              <circle cx="100" cy="100" r="38" stroke="#684F33" strokeWidth="1.5" fill="#F9F2E2" />
              <circle cx="100" cy="100" r="34" stroke="#B88A44" strokeWidth="0.75" strokeDasharray="2,2" fill="none" />

              {/* 14-pointed sacred star */}
              {[...Array(14)].map((_, i) => (
                <polygon
                  key={i}
                  points="100,68 103,96 100,100 97,96"
                  fill="#785125"
                  transform={`rotate(${(i * 360) / 14} 100 100)`}
                />
              ))}

              {/* Center golden lens */}
              <circle cx="100" cy="100" r="14" fill="url(#goldGradientDocLap)" stroke="#4A3416" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="6" fill="#FFF9E6" />
              <circle cx="100" cy="100" r="2" fill="#5F3A11" />

              {/* Gradients */}
              <defs>
                <radialGradient id="goldGradientDocLap" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FFF2B8" />
                  <stop offset="50%" stopColor="#DEAC42" />
                  <stop offset="100%" stopColor="#7E561E" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Footer & Seal */}
          <div className="w-full pt-2 border-t border-[#7D6345]/30 flex items-center justify-between text-[8px] sm:text-[9px] text-[#6A5239] font-mono tracking-widest uppercase">
            <span>2/9/1945</span>
            <span className="font-serif italic capitalize tracking-normal text-[10px] text-[#4A3724] font-semibold">
              Hồ Chí Minh Toàn Tập
            </span>
            <span>TẬP IV</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'tudo') {
    return (
      <div
        className={`relative w-full h-full select-none overflow-hidden ${className}`}
        style={{
          background: 'linear-gradient(175deg, #F8F4EA 0%, #ECE3D0 48%, #DFD3BA 100%)',
          color: '#1E2530',
          boxShadow: 'inset 0 0 40px rgba(50,75,100,0.12)',
        }}
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(100,140,180,0.2) 0%, transparent 80%)`,
          }}
        />

        {/* Ornate double border */}
        <div className="absolute inset-3 sm:inset-4 border-2 border-[#485D75]/50 pointer-events-none rounded-[2px]" />
        <div className="absolute inset-5 sm:inset-6 border border-[#485D75]/30 pointer-events-none" />

        {/* Corner filigree accents */}
        <svg className="absolute top-3 left-3 w-5 h-5 text-[#3A5573]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 2 H10 V6 H6 V10 H2 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="5" cy="5" r="1.5" fill="currentColor" />
        </svg>
        <svg className="absolute top-3 right-3 w-5 h-5 text-[#3A5573]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 2 H14 V6 H18 V10 H22 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="19" cy="5" r="1.5" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-3 left-3 w-5 h-5 text-[#3A5573]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 22 H10 V18 H6 V14 H2 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-3 right-3 w-5 h-5 text-[#3A5573]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 22 H14 V18 H18 V14 H22 Z" fill="currentColor" fillOpacity="0.3" />
          <circle cx="19" cy="19" r="1.5" fill="currentColor" />
        </svg>

        {/* Spine shadow on left edge */}
        <div
          className="absolute inset-y-0 left-0 w-8 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(20,25,35,0.35) 0%, rgba(20,25,35,0.08) 50%, transparent 100%)',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 py-7 sm:px-8 sm:py-8 text-center font-serif">
          {/* Header */}
          <div className="space-y-1">
            <span className="block font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#485D75]/85">
              CẨM NANG NGHIÊN CỨU · II
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif tracking-[-0.03em] font-normal text-[#121E2A]">
              Tự Do
            </h3>
            <p className="font-serif italic text-[11px] sm:text-[12px] text-[#475C73] tracking-wide">
              Quyền con người & Nền dân chủ pháp quyền
            </p>
          </div>

          {/* Centerpiece Vector Art: Vòm Cổng Ánh Sáng & Cây Tri Thức (Botanical Archway) */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 my-1 flex items-center justify-center">
            {/* Ambient cyan/amber glow */}
            <div
              className="absolute inset-4 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(120,170,220,0.3) 0%, rgba(80,120,170,0.12) 50%, transparent 72%)',
                filter: 'blur(8px)',
              }}
            />

            <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 overflow-visible">
              {/* Outer archway / Portal */}
              <path
                d="M45,175 V95 C45,60 70,35 100,35 C130,35 155,60 155,95 V175"
                fill="none"
                stroke="#2B435C"
                strokeWidth="1.5"
              />
              <path
                d="M52,175 V95 C52,65 74,42 100,42 C126,42 148,65 148,95 V175"
                fill="none"
                stroke="#6887A8"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />
              <path
                d="M62,175 V98 C62,72 80,52 100,52 C120,52 138,72 138,98 V175"
                fill="#FAF6EC"
                stroke="#2B435C"
                strokeWidth="1"
              />

              {/* Radiating light rays from inside the portal */}
              <circle cx="100" cy="115" r="28" fill="url(#portalGlowTuDo)" />

              {/* Spreading Tree of Liberty / Roots & Branches */}
              <g stroke="#233B54" strokeWidth="1.2" fill="none">
                {/* Trunk */}
                <path d="M100,145 V105" strokeWidth="2.2" />
                {/* Branches upward */}
                <path d="M100,118 Q90,105 82,95 Q76,88 72,82" />
                <path d="M100,118 Q110,105 118,95 Q124,88 128,82" />
                <path d="M100,105 Q92,90 88,78" />
                <path d="M100,105 Q108,90 112,78" />
                <path d="M100,95 V70" strokeWidth="1.5" />

                {/* Roots downward spreading into foundation */}
                <path d="M100,145 Q88,155 76,165" strokeWidth="1.5" />
                <path d="M100,145 Q112,155 124,165" strokeWidth="1.5" />
                <path d="M100,148 Q94,160 88,172" />
                <path d="M100,148 Q106,160 112,172" />
              </g>

              {/* Leaves / Buds */}
              {[[72, 82], [128, 82], [88, 78], [112, 78], [100, 68], [80, 94], [120, 94]].map(([x, y], idx) => (
                <circle key={idx} cx={x} cy={y} r="3" fill="#D8AF48" stroke="#2B435C" strokeWidth="0.8" />
              ))}

              {/* Flying bird of freedom above */}
              <path
                d="M100,48 C94,40 85,38 78,40 C86,45 92,48 98,52 C104,48 110,45 118,40 C111,38 104,40 100,48 Z"
                fill="#203850"
              />

              {/* Foundation steps */}
              <rect x="36" y="175" width="128" height="5" fill="#3D5875" rx="1" />
              <rect x="30" y="180" width="140" height="4" fill="#253C54" rx="1" />

              {/* Gradients */}
              <defs>
                <radialGradient id="portalGlowTuDo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#E0B654" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FAF6EC" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Footer & Seal */}
          <div className="w-full pt-2 border-t border-[#485D75]/30 flex items-center justify-between text-[8px] sm:text-[9px] text-[#3D526A] font-mono tracking-widest uppercase">
            <span>9/11/1946</span>
            <span className="font-serif italic capitalize tracking-normal text-[10px] text-[#1E2E40] font-semibold">
              Hiến Pháp Đầu Tiên
            </span>
            <span>10 QUYỀN</span>
          </div>
        </div>
      </div>
    );
  }

  // type === 'hanhphuc'
  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(175deg, #F8F5EC 0%, #EDE6D3 48%, #DFD7BE 100%)',
        color: '#1E2818',
        boxShadow: 'inset 0 0 40px rgba(60,90,50,0.12)',
      }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(120,170,100,0.2) 0%, transparent 80%)`,
        }}
      />

      {/* Ornate double border */}
      <div className="absolute inset-3 sm:inset-4 border-2 border-[#547348]/50 pointer-events-none rounded-[2px]" />
      <div className="absolute inset-5 sm:inset-6 border border-[#547348]/30 pointer-events-none" />

      {/* Corner filigree accents */}
      <svg className="absolute top-3 left-3 w-5 h-5 text-[#426038]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 2 H10 V6 H6 V10 H2 Z" fill="currentColor" fillOpacity="0.3" />
        <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute top-3 right-3 w-5 h-5 text-[#426038]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 2 H14 V6 H18 V10 H22 Z" fill="currentColor" fillOpacity="0.3" />
        <circle cx="19" cy="5" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-3 left-3 w-5 h-5 text-[#426038]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 22 H10 V18 H6 V14 H2 Z" fill="currentColor" fillOpacity="0.3" />
        <circle cx="5" cy="19" r="1.5" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-3 right-3 w-5 h-5 text-[#426038]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 22 H14 V18 H18 V14 H22 Z" fill="currentColor" fillOpacity="0.3" />
        <circle cx="19" cy="19" r="1.5" fill="currentColor" />
      </svg>

      {/* Spine shadow on left edge */}
      <div
        className="absolute inset-y-0 left-0 w-8 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(20,30,15,0.35) 0%, rgba(20,30,15,0.08) 50%, transparent 100%)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 py-7 sm:px-8 sm:py-8 text-center font-serif">
        {/* Header */}
        <div className="space-y-1">
          <span className="block font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#547348]/85">
            CẨM NANG NGHIÊN CỨU · III
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif tracking-[-0.03em] font-normal text-[#162512]">
            Hạnh Phúc
          </h3>
          <p className="font-serif italic text-[11px] sm:text-[12px] text-[#48633D] tracking-wide">
            Ấm no, học hành & Thước đo giá trị
          </p>
        </div>

        {/* Centerpiece Vector Art: Đóa Sen Vàng & Bông Lúa Chín (Sacred Lotus & Golden Rice) */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 my-1 flex items-center justify-center">
          {/* Ambient warm amber/green glow */}
          <div
            className="absolute inset-4 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(235,190,80,0.35) 0%, rgba(100,160,70,0.15) 50%, transparent 72%)',
              filter: 'blur(8px)',
            }}
          />

          <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 overflow-visible">
            {/* Concentric sun halo */}
            <circle cx="100" cy="100" r="88" stroke="#6F8A62" strokeWidth="0.8" strokeDasharray="3,3" fill="none" opacity="0.6" />
            <circle cx="100" cy="100" r="78" stroke="#48683B" strokeWidth="1.2" fill="none" />

            {/* Sun rays radiating from behind lotus */}
            {[...Array(24)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="34"
                x2="100"
                y2={i % 2 === 0 ? "46" : "42"}
                stroke="#CFA848"
                strokeWidth={i % 2 === 0 ? "1.2" : "0.7"}
                transform={`rotate(${i * 15} 100 100)`}
              />
            ))}

            {/* Wreath of golden rice stalks framing the sides */}
            <g stroke="#B88A2C" strokeWidth="1" fill="#E8BD56">
              {/* Left stalk */}
              <path d="M42,160 C38,120 48,85 70,60" fill="none" strokeWidth="1.4" />
              {[
                [43, 145, -30], [40, 130, -40], [42, 115, -45],
                [48, 100, -55], [56, 85, -65], [66, 72, -75]
              ].map(([x, y, r], idx) => (
                <ellipse key={`l-${idx}`} cx={x} cy={y} rx="3" ry="7" transform={`rotate(${r} ${x} ${y})`} />
              ))}

              {/* Right stalk */}
              <path d="M158,160 C162,120 152,85 130,60" fill="none" strokeWidth="1.4" />
              {[
                [157, 145, 30], [160, 130, 40], [158, 115, 45],
                [152, 100, 55], [144, 85, 65], [134, 72, 75]
              ].map(([x, y, r], idx) => (
                <ellipse key={`r-${idx}`} cx={x} cy={y} rx="3" ry="7" transform={`rotate(${r} ${x} ${y})`} />
              ))}
            </g>

            {/* Central Sacred Lotus Bloom */}
            <g transform="translate(100, 112)">
              {/* Base calyx */}
              <path d="M-36,15 C-20,32 20,32 36,15 C24,24 -24,24 -36,15 Z" fill="#2E4A25" />

              {/* Outer petals */}
              <path d="M-42,12 C-55,-10 -35,-32 -22,-36 C-26,-15 -20,5 -42,12 Z" fill="#4B6E3F" stroke="#253E1D" strokeWidth="0.8" />
              <path d="M42,12 C55,-10 35,-32 22,-36 C26,-15 20,5 42,12 Z" fill="#4B6E3F" stroke="#253E1D" strokeWidth="0.8" />

              {/* Mid petals */}
              <path d="M-28,14 C-40,-8 -22,-44 -8,-48 C-14,-22 -10,6 -28,14 Z" fill="#DCA848" stroke="#3A552F" strokeWidth="0.8" />
              <path d="M28,14 C40,-8 22,-44 8,-48 C14,-22 10,6 28,14 Z" fill="#DCA848" stroke="#3A552F" strokeWidth="0.8" />

              {/* Center main upright petal */}
              <path d="M0,-58 C-18,-35 -14,15 0,18 C14,15 18,-35 0,-58 Z" fill="url(#lotusHeartGold)" stroke="#2F4C23" strokeWidth="1" />

              {/* Inner stigma jewel */}
              <circle cx="0" cy="-18" r="7" fill="#FFF4D0" stroke="#7A5618" strokeWidth="1" />
              <circle cx="0" cy="-18" r="3" fill="#D49E32" />
            </g>

            {/* Water ripples at base */}
            <ellipse cx="100" cy="162" rx="42" ry="4" fill="none" stroke="#6F8A62" strokeWidth="0.8" opacity="0.6" />
            <ellipse cx="100" cy="168" rx="26" ry="3" fill="none" stroke="#6F8A62" strokeWidth="0.6" opacity="0.4" />

            {/* Gradients */}
            <defs>
              <linearGradient id="lotusHeartGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B8" />
                <stop offset="60%" stopColor="#E5B84F" />
                <stop offset="100%" stopColor="#9C7224" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Footer & Seal */}
        <div className="w-full pt-2 border-t border-[#547348]/30 flex items-center justify-between text-[8px] sm:text-[9px] text-[#415C36] font-mono tracking-widest uppercase">
          <span>17/10/1945</span>
          <span className="font-serif italic capitalize tracking-normal text-[10px] text-[#22351C] font-semibold">
            Thư Gửi UBND
          </span>
          <span>THƯỚC ĐO</span>
        </div>
      </div>
    </div>
  );
}
