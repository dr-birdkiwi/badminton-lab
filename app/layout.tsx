import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '力场 / 羽毛球发力实验室',
  description: '一套证据边界清晰的进阶羽毛球发力课程：击球窗口、身体组织、拍头速度、稳定碰撞与下一拍准备。',
  openGraph: {
    title: '力场 / 羽毛球发力实验室',
    description: '一套证据边界清晰的进阶羽毛球发力课程：击球窗口、身体组织、拍头速度、稳定碰撞与下一拍准备。',
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
