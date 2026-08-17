import React, { useState } from 'react';
// import SmoothScroll from '../components/SmoothScroll';

const faqList = [
  {
    question: 'מה היתרון של Catapp על פני חברות אחרות?',
    answer: 'Catapp מתמחה בפיתוח אתרים חכמים, עיצוב מותאם אישית, קידום SEO, תחזוקה שוטפת ושירותי תוכן. אנו עובדים עם טכנולוגיות מתקדמות ומספקים שירות אישי וזמין.'
  },
  {
    question: 'האם האתר שלי יהיה מותאם לכל סוגי המכשירים?',
    answer: 'בהחלט! כל אתר שנבנה ב-Catapp מותאם באופן מלא למובייל, טאבלט ודסקטופ.'
  },
  {
    question: 'האם אתם מספקים שירותי תחזוקה ותמיכה לאחר ההשקה?',
    answer: 'כן, אנו מספקים שירותי תחזוקה, תיקון באגים, עדכוני אבטחה ותמיכה שוטפת לכל לקוח.'
  },
  {
    question: 'האם אפשר לקבל הצעת מחיר מותאמת אישית?',
    answer: 'בוודאי! ניתן לפנות אלינו דרך עמוד קבלת הצעת מחיר ואנו נתאים את ההצעה לצרכים שלך.'
  },
  {
    question: 'האם אתם מספקים שירותי קידום בגוגל (SEO)?',
    answer: 'כן, אנו מתמחים בקידום אתרים בגוגל ומספקים שירותי SEO מתקדמים.'
  },
  {
    question: 'האם אפשר לקבל אתר גם לציבור הדתי והחרדי?',
    answer: 'כן, אנו מתאימים את השירותים והעיצובים גם לציבור הדתי והחרדי.'
  },
  {
    question: 'האם אפשר לקבל ייעוץ לבניית קורות חיים?',
    answer: 'בהחלט! אנו מספקים שירותי בניית ושיפור קורות חיים, כולל ייעוץ אישי.'
  }
];

const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };
  return (
    <div>
      {/* <SmoothScroll /> */}
      <div className="max-w-3xl mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">שאלות נפוצות</h1>
          <div className="w-24 h-1 mx-auto mb-8"></div>
        </div>
        <div className="space-y-4">
          {faqList.map((faq, idx) => (
            <div key={idx} className="relative group rounded-2xl shadow-lg border border-[#1a79f6]/30 hover:border-[#1a79f6]/60 transition-all"
              style={{
                backgroundSize: '300% 300%',
                backgroundColor: 'transparent',
                borderRadius: '1rem'
              }}>
              
              {/* Content container */}
              <div className="relative rounded-2xl p-4 bg-white/5 backdrop-blur-sm">
                <button
                  className="flex items-center w-full text-right focus:outline-none"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={openIdx === idx}
                >
                  <span className="flex-1 text-xl font-bold text-white">{faq.question}</span>
                  <span className={`ml-2 transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#1a79f6]">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${openIdx === idx ? 'max-h-40 opacity-100 animate-fade-in-faq' : 'max-h-0 opacity-0'}`}
                  style={{ transitionDelay: openIdx === idx ? '100ms' : '0ms' }}
                >
                  {openIdx === idx && (
                    <div className="mt-4 text-white text-lg">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
