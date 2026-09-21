'use client';

import { useEffect, useRef } from 'react';
import { volumes } from '@/content/library';

export type BookJourney = { to: number; from?: number; rect?: { x: number; y: number; width: number; height: number } };

export function BookTransition({ journey, onReveal, onDone }: { journey: BookJourney; onReveal: (index: number) => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const incoming = useRef<HTMLDivElement>(null);
  const outgoing = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const animations: Animation[] = [];
    let cancelled = false;
    const play = (element: Element, frames: Keyframe[], duration: number) => {
      const animation = element.animate(frames, { duration, fill: 'forwards', easing: 'cubic-bezier(.22,.7,.2,1)' });
      animations.push(animation);
      return animation.finished;
    };
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onReveal(journey.to); onDone(); return; }
      const book = incoming.current!;
      const bounds = book.getBoundingClientRect();
      const cover = book.querySelector('.transition-cover')!;
      if (outgoing.current) {
        await play(outgoing.current.querySelector('.transition-cover')!, [{ transform: 'rotateY(-155deg)' }, { transform: 'rotateY(0deg)' }], 420);
        await Promise.all([
          play(outgoing.current, [{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: 'translateX(-220px) rotate(-9deg)' }], 400),
          play(book, [{ opacity: 0, transform: 'translateX(220px) rotate(9deg)' }, { opacity: 1, transform: 'translateX(0) rotate(0)' }], 500),
        ]);
      } else {
        const r = journey.rect;
        await play(book, [{ transform: r ? `translate(${r.x - bounds.x}px, ${r.y - bounds.y}px) scale(${r.width / bounds.width}, ${r.height / bounds.height})` : 'translateY(40px) scale(.85)', opacity: r ? 1 : 0 }, { transform: 'translate(0,0) scale(1)', opacity: 1 }], 580);
      }
      await play(cover, [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-155deg)' }], 750);
      if (cancelled) return;
      onReveal(journey.to);
      await play(root.current!, [{ opacity: 1 }, { opacity: 0 }], 320);
      if (!cancelled) onDone();
    };
    void run().catch(() => { if (!cancelled) { onReveal(journey.to); onDone(); } });
    return () => { cancelled = true; animations.forEach(animation => animation.cancel()); };
  }, [journey, onReveal, onDone]);

  const renderBook = (index: number, old = false) => {
    const book = volumes[index];
    return <div ref={old ? outgoing : incoming} className={`transition-book ${old ? 'outgoing-book' : ''}`} style={!old && journey.from !== undefined ? { opacity: 0 } : undefined} aria-hidden="true">
      <div className="transition-paper"><span>Quyển {book.roman}</span><h2>{book.title}</h2><p>{book.subtitle}</p><small>Ba giá trị / Một hành trình</small></div>
      <div className="transition-cover folio-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/books/${book.id}.webp`} alt="" />
        <span className="cover-type"><span>Tư tưởng Hồ Chí Minh · {book.roman}</span><strong>{book.title}</strong><em>{book.subtitle}</em></span>
        <span className="cover-imprint">Ba giá trị · Một hành trình</span>
      </div>
    </div>;
  };
  return <div ref={root} className="book-transition" role="status" aria-live="polite">
    <div className="transition-caption"><span>{journey.from !== undefined ? `Khép cuốn ${volumes[journey.from].title}` : 'Mở một câu chuyện'}</span><strong>{journey.from !== undefined ? `${volumes[journey.from].title} → ${volumes[journey.to].title}` : volumes[journey.to].title}</strong></div>
    {journey.from !== undefined && renderBook(journey.from, true)}{renderBook(journey.to)}
  </div>;
}
