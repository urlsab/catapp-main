import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

/* ==================== KNOWLEDGE BASE ==================== */

const knowledgeBase = [
  {
    keywords: ['מחיר', 'עלות', 'כמה עולה', 'דף נחיתה', 'לנדינג'],
    answer: 'דף נחיתה מתחיל מ-2,000 ₪ וכולל עיצוב מותאם אישית, רספונסיביות מלאה, אופטימיזציה לגוגל וטופס יצירת קשר.'
  },
  {
    keywords: ['אתר תדמית', 'תדמית', 'אתר עסקי'],
    answer: 'אתר תדמית מתחיל מ-5,000 ₪ וכולל עד 10 עמודים, מערכת ניהול תוכן, גלריית תמונות, אינטגרציה עם רשתות חברתיות ואופטימיזציה מתקדמת.'
  },
  {
    keywords: ['תיק עבודות', 'פורטפוליו', 'portfolio'],
    answer: 'אתר תיק עבודות מתחיל מ-8,000 ₪ וכולל עיצוב יוניק, גלריית עבודות מתקדמת, אנימציות מרהיבות, בלוג מובנה וכלים לקידום עצמי.'
  },
  {
    keywords: ['חנות', 'מכירות', 'סליקה', 'ecommerce', 'חנות אונליין'],
    answer: 'אתר מכירות עם סליקה מתחיל מ-10,000 ₪ וכולל קטלוג מוצרים, עגלת קניות, מערכת תשלומים, ניהול הזמנות, דוחות מכירות ואינטגרציה עם מלאי.'
  },
  {
    keywords: ['בלוג'],
    answer: 'אתר בלוג מתחיל מ-7,000 ₪ וכולל מערכת פרסום פוסטים, קטגוריות ותגים, חיפוש מתקדם, תגובות ולייקים ושיתוף ברשתות חברתיות.'
  },
  {
    keywords: ['גלריה', 'תמונות'],
    answer: 'אתר גלריה מתחיל מ-8,000 ₪ וכולל גלריית תמונות מתקדמת, עיצוב ייחודי, התאמה אישית ושיתוף ברשתות חברתיות.'
  },
  {
    keywords: ['רשת חברתית', 'סושיאל', 'social'],
    answer: 'בניית רשת חברתית מותאמת אישית מתחילה מ-10,000 ₪ וכוללת מערכת משתמשים, פרופילים אישיים, פיד חברתי, מסרים פרטיים וקבוצות.'
  },
  {
    keywords: ['saas', 'מוצר', 'תוכנה'],
    answer: 'בניית מוצר SaaS לפי הזמנה מתחילה מ-10,000 ₪ וכוללת פיתוח בהתאמה אישית, מערכת ניהול, אינטגרציות מתקדמות ותמיכה טכנית.'
  },
  {
    keywords: ['תחזוקה', 'באגים', 'קריסה', 'תיקון'],
    answer: 'שירות הגנה מפני קריסות ותיקון באגים עולה 300 ₪ לחודש וכולל ניטור 24/7, תיקון באגים מיידי, גיבויים יומיים ועדכוני אבטחה.'
  },
  {
    keywords: ['קידום', 'seo', 'גוגל', 'קידום אתרים'],
    answer: 'שירות קידום בגוגל (SEO) מתחיל מ-400 ₪ לחודש וכולל אופטימיזציית תוכן, בניית קישורים, ניתוח מתחרים ודוחות ביצועים חודשיים.'
  },
  {
    keywords: ['עדכון תכנים', 'תוכן שוטף', 'עדכון'],
    answer: 'שירות עדכון תכנים שוטפים מתחיל מ-300 ₪ לחודש וכולל עדכון תוכן שוטף, הוספת עמודים חדשים, עדכון תמונות ושיפור UX.'
  },
  {
    keywords: ['קורות חיים', 'cv', 'קו"ח', 'רזומה'],
    answer: 'כתיבת קורות חיים בשפה אחת עולה 200 ₪, בעברית + אנגלית 370 ₪. יש גם מפגשי זום ללימוד עקרונות כתיבת קו"ח (250 ₪) וחבילות משולבות עם LinkedIn.'
  },
  {
    keywords: ['linkedin', 'לינקדאין'],
    answer: 'מפגש זום להעצמת פרופיל LinkedIn עולה 250 ₪. יש גם חבילה משולבת קו"ח + LinkedIn ב-470 ₪, וחבילת ALL-INCLUSIVE מקיפה ב-800 ₪ הכוללת קו"ח בשתי שפות + זום קו"ח + זום LinkedIn.'
  },
  {
    keywords: ['all inclusive', 'חבילה מלאה', 'הכל כלול'],
    answer: 'חבילת ALL-INCLUSIVE עולה 800 ₪ וכוללת כתיבת קו"ח בעברית ובאנגלית, זום על קו"ח, זום מלא להעצמת LinkedIn וליווי ממוקד עד מוצר מוכן לשליחה.'
  },
  {
    keywords: ['טלפון', 'פלאפון', 'מספר', 'התקשר'],
    answer: 'ניתן ליצור קשר בטלפון: 055-6611594. אנחנו עונים מהר!'
  },
  {
    keywords: ['מייל', 'אימייל', 'email', 'דואר'],
    answer: 'כתובת המייל שלנו: yairsabag213@gmail.com'
  },
  {
    keywords: ['כתובת', 'מיקום', 'איפה', 'משרד', 'לוד'],
    answer: 'המשרד שלנו נמצא בלוד, רותם 15.'
  },
  {
    keywords: ['קשר', 'ליצור קשר', 'פנה', 'פניה'],
    answer: 'ניתן ליצור איתנו קשר בטלפון 055-6611594, במייל yairsabag213@gmail.com, או לבקר אותנו בלוד, רותם 15. אנחנו עונים מהר!'
  },
  {
    keywords: ['מי אתם', 'אודות', 'catapp', 'מה זה'],
    answer: 'Catapp מתמחה בפיתוח אתרים חכמים, עיצוב מותאם אישית, קידום SEO, תחזוקה שוטפת, שירותי תוכן וכתיבת קורות חיים. אנו עובדים עם טכנולוגיות מתקדמות ומספקים שירות אישי וזמין.'
  },
  {
    keywords: ['רספונסיבי', 'מובייל', 'טאבלט', 'נייד', 'מותאם'],
    answer: 'כל אתר שנבנה ב-Catapp מותאם באופן מלא למובייל, טאבלט ודסקטופ.'
  },
  {
    keywords: ['הצעת מחיר', 'הצעה'],
    answer: 'ניתן לפנות אלינו דרך עמוד קבלת הצעת מחיר או ליצור קשר ישירות, ואנו נתאים את ההצעה לצרכים שלך.'
  },
  {
    keywords: ['דתי', 'חרדי', 'דתיים'],
    answer: 'כן, אנו מתאימים את השירותים והעיצובים גם לציבור הדתי והחרדי.'
  },
  {
    keywords: ['יתרון', 'למה אתכם', 'מיוחד'],
    answer: 'Catapp מתמחה בפיתוח אתרים חכמים, עיצוב מותאם אישית, קידום SEO, תחזוקה שוטפת ושירותי תוכן. אנו עובדים עם טכנולוגיות מתקדמות ומספקים שירות אישי וזמין לכל לקוח.'
  },
  {
    keywords: ['שירותים', 'מה אתם מציעים', 'שירות'],
    answer: 'אנו מציעים: פיתוח אתרים (דפי נחיתה, אתרי תדמית, חנויות, בלוגים, רשתות חברתיות, SaaS), תחזוקה חודשית (הגנה מקריסות, קידום SEO, עדכון תכנים), וכן שירותי קורות חיים והעצמת פרופיל LinkedIn.'
  },
];

/* ==================== TYPES ==================== */

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  typing?: boolean;
}

/* ==================== COMPONENT ==================== */

const AskAIPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findAnswer = (question: string): string => {
    const q = question.toLowerCase().trim();
    let bestMatch = '';
    let bestScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (q.includes(kw.toLowerCase())) {
          score += kw.length; // longer keyword match = higher relevance
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry.answer;
      }
    }

    return bestMatch || 'מצטער, לא מצאתי מידע רלוונטי באתר. נסה לשאול על מחירים, שירותים, קורות חיים, פרטי קשר או כל נושא אחר שמופיע באתר.';
  };

  const typeAnswer = (answer: string) => {
    setIsTyping(true);
    // Add empty AI message that will be "typed"
    setMessages(prev => [...prev, { role: 'ai', text: '', typing: true }]);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages(prev => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        updated[lastIdx] = { role: 'ai', text: answer.slice(0, i), typing: i < answer.length };
        return updated;
      });
      if (i >= answer.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const question = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: question }]);

    // Small delay before AI starts "thinking"
    setTimeout(() => {
      const answer = findAnswer(question);
      typeAnswer(answer);
    }, 400);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="fixed inset-0 z-35 flex flex-col">
      {/* Fade-in title */}
      <div className="pt-20 pb-2 px-4 text-center flex-shrink-0 animate-[fadeSlideDown_0.6s_ease_forwards]">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a79f6] animate-pulse" />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1a79f6] via-blue-400 to-purple-500">
            שאל AI
          </h1>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 animate-pulse" />
        </div>
      </div>

      {/* Main content area */}
      {hasMessages ? (
        /* ===== CONVERSATION MODE ===== */
        <>
          <div className="flex-1 overflow-y-auto px-2 xs:px-3 sm:px-4 pb-4 animate-[fadeSlideDown_0.5s_0.15s_ease_both]">
            <div className="max-w-xl lg:max-w-2xl mx-auto space-y-4 pt-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 sm:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'ai' ? (
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1a79f6] to-purple-600 flex items-center justify-center">
                      <Bot size={14} className="text-white sm:w-4 sm:h-4" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <User size={14} className="text-gray-300 sm:w-4 sm:h-4" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#1a79f6] text-white rounded-br-sm'
                      : 'bg-gray-800/80 text-gray-100 rounded-bl-sm border border-gray-700/50'
                  }`}>
                    <span dir="rtl">{msg.text}</span>
                    {msg.typing && (
                      <span className="inline-block w-0.5 h-4 bg-[#1a79f6] ml-0.5 animate-pulse align-middle" />
                    )}
                  </div>
                </div>
              ))}

              {isTyping && messages[messages.length - 1]?.text === '' && (
                <div className="flex gap-2 sm:gap-3 flex-row">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1a79f6] to-purple-600 flex items-center justify-center">
                    <Bot size={14} className="text-white sm:w-4 sm:h-4" />
                  </div>
                  <div className="bg-gray-800/80 rounded-2xl rounded-bl-sm px-4 py-3 border border-gray-700/50">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input pinned to bottom in conversation mode */}
          <div className="flex-shrink-0 border-t border-gray-800/60 bg-gray-950/60 backdrop-blur-md px-10 sm:px-4 py-2 xs:py-2.5 sm:py-3">
            <form onSubmit={handleSend} className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto flex gap-1.5 xs:gap-2 md:gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="שאלו שאלה על האתר..."
                disabled={isTyping}
                className="flex-1 bg-gray-800/60 border border-gray-700/50 focus:border-[#1a79f6] rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-2.5 md:py-3 text-white placeholder-gray-500 outline-none text-xs xs:text-sm md:text-base transition-colors disabled:opacity-50"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="flex-shrink-0 bg-gradient-to-r from-[#1a79f6] to-blue-600 hover:from-blue-600 hover:to-[#1a79f6] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg xs:rounded-xl px-3 xs:px-4 md:px-5 py-2 xs:py-2.5 md:py-3 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              >
                <Send size={16} className="rotate-180" />
              </button>
            </form>
          </div>
        </>
      ) : (
        /* ===== EMPTY / WELCOME MODE — input centered, suggestions at bottom ===== */
        <div className="flex-1 flex flex-col justify-between">
          {/* Centered input */}
          <div className="flex-1 flex items-center justify-center px-10 sm:px-6 animate-[fadeSlideDown_0.7s_0.2s_ease_both]">
            <form onSubmit={handleSend} className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl flex gap-1.5 xs:gap-2 md:gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="שאלו שאלה על האתר..."
                disabled={isTyping}
                className="flex-1 bg-gray-800/60 border border-gray-700/50 focus:border-[#1a79f6] rounded-lg xs:rounded-xl px-3 xs:px-4 py-2.5 xs:py-3 md:py-3.5 text-white placeholder-gray-500 outline-none text-xs xs:text-sm md:text-base transition-colors disabled:opacity-50"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="flex-shrink-0 bg-gradient-to-r from-[#1a79f6] to-blue-600 hover:from-blue-600 hover:to-[#1a79f6] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg xs:rounded-xl px-3 xs:px-4 md:px-5 py-2.5 xs:py-3 md:py-3.5 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              >
                <Send size={16} className="rotate-180" />
              </button>
            </form>
          </div>

          {/* Suggestions pinned at bottom */}
          <div className="flex-shrink-0 px-3 xs:px-4 sm:px-6 pb-6 sm:pb-8 animate-[fadeSlideDown_0.7s_0.4s_ease_both]">
            <div className="flex flex-wrap justify-center gap-1.5 xs:gap-2 max-w-lg mx-auto">
              {['כמה עולה דף נחיתה?', 'מה השירותים שלכם?', 'איך יוצרים קשר?', 'מה כולל קורות חיים?'].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); inputRef.current?.focus(); }}
                  className="px-2.5 xs:px-3 py-1 xs:py-1.5 md:px-4 md:py-2 rounded-full border border-[#1a79f6]/30 text-[#1a79f6] text-[10px] xs:text-xs md:text-sm hover:bg-[#1a79f6]/10 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyframes for fade-in from top */}
      <style>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AskAIPage;
