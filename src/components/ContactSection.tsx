'use client';

import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general'
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const element = document.getElementById('contact-section');
    if (element) observer.observe(element);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (element) observer.unobserve(element);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ここでフォームの送信処理を実装
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section 
      id="contact-section"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* 背景 */}
      <div className="absolute inset-0 -z-10">
        {/* パターン背景 */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #4338ca 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* 動的な背景要素 */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-blue-100 opacity-30 blur-3xl"
          style={{ 
            top: `calc(20% + ${mousePosition.y * -20}px)`, 
            right: `calc(10% + ${mousePosition.x * -20}px)`,
            transition: 'transform 0.5s ease-out' 
          }}
        ></div>
        
        <div 
          className="absolute w-80 h-80 rounded-full bg-indigo-100 opacity-40 blur-3xl"
          style={{ 
            bottom: `calc(10% + ${mousePosition.y * 20}px)`, 
            left: `calc(10% + ${mousePosition.x * 20}px)`,
            transition: 'transform 0.5s ease-out' 
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* セクションヘッダー - モバイル表示用 */}
          <div className="md:hidden text-center mb-12">
            <h2 
              className={`text-4xl font-bold mb-6 transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              お問い合わせ
            </h2>
            <p 
              className={`text-lg text-gray-600 transform transition-all duration-700 delay-100 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              採用に関するお悩みやご質問など、お気軽にお問い合わせください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 連絡先情報 */}
            <div 
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
            >
              <div className="md:sticky md:top-8">
                {/* セクションヘッダー - デスクトップ表示用 */}
                <div className="hidden md:block">
                  <h2 className="text-4xl font-bold mb-6">
                    お<span className="text-blue-600">問い合わせ</span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-12">
                    採用に関するお悩みやご質問など、
                    <br />
                    お気軽にお問い合わせください。
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">お電話</h3>
                      <p className="text-gray-600">平日 9:00-18:00</p>
                      <a href="tel:0123456789" className="text-blue-600 hover:text-blue-700 font-medium">
                        012-345-6789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">メール</h3>
                      <p className="text-gray-600">24時間受付</p>
                      <a href="mailto:info@example.com" className="text-blue-600 hover:text-blue-700 font-medium">
                        info@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">所在地</h3>
                      <p className="text-gray-600">
                        〒577-0806
                        <br />
                        大阪府東大阪市上小阪3-13-9
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* お問い合わせフォーム */}
            <div 
              className={`transform transition-all duration-700 delay-300 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></span>
                  お問い合わせフォーム
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-gray-700 font-medium">お問い合わせ種別<span className="text-red-500">*</span></span>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="general">一般的なお問い合わせ</option>
                        <option value="service">サービスについて</option>
                        <option value="estimate">お見積りについて</option>
                        <option value="other">その他</option>
                      </select>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-gray-700 font-medium">会社名<span className="text-red-500">*</span></span>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="text-gray-700 font-medium">お名前<span className="text-red-500">*</span></span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-gray-700 font-medium">メールアドレス<span className="text-red-500">*</span></span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="text-gray-700 font-medium">電話番号</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-gray-700 font-medium">お問い合わせ内容<span className="text-red-500">*</span></span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      ></textarea>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    送信する
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}