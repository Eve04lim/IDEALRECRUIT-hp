'use client';

import { ArrowUpRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        {/* フッターメインコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 会社情報 */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                IDEALRECRUIT
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              革新的な採用サービスで<br />企業の成長と個人の可能性を最大化します
            </p>
            
            {/* 会社の所在地情報 */}
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400">
                  〒577-0806<br />
                  大阪府東大阪市上小阪3-13-9
                </p>
              </div>
            </div>
          </div>

          {/* サービス・リンク */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* サービス */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
                サービス
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500"></span>
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/services/analytics" 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>採用分析</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services/rpo"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>RPO（採用代行）</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services/performance"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>成果報酬型採用</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services/recruitment"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>中途採用支援</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* 会社情報・サポート */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
                会社情報
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500"></span>
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>会社概要</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>お問い合わせ</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>プライバシーポリシー</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>利用規約</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* フッターボトム */}
        <div className="mt-10 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} IDEALRECRUIT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}