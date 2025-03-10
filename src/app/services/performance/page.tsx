'use client';

import { useState, useEffect, useRef } from 'react';
import { Target, Check, ArrowRight, ChevronRight, Star, Award, Settings, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// 型定義
interface SectionRefs {
  [key: string]: HTMLElement | null;
}

interface IntersectionState {
  [key: string]: boolean;
}

export default function PerformancePage() {
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

  const steps = [
    {
      title: "採用ペルソナ確認",
      description: "お打ち合わせの際に、採用ターゲットや選考基準についてお伺いします。",
      icon: <Target className="w-6 h-6 text-blue-600" />
    },
    {
      title: "求人原稿の作成",
      description: "求人原稿について、Indeedのアルゴリズムや勝ち筋を完全に把握したスタッフが作成いたします。",
      icon: <Settings className="w-6 h-6 text-blue-600" />
    },
    {
      title: "求人の掲載",
      description: "AirworkやIndeed、engageなど、多くの無料媒体を組み合わせ、求人広告の出稿を行います。",
      icon: <Award className="w-6 h-6 text-blue-600" />
    },
    {
      title: "書類選考・面接",
      description: "御社にて、書類選考・面接等の採用フローを進めていただきます。",
      icon: <Clock className="w-6 h-6 text-blue-600" />
    },
    {
      title: "採用成功報酬",
      description: "採用数と年収に応じて、成果報酬をいただきます。採用してから料金が発生するので、貴社のリスクを減らし採用を進められます。",
      icon: <Star className="w-6 h-6 text-blue-600" />
    }
  ];

  const benefits = [
    "初期費用0円で採用活動が可能",
    "採用成功時のみの費用発生",
    "リスクを最小限に抑えた採用活動",
    "効果的な求人原稿の作成サポート"
  ];

  const stats = [
    { value: "0円", label: "初期費用" },
    { value: "85%", label: "平均採用効率" },
    { value: "30%", label: "人材紹介比コスト削減" }
  ];

  // ref設定用のヘルパー関数を修正
  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current[id] = el;
    }
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
            <span className="text-gray-900 font-medium">成果報酬型採用</span>
          </div>
        </div>
      </div>

      {/* ヒーローセクション - より現代的なデザインに */}
      <section 
        id="hero-section"
        ref={setRef('hero')}
        className="relative py-36 bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden"
      >
        {/* 背景装飾 - より豊かな背景表現 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-white/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-white/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-indigo-400/10 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 mb-8 transform transition-all duration-1000 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Target className="w-5 h-5 mr-2" />
              <span className="tracking-wide">Performance Reward</span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transform transition-all duration-1000 delay-100 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              成果報酬型採用代行で
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">リスクを最小限に</span>
            </h1>
            
            <p className={`text-xl text-blue-100 mb-12 transform transition-all duration-1000 delay-200 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              人材紹介会社よりも安価に。求人票作成や運用管理などは全て弊社で行い、
              <br />
              採用できたら費用が発生する完全成果報酬のサービスです。
            </p>
            
            <div className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 delay-300 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 group shadow-lg"
              >
                無料相談を予約する
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#stats-section"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                詳細を見る
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 統計セクション - より洗練されたカードデザイン */}
      <section
        id="stats-section"
        ref={setRef('stats')}
        className="py-28 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-md transform transition-all duration-1000 hover:shadow-lg hover:-translate-y-1 border border-gray-100 ${
                    isIntersecting['stats-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">{stat.value}</div>
                  <div className="text-gray-600 font-medium text-center">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 紹介セクション - より洗練されたデザイン */}
      <section
        id="intro-section"
        ref={setRef('intro')}
        className="py-28 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* 画像 - より洗練された表示 */}
              <div className={`relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-1000 ring-1 ring-black/5 ${
                isIntersecting['intro-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <Image
                  src="/api/placeholder/600/500"
                  alt="Indeed採用プロセス"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                
                {/* オーバーレイテキスト - より視認性の高いデザイン */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">効率的な採用を実現</h3>
                  <p className="text-blue-100">成果報酬型だから、リスクなく始められます</p>
                </div>
              </div>
              
              {/* テキスト - より読みやすいデザイン */}
              <div className={`transform transition-all duration-1000 delay-300 ${
                isIntersecting['intro-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-6 relative inline-block">
                    Indeedとは?
                    <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  </h2>
                  <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                    <p>
                      Indeedは求人を検索できる求人情報専門の検索エンジンです。ユーザー数が多く、不人気職種(運転手、ブルーワーカー)でも堅実な効果が見込めます。
                    </p>
                    <p>
                      弊社では、Airworkやengageなど、掲載することでIndeedにも転載される求人媒体を用いることで、成功報酬型の採用パッケージをご提案しております。
                    </p>
                    <p>
                      初期費用0円で採用できた分だけの料金なので、リスクが少ない採用を始められます。
                    </p>
                  </div>
                </div>
                
                {/* メリット - より洗練されたリスト表示 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100/20 shadow-sm">
                  <h3 className="text-xl font-bold mb-6">導入メリット</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div 
                        key={index} 
                        className="flex items-start"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                          <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="ml-4 text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* プロセスセクション - より洗練されたカードデザイン */}
      <section
        id="process-section"
        ref={setRef('process')}
        className="py-28 bg-white relative overflow-hidden"
      >
        {/* 装飾 - より豊かな背景 */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50 rounded-full opacity-80 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-50 rounded-full opacity-80 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-teal-50 rounded-full opacity-80 blur-xl"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['process-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2 tracking-wide">Our Process</p>
              <h2 className="text-3xl font-bold mb-4">採用までの流れ</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                成功報酬型採用の流れをご紹介します。費用は採用成功時のみ発生するので安心です。
              </p>
            </div>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl shadow-lg p-6 flex transform transition-all duration-700 hover:shadow-xl hover:-translate-y-1 border border-gray-100 ${
                    isIntersecting['process-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="mr-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md border border-blue-100/20">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-2">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション - より魅力的なデザイン */}
      <section 
        id="cta-section"
        ref={setRef('cta')}
        className="py-28 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden"
      >
        {/* 背景装飾 - より豊かな背景 */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isIntersecting['cta-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              リスクなし、初期費用0円で
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">採用活動を始めましょう</span>
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              成果報酬型採用なら、採用が成功した場合のみ費用が発生。
              <br />
              貴社のリスクを最小限に抑えた採用活動が可能です。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 group shadow-lg"
            >
              無料相談を予約する
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}