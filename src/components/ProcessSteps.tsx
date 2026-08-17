
import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle, Layout, Edit, Palette, UploadCloud, FileText, UserCheck } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title: string;
  steps: Step[];
}


const ProcessSteps: React.FC<ProcessStepsProps> = ({ title, steps }) => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSteps, setActiveSteps] = useState<boolean[]>(Array(steps.length).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSteps(prev => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [steps.length]);

  // קביעת האינדקס האחרון שנצפה (הכי "פעיל")
  const lastActiveIdx = activeSteps.lastIndexOf(true);

  return (
    <div className="w-full flex flex-col items-center py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1a79f6] mb-8 text-center">{title}</h2>
      <div className="relative w-full max-w-2xl mx-auto flex flex-row justify-center">
        {/* ציר אנכי */}
        <div className="relative flex flex-col items-center" style={{ minHeight: `${steps.length * 120}px` }}>
          {/* קו ציר */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 z-0">
            <div className="w-full bg-gradient-to-b from-[#1a79f6] to-[#e6f0fa] transition-all duration-700" style={{ height: `${((lastActiveIdx+1)/steps.length)*100}%` }} />
            <div className="w-full bg-gradient-to-b from-gray-300 to-white absolute top-0 left-0" style={{ height: `${100-((lastActiveIdx+1)/steps.length)*100}%`, top: `${((lastActiveIdx+1)/steps.length)*100}%` }} />
          </div>
          {/* שלבים */}
          {steps.map((step, idx) => {
            const isRight = idx % 2 === 0;
            return (
              <div key={idx} className="relative flex w-full min-h-[120px] items-center">
                {/* טקסט ימין */}
                {isRight && (
                  <div className="flex-1 flex flex-col items-end justify-center pr-4 text-right">
                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-700 ${activeSteps[idx] ? 'text-[#1a79f6]' : 'text-gray-700'}`}>{step.title}</h3>
                    <p className={`text-sm max-w-[260px] transition-colors duration-700 ${activeSteps[idx] ? 'text-[#1a79f6]/80' : 'text-gray-500'}`}>{step.description}</p>
                  </div>
                )}
                {/* אייקון על הציר */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    ref={el => (stepRefs.current[idx] = el)}
                    className={`flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-700 shadow-lg bg-white
                      ${activeSteps[idx] ? 'border-[#1a79f6] bg-[#e6f0fa]' : 'border-gray-300'}
                    `}
                  >
                    <span className={`transition-colors duration-700 ${activeSteps[idx] ? 'text-[#1a79f6]' : 'text-gray-400'}`}>{step.icon}</span>
                  </div>
                </div>
                {/* טקסט שמאל */}
                {!isRight && (
                  <div className="flex-1 flex flex-col items-start justify-center pl-4 text-left">
                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-700 ${activeSteps[idx] ? 'text-[#1a79f6]' : 'text-gray-700'}`}>{step.title}</h3>
                    <p className={`text-sm max-w-[260px] transition-colors duration-700 ${activeSteps[idx] ? 'text-[#1a79f6]/80' : 'text-gray-500'}`}>{step.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
