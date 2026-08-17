import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { articles } from '../data/articles';
import '../styles/articleSnap.css';

const ArticlesPage: React.FC = () => {
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mobileCards1Ref = useRef<HTMLDivElement>(null);
  const mobileCards2Ref = useRef<HTMLDivElement>(null);
  const mobileCards3Ref = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [mobileCards1Visible, setMobileCards1Visible] = useState(false);
  const [mobileCards2Visible, setMobileCards2Visible] = useState(false);
  const [mobileCards3Visible, setMobileCards3Visible] = useState(false);

  // Hide body scroll and global footer
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const globalFooter = document.querySelector('.min-h-screen > footer') as HTMLElement;
    if (globalFooter) globalFooter.style.display = 'none';
    return () => {
      document.body.style.overflow = '';
      if (globalFooter) globalFooter.style.display = '';
    };
  }, []);

  // IntersectionObserver rooted in the snap container
  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headerRef.current) setHeaderVisible(entry.isIntersecting);
          if (entry.target === cardsRef.current) setCardsVisible(entry.isIntersecting);
          if (entry.target === mobileCards1Ref.current) setMobileCards1Visible(entry.isIntersecting);
          if (entry.target === mobileCards2Ref.current) setMobileCards2Visible(entry.isIntersecting);
          if (entry.target === mobileCards3Ref.current) setMobileCards3Visible(entry.isIntersecting);
        });
      },
      { root: container, threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);
    if (mobileCards1Ref.current) observer.observe(mobileCards1Ref.current);
    if (mobileCards2Ref.current) observer.observe(mobileCards2Ref.current);
    if (mobileCards3Ref.current) observer.observe(mobileCards3Ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="article-snap-container" ref={snapContainerRef} dir="rtl">

      {/* ===== SECTION 1: Header ===== */}
      <section className="article-snap-section">
        <div
          ref={headerRef}
          className={`relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col items-center text-center transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block text-[#1a79f6] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            בלוג מקצועי
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            מאמרים על בניית אתרים
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            מדריכים מקצועיים על נגישות, עיצוב אתרים, טכנולוגיות פיתוח, קידום אתרים ובינה מלאכותית בעולם האינטרנט
          </p>
          <div className="mt-6 sm:mt-8 w-20 sm:w-24 h-1 bg-[#1a79f6] rounded-full" />
        </div>
      </section>

      {/* ===== SECTION 2 (DESKTOP): Article Cards grid ===== */}
      <section className="article-snap-section article-desktop-only article-snap-content">
        <div
          ref={cardsRef}
          className={`relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-4 flex flex-col h-full justify-center transition-all duration-1000 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-sm sm:text-base font-semibold text-[#1a79f6] text-center tracking-wide uppercase mb-2 sm:mb-3">
            כל המאמרים
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={index === 4 ? 'col-span-2 lg:col-span-1' : ''}
                style={{
                  transitionDelay: cardsVisible ? `${index * 80}ms` : '0ms',
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <Link
                  to={`/articles/${article.slug}`}
                  className="flex flex-col group rounded-xl overflow-hidden border border-white/10 hover:border-[#1a79f6]/50 hover:shadow-[0_0_20px_rgba(26,121,246,0.15)] transition-all duration-300 h-full"
                  aria-label={article.title}
                >
                  {/* Card Image - compact height */}
                  <div className={`relative bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden flex-shrink-0`}
                    style={{ height: 'clamp(64px, 12vh, 120px)' }}
                  >
                    <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/5" />
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/5" />
                    <span className="relative select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ fontSize: 'clamp(1.5rem, 4vh, 3rem)' }}
                    >
                      {article.icon}
                    </span>
                    <span className={`absolute top-2 left-2 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${article.tagColor}`}>
                      {article.tag}
                    </span>
                  </div>

                  {/* Card Body - compact */}
                  <div className="bg-white/5 px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-right flex flex-col flex-1">
                    <h2 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1 leading-snug group-hover:text-[#1a79f6] transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-relaxed line-clamp-2 flex-1">
                      {article.summary}
                    </p>
                    <div className="mt-1.5 sm:mt-2 flex items-center justify-end gap-1 text-[#1a79f6] text-[10px] sm:text-xs font-semibold">
                      <span>קרא עוד</span>
                      <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MOBILE SECTIONS: 2 cards per snap section ===== */}

      {/* Mobile 2a: Articles 0-1 */}
      <section className="article-snap-section article-mobile-only">
        <div
          ref={mobileCards1Ref}
          className={`relative z-10 w-full max-w-lg mx-auto px-3 flex flex-col justify-center transition-all duration-1000 ${
            mobileCards1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-sm font-semibold text-[#1a79f6] text-center tracking-wide uppercase mb-3">
            כל המאמרים
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1].map((idx, i) => {
              const article = articles[idx];
              return (
                <div key={article.id} style={{ transitionDelay: mobileCards1Visible ? `${i * 80}ms` : '0ms', transition: 'opacity 0.7s ease, transform 0.7s ease', opacity: mobileCards1Visible ? 1 : 0, transform: mobileCards1Visible ? 'translateY(0)' : 'translateY(20px)' }}>
                  <Link to={`/articles/${article.slug}`} className="flex flex-col group rounded-xl overflow-hidden border border-white/10 hover:border-[#1a79f6]/50 transition-all duration-300 h-full" aria-label={article.title}>
                    <div className={`relative bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden flex-shrink-0`} style={{ height: 'clamp(80px, 14vh, 130px)' }}>
                      <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/5" />
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/5" />
                      <span className="relative select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ fontSize: 'clamp(1.8rem, 5vh, 3rem)' }}>{article.icon}</span>
                      <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${article.tagColor}`}>{article.tag}</span>
                    </div>
                    <div className="bg-white/5 px-2.5 py-2 text-right flex flex-col flex-1">
                      <h2 className="text-xs font-bold text-white mb-1 leading-snug group-hover:text-[#1a79f6] transition-colors duration-200 line-clamp-2">{article.title}</h2>
                      <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-3 flex-1">{article.summary}</p>
                      <div className="mt-1.5 flex items-center justify-end gap-1 text-[#1a79f6] text-[10px] font-semibold"><span>קרא עוד</span><span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span></div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile 2b: Articles 2-3 */}
      <section className="article-snap-section article-mobile-only">
        <div
          ref={mobileCards2Ref}
          className={`relative z-10 w-full max-w-lg mx-auto px-3 flex flex-col justify-center transition-all duration-1000 ${
            mobileCards2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-2 gap-3">
            {[2, 3].map((idx, i) => {
              const article = articles[idx];
              return (
                <div key={article.id} style={{ transitionDelay: mobileCards2Visible ? `${i * 80}ms` : '0ms', transition: 'opacity 0.7s ease, transform 0.7s ease', opacity: mobileCards2Visible ? 1 : 0, transform: mobileCards2Visible ? 'translateY(0)' : 'translateY(20px)' }}>
                  <Link to={`/articles/${article.slug}`} className="flex flex-col group rounded-xl overflow-hidden border border-white/10 hover:border-[#1a79f6]/50 transition-all duration-300 h-full" aria-label={article.title}>
                    <div className={`relative bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden flex-shrink-0`} style={{ height: 'clamp(80px, 14vh, 130px)' }}>
                      <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/5" />
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/5" />
                      <span className="relative select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ fontSize: 'clamp(1.8rem, 5vh, 3rem)' }}>{article.icon}</span>
                      <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${article.tagColor}`}>{article.tag}</span>
                    </div>
                    <div className="bg-white/5 px-2.5 py-2 text-right flex flex-col flex-1">
                      <h2 className="text-xs font-bold text-white mb-1 leading-snug group-hover:text-[#1a79f6] transition-colors duration-200 line-clamp-2">{article.title}</h2>
                      <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-3 flex-1">{article.summary}</p>
                      <div className="mt-1.5 flex items-center justify-end gap-1 text-[#1a79f6] text-[10px] font-semibold"><span>קרא עוד</span><span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span></div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile 2c: Article 4 (centered) */}
      <section className="article-snap-section article-mobile-only">
        <div
          ref={mobileCards3Ref}
          className={`relative z-10 w-full max-w-xs mx-auto px-3 flex flex-col justify-center transition-all duration-1000 ${
            mobileCards3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {(() => {
            const article = articles[4];
            return (
              <Link to={`/articles/${article.slug}`} className="flex flex-col group rounded-xl overflow-hidden border border-white/10 hover:border-[#1a79f6]/50 transition-all duration-300" aria-label={article.title}>
                <div className={`relative bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden flex-shrink-0`} style={{ height: 'clamp(80px, 14vh, 130px)' }}>
                  <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/5" />
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/5" />
                  <span className="relative select-none drop-shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ fontSize: 'clamp(1.8rem, 5vh, 3rem)' }}>{article.icon}</span>
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${article.tagColor}`}>{article.tag}</span>
                </div>
                <div className="bg-white/5 px-2.5 py-2 text-right flex flex-col flex-1">
                  <h2 className="text-xs font-bold text-white mb-1 leading-snug group-hover:text-[#1a79f6] transition-colors duration-200 line-clamp-2">{article.title}</h2>
                  <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-3 flex-1">{article.summary}</p>
                  <div className="mt-1.5 flex items-center justify-end gap-1 text-[#1a79f6] text-[10px] font-semibold"><span>קרא עוד</span><span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span></div>
                </div>
              </Link>
            );
          })()}
        </div>
      </section>

      {/* ===== SECTION 3: Footer ===== */}
      <section className="article-snap-section article-snap-footer">
        <Footer />
      </section>

    </div>
  );
};

export default ArticlesPage;