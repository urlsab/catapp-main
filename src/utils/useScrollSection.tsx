import { useRef, useEffect, useState } from 'react';

/**
 * useScrollSection
 * Hook for scroll-driven animation and parallax for full-screen sections.
 * Returns: ref, scrollProgress (0-1), isVisible
 */
export function useScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleScroll = () => {
      const rect = node.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Section is visible if any part is in viewport
      const visible = rect.top < windowH && rect.bottom > 0;
      setIsVisible(visible);
      // Progress: 0 when top enters, 1 when bottom leaves
      const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (rect.height + windowH)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return { ref, scrollProgress, isVisible };
}
