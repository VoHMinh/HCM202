'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, BookOpen, Check, ExternalLink, Library, X } from 'lucide-react';
import { references, volumes } from '@/content/library';
import { FolioReader } from './FolioReader';
import { MeaningEnding } from './MeaningEnding';
import { BookTransition, type BookJourney } from './BookTransition';

type View = 'shelf' | 'reader' | 'ending';
const ignoreSeen = () => {};

export function ThreeValuesLibrary() {
  const [view, setView] = useState<View>('shelf');
  const [volume, setVolume] = useState(0);
  const [journey, setJourney] = useState<BookJourney | null>(null);
  const [revealed, setRevealed] = useState(false);
  const journeyLock = useRef(false);
  const [seen, setSeen] = useState<Record<number, number[]>>({});
  const [sourceOpen, setSourceOpen] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const coverRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const readCount = Object.values(seen).reduce((sum, pages) => sum + pages.length, 0);

  const markSeen = useCallback((v: number, p: number) => setSeen(old => ({ ...old, [v]: [...new Set([...(old[v] ?? []), p])] })), []);
  const openBook = useCallback((index: number) => {
    if (journeyLock.current || (view === 'reader' && volume === index)) return;
    journeyLock.current = true;
    const source = view === 'shelf' ? coverRefs.current[index] : null;
    const rect = source?.getBoundingClientRect();
    const matrix = source ? new DOMMatrixReadOnly(getComputedStyle(source).transform) : null;
    const page = Number(stageRef.current?.querySelector<HTMLElement>('.reader-scene')?.dataset.page ?? 0);
    setRevealed(false);
    setJourney({ to: index, from: view === 'reader' ? volume : undefined, page,
      rect: rect && source ? { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: source.offsetWidth, height: source.offsetHeight, rotation: matrix ? Math.atan2(matrix.b, matrix.a) * 180 / Math.PI : 0 } : undefined });
  }, [view, volume]);
  const revealBook = useCallback((index: number) => { setVolume(index); setView('reader'); setRevealed(true); }, []);
  const getReaderTarget = useCallback(() => stageRef.current?.querySelector<HTMLElement>('.reader-host .open-folio') ?? null, []);
  const finishJourney = useCallback(() => { setJourney(null); journeyLock.current = false; stageRef.current?.focus({ preventScroll: true }); }, []);
  const showSource = useCallback((index: number) => { setSourceIndex(index); setSourceOpen(true); }, []);
  const close = useCallback(() => {
    const returnVolume = journey?.to ?? volume;
    setJourney(null); journeyLock.current = false; setView('shelf');
    requestAnimationFrame(() => coverRefs.current[returnVolume]?.focus({ preventScroll: true }));
  }, [volume, journey]);

  useEffect(() => { if (view !== 'shelf') stageRef.current?.focus({ preventScroll: true }); }, [view, volume]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (!sourceOpen && event.key === 'Escape' && (view !== 'shelf' || journeyLock.current)) close(); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [view, sourceOpen, close]);

  return <main className={`folio-app view-${view} ${journey ? 'journey-active' : ''}`}>
    <header className="folio-header" inert={journey !== null}>
      <button className="wordmark" onClick={close} aria-label="Về bộ sưu tập Ba giá trị">Ba giá trị<span>Tư tưởng Hồ Chí Minh</span></button>
      <span className="course-label">HCM202 <span>/</span> Chương 3</span>
      <div className="header-actions">
        <button className="source-trigger" onClick={() => showSource(0)}><Library size={17} /><span>Tư liệu</span></button>
        {view !== 'shelf' && <button className="collection-button" onClick={close} aria-label="Đóng sách"><X size={16} /><span>Đóng sách</span></button>}
      </div>
    </header>

    <div className="folio-stage" ref={stageRef} tabIndex={-1} inert={journey !== null}>
      {view === 'shelf' && <section className="shelf-scene scene-enter" aria-labelledby="shelf-title">
        <div className="shelf-heading"><h1 id="shelf-title">Sau độc lập, <em>là điều gì?</em></h1><p>Ba cuốn sách. Một câu hỏi về cuộc sống của nhân dân.</p></div>
        <div className="book-collection" aria-label="Chọn một cuốn sách để mở đọc ngay">
          {volumes.map((item, index) => <button ref={node => { coverRefs.current[index] = node; }} className={`shelf-book book-${index}`} key={item.id} onClick={() => openBook(index)} aria-label={`Mở sách ${item.title}`}>
            <span className="book-solid">
              <span className="book-back" /><span className="book-edge" />
              <span className={`folio-cover cover-${item.id}`}>
                {/* Decorative artwork; the live title remains accessible. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/books/${item.id}.webp`} alt="" width={900} height={1350} draggable={false} fetchPriority="high" />
                <span className="cover-type"><span>Tư tưởng Hồ Chí Minh · {item.roman}</span><strong>{item.title}</strong><em>{item.subtitle}</em></span>
                <span className="cover-imprint">Ba giá trị · Một hành trình</span>
              </span>
              <span className="book-ribbon">{seen[index]?.length === 3 ? <Check size={16} /> : item.roman}</span>
            </span>
            <span className="book-hover-hint"><BookOpen size={15} /> Mở câu chuyện</span>
          </button>)}
        </div>
        <div className="shelf-invitation"><button className="primary-button" onClick={() => openBook(0)}>Bắt đầu với Độc lập <ArrowRight size={17} /></button></div>
      </section>}
      {(view === 'reader' || journey) && <div className={`reader-host ${journey && !revealed ? 'is-staged' : ''}`} aria-hidden={journey && !revealed ? true : undefined}>
        <FolioReader key={journey?.to ?? volume} volume={journey?.to ?? volume} onSeen={journey && !revealed ? ignoreSeen : markSeen} onNextBook={openBook} onEnd={() => setView('ending')} onSource={showSource} paused={sourceOpen || journey !== null} />
      </div>}
      {view === 'ending' && <MeaningEnding onRead={openBook} />}
    </div>

    <footer className="folio-footer" inert={journey !== null}><span className="footer-caption">Một hành trình <em>vì con người.</em></span>
      <nav className="journey-nav" aria-label="Các chương trong hành trình">{volumes.map((item, index) => <button key={item.id} aria-current={view === 'reader' && volume === index ? 'step' : undefined} onClick={() => openBook(index)}><span>{seen[index]?.length === 3 ? <Check size={12} /> : `0${index + 1}`}</span>{item.title}</button>)}<button aria-current={view === 'ending' ? 'step' : undefined} onClick={() => setView('ending')}><span>04</span>Kết nối</button></nav>
      <span className="reading-progress">Đã đọc {readCount}/9 phần</span>
    </footer>

    {journey && <BookTransition journey={journey} getTarget={getReaderTarget} onReveal={revealBook} onDone={finishJourney} />}
    <Dialog.Root open={sourceOpen} onOpenChange={setSourceOpen}>
      <Dialog.Portal><Dialog.Overlay className="sources-overlay" /><Dialog.Content className="sources-dialog">
        <div className="sources-header"><div><span className="eyebrow">Phòng tư liệu</span><Dialog.Title>Những trang làm nên câu chuyện</Dialog.Title></div><Dialog.Close className="round-button" aria-label="Đóng tư liệu"><X size={20} /></Dialog.Close></div>
        <Dialog.Description>Các trích dẫn ngắn được đặt cạnh nguồn đối chiếu. Phần dẫn chuyện, câu hỏi và sơ đồ là diễn giải của nhóm.</Dialog.Description>
        <div className="source-list">{references.map((source, index) => <button className={sourceIndex === index ? 'active' : ''} key={source.title} onClick={() => setSourceIndex(index)}><span>0{index + 1}</span>{source.title}</button>)}</div>
        <article className="source-preview"><span className="eyebrow">{references[sourceIndex].date}</span><h3>{references[sourceIndex].title}</h3><p>{references[sourceIndex].detail}</p><a className="primary-button" href={references[sourceIndex].url} target="_blank" rel="noreferrer">Mở nguồn đối chiếu <ExternalLink size={15} /></a></article>
        <p className="source-note">Ba cuốn sách là cách tổ chức bài học, không phải bản sao một ấn phẩm của Hồ Chí Minh. Minh họa bìa được tạo bằng AI, không phải ảnh tư liệu lịch sử. Các giá trị gắn bó với nhau, không phải ba giai đoạn tách biệt.</p>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </main>;
}
