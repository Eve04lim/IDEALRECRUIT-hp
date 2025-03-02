'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ここでフォームの送信処理を実装
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="sticky top-8">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 mb-8">
                  <span className="text-sm font-medium">Contact</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">お問い合わせ</h2>
                <p className="text-xl text-gray-600 mb-12">
                  採用に関するお悩みやご質問など、
                  <br />
                  お気軽にお問い合わせください。
                </p>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">お電話</h3>
                      <p className="text-gray-600">平日 9:00-18:00</p>
                      <a href="tel:0123456789" className="text-blue-600 hover:text-blue-700">
                        012-345-6789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">メール</h3>
                      <p className="text-gray-600">24時間受付</p>
                      <a href="mailto:info@example.com" className="text-blue-600 hover:text-blue-700">
                        info@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600" />
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

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-gray-700">お問い合わせ種別</span>
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

                  <label className="block">
                    <span className="text-gray-700">会社名</span>
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
                    <span className="text-gray-700">お名前</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-700">メールアドレス</span>
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
                    <span className="text-gray-700">電話番号</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-700">お問い合わせ内容</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    ></textarea>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5 mr-2" />
                  送信する
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}