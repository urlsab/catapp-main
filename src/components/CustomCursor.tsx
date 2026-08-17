import React, { useEffect, useState } from 'react';
import '../styles/cursor.css';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input[type="submit"], input[type="button"]')) {
        setIsHovering(true);
      } else if (target.matches('input[type="text"], input[type="email"], textarea, [contenteditable]')) {
        setIsText(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input[type="submit"], input[type="button"]')) {
        setIsHovering(false);
      } else if (target.matches('input[type="text"], input[type="email"], textarea, [contenteditable]')) {
        setIsText(false);
      }
    };

    // Loading state detection
    const handleLoadingStart = () => setIsLoading(true);
    const handleLoadingEnd = () => setIsLoading(false);

    // Event listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    
    // Navigation loading states
    window.addEventListener('beforeunload', handleLoadingStart);
    window.addEventListener('load', handleLoadingEnd);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('beforeunload', handleLoadingStart);
      window.removeEventListener('load', handleLoadingEnd);
    };
  }, []);

  // Don't render on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''} ${isText ? 'text' : ''} ${isLoading ? 'loading' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;