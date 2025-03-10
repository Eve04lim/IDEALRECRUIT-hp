'use client';

import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CasesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('cases-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const cases = [
    {
      company: "株式会社テックイノベーション",
      industry: "IT・通信",
      image: "/api/placeholder/600/400",
      result: "採用コスト40%削減・採用数200%増加",
      description: "急成長するIT企業の採用基盤を構築し、効率的な採用活動を実現。",
      category: "tech"
    },
    {
      company: "グローバルトレード株式会社",
      industry: "商社",
      image: "/api/placeholder/600/400",
      result: "内定承諾率85%達成",
      description: "採用プロセスの改善により、ミスマッチのない採用を実現。",
      category: "trading"
    },
    {
      company: "フューチャーメディカル株式会社",
      industry: "医療・ヘルスケア",
      image: "/api/placeholder/600/400",
      result: "応募数3倍増・採用リード50%短縮",
      description: "採用ブランディングの強化と選考プロセスの効率化を実現。",
      category: "healthcare"
    }
  ];

  const tabs = [
    { id: 'all', label: 'すべて' },
    { id: 'tech', label: 'IT・通信' },
    { id: 'trading', label: '商社' },
    { id: 'healthcare', label: '医療・ヘルスケア' }
  ];

  const filteredCases = activeTab === 'all' 
    ? cases 
    : cases.filter(c => c.category === activeTab);

  return (
    <section id="cases-section" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            className={`text-4xl font-bold mb-6 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            導入<span className="text-blue-600">事例</span>
          </h2>
          <p 
            className={`text-xl text-gray-600 transform transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            様々な業界のクライアント企業様の採用課題を解決してきました。
            <br />
            私たちの支援実績をご紹介します。
          </p>
        </div>

        {/* タブ */}
        <div 
          className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white border-transparent shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 事例グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredCases.map((case_, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              {/* 事例画像 */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={case_.image}
                  alt={case_.company}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* グラデーションオーバーレイとラベル */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-lg">
                  CASE STUDY
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm">
                    {case_.industry}
                  </span>
                </div>
              </div>

              {/* 事例内容 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {case_.company}
                </h3>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">5.0</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-blue-700 font-semibold text-sm">{case_.result}</p>
                </div>
                <p className="text-gray-600 mb-4">{case_.description}</p>
                <Link
                  href={`/cases/${index + 1}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group/link"
                >
                  詳細を見る
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transform transition-all duration-700 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Link
            href="/cases"
            className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 text-gray-900 font-medium rounded-lg hover:bg-blue-600 hover:text-white hover:border-transparent hover:shadow-lg transition-all duration-300 group"
          >
            すべての導入事例を見る
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}