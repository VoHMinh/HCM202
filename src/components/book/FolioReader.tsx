'use client';

import { memo, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { volumes, type Volume } from '@/content/library';

type Turn = { from: number; to: number; direction: 'next' | 'prev' };

const PaperPage = memo(function PaperPage({ book, index, side }: { book: Volume; index: number; side: 'left' | 'right' }) {
  const reading = book.readings[index];
  return <div className={`paper-page paper-${side}`}>
    <div className="paper-running"><span>{side === 'left' ? `Quyển ${book.roman} · ${book.title}` : reading.date}</span><span>{side === 'left' ? 'HCM202' : 'Chương 3'}</span></div>
    {side === 'left' ? <>
      <div className="paper-art" style={{ backgroundImage: `url(/books/${book.id}.webp)` }} />
      <div className="paper-passage"><span className="paper-label">{reading.passageType === 'quote' ? 'Tiếng nói từ văn kiện' : 'Một ý để mang theo'}</span>
        <p>{reading.passageType === 'quote' ? `“${reading.passage}”` : reading.passage}</p><small>{reading.attribution}</small>
      </div>
    </> : <>
      <span className="paper-chapter">{String(index + 1).padStart(2, '0')}</span>
      <h2>{reading.title}</h2>
      <div className="paper-body">{reading.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
      <div className="paper-conclusion">{reading.takeaway}</div>
    </>}
    <div className="paper-number"><span>{side === 'left' ? 'Độc lập · Tự do · Hạnh phúc' : 'Ba giá trị / Một hành trình'}</span>{index * 2 + (side === 'left' ? 1 : 2)}</div>
  </div>;
});

// Articulated strips bend a two-sided paper leaf around the spine. Only the
// active leaf is mounted. At rest there is no animation loop or pointer listener.
function CurvedLeaf({ book, turn, onFinish }: { book: Volume; turn: Turn; onFinish: () => void }) {
  const next = turn.direction === 'next';
  const strip = (i: number): ReactNode => <div className="curl-strip" style={{ '--strip': i } as CSSProperties}>
    <div className="curl-face curl-front"><div className="curl-content" style={{ left: `calc(var(--leaf-w) * ${-(next ? i : 9 - i) / 10})` }}><PaperPage book={book} index={turn.from} side={next ? 'right' : 'left'} /></div></div>
    <div className="curl-face curl-back"><div className="curl-content" style={{ left: `calc(var(--leaf-w) * ${-(next ? 9 - i : i) / 10})` }}><PaperPage book={book} index={turn.to} side={next ? 'left' : 'right'} /></div></div>
    {i < 9 && strip(i + 1)}
  </div>;
  return <div aria-hidden="true" className={`turn-sheet turn-${turn.direction}`} onAnimationEnd={event => { if (event.target === event.currentTarget) onFinish(); }}>{strip(0)}</div>;
}

interface Props {
  volume: number;
  onSeen: (volume: number, page: number) => void;
  onNextBook: (volume: number) => void;
  onEnd: () => void;
  onSource: (index: number) => void;
  paused: boolean;
}

export function FolioReader({ volume, onSeen, onNextBook, onEnd, onSource, paused }: Props) {
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [mobilePanel, setMobilePanel] = useState<'book' | 'notes'>('book');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const turnRef = useRef<Turn | null>(null);
  const book = volumes[volume];
  const reading = book.readings[page];
  const answer = answers[page];

  const finishTurn = useCallback(() => {
    if (!turnRef.current) return;
    const target = turnRef.current.to;
    if (timer.current) clearTimeout(timer.current);
    turnRef.current = null; setTurn(null); setPage(target); onSeen(volume, target);
  }, [onSeen, volume]);
  const flip = useCallback((direction: 'next' | 'prev') => {
    if (turnRef.current) return;
    const target = page + (direction === 'next' ? 1 : -1);
    if (target < 0 || target >= book.readings.length) return;
    setMobilePanel('book');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPage(target); onSeen(volume, target); return; }
    const nextTurn = { from: page, to: target, direction };
    turnRef.current = nextTurn; setTurn(nextTurn);
    // A fallback also completes turns if the browser suppresses animationend.
    timer.current = setTimeout(finishTurn, 1100);
  }, [page, book.readings.length, volume, onSeen, finishTurn]);
  const next = useCallback(() => {
    if (turnRef.current) return;
    if (page < 2) flip('next'); else if (volume < 2) onNextBook(volume + 1); else onEnd();
  }, [page, flip, volume, onNextBook, onEnd]);

  useEffect(() => { onSeen(volume, 0); return () => { if (timer.current) clearTimeout(timer.current); }; }, [volume, onSeen]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (paused || event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest('button, a, input, textarea, select')) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); flip('prev'); }
    };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [paused, next, flip]);

  return <section className="reader-scene scene-enter" aria-label={`Đang đọc ${book.title}`}>
    <div className="reader-heading"><span className="eyebrow">Quyển {book.roman} · {book.role}</span><h1>{book.title}</h1><span className="reader-position">{String(page + 1).padStart(2, '0')} / 03</span></div>
    <div className="mobile-reader-tabs"><button aria-pressed={mobilePanel === 'book'} onClick={() => setMobilePanel('book')}>Trang sách</button><button aria-pressed={mobilePanel === 'notes'} onClick={() => setMobilePanel('notes')}>Cùng suy ngẫm</button></div>
    <div className={`reading-layout mobile-${mobilePanel}`}>
      <div className="book-reading-area">
        <div className={`open-folio ${turn ? 'is-turning' : ''}`}>
          <div className="book-underlay" />
          <div className="stationary-page left"><PaperPage book={book} index={turn?.direction === 'prev' ? turn.to : page} side="left" /></div>
          <div className="stationary-page right"><PaperPage book={book} index={turn?.direction === 'next' ? turn.to : page} side="right" /></div>
          <div className="book-gutter" />
          {turn && <CurvedLeaf book={book} turn={turn} onFinish={finishTurn} />}
          <button className="page-hit page-hit-prev" onClick={() => flip('prev')} disabled={page === 0 || !!turn || paused} aria-label="Lật về trang trước"><span>← Trang trước</span></button>
          <button className="page-hit page-hit-next" onClick={next} disabled={!!turn || paused} aria-label={page < 2 ? 'Lật sang trang tiếp' : volume < 2 ? `Khép sách và mở cuốn ${volumes[volume + 1].title}` : 'Khép sách và xem kết nối'}><span>{page < 2 ? 'Trang tiếp →' : volume < 2 ? `Mở cuốn ${volumes[volume + 1].title} →` : 'Kết nối ba giá trị →'}</span></button>
        </div>
        <div className="reader-controls"><button className="round-button" onClick={() => flip('prev')} disabled={page === 0 || !!turn} aria-label="Trang trước"><ArrowLeft size={18} /></button><span aria-live="polite">Trang {page * 2 + 1}–{page * 2 + 2} <span>/ 6</span></span><button className="round-button" onClick={() => flip('next')} disabled={page === 2 || !!turn} aria-label="Trang sau"><ArrowRight size={18} /></button></div>
      </div>
      <aside className="reader-notes">
        <div className="notes-intro"><span className="eyebrow">Đọc để hiểu</span><h2>{reading.heading}</h2></div>
        <div className="reflection"><span className="eyebrow">Dừng một nhịp, nghĩ một điều</span><h3>{reading.question}</h3>
          <div className="reflection-options">{reading.options.map((option, i) => <button key={option} aria-pressed={answer === i} className={answer === i ? 'chosen' : ''} onClick={() => setAnswers(old => ({ ...old, [page]: i }))}><span>{answer === i ? <Check size={15} /> : String(i + 1).padStart(2, '0')}</span>{option}</button>)}</div>
          <p className={`reflection-feedback ${answer !== undefined ? 'has-answer' : ''}`} role="status">{answer === undefined ? 'Chọn một ý. Xem vì sao nó liên quan đến câu chuyện.' : reading.feedback[answer]}</p>
        </div>
        <button className="source-footnote text-button" onClick={() => onSource(reading.source)}>Đọc nguồn của trang này <ExternalLink size={13} /></button>
      </aside>
    </div>
    <div className="reader-next"><span>{page === 2 ? (volume === 2 ? 'Đã đến lúc nối ba giá trị.' : `Câu chuyện tiếp tục trong cuốn ${volumes[volume + 1].title}.`) : 'Mỗi lượt lật mở thêm một mối liên hệ.'}</span><button className="primary-button" onClick={next} disabled={!!turn}>{page < 2 ? 'Lật trang tiếp' : volume < 2 ? `Mở cuốn ${volumes[volume + 1].title}` : 'Thử chiếc cân ý nghĩa'}<ArrowRight size={17} /></button></div>
  </section>;
}
