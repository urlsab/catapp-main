import { useEffect } from 'react';

export function useScrollToTop(canScrollToTop: boolean) {
  useEffect(() => {
    // Scroll to top only when canScrollToTop flag is true (spinner is completely gone)
    if (canScrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [canScrollToTop]); // Only depend on the flag
}