import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '力场 / Badminton Force Lab',
  description: '一套可照着练的进阶羽毛球发力课程：站位、躯干分离、旋转时序、末端释放与制动。',
  openGraph: {
    title: '力场 / Badminton Force Lab',
    description: '一套可照着练的进阶羽毛球发力课程：站位、躯干分离、旋转时序、末端释放与制动。',
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
