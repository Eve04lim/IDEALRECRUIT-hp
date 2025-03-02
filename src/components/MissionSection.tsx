'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';

export function MissionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('mission-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const values = [
    {
      Icon: TrendingUp,
      title: "Mission",
      description: "企業の成長と個人の幸せを繋ぐ、最適な人材採用の実現"
    },
    {
      Icon: Target,
      title: "Vision",
      description: "採用のプロフェッショナルとして、日本の労働市場に新しい価値を創造する"
    },
    {
      Icon: Users,
      title: "Value",
      description: "誠実・革新・共創の精神で、クライアントと共に未来を築く"
    }
  ];

  return (
    <section id="mission-section" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Main content */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-blue-600 font-medium mb-4">About Us</p>
            <h2 className="text-4xl font-bold mb-6">ミッション・ビジョン</h2>
            <p className="text-gray-600 text-lg">
              私たちは、採用を通じて社会に貢献します。
              <br />
              企業の成長と個人の幸せ、その両方を実現する架け橋となることを目指しています。
            </p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
                  <value.Icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Message */}
          <div 
            className={`mt-20 p-8 bg-white rounded-lg shadow-lg text-center transform transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <blockquote className="text-xl text-gray-700 italic mb-4">
              "人と企業の可能性を最大限に引き出し、共に成長する。それが私たちの使命です。"
            </blockquote>
            <p className="text-gray-500">代表取締役社長</p>
          </div>
        </div>
      </div>
    </section>
  );
}