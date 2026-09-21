'use client';

import { useLayoutEffect, useRef } from 'react';
import { volumes } from '@/content/library';
import { PaperPage } from './FolioReader';

export type BookJourney = {
  to: number;
  from?: number;
  page: number;
  rect?: { x: number; y: number; width: number; height: number; rotation: number };
};
type Props = { journey: BookJourney; getTarget: () => HTMLElement | null; onReveal: (index: number) => void; onDone: () => void };

// The moving spread uses the reader's real pages and final dimensions.
// Its last frame coincides with the live reader, avoiding a scene-cut jump.
export function BookTransition({ journey, getTarget, onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const incoming = useRef<HTMLDivElement>(null);
  const outgoing = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const animations: Animation[] = [];
    let cancelled = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const complete = () => { if (!cancelled) { onReveal(journey.to); onDone(); } };
    const play = (element: Element, frames: Keyframe[], duration: number, delay = 0) => {
      const animation = element.animate(frames, { duration, delay, fill: 'both', easing: 'cubic-bezier(.22,.61,.36,1)' });
      animations.push(animation);
      return animation.finished;
    };
    const run = async () => {
      const target = getTarget();
      if (motion.matches || !target) { complete(); return; }
      const rect = target.getBoundingClientRect();
      const mobile = window.innerWidth <= 760;
      const leafWidth = mobile ? rect.width : rect.width / 2;
      const hinge = mobile ? 0 : leafWidth;
      const originX = hinge + leafWidth / 2;
      const centerX = rect.x + originX;
      const centerY = rect.y + rect.height / 2;
      const book = incoming.current!;
      const leaf = book.querySelector('.journey-leaf')!;
      const shade = root.current!.querySelector('.journey-shade')!;
      const caption = root.current!.querySelector('.transition-caption')!;
      for (const element of [book, outgoing.current]) {
        if (!element) continue;
        Object.assign(element.style, { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.width}px`, height: `${rect.height}px`, transformOrigin: `${originX}px 50%` });
        element.style.setProperty('--leaf-w', `${leafWidth}px`);
        element.style.setProperty('--cover-w', `${leafWidth}px`);
        element.style.setProperty('--book-h', `${rect.height}px`);
        element.dataset.mobile = String(mobile);
      }
      const closedWidth = Math.min(window.innerWidth * (mobile ? .48 : .25), window.innerHeight * .37, 350);
      const closed = `translate(${window.innerWidth / 2 - centerX}px, ${window.innerHeight * .51 - centerY}px) scale(${closedWidth / leafWidth}, ${closedWidth * 1.5 / rect.height})`;
      const r = journey.rect;
      const source = r ? `translate(${r.x - centerX}px, ${r.y - centerY}px) scale(${r.width / leafWidth}, ${r.height / rect.height}) rotate(${r.rotation}deg)` : `${closed} translateY(24px)`;
      void play(shade, [{ opacity: 0 }, { opacity: 1 }], 380).catch(() => {});
      const shelf = target.closest('.folio-stage')?.querySelector('.shelf-scene');
      if (shelf) void play(shelf, [{ opacity: 1 }, { opacity: 0 }], 300).catch(() => {});
      if (outgoing.current) {
        const old = outgoing.current;
        await Promise.all([
          play(old, [{ transform: 'none', opacity: 1 }, { transform: closed, opacity: 1 }], 480),
          play(old.querySelector('.journey-leaf')!, [{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${mobile ? -180 : 180}deg)` }], 480),
        ]);
        await Promise.all([
          play(old, [{ transform: closed, opacity: 1 }, { transform: `${closed} translateX(-120px) rotate(-5deg)`, opacity: 0 }], 340),
          play(book, [{ transform: `${closed} translateX(100px) rotate(5deg)`, opacity: 0 }, { transform: closed, opacity: 1 }], 400),
        ]);
      } else {
        await play(book, [{ transform: source, opacity: r ? 1 : 0 }, { transform: closed, opacity: 1 }], 440);
      }
      await Promise.all([
        play(leaf, [{ transform: `rotateY(${mobile ? -180 : 180}deg)` }, { transform: 'rotateY(0deg)' }], 760),
        play(book, [{ transform: closed }, { transform: 'none' }], 900),
        play(caption, [{ opacity: 1 }, { opacity: 0 }], 260, 350),
        play(shade, [{ opacity: 1 }, { opacity: 0 }], 350, 550),
      ]);
      if (cancelled) return;
      onReveal(journey.to);
      await play(root.current!, [{ opacity: 1 }, { opacity: 0 }], 140);
      if (!cancelled) onDone();
    };
    const cancelMotion = () => { if (motion.matches) { animations.forEach(a => a.cancel()); complete(); } };
    const finishOnResize = () => { animations.forEach(a => a.cancel()); complete(); };
    motion.addEventListener('change', cancelMotion);
    window.addEventListener('resize', finishOnResize, { once: true });
    void run().catch(complete);
    return () => { cancelled = true; motion.removeEventListener('change', cancelMotion); window.removeEventListener('resize', finishOnResize); animations.forEach(a => a.cancel()); };
  }, [journey, getTarget, onReveal, onDone]);

  const renderBook = (index: number, old = false) => {
    const book = volumes[index];
    const page = old ? journey.page : 0;
    return <div ref={old ? outgoing : incoming} className={`journey-spread ${old ? 'journey-outgoing' : ''}`} aria-hidden="true">
      <div className="journey-right"><PaperPage book={book} index={page} side="right" /></div>
      <div className="journey-leaf">
        <div className="journey-inside"><PaperPage book={book} index={page} side="left" /></div>
        <div className="journey-cover folio-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/books/${book.id}.webp`} alt="" draggable={false} />
          <span className="cover-type"><span>Tư tưởng Hồ Chí Minh · {book.roman}</span><strong>{book.title}</strong><em>{book.subtitle}</em></span>
          <span className="cover-imprint">Ba giá trị · Một hành trình</span>
        </div>
      </div>
    </div>;
  };
  return <div ref={root} className="book-transition" role="status" aria-live="polite">
    <div className="journey-shade" />
    <div className="transition-caption"><span>{journey.from !== undefined ? `Khép cuốn ${volumes[journey.from].title}` : 'Mở một câu chuyện'}</span><strong>{journey.from !== undefined ? `${volumes[journey.from].title} → ${volumes[journey.to].title}` : volumes[journey.to].title}</strong></div>
    {journey.from !== undefined && renderBook(journey.from, true)}{renderBook(journey.to)}
  </div>;
}
