'use client';

import { BarChart, Users, Target, Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ServiceSection() {
  const services = [
    {
      Icon: BarChart,
      title: "採用分析",
      subTitle: "Data Analytics",
      path: "/services/analytics",
      description: "貴社の優秀人材を分析し、採用・人事・経営の次の一手を明確にします。"
    },
    {
      Icon: Users,
      title: "採用代行",
      subTitle: "Recruit Process Outsourcing",
      path: "/services/rpo",
      description: "Wantedlyをメインに各媒体の運用代行から面接面談など全て採用業務を代行。"
    },
    {
      Icon: Target,
      title: "成果報酬型採用",
      subTitle: "Performance Reward",
      path: "/services/performance",
      description: "人材紹介会社よりも安価に。採用できたら費用が発生する完全成果報酬のサービス。"
    },
    {
      Icon: Building,
      title: "中途採用支援",
      subTitle: "Intermediate Recruitment",
      path: "/services/recruitment",
      description: "type,doda,マイナビなど貴社に最も合う求人広告をご提案いたします。"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-blue-600 font-medium mb-4">Our Services</p>
          <h2 className="text-4xl font-bold mb-6">サービス紹介</h2>
          <p className="text-gray-600 text-lg">
            戦略的な採用計画の立案から、実務の改善まで。
            <br />
            企業の成長を加速させる包括的な採用支援サービスを提供します。
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.path}
              className="group block bg-gray-50 p-8 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              <service.Icon className="w-12 h-12 text-blue-600 group-hover:text-white mb-6 transition-colors" />
              <div className="text-sm text-blue-600 group-hover:text-blue-200 mb-2 transition-colors">
                {service.subTitle}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 group-hover:text-blue-100 transition-colors">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg group"
          >
            サービス詳細を見る
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}