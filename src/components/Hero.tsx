'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setHasAnimated(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fadeInClass = hasAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0';

  return (
    <div ref={heroRef} className="relative min-h-[90vh] overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-gray-900 z-10"></div>
        
        {/* 背景画像 */}
        <Image
          src="/images/hero-bg.jpg"
          alt="採用支援"
          fill
          priority
          className="object-cover opacity-30 z-0"
          sizes="100vw"
        />
        
        {/* グリッドパターン */}
        <div className="absolute inset-0 opacity-10 z-20" style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-30 container mx-auto px-4 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* メインヘッディング */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transform transition-all duration-700 delay-100 ${fadeInClass}`}>
            採用業務を<span className="text-blue-400">プロに任せて</span><br />
            <span className="text-blue-400">理想の人材</span>を獲得する
          </h1>
          
          {/* サブヘッディング */}
          <p className={`text-xl text-white/80 mb-10 max-w-2xl transform transition-all duration-700 delay-200 ${fadeInClass}`}>
            戦略立案から候補者の発掘、面接調整、内定まで。<br />
            採用のプロが貴社の採用活動を成功に導きます。
          </p>

          {/* 特徴ポイント */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 transform transition-all duration-700 delay-300 ${fadeInClass}`}>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-5">
              <div className="text-xl font-semibold text-white mb-1">採用コスト削減</div>
              <p className="text-white/70 text-sm">採用単価の削減と採用期間の短縮を実現</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-5">
              <div className="text-xl font-semibold text-white mb-1">業務負担軽減</div>
              <p className="text-white/70 text-sm">煩雑な採用業務をプロが効率的に代行</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-5">
              <div className="text-xl font-semibold text-white mb-1">採用成功率向上</div>
              <p className="text-white/70 text-sm">的確な人材要件定義と選考プロセス設計</p>
            </div>
          </div>

          {/* CTA ボタン */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-16 transform transition-all duration-700 delay-400 ${fadeInClass}`}>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 group"
            >
              無料相談を予約する
              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
            >
              サービス詳細を見る
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* 実績 */}
          <div className={`transform transition-all duration-700 delay-500 ${fadeInClass}`}>
            <div className="flex flex-wrap gap-6 items-center justify-start">
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <div className="text-2xl font-bold text-white mr-2">1,200<span className="text-blue-400">+</span></div>
                <div className="text-white/70 text-sm">支援実績</div>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <div className="text-2xl font-bold text-white mr-2">99.9<span className="text-blue-400">%</span></div>
                <div className="text-white/70 text-sm">採用成功率</div>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <div className="text-2xl font-bold text-white mr-2">4.9<span className="text-blue-400">/5.0</span></div>
                <div className="text-white/70 text-sm">顧客満足度</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-300 ${fadeInClass}`}
        style={{ opacity: Math.max(1 - scrollPosition / 200, 0) }}
      >
        <span className="text-white/70 text-sm mb-1">詳細を見る</span>
        <div className="w-px h-8 bg-white/20 animate-pulse"></div>
      </div>
    </div>
  );
}