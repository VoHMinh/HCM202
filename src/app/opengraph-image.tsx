import { ImageResponse } from 'next/og';
import { PROJECT } from '@/content/scenes';

export const runtime = 'edge';

export const alt = 'Ba giá trị — Một hành trình | HCM202';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0A09',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          border: '12px solid #1F1A15',
          position: 'relative',
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '30%',
            right: '30%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #E3B341, transparent)',
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 24px',
            borderRadius: '9999px',
            background: '#1F1A15',
            border: '1px solid #33291F',
            color: '#E3B341',
            fontSize: '20px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          <span>{PROJECT.courseCode}</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: '#F5EFE3',
            textAlign: 'center',
            letterSpacing: '-1px',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}
        >
          {PROJECT.title}
        </div>

        {/* Three Values with their distinct colors */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '44px',
            fontWeight: 800,
            marginBottom: '36px',
          }}
        >
          <span style={{ color: '#FF4D62' }}>ĐỘC LẬP</span>
          <span style={{ color: '#4A4038' }}>—</span>
          <span style={{ color: '#7FC8D8' }}>TỰ DO</span>
          <span style={{ color: '#4A4038' }}>—</span>
          <span style={{ color: '#9CC45A' }}>HẠNH PHÚC</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(245, 239, 227, 0.7)',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          {PROJECT.subtitle}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
