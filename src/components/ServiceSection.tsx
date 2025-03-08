'use client';

import { BarChart, Building, Target, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function ServiceSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('service-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const services = [
    {
      icon: <BarChart className="w-8 h-8 text-blue-600" />,
      title: "採用分析",
      description: "貴社の優秀人材を分析し、採用・人事・経営の次の一手を明確にします。これにより、最適な採用戦略を構築し、企業の成長を加速することができます。",
      categories: "人材分析 / 採用戦略 / データ活用",
      path: "/services/analytics",
      backgroundText1: "DATA",
      backgroundText2: "ANALYTICS",
      videoSrc: "/videos/analytics.mp4", // 実際のビデオパスに置き換えてください
      imageUrl: "/api/placeholder/640/360" // 開発用プレースホルダー
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "採用代行",
      description: "Wantedlyをメインに各媒体の運用代行から面接面談など全て採用業務を代行。貴社のリソースを最小限に抑えながら、質の高い候補者獲得まで一貫してサポートします。",
      categories: "採用運用 / 選考代行 / 面接調整",
      path: "/services/rpo",
      backgroundText1: "RECRUIT",
      backgroundText2: "PROCESS",
      videoSrc: "/videos/rpo.mp4", // 実際のビデオパスに置き換えてください
      imageUrl: "/api/placeholder/640/360" // 開発用プレースホルダー
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "成果報酬型採用",
      description: "人材紹介会社よりも安価に。採用できたら費用が発生する完全成果報酬のサービス。コストを抑えながら優秀な人材を獲得したい企業様に最適です。",
      categories: "成果報酬 / コスト削減 / リスクフリー",
      path: "/services/performance",
      backgroundText1: "SUCCESS",
      backgroundText2: "BASED",
      videoSrc: "/videos/performance.mp4", // 実際のビデオパスに置き換えてください
      imageUrl: "/api/placeholder/640/360" // 開発用プレースホルダー
    },
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "中途採用支援",
      description: "type,doda,マイナビなど貴社に最も合う求人広告をご提案。効果的な媒体選定から募集原稿の作成まで、中途採用における成功へのプロセスを全面的にサポートします。",
      categories: "求人広告 / 中途採用 / 媒体選定",
      path: "/services/recruitment",
      backgroundText1: "MID",
      backgroundText2: "CAREER",
      videoSrc: "/videos/recruitment.mp4", // 実際のビデオパスに置き換えてください
      imageUrl: "/api/placeholder/640/360" // 開発用プレースホルダー
    }
  ];

  return (
    <section id="service-section" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-6 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <span className="inline-block">
              企業の「<span className="text-blue-600">可能性</span>」が、
            </span>
            <span className="inline-block">
              <span className="text-blue-600">広がる</span>、<span className="text-blue-600">伸びる</span>。
            </span>
          </h2>
          <p 
            className={`text-xl text-gray-600 transform transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            戦略的な採用計画の立案から、実務の改善まで。<br />
            企業の成長を加速させる包括的な採用支援サービスを提供します。
          </p>
        </div>

        {/* サービスリスト - Wantedlyスタイル */}
        {services.map((service, index) => (
          <section 
            key={index}
            className={`mb-32 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
              {/* コンテンツ部分 */}
              <div className="w-full md:w-1/2 p-8 md:p-12 relative">
                {/* 背景テキスト */}
                <div className="absolute top-0 right-0 -translate-y-1/2 opacity-10 z-0 pointer-events-none">
                  <div className="text-6xl md:text-8xl font-black tracking-tight text-gray-900 leading-none">
                    {service.backgroundText1}
                  </div>
                  <div className="text-6xl md:text-8xl font-black tracking-tight text-gray-900 leading-none">
                    {service.backgroundText2}
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {service.icon && <span className="mr-3">{service.icon}</span>}
                    {service.title}で
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  {service.categories && (
                    <div className="text-sm text-gray-500 mb-8">
                      {service.categories}
                    </div>
                  )}
                  <Link
                    href={service.path}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
              
              {/* 映像部分 */}
              <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-xl">
                {/* 本番環境ではvideoタグを使用 */}
                {/* <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                  src={service.videoSrc}
                ></video> */}
                
                {/* 開発用プレースホルダー画像 */}
                <Image
                  src={service.imageUrl}
                  width={640}
                  height={360}
                  alt={service.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </section>
        ))}

        {/* 全体CTA */}
        <div 
          className={`text-center mt-12 transform transition-all duration-700 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-md text-lg font-medium transition-colors"
          >
            無料相談を予約する
          </Link>
        </div>
      </div>
    </section>
  );
}