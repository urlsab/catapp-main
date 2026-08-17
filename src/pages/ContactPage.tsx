import React, { useRef, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import contactUsImage from '../../Assets/contact us 2.png';
import '../styles/contactSnap.css';

/* ==================== DATA ==================== */

const faqList = [
  {
    question: 'מה היתרון של בונה אתרים מקצועי לעומת תבניות כמו Wix או WordPress?',
    answer: 'Catapp היא חברת בניית אתרים ופיתוח תוכנה שבונה כל אתר מאפס בטכנולוגיות הייטק המתקדמות ביותר כמו React ו-Node.js. התוצאה: ביצועים מהירים פי 10, עיצוב ייחודי ללא הגבלות, קידום בגוגל מובנה ואפשרויות פיתוח בלתי מוגבלות.',
  },
  {
    question: 'כמה עולה בניית אתר לעסק?',
    answer: 'מחיר בניית אתר לעסק משתנה לפי סוג האתר: דף נחיתה מ-2,000 ₪, אתר תדמית מ-5,000 ₪, אתר תיק עבודות מ-8,000 ₪, ואתר מכירות עם סליקה מ-10,000 ₪. כל אתר כולל עיצוב מותאם אישית, התאמה לנייד וקידום בגוגל.',
  },
  {
    question: 'האם האתר שלי יהיה מותאם לכל סוגי המכשירים?',
    answer: 'בהחלט! כל אתר שנבנה ב-Catapp מותאם באופן מלא למובייל, טאבלט ודסקטופ. אנו משתמשים בעיצוב רספונסיבי שמבטיח חוויית שימוש מושלמת בכל גודל מסך.',
  },
  {
    question: 'האם אתם מספקים שירותי תחזוקה ותמיכה לאחר השקה?',
    answer: 'כן, אנו מספקים שירותי תחזוקה שוטפים לאתרים - תיקון באגים, עדכוני אבטחה, גיבויים יומיים ותמיכה טכנית מלאה.',
  },
  {
    question: 'האם אתם בונים אתרים לעורכי דין?',
    answer: 'בהחלט! אנו מתמחים בבניית אתרים לעורכי דין ומשרדי עורכי דין. האתרים כוללים עיצוב מקצועי ויוקרתי, אזורי תוכן לתחומי עיסוק, טפסי ייעוץ ראשוני, וקידום בגוגל מותאם למשרדי עו"ד.',
  },
  {
    question: 'האם אתם מפתחים אפליקציות ומערכות תוכנה?',
    answer: 'כן, Catapp מציעה שירותי פיתוח אפליקציות, בניית אפליקציות ופיתוח תוכנה מותאם אישית. אנו מפתחים מערכות SaaS, אפליקציות ווב ומערכות ניהול לעסקים.',
  },
  {
    question: 'האם אפשר לקבל הצעת מחיר מותאמת אישית?',
    answer: 'בוודאי! ניתן לפנות אלינו בוואטסאפ, בטלפון או בטופס ואנו נתאים הצעת מחיר מפורטת לבניית אתר או פיתוח אפליקציה בהתאם לצרכים שלך.',
  },
];

/* ==================== COMPONENT ==================== */

const ContactPage: React.FC = () => {
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const elementToKey = useRef<WeakMap<Element, string>>(new WeakMap());
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const getRef = (key: string) => (el: HTMLDivElement | null) => {
    if (el) {
      elementRefs.current.set(key, el);
      elementToKey.current.set(el, key);
    }
  };

  const isVis = (key: string) => visibleElements.has(key);

  const handleToggle = (idx: number) => setOpenIdx(openIdx === idx ? null : idx);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `שלום קוראים לי ${formData.name}\n${formData.message}\nלהלן כתובת המייל שלי ${formData.email}`;
    window.open(`https://wa.me/972556611594?text=${encodeURIComponent(message)}`, '_blank');
  };

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

  /* ---- Section 1: Contact Info ---- */
  const renderContactInfo = () => {
    const k = 'contact-info';
    const vis = isVis(k);
    return (
      <div ref={getRef(k)} className={`w-full max-w-4xl mx-auto px-4 lg:px-8 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={staggerDelay(k, 0)}>
        <div className="text-center">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 mb-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">צור קשר</h1>
            </div>
            <div className="flex-shrink-0">
              <div className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white flex items-center justify-center">
                <img src={contactUsImage} alt="צור קשר" className="w-full h-full object-cover object-center" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a79f6]">עונים מהר!</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <a href="tel:+972556611594" className="flex flex-col items-center group cursor-pointer transition-all">
              <span className="bg-[#1a79f6]/10 p-3 rounded-full mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a79f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="text-white group-hover:text-[#1a79f6] text-sm md:text-base transition-colors">055-6611594</span>
            </a>
            <a href="mailto:yairsabag213@gmail.com" className="flex flex-col items-center group cursor-pointer transition-all">
              <span className="bg-[#1a79f6]/10 p-3 rounded-full mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a79f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
              </span>
              <span className="text-white group-hover:text-[#1a79f6] text-sm md:text-base transition-colors break-all">yairsabag213@gmail.com</span>
            </a>
            <a href="https://waze.com/ul?q=רותם+15+לוד&navigate=yes" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group cursor-pointer transition-all">
              <span className="bg-[#1a79f6]/10 p-3 rounded-full mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a79f6">
                  <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </span>
              <span className="text-white group-hover:text-[#1a79f6] text-sm md:text-base transition-colors">לוד, רותם 15</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  /* ---- Section 2: Form & Map ---- */
  const renderFormAndMap = () => {
    const k = 'form-map';
    const vis = isVis(k);
    return (
      <div ref={getRef(k)} className={`w-full max-w-4xl mx-auto px-4 lg:px-8 overflow-y-auto max-h-[calc(100vh-5rem)] transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={staggerDelay(k, 0)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex flex-col gap-3 md:gap-4 shadow">
            <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">לשליחת הודעה ישירות לוואטספ שלנו</h3>
            <form className="flex flex-col gap-2 md:gap-3" onSubmit={handleWhatsAppSend}>
              <input className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder-gray-400 border border-[#1a79f6]/30 focus:border-[#1a79f6] outline-none text-sm md:text-base" placeholder="שם" name="name" value={formData.name} onChange={handleInputChange} required />
              <input className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder-gray-400 border border-[#1a79f6]/30 focus:border-[#1a79f6] outline-none text-sm md:text-base" placeholder="אימייל" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              <textarea className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder-gray-400 border border-[#1a79f6]/30 focus:border-[#1a79f6] outline-none min-h-[60px] md:min-h-[80px] text-sm md:text-base" placeholder="הודעה" name="message" value={formData.message} onChange={handleInputChange} required />
              <button type="submit" className="bg-[#1a79f6] text-white rounded-lg px-4 py-2 font-semibold shadow hover:bg-blue-700 transition text-sm md:text-base">שלח</button>
            </form>
          </div>
          {/* Map */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex flex-col gap-3 md:gap-4 shadow">
            <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">המיקום שלנו</h3>
            <div className="rounded-lg overflow-hidden flex-1">
              <iframe title="map" src="https://maps.google.com/maps?q=רותם 15, לוד&t=&z=16&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0, minHeight: '160px' }} allowFullScreen loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ---- FAQ Item ---- */
  const renderFaqItem = (idx: number, key: string, stagger: number) => {
    const faq = faqList[idx];
    const vis = isVis(key);
    return (
      <div key={key} ref={getRef(key)}
        className={`relative group rounded-2xl shadow-lg border border-[#1a79f6] hover:border-[#1a79f6]/80 transition-all duration-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={staggerDelay(key, stagger)}
      >
        <div className="relative rounded-2xl p-4 bg-white/5 backdrop-blur-sm">
          <button className="flex items-center w-full text-right focus:outline-none" onClick={() => handleToggle(idx)} aria-expanded={openIdx === idx}>
            <span className="flex-1 text-base md:text-lg lg:text-xl font-bold text-white">{faq.question}</span>
            <span className={`ml-2 transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#1a79f6]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-500 ${openIdx === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`} style={{ transitionDelay: openIdx === idx ? '100ms' : '0ms' }}>
            {openIdx === idx && (
              <div className="mt-4 text-white text-sm md:text-base lg:text-lg">{faq.answer}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ---- FAQ Header ---- */
  const renderFaqHeader = (key: string, stagger: number) => {
    const vis = isVis(key);
    return (
      <div ref={getRef(key)} className={`text-center mb-6 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} style={staggerDelay(key, stagger)}>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">שאלות נפוצות על בניית אתרים ופיתוח אפליקציות</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#1a79f6] to-blue-700 mx-auto rounded-full" />
      </div>
    );
  };

  /*
    Layout:
    Section 1: Contact info (title, image, phone/email/address)
    Section 2: Form + Map
    Section 3: FAQ header + FAQs 0-3
    Section 4: FAQs 4-6
    Footer
  */

  return (
    <div ref={snapContainerRef} className="contact-snap-container">

      {/* Section 1: Contact Info */}
      <section className="contact-snap-section">
        {renderContactInfo()}
      </section>

      {/* Section 2: Form & Map */}
      <section className="contact-snap-section">
        {renderFormAndMap()}
      </section>

      {/* Section 3: FAQ Header + FAQs 0-3 */}
      <section className="contact-snap-section">
        <div className="w-full max-w-3xl mx-auto px-4 lg:px-8">
          {renderFaqHeader('faq-h', 0)}
          <div className="space-y-4">
            {renderFaqItem(0, 'faq-0', 1)}
            {renderFaqItem(1, 'faq-1', 2)}
            {renderFaqItem(2, 'faq-2', 3)}
            {renderFaqItem(3, 'faq-3', 4)}
          </div>
        </div>
      </section>

      {/* Section 4: FAQs 4-6 */}
      <section className="contact-snap-section">
        <div className="w-full max-w-3xl mx-auto px-4 lg:px-8">
          <div className="space-y-4">
            {renderFaqItem(4, 'faq-4', 0)}
            {renderFaqItem(5, 'faq-5', 1)}
            {renderFaqItem(6, 'faq-6', 2)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="contact-snap-section contact-snap-footer">
        <Footer />
      </section>
    </div>
  );
};

export default ContactPage;
