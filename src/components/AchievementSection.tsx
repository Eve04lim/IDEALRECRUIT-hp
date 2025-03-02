'use client';

import { useState, useEffect } from 'react';
import { BarChart, Users, Star, TrendingUp } from 'lucide-react';

export function AchievementSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('achievement-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const achievements = [
    { number: '1,200+', label: '支援実績', icon: Users },
    { number: '99.9%', label: '採用成功率', icon: Star },
    { number: '40%', label: '採用コスト削減率', icon: TrendingUp },
    { number: '4.9/5.0', label: '顧客満足度', icon: BarChart }
  ];

  const industries = [
    { name: 'IT・通信', percentage: 35 },
    { name: '製造業', percentage: 25 },
    { name: 'サービス業', percentage: 20 },
    { name: '小売・流通', percentage: 15 },
    { name: 'その他', percentage: 5 }
  ];

  return (
    <section id="achievement-section" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-8">
            <span className="text-sm font-medium">Achievement</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">採用支援実績</h2>
          <p className="text-xl text-gray-600">
            数多くの企業様の採用成功をサポートしてきた
            <br />
            実績とノウハウを活かし、貴社の採用成功を実現します。
          </p>
        </div>

        {/* Achievement numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <achievement.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* Industry breakdown */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">業界別支援実績</h3>
          <div className="space-y-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-900 font-medium">{industry.name}</span>
                  <span className="text-gray-600">{industry.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                    style={{ 
                      width: isVisible ? `${industry.percentage}%` : '0%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success stories link */}
        <div className="text-center mt-16">
          <a
            href="/cases"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            導入事例を見る
          </a>
        </div>
      </div>
    </section>
  );
}