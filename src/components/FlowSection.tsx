'use client';

import { useEffect, useState } from 'react';
import { Phone, FileText, Users, CheckCircle, Award } from 'lucide-react';

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
      time: "30分程度"
    },
    {
      Icon: FileText,
      title: "戦略立案",
      description: "採用ターゲットの設定や、具体的な採用手法の選定を行います。",
      time: "1週間程度"
    },
    {
      Icon: Users,
      title: "実行支援",
      description: "求人掲載や候補者対応など、実際の採用活動をサポートします。",
      time: "1-3ヶ月"
    },
    {
      Icon: CheckCircle,
      title: "採用成功",
      description: "内定承諾から入社までのフォローを行い、採用成功を実現します。",
      time: "～入社まで"
    },
    {
      Icon: Award,
      title: "継続支援",
      description: "入社後のフォローアップを行い、定着までサポートします。",
      time: "継続的に"
    }
  ];

  return (
    <section id="flow-section" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-8">
            <span className="text-sm font-medium">Support Flow</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">採用支援の流れ</h2>
          <p className="text-xl text-gray-600">
            初回相談から採用成功まで、
            <br />
            一貫したサポート体制でお客様の採用を支援します。
          </p>
        </div>

        {/* Flow steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start mb-8 transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <step.Icon className="w-8 h-8 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-16 left-1/2 w-px h-24 bg-blue-200 transform -translate-x-1/2" />
                )}
              </div>
              <div className="ml-8 flex-1">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
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
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            無料相談を予約する
          </a>
        </div>
      </div>
    </section>
  );
}