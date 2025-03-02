// src/components/Footer.tsx
'use client';

import Link from 'next/link';

const footerLinks = {
  company: {
    title: '企業情報',
    links: [
      { label: '会社概要', href: '/about' },
      { label: 'ミッション', href: '/mission' },
      { label: '採用情報', href: '/careers' },
      { label: 'ニュース', href: '/news' },
    ]
  },
  service: {
    title: 'サービス',
    links: [
      { label: '採用分析', href: '/services/analytics' },
      { label: 'RPO（採用代行）', href: '/services/rpo' },
      { label: '成果報酬型採用', href: '/services/performance' },
      { label: '中途採用支援', href: '/services/recruitment' },
    ]
  },
  support: {
    title: 'サポート',
    links: [
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: '用語集', href: '/glossary' },
      { label: 'ブログ', href: '/blog' },
    ]
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        {/* フッターメインコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 企業情報 */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-white">IDEALRECRUIT</span>
            </Link>
            <p className="text-gray-400 mb-4">革新的な採用サービスで未来を創る</p>
            <div className="flex space-x-4">
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                お問い合わせ
              </Link>
            </div>
          </div>

          {/* フッターナビゲーション */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* フッターボトム */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} IDEALRECRUIT. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}