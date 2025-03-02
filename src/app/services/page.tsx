// src/app/services/page.tsx
'use client';

import { BarChart, Users, Target, Building } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    icon: BarChart,
    title: "Data Analytics",
    subtitle: "採用分析",
    description: "貴社の優秀人材を分析し、採用・人事・経営の次の一手を明確にします。",
    image: "/images/analytics.jpg",
    link: "/services/analytics"
  },
  {
    icon: Users,
    title: "Recruit Process Outsourcing",
    subtitle: "RPO",
    description: "Wantedlyをメインに各媒体の運用代行から面接面談など全て採用業務を代行。",
    image: "/images/rpo.jpg",
    link: "/services/rpo"
  },
  {
    icon: Target,
    title: "Performance reward",
    subtitle: "成果報酬型採用代行",
    description: "人材紹介会社よりも安価に。求人票作成や運用管理などは全て弊社で行い、採用できたら費用が発生する完全成果報酬のサービス。",
    image: "/images/performance.jpg",
    link: "/services/performance"
  },
  {
    icon: Building,
    title: "Intermediate Recruitment",
    subtitle: "中途採用支援",
    description: "type,doda,マイナビなど貴社に最も合う求人広告をご提案いたします。",
    image: "/images/recruitment.jpg",
    link: "/services/recruitment"
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-gray-900 py-24">
        {/* ... Hero Section content ... */}
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className={`flex flex-col md:flex-row items-center gap-12 mb-20 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h2>
                  <p className="text-xl text-blue-600 mb-4">{service.subtitle}</p>
                  <p className="text-gray-600 mb-8">{service.description}</p>
                  <Link
                    href={service.link}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    詳しく見る
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              お気軽にご相談ください
            </h2>
            <p className="text-gray-600 mb-8">
              貴社に最適な採用支援プランをご提案いたします。
              まずは無料相談からお始めください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              無料相談を予約する
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}