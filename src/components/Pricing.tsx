import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  // const { t } = useLanguage();

  const pricingPlans = [
    {
      name: 'דף נחיתה',
      price: 'החל מ-2000 ₪',
      icon: '🚀',
      features: ['עיצוב מותאם אישית', 'רספונסיבי לכל המכשירים', 'אופטימיזציה לגוגל', 'טופס יצירת קשר'],
      examples: ['orbenji.com', 'refael-law.com']
    },
    {
      name: 'אתר תדמית',
      price: 'החל מ-5000 ₪',
      icon: '🏢',
      features: ['עד 10 עמודים', 'מערכת ניהול תוכן', 'גלריית תמונות', 'אינטגרציה עם רשתות חברתיות', 'אופטימיזציה מתקדמת'],
      examples: ['atliz.co.il'],
      popular: true
    },
    {
      name: 'אתר תיק עבודות',
      price: 'החל מ-8000 ₪',
      icon: '🎨',
      features: ['עיצוב יוניק ומותאם', 'גלרית עבודות מתקדמת', 'אנימציות מרהיבות', 'בלוג מובנה', 'כלים לקידום עצמי'],
      examples: ['portfolio-uriel-yair-sabag.vercel.app']
    },
    {
      name: 'אתר מכירות עם סליקה',
      price: 'החל מ-10,000 ₪',
      icon: '🛒',
      features: ['קטלוג מוצרים', 'עגלת קניות', 'מערכת תשלומים', 'ניהול הזמנות', 'דוחות מכירות', 'אינטגרציה עם מלאי']
    },
    {
      name: 'אתר בלוג',
      price: 'החל מ-7000 ₪',
      icon: '📝',
      features: ['מערכת פרסום פוסטים', 'קטגוריות ותגים', 'חיפוש מתקדם', 'תגובות וליייקים', 'שיתוף ברשתות חברתיות']
    },
    {
      name: 'אתר גלריה',
      price: 'החל מ-8000 ₪',
      icon: '🖼️',
      features: ['גלריית תמונות מתקדמת', 'עיצוב ייחודי', 'התאמה אישית', 'שיתוף ברשתות חברתיות']
    },
    {
      name: 'רשת חברתית',
      price: 'החל מ-10000 ₪',
      icon: '👥',
      features: ['מערכת משתמשים', 'פרופילים אישיים', 'פיד חברתי', 'מסרים פרטיים', 'קבוצות ואירועים'],
      examples: ['yelp--camp--project.herokuapp.com']
    },
    {
      name: 'בניית מוצר SaaS לפי הזמנה',
      price: 'החל מ-10000 ₪',
      icon: '💻',
      features: ['פיתוח בהתאמה אישית', 'מערכת ניהול', 'אינטגרציות מתקדמות', 'תמיכה טכנית'],
      examples: ['resumes-builder.web.app']
    }
  ];

  const maintenancePlans = [
    {
      name: 'הגנה מפני קריסות ותיקון באגים',
      price: '300 ₪ לחודש',
      icon: '🛡️',
      features: ['ניטור 24/7', 'תיקון באגים מיידי', 'גיבויים יומיים', 'עדכוני אבטחה']
    },
    {
      name: 'קידום בגוגל',
      price: 'החל מ-400 ₪ לחודש',
      icon: '📈',
      features: ['אופטימיזציית תוכן', 'בניית קישורים', 'ניתוח מתחרים', 'דוחות ביצועים חודשיים']
    },
    {
      name: 'עדכון תכנים שוטפים',
      price: 'החל מ-300 ₪ לחודש',
      icon: '✏️',
      features: ['עדכון תוכן שוטף', 'הוספת עמודים חדשים', 'עדכון תמונות', 'שיפור UX']
    }
  ];

  return (
    <section id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Pricing */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            מחירון
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            בחרו את החבילה המתאימה לכם
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 ${plan.popular ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-sm flex items-center">
                    <Star size={14} className="mr-1 ml-1" />
                    פופולרי
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{plan.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {plan.price}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check size={16} className="text-green-500 mr-2 ml-0 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.examples && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">דוגמאות:</p>
                  {plan.examples.map((example, exampleIndex) => (
                    <a key={exampleIndex} href={`https://${example}`} target="_blank" rel="noopener noreferrer" 
                       className="block text-sm text-blue-600 dark:text-blue-400 hover:underline mb-1">
                      {example}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Maintenance Pricing */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            חבילות תחזוק
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {maintenancePlans.map((plan, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              <div className="text-center mb-6">
                <div className="text-3xl mb-3">{plan.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h4>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {plan.price}
                </div>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check size={14} className="text-green-500 mr-2 ml-0 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;