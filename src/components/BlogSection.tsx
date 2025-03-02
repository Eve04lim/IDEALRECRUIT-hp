'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export const BlogSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('blog-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const posts = [
    {
      title: "2024年度の採用トレンドと企業の対応策",
      category: "トレンド",
      image: "/api/placeholder/400/250",
      date: "2024.02.15",
      excerpt: "最新の採用市場動向と、企業が取るべき戦略的なアプローチについて解説します。"
    },
    {
      title: "効果的な採用面接の設計方法",
      category: "ノウハウ",
      image: "/api/placeholder/400/250",
      date: "2024.02.10",
      excerpt: "応募者の本質を見抜く面接設計と、評価基準の作り方について詳しく解説します。"
    },
    {
      title: "採用DXによる業務効率化事例",
      category: "事例",
      image: "/api/placeholder/400/250",
      date: "2024.02.05",
      excerpt: "テクノロジーを活用した採用業務の効率化事例と、その導入ステップを紹介します。"
    }
  ];

  return (
    <section id="blog-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            採用成功への
            <span className="text-blue-600">インサイト</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            最新の採用トレンドや実践的なノウハウをお届けします。
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <article
              key={index}
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Post image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <a
                  href={`/blog/${index + 1}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group/link"
                >
                  続きを読む
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            ブログ記事一覧
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

// メインページでの使用例
export const HomePage = () => {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServiceSection />
      <CasesSection />
      <BlogSection />
      <CTASection />
    </>
  );
};