import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import { articles } from '../data/articles';
import '../styles/articleSnap.css';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = articles.find((a) => a.slug === slug);
  const snapContainerRef = useRef<HTMLDivElement>(null);

  // Visibility state: one boolean per section (header + each content section + cta/nav)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sectionVisible, setSectionVisible] = useState<boolean[]>([]);

  useEffect(() => {
    if (!article) {
      navigate('/articles', { replace: true });
      return;
    }
    // header + sections + cta section
    setSectionVisible(new Array(article.sections.length + 2).fill(false));
  }, [article, navigate]);

  // Scroll to top when navigating between articles
  useEffect(() => {
    if (snapContainerRef.current) {
      snapContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    // Reset section visibility so animations re-trigger on the new article
    if (article) {
      setSectionVisible(new Array(article.sections.length + 2).fill(false));
    }
  }, [slug]);

  // Hide body scroll and global footer when snap container is active
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
    if (!container || !article) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) {
            setSectionVisible((prev) => {
              if (prev[idx] === entry.isIntersecting) return prev;
              const next = [...prev];
              next[idx] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      { root: container, threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [article, sectionVisible.length]);

  if (!article) return null;

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div className="article-snap-container" ref={snapContainerRef} dir="rtl">
      <AnimatedBackground />

      {/* ===== SECTION 0: Article Header ===== */}
      <section className="article-snap-section article-snap-content">
        <div
          ref={setRef(0)}
          className={`relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col justify-center transition-all duration-1000 ${
            sectionVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Back button */}
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1a79f6] transition-colors mb-6 text-base font-medium group w-fit"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            חזרה למאמרים
          </Link>

          {/* Hero banner */}
          <div className={`relative h-28 sm:h-44 md:h-56 rounded-2xl overflow-hidden bg-gradient-to-br ${article.gradient} flex items-center justify-center mb-4 sm:mb-6`}>
            <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
            <span className="relative text-7xl md:text-9xl select-none drop-shadow-xl">{article.icon}</span>
            <span className={`absolute top-4 left-4 text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 ${article.tagColor}`}>
              {article.tag}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 text-right">
            {article.title}
          </h1>
          <p className={`text-base sm:text-lg md:text-xl font-medium leading-relaxed text-right ${article.tagColor}`}>
            {article.summary}
          </p>


        </div>
      </section>

      {/* ===== CONTENT SECTIONS (one snap section per article section) ===== */}
      {article.sections.map((section, sIdx) => (
        <section key={sIdx} className="article-snap-section article-snap-content">
          <div
            ref={setRef(sIdx + 1)}
            className={`relative z-10 w-full max-w-3xl mx-auto px-4 py-4 transition-all duration-1000 ${
              sectionVisible[sIdx + 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Section number + title */}
            <div className="flex items-center gap-3 mb-5 sm:mb-7">
              <span className={`text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full bg-black/30 border border-white/15 ${article.tagColor}`}>
                {sIdx + 1} / {article.sections.length}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight text-right">
                {section.title}
              </h2>
            </div>

            <div className="w-full h-px bg-[#1a79f6]/30 mb-5 sm:mb-7" />

            {/* Paragraphs - max 2 per section */}
            <div className="space-y-4 sm:space-y-6">
              {section.paragraphs.slice(0, 2).map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-gray-200 text-base sm:text-lg md:text-xl leading-[1.85] text-right"
                  style={{
                    transitionDelay: sectionVisible[sIdx + 1] ? `${pIdx * 120}ms` : '0ms',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    opacity: sectionVisible[sIdx + 1] ? 1 : 0,
                    transform: sectionVisible[sIdx + 1] ? 'translateY(0)' : 'translateY(16px)',
                  }}
                >
                  {para}
                </p>
              ))}
            </div>


          </div>
        </section>
      ))}

      {/* ===== CTA + NAVIGATION SECTION ===== */}
      <section className="article-snap-section article-snap-content">
        <div
          ref={setRef(article.sections.length + 1)}
          className={`relative z-10 w-full max-w-3xl mx-auto px-4 py-4 transition-all duration-1000 ${
            sectionVisible[article.sections.length + 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1a79f6]/10 border border-[#1a79f6]/30 text-right mb-8">
            <p className="text-white text-lg sm:text-xl font-bold mb-2">רוצים לדעת עוד?</p>
            <p className="text-gray-300 text-base sm:text-lg mb-5">צרו קשר עם Catapp לשאלות, ייעוץ חינמי או הצעת מחיר מותאמת אישית.</p>
            <Link
              to="/contact"
              className="inline-block bg-[#1a79f6] hover:bg-[#1565c0] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 text-base"
            >
              צור קשר
            </Link>
          </div>

          {/* Prev / Next navigation */}
          <div className="flex justify-between gap-4 mb-6">
            {nextArticle ? (
              <Link
                to={`/articles/${nextArticle.slug}`}
                className="flex-1 group p-4 sm:p-5 rounded-xl border border-white/10 hover:border-[#1a79f6]/40 bg-white/5 transition-all duration-200 text-right"
              >
                <p className="text-xs text-gray-500 mb-1">מאמר הבא</p>
                <p className="text-white font-semibold text-sm sm:text-base group-hover:text-[#1a79f6] transition-colors leading-snug">
                  {nextArticle.title}
                </p>
              </Link>
            ) : <div className="flex-1" />}

            {prevArticle ? (
              <Link
                to={`/articles/${prevArticle.slug}`}
                className="flex-1 group p-4 sm:p-5 rounded-xl border border-white/10 hover:border-[#1a79f6]/40 bg-white/5 transition-all duration-200 text-left"
              >
                <p className="text-xs text-gray-500 mb-1">מאמר קודם</p>
                <p className="text-white font-semibold text-sm sm:text-base group-hover:text-[#1a79f6] transition-colors leading-snug">
                  {prevArticle.title}
                </p>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {/* Back to all articles */}
          <div className="text-center">
            <Link
              to="/articles"
              className="text-gray-400 hover:text-[#1a79f6] transition-colors text-base font-medium"
            >
              ← כל המאמרים
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ArticlePage;
