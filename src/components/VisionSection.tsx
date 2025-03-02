'use client';

import { useEffect, useState } from 'react';
import { Target, Users, TrendingUp } from 'lucide-react';

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
      title: "企業の価値を最大化する",
      description: "最適な人材採用を通じて、企業の持続的な成長と発展に貢献します。"
    },
    {
      Icon: Users,
      title: "人材の可能性を引き出す",
      description: "個人の能力と可能性を最大限に活かせる環境づくりをサポートします。"
    },
    {
      Icon: TrendingUp,
      title: "採用市場を革新する",
      description: "テクノロジーと専門知識を融合し、より効果的な採用手法を創造します。"
    }
  ];

  return (
    <section id="vision-section" className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-[800px] h-[800px] border-2 border-blue-900 rounded-full transform -rotate-45" />
        <div className="absolute w-[600px] h-[600px] border-2 border-blue-900 rounded-full" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-8">
            <span className="text-sm font-medium">Our Vision</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">ビジョン</h2>
          <p className="text-xl text-gray-600">
            私たちは、企業と人材の架け橋となり、
            <br />
            より良い未来を創造することを目指しています。
          </p>
        </div>

        {/* Vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {visions.map((vision, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-700 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <vision.Icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{vision.title}</h3>
              <p className="text-gray-600">{vision.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom description */}
        <div className={`max-w-3xl mx-auto mt-20 text-center transform transition-all duration-700 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-lg text-gray-600">
            このビジョンの実現に向けて、私たちは日々新しい価値の創造に取り組んでいます。
            <br />
            お客様とともに、より良い採用の未来を築いていきましょう。
          </p>
        </div>
      </div>
    </section>
  );
}