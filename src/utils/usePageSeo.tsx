import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://catapp.it.com';

interface PageSeoData {
  title: string;
  description: string;
  schema?: object | object[];
}

const seoData: Record<string, PageSeoData> = {
  '/': {
    title: 'בניית אתרים | עיצוב אתרים | קידום אתרים בגוגל - Catapp',
    description: 'בניית אתרים, עיצוב אתרים וקידום אתרים בגוגל. קידום אתרים אורגני מקצועי. Catapp - בניית אתרים מקצועיים עם React, ביצועים גבוהים וקידום SEO. בניית אתר לעסק קטן, אתר תדמית, חנות אינטרנטית, דף נחיתה. בונה אתרים מומלץ בישראל.',
    // מערך: WebPage לדף עצמו + FAQPage שממופה בדיוק לשאלות הנפוצות שמוצגות בפועל בעמוד הבית
    // (חשוב: FAQ Schema חייב לשקף תוכן שגלוי בעמוד, אחרת גוגל עלול להתעלם ממנו)
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "בניית אתרים | עיצוב אתרים | קידום אתרים | Catapp",
        "description": "בניית אתרים, עיצוב אתרים וקידום אתרים אורגני בגוגל לעסקים בישראל",
        "url": SITE_URL,
        "isPartOf": { "@type": "WebSite", "name": "Catapp", "url": SITE_URL },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "בית", "item": SITE_URL }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "כמה עולה לבנות אתר ב-2026?",
            "acceptedAnswer": { "@type": "Answer", "text": "מחירי בניית אתר משתנים: דף נחיתה מ-2,000₪, אתר תדמית מ-5,000₪, חנות אינטרנטית מ-10,000₪." }
          },
          {
            "@type": "Question",
            "name": "Wix vs אתר מותאם אישית - מה עדיף?",
            "acceptedAnswer": { "@type": "Answer", "text": "אתר מותאם אישית עם React מהיר פי 10, מאובטח יותר, ניתן להתאמה מלאה ומקודם טוב יותר בגוגל." }
          },
          {
            "@type": "Question",
            "name": "למה React עדיף לעסק?",
            "acceptedAnswer": { "@type": "Answer", "text": "React מאפשר ביצועים מעולים, חוויית משתמש חלקה וקידום SEO מתקדם שמביא יותר לקוחות." }
          },
          {
            "@type": "Question",
            "name": "איך לבחור מפתח אתרים?",
            "acceptedAnswer": { "@type": "Answer", "text": "בדקו ניסיון, תיק עבודות, טכנולוגיות, ביקורות לקוחות ותנאי שירות ותחזוקה." }
          }
        ]
      }
    ]
  },
  '/pricing': {
    title: 'מחירון בניית אתרים ועיצוב אתרים 2026 | קידום אתרים בגוגל - Catapp',
    description: 'מחירון בניית אתרים ועיצוב אתרים 2026. קידום אתרים בגוגל, קידום אתרים אורגני. דף נחיתה לעסק מ-2,000₪, אתר תדמית מ-5,000₪, אתר מכירות עם סליקה מ-10,000₪. הצעת מחיר לבניית אתר בהתאמה אישית.',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "מחירון בניית אתרים 2026",
      "description": "מחירון בניית אתרים מעודכן - כמה עולה לבנות אתר לעסק",
      "url": `${SITE_URL}/pricing`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "בית", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "מחירון בניית אתרים", "item": `${SITE_URL}/pricing` }
        ]
      }
    }
  },
  '/portfolio': {
    title: 'תיק עבודות בניית אתרים ועיצוב אתרים | קידום אתרים - Catapp',
    description: 'תיק עבודות בניית אתרים ועיצוב אתרים. קידום אתרים בגוגל וקידום אתרים אורגני. אתרים לעורכי דין, אתרים לבעלי עסקים, דפי נחיתה, אתרי תדמית, חנויות אינטרנטיות ופיתוח אפליקציות.',
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "תיק עבודות בניית אתרים",
      "description": "פרויקטי בניית אתרים ופיתוח תוכנה שביצענו",
      "url": `${SITE_URL}/portfolio`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "בית", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "תיק עבודות", "item": `${SITE_URL}/portfolio` }
        ]
      }
    }
  },
  '/about-full': {
    title: 'אודות Catapp | בניית אתרים, עיצוב אתרים וקידום אתרים בגוגל',
    description: 'Catapp - בניית אתרים, עיצוב אתרים וקידום אתרים אורגני בגוגל. מפתח React פרילנסר מקצועי בישראל. בניית אתרים בהתאמה אישית עם טכנולוגיות מתקדמות. פיתוח אתרים, אפליקציות ותוכנה.',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "אודות Catapp",
      "description": "מפתח React פרילנסר מקצועי בישראל",
      "url": `${SITE_URL}/about-full`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "בית", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "אודות", "item": `${SITE_URL}/about-full` }
        ]
      }
    }
  },
  '/testimonials': {
    title: 'המלצות לקוחות על בניית אתרים ועיצוב אתרים | קידום אתרים - Catapp',
    description: 'המלצות מלקוחות מרוצים: בניית אתרים, עיצוב אתרים וקידום אתרים בגוגל. עורכי דין, בעלי עסקים ומנהלים שבחרו ב-Catapp. דירוג 5 כוכבים מכל הלקוחות.',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "המלצות לקוחות",
      "url": `${SITE_URL}/testimonials`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "בית", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "המלצות", "item": `${SITE_URL}/testimonials` }
        ]
      }
    }
  },
  '/contact': {
    title: 'צור קשר | בניית אתרים, עיצוב אתרים וקידום אתרים - Catapp',
    description: 'צרו קשר עם Catapp לבניית אתרים, עיצוב אתרים וקידום אתרים בגוגל. טלפון: 055-6611594. קידום אתרים אורגני. בונה אתרים לעסקים, עורכי דין ובעלי עסקים. שירות אישי ומהיר.',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "צור קשר - Catapp",
      "description": "צרו קשר לקבלת הצעת מחיר לבניית אתרים",
      "url": `${SITE_URL}/contact`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "בית", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "צור קשר", "item": `${SITE_URL}/contact` }
        ]
      }
    }
  },
  '/faq': {
    title: 'שאלות נפוצות על בניית אתרים, עיצוב אתרים וקידום אתרים | FAQ - Catapp',
    description: 'תשובות לשאלות נפוצות: בניית אתרים, עיצוב אתרים, קידום אתרים בגוגל וקידום אתרים אורגני. כמה עולה לבנות אתר? מה ההבדל בין Wix לאתר מותאם אישית? למה React עדיף לעסק? שאלות על קידום SEO ותחזוקה.',
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "מה היתרון של Catapp על פני חברות אחרות?",
          "acceptedAnswer": { "@type": "Answer", "text": "Catapp מתמחה בפיתוח אתרים חכמים, עיצוב מותאם אישית, קידום SEO, תחזוקה שוטפת ושירותי תוכן. אנו עובדים עם טכנולוגיות מתקדמות ומספקים שירות אישי וזמין." }
        },
        {
          "@type": "Question",
          "name": "האם האתר שלי יהיה מותאם לכל סוגי המכשירים?",
          "acceptedAnswer": { "@type": "Answer", "text": "בהחלט! כל אתר שנבנה ב-Catapp מותאם באופן מלא למובייל, טאבלט ודסקטופ." }
        },
        {
          "@type": "Question",
          "name": "האם אתם מספקים שירותי תחזוקה ותמיכה לאחר ההשקה?",
          "acceptedAnswer": { "@type": "Answer", "text": "כן, אנו מספקים שירותי תחזוקה, תיקון באגים, עדכוני אבטחה ותמיכה שוטפת לכל לקוח." }
        },
        {
          "@type": "Question",
          "name": "האם אפשר לקבל הצעת מחיר מותאמת אישית?",
          "acceptedAnswer": { "@type": "Answer", "text": "בוודאי! ניתן לפנות אלינו דרך עמוד קבלת הצעת מחיר ואנו נתאים את ההצעה לצרכים שלך." }
        },
        {
          "@type": "Question",
          "name": "האם אתם מספקים שירותי קידום בגוגל (SEO)?",
          "acceptedAnswer": { "@type": "Answer", "text": "כן, אנו מתמחים בקידום אתרים בגוגל ומספקים שירותי SEO מתקדמים." }
        },
        {
          "@type": "Question",
          "name": "כמה עולה לבנות אתר ב-2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "מחיר בניית אתר ב-2026: דף נחיתה מ-2,000₪, אתר תדמית מ-5,000₪, אתר מכירות עם סליקה מ-10,000₪. המחיר תלוי בהיקף הפרויקט ובדרישות הייחודיות." }
        },
        {
          "@type": "Question",
          "name": "מה ההבדל בין Wix לאתר מותאם אישית?",
          "acceptedAnswer": { "@type": "Answer", "text": "אתר מותאם אישית עם React מהיר פי 10, מאובטח יותר, ניתן להתאמה מלאה ומקודם טוב יותר בגוגל. Wix מוגבל בעיצוב, ביצועים ואפשרויות פיתוח." }
        }
      ]
    }
  },
  '/quote': {
    title: 'הצעת מחיר לבניית אתרים ועיצוב אתרים | קידום אתרים - Catapp',
    description: 'קבלו הצעת מחיר לבניית אתרים, עיצוב אתרים וקידום אתרים בגוגל. אתר תדמית, חנות אינטרנטית, דף נחיתה או פיתוח אפליקציה. מלאו את הטופס וקבלו הצעה תוך 24 שעות.',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "הצעת מחיר לבניית אתר",
      "url": `${SITE_URL}/quote`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "בית", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "הצעת מחיר", "item": `${SITE_URL}/quote` }
        ]
      }
    }
  },
  '/articles': {
    title: 'מאמרים על בניית אתרים, עיצוב אתרים וקידום אתרים | Catapp',
    description: 'מאמרים מקצועיים על בניית אתרים, עיצוב אתרים, קידום אתרים בגוגל וקידום אתרים אורגני. טכנולוגיות פיתוח, קורות חיים ו-ATS, הנגשת אתרים ועוד. טיפים ומדריכים מעשיים לבעלי עסקים.',
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "בלוג Catapp - מאמרים על בניית אתרים",
      "description": "מאמרים מקצועיים על בניית אתרים, פיתוח תוכנה וקידום דיגיטלי",
      "url": `${SITE_URL}/articles`,
      "blogPost": []
    }
  },
  '/privacy': {
    title: 'מדיניות פרטיות | Catapp - בניית אתרים',
    description: 'מדיניות הפרטיות של Catapp - איך אנו שומרים על המידע שלכם. פרטיות, אבטחת מידע וזכויות המשתמש באתר.',
  },
  '/terms': {
    title: 'תנאי שימוש | Catapp - בניית אתרים',
    description: 'תנאי השימוש של Catapp - תנאי שירות, תשלום, אחריות וביטול. קראו את התנאים לפני הזמנת שירותי בניית אתרים.',
  },
  '/ask-ai': {
    title: 'שאל AI | עוזר חכם לבניית אתרים, עיצוב אתרים וקידום אתרים - Catapp',
    description: 'שאלו את ה-AI של Catapp על בניית אתרים, עיצוב אתרים, קידום אתרים בגוגל, קידום אתרים אורגני, מחירי בניית אתר ועוד. תשובות מיידיות 24/7.',
  },
};

const defaultSeo = seoData['/'];

export function usePageSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const data = seoData[pathname] || defaultSeo;

    // Title
    document.title = data.title;

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', data.description);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', data.title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', data.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `${SITE_URL}${pathname === '/' ? '' : pathname}`);
    }

    // Twitter
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', data.title);
    }

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', data.description);
    }

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${SITE_URL}${pathname === '/' ? '/' : pathname}`);
    }

    // Per-page structured data (JSON-LD) - remove all previously injected page schemas
    document.querySelectorAll('script[data-page-schema]').forEach((el) => el.remove());

    if (data.schema) {
      const schemas = Array.isArray(data.schema) ? data.schema : [data.schema];
      schemas.forEach((schemaObj, i) => {
        const script = document.createElement('script');
        script.dataset.pageSchema = String(i);
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }, [pathname]);
}
