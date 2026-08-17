import React from 'react';
import { TypingContent } from '../utils/TypingContent';
// import SmoothScroll from '../components/SmoothScroll';
// import { useLanguage } from '../contexts/LanguageContext';

const TermsPage: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   const section = sectionRef.current;
  //   if (!section) return;
  //   const handleFade = (entries: IntersectionObserverEntry[]) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('fade-in');
  //         entry.target.classList.remove('fade-out');
  //       } else {
  //         entry.target.classList.remove('fade-in');
  //         entry.target.classList.add('fade-out');
  //       }
  //     });
  //   };
  //   const observer = new IntersectionObserver(handleFade, {
  //     threshold: 0.1
  //   });
  //   observer.observe(section);
  //   return () => observer.disconnect();
  // }, []);

  return (
    <div ref={sectionRef} className="min-h-screen pt-16 fade-in">
      {/* <SmoothScroll /> */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            תנאי שימוש
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#1a79f6] to-blue-700 mx-auto"></div>
        </div>

        <div className="border-2 border-blue-600 rounded-2xl p-8">
          <div className="prose prose-lg max-w-none">
            
            <TypingContent>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. הסכמה לתנאי השימוש</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              השימוש באתר Catapp ובשירותים המוצעים בו מהווה הסכמה לתנאי השימוש. אנא קרא/י בעיון את התנאים לפני השימוש באתר.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. השירותים המוצעים</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              האתר מציע שירותי פיתוח ועיצוב אתרים, כתיבה וייעוץ, וכן שירותי תחזוקה שוטפת. התכנים והשירותים באתר מיועדים למטרות מסחריות וכפופים לזכויות יוצרים.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. תהליך העבודה והתשלום</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              מחירי השירותים מוצגים באתר ועשויים להשתנות מעת לעת. בעת הזמנת שירות, תידרש מקדמה של 50% מהסכום הכולל. יתרת התשלום תשולם עם השלמת הפרויקט ולפני העברת הקבצים הסופיים.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. זכויות יוצרים וקניין רוחני</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              כל התכנים באתר, לרבות טקסטים, תמונות, לוגואים ועיצובים, מוגנים בזכויות יוצרים. העתקה או שימוש בתכנים ללא אישור מפורש בכתב אסורים בהחלט. בפרויקטים מותאמים אישית, זכויות היוצרים יועברו ללקוח לאחר התשלום המלא.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. תקופת אחריות ותחזוקה</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              כל פרויקט מגיע עם אחריות של 30 ימים על באגים טכניים. שירותי תחזוקה מתמשכים כוללים עדכוני אבטחה, גיבויים, ותיקוני באגים במסגרת חבילות התחזוקה החודשיות.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. מדיניות ביטולים</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              ניתן לבטל הזמנת שירות תוך 14 יום מיום ההזמנה. ביטול לאחר תחילת העבודה יחייב תשלום עבור השעות שהושקעו בפרויקט עד לרגע הביטול. המקדמה אינה מוחזרת לאחר תחילת העבודה.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. אחריות מוגבלת</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Catapp עושה כל מאמץ לספק שירות מקצועי ואיכותי, אך איננו אחראים לנזקים עקיפים או תוצאתיים שעלולים להיגרם משימוש באתר או בשירותים. מומלץ לגבות תכנים ומידע באופן עצמאי.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">8. יצירת קשר</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              לכל שאלה או בירור בנוגע לתנאי השימוש, ניתן ליצור קשר בטלפון 0556611594 או באימייל yairsabag213@gmail.com. אנו מתחייבים להגיב לכל פנייה בהקדם.
            </p>
            </TypingContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;