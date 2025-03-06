'use client';

import { Building, ChevronDown, Home, Info, Mail, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// 型定義
interface ChildItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: ChildItem[];
}

const navigationItems: NavigationItem[] = [
  {
    label: 'ホーム',
    href: '/',
    icon: <Home className="w-4 h-4" />
  },
  {
    label: 'サービス',
    href: '/services/page.tsx',
    icon: <Building className="w-4 h-4" />,
    children: [
      { label: '採用分析', href: '/services/analytics' },
      { label: 'RPO（採用代行）', href: '/services/rpo' },
      { label: '成果報酬型採用', href: '/services/performance' },
      { label: '中途採用支援', href: '/services/recruitment' },
    ]
  },
  {
    label: '会社概要',
    href: '/about',
    icon: <Info className="w-4 h-4" />
  },
  {
    label: 'お問い合わせ',
    href: '/contact',
    icon: <Mail className="w-4 h-4" />
  }
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isUp = currentScrollY < lastScrollY;
      
      // Update scroll direction state
      setIsScrollingUp(isUp);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > 100) {
        setIsNavVisible(isUp);
      } else {
        setIsNavVisible(true);
      }
      
      // Check if we've scrolled enough to change navbar style
      setIsScrolled(currentScrollY > 20);
      
      // Store scroll position for animation effects
      setScrollPosition(currentScrollY);
      
      // Update the last scroll position
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // メニュー開いているときにスクロールできないようにする
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // ドロップダウンメニュー以外をクリックしたときにドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 現在のパスがアクティブかどうかチェック
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href) && href !== '/';
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  // Calculate navbar opacity based on scroll position
  const navbarOpacity = Math.min(0.9, 0.5 + scrollPosition / 300);

  return (
    <nav 
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 fixed' : 'py-4'
      } ${isScrolled && !isNavVisible ? '-translate-y-full' : 'translate-y-0'}`}
      style={{
        backgroundColor: isScrolled ? `rgba(255, 255, 255, ${navbarOpacity})` : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative z-20">
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
            }`}>
              IDEALRECRUIT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group" ref={item.children ? dropdownRef : undefined}>
                {item.children ? (
                  <button
                    onClick={() => handleDropdownToggle(item.label)}
                    className={`flex items-center px-4 py-2 transition-colors rounded-md group ${
                      activeDropdown === item.label 
                        ? 'text-blue-600' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.icon && <span className="mr-1.5">{item.icon}</span>}
                    {item.label}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    
                    {/* アクティブインジケーター */}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform ${
                      activeDropdown === item.label ? 'scale-x-100' : 'group-hover:scale-x-100'
                    }`}></span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 transition-colors rounded-md relative group ${
                      isActive(item.href) 
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.icon && <span className="mr-1.5">{item.icon}</span>}
                    {item.label}
                    
                    {/* アクティブインジケーター */}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform ${
                      isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-fadeInDown">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={`block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                          isActive(child.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setActiveDropdown(null);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Button */}
            <Link
              href="/contact"
              className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow"
            >
              <Phone className="w-4 h-4 mr-2" />
              無料相談
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors relative z-20"
              aria-expanded={isOpen}
              aria-label="メニュー"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`fixed inset-0 bg-white z-10 md:hidden transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-20 pb-6 px-4 h-full overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative mb-2">
                {item.children ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors rounded-md ${
                        activeDropdown === item.label ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.label}
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="bg-gray-50 py-2 rounded-lg mt-1 mb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-6 py-3 text-sm hover:bg-blue-50 transition-colors ${
                              isActive(child.href) ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors rounded-md ${
                      isActive(item.href) ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Contact Button */}
            <div className="mt-6 px-4">
              <Link
                href="/contact"
                className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-5 h-5 mr-2" />
                無料相談
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* モバイルメニュー用のオーバーレイ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}