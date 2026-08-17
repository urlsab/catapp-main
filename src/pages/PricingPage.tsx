import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle, Star, Rocket, Building2, Palette, ShoppingCart, FileText, Image, Users, Laptop, Shield, TrendingUp } from 'lucide-react';
import Footer from '../components/Footer';
import '../styles/pricingSnap.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Building2, Palette, ShoppingCart, FileText, Image, Users, Laptop, Shield, TrendingUp
};

/* ==================== DATA ==================== */

const pricingPlans = [
  { name: 'בניית דף נחיתה לעסק', price: 'החל מ-2,000 ₪', icon: 'Rocket', features: ['עיצוב מותאם אישית', 'רספונסיבי לכל המכשירים', 'אופטימיזציה לגוגל (SEO)', 'טופס יצירת קשר', 'מותאם לבעלי עסקים ועורכי דין'], examples: ['orbenji.com'] },
  { name: 'בניית אתר תדמית לעסק', price: 'החל מ-5,000 ₪', icon: 'Building2', features: ['עד 10 עמודים', 'מערכת ניהול תוכן', 'גלריית תמונות', 'אינטגרציה עם רשתות חברתיות', 'אופטימיזציה מתקדמת לגוגל', 'מושלם לעורכי דין ובעלי עסקים'], examples: ['atliz.co.il'], popular: true },
  { name: 'בניית אתר תיק עבודות', price: 'החל מ-8,000 ₪', icon: 'Palette', features: ['עיצוב יוניק ומותאם', 'גלריית עבודות מתקדמת', 'אנימציות מרהיבות', 'בלוג מובנה', 'כלים לקידום עצמי בגוגל'], examples: ['portfolio-uriel-yair-sabag.vercel.app'] },
  { name: 'בניית אתר מכירות עם סליקה', price: 'החל מ-10,000 ₪', icon: 'ShoppingCart', features: ['קטלוג מוצרים', 'עגלת קניות', 'מערכת תשלומים מאובטחת', 'ניהול הזמנות', 'דוחות מכירות', 'אינטגרציה עם מלאי'] },
  { name: 'בניית אתר בלוג מקצועי', price: 'החל מ-7,000 ₪', icon: 'FileText', features: ['מערכת פרסום פוסטים', 'קטגוריות ותגים', 'חיפוש מתקדם', 'תגובות וליייקים', 'שיתוף ברשתות חברתיות'] },
  { name: 'בניית אתר גלריה', price: 'החל מ-8,000 ₪', icon: 'Image', features: ['גלריית תמונות מתקדמת', 'עיצוב ייחודי', 'התאמה אישית', 'שיתוף ברשתות חברתיות'] },
  { name: 'פיתוח רשת חברתית / אפליקציה', price: 'החל מ-10,000 ₪', icon: 'Users', features: ['מערכת משתמשים', 'פרופילים אישיים', 'פיד חברתי', 'מסרים פרטיים', 'קבוצות ואירועים'], examples: ['yelp--camp--project.herokuapp.com'] },
  { name: 'פיתוח תוכנה SaaS מותאם אישית', price: 'החל מ-10,000 ₪', icon: 'Laptop', features: ['פיתוח תוכנה בהתאמה אישית', 'מערכת ניהול', 'אינטגרציות מתקדמות', 'תמיכה טכנית שוטפת'], examples: ['resumes-builder.web.app'] },
];

const maintenancePlans = [
  { name: 'הגנה מפני קריסות ותיקון באגים', price: '300 ₪ לחודש', icon: 'Shield', features: ['ניטור 24/7', 'תיקון באגים מיידי', 'גיבויים יומיים', 'עדכוני אבטחה'] },
  { name: 'קידום בגוגל', price: 'החל מ-400 ₪ לחודש', icon: 'TrendingUp', features: ['אופטימיזציית תוכן', 'בניית קישורים', 'ניתוח מתחרים', 'דוחות ביצועים חודשיים'] },
  { name: 'עדכון תכנים שוטפים', price: 'החל מ-300 ₪ לחודש', icon: 'FileText', features: ['עדכון תוכן שוטף', 'הוספת עמודים חדשים', 'עדכון תמונות', 'שיפור UX'] },
];

/* ==================== COMPONENT ==================== */

const PricingPage: React.FC = () => {
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

  /* ---------- Render Helpers ---------- */

  const staggerDelay = (key: string, idx: number): React.CSSProperties =>
    ({ transitionDelay: isVis(key) ? `${idx * 150}ms` : '0ms' });

  // Section Header
  const renderHeader = (key: string, emoji: string, title: string, subtitle: string, titleGrad: string, dividerGrad: string, isH1 = false, stagger = 0) => (
    <div ref={getRef(key)} className={`text-center mb-3 lg:mb-6 transition-all duration-700 ${isVis(key) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} style={staggerDelay(key, stagger)}>
      <div className="inline-block mb-1 lg:mb-3"><span className="text-2xl lg:text-5xl">{emoji}</span></div>
      {React.createElement(isH1 ? 'h1' : 'h2', {
        className: `text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-1.5 lg:mb-4 bg-clip-text text-transparent bg-gradient-to-r ${titleGrad}`
      }, title)}
      <p className="text-xs lg:text-lg text-gray-300 mb-1.5 lg:mb-4">{subtitle}</p>
      <div className={`w-16 lg:w-32 h-0.5 lg:h-1.5 bg-gradient-to-r ${dividerGrad} mx-auto rounded-full`} />
    </div>
  );

  /* ---- Card: narrow tall rectangle shape ---- */
  const cardBase = 'group relative overflow-hidden bg-gray-800/50 backdrop-blur-lg border rounded-2xl lg:rounded-3xl transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl';

  // Website Card
  const renderWebCard = (idx: number, prefix: string, stagger = 0) => {
    const plan = pricingPlans[idx];
    const k = `${prefix}-w-${idx}`;
    const vis = isVis(k);
    return (
      <div key={k} ref={getRef(k)}
        className={`${cardBase} bg-gradient-to-br from-gray-800/80 to-gray-900/80 ${
          plan.popular ? 'border-[#1a79f6] shadow-xl shadow-blue-500/20' : 'border-gray-700/50 hover:border-gray-500/60'
        } ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={staggerDelay(k, stagger)}
      >
        <div className={`absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-b ${plan.popular ? 'from-blue-500/10 to-purple-500/10' : 'from-blue-500/5 to-purple-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        {plan.popular && (
          <div className="absolute top-3 left-3 lg:top-4 lg:left-4 z-10 -rotate-6 origin-center">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-3 lg:px-4 py-0.5 lg:py-1 rounded-lg text-[9px] lg:text-[11px] font-extrabold flex items-center shadow-lg border border-white/30 whitespace-nowrap">
              <Star size={10} className="mr-1 ml-0.5 animate-pulse flex-shrink-0" fill="white" />
              המומלץ ביותר
            </div>
          </div>
        )}
        <div className="relative px-3 py-3 lg:px-5 lg:py-5">
          <div className="text-center mb-2 lg:mb-4">
            <div className={`mb-1.5 lg:mb-3 flex justify-center transition-transform duration-300 group-hover:scale-110 ${plan.popular ? 'animate-pulse' : ''}`}>
              {React.createElement(iconMap[plan.icon], {
                className: `w-8 h-8 lg:w-12 lg:h-12 ${plan.popular ? 'text-[#1a79f6]' : 'text-blue-400 group-hover:text-[#1a79f6]'} transition-colors duration-300`
              })}
            </div>
            <h3 className="text-sm lg:text-lg font-bold text-white mb-1 lg:mb-2 group-hover:text-blue-400 transition-colors leading-tight">{plan.name}</h3>
            <div className="text-base lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a79f6] to-purple-500">{plan.price}</div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-2 lg:mb-4" />
          <ul className="space-y-1 lg:space-y-2">
            {plan.features.map((f, fi) => (
              <li key={fi} className="flex items-start text-gray-300 group-hover:text-white transition-colors">
                <CheckCircle size={14} className="text-green-400 mr-1.5 ml-1 lg:mr-2 lg:ml-1.5 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] lg:text-xs leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Maintenance Card
  const renderMaintCard = (idx: number, prefix: string, stagger = 0) => {
    const plan = maintenancePlans[idx];
    const k = `${prefix}-m-${idx}`;
    const vis = isVis(k);
    return (
      <div key={k} ref={getRef(k)}
        className={`${cardBase} bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 hover:border-green-500/50 hover:shadow-green-500/10 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={staggerDelay(k, stagger)}
      >
        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-b from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative px-3 py-3 lg:px-5 lg:py-5">
          <div className="text-center mb-2 lg:mb-4">
            <div className="mb-1.5 lg:mb-3 flex justify-center transition-transform duration-300 group-hover:scale-110">
              {React.createElement(iconMap[plan.icon], { className: 'w-8 h-8 lg:w-12 lg:h-12 text-green-400 group-hover:text-green-300 transition-colors duration-300' })}
            </div>
            <h4 className="text-sm lg:text-lg font-bold text-white mb-1 lg:mb-2 group-hover:text-green-400 transition-colors leading-tight">{plan.name}</h4>
            <div className="text-base lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">{plan.price}</div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-2 lg:mb-4" />
          <ul className="space-y-1 lg:space-y-2">
            {plan.features.map((f, fi) => (
              <li key={fi} className="flex items-start text-gray-300 group-hover:text-white transition-colors">
                <CheckCircle size={14} className="text-green-400 mr-1.5 ml-1 lg:mr-2 lg:ml-1.5 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] lg:text-xs leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // CTA Button
  const renderCta = (key: string, href: string, emoji: string, text: string, grad: string, revGrad: string, shadow: string, stagger = 0) => (
    <div ref={getRef(key)} className={`flex justify-center mt-6 lg:mt-10 transition-all duration-700 ${isVis(key) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={staggerDelay(key, stagger)}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-8 lg:px-12 py-3 lg:py-4 text-sm lg:text-lg font-bold text-white transition-all duration-300 ease-in-out transform hover:scale-105 min-h-[44px] lg:min-h-[52px]">
        <span className={`absolute inset-0 w-full h-full bg-gradient-to-r ${grad} rounded-2xl shadow-xl group-hover:shadow-2xl ${shadow}`} />
        <span className={`absolute inset-0 w-full h-full bg-gradient-to-r ${revGrad} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <span className="relative flex items-center whitespace-nowrap">{emoji} {text}</span>
      </a>
    </div>
  );

  return (
    <div ref={snapContainerRef} className="pricing-snap-container">

      {/* ================== DESKTOP SECTIONS (≥1024px) ================== */}

      {/* D1: Website Title + Cards 0-1 */}
      <section className="pricing-snap-section pricing-desktop-only">
        <div className="w-full max-w-3xl mx-auto px-6 lg:px-8">
          {renderHeader('d-wh', '', 'מחירון בניית אתרים ופיתוח אתרים', 'מחירי בניית אתר לעסק - דפי נחיתה, אתרי תדמית, חנויות אינטרנטיות ופיתוח אפליקציות', 'from-blue-400 to-purple-600', 'from-[#1a79f6] via-purple-500 to-pink-500', true)}
          <div className="grid grid-cols-2 gap-8 xl:gap-10">
            {renderWebCard(0, 'd', 1)}
            {renderWebCard(1, 'd', 2)}
          </div>
        </div>
      </section>

      {/* D2: Website Cards 2-3 */}
      <section className="pricing-snap-section pricing-desktop-only">
        <div className="w-full max-w-3xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 xl:gap-10">
            {renderWebCard(2, 'd', 0)}
            {renderWebCard(3, 'd', 1)}
          </div>
        </div>
      </section>

      {/* D3: Website Cards 4-5 */}
      <section className="pricing-snap-section pricing-desktop-only">
        <div className="w-full max-w-3xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 xl:gap-10">
            {renderWebCard(4, 'd', 0)}
            {renderWebCard(5, 'd', 1)}
          </div>
        </div>
      </section>

      {/* D4: Website Cards 6-7 + CTA */}
      <section className="pricing-snap-section pricing-desktop-only">
        <div className="w-full max-w-3xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 xl:gap-10">
            {renderWebCard(6, 'd', 0)}
            {renderWebCard(7, 'd', 1)}
          </div>
          {renderCta('d-wcta', 'https://forms.gle/A94BRJsPUNZQ6YQy7', '🚀', 'לטופס אפיון אתר', 'from-[#1a79f6] via-blue-600 to-purple-600', 'from-purple-600 via-blue-600 to-[#1a79f6]', 'group-hover:shadow-blue-500/50', 2)}
        </div>
      </section>

      {/* D5: Maintenance Title + Cards 0-1 */}
      <section className="pricing-snap-section pricing-desktop-only">
        <div className="w-full max-w-3xl mx-auto px-6 lg:px-8">
          {renderHeader('d-mh', '', 'תחזוקת אתרים וקידום בגוגל', 'שירותי תחזוקה, קידום SEO ועדכון תכנים לאתרים לעסקים', 'from-green-400 to-emerald-600', 'from-green-400 via-emerald-500 to-teal-500')}
          <div className="grid grid-cols-2 gap-8 xl:gap-10">
            {renderMaintCard(0, 'd', 1)}
            {renderMaintCard(1, 'd', 2)}
          </div>
        </div>
      </section>

      {/* D6: Maintenance Card 2 + CTA */}
      <section className="pricing-snap-section pricing-desktop-only">
        <div className="w-full max-w-3xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 xl:gap-10">
            {renderMaintCard(2, 'd', 0)}
            <div />
          </div>
          {renderCta('d-mcta', 'https://forms.gle/vNGtve7iHdJHCqhA9', '🛡️', 'לטופס אפיון טיפול חודשי', 'from-green-500 via-emerald-600 to-teal-600', 'from-teal-600 via-emerald-600 to-green-500', 'group-hover:shadow-green-500/50', 1)}
        </div>
      </section>

      {/* D-Footer */}
      <section className="pricing-snap-section pricing-snap-footer pricing-desktop-only">
        <Footer />
      </section>

      {/* ================== MOBILE SECTIONS (<1024px) ================== */}

      {/* M1: Website Title + Card 0 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderHeader('m-wh', '', 'מחירון בניית אתרים ופיתוח אתרים', 'מחירי בניית אתר לעסק - דפי נחיתה, אתרי תדמית וחנויות אינטרנטיות', 'from-blue-400 to-purple-600', 'from-[#1a79f6] via-purple-500 to-pink-500', true)}
          {renderWebCard(0, 'm', 1)}
        </div>
      </section>

      {/* M2: Website Card 1 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderWebCard(1, 'm', 0)}
        </div>
      </section>

      {/* M3: Website Card 2 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderWebCard(2, 'm', 0)}
        </div>
      </section>

      {/* M4: Website Card 3 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderWebCard(3, 'm', 0)}
        </div>
      </section>

      {/* M5: Website Card 4 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderWebCard(4, 'm', 0)}
        </div>
      </section>

      {/* M6: Website Card 5 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderWebCard(5, 'm', 0)}
        </div>
      </section>

      {/* M7: Website Card 6 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderWebCard(6, 'm', 0)}
        </div>
      </section>

      {/* M8: Website Card 7 + CTA */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderWebCard(7, 'm', 0)}
          {renderCta('m-wcta', 'https://forms.gle/A94BRJsPUNZQ6YQy7', '🚀', 'לטופס אפיון אתר', 'from-[#1a79f6] via-blue-600 to-purple-600', 'from-purple-600 via-blue-600 to-[#1a79f6]', 'group-hover:shadow-blue-500/50', 1)}
        </div>
      </section>

      {/* M9: Maintenance Title + Card 0 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderHeader('m-mh', '', 'תחזוקת אתרים וקידום בגוגל', 'שירותי תחזוקה, קידום SEO ועדכון תכנים לאתרים לעסקים', 'from-green-400 to-emerald-600', 'from-green-400 via-emerald-500 to-teal-500')}
          {renderMaintCard(0, 'm', 1)}
        </div>
      </section>

      {/* M10: Maintenance Card 1 */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderMaintCard(1, 'm', 0)}
        </div>
      </section>

      {/* M11: Maintenance Card 2 + CTA */}
      <section className="pricing-snap-section pricing-mobile-only">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {renderMaintCard(2, 'm', 0)}
          {renderCta('m-mcta', 'https://forms.gle/vNGtve7iHdJHCqhA9', '🛡️', 'לטופס אפיון טיפול חודשי', 'from-green-500 via-emerald-600 to-teal-600', 'from-teal-600 via-emerald-600 to-green-500', 'group-hover:shadow-green-500/50', 1)}
        </div>
      </section>

      {/* M-Footer */}
      <section className="pricing-snap-section pricing-snap-footer pricing-mobile-only">
        <Footer />
      </section>

    </div>
  );
};

export default PricingPage;
