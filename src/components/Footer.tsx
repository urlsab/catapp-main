import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/catapp logo no bg.png';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver for fade in/out
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    // Find snap container parent if exists, otherwise use viewport
    const snapContainer = el.closest(
      '.pricing-snap-container, .home-snap-container, .contact-snap-container, .testimonials-snap-container, .about-snap-container, .article-snap-container'
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root: snapContainer || null, threshold: 0.15 }
    );

    // Small delay to ensure DOM is ready
    const t = setTimeout(() => observer.observe(el), 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, []);

  const handleEmail = () => {
    window.open('mailto:yairsabag213@gmail.com', '_self');
  };

  const handlePhone = () => {
    window.open('tel:+972556611594', '_self');
  };

  return (
    <footer
      ref={footerRef}
      className={`footer-wrapper text-white w-full h-full flex items-center justify-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 w-full">
        <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <div className="mb-3 lg:mb-5">
              <img src={logo} alt="Catapp Logo" className="h-8 lg:h-12 mx-auto sm:ml-auto sm:mr-0 block" />
            </div>
            <p className="footer-text text-gray-400 mb-3 sm:mb-5 leading-relaxed text-sm sm:text-base lg:text-lg text-center sm:text-right">
              בניית אתרים ופיתוח אתרים מקצועי | אתרים לעסקים ולעורכי דין | פיתוח אפליקציות | פיתוח תוכנה | דפי נחיתה | קידום בגוגל
            </p>
          </div>

          {/* Navigation + Contact: 2 columns on mobile */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
          {/* Navigation */}
          <div>
            <h4 className="footer-heading text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 lg:mb-4">ניווט</h4>
            <div className="footer-nav-grid grid grid-cols-2 gap-x-3 sm:gap-x-5 gap-y-1.5 sm:gap-y-2">
              <Link to="/" className="footer-link text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg">
                בית
              </Link>
              <Link to="/pricing" className="footer-link text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg">
                מחירון
              </Link>
              <Link to="/about-full" className="footer-link text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg">
                אודות
              </Link>
              <Link to="/testimonials" className="footer-link text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg">
                המלצות
              </Link>
              <Link to="/portfolio" className="footer-link text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg">
                פרוייקטים
              </Link>
              <Link to="/contact" className="footer-link text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg">
                צור קשר
              </Link>
              <Link to="/ask-ai" className="footer-link text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg">
                שאל AI
              </Link>
              <Link to="/articles" className="footer-link text-gray-400 hover:text-white transition-colors text-sm sm:text-base lg:text-lg">
                מאמרים
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer-heading text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 lg:mb-4">פרטי קשר</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-sm sm:text-base lg:text-lg">
              <li className="flex items-center justify-start">
                <Phone className="footer-icon ml-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                <button onClick={handlePhone} className="footer-link hover:text-white transition-colors">
                  055-6611594
                </button>
              </li>
              <li className="flex items-center justify-start">
                <Mail className="footer-icon ml-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                <button onClick={handleEmail} className="footer-link hover:text-white transition-colors">
                  yairsabag213@gmail.com
                </button>
              </li>
              <li className="flex items-center justify-start">
                <a 
                  href="https://waze.com/ul?q=רותם+15+לוד&navigate=yes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors footer-link"
                >
                  <svg
                    className="footer-icon ml-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  לוד, רותם 15
                </a>
              </li>
            </ul>
          </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6">
          <div className="footer-bottom flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm lg:text-base">
            <Link to="/terms" className="footer-bottom-link hover:text-white transition-colors">
              תנאי שימוש
            </Link>
            <span className="text-gray-600 footer-bottom-divider">|</span>
            <Link to="/privacy" className="footer-bottom-link hover:text-white transition-colors">
              מדיניות פרטיות
            </Link>
            <span className="text-gray-600 footer-bottom-divider">|</span>
            <div className="flex items-center gap-2">
              <span className="footer-bottom-link">נבנה ע"י</span>
              <img src={logo} alt="Catapp Logo" className="h-6 lg:h-8 w-auto" />
            </div>
            <span className="text-gray-600 footer-bottom-divider">|</span>
            <span className="footer-bottom-link">{new Date().getFullYear()}</span>
            <span className="text-gray-600 footer-bottom-divider">|</span>
            <span className="footer-bottom-link">כל הזכויות שמורות</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;