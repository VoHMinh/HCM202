'use client';

import React, { useEffect } from 'react';

export function SpotlightMask() {
  useEffect(() => {
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      // Smooth lerp (lag-following lantern effect)
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      document.documentElement.style.setProperty('--cursor-x', `${currentX.toFixed(1)}px`);
      document.documentElement.style.setProperty('--cursor-y', `${currentY.toFixed(1)}px`);

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700"
      style={{
        background: `radial-gradient(circle 420px at var(--cursor-x, 50vw) var(--cursor-y, 50vh), rgba(227, 179, 65, 0.04) 0%, rgba(11, 10, 9, 0.4) 60%, rgba(11, 10, 9, 0.85) 100%)`,
        mixBlendMode: 'soft-light',
      }}
    />
  );
}
