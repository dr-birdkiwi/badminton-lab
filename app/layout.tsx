import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '落点 / Badminton Lab',
  description: '从技术、步伐、发力链到功能训练，把羽毛球动作看懂，再带上场。',
  openGraph: {
    title: '落点 / Badminton Lab',
    description: '从技术、步伐、发力链到功能训练，把羽毛球动作看懂，再带上场。',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
