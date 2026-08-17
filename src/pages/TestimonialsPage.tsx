import React, { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Footer from '../components/Footer';
import '../styles/testimonialsSnap.css';

/* ==================== DATA ==================== */

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Catapp+%D7%91%D7%A0%D7%99%D7%99%D7%AA+%D7%90%D7%AA%D7%A8%D7%99%D7%9D+%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%95%D7%AA';

const testimonials = [
  {
    id: 1,
    name: 'אור בנג\'י, פסיכותרפיסט',
    stars: 5,
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'פנינו לחברת Catapp לדף נחיתה לעסק – הכל נעשה בצורה מקצועית ומדויקת עם הקשבה לצרכים שלנו. שילוב נפלא של עבודה ברמה גבוהה ויחס נהדר ללקוח. בהחלט אמליץ!'
  },
  {
    id: 2,
    name: 'יאיר אהרוני, סטודנט להנדסת חשמל ואלקטרוניקה',
    stars: 5,
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'ליווי מקצועי ואישי ברמה גבוהה, עם תשומת לב לפרטים והבנה עמוקה של הצרכים שלי. התוצאה – קורות חיים מרשימים שמציגים אותי בצורה מדויקת. שירות ברמה הגבוהה ביותר.'
  },
  {
    id: 3,
    name: 'רפאל סבג, בעלים של משרד עו"ד',
    stars: 5,
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'קיבלתי יחס אישי, זמינות מלאה והקשבה אמיתית לצרכים שלי. העבודה בוצעה במהירות ובמקצועיות – והתוצאה עלתה על הציפיות. ממליץ מכל הלב.'
  },
  {
    id: 4,
    name: 'אוריאל, מנהל קהילת מעקף',
    stars: 5,
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'חברת Catapp העבירה לקהילה שלנו הרצאה יוצאת דופן על כתיבת קו"ח, מלאה בתוכן פרקטי עם דוגמאות מעשיות. ממליץ בחום רב!'
  },
  {
    id: 5,
    name: 'אנאל לוי, מנהלת מתנ"ס',
    stars: 5,
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'Catapp עשה סדר בבלאגן, הקשיב בסבלנות ועזר לי לבנות קורות חיים שמשקפים את היכולות שלי. הליווי היה נעים ומעודד. מומלץ בחום!'
  },
  {
    id: 6,
    name: 'אוריאל בן מרקו',
    stars: 5,
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'שירות מעל ומעבר למצופה! לא ויתרתם על אף פרויקט וכיוונתם לקורות חיים יפים ומקצועיים – במחיר סמלי מאוד. ממש תודה 🫶🏼'
  },
  {
    id: 7,
    name: 'אברהם שור, מפתח Full Stack',
    stars: 5,
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'לא להאמין כמה זמן וכח השקעת – רק מי שעובר את זה מבין עד כמה. המחיר שאתה לוקח אפסי לעומת התוצר והתועלת. ממליץ מכל הלב!!! ❤️'
  },
  {
    id: 8,
    name: 'אסף לכט , AI Software Engineer',
    stars: 5,
    googleUrl: GOOGLE_REVIEWS_URL,
    text: 'מעבר למחיר, הייתה לו סבלנות ובסוף הרגשתי שהרווחתי לא רק ייעוץ אלא גם חבר. בדיוק החלק שחסר כשמחפשים עבודה – תהליך רגשי, לא רק מסמך.'
  }
];

/* ==================== COMPONENT ==================== */

const TestimonialsPage: React.FC = () => {
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const elementToKey = useRef<WeakMap<Element, string>>(new WeakMap());
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [displayRating, setDisplayRating] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const counterStartedRef = useRef(false);

  const getRef = (key: string) => (el: HTMLDivElement | null) => {
    if (el) {
      elementRefs.current.set(key, el);
      elementToKey.current.set(el, key);
    }
  };

  const isVis = (key: string) => visibleElements.has(key);

  // Animated counter when header becomes visible
  useEffect(() => {
    const headerVisible = visibleElements.has('dc') || visibleElements.has('mc');
    if (headerVisible && !counterStartedRef.current) {
      counterStartedRef.current = true;
      const ratingTarget = 5.0;
      const countTarget = 37;
      const duration = 1600;
      const steps = 60;
      const intervalMs = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayRating(parseFloat((ratingTarget * eased).toFixed(1)));
        setDisplayCount(Math.min(Math.round(countTarget * eased), countTarget));
        if (step >= steps) {
          clearInterval(timer);
          setDisplayRating(ratingTarget);
          setDisplayCount(countTarget);
        }
      }, intervalMs);
      return () => clearInterval(timer);
    }
  }, [visibleElements]);

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

  // IntersectionObserver for fade in/out
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

  /* ---------- Render Helpers ---------- */

  const staggerDelay = (key: string, idx: number): React.CSSProperties =>
    ({ transitionDelay: isVis(key) ? `${idx * 150}ms` : '0ms' });

  // Counter section
  const renderCounter = (key: string) => (
    <div
      ref={getRef(key)}
      className={`flex gap-10 sm:gap-16 lg:gap-24 items-center transition-all duration-700 ${isVis(key) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Rating */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-8xl sm:text-9xl font-black text-white tabular-nums leading-none">{displayRating.toFixed(1)}</span>
        <div className="flex gap-1.5 my-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={22} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-black" style={{ color: '#4285F4' }}>G</span>
          </div>
          <span className="text-sm text-gray-400">דירוג Google</span>
        </div>
      </div>
      {/* Divider */}
      <div className="w-px h-28 bg-white/15 rounded-full" />
      {/* Count */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-8xl sm:text-9xl font-black text-white tabular-nums leading-none">{displayCount}</span>
        <span className="text-sm text-gray-400 mt-1">ביקורות מאומתות</span>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#1a79f6] hover:underline flex items-center gap-1"
        >
          <span>צפה בגוגל</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    </div>
  );

  // Testimonial Card
  const renderCard = (idx: number, prefix: string, stagger = 0) => {
    const t = testimonials[idx];
    const k = `${prefix}-t${idx}`;
    const vis = isVis(k);
    return (
      <div key={k} ref={getRef(k)}
        className={`group relative backdrop-blur-sm rounded-2xl lg:rounded-3xl transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/10 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={staggerDelay(k, stagger)}
      >
        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-b from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative px-5 py-5 lg:px-7 lg:py-7 text-right flex flex-col justify-between h-full">
          {/* Stars + Google badge */}
          <div>
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-black" style={{ color: '#4285F4' }}>G</span>
                </div>
                <span className="text-gray-500 text-[10px]">Google</span>
              </div>
              <div className="flex gap-1">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={15} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            {/* Quote */}
            <p className="text-white text-base lg:text-lg leading-relaxed mb-4 lg:mb-6">
              "{t.text}"
            </p>
          </div>
          {/* Name + Google link */}
          <div className="pt-3 lg:pt-4 flex items-center justify-between gap-2">
            <a
              href={t.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-[#1a79f6] transition-colors duration-200 border border-white/10 hover:border-[#1a79f6]/40 rounded-lg px-2.5 py-1.5 whitespace-nowrap flex-shrink-0"
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              <span>צפה בביקורת בגוגל</span>
            </a>
            <span className="font-bold text-[#1a79f6] text-base lg:text-lg text-right">{t.name}</span>
          </div>
        </div>
      </div>
    );
  };

  /* 7 testimonials:
     Desktop (≥1024): D1: header + cards 0-1, D2: cards 2-3, D3: cards 4-5, D4: card 6
     Mobile  (<1024): M1: header + card 0, M2-M7: cards 1-6
     Footer: separate section */

  return (
    <div ref={snapContainerRef} className="testimonials-snap-container">

      {/* SEO: page has no visible heading otherwise - sr-only H1 keeps design intact */}
      <h1 className="sr-only">המלצות לקוחות אמיתיות על בניית אתרים וקידום אתרים - Catapp</h1>

      {/* ================== DESKTOP SECTIONS (≥1024px) ================== */}

      {/* DC: Counter */}
      <section className="testimonials-snap-section testimonials-desktop-only">
        <div className="w-full flex justify-center items-center">
          {renderCounter('dc')}
        </div>
      </section>

      {/* D1–D4: 2 cards per section */}
      {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, idx) => {
        const first = idx * 2;
        const second = first + 1;
        return (
          <section key={`d-sec-${idx}`} className="testimonials-snap-section testimonials-desktop-only">
            <div className="w-full max-w-4xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-8 xl:gap-10">
                {renderCard(first, 'd', 0)}
                {second < testimonials.length && renderCard(second, 'd', 1)}
              </div>
            </div>
          </section>
        );
      })}

      {/* ================== MOBILE SECTIONS (<1024px) ================== */}

      {/* MC: Counter */}
      <section className="testimonials-snap-section testimonials-mobile-only">
        <div className="w-full flex justify-center items-center">
          {renderCounter('mc')}
        </div>
      </section>

      {/* M1–M4: 2 cards per section */}
      {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, idx) => {
        const first = idx * 2;
        const second = first + 1;
        return (
          <section key={`m-sec-pair-${idx}`} className="testimonials-snap-section testimonials-mobile-only">
            <div className="w-full max-w-md mx-auto px-4">
              {renderCard(first, 'm', 0)}
              {second < testimonials.length && renderCard(second, 'm', 1)}
            </div>
          </section>
        );
      })}

      {/* ================== FOOTER ================== */}
      <section className="testimonials-snap-section testimonials-snap-footer">
        <Footer />
      </section>
    </div>
  );
};

export default TestimonialsPage;
