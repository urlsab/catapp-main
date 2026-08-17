import { useEffect } from 'react';

/**
 * SmoothScroll Component
 * Provides smooth scrolling with fixed pixel increments for any page
 * Works on desktop (mouse wheel, arrow keys) and mobile (touch gestures)
 */
const SmoothScroll: React.FC = () => {
  useEffect(() => {
    let isScrolling = false;
    
    // Shared scroll function for both wheel and keyboard
    const performScroll = (direction: number) => {
      if (isScrolling) return; // Prevent multiple scroll actions
      
      isScrolling = true;
      
      // Responsive scroll step - adapts to screen size
      const viewportHeight = window.innerHeight;
      const scrollStep = Math.max(400, viewportHeight * 0.6); // Minimum 400px, or 60% of viewport
      
      const currentScrollY = window.scrollY;
      const newScrollY = Math.max(0, currentScrollY + (scrollStep * direction));
      
      // Smooth scroll with callback
      window.scrollTo({
        top: newScrollY,
        behavior: 'smooth'
      });
      
      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrolling = false;
      }, 800); // 800ms matches typical smooth scroll duration
    };
    
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      performScroll(direction);
    };

    // Handle keyboard arrow keys (Up/Down)
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if arrow up or arrow down is pressed
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent default browser scroll behavior
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        performScroll(direction);
      }
      
      // Also handle Page Up / Page Down with the same behavior
      if (event.key === 'PageDown' || event.key === 'PageUp') {
        event.preventDefault();
        const direction = event.key === 'PageDown' ? 1 : -1;
        performScroll(direction);
      }
      
      // Handle Space bar (scroll down) and Shift+Space (scroll up)
      if (event.key === ' ') {
        event.preventDefault();
        const direction = event.shiftKey ? -1 : 1;
        performScroll(direction);
      }
    };

    // Handle touch scrolling for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };
    
    const handleTouchEnd = (event: TouchEvent) => {
      touchEndY = event.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) > 50) { // Minimum swipe distance
        const direction = deltaY > 0 ? 1 : -1;
        performScroll(direction);
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmoothScroll;
