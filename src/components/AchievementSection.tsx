'use client';

import { ArrowRight, BarChart, Star, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function AchievementSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const element = document.getElementById('achievement-section');
    if (element) observer.observe(element);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (element) observer.unobserve(element);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const achievements = [
    { number: '1,200+', label: '支援実績', icon: Users, color: 'from-blue-500 to-blue-600' },
    { number: '99.9%', label: '採用成功率', icon: Star, color: 'from-indigo-500 to-indigo-600' },
    { number: '40%', label: '採用コスト削減率', icon: TrendingUp, color: 'from-cyan-500 to-cyan-600' },
    { number: '4.9/5.0', label: '顧客満足度', icon: BarChart, color: 'from-sky-500 to-sky-600' }
  ];

  const industries = [
    { name: 'IT・通信', percentage: 35, color: 'from-blue-500 to-blue-600' },
    { name: '製造業', percentage: 25, color: 'from-indigo-500 to-indigo-600' },
    { name: 'サービス業', percentage: 20, color: 'from-cyan-500 to-cyan-600' },
    { name: '小売・流通', percentage: 15, color: 'from-sky-500 to-sky-600' },
    { name: 'その他', percentage: 5, color: 'from-gray-400 to-gray-500' }
  ];

  return (
    <section 
      id="achievement-section" 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden"
    >
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        
        {/* パターン背景 */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #4338ca 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* 動的な背景要素 */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-blue-100 opacity-30 blur-3xl"
          style={{ 
            top: `calc(20% + ${mousePosition.y * -20}px)`, 
            right: `calc(10% + ${mousePosition.x * -20}px)`,
            transition: 'transform 0.5s ease-out' 
          }}
        ></div>
        
        <div 
          className="absolute w-80 h-80 rounded-full bg-indigo-100 opacity-40 blur-3xl"
          style={{ 
            bottom: `calc(10% + ${mousePosition.y * 20}px)`, 
            left: `calc(10% + ${mousePosition.x * 20}px)`,
            transition: 'transform 0.5s ease-out' 
          }}
        ></div>
      </div>

      <div className="container relative mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 
            className={`text-4xl font-bold mb-6 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            採用支援<span className="text-blue-600">実績</span>
          </h2>
          <p 
            className={`text-xl text-gray-600 transform transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            数多くの企業様の採用成功をサポートしてきた実績とノウハウを活かし、
            <br />
            貴社の採用成功を実現します。
          </p>
        </div>

        {/* 実績数値 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border border-gray-100 shadow-lg p-6 transform transition-all duration-700 hover:-translate-y-1 hover:shadow-xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`flex items-center mb-4`}>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white`}>
                  <achievement.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 ml-3">
                  {achievement.number}
                </div>
              </div>
              <div className="text-gray-600 font-medium">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* 業界別実績 */}
        <div 
          className={`max-w-3xl mx-auto transform transition-all duration-700 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-white p-8 rounded-xl shadow-xl shadow-blue-900/5 border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></span>
              業界別支援実績
            </h3>
            <div className="space-y-8">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium">{industry.name}</span>
                    </div>
                    <span className="text-gray-900 font-bold">{industry.percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${industry.color} rounded-full transition-all duration-1500 ease-out`}
                      style={{ 
                        width: isVisible ? `${industry.percentage}%` : '0%',
                        transitionDelay: `${(index + 8) * 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 実績詳細へのリンク */}
        <div 
          className={`text-center mt-16 transform transition-all duration-700 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Link
            href="/cases"
            className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 text-gray-900 font-medium rounded-lg hover:bg-blue-600 hover:text-white hover:border-transparent hover:shadow-lg transition-all duration-300 group"
          >
            導入事例を見る
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}