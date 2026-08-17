import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy projects data
const projects = [
  {
    title: 'Modern Portfolio Website',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Creative Agency Landing',
    image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'E-Commerce Mockup',
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Business Dashboard',
    image: 'https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const ANIMATION_DURATION = 700; // ms

const ScrollProjects: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 or 1
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Wheel handler
  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      if (e.deltaY > 0 && index < projects.length - 1) {
        setDirection(1);
        setIsAnimating(true);
        setIndex((i) => i + 1);
        e.preventDefault();
      } else if (e.deltaY < 0 && index > 0) {
        setDirection(-1);
        setIsAnimating(true);
        setIndex((i) => i - 1);
        e.preventDefault();
      }
    },
    [index, isAnimating]
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  useEffect(() => {
    if (isAnimating) {
      timeoutRef.current = setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
    return undefined;
  }, [isAnimating]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#101014]"
      style={{ position: 'sticky', top: 0, zIndex: 20 }}
    >
      {/* Pagination Dots */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-300 w-3 h-3 rounded-full border-2 border-[#1a79f6] ${
              i === index ? 'bg-[#1a79f6] scale-125' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
      {/* Project Slide */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{
              x: direction > 0 ? 60 : -60,
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
            }}
            exit={{
              x: direction > 0 ? -60 : 60,
              opacity: 0,
              scale: 0.97,
              transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
            }}
            className="relative w-full flex flex-col items-center"
            style={{ minHeight: 420 }}
          >
            <div className="w-full h-72 md:h-80 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg bg-white/10">
              <img
                src={projects[index].image}
                alt={projects[index].title}
                className="object-cover w-full h-full transition-all duration-700"
                draggable={false}
              />
            </div>
            <motion.h2
              key={projects[index].title}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.5 } }}
              exit={{ y: -40, opacity: 0, transition: { duration: 0.4 } }}
              className="mt-8 text-2xl md:text-3xl font-bold text-white text-center"
            >
              {projects[index].title}
            </motion.h2>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Overlay Title */}
      <div className="absolute left-8 top-12 z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Our <span className="text-[#1a79f6]">Projects</span>
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#1a79f6] to-blue-700 mt-2 rounded-full" />
      </div>
    </section>
  );
};

export default ScrollProjects;
