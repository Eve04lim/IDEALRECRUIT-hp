'use client';

import { useState, useEffect, useRef } from 'react';
import { Building, Check, ArrowRight, ChevronRight, Briefcase, Globe, BarChart, Monitor } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// 型定義
interface SectionRefs {
  [key: string]: HTMLElement | null;
}

interface IntersectionState {
  [key: string]: boolean;
}

export default function RecruitmentPage() {
  const [isIntersecting, setIsIntersecting] = useState<IntersectionState>({});
  const sectionRefs = useRef<SectionRefs>({});

  useEffect(() => {
    // 要素の可視性を監視するIntersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          setIsIntersecting(prev => ({ ...prev, [id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 監視する要素を登録
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      title: "媒体選定",
      description: "type, doda, マイナビなど、貴社の採用ニーズに最適な媒体をご提案します。"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "原稿作成",
      description: "応募率を高める魅力的な求人原稿を作成します。"
    },
    {
      icon: <BarChart className="w-6 h-6 text-blue-600" />,
      title: "KPI管理",
      description: "応募数や採用コストなど、重要指標の管理と改善を行います。"
    },
    {
      icon: <Monitor className="w-6 h-6 text-blue-600" />,
      title: "運用改善",
      description: "掲載後の効果分析と継続的な運用改善を実施します。"
    }
  ];

  const media = [
    { name: "type", category: "総合転職サイト" },
    { name: "doda", category: "総合転職サイト" },
    { name: "マイナビ転職", category: "総合転職サイト" },
    { name: "Green", category: "IT特化型" },
    { name: "Wantedly", category: "スタートアップ特化" },
    { name: "キャリトレ", category: "エージェント・求人サイト複合" },
    { name: "ビズリーチ", category: "ハイクラス向け" },
    { name: "AMBI", category: "若手特化" }
  ];

  const benefits = [
    "最適な媒体の選定による採用効率の向上",
    "採用予算の最適化と費用対効果の最大化",
    "各媒体の特性を活かした採用戦略の立案",
    "運用負荷の軽減と採用業務の効率化"
  ];

  // ref設定用のヘルパー関数
  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current[id] = el;
    }
    return null;
  };

  return (
    <>
      {/* パンくずリスト */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/services" className="hover:text-blue-600 transition-colors">サービス</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">中途採用支援</span>
          </div>
        </div>
      </div>

      {/* ヒーローセクション */}
      <section 
        id="hero-section"
        ref={setRef('hero')}
        className="relative py-32 bg-gradient-to-br from-blue-800 to-indigo-900 text-white overflow-hidden"
      >
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi02aDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-center opacity-20"></div>
          </div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 mb-8 transform transition-all duration-1000 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Building className="w-5 h-5 mr-2" />
              <span>Intermediate Recruitment</span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transform transition-all duration-1000 delay-100 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              最適な媒体選定で
              <br />
              採用の成功を実現
            </h1>
            
            <p className={`text-xl text-blue-100 mb-12 transform transition-all duration-1000 delay-200 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              type, doda, マイナビなど貴社に最も合う求人広告を
              <br />
              ご提案し、採用成功までサポートします。
            </p>
            
            <div className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 delay-300 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors group shadow-lg"
              >
                無料相談を予約する
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features-section"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
              >
                詳細を見る
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* イントロダクションセクション */}
      <section 
        id="intro-section"
        ref={setRef('intro')}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* 左側: イメージ */}
              <div className={`relative transform transition-all duration-1000 ${
                isIntersecting['intro-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/api/placeholder/600/450"
                    alt="中途採用支援"
                    width={600}
                    height={450}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                </div>
                
                {/* 装飾 */}
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-100 rounded-full"></div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-100 rounded-full"></div>
              </div>
              
              {/* 右側: コンテンツ */}
              <div className={`prose prose-lg max-w-none text-gray-600 transform transition-all duration-1000 delay-300 ${
                isIntersecting['intro-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">最適な媒体選定で採用効果を最大化</h2>
                  <p>
                    弊社では、数多くの中途採用媒体を取り扱っており、採用戦略に応じた適切な媒体をご提案いたします。
                    具体的には、採用予算、採用ターゲット、その時々での各媒体のキャンペーン状況を踏まえ、最適な媒体選びから、求人運用までを並走いたします。
                  </p>
                  <p>
                    各媒体の運用方法や求人広告内容については、これまでの採用支援のノウハウを結集して、採用のプロがサポートします。
                  </p>
                </div>
                
                <blockquote className="bg-blue-50 px-6 py-4 rounded-lg">
                  <p className="text-blue-700 font-medium">
                    「どの求人媒体を使えばいいのかわからない」「予算を効果的に使いたい」というお悩みをお持ちの企業様に、最適な採用支援をご提供します。
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section 
        id="features-section"
        ref={setRef('features')}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['features-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2">Our Features</p>
              <h2 className="text-3xl font-bold mb-4">サービスの特徴</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                中途採用支援サービスでは、媒体選定から運用改善まで幅広くサポートします。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white shadow-lg rounded-xl p-6 transform transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                    isIntersecting['features-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="mb-4 w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 媒体一覧セクション */}
      <section 
        id="media-section"
        ref={setRef('media')}
        className="py-24 bg-white relative overflow-hidden"
      >
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full opacity-80 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-50 rounded-full opacity-80 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['media-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2">Our Media</p>
              <h2 className="text-3xl font-bold mb-4">取扱い媒体一覧</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                貴社のニーズに合わせて、最適な求人媒体をご提案します。
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.map((item, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform ${
                    isIntersecting['media-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="font-bold text-lg text-gray-900 mb-2">{item.name}</div>
                  <div className="text-sm text-blue-600">{item.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* メリットセクション */}
      <section 
        id="benefits-section"
        ref={setRef('benefits')}
        className="py-24 bg-blue-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* 左側: コンテンツ */}
              <div className={`transform transition-all duration-1000 ${
                isIntersecting['benefits-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <p className="text-blue-300 font-medium mb-2">Our Benefits</p>
                <h2 className="text-3xl font-bold mb-8">導入メリット</h2>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-start"
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <p className="ml-4 text-blue-100 text-lg">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 右側: 画像 */}
              <div className={`transform transition-all duration-1000 delay-500 ${
                isIntersecting['benefits-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/api/placeholder/600/400"
                    alt="導入メリット"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                  
                  {/* オーバーレイコンテンツ */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                      <h3 className="text-2xl font-bold mb-2">採用効率の向上</h3>
                      <p className="text-blue-100">最適な媒体選定で効果を最大化</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section 
        id="cta-section"
        ref={setRef('cta')}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isIntersecting['cta-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              貴社に最適な中途採用戦略を
              <br />
              一緒に考えましょう
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              採用予算、採用ターゲット、スケジュールに合わせて、
              <br />
              最適な採用媒体と戦略をご提案いたします。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors group shadow-lg"
            >
              ご相談はこちら
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );