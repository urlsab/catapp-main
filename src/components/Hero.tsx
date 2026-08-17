import React from 'react';
import { Link } from 'react-router-dom';
// import { useLanguage } from '../contexts/LanguageContext';
import { ArrowDown, Code, Palette, Zap } from 'lucide-react';

const Hero: React.FC = () => {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-900 dark:to-gray-800 pt-16 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Logo and Title */}
          <div className="mb-8 fade-in">
            {/* <img src="/logo.png" alt="Catapp" className="h-20 md:h-32 mx-auto mb-4" /> */}
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#1a79f6] to-blue-800 bg-clip-text text-transparent mb-4 fade-in">
              Catapp
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium fade-in">
              בניית אתרים | פיתוח אתרים | פיתוח אפליקציות
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed fade-in">
            בונה אתרים מקצועי - בניית אתרים לעסקים, פיתוח תוכנה, בניית אפליקציות ופיתוח אפליקציות לבעלי עסקים ועורכי דין
          </p>

          {/* Feature Icons */}
          <div className="flex justify-center items-center space-x-8 rtl:space-x-reverse mb-12 fade-in">
            <div className="flex flex-col items-center fade-in">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2 fade-in">
                <Code className="w-8 h-8 text-[#1a79f6] fade-in" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 fade-in">פיתוח</span>
            </div>
            <div className="flex flex-col items-center fade-in">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2 fade-in">
                <Palette className="w-8 h-8 text-[#1a79f6] fade-in" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 fade-in">עיצוב</span>
            </div>
            <div className="flex flex-col items-center fade-in">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2 fade-in">
                <Zap className="w-8 h-8 text-[#1a79f6] fade-in" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 fade-in">תחזוק</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-16 fade-in">
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-[#1a79f6] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 fade-in"
            >
              צור קשר
            </Link>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-[#1a79f6] hover:text-blue-700 transition-colors fade-in"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;