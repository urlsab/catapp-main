import React from 'react';
import { FileUp as FileUser, Eye, Presentation, Users } from 'lucide-react';

const KnowledgeHub: React.FC = () => {
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

  const services = [
    {
      icon: <FileUser className="w-6 h-6" />,
      title: 'בניית קורות חיים',
      description: 'בניית קורות חיים מקצועיים המותאמים לתעשיית הטכנולוגיה עם דגש על הדגשת כישורים ויתרונות'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'בדיקת קורות חיים',
      description: 'בדיקה יסודית של קורות חיים קיימים עם המלצות לשיפור ואופטימיזציה'
    },
    {
      icon: <Presentation className="w-6 h-6" />,
      title: 'הרצאות',
      description: 'הרצאות מעמיקות על כתיבת קורות חיים יעילים ואופטימיזציה של פרופיל לינקדאין'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'ייעוץ',
      description: 'ייעוץ מקצועי לעסקים קטנים בתחום ההקמה, הפיתוח והצמיחה'
    }
  ];

  return (
  <section ref={sectionRef} >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            שירותי תוכן
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#1a79f6] to-blue-700 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            מעבר לפיתוח אתרים, אנו מציעים שירותים נוספים לעזור לכם להצליח בקריירה ובעסק
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-blue-600">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
                    <span className="text-[#1a79f6]">
                      {service.icon}
                    </span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-8 text-center">
          <div className="rounded-xl p-6 shadow-lg hover:shadow-2xl border-2 border-gray-100 dark:border-gray-700 inline-block">
            <h3 className="text-1xl font-bold text-gray-900 dark:text-white mb-4">
              מעוניינים בשירותים נוספים?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              צרו איתנו קשר לפרטים נוספים על שירותי הייעוץ, בניית קורות חיים והרצאות
            </p>
            <button 
              onClick={() => window.open('mailto:yairsabag213@gmail.com', '_self')}
              className="bg-gradient-to-r from-[#1a79f6] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              צור קשר עוד היום
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default KnowledgeHub;