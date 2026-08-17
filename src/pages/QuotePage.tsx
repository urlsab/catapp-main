import React from 'react';
// import SmoothScroll from '../components/SmoothScroll';

const QuotePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* <SmoothScroll /> */}
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">לקבלת הצעת מחיר</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-700 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 mb-4">בחרו את סוג השירות שתרצו לקבל עבורו הצעת מחיר:</p>
        </div>
        <div className="grid gap-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-4">בניית אתר</h2>
            <a
              href="https://forms.gle/A94BRJsPUNZQ6YQy7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1a79f6] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl shadow transition-all text-lg"
            >
              לטופס אפיון אתר
            </a>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-4">תחזוק חודשי</h2>
            <a
              href="https://forms.gle/vNGtve7iHdJHCqhA9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-2xl shadow transition-all text-lg"
            >
              לטופס אפיון טיפול חודשי
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;
