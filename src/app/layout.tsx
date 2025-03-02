// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white text-gray-900">
        {/* ヘッダー */}
        <NavBar />

        {/* メインコンテンツ */}
        <main className="flex-grow">
          {children}
        </main>

        {/* フッター */}
        <Footer />

        {/* スクロールトップボタン */}
        <ScrollToTop />
      </body>
    </html>
  );
}