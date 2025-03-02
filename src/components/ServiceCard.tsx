'use client';

import { ReactNode } from 'react';
import { ArrowRight, Check, Clock } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  subTitle: string;
  description: string;
  features?: string[];
  process?: string[];
  link: string;
  children: ReactNode;
}

export function ServiceCard({ 
  title, 
  subTitle, 
  description, 
  features, 
  process, 
  link, 
  children 
}: ServiceCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Main content */}
      <div className="relative h-full bg-white m-[2px] rounded-[10px] p-8 flex flex-col">
        {/* Icon and titles */}
        <div className="flex items-start mb-6">
          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {children}
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
          </div>
          <div className="ml-4">
            <div className="text-sm text-blue-600 font-medium mb-1">{subTitle}</div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          {description}
        </p>

        {/* Features list */}
        {features && features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">主な特徴</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <Check className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Process list */}
        {process && process.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">サービスの流れ</h4>
            <div className="space-y-3">
              {process.map((step, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mr-3">
                    {index + 1}
                  </div>
                  <span className="text-gray-600">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View more link */}
        <div className="mt-auto pt-6">
          <a
            href={link}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group/link"
          >
            VIEW MORE
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}