import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Lora } from 'next/font/google';
import '@/components/book/library.css';
import './globals.css';
import { PROJECT } from '@/content/scenes';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-vietnam',
  display: 'swap',
});

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: `${PROJECT.title} — HCM202`,
  description: `${PROJECT.subtitle}. Sản phẩm sáng tạo môn Tư tưởng Hồ Chí Minh (${PROJECT.courseCode}).`,
  keywords: [
    'HCM202',
    'Tư tưởng Hồ Chí Minh',
    'Độc lập',
    'Tự do',
    'Hạnh phúc',
    'Ý nghĩa',
    'Hệ mục tiêu',
  ],
  authors: [{ name: 'Nhóm nghiên cứu HCM202' }],
  openGraph: {
    title: `${PROJECT.title} — HCM202`,
    description: PROJECT.subtitle,
    type: 'website',
    locale: 'vi_VN',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0A09',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${lora.variable} bg-[#0B0A09]`}>
      <body className="antialiased bg-[#25251e] text-[#F5EFE3] selection:bg-[#C8102E]/40">
        {children}
      </body>
    </html>
  );
}
