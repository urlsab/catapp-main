import React from 'react';
// import { Users, Award, Clock, Shield } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);

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

  // const features = [
  //   {
  //     icon: <Users className="w-6 h-6" />,
  //     title: 'מקצועיות',
  //     description: 'צוות מנוסה עם ידע עמוק בטכנולוגיות חדישות'
  //   },
  //   {
  //     icon: <Award className="w-6 h-6" />,
  //     title: 'איכות',
  //     description: 'פתרונות מתקדמים ומותאמים אישית לכל לקוח'
  //   },
  //   {
  //     icon: <Clock className="w-6 h-6" />,
  //     title: 'זמינות',
  //     description: 'תמיכה מלאה ותגובה מהירה לבקשות'
  //   },
  //   {
  //     icon: <Shield className="w-6 h-6" />,
  //     title: 'אמינות',
  //     description: 'אבטחת מידע ויציבות מערכות ברמה הגבוהה ביותר'
  //   }
  // ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white dark:bg-black fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">אודות החברה</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#1a79f6] to-blue-700 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Catapp עוסקת בשירותי תוכן וטכנולוגיה, עם התמחות בפיתוח אתרים, תחזוקה ועיצוב. בניית קורות חיים מותאמים להייטק, הקמה ליווי וייעוץ לעסקים קטנים.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;