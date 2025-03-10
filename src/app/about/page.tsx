'use client';

import { ArrowRight, Building, Calendar, ChevronRight, MapPin, Star, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// 型定義
interface SectionRefs {
  [key: string]: HTMLElement | null;
}

interface IntersectionState {
  [key: string]: boolean;
}

export default function AboutPage() {
  const [isIntersecting, setIsIntersecting] = useState<IntersectionState>({});
  const sectionRefs = useRef<SectionRefs>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    // マウス位置の追跡
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // パララックス効果用の値を計算
  const parallaxOffset = {
    x: mousePosition.x * 30,
    y: mousePosition.y * 30
  };

  // ref設定用のヘルパー関数
  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current[id] = el;
    }
    return null;
  };

  // 会社情報
  const companyInfo = [
    { label: "企業名", value: "合同会社IDEAL RECRUIT", icon: <Building className="w-5 h-5 text-blue-600" /> },
    { label: "本社所在地", value: "〒577-0806 大阪府東大阪市上小阪3-13-9", icon: <MapPin className="w-5 h-5 text-blue-600" /> },
    { label: "代表者", value: "亀田 奎", icon: <User className="w-5 h-5 text-blue-600" /> },
    { label: "設立", value: "2022年", icon: <Calendar className="w-5 h-5 text-blue-600" /> }
  ];

  // 事業内容
  const businessDetails = [
    "採用支援事業",
    "求人広告代理店事業",
    "アウトソーシング事業",
    "広告、マーケティング業務及び販売促進に関するコンサルティング業務",
    "前各号に附帯又は関連する一切の事業"
  ];

  // 価値観
  const values = [
    {
      title: "信頼",
      description: "誠実さと透明性を大切にし、クライアントとの長期的な信頼関係を築きます。",
      emoji: "🤝"
    },
    {
      title: "専門性",
      description: "採用のプロフェッショナルとして、常に最新の知識と技術を追求します。",
      emoji: "🔍"
    },
    {
      title: "革新",
      description: "従来の採用手法にとらわれず、新しいアプローチで課題解決に取り組みます。",
      emoji: "💡"
    },
    {
      title: "共創",
      description: "クライアントと共に考え、共に成長し、最適な採用を実現します。",
      emoji: "🌱"
    }
  ];

  return (
    <>
      {/* パンくずリスト */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">会社概要</span>
          </div>
        </div>
      </div>

      {/* ヒーローセクション */}
      <section 
        id="hero-section"
        ref={setRef('hero')}
        className="relative py-32 bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden"
      >
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* パターン背景 */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>

          {/* パララックス要素 */}
          <div 
            className="absolute top-10 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" 
            style={{ 
              transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"
            style={{ 
              transform: `translate(${-parallaxOffset.x}px, ${-parallaxOffset.y}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          ></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 mb-8 transform transition-all duration-1000 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Star className="w-5 h-5 mr-2" />
              <span>About Us</span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transform transition-all duration-1000 delay-100 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              理想の採用を実現する
              <br />
              <span className="relative inline-block">
                採用のプロフェッショナル
                <span className="absolute bottom-2 left-0 w-full h-1 bg-blue-400/70"></span>
              </span>
            </h1>
            
            <p className={`text-xl text-blue-100 mb-12 transform transition-all duration-1000 delay-200 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              企業と人材の可能性を最大限に引き出し、
              <br />
              理想的な採用を実現するパートナーとして共に成長します。
            </p>
          </div>
        </div>
      </section>

      {/* 企業理念セクション */}
      <section 
        id="philosophy-section"
        ref={setRef('philosophy')}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* 左側: 画像 */}
              <div className={`relative transform transition-all duration-1000 ${
                isIntersecting['philosophy-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/api/placeholder/600/600"
                    alt="企業理念"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                </div>
                
                {/* 装飾 */}
                <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-blue-50 -z-10"></div>
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                  <div className="text-2xl font-bold text-blue-600 mb-3">企業理念</div>
                  <p className="text-gray-700">共感する仲間とともに、関わる全ての企業の理想の採用を実現する</p>
                </div>
              </div>
              
              {/* 右側: テキスト */}
              <div className={`transform transition-all duration-1000 delay-300 ${
                isIntersecting['philosophy-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <h2 className="text-3xl font-bold mb-8 text-gray-900">私たちの想い</h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="mb-6">
                    我々は媒体売りではありません。採用成功を第一に考え、企業様毎にベストなより採用成功に近付く為の手法、サービス、ノウハウを提供しております。
                  </p>
                  <blockquote className="bg-blue-50 p-6 rounded-xl mb-6">
                    <p className="text-blue-900 font-medium text-xl italic">
                      全ては「正当に頑張ってる人が評価される社会を創る為に」
                    </p>
                  </blockquote>
                  <p>
                    あなたの企業で活躍できる人材を我々と採用しませんか？
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/services"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors group shadow-lg"
                  >
                    サービスを見る
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要セクション */}
      <section 
        id="company-section"
        ref={setRef('company')}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['company-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2">Company Profile</p>
              <h2 className="text-3xl font-bold mb-4">会社概要</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                採用のプロフェッショナルとして、常に最高のサービスを提供します。
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* 左側: 会社情報 */}
                <div className={`p-8 transform transition-all duration-1000 delay-100 ${
                  isIntersecting['company-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <h3 className="text-2xl font-bold mb-8 text-gray-900">基本情報</h3>
                  <div className="space-y-6">
                    {companyInfo.map((info, index) => (
                      <div key={index} className="flex">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mr-4">
                          {info.icon}
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">{info.label}</div>
                          <div className="text-gray-900 font-medium">{info.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 右側: 事業内容 */}
                <div className={`p-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white transform transition-all duration-1000 delay-200 ${
                  isIntersecting['company-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <h3 className="text-2xl font-bold mb-8">事業内容</h3>
                  <div className="space-y-4">
                    {businessDetails.map((detail, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                          <span className="text-white font-medium text-sm">{index + 1}</span>
                        </div>
                        <p className="text-blue-50">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 価値観セクション */}
      <section 
        id="values-section"
        ref={setRef('values')}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['values-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2">Our Values</p>
              <h2 className="text-3xl font-bold mb-4">私たちの価値観</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                これらの価値観を大切にしながら、質の高いサービスを提供しています。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                    isIntersecting['values-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-5xl mb-6">{value.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
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
              理想の採用を
              <br />
              一緒に実現しませんか？
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              お気軽にお問い合わせください。
              <br />
              貴社の採用課題解決に向けて、最適なプランをご提案いたします。
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors group shadow-lg"
              >
                お問い合わせ
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
              >
                サービスを見る
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* アクセスセクション */}
      <section 
        id="access-section"
        ref={setRef('access')}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['access-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2">Access</p>
              <h2 className="text-3xl font-bold mb-4">アクセス</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                お気軽にご連絡・ご来社ください。
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 左側: 地図 */}
              <div className={`bg-gray-100 rounded-xl overflow-hidden h-96 transform transition-all duration-1000 ${
                isIntersecting['access-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.7292508517177!2d135.57644937577214!3d34.67430128036739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e4de5c34e855%3A0xe1d4d34e52eb8a!2z5pel5pys55yM5p2x5aSn5ZyS5biC5LiK5bCP6Zmi77yTMS0xMy055Y-3!5e0!3m2!1sja!2sjp!4v1705559183210!5m2!1sja!2sjp"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              
              {/* 右側: 情報 */}
              <div className={`transform transition-all duration-1000 delay-200 ${
                isIntersecting['access-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">本社</h3>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p>
                    〒577-0806 大阪府東大阪市上小阪3-13-9
                  </p>
                  <h4 className="text-xl font-bold mt-8 mb-4">お問い合わせ</h4>
                  <p>
                    お問い合わせは下記リンクよりお願いいたします。
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors group shadow-md"
                  >
                    お問い合わせフォーム
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}