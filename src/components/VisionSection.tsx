'use client';

import { Target, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function VisionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('vision-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const visions = [
    {
      Icon: Target,
      imageUrl: "/api/placeholder/560/320",
      title: "企業の価値を最大化する",
      description: "最適な人材採用を通じて、企業の持続的な成長と発展に貢献します。採用は単なる人員補充ではなく、企業の未来を形作る重要な戦略です。"
    },
    {
      Icon: Users,
      imageUrl: "/api/placeholder/560/320",
      title: "人材の可能性を引き出す",
      description: "個人の能力と可能性を最大限に活かせる環境づくりをサポートします。人は適切な環境で働くことで、その真価を発揮します。"
    },
    {
      Icon: TrendingUp,
      imageUrl: "/api/placeholder/560/320",
      title: "採用市場を革新する",
      description: "テクノロジーと専門知識を融合し、より効果的な採用手法を創造します。従来の採用手法に囚われず、最新のテクノロジーを活用します。"
    }
  ];

  return (
    <section id="vision-section" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 
            className={`text-center transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <span className="block text-4xl font-bold text-gray-900 mb-2">私たちのビジョン</span>
            <span className="block text-lg font-medium text-blue-600 uppercase tracking-wider">VISION</span>
          </h2>
          <p 
            className={`text-center text-lg text-gray-600 max-w-3xl mx-auto mt-6 transform transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            企業と人材の架け橋となり、より良い社会の実現に貢献することを目指しています。
          </p>
        </div>

        {/* ビジョンカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {visions.map((vision, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* 画像部分 */}
              <div className="relative">
                <Image
                  src={vision.imageUrl}
                  width={560}
                  height={320}
                  alt={vision.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded uppercase tracking-wider">
                  Vision
                </div>
              </div>
              
              {/* コンテンツ部分 */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <vision.Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {vision.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {vision.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 締めのメッセージ */}
        <div 
          className={`max-w-3xl mx-auto mt-16 text-center transform transition-all duration-700 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="text-gray-600 italic">
            このビジョンの実現に向けて、私たちは日々新しい採用手法の開発と改善に取り組んでいます。
          </p>
        </div>
      </div>
    </section>
  );
}