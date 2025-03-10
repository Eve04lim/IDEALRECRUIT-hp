'use client';

import { useState, useEffect, useRef } from 'react';
import { BarChart, Check, ArrowRight, ChevronRight, ChevronDown, LineChart, Users, Target, Building } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// 型定義
interface SectionRefs {
  [key: string]: HTMLElement | null;
}

interface IntersectionState {
  [key: string]: boolean;
}

export default function AnalyticsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<SectionRefs>({});
  const [isIntersecting, setIsIntersecting] = useState<IntersectionState>({});

  useEffect(() => {
    // スクロール進行状況の監視
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          if (!activeSection) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 監視する要素を登録
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  const benefits = [
    {
      icon: <LineChart className="w-8 h-8 text-blue-600" />,
      title: "データ分析に基づく採用",
      description: "社内の優秀層分析により、入社後のパフォーマンスを予測し、より適切な人材採用を実現します。",
      metrics: { value: "200%", label: "採用効率向上" }
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "的確な人材評価",
      description: "客観的な評価指標を設定し、公平で効果的な人材配置を可能にします。",
      metrics: { value: "95%", label: "評価精度" }
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "文化適合性の向上",
      description: "企業文化との適合性を重視した採用により、長期的な定着率の向上を実現します。",
      metrics: { value: "90%", label: "定着率" }
    }
  ];

  const process = [
    {
      title: "事実確認",
      description: "貴社で活躍する人材の行動特性を洗い出し。貴社にて入力していただくシートと、現地orWebでのインタビューを行います。",
      details: [
        "現状の採用状況の把握",
        "成功事例と課題の特定",
        "組織文化の理解"
      ]
    },
    {
      title: "ペルソナ設計",
      description: "自社優秀層群を発見し、優秀層のポテンシャル、コンピテンシーを把握。採用ターゲットを明確にします。",
      details: [
        "データに基づく人材要件の定義",
        "具体的な採用ターゲットの設定",
        "評価基準の確立"
      ]
    },
    {
      title: "ブランディング",
      description: "採用ターゲットに合わせた採用戦略を立案します。",
      details: [
        "採用メッセージの策定",
        "採用媒体の選定",
        "アプローチ方法の決定"
      ]
    },
    {
      title: "選考",
      description: "応募者対応、採用面接についても、弊社でサポートいたします。",
      details: [
        "選考プロセスの設計",
        "面接官トレーニング",
        "評価シートの作成"
      ]
    },
    {
      title: "入社",
      description: "理想の社員から逆算した、採用により、「活躍できる社員」が入社いたします。",
      details: [
        "内定者フォロー",
        "入社後の定着支援",
        "効果測定と改善"
      ]
    }
  ];

  const cases = [
    {
      image: "/api/placeholder/600/400",
      company: "IT企業 A社",
      industry: "IT・通信",
      result: "エンジニア採用数 200% 増加",
      description: "データ分析により理想の人材像を明確化し、採用基準を最適化。応募者数と採用率が大幅に向上。"
    },
    {
      image: "/api/placeholder/600/400",
      company: "製造業 B社",
      industry: "製造",
      result: "定着率 95% 達成",
      description: "社内優秀人材の特性を分析し、文化適合性を重視した採用を実施。入社後の定着率が改善。"
    }
  ];

  // ref設定用のヘルパー関数を修正
  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current[id] = el;
    }
  };

  return (
    <>
      {/* スクロール進行バー */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* パンくずリスト */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/services" className="hover:text-blue-600 transition-colors">サービス</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">採用分析</span>
          </div>
        </div>
      </div>

      {/* ヒーローセクション - より洗練されたデザインに */}
      <section 
        id="hero-section"
        ref={setRef('hero')}
        className="relative py-36 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-white"></div>
        
        {/* 装飾的な背景要素 - より現代的な雰囲気に */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-100 rounded-full opacity-50 blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-100 rounded-full opacity-40 blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-teal-100 rounded-full opacity-30 blur-xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* コンテンツ - より強調されたテキスト */}
              <div className={`transform transition-all duration-1000 ${isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center text-blue-600 mb-6">
                  <BarChart className="w-6 h-6 mr-2" />
                  <span className="text-lg font-medium tracking-wide">Data Analytics</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  社内優秀層から逆算した
                  <br />
                  <span className="relative inline-block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    理想の採用を実現
                    <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-12 max-w-xl leading-relaxed">
                  「仕事にあった人を起用する。」弊社の採用分析事業では、社内で評価が高く活躍している理想的な社員の採用をサポートします。
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:translate-y-[-2px] transition-all duration-300 group shadow-lg hover:shadow-blue-200"
                  >
                    無料相談を予約する
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <button
                    onClick={() => {
                      document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center px-8 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  >
                    詳しく見る
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>

              {/* ヒーロー画像 - よりモダンな表示 */}
              <div className={`relative transform transition-all duration-1000 delay-300 ${isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                  <Image
                    src="/api/placeholder/800/800"
                    alt="Data Analytics"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                
                {/* フローティング統計 - より洗練されたカード */}
                <div className="absolute -right-8 -bottom-8 bg-white rounded-xl shadow-xl p-6 transform hover:-translate-y-1 transition-transform duration-300 ring-1 ring-black/5">
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">99.9%</div>
                  <div className="text-gray-600 text-sm font-medium">採用成功率</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メリットセクション - カードデザインを改善 */}
      <section 
        id="benefits"
        ref={setRef('benefits')}
        className="py-28 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${isIntersecting['benefits'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-blue-600 font-medium mb-2 tracking-wide">Why Choose Us</p>
              <h2 className="text-3xl font-bold mb-4">採用分析によるメリット</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                データに基づいた採用戦略により、採用効率の向上と最適な人材の獲得を実現します。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${isIntersecting['benefits'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6">{benefit.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{benefit.metrics.value}</span>
                    <span className="text-gray-500 ml-2">{benefit.metrics.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* プロセスセクション - タイムラインを改善 */}
      <section 
        id="process"
        ref={setRef('process')}
        className="py-28 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${isIntersecting['process'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-blue-600 font-medium mb-2 tracking-wide">Our Process</p>
              <h2 className="text-3xl font-bold mb-4">採用までの流れ</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                データ分析から採用成功まで、一貫したプロセスで貴社の採用をサポートします。
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* プロセスステップ - ビジュアルを強化 */}
              <div className="space-y-12">
                {process.map((step, index) => (
                  <div 
                    key={index}
                    className={`relative group transform transition-all duration-700 ${isIntersecting['process'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                          {index + 1}
                        </div>
                        {index < process.length - 1 && (
                          <div className="w-px h-full bg-gradient-to-b from-blue-400 to-indigo-400 mx-auto mt-4"></div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="bg-white rounded-xl p-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-2 border border-gray-100">
                          <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          <div className="space-y-2">
                            {step.details.map((detail, i) => (
                              <div key={i} className="flex items-start">
                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                                  <Check className="w-3 h-3 text-blue-600" />
                                </div>
                                <span className="text-gray-600">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* プロセス画像 - より洗練された表示 */}
              <div className={`relative hidden lg:block transform transition-all duration-1000 ${isIntersecting['process'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="sticky top-20">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                    <Image
                      src="/api/placeholder/600/450"
                      alt="Recruitment Process"
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                    
                    {/* フローティングデータポイント - より洗練されたカード */}
                    <div className="absolute top-1/4 left-1/4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 transform -translate-x-1/2 -translate-y-1/2 border border-white/20">
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">40%</div>
                      <div className="text-gray-600 text-xs font-medium">コスト削減</div>
                    </div>
                    
                    <div className="absolute bottom-1/3 right-1/4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 transform translate-x-1/2 translate-y-1/2 border border-white/20">
                      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">2倍</div>
                      <div className="text-gray-600 text-xs font-medium">採用効率</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 導入事例セクション - カードデザインを改善 */}
      <section 
        id="cases"
        ref={setRef('cases')}
        className="py-28 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${isIntersecting['cases'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-blue-600 font-medium mb-2 tracking-wide">Success Stories</p>
              <h2 className="text-3xl font-bold mb-4">導入事例</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                データ分析を活用した採用改革により、多くの企業様が採用課題を解決しています。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cases.map((case_, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform border border-gray-100 ${isIntersecting['cases'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative h-60">
                    <Image
                      src={case_.image}
                      alt={case_.company}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                        {case_.industry}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{case_.company}</h3>
                    <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">{case_.result}</div>
                    <p className="text-gray-600 mb-4">{case_.description}</p>
                    <Link
                      href={`/cases/${index + 1}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                    >
                      詳細を見る
                      <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`text-center mt-12 transform transition-all duration-1000 delay-500 ${isIntersecting['cases'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                href="/cases"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
              >
                すべての導入事例を見る
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション - より魅力的なデザイン */}
      <section 
        id="cta"
        ref={setRef('cta')}
        className="py-28 bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden"
      >
        {/* 背景装飾 - より豊かな背景 */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-teal-500/10 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isIntersecting['cta'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              まずは無料相談から
              <br />
              始めてみませんか？
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              30分の無料相談で、貴社の課題に合わせた
              <br />
              最適な採用改善方法をご提案いたします。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 hover:-translate-y-1 transition-all group shadow-lg"
              >
                無料相談を予約する
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/cases"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white/10 hover:-translate-y-1 transition-all"
              >
                導入事例を見る
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 関連サービスセクション - カードデザインを改善 */}
      <section 
        id="related"
        ref={setRef('related')}
        className="py-28 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${isIntersecting['related'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-blue-600 font-medium mb-2 tracking-wide">More Solutions</p>
              <h2 className="text-3xl font-bold mb-4">関連サービス</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                貴社の採用課題に合わせて、様々なサービスをご用意しています。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "RPO（採用代行）",
                  description: "採用業務をフルカスタマイズで代行し、貴社の採用目標達成をサポートします。",
                  icon: <Users className="w-6 h-6 text-blue-600" />,
                  link: "/services/rpo"
                },
                {
                  title: "成果報酬型採用",
                  description: "採用成功時のみ費用が発生する、リスクの少ない採用支援サービスです。",
                  icon: <Target className="w-6 h-6 text-blue-600" />,
                  link: "/services/performance"
                },
                {
                  title: "中途採用支援",
                  description: "貴社に最適な求人媒体の選定から、採用成功までをサポートします。",
                  icon: <Building className="w-6 h-6 text-blue-600" />,
                  link: "/services/recruitment"
                }
              ].map((service, index) => (
                <Link
                  key={index}
                  href={service.link}
                  className={`block bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform border border-gray-100 ${isIntersecting['related'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <span className="inline-flex items-center text-blue-600 font-medium group">
                    詳細を見る
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}