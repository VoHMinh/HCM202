'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useJourney } from '@/store/useJourney';
import { SpotlightMask } from './SpotlightMask';
import { PathMinimap } from './PathMinimap';
import { SourceDrawer } from '@/components/source/SourceDrawer';

import { StationIntro } from '@/components/stations/StationIntro';
import { StationBooks } from '@/components/stations/StationBooks';
import { StationMeaningMap } from '@/components/stations/StationMeaningMap';
import { StationQuiz } from '@/components/stations/StationQuiz';
import { StationScale } from '@/components/stations/StationScale';
import { StationOutro } from '@/components/stations/StationOutro';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_STATIONS = 6;

export function LitPathCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setCurrentStationIndex = useJourney((state) => state.setCurrentStationIndex);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const getScrollDistance = () => track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const activeIndex = Math.min(
            TOTAL_STATIONS - 1,
            Math.floor(self.progress * TOTAL_STATIONS)
          );
          setCurrentStationIndex(activeIndex);
        },
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [setCurrentStationIndex]);

  const jumpToStation = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const totalDistance = track.scrollWidth - window.innerWidth;
    const targetDistance = (index / (TOTAL_STATIONS - 1)) * totalDistance;

    window.scrollTo({
      top: targetDistance,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0B0A09]">
      {/* 1. Spotlight lantern follower layer */}
      <SpotlightMask />

      {/* 2. Horizontal camera track — 6 stations */}
      <main
        ref={trackRef}
        className="flex h-full w-max flex-row items-center will-change-transform select-none"
      >
        {/* Station 0: Intro */}
        <StationIntro onAdvance={() => jumpToStation(1)} />

        {/* Station 1: Ba Giá Trị — Three Books (Độc Lập / Tự Do / Hạnh Phúc) */}
        <StationBooks onAdvance={() => jumpToStation(2)} />

        {/* Station 2: Meaning Map */}
        <StationMeaningMap onAdvance={() => jumpToStation(3)} />

        {/* Station 3: Quiz */}
        <StationQuiz onAdvance={() => jumpToStation(4)} />

        {/* Station 4: Scale */}
        <StationScale onAdvance={() => jumpToStation(5)} />

        {/* Station 5: Outro */}
        <StationOutro onRestart={() => jumpToStation(0)} />
      </main>

      {/* 3. Global overlay components */}
      <PathMinimap onSelectStation={jumpToStation} />
      <SourceDrawer />
    </div>
  );
}
