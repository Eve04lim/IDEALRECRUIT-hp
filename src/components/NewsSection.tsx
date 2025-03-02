'use client';

import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';

export function NewsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('news-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const news = [
    {
      type: 'news',
      title: "採用支援実績1000社を突破",
      category: "ニュース",
      date: "2024.02.20",
      image: "/api/placeholder/600/400",
      excerpt: "おかげさまで、採用支援実績が1000社を突破しました。",
    },
    {
      type: 'blog',
      title: "効果的な採用面接の設計方法",
      category: "採用ノウハウ",
      date: "2024.02.15",
      image: "/api/placeholder/600/400",
      excerpt: "優秀な人材を見極めるための面接設計について解説します。",
    },
    {
      type: 'blog',
      title: "2024年度の採用トレンド分析",
      category: "市場動向",
      date: "2024.02.10",
      image: "/api/placeholder/600/400",
      excerpt: "最新の採用市場トレンドと対応策について詳しく解説します。",
    }
  ];

  const tabs = [
    { id: 'all', label: 'すべて' },
    { id: 'news', label: 'ニュース' },
    { id: 'blog', label: '採用ノウハウ' }
  ];

  const filteredNews = activeTab === 'all' 
    ? news 
    : news.filter(item => item.type === activeTab);

  return (
    <section id="news-section" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-8">
            <span className="text-sm font-medium">News & Blog</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">最新情報</h2>
          <p className="text-xl text-gray-600">
            採用に関する最新のニュースと
            <br />
            実践的なノウハウをお届けします。
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full shadow-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredNews.map((item, index) => (
            <article
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                    <Tag className="w-4 h-4 mr-1" />
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <a
                  href={`/news/${index + 1}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                >
                  続きを読む
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="/news"
            className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all"
          >
            すべての記事を見る
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}