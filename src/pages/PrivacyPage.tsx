import React from 'react';
import { TypingContent } from '../utils/TypingContent';
// import SmoothScroll from '../components/SmoothScroll';
// import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPage: React.FC = () => {
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
            מדיניות פרטיות
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#1a79f6] to-blue-700 mx-auto"></div>
        </div>

        <div className="border-2 border-blue-600 rounded-2xl p-8">
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <TypingContent>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. איסוף מידע</h3>
              <p className="mb-4">
                אנו אוספים מידע שאתם מספקים לנו ביצירת קשר, כולל שם, טלפון, אימייל ופרטי הפרויקט.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. שימוש במידע</h3>
              <p className="mb-4">
                המידע משמש אותנו לצורך מתן השירות, יצירת קשר ומעקב אחר הפרויקט. לא נשתף את המידע עם צדדים שלישיים.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. אבטחת מידע</h3>
              <p className="mb-4">
                אנו נוקטים באמצעי אבטחה מתקדמים לשמירה על המידע האישי שלכם.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. עוגיות (Cookies)</h3>
              <p className="mb-4">
                האתר עשוי להשתמש בעוגיות לשיפור חוויית המשתמש. ניתן לנטרל עוגיות בהגדרות הדפדפן.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. זכויות המשתמש</h3>
              <p className="mb-4">
                יש לכם זכות לבקש עדכון, מחיקה או העברת המידע האישי שלכם.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. יצירת קשר</h3>
              <p className="mb-4">
                לשאלות בנושא פרטיות, ניתן ליצור קשר בטלפון 0556611594 או באימייל yairsabag213@gmail.com
              </p>
            </TypingContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;