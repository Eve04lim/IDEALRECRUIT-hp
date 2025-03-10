'use client';

import { ArrowRight, Award, CheckCircle, FileText, Phone, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function FlowSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('flow-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const steps = [
    {
      Icon: Phone,
      title: "初回相談",
      description: "お客様の課題やニーズをヒアリングし、最適なソリューションをご提案します。",
      time: "30分程度",
      color: "from-blue-500 to-blue-600"
    },
    {
      Icon: FileText,
      title: "戦略立案",
      description: "採用ターゲットの設定や、具体的な採用手法の選定を行います。",
      time: "1週間程度",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      Icon: Users,
      title: "実行支援",
      description: "求人掲載や候補者対応など、実際の採用活動をサポートします。",
      time: "1-3ヶ月",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      Icon: CheckCircle,
      title: "採用成功",
      description: "内定承諾から入社までのフォローを行い、採用成功を実現します。",
      time: "～入社まで",
      color: "from-green-500 to-green-600"
    },
    {
      Icon: Award,
      title: "継続支援",
      description: "入社後のフォローアップを行い、定着までサポートします。",
      time: "継続的に",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section id="flow-section" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* セクションヘッダー */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 
            className={`text-4xl font-bold mb-6 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            採用支援の<span className="text-blue-600">流れ</span>
          </h2>
          <p 
            className={`text-xl text-gray-600 transform transition-all duration-700 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            初回相談から採用成功まで、
            <br />
            一貫したサポート体制でお客様の採用を支援します。
          </p>
        </div>

        {/* フローステップ */}
        <div className="max-w-5xl mx-auto relative">
          {/* 中央の縦線 - PC表示用 */}
          <div className="hidden md:block absolute left-[calc(128px+1rem)] top-8 bottom-8 w-px bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200"></div>
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-start mb-12 transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* アイコン部分 */}
              <div className="flex-shrink-0 mb-4 md:mb-0 relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <step.Icon className="w-8 h-8 text-white" />
                </div>
                {/* ステップ番号 */}
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                  {index + 1}
                </div>
              </div>
              
              {/* コンテンツ部分 */}
              <div className="md:ml-8 flex-1">
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">{step.title}</h3>
                    <span className="inline-flex items-center px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {step.time}
                    </span>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transform transition-all duration-700 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 text-gray-900 font-medium rounded-lg hover:bg-blue-600 hover:text-white hover:border-transparent hover:shadow-lg transition-all duration-300 group"
          >
            無料相談を予約する
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Clockアイコンをインポート（追加）
function Clock({ className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}