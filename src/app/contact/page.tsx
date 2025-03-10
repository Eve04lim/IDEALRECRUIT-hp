'use client';

import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';

// 型定義
interface SectionRefs {
  [key: string]: HTMLElement | null;
}

interface IntersectionState {
  [key: string]: boolean;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  // 状態管理
  const [isIntersecting, setIsIntersecting] = useState<IntersectionState>({});
  const sectionRefs = useRef<SectionRefs>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // 要素の可視性を監視するIntersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          setIsIntersecting(prev => ({ ...prev, [id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 監視する要素を登録
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // ref設定用のヘルパー関数
  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current[id] = el;
    }
    return null;
  };

  // 入力変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // エラーがあれば入力時にクリア
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // フォーム検証
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'お名前を入力してください';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '有効なメールアドレスを入力してください';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'メッセージを入力してください';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 実際の送信処理はここに実装
      // 今回はモックとして成功を返す
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 連絡先情報
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "メール",
      details: "info@idealrecruit.co.jp",
      action: "mailto:info@idealrecruit.co.jp",
      actionText: "メールを送る"
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "電話",
      details: "06-1234-5678（平日 9:00-18:00）",
      action: "tel:0612345678",
      actionText: "電話をかける"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "所在地",
      details: "〒577-0806 大阪府東大阪市上小阪3-13-9",
      action: "https://maps.google.com/?q=大阪府東大阪市上小阪3-13-9",
      actionText: "地図を見る"
    }
  ];

  return (
    <>
      {/* パンくずリスト */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">お問い合わせ</span>
          </div>
        </div>
      </div>

      {/* ヒーローセクション */}
      <section 
        id="hero-section"
        ref={setRef('hero')}
        className="relative py-32 bg-gradient-to-br from-blue-800 to-indigo-900 text-white overflow-hidden"
      >
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 mb-8 transform transition-all duration-1000 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Mail className="w-5 h-5 mr-2" />
              <span>Contact Us</span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 transform transition-all duration-1000 delay-100 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              お問い合わせ
            </h1>
            
            <p className={`text-xl text-blue-100 mb-12 transform transition-all duration-1000 delay-200 ${
              isIntersecting['hero-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              採用に関するご相談や、サービスに関するお問い合わせは
              <br />
              こちらからお気軽にご連絡ください。
            </p>
          </div>
        </div>
      </section>

      {/* 連絡先情報セクション */}
      <section 
        id="contact-info-section"
        ref={setRef('contact-info')}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                    isIntersecting['contact-info-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600 mb-6">{info.details}</p>
                  <a 
                    href={info.action}
                    target={info.title === "所在地" ? "_blank" : undefined}
                    rel={info.title === "所在地" ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {info.actionText}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせフォームセクション */}
      <section 
        id="contact-form-section"
        ref={setRef('contact-form')}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* 左側: 画像 */}
              <div className={`relative hidden lg:block transform transition-all duration-1000 ${
                isIntersecting['contact-form-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/api/placeholder/600/600"
                    alt="お問い合わせ"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                </div>
                
                {/* 装飾テキスト */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">お気軽にご相談ください</h3>
                  <p className="max-w-xs mx-auto">
                    採用に関するあらゆるご相談に、専門スタッフが丁寧に対応いたします。
                  </p>
                </div>
              </div>
              
              {/* 右側: フォーム */}
              <div className={`transform transition-all duration-1000 delay-300 ${
                isIntersecting['contact-form-section'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">お問い合わせフォーム</h2>
                  
                  {submitStatus === 'success' ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-800 mb-2">送信完了</h3>
                      <p className="text-green-700 mb-6">
                        お問い合わせありがとうございます。担当者より折り返しご連絡いたします。
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        別のお問い合わせをする
                      </button>
                    </div>
                  ) : submitStatus === 'error' ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-red-800 mb-2">送信エラー</h3>
                      <p className="text-red-700 mb-6">
                        申し訳ございません。送信中にエラーが発生しました。しばらく経ってから再度お試しください。
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        再試行する
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        {/* 名前フィールド */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            お名前 <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              formErrors.name ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                            placeholder="例: 山田 太郎"
                          />
                          {formErrors.name && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                          )}
                        </div>
                        
                        {/* メールフィールド */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            メールアドレス <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              formErrors.email ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                            placeholder="例: sample@example.com"
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                          )}
                        </div>
                        
                        {/* 会社名フィールド */}
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            会社名
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="例: 株式会社サンプル"
                          />
                        </div>
                        
                        {/* 電話番号フィールド */}
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            電話番号
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="例: 090-1234-5678"
                          />
                        </div>
                        
                        {/* メッセージフィールド */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            メッセージ <span className="text-red-600">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              formErrors.message ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                            placeholder="お問い合わせ内容をご記入ください"
                          ></textarea>
                          {formErrors.message && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                          )}
                        </div>
                        
                        {/* 送信ボタン */}
                        <div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                送信中...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center">
                                <Send className="w-5 h-5 mr-2" />
                                送信する
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ セクション */}
      <section 
        id="faq-section"
        ref={setRef('faq')}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-16 transform transition-all duration-1000 ${
              isIntersecting['faq-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-blue-600 font-medium mb-2">FAQ</p>
              <h2 className="text-3xl font-bold mb-4">よくある質問</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                お客様からよくいただくご質問とその回答をまとめました。
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "初回相談は無料ですか？",
                  answer: "はい、初回のご相談は無料です。お気軽にお問い合わせください。"
                },
                {
                  question: "どのような企業に対応していますか？",
                  answer: "業種や規模を問わず、あらゆる企業様の採用ニーズにお応えします。スタートアップから大企業まで、多くの実績があります。"
                },
                {
                  question: "契約期間はどれくらいですか？",
                  answer: "契約期間はサービス内容によって異なります。短期間のスポット支援から、長期的な採用パートナーシップまで、柔軟に対応いたします。"
                },
                {
                  question: "対応エリアはどこまでですか？",
                  answer: "全国対応しております。リモートでのサポートも可能ですので、どこからでもご相談いただけます。"
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className={`bg-gray-50 rounded-xl p-6 transform transition-all duration-700 ${
                    isIntersecting['faq-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Q. {faq.question}</h3>
                  <p className="text-gray-600">A. {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section 
        id="cta-section"
        ref={setRef('cta')}
        className="py-20 bg-gradient-to-r from-blue-800 to-indigo-800 text-white"
      >
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isIntersecting['cta-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl font-bold mb-6">
              理想の採用を一緒に実現しましょう
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              まずはお気軽にご相談ください。
              <br />
              貴社の採用課題解決に向けて最適なプランをご提案いたします。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact-form-section"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors shadow-md"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                お問い合わせフォームへ
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center px-6 py-3 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
              >
                サービス一覧を見る
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}