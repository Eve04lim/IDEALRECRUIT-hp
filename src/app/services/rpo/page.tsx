'use client';

import { useState, useEffect, useRef } from 'react';
import { Users, Check, ArrowRight, ChevronRight, UserCheck, FileText, MessageSquare, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// 型定義
interface SectionRefs {
  [key: string]: HTMLElement | null;
}

interface IntersectionState {
  [key: string]: boolean;
}

export default function RPOPage() {
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
      title: "スカウト送信の代行", 
      description: "効果的なスカウトメッセージの作成と送信を代行します。",
      icon: <MessageSquare className="w-6 h-6 text-blue-600" /> 
    },
    { 
      title: "求職者対応・書類選考代行", 
      description: "応募者とのコミュニケーションと書類選考を代行します。",
      icon: <FileText className="w-6 h-6 text-blue-600" /> 
    },
    { 
      title: "面接代行、面接同席", 
      description: "面接の実施や同席によるサポートを行います。",
      icon: <UserCheck className="w-6 h-6 text-blue-600" /> 
    },
    { 
      title: "入社後のフォロー", 
      description: "入社後の定着支援とフォローアップを実施します。",
      icon: <Shield className="w-6 h-6 text-blue-600" /> 
    }
  ];

  const benefits = [
    "採用業務の工数削減",
    "採用コストの最適化",
    "採用のスピードアップ",
    "質の高い人材の獲得"
  ];

  const wantedlyServices = [
    "記事作成",
    "スカウト送信",
    "募集作成",
    "上位表示対策"
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
            <span className="text-gray-900 font-medium">採用代行（RPO）</span>
          </div>
        </div>
      </div>

      {/* ヒーローセクション */}
      <section 
        id="hero-section"
        ref={setRef('hero')}
        className="relative py-32 bg-gradient-to-br from-indigo-800 to-blue-900 text-white overflow-hidden"
      >
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* パターン背景 */}
          <div className="absolute inset-0 bg-blue-900 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          {/* 光の効果 */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 mb-8 transform transition-all duration-1000 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Users className="w-5 h-5 mr-2" />
              <span>Recruit Process Outsourcing</span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transform transition-all duration-1000 delay-100 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              採用業務を
              <br />
              フルカスタマイズで代行
            </h1>
            
            <p className={`text-xl text-blue-100 mb-12 transform transition-all duration-1000 delay-200 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Wantedlyをメインに各媒体の運用代行から
              <br />
              面接面談など全ての採用業務を代行します。
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
                href="#intro-section"
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
              {/* テキスト */}
              <div className={`transform transition-all duration-1000 ${
                isIntersecting['intro-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">採用のプロが貴社の採用活動を代行</h2>
                  <p>
                    これまで、数多くの企業に対し、採用支援を実施した採用のプロが御社の採用プロセスを代行します。
                    採用代行サービスでは、御社に必要な項目だけを適正価格で実施します。
                  </p>
                  <p>
                    「応募は来るんだけど、面接は苦手」「媒体のスカウトの設定だけしたい」など、御社の悩みをお聞かせください。
                  </p>
                  
                  <blockquote className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700">
                      採用業務に時間を取られず、本来の業務に集中しませんか？必要な部分だけを任せることができます。
                    </p>
                  </blockquote>
                </div>
              </div>
              
              {/* イメージ */}
              <div className={`relative transform transition-all duration-1000 delay-300 ${
                isIntersecting['intro-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/api/placeholder/600/400"
                    alt="採用代行サービス"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                </div>
                
                {/* 統計データ */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl font-bold text-blue-600 mb-1">60%</div>
                  <div className="text-gray-600 text-sm">採用業務工数削減</div>
                </div>
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
              <p className="text-blue-600 font-medium mb-2">Our Services</p>
              <h2 className="text-3xl font-bold mb-4">採用代行サービス内容</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                以下のサービス内容から、貴社のニーズに合わせて必要なものだけを選択いただけます。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative bg-white p-8 rounded-xl shadow-lg transform transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                    isIntersecting['features-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 rounded-l-xl"></div>
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mr-6 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`text-center mt-12 transform transition-all duration-1000 delay-800 ${
              isIntersecting['features-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-gray-600 mb-6">他にも採用業務のパーツごとにカスタマイズが可能です</p>
              <a
                href="#wantedly-section"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors group"
              >
                Wantedly運用代行を見る
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* メリットセクション */}
      <section 
        id="benefits-section"
        ref={setRef('benefits')}
        className="py-24 bg-white relative overflow-hidden"
      >
        {/* 装飾 */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full opacity-80 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-50 rounded-full opacity-80 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['benefits-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2">Our Benefits</p>
              <h2 className="text-3xl font-bold mb-4">導入メリット</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                採用代行サービスの導入により、以下のメリットが得られます。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`bg-blue-50 rounded-xl p-6 transform transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                    isIntersecting['benefits-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit}</h3>
                  <div className="w-12 h-1 bg-blue-600 rounded-full mb-4"></div>
                  <p className="text-gray-600">
                    {index === 0 && "採用業務にかかる時間を大幅に削減し、本業に集中できます。"}
                    {index === 1 && "効率的な採用活動により、採用コストを最適化できます。"}
                    {index === 2 && "プロによる代行で、採用プロセスが迅速化します。"}
                    {index === 3 && "専門知識を活かした採用で、優秀な人材を獲得できます。"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wantedly運用代行セクション */}
      <section 
        id="wantedly-section"
        ref={setRef('wantedly')}
        className="py-24 bg-gray-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* 左側: コンテンツ */}
              <div className={`transform transition-all duration-1000 ${
                isIntersecting['wantedly-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <p className="text-blue-300 font-medium mb-2">Wantedly Expert</p>
                <h2 className="text-3xl font-bold mb-6">Wantedly運用代行</h2>
                <p className="text-lg text-blue-100 mb-6">
                  弊社は数少ない、Wantedlyを代理店として扱っている企業です。
                  これまで、八百屋さん、工場、人材会社、外資系スタートアップコンサル会社など100社以上の会社様のWantedly運用の支援を実施しました。
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {wantedlyServices.map((service, index) => (
                    <div 
                      key={index}
                      className="flex items-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-700/50 flex items-center justify-center mr-4">
                        <Check className="w-5 h-5 text-blue-300" />
                      </div>
                      <span className="text-lg font-medium">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <p className="text-blue-100">
                    そのノウハウを持って、幅広く運用を代行致します。専門性の高いWantedly運用のことならお任せください。
                  </p>
                </div>
              </div>
              
              {/* 右側: 画像 */}
              <div className={`transform transition-all duration-1000 delay-300 ${
                isIntersecting['wantedly-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/api/placeholder/600/400"
                    alt="Wantedly運用代行"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  
                  {/* オーバーレイコンテンツ */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                      <div className="flex items-center mb-4">
                        <Users className="w-6 h-6 text-blue-300 mr-3" />
                        <h3 className="text-xl font-bold">採用成功実績</h3>
                      </div>
                      <div className="text-4xl font-bold mb-2">100社+</div>
                      <p className="text-blue-100">さまざまな業界のWantedly運用を支援</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* プロセスセクション */}
      <section 
        id="process-section"
        ref={setRef('process')}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['process-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2">Our Process</p>
              <h2 className="text-3xl font-bold mb-4">サービス導入の流れ</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                採用代行サービスの導入から運用までの流れをご紹介します。
              </p>
            </div>
            
            <div className="relative">
              {/* 中央線 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-200 transform -translate-x-1/2"></div>
              
              <div className="space-y-20">
                {[
                  {
                    title: "ヒアリング・現状分析",
                    description: "貴社の採用課題や目標、現状の採用活動についてヒアリングします。",
                    icon: <MessageSquare className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "ご提案・サービス設計",
                    description: "貴社に最適な採用代行サービスの内容と範囲をご提案します。",
                    icon: <FileText className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "契約・運用開始",
                    description: "サービス内容に合意いただいた後、採用代行の運用を開始します。",
                    icon: <Check className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "定期報告・改善",
                    description: "定期的に採用活動の成果を報告し、必要に応じて改善策を実施します。",
                    icon: <Users className="w-6 h-6 text-blue-600" />
                  }
                ].map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center transform transition-all duration-700 ${
                      isIntersecting['process-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'order-last pl-12'}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 border-4 border-white shadow-lg flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                    
                    <div className={`w-1/2 ${index % 2 === 0 ? 'order-last pl-12' : 'pr-12 text-right'}`}>
                      <div className="text-5xl font-bold text-blue-100">0{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section 
        id="cta-section"
        ref={setRef('cta')}
        className="py-24 bg-gradient-to-r from-blue-800 to-indigo-800 text-white"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isIntersecting['cta-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              採用業務を専門家に任せて
              <br />
              本業に集中しませんか？
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              貴社の採用課題に合わせたカスタマイズプランをご提案します。
              <br />
              初回相談は無料です。お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors group shadow-lg"
            >
              ご相談はこちら
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}