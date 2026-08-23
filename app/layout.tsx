import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '力场 / Badminton Force Lab',
  description: '只讨论进阶羽毛球发力：躯干分离、旋转时序与肩肘前臂的末端释放。',
  openGraph: {
    title: '力场 / Badminton Force Lab',
    description: '只讨论进阶羽毛球发力：躯干分离、旋转时序与肩肘前臂的末端释放。',
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
