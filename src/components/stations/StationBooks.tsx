'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface StationBooksProps {
  onAdvance?: () => void;
}

type BookId = 'doclap' | 'tudo' | 'hanhphuc';

interface BookData {
  id: BookId;
  roman: string;
  kicker: string;
  title: string[];
  subtitle: string;
  footer: string;
  coverFrom: string;
  coverTo: string;
  coverMid: string;
  ink: string;
  accent: string;
  source: string;
  year: string;
  description: string;
  points: Array<{ title: string; text: string }>;
  quotes: Array<{ text: string; attr: string }>;
}

const BOOKS: BookData[] = [
  {
    id: 'doclap',
    roman: 'I',
    kicker: 'Giá trị thứ nhất',
    title: ['Độc', 'Lập'],
    subtitle: 'Chủ quyền dân tộc là thiêng liêng bất khả xâm phạm',
    footer: 'Hồ Chí Minh Toàn Tập · 1919–1945',
    coverFrom: '#8b1a1a',
    coverMid: '#5c0e0e',
    coverTo: '#3d0808',
    ink: '#f8e8c8',
    accent: '#c45050',
    source: 'Tuyên ngôn 1945',
    year: '1945',
    description:
      'Trong tư tưởng Hồ Chí Minh, độc lập dân tộc là nền tảng của mọi nền tảng — tiền đề bắt buộc để tự do và hạnh phúc trở thành hiện thực.',
    points: [
      { title: 'Chủ quyền hoàn toàn', text: 'Độc lập phải tuyệt đối — không phân chia, không hạn chế về lãnh thổ, chính trị, kinh tế và quân sự.' },
      { title: 'Dân tộc tự quyết', text: 'Mỗi dân tộc có quyền tự quyết định con đường phát triển của mình, không phụ thuộc vào bất kỳ thế lực ngoại bang nào.' },
      { title: 'Gắn với chủ nghĩa xã hội', text: 'Độc lập dân tộc phải gắn liền với sự nghiệp giải phóng giai cấp — bước tất yếu đến chủ nghĩa xã hội.' },
    ],
    quotes: [
      { text: '"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do độc lập."', attr: '— Tuyên ngôn Độc lập, 2/9/1945' },
      { text: '"Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng; dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do."', attr: '— Tuyên ngôn Độc lập, 2/9/1945' },
    ],
  },
  {
    id: 'tudo',
    roman: 'II',
    kicker: 'Giá trị thứ hai',
    title: ['Tự', 'Do'],
    subtitle: 'Quyền con người phải được tôn trọng và bảo vệ',
    footer: 'Hồ Chí Minh Toàn Tập · 1945–1954',
    coverFrom: '#1a3a8b',
    coverMid: '#0e245c',
    coverTo: '#081840',
    ink: '#d8e8f8',
    accent: '#5080c0',
    source: 'Hiến pháp 1946',
    year: '1946',
    description:
      'Tự do trong tư tưởng Hồ Chí Minh không chỉ là tự do chính trị mà còn bao gồm tự do kinh tế, văn hóa và xã hội. Tự do thực sự chỉ đạt được khi dân tộc đã độc lập.',
    points: [
      { title: 'Tự do chính trị', text: 'Quyền bầu cử, ứng cử, tham gia vào các công việc của nhà nước và xã hội — nền tảng của dân chủ nhân dân.' },
      { title: 'Tự do cá nhân', text: '10 quyền cơ bản trong Hiến pháp 1946: tự do ngôn luận, báo chí, hội họp, tín ngưỡng và các quyền thiết yếu khác.' },
      { title: 'Tự do kinh tế', text: 'Người lao động được hưởng thành quả lao động của mình; xóa bỏ bóc lột, xây dựng xã hội công bằng.' },
    ],
    quotes: [
      { text: '"Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành."', attr: '— Hồ Chí Minh Toàn tập, tập 4, trang 161' },
    ],
  },
  {
    id: 'hanhphuc',
    roman: 'III',
    kicker: 'Giá trị thứ ba',
    title: ['Hạnh', 'Phúc'],
    subtitle: 'Ấm no và hạnh phúc là mục tiêu của độc lập và tự do',
    footer: 'Hồ Chí Minh Toàn Tập · 1945–1966',
    coverFrom: '#2d5a1a',
    coverMid: '#1a3d0e',
    coverTo: '#0f2808',
    ink: '#d8f0d0',
    accent: '#60a858',
    source: 'HCM Toàn tập',
    year: '1966',
    description:
      'Hạnh phúc là đích đến cuối cùng, lý do tồn tại của cả độc lập lẫn tự do. Người luôn nhấn mạnh: độc lập mà dân không được hưởng hạnh phúc thì độc lập cũng vô nghĩa.',
    points: [
      { title: 'Hạnh phúc vật chất', text: 'Dân chúng được ăn no mặc ấm, có nhà ở, được học hành và chữa bệnh — những nhu cầu cơ bản được đáp ứng đầy đủ.' },
      { title: 'Hạnh phúc tinh thần', text: 'Được sống trong một xã hội có văn hóa, đạo đức, không bị áp bức bóc lột, được tôn trọng phẩm giá con người.' },
      { title: 'Hạnh phúc là thước đo', text: 'Hạnh phúc của nhân dân là tiêu chí để đánh giá thành công của cách mạng và của chế độ xã hội chủ nghĩa.' },
    ],
    quotes: [
      { text: '"Nếu nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì."', attr: '— Hồ Chí Minh, tháng 1/1946' },
      { text: '"Không có gì quý hơn độc lập, tự do."', attr: '— Thư gửi nhân dân Mỹ, 17/7/1966' },
    ],
  },
];

// Cover emblem SVGs
const EMBLEMS: Record<BookId, React.ReactElement> = {
  doclap: (
    <svg viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="24" stroke="rgba(248,232,200,.4)" strokeWidth="1" />
      <path d="M30 10 L33 22 L46 22 L36 30 L39 42 L30 34 L21 42 L24 30 L14 22 L27 22 Z" fill="rgba(248,232,200,.5)" />
    </svg>
  ),
  tudo: (
    <svg viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="24" stroke="rgba(200,220,248,.35)" strokeWidth="1" />
      <path d="M30 14 C30 14 40 22 40 32 C40 38 36 44 30 46 C24 44 20 38 20 32 C20 22 30 14 30 14Z" stroke="rgba(200,220,248,.5)" strokeWidth="1.5" fill="none" />
      <line x1="30" y1="18" x2="30" y2="42" stroke="rgba(200,220,248,.4)" strokeWidth="1" />
      <line x1="22" y1="28" x2="38" y2="28" stroke="rgba(200,220,248,.4)" strokeWidth="1" />
    </svg>
  ),
  hanhphuc: (
    <svg viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="24" stroke="rgba(200,240,195,.35)" strokeWidth="1" />
      <ellipse cx="30" cy="36" rx="4" ry="7" fill="rgba(200,240,195,.45)" />
      <ellipse cx="22" cy="32" rx="4" ry="7" transform="rotate(-30 22 32)" fill="rgba(200,240,195,.35)" />
      <ellipse cx="38" cy="32" rx="4" ry="7" transform="rotate(30 38 32)" fill="rgba(200,240,195,.35)" />
      <ellipse cx="16" cy="26" rx="3.5" ry="6" transform="rotate(-55 16 26)" fill="rgba(200,240,195,.25)" />
      <ellipse cx="44" cy="26" rx="3.5" ry="6" transform="rotate(55 44 26)" fill="rgba(200,240,195,.25)" />
      <line x1="30" y1="42" x2="30" y2="48" stroke="rgba(200,240,195,.4)" strokeWidth="1.5" />
    </svg>
  ),
};

// Individual Book Card
function BookCard({
  book,
  position,
  isSelected,
  isHidden,
  onClick,
}: {
  book: BookData;
  position: 'left' | 'center' | 'right';
  isSelected: boolean;
  isHidden: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    cursor: isSelected ? 'default' : 'pointer',
    transformStyle: 'preserve-3d',
    transition: 'left 1100ms cubic-bezier(.2,.78,.2,1), top 1100ms cubic-bezier(.2,.78,.2,1), width 1100ms cubic-bezier(.2,.78,.2,1), opacity 500ms ease, filter 500ms ease, transform 520ms cubic-bezier(.2,.78,.2,1)',
    willChange: 'transform, left, top, width',
  };

  // Positions: left, center, right
  const positions = {
    left:   { left: '23.2%', top: '40.5%', width: 'min(30.5vw, 435px)', rotate: '-8deg', yaw: '-7deg', zIndex: 1 },
    center: { left: '50%',   top: '32.2%', width: 'min(33vw, 470px)',   rotate: '.8deg',  yaw: '-3deg', zIndex: 3 },
    right:  { left: '77%',   top: '42%',   width: 'min(30.5vw, 435px)', rotate: '8deg',  yaw: '7deg',  zIndex: 2 },
  };

  const pos = positions[position];

  let computedStyle: React.CSSProperties = {
    ...baseStyle,
    left: pos.left,
    top: pos.top,
    width: pos.width,
    aspectRatio: '.672 / 1',
    zIndex: hovered && !isSelected ? 8 : isSelected ? 14 : pos.zIndex,
    transform: isSelected
      ? 'translate3d(-50%, -50%, 0) rotate(-3deg)'
      : `translate3d(${hovered ? '-50%' : '-50%'}, ${hovered && !isSelected ? 'calc(-28px + 0px)' : '0px'}, 0) rotate(${pos.rotate}) rotateY(${pos.yaw})`,
  };

  if (isSelected) {
    computedStyle.left = '27%';
    computedStyle.top = '50%';
    computedStyle.width = 'min(30vw, 415px)';
    computedStyle.pointerEvents = 'none';
  }

  if (isHidden) {
    computedStyle.opacity = 0;
    computedStyle.filter = 'blur(10px)';
    computedStyle.transform = `translate3d(-50%, 60vh, -200px) rotate(${pos.rotate}) scale(.8)`;
    computedStyle.pointerEvents = 'none';
  }

  const coverBg = `radial-gradient(ellipse at 30% 20%, color-mix(in srgb, ${book.coverFrom} 60%, transparent), transparent 50%), radial-gradient(ellipse at 70% 80%, color-mix(in srgb, ${book.coverMid} 70%, transparent), transparent 50%), linear-gradient(160deg, ${book.coverFrom} 0%, ${book.coverMid} 40%, ${book.coverTo} 100%)`;

  return (
    <button
      style={computedStyle}
      onClick={onClick}
      onMouseEnter={() => !isSelected && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Mở chi tiết về ${book.title.join(' ')}`}
      className="border-0 outline-0 p-0 bg-transparent"
    >
      <span
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: isSelected
            ? 'scale(1.02) rotateX(0deg) rotateY(-5deg)'
            : hovered
            ? 'scale(1.035) rotateX(-1.5deg)'
            : 'none',
          transition: 'transform 800ms cubic-bezier(.2,.78,.2,1)',
        }}
      >
        {/* Shadow */}
        <span style={{
          position: 'absolute', inset: 0,
          margin: '5% -4% -2% 4%',
          borderRadius: 12,
          background: 'rgba(18,12,6,.75)',
          filter: 'blur(22px)',
          opacity: .72,
          transform: 'translate3d(18px, 28px, -60px)',
          zIndex: -2,
        }} />

        {/* Back */}
        <span style={{
          position: 'absolute', inset: 0,
          borderRadius: '3px 7px 7px 3px',
          background: book.coverTo,
          boxShadow: '0 18px 30px rgba(18,12,6,.4)',
          transform: 'translate3d(7px, 1px, -26px)',
          zIndex: 0,
        }} />

        {/* Pages block */}
        <span style={{
          position: 'absolute',
          top: '1.7%', right: '1.4%', bottom: '1.7%', left: '3.8%',
          borderRadius: '2px 5px 5px 2px',
          border: '1px solid rgba(84,68,45,.25)',
          background: 'repeating-linear-gradient(0deg, rgba(105,86,58,.14) 0, rgba(105,86,58,.14) 1px, transparent 1px, transparent 2.8px), linear-gradient(90deg, #cfc1a4 0%, #f2e8d2 14%, #e7dac0 87%, #cbb894 100%)',
          boxShadow: '7px 5px 16px rgba(31,23,13,.26)',
          transform: isSelected ? 'translate3d(6px, 1px, -11px)' : 'translate3d(7px, 1px, -12px)',
          transition: 'transform 1100ms cubic-bezier(.2,.78,.2,1)',
          zIndex: 1,
        }} />

        {/* Page fan */}
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            style={{
              position: 'absolute',
              top: '2.4%', right: '2%', bottom: '2.4%', left: '4.3%',
              display: 'block',
              border: '1px solid rgba(102,83,55,.22)',
              borderRadius: '2px 5px 5px 2px',
              background: 'linear-gradient(90deg, rgba(116,91,56,.22), transparent 9%), repeating-linear-gradient(0deg, #f0e6d0 0, #f0e6d0 2px, #e6d8ba 2px, #e6d8ba 3px)',
              opacity: isSelected ? 1 : 0,
              transform: isSelected
                ? `translate3d(0, 0, ${9 + n}px) rotateY(${-4 * n}deg)`
                : 'translate3d(0, 0, 0) rotateY(0)',
              transformOrigin: '1.5% center',
              transition: 'opacity 500ms ease, transform 1200ms cubic-bezier(.2,.78,.2,1)',
              zIndex: 2,
            }}
          />
        ))}

        {/* Front cover */}
        <span style={{
          position: 'absolute', inset: 0,
          borderRadius: '3px 7px 7px 3px',
          overflow: 'hidden',
          border: '1px solid rgba(238,224,194,.18)',
          backgroundImage: coverBg,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          boxShadow: isSelected
            ? '25px 26px 44px rgba(18,12,6,.35), inset -12px 0 18px rgba(0,0,0,.13), inset 4px 0 9px rgba(255,255,255,.08)'
            : '0 25px 38px rgba(18,12,6,.4), inset -12px 0 18px rgba(0,0,0,.16), inset 4px 0 9px rgba(255,255,255,.10)',
          transform: isSelected ? 'translate3d(0, 0, 18px) rotateY(-29deg)' : 'translate3d(0, 0, 12px)',
          transformOrigin: '1.5% center',
          transition: 'transform 1200ms cubic-bezier(.2,.78,.2,1), box-shadow 600ms ease',
          zIndex: 3,
        }}>
          {/* Spine shadow */}
          <span style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            width: '5.5%', zIndex: 3,
            background: 'linear-gradient(90deg, rgba(0,0,0,.38), rgba(255,255,255,.06) 35%, rgba(0,0,0,.10) 75%, transparent)',
            mixBlendMode: 'multiply',
            opacity: .85,
          }} />

          {/* Cover text */}
          <span style={{
            position: 'absolute',
            top: '5.8%', left: '7.5%', right: '7.5%', bottom: '5.5%',
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr auto',
            alignContent: 'start',
            color: book.ink,
            textAlign: 'center',
            textShadow: '0 1px 0 rgba(241,226,196,.20)',
            fontFamily: '"Iowan Old Style", Palatino, "Book Antiqua", serif',
          }}>
            <span style={{ fontSize: 'clamp(10px,.95vw,14px)', fontStyle: 'italic', fontWeight: 500, letterSpacing: '.12em', opacity: .7 }}>
              {book.roman}
            </span>
            <span style={{ fontSize: 'clamp(7px,.65vw,10px)', fontStyle: 'italic', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', marginTop: '2%' }}>
              {book.kicker}
            </span>
            <strong style={{ display: 'block', marginTop: '2.2%', fontSize: 'clamp(28px,3.8vw,58px)', fontWeight: 700, letterSpacing: '-.04em', lineHeight: .88 }}>
              {book.title.map((word, i) => (
                <React.Fragment key={i}>{word}{i < book.title.length - 1 && <br />}</React.Fragment>
              ))}
            </strong>
            <span style={{ marginTop: '3%', fontSize: 'clamp(9px,.9vw,13px)', fontStyle: 'italic', fontWeight: 600, letterSpacing: '.03em', lineHeight: 1.4 }}>
              {book.subtitle}
            </span>
            <span style={{ alignSelf: 'center', margin: '4% auto', width: '22%', opacity: .65 }}>
              {EMBLEMS[book.id]}
            </span>
            <span style={{ alignSelf: 'end', paddingTop: '3%', borderTop: '1px solid currentColor', fontSize: 'clamp(6px,.55vw,8px)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', opacity: .65 }}>
              {book.footer}
            </span>
          </span>
        </span>
      </span>

      {/* Open badge */}
      {!isSelected && !isHidden && (
        <span style={{
          position: 'absolute', top: '47%', left: '50%',
          display: 'grid', width: 94, height: 66,
          placeItems: 'center',
          color: '#2a2016',
          background: '#efe3ca',
          clipPath: 'polygon(3% 22%, 10% 8%, 25% 7%, 38% 1%, 51% 6%, 66% 2%, 77% 10%, 92% 11%, 96% 26%, 100% 39%, 95% 52%, 99% 67%, 88% 79%, 83% 93%, 68% 94%, 55% 100%, 42% 94%, 27% 98%, 17% 88%, 4% 84%, 5% 69%, 0 57%, 5% 43%, 1% 34%)',
          fontSize: 10, fontStyle: 'italic', fontWeight: 700, letterSpacing: '.1em',
          fontFamily: '"Iowan Old Style", Palatino, serif',
          opacity: hovered ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${hovered ? 1 : .76}) rotate(-3deg)`,
          transition: 'opacity 260ms ease, transform 420ms cubic-bezier(.2,.78,.2,1)',
          pointerEvents: 'none',
          zIndex: 6,
        }}>
          Mở
        </span>
      )}
    </button>
  );
}

// Detail panel
function DetailPanel({ book, visible, onPrev, onNext }: {
  book: BookData;
  visible: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div style={{
      position: 'absolute',
      top: '14.5%', right: '4.5%',
      width: 'min(47.5%, 650px)',
      zIndex: 12,
      opacity: visible ? 1 : 0,
      transition: `opacity ${visible ? '520ms ease 280ms' : '160ms ease 0ms'}`,
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <div style={{
        maxHeight: 'clamp(340px, calc(100svh - 450px), 600px)',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        paddingRight: 22,
        paddingBottom: 76,
        maskImage: 'linear-gradient(to bottom, #000 0, #000 calc(100% - 76px), transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, #000 0, #000 calc(100% - 76px), transparent 100%)',
        fontFamily: '"Iowan Old Style", Palatino, "Book Antiqua", serif',
      }}>
        <h2 style={{ margin: '0 0 6px', color: book.accent, fontSize: 'clamp(52px,5.7vw,82px)', fontStyle: 'italic', fontWeight: 600, letterSpacing: '-.055em', lineHeight: .92 }}>
          {book.title.join(' ')}
        </h2>
        <p style={{ margin: '0 0 22px', color: '#c5b79e', fontSize: 'clamp(13px,1.1vw,16px)', fontStyle: 'italic', letterSpacing: '.05em' }}>
          {book.subtitle}
        </p>
        <p style={{ maxWidth: 600, margin: 0, color: '#c5b79e', fontSize: 'clamp(14px,1.28vw,17px)', lineHeight: 1.64 }}>
          {book.description}
        </p>

        {/* Points */}
        <div style={{ marginTop: 26, paddingTop: 22, borderTop: '1px solid rgba(220,200,164,.18)' }}>
          <p style={{ margin: '0 0 14px', color: book.accent, fontSize: 11, fontStyle: 'italic', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>
            Nội hàm cốt lõi
          </p>
          <ol style={{ display: 'grid', gap: 14, margin: 0, padding: 0, listStyle: 'none', counterReset: 'step' }}>
            {book.points.map((pt, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 12, counterIncrement: 'step' }}>
                <span style={{ paddingTop: 2, color: 'rgba(195,164,123,.6)', fontSize: 12, fontStyle: 'italic', letterSpacing: '.08em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ display: 'grid', gap: 4 }}>
                  <strong style={{ color: '#e8dcc4', fontSize: 15, fontStyle: 'italic', fontWeight: 650 }}>{pt.title}</strong>
                  <span style={{ color: '#c5b79e', fontSize: 14, lineHeight: 1.58 }}>{pt.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Quotes */}
        <div style={{ marginTop: 26, paddingTop: 22, borderTop: '1px solid rgba(220,200,164,.18)' }}>
          <p style={{ margin: '0 0 14px', color: book.accent, fontSize: 11, fontStyle: 'italic', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>
            Trích dẫn gốc
          </p>
          {book.quotes.map((q, i) => (
            <div key={i} style={{
              padding: '16px 18px',
              border: '1px solid rgba(220,200,164,.15)',
              borderLeft: `3px solid ${book.accent}`,
              borderRadius: '0 10px 10px 0',
              background: 'rgba(40,35,25,.55)',
              fontStyle: 'italic',
              color: '#e0d4ba',
              fontSize: 14,
              lineHeight: 1.65,
              marginTop: i > 0 ? 10 : 0,
            }}>
              {q.text}
              <span style={{ display: 'block', marginTop: 8, fontSize: 11, fontStyle: 'normal', letterSpacing: '.1em', textTransform: 'uppercase', color: '#c5b79e', opacity: .7 }}>
                {q.attr}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nav dock */}
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1px max-content 1fr', alignItems: 'center', gap: 'clamp(16px,2vw,27px)', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 22, letterSpacing: '.02em', lineHeight: 1, color: book.accent }}>★★★★★</div>
          <div style={{ width: 1, height: 26, background: 'rgba(220,200,164,.24)' }} />
          <span style={{ color: '#bcae92', fontSize: 17, fontStyle: 'italic', fontWeight: 650 }}>{book.source}</span>
          <span style={{ justifySelf: 'end', color: '#bcae92', fontSize: 17, fontStyle: 'italic', fontWeight: 650 }}>{book.year}</span>
        </div>
        <hr style={{ height: 1, margin: '0 0 14px', border: 0, background: 'rgba(220,200,164,.20)' }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: 8,
          border: '1px solid rgba(220,200,164,.08)',
          borderRadius: 32,
          background: 'rgba(50,42,30,.90)',
          boxShadow: '0 16px 32px rgba(18,12,6,.22)',
          backdropFilter: 'blur(12px)',
        }}>
          <button onClick={onPrev} style={{
            flex: 1, minHeight: 58, padding: '0 18px', borderRadius: 24,
            background: book.accent, color: '#2e261d', cursor: 'pointer',
            fontSize: 14, fontStyle: 'italic', fontWeight: 700, border: 0,
            fontFamily: '"Iowan Old Style", Palatino, serif',
            transition: 'transform 220ms, filter 220ms',
          }}>← Trước</button>
          <button onClick={onNext} style={{
            flex: 1, minHeight: 58, padding: '0 18px', borderRadius: 24,
            background: book.accent, color: '#2e261d', cursor: 'pointer',
            fontSize: 14, fontStyle: 'italic', fontWeight: 700, border: 0,
            fontFamily: '"Iowan Old Style", Palatino, serif',
            transition: 'transform 220ms, filter 220ms',
          }}>Tiếp →</button>
        </div>
      </div>
    </div>
  );
}

export function StationBooks({ onAdvance }: StationBooksProps) {
  const [selectedBook, setSelectedBook] = useState<BookId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const openBook = useCallback((id: BookId) => {
    if (isTransitioning || selectedBook === id) return;
    setIsTransitioning(true);
    setSelectedBook(id);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, selectedBook]);

  const closeBook = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedBook(null);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const handleBookClick = useCallback((id: BookId) => {
    if (selectedBook === id) return;
    if (selectedBook) {
      closeBook();
      setTimeout(() => openBook(id), 420);
    } else {
      openBook(id);
    }
  }, [selectedBook, closeBook, openBook]);

  const prevBook = useCallback(() => {
    if (!selectedBook) return;
    const idx = BOOKS.findIndex(b => b.id === selectedBook);
    const prev = BOOKS[(idx - 1 + BOOKS.length) % BOOKS.length];
    closeBook();
    setTimeout(() => openBook(prev.id), 420);
  }, [selectedBook, closeBook, openBook]);

  const nextBook = useCallback(() => {
    if (!selectedBook) return;
    const idx = BOOKS.findIndex(b => b.id === selectedBook);
    const next = BOOKS[(idx + 1) % BOOKS.length];
    closeBook();
    setTimeout(() => openBook(next.id), 420);
  }, [selectedBook, closeBook, openBook]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedBook) closeBook();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedBook, closeBook]);

  const positionMap: Array<'left' | 'center' | 'right'> = ['left', 'center', 'right'];
  const currentBookData = selectedBook ? BOOKS.find(b => b.id === selectedBook)! : null;
  const isDetail = selectedBook !== null;

  return (
    <section
      ref={stageRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        isolation: 'isolate',
        overflow: 'hidden',
        background: `
          radial-gradient(circle at 49% 84%, rgba(139,26,26,.15), transparent 34%),
          radial-gradient(circle at 14% 4%, rgba(26,58,92,.10), transparent 28%),
          radial-gradient(circle at 80% 20%, rgba(45,90,39,.08), transparent 32%),
          linear-gradient(180deg, #2a2318 0%, #1a1510 48%, #120e0a 100%)
        `,
        fontFamily: '"Iowan Old Style", Palatino, "Book Antiqua", Baskerville, serif',
        color: '#eee2ca',
      }}
      aria-label="Ba giá trị cốt lõi trong tư tưởng Hồ Chí Minh"
    >
      {/* Noise texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none',
        opacity: .12,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.86' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E")`,
        mixBlendMode: 'soft-light',
      }} />

      {/* Header */}
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 3.2vw', pointerEvents: 'none',
      }}>
        <div>
          <div style={{ color: '#c3a47b', fontSize: 'clamp(18px,1.8vw,26px)', fontStyle: 'italic', fontWeight: 600, letterSpacing: '-.035em' }}>
            Ba Giá Trị
          </div>
          <div style={{ fontSize: 'clamp(10px,.7vw,12px)', letterSpacing: '.08em', fontStyle: 'normal', fontWeight: 400, color: '#c5b79e', marginTop: 2, textTransform: 'uppercase' }}>
            Tư tưởng Hồ Chí Minh · HCM202
          </div>
        </div>
        <div style={{ color: '#c5b79e', fontSize: 'clamp(11px,.9vw,14px)', letterSpacing: '.06em', fontStyle: 'italic', pointerEvents: 'auto' }}>
          Km 1–3 / 7
        </div>
      </header>

      {/* Hero word */}
      <h2
        aria-hidden="true"
        style={{
          position: 'absolute', zIndex: 1,
          top: '11.5vh', left: '50%',
          margin: 0,
          color: '#c3a47b',
          fontSize: 'clamp(100px,14vw,220px)',
          fontStyle: 'italic', fontWeight: 500,
          letterSpacing: '-.085em', lineHeight: .84,
          whiteSpace: 'nowrap',
          transform: 'translate3d(-50%, 0, 0)',
          opacity: isDetail ? 0 : 1,
          filter: isDetail ? 'blur(16px)' : 'none',
          transition: 'opacity 700ms ease, filter 700ms ease, transform 900ms cubic-bezier(.2,.78,.2,1)',
          userSelect: 'none', pointerEvents: 'none',
        }}
      >
        Hồ Chí Minh
      </h2>

      {/* Books gallery */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, perspective: 1400, transformStyle: 'flat' }}>
        {BOOKS.map((book, i) => (
          <BookCard
            key={book.id}
            book={book}
            position={positionMap[i]}
            isSelected={selectedBook === book.id}
            isHidden={isDetail && selectedBook !== book.id}
            onClick={() => handleBookClick(book.id)}
          />
        ))}
      </div>

      {/* Detail panels */}
      {BOOKS.map((book) => (
        <DetailPanel
          key={book.id}
          book={book}
          visible={selectedBook === book.id}
          onPrev={prevBook}
          onNext={nextBook}
        />
      ))}

      {/* Close button */}
      <button
        onClick={closeBook}
        aria-label="Đóng chi tiết"
        style={{
          position: 'absolute', zIndex: 52,
          top: 30, left: '50%',
          display: 'grid', width: 54, height: 54,
          placeItems: 'center',
          border: '1px solid rgba(255,255,255,.24)',
          borderRadius: '50%',
          background: 'rgba(30,24,16,.28)',
          color: '#eadfc7',
          cursor: 'pointer',
          fontSize: 26, fontWeight: 200,
          opacity: isDetail ? 1 : 0,
          transform: isDetail ? 'translate3d(-50%, 0, 0) rotate(0)' : 'translate3d(-50%, -18px, 0) rotate(-45deg)',
          transition: 'opacity 400ms ease, transform 620ms cubic-bezier(.2,.78,.2,1), background 220ms ease',
          pointerEvents: isDetail ? 'auto' : 'none',
          backdropFilter: 'blur(8px)',
        }}
      >
        +
      </button>

      {/* Advance button when in gallery mode */}
      {!isDetail && onAdvance && (
        <button
          onClick={onAdvance}
          style={{
            position: 'absolute', bottom: 32, right: '4.5%',
            zIndex: 20,
            padding: '14px 28px',
            border: '1px solid rgba(195,164,123,.25)',
            borderRadius: 999,
            background: 'rgba(50,42,30,.85)',
            color: '#eadfc7',
            cursor: 'pointer',
            fontSize: 13,
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '.06em',
            fontFamily: '"Iowan Old Style", Palatino, serif',
            backdropFilter: 'blur(10px)',
            transition: 'transform 220ms, filter 220ms',
          }}
        >
          Tiếp tục →
        </button>
      )}
    </section>
  );
}
