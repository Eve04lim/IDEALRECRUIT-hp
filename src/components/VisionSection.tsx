'use client';

import { Target, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function VisionSection() {
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

    const element = document.getElementById('vision-section');
    if (element) observer.observe(element);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (element) observer.unobserve(element);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const visions = [
    {
      Icon: Target,
      imageUrl: "/api/placeholder/560/320",
      title: "企業の価値を最大化する",
      description: "最適な人材採用を通じて、企業の持続的な成長と発展に貢献します。採用は単なる人員補充ではなく、企業の未来を形作る重要な戦略です。",
      color: "from-blue-500 to-blue-600"
    },
    {
      Icon: Users,
      imageUrl: "/api/placeholder/560/320",
      title: "人材の可能性を引き出す",
      description: "個人の能力と可能性を最大限に活かせる環境づくりをサポートします。人は適切な環境で働くことで、その真価を発揮します。",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      Icon: TrendingUp,
      imageUrl: "/api/placeholder/560/320",
      title: "採用市場を革新する",
      description: "テクノロジーと専門知識を融合し、より効果的な採用手法を創造します。従来の採用手法に囚われず、最新のテクノロジーを活用します。",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <section 
      id="vision-section" 
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            className={`text-4xl font-bold mb-6 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            私たちの<span className="text-blue-600">ビジョン</span>
          </h2>
          <p 
            className={`text-xl text-gray-600 transform transition-all duration-700 delay-100 ${
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
              className={`bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden transform transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
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
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold py-1 px-3 rounded-lg">
                  VISION
                </div>
                <div className={`absolute -bottom-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-r ${vision.color} flex items-center justify-center text-white shadow-lg transform rotate-12`}>
                  <vision.Icon className="w-6 h-6 transform -rotate-12" />
                </div>
              </div>
              
              {/* コンテンツ部分 */}
              <div className="p-6 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {vision.title}
                </h3>
                <p className="text-gray-600">
                  {vision.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 締めのメッセージ */}
        <div 
          className={`max-w-3xl mx-auto mt-16 p-6 bg-gray-50 rounded-xl border border-gray-100 text-center shadow-md transform transition-all duration-700 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="text-gray-700 font-medium">
            このビジョンの実現に向けて、私たちは日々新しい採用手法の開発と改善に取り組んでいます。
          </p>
        </div>
      </div>
    </section>
  );
}