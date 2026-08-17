import React, { useRef, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import resumeBuilderImage from '../../Assets/resumes builder website.png';
import orBenjiImage from '../../Assets/benji website.png';
import refaelLawImage from '../../Assets/refael website.png';
import atlizImage from '../../Assets/atliz website.png';
import campNetworkImage from '../../Assets/camps website.png';
import colorGameImage from '../../Assets/color game website.png';
import portfolioImage from '../../Assets/portfolio website.png';
import amiChaiImage from '../../Assets/ami-story.png';
import meiravImage from '../../Assets/meirav website.png';
import '../styles/portfolioSnap.css';

/* ==================== DATA ==================== */

interface Project {
  id: number;
  title: string;
  image: string;
  url?: string;
}

const projects: Project[] = [
  { id: 1, title: 'בונה קו"ח', image: resumeBuilderImage, url: 'https://resumes-builder.web.app' },
  { id: 2, title: "אור בנג'י", image: orBenjiImage, url: 'https://orbenji.com' },
  { id: 3, title: 'רפאל סבג - עו"ד', image: refaelLawImage, url: 'https://refael-law.com' },
  { id: 4, title: 'אטליז למהדרין', image: atlizImage, url: 'https://atliz.co.il' },
  { id: 5, title: 'רשת חברתית', image: campNetworkImage, url: 'https://yelp--camp--project.herokuapp.com' },
  { id: 6, title: 'משחק צבעים', image: colorGameImage, url: 'https://color-game-react.vercel.app' },
  { id: 7, title: 'אתר פורטפוליו', image: portfolioImage, url: 'https://portfolio-uriel-yair-sabag.vercel.app' },
  { id: 8, title: 'עמי-חי', image: amiChaiImage, url: 'https://ami-chai.com' },
  { id: 9, title: 'מירב דולה', image: meiravImage, url: 'https://merav-dula.com/' },
];

/* ==================== COMPONENT ==================== */

const PortfolioPage: React.FC = () => {
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());
  const elementToKey = useRef<WeakMap<Element, string>>(new WeakMap());
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  const getRef = (key: string) => (el: HTMLElement | null) => {
    if (el) {
      elementRefs.current.set(key, el);
      elementToKey.current.set(el, key);
    }
  };

  const isVis = (key: string) => visibleElements.has(key);

  /* Hide body scroll and global footer */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const globalFooter = document.querySelector('.min-h-screen > footer') as HTMLElement;
    if (globalFooter) globalFooter.style.display = 'none';
    return () => {
      document.body.style.overflow = '';
      if (globalFooter) globalFooter.style.display = '';
    };
  }, []);

  /* IntersectionObserver for fade in/out */
  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleElements((prev) => {
          const next = new Set(prev);
          let changed = false;
          for (const entry of entries) {
            const key = elementToKey.current.get(entry.target);
            if (key !== undefined) {
              if (entry.isIntersecting && !prev.has(key)) { next.add(key); changed = true; }
              else if (!entry.isIntersecting && prev.has(key)) { next.delete(key); changed = true; }
            }
          }
          return changed ? next : prev;
        });
      },
      { root: container, threshold: 0.15 }
    );
    const t = setTimeout(() => {
      elementRefs.current.forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, []);

  const staggerDelay = (key: string, idx: number): React.CSSProperties =>
    ({ transitionDelay: isVis(key) ? `${idx * 120}ms` : '0ms' });

  /* Render a single project card */
  const renderCard = (pi: number, prefix: string, stagger = 0, compact = false) => {
    const p = projects[pi];
    const k = `${prefix}-p${pi}`;
    const vis = isVis(k);
    return (
      <div
        key={k}
        ref={getRef(k) as React.RefCallback<HTMLDivElement>}
        className={`transition-all duration-500 ${compact ? 'h-[38vh]' : ''} ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={staggerDelay(k, stagger)}
      >
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#1a79f6]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_24px_rgba(26,121,246,0.3)] block bg-gray-900 ${compact ? 'h-full' : 'aspect-video'}`}
        >
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              <span className="text-white text-xl sm:text-2xl font-bold text-center drop-shadow-lg px-4">
                {p.title}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#1a79f6] text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                צפה באתר
              </span>
            </div>
          </div>
        </a>
      </div>
    );
  };

  return (
    <div ref={snapContainerRef} className="portfolio-snap-container" dir="rtl">

      {/* ================== TITLE SECTION ================== */}
      <section className="portfolio-snap-section">
        <div
          ref={getRef('title') as React.RefCallback<HTMLDivElement>}
          className={`text-center transition-all duration-700 px-4 ${isVis('title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            הפרויקטים <span className="text-[#1a79f6]">שלנו</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">לחצו על פרויקט לביקור באתר</p>
        </div>
      </section>

      {/* ================== DESKTOP SECTIONS (≥1024px) — 3 per section ================== */}
      {Array.from({ length: Math.ceil(projects.length / 3) }, (_, idx) => {
        const start = idx * 3;
        return (
          <section key={`d-sec-${idx}`} className="portfolio-snap-section portfolio-desktop-only">
            <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-3 gap-6 xl:gap-8">
                {[0, 1, 2].map((offset) => {
                  const pi = start + offset;
                  return pi < projects.length ? renderCard(pi, 'd', offset) : null;
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ================== MOBILE SECTIONS (<1024px) — 2 per section ================== */}
      {Array.from({ length: Math.ceil(projects.length / 2) }, (_, idx) => {
        const start = idx * 2;
        return (
          <section key={`m-sec-${idx}`} className="portfolio-snap-section portfolio-mobile-only">
            <div className="w-full max-w-lg mx-auto px-4">
              <div className="grid grid-cols-1 gap-4">
                {[0, 1].map((offset) => {
                  const pi = start + offset;
                  return pi < projects.length ? renderCard(pi, 'm', offset, true) : null;
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ================== FOOTER ================== */}
      <section className="portfolio-snap-section portfolio-snap-footer">
        <Footer />
      </section>

    </div>
  );
};

export default PortfolioPage;
