import React, { useRef, useEffect, useState } from 'react';
import logoBg from '../../Assets/catapp logo no bg.png';
import { Target, Shield, Code, Bot, Accessibility, Sparkles, Wrench, X, CheckCircle2 } from 'lucide-react';
import { FaWordpress } from 'react-icons/fa';
import Footer from '../components/Footer';
import '../styles/aboutSnap.css';

const AboutFullPage: React.FC = () => {
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const elementToKey = useRef<WeakMap<Element, string>>(new WeakMap());
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  const getRef = (key: string) => (el: HTMLDivElement | null) => {
    if (el) {
      elementRefs.current.set(key, el);
      elementToKey.current.set(el, key);
    }
  };

  const isVis = (key: string) => visibleElements.has(key);

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

  return (
  <div ref={snapContainerRef} className="about-snap-container">
      {/* רקע לוגו מטושטש - fixed behind all sections */}
      <div className="fixed inset-0 z-0 flex justify-center items-center pointer-events-none">
        <img
          src={logoBg}
          alt="Catapp Logo Background"
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain opacity-10 blur-2xl select-none"
          style={{ filter: 'blur(32px)' }}
        />
      </div>

      {/* ===== SECTION 1: Title + Company Intro ===== */}
      <section className="about-snap-section">
        <div ref={getRef('s1')} className={`relative z-10 max-w-6xl mx-auto px-4 w-full transition-all duration-700 ${isVis('s1') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 pb-2 tracking-tight bg-gradient-to-r from-[#1a79f6] to-blue-400 bg-clip-text text-transparent leading-tight px-2 sm:px-4">
            אודות Catapp - בונה אתרים ומפתח תוכנה
          </h1>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-[#1a79f6] to-blue-700 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-3 sm:px-4">
            החברה המובילה בישראל לבניית אתרים, פיתוח אתרים, פיתוח אפליקציות ופיתוח תוכנה מתקדם
          </p>
        </div>

          {/* הצגת החברה */}
          <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-8 backdrop-blur-sm border-animated bg-white/5" style={{"--color1": "#1a79f6", "--color2": "#ffffff", "--angle": "0deg"} as React.CSSProperties}>
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-[#1a79f6] mb-3 sm:mb-4 md:mb-6 text-center">למה Catapp שונה?</h2>
            <p className="mb-4 md:mb-6 text-center text-sm sm:text-base text-white">
              <span className="font-bold text-[#1a79f6]">Catapp</span> נוסדה מתוך צורך אמיתי - 
              <span className="font-semibold"> לפתור את בעיית המהירות והגמישות</span> בבניית אתרים ופיתוח אתרים מקצועיים. 
              בניגוד לפלטפורמות תבניתיות כמו  Wix אנו בונים כל אתר מאפס
              <span className="font-bold text-[#1a79f6]"> בטכנולוגיות ההייטק המתקדמות ביותר</span>.
            </p>
            <p className="mb-4 md:mb-6 text-center text-base sm:text-lg md:text-xl font-semibold text-white">
              אצלנו - עיצוב בלתי מוגבל, ביצועים מהירים פי 10, ופיצ'רים שלא תראו בשום מקום אחר!
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: Not WordPress ===== */}
      <section className="about-snap-section">
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div ref={getRef('s2-title')} className={`mb-4 sm:mb-6 transition-all duration-700 ${isVis('s2-title') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 text-center flex flex-wrap items-center justify-center gap-2 md:gap-3">
              אנחנו לא בונים עם
              <span className="relative inline-flex items-center gap-2">
                <span className="text-gray-400">WordPress</span>
                <span className="relative inline-block">
                  <FaWordpress className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  <X className="w-10 h-10 sm:w-14 sm:h-14 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-[2]" />
                </span>
              </span>
            </h2>
            <p className="mb-3 md:mb-4 text-center text-lg sm:text-xl md:text-2xl font-bold">
              <span className="text-white">אנחנו בונים עם</span>
              <span className="text-[#1a79f6]"> World's Best</span>
            </p>
            {/* <p className="mb-4 md:mb-6 text-center text-sm sm:text-base md:text-lg text-gray-300">
              פלטפורמות כמו WordPress, Wix ו- מגבילות אתכם לתבניות קבועות, איטיות וחסרות גמישות.
            </p> */}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Tech Details Text ===== */}
      <section className="about-snap-section">
        <div ref={getRef('s3')} className={`relative z-10 max-w-3xl mx-auto px-4 w-full transition-all duration-700 ${isVis('s3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} dir="rtl">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a79f6] mb-4 md:mb-6 flex items-center gap-2 md:gap-3 justify-center">
                    <Code className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    הטכנולוגיות שלנו - רמת הייטק אמיתית
                  </h3>
                  <p className="text-gray-300 mb-3 md:mb-4 text-sm sm:text-base md:text-lg text-center">
                    אנחנו משתמשים בטכנולוגיות המתקדמות ביותר בתעשייה:
                  </p>
                  <div className="bg-black/40 rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#1a79f6] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white">React & TypeScript</p>
                        <p className="text-sm text-gray-400">ספריות מודרניות למממשקי משתמש דינמיים</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#1a79f6] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white">Node.js & MongoDB</p>
                        <p className="text-sm text-gray-400">תשתית שרת חזקה ומסד נתונים גמיש</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#1a79f6] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white">Vercel & Firebase</p>
                        <p className="text-sm text-gray-400">פריסה מהירה ושירותי ענן מתקדמים</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#1a79f6] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white">Tailwind CSS & Vite</p>
                        <p className="text-sm text-gray-400">עיצוב מהיר ובנייה אופטימלית</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#1a79f6] font-semibold mt-6 text-center">
                    הטכנולוגיות האלה מאפשרות לנו לבנות אתרים פי 10 יותר מהירים, יציבים ומאובטחים!
                  </p>
        </div>
      </section>

      {/* ===== SECTION 4: Accessibility ===== */}
      <section className="about-snap-section">
        <div ref={getRef('s4')} className={`relative z-10 max-w-6xl mx-auto px-4 w-full transition-all duration-700 ${isVis('s4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Visual on left */}
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a79f6]/20 to-blue-600/20 animate-pulse"></div>
                  <div className="absolute inset-4 sm:inset-6 md:inset-8 rounded-full bg-gradient-to-br from-[#1a79f6]/30 to-blue-700/30 flex items-center justify-center">
                    <Accessibility className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 text-[#1a79f6]" />
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#1a79f6]/30 flex items-center justify-center animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}}>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1a79f6]" />
                  </div>
                  <div className="absolute bottom-6 left-3 sm:bottom-8 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#1a79f6]/30 flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2s'}}>
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1a79f6]" />
                  </div>
                  <div className="absolute top-8 left-2 sm:top-12 sm:left-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#1a79f6]/30 flex items-center justify-center animate-bounce" style={{animationDelay: '1s', animationDuration: '2s'}}>
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1a79f6]" />
                  </div>
                </div>
              </div>
              
              {/* Text on right */}
              <div className="text-center md:text-right">
                <h2 className="text-base sm:text-lg md:text-2xl font-bold text-[#1a79f6] mb-3 md:mb-6 flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                  <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  <span className="text-center md:text-right">הנגשה מלאה - הגנה משפטית ואחריות חברתית</span>
                </h2>
                <p className="mb-3 md:mb-4 text-xs sm:text-sm md:text-lg text-center md:text-right">
                  <span className="font-bold text-[#1a79f6]">כל אתר אצלנו מונגש באופן מלא!</span>
                </p>
                <div className="bg-black/40 rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6">
                  <ul className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm md:text-base">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1a79f6] flex-shrink-0 mt-0.5 sm:mt-1" />
                      <span><strong>הגנה משפטית:</strong> עמידה מלאה בחוק הנגשת שירותי אינטרנט - תגן על העסק שלך מתביעות</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1a79f6] flex-shrink-0 mt-0.5 sm:mt-1" />
                      <span><strong>אחריות חברתית:</strong> נגישות לאנשים עם מוגבלויות - לך תדע אם הלקוח או הגולש הבא שלך צריך את זה</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1a79f6] flex-shrink-0 mt-0.5 sm:mt-1" />
                      <span><strong>SEO משופר:</strong> אתרים מונגשים מקבלים דירוג טוב יותר בגוגל</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1a79f6] flex-shrink-0 mt-0.5 sm:mt-1" />
                      <span><strong>חוויית משתמש טובה יותר:</strong> הנגשה משפרת את החוויה לכולם</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* ===== SECTION 5: AI Bot ===== */}
      <section className="about-snap-section">
        <div ref={getRef('s5')} className={`relative z-10 max-w-6xl mx-auto px-4 w-full transition-all duration-700 ${isVis('s5') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              {/* Text on left */}
              <div className="text-center md:text-right">
                <h2 className="text-base sm:text-lg md:text-2xl font-bold text-white mb-3 md:mb-6 flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                  <Bot className="w-8 h-8" />
                  בוט AI חכם
                </h2>
                <p className="mb-4 text-lg">
                  <span className="font-bold text-white">אפשרות להרחבת האתר עם בוט AI חכם!</span>
                </p>
                <div className="bg-black/40 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                      <span><strong>עונה על שאלות:</strong> הבוט לומד את תוכן האתר שלך ועונה לגולשים בצורה חכמה</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                      <span><strong>מידע ממקורות חיצוניים:</strong> יכול לחפש מידע גם מרחבי האינטרנט</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                      <span><strong>חיסכון בזמן:</strong> הבוט עושה את העבודה הקשה במקומך</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Visual on right */}
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-gray-500/20 animate-pulse"></div>
                  <div className="absolute inset-4 rounded-2xl bg-white/10 border-2 border-white/50 flex flex-col items-center justify-center p-4">
                    <Bot className="w-24 h-24 text-white mb-3" />
                    <div className="w-full space-y-2">
                      <div className="h-2 bg-white/50 rounded animate-pulse" style={{animationDelay: '0s'}}></div>
                      <div className="h-2 bg-white/30 rounded w-3/4 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="h-2 bg-white/40 rounded w-5/6 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-white/30 flex items-center justify-center animate-bounce">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* ===== SECTION 6: Maintenance ===== */}
      <section className="about-snap-section">
        <div ref={getRef('s6')} className={`relative z-10 max-w-6xl mx-auto px-4 w-full transition-all duration-700 ${isVis('s6') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              {/* Text on left */}
              <div className="text-center md:text-right">
                <h2 className="text-base sm:text-lg md:text-2xl font-bold text-[#1a79f6] mb-3 md:mb-6 flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                  <Wrench className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 animate-spin" style={{animationDuration: '3s'}} />
                  תחזוקה מתמשכת ושיפור הקוד
                </h2>
                <p className="mb-4 md:mb-6 text-sm sm:text-base md:text-lg text-white">
                  <span className="font-bold text-[#1a79f6]">Catapp</span> משפרת ומעדכנת את הקוד שלכם באופן שוטף
                </p>
                <p className="text-gray-300 mb-3 md:mb-4 text-sm sm:text-base">
                  אנחנו דואגים שהקוד שלכם תמיד יהיה נקי, מעודכן ומאובטח 🛡️
                </p>
                <div className="bg-black/40 rounded-lg md:rounded-xl p-3 sm:p-4">
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#1a79f6] flex-shrink-0 mt-0.5" />
                      <span>תיקון שגיאות ואזהרות</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#1a79f6] flex-shrink-0 mt-0.5" />
                      <span>עדכון חבילות ישנות</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#1a79f6] flex-shrink-0 mt-0.5" />
                      <span>אופטימיזציה לביצועים</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#1a79f6] flex-shrink-0 mt-0.5" />
                      <span>בדיקות אבטחה שוטפות</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Visual on right - Before/After comparison */}
              <div className="space-y-4">
                <div className="bg-red-900/30 rounded-xl p-4 border-2 border-red-600 animate-pulse">
                  <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                    <X className="w-5 h-5 animate-spin" style={{animationDuration: '2s'}} />
                    לפני התיקון
                  </h3>
                  <div className="bg-black/60 rounded p-3 font-mono text-xs text-red-300">
                    <div className="animate-pulse">⚠️ 47 warnings</div>
                    <div className="animate-pulse" style={{animationDelay: '0.2s'}}>❌ 12 errors</div>
                    <div className="animate-pulse" style={{animationDelay: '0.4s'}}>🐛 Deprecated packages</div>
                    <div className="animate-pulse" style={{animationDelay: '0.6s'}}>⚡ Slow performance</div>
                  </div>
                </div>
                <div className="bg-green-900/30 rounded-xl p-4 border-2 border-green-600 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50">
                  <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 animate-bounce" />
                    אחרי התיקון
                  </h3>
                  <div className="bg-black/60 rounded p-3 font-mono text-xs text-green-300">
                    <div>✅ 0 warnings</div>
                    <div>✅ 0 errors</div>
                    <div>✅ All packages updated</div>
                    <div>⚡ Optimized & fast</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* ===== SECTION 7: CTA ===== */}
      <section className="about-snap-section">
        <div ref={getRef('s7')} className={`relative z-10 max-w-3xl mx-auto px-4 w-full transition-all duration-700 ${isVis('s7') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative text-center rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border-animated bg-white/10 backdrop-blur-sm" style={{"--color1": "#1a79f6", "--color2": "#ffffff", "--angle": "0deg"} as React.CSSProperties}>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">מוכנים להתחיל?</h2>
            <p className="text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
              עם ניסיון עשיר, טכנולוגיות עדכניות ותמיכה מתמשכת – Catapp היא הבחירה הטבעית שלכם להצלחה בעולם הדיגיטל.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a href="/contact" 
                 className="bg-white text-[#1a79f6] hover:bg-gray-100 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base">
                ליצירת קשר
              </a>
          </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: Footer ===== */}
      <section className="about-snap-section about-snap-footer">
        <Footer />
      </section>
      
    </div>
  );
};

export default AboutFullPage;
