'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function MessageSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('message-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="message-section" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className={`relative aspect-square transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl transform -rotate-6" />
            <div className="absolute inset-0 bg-gray-900 rounded-2xl overflow-hidden">
              <Image
                src="/images/president.jpg"
                alt="President"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-8">
              <span className="text-sm font-medium">Message</span>
            </div>

            <h2 className="text-4xl font-bold mb-8 leading-tight">
              採用成功の先にある、
              <br />
              企業の未来を創る
            </h2>

            <div className="space-y-6 text-gray-600">
              <p>
                私たちIDEAL RECRUITは、単なる採用支援会社ではありません。企業の成長と発展を支える、真のパートナーを目指しています。
              </p>
              <p>
                採用は、企業の未来を創る重要な活動です。私たちは、企業様の文化や価値観を深く理解し、その企業らしさを活かした採用戦略を提案します。
              </p>
              <p>
                「正当に頑張ってる人が評価される社会を創る」
                <br />
                この理念のもと、企業と人材の最適なマッチングを実現し、共に成長する未来を築いていきます。
              </p>
            </div>

            <div className="mt-12">
              <p className="text-lg font-bold text-gray-900">代表取締役社長</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">亀田 奎</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}