'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('faq-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const faqs = [
    {
      question: "初回相談は無料ですか？",
      answer: "はい、初回相談は完全無料です。お客様の課題やニーズをヒアリングし、最適なソリューションをご提案させていただきます。"
    },
    {
      question: "どのような業界の採用支援実績がありますか？",
      answer: "IT、製造、小売、サービス、医療など、幅広い業界での採用支援実績がございます。業界特性を踏まえた最適な採用戦略をご提案いたします。"
    },
    {
      question: "採用にかかる期間はどのくらいですか？",
      answer: "業界や職種、採用条件によって異なりますが、一般的に2-3ヶ月程度です。ただし、より早期の採用実現のためのスピード採用プランもご用意しております。"
    },
    {
      question: "採用成功報酬の料金体系について教えてください",
      answer: "採用された方の年収に応じた成功報酬制となっています。詳細な料金体系については、お客様の採用条件に応じて個別にご案内させていただきます。"
    },
    {
      question: "地方での採用活動は対応可能ですか？",
      answer: "はい、全国各地での採用活動に対応可能です。オンラインでのミーティングやリモートでの採用活動支援も積極的に行っております。"
    }
  ];

  return (
    <section id="faq-section" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-8">
            <span className="text-sm font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">よくあるご質問</h2>
          <p className="text-xl text-gray-600">
            お客様からよくいただくご質問をまとめました。
            <br />
            その他のご質問も、お気軽にお問い合わせください。
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`mb-4 transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <span className="text-lg font-medium text-left text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
                ) : (
                  <Plus className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            その他のご質問やご不明点がございましたら、お気軽にお問い合わせください。
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 mt-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            お問い合わせはこちら
          </a>
        </div>
      </div>
    </section>
  );
}