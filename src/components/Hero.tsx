'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Star, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setHasAnimated(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInClass = hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0';

  const stats = [
    { number: '1,200+', label: '支援実績' },
    { number: '99.9%', label: '採用成功率' },
    { number: '4.9', suffix: '/5.0', label: '顧客満足度' }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/70 z-10" />
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 min-h-screen flex flex-col justify-center">
        <div className="max-w-5xl">
          {/* Trust Badge */}
          <div 
            className={`inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white mb-8 transform transition-all duration-700 ${fadeInClass}`}
          >
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">採用成功率99.9%のプロフェッショナル</span>
          </div>

          {/* Main Heading */}
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 transform transition-all duration-700 delay-100 ${fadeInClass}`}
          >
            <span className="text-white">
              理想の採用を、
              <br />
              <span className="relative inline-block mt-2">
                共に実現する
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-blue-500/50 rounded-full"></div>
              </span>
            </span>
          </h1>

          {/* Description */}
          <p 
            className={`text-xl md:text-2xl text-white/90 mb-12 max-w-3xl transform transition-all duration-700 delay-200 ${fadeInClass}`}
          >
            戦略的な採用計画から、選考プロセスの最適化まで。
            <br />
            貴社の成長を加速させる採用支援サービスをご提供します。
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 mb-16 transform transition-all duration-700 delay-300 ${fadeInClass}`}
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              無料相談を予約する
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center px-8 py-4 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
            >
              導入事例を見る
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl transform transition-all duration-700 delay-400 ${fadeInClass}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/20 backdrop-blur-sm rounded-lg p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.number}
                  <span className="text-blue-300">{stat.suffix}</span>
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center transition-all duration-700 delay-500 ${fadeInClass}`}
        style={{ opacity: Math.max(1 - scrollPosition / 200, 0) }}
      >
        <span className="text-sm font-medium mb-2">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </div>
  );
}