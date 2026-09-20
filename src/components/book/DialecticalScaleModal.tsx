'use client';

import React, { useState } from 'react';
import type { ValueId } from '@/content/types';

interface DialecticalScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DialecticalScaleModal({ isOpen, onClose }: DialecticalScaleModalProps) {
  const [activeTab, setActiveTab] = useState<'scale' | 'triangle'>('scale');
  const [rightPlate, setRightPlate] = useState<ValueId[]>([]);
  const [decoyWarning, setDecoyWarning] = useState<string | null>(null);

  if (!isOpen) return null;

  // Left plate always has 'doc-lap' (weight = 2)
  const leftWeight = 2;

  // Right plate weight
  const rightWeight = rightPlate.reduce((sum, item) => {
    if (item === 'doc-lap') return sum + 2;
    if (item === 'tu-do') return sum + 1;
    if (item === 'hanh-phuc') return sum + 1;
    return sum;
  }, 0);

  const diff = rightWeight - leftWeight;
  const beamAngle = diff < 0 ? -11 : diff > 0 ? 11 : 0;

  const isDecoy = rightPlate.length === 1 && rightPlate[0] === 'doc-lap';
  const isCorrect =
    rightPlate.includes('tu-do') &&
    rightPlate.includes('hanh-phuc') &&
    rightPlate.length === 2;

  const handleToggleBlock = (val: ValueId) => {
    let next: ValueId[];
    if (rightPlate.includes(val)) {
      next = rightPlate.filter((item) => item !== val);
    } else {
      next = [...rightPlate, val];
    }
    setRightPlate(next);

    if (next.length === 1 && next[0] === 'doc-lap') {
      setDecoyWarning('Cân đã thăng bằng. Nhưng nó đang đo cái gì? Một bên độc lập, một bên cũng độc lập — đó là đồng nhất, không phải cân bằng giá trị!');
    } else {
      setDecoyWarning(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none"
      style={{
        background: 'radial-gradient(circle at 50% 45%, rgba(26,20,14,0.92) 0%, rgba(12,10,7,0.98) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Container */}
      <div
        className="relative w-full max-w-4xl h-[86vh] max-h-[720px] rounded-2xl border border-[#C4B296]/25 flex flex-col justify-between overflow-hidden shadow-2xl font-serif text-[#F5EFE3]"
        style={{
          background: 'linear-gradient(180deg, #241D16 0%, #17130F 100%)',
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C4B296]/15 bg-[#1C1611]/60">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚖️</span>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#C49A50] block">
                PHÒNG THÍ NGHIỆM BIỆN CHỨNG · CHƯƠNG 3
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#F5EFE3] font-serif">
                Chiếc Cân Biện Chứng & Sơ Đồ Giá Trị
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher Tabs */}
            <div className="flex items-center bg-[#0F0C08] p-1 rounded-full border border-[#C4B296]/20 text-xs">
              <button
                onClick={() => setActiveTab('scale')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  activeTab === 'scale'
                    ? 'bg-[#C49A50] text-[#1A1208] font-semibold shadow'
                    : 'text-[#C4B296]/70 hover:text-[#C4B296]'
                }`}
              >
                Chiếc Cân
              </button>
              <button
                onClick={() => setActiveTab('triangle')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  activeTab === 'triangle'
                    ? 'bg-[#C49A50] text-[#1A1208] font-semibold shadow'
                    : 'text-[#C4B296]/70 hover:text-[#C4B296]'
                }`}
              >
                Tam Giác Biện Chứng
              </button>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-[#C4B296]/30 bg-[#251E16] text-[#EADFC7] hover:bg-[#FAF3E0]/20 flex items-center justify-center text-sm font-sans transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center">
          {activeTab === 'scale' ? (
            <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-[#C4B296]/80 font-sans max-w-lg mx-auto">
                  Đĩa trái mang sức nặng của <strong className="text-[#E57373]">Độc Lập (trọng số 2)</strong>. Đặt các giá trị vào đĩa phải để tìm phương trình cân bằng biện chứng.
                </p>
              </div>

              {/* SVG SCALE MODEL */}
              <div className="w-full max-w-[460px] h-48 sm:h-52 relative flex items-center justify-center select-none my-2">
                <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                  {/* Base pillar */}
                  <line x1="200" y1="50" x2="200" y2="180" stroke="#5A4735" strokeWidth="4" />
                  <polygon points="170,180 230,180 200,165" fill="#3D2E20" stroke="#7A6045" strokeWidth="1" />
                  <circle cx="200" cy="50" r="7" fill="#C49A50" stroke="#FFF" strokeWidth="1" />

                  {/* Beam with smooth rotation */}
                  <g
                    style={{
                      transform: `rotate(${beamAngle}deg)`,
                      transformOrigin: '200px 50px',
                      transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {/* Beam bar */}
                    <line x1="60" y1="50" x2="340" y2="50" stroke="#C49A50" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="60" cy="50" r="4" fill="#C49A50" />
                    <circle cx="340" cy="50" r="4" fill="#C49A50" />

                    {/* Left pan strings & plate */}
                    <line x1="60" y1="50" x2="40" y2="120" stroke="#8C7355" strokeWidth="1.2" />
                    <line x1="60" y1="50" x2="80" y2="120" stroke="#8C7355" strokeWidth="1.2" />
                    <path d="M 30,120 Q 60,135 90,120 Z" fill="#423424" stroke="#8C7355" strokeWidth="1.5" />

                    {/* Left weight: Độc Lập */}
                    <rect x="44" y="98" width="32" height="22" rx="3" fill="#8A3A2A" stroke="#E57373" strokeWidth="1.2" />
                    <text x="60" y="113" fill="#FFF" fontSize="8.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                      ĐỘC LẬP
                    </text>

                    {/* Right pan strings & plate */}
                    <line x1="340" y1="50" x2="320" y2="120" stroke="#8C7355" strokeWidth="1.2" />
                    <line x1="340" y1="50" x2="360" y2="120" stroke="#8C7355" strokeWidth="1.2" />
                    <path d="M 310,120 Q 340,135 370,120 Z" fill="#423424" stroke="#8C7355" strokeWidth="1.5" />

                    {/* Right items */}
                    {rightPlate.map((item, idx) => {
                      const colors: Record<ValueId, { fill: string; stroke: string; label: string }> = {
                        'doc-lap': { fill: '#8A3A2A', stroke: '#E57373', label: 'ĐỘC LẬP' },
                        'tu-do': { fill: '#26486A', stroke: '#7FA8D8', label: 'TỰ DO' },
                        'hanh-phuc': { fill: '#35582F', stroke: '#8DC882', label: 'HẠNH PHÚC' },
                      };
                      const c = colors[item];
                      const yOffset = 98 - idx * 24;
                      return (
                        <g key={item}>
                          <rect x="324" y={yOffset} width="32" height="20" rx="3" fill={c.fill} stroke={c.stroke} strokeWidth="1.2" />
                          <text x="340" y={yOffset + 13} fill="#FFF" fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                            {c.label}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Status display */}
              <div className="h-10 flex items-center justify-center">
                {decoyWarning ? (
                  <p className="text-xs text-[#FF8A65] bg-[#3E1F18]/80 px-4 py-1.5 rounded-full border border-[#FF8A65]/40 animate-pulse">
                    ⚠️ {decoyWarning}
                  </p>
                ) : isCorrect ? (
                  <div className="flex items-center gap-2 text-xs text-[#81C784] bg-[#1B3618]/80 px-4 py-1.5 rounded-full border border-[#81C784]/40">
                    <span>✨</span>
                    <span>CÂN ĐÃ THĂNG BẰNG HOÀN TOÀN: ĐỘC LẬP = TỰ DO + HẠNH PHÚC</span>
                  </div>
                ) : diff < 0 ? (
                  <p className="text-xs text-[#C4B296]/60 font-mono tracking-wide">
                    [Đĩa trái nặng hơn — Chưa đủ giá trị đối trọng]
                  </p>
                ) : (
                  <p className="text-xs text-[#C4B296]/60 font-mono tracking-wide">
                    [Đĩa phải quá nặng — Mất cân bằng]
                  </p>
                )}
              </div>

              {/* Interactive blocks to place */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-widest text-[#C49A50] uppercase block">
                  CHỌN KHỐI GIÁ TRỊ ĐỂ ĐẶT LÊN ĐĨA PHẢI:
                </span>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => handleToggleBlock('tu-do')}
                    className={`px-4 py-2 rounded-lg font-serif text-xs border transition-all ${
                      rightPlate.includes('tu-do')
                        ? 'bg-[#26486A] text-[#FFF] border-[#7FA8D8] shadow-md'
                        : 'bg-[#1C1611] text-[#C4B296] border-[#4A3D2E] hover:border-[#7FA8D8]'
                    }`}
                  >
                    {rightPlate.includes('tu-do') ? '✓ Đã đặt: Tự Do (1)' : '+ Đặt: Tự Do (1)'}
                  </button>

                  <button
                    onClick={() => handleToggleBlock('hanh-phuc')}
                    className={`px-4 py-2 rounded-lg font-serif text-xs border transition-all ${
                      rightPlate.includes('hanh-phuc')
                        ? 'bg-[#35582F] text-[#FFF] border-[#8DC882] shadow-md'
                        : 'bg-[#1C1611] text-[#C4B296] border-[#4A3D2E] hover:border-[#8DC882]'
                    }`}
                  >
                    {rightPlate.includes('hanh-phuc') ? '✓ Đã đặt: Hạnh Phúc (1)' : '+ Đặt: Hạnh Phúc (1)'}
                  </button>

                  <button
                    onClick={() => handleToggleBlock('doc-lap')}
                    className={`px-4 py-2 rounded-lg font-serif text-xs border transition-all ${
                      rightPlate.includes('doc-lap')
                        ? 'bg-[#8A3A2A] text-[#FFF] border-[#E57373] shadow-md'
                        : 'bg-[#1C1611] text-[#C4B296] border-[#4A3D2E] hover:border-[#E57373]'
                    }`}
                  >
                    {rightPlate.includes('doc-lap') ? '✓ Đã đặt: Độc Lập (2)' : '+ Đặt: Độc Lập (2)'}
                  </button>
                </div>
              </div>

              {/* REVEAL QUOTE WHEN BALANCED */}
              {isCorrect && (
                <div className="p-4 bg-[#232018] border-l-4 border-[#C49A50] rounded-r text-left space-y-2 max-w-xl mx-auto shadow-lg animate-fade-in mt-3">
                  <p className="text-xs sm:text-sm font-serif italic text-[#FFF3D6] leading-relaxed">
                    &ldquo;Ngày nay, chúng ta đã xây dựng nên nước Việt Nam Dân chủ Cộng hòa. Nhưng nếu nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì.&rdquo;
                  </p>
                  <span className="block font-mono text-[10px] tracking-wider text-[#C49A50] uppercase">
                    — Thư gửi Ủy ban nhân dân các kỳ, tỉnh, huyện và làng (17/10/1945)
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* TRIANGLE MEANING MAP VIEW */
            <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#C49A50] uppercase block">
                  MÔ HÌNH TAM GIÁC BIỆN CHỨNG
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F5EFE3]">
                  Ba Cạnh Của Một Chỉnh Thể Không Thể Chia Cắt
                </h3>
              </div>

              {/* Triangle SVG */}
              <div className="relative w-80 h-72 sm:w-96 sm:h-80 my-2">
                <svg viewBox="0 0 300 260" className="w-full h-full overflow-visible">
                  {/* Glow circle */}
                  <circle cx="150" cy="140" r="70" fill="rgba(196,154,80,0.08)" />

                  {/* Lines between nodes */}
                  {/* Cạnh A: Độc Lập -> Tự Do */}
                  <line x1="150" y1="40" x2="60" y2="200" stroke="#C49A50" strokeWidth="2" strokeDasharray="4,4" />
                  {/* Cạnh B: Tự Do -> Hạnh Phúc */}
                  <line x1="60" y1="200" x2="240" y2="200" stroke="#C49A50" strokeWidth="2" strokeDasharray="4,4" />
                  {/* Cạnh C: Hạnh Phúc -> Độc Lập (Kiểm chứng) */}
                  <line x1="240" y1="200" x2="150" y2="40" stroke="#E57373" strokeWidth="2.5" />

                  {/* Labels along edges */}
                  <text x="85" y="110" fill="#EADFC7" fontSize="8" fontFamily="sans-serif" textAnchor="middle" transform="rotate(-60 85 110)">
                    Tiền đề pháp lý →
                  </text>
                  <text x="150" y="218" fill="#EADFC7" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                    Hiện thực hóa →
                  </text>
                  <text x="215" y="110" fill="#FF8A65" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" transform="rotate(60 215 110)">
                    Thước đo kiểm chứng ↑
                  </text>

                  {/* Node 1: ĐỘC LẬP (Đỉnh trên) */}
                  <g transform="translate(150, 40)">
                    <circle cx="0" cy="0" r="24" fill="#8A3A2A" stroke="#C49A50" strokeWidth="2" />
                    <text cx="0" y="4" fill="#FFF" fontSize="9" fontWeight="bold" fontFamily="serif" textAnchor="middle">
                      ĐỘC LẬP
                    </text>
                  </g>

                  {/* Node 2: TỰ DO (Đáy trái) */}
                  <g transform="translate(60, 200)">
                    <circle cx="0" cy="0" r="24" fill="#26486A" stroke="#C49A50" strokeWidth="2" />
                    <text cx="0" y="4" fill="#FFF" fontSize="9" fontWeight="bold" fontFamily="serif" textAnchor="middle">
                      TỰ DO
                    </text>
                  </g>

                  {/* Node 3: HẠNH PHÚC (Đáy phải) */}
                  <g transform="translate(240, 200)">
                    <circle cx="0" cy="0" r="24" fill="#35582F" stroke="#C49A50" strokeWidth="2" />
                    <text cx="0" y="4" fill="#FFF" fontSize="9" fontWeight="bold" fontFamily="serif" textAnchor="middle">
                      HẠNH PHÚC
                    </text>
                  </g>
                </svg>
              </div>

              {/* Explanatory cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left text-xs max-w-2xl">
                <div className="p-3 bg-[#1C1611] border border-[#8A3A2A]/40 rounded-lg space-y-1">
                  <strong className="text-[#E57373] block">Cạnh A: Độc Lập → Tự Do</strong>
                  <p className="text-[#C4B296]/75 text-[11px] leading-relaxed">
                    Độc lập giải phóng dân tộc khỏi ách nô lệ, trao quyền tự do và quyền làm chủ lại cho nhân dân.
                  </p>
                </div>

                <div className="p-3 bg-[#1C1611] border border-[#26486A]/40 rounded-lg space-y-1">
                  <strong className="text-[#7FA8D8] block">Cạnh B: Tự Do → Hạnh Phúc</strong>
                  <p className="text-[#C4B296]/75 text-[11px] leading-relaxed">
                    Tự do cho phép công dân lao động, sáng tạo, học tập và mưu cầu cuộc sống ấm no cho bản thân và gia đình.
                  </p>
                </div>

                <div className="p-3 bg-[#1C1611] border border-[#35582F]/40 rounded-lg space-y-1">
                  <strong className="text-[#8DC882] block">Cạnh C: Hạnh Phúc → Độc Lập</strong>
                  <p className="text-[#C4B296]/75 text-[11px] leading-relaxed">
                    Chỉ khi dân được hưởng hạnh phúc thực sự, họ mới sẵn sàng đem cả tính mạng để bảo vệ vững chắc nền độc lập.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#C4B296]/15 bg-[#1C1611]/60 flex items-center justify-between text-xs text-[#C4B296]/60 font-mono">
          <span>TƯ TƯỞNG HỒ CHÍ MINH · HCM202</span>
          <span>BÀI TẬP SÁNG TẠO HCM-TT-C3-02</span>
        </div>
      </div>
    </div>
  );
}
