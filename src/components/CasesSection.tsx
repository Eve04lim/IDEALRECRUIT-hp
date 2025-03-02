'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';

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
    <section id="cases-section" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-blue-600 font-medium mb-4">Success Stories</p>
          <h2 className="text-4xl font-bold mb-6">導入事例</h2>
          <p className="text-gray-600 text-lg">
            様々な業界のクライアント企業様の採用課題を解決してきました。
            <br />
            私たちの支援実績をご紹介します。
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((case_, index) => (
            <div
              key={index}
              className={`group bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Case image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={case_.image}
                  alt={case_.company}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                    {case_.industry}
                  </span>
                </div>
              </div>

              {/* Case content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{case_.company}</h3>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-600 font-semibold mb-2">{case_.result}</p>
                <p className="text-gray-600 mb-4">{case_.description}</p>
                <a
                  href={`/cases/${index + 1}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group/link"
                >
                  詳細を見る
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="/cases"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors group"
          >
            すべての導入事例を見る
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}