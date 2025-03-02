'use client';

import { useEffect, useState } from 'react';
import { Building, Star, Target } from 'lucide-react';

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (element) observer.unobserve(element);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const companyInfo = [
    { label: "企業名", value: "合同会社IDEAL RECRUIT" },
    { label: "本社所在地", value: "〒577-0806 大阪府東大阪市上小阪3-13-9" },
    { label: "代表者", value: "亀田 奎" },
    { label: "設立", value: "2022年" }
  ];

  const businessDetails = [
    "採用支援事業",
    "求人広告代理店事業",
    "アウトソーシング事業",
    "広告、マーケティング業務及び販売促進に関するコンサルティング業務",
    "前各号に附帯又は関連する一切の事業"
  ];

  return (
    <section id="about-section" className="relative py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container relative mx-auto px-4">
        {/* Philosophy Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-8 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span>Philosophy</span>
          </div>

          <h2 className={`text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            企業理念
          </h2>

          <div className={`relative mb-12 transform transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <p className="text-3xl font-bold text-white mb-8 leading-relaxed">
              共感する仲間とともに、
              <br />
              関わる全ての企業の理想の採用を実現する
            </p>
            <svg className="absolute w-full h-4 -bottom-4 left-0 text-blue-500 opacity-50" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </div>

          <div className={`text-blue-100 text-lg leading-relaxed space-y-6 transform transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <p>
              我々は媒体売りではありません。採用成功を第一に考え、企業様毎にベストなより採用成功に近付く為の手法、サービス、ノウハウを提供しております。
            </p>
            <p className="text-xl font-semibold text-white">
              全ては「正当に頑張ってる人が評価される社会を創る為に」
            </p>
            <p className="text-xl text-white">
              あなたの企業で活躍できる人材を我々と採用しませんか？
            </p>
          </div>
        </div>

        {/* Company Information */}
        <div className={`max-w-5xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Column - Company Details */}
              <div className="p-8 bg-gradient-to-br from-blue-600/90 to-blue-700/90 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Building className="w-6 h-6 mr-2" />
                  会社概要
                </h3>
                <div className="space-y-6">
                  {companyInfo.map((info, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-700 hover:translate-x-2 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <p className="text-blue-200 text-sm mb-1">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Business Details */}
              <div className="p-8 bg-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  事業内容
                </h3>
                <div className="space-y-4">
                  {businessDetails.map((detail, index) => (
                    <div
                      key={index}
                      className={`group flex items-start transform transition-all duration-700 hover:translate-x-2 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-blue-500/40 transition-colors">
                        {index + 1}
                      </span>
                      <p className="text-blue-100">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}