import React from 'react';
import logo from '../../Assets/catapp logo no bg.png';
import { Link, useLocation } from 'react-router-dom';
// import { useLanguage } from '../contexts/LanguageContext';
// import { useTheme } from '../contexts/ThemeContext';
import { Menu, X, Home, DollarSign, Briefcase, Users, Phone, Star, Sparkles, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  // const { t } = useLanguage();
  // const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    if (isMenuOpen) {
      setShouldRender(true);
    }
  }, [isMenuOpen]);

  // Scroll progress tracking
  React.useEffect(() => {
    const snapSelector = '.home-snap-container, .pricing-snap-container, .testimonials-snap-container, .contact-snap-container';

    const handleScroll = () => {
      // Try any snap container first, then fall back to window scroll
      const snapContainer = document.querySelector(snapSelector) as HTMLElement | null;
      if (snapContainer) {
        const totalHeight = snapContainer.scrollHeight - snapContainer.clientHeight;
        const progress = totalHeight > 0 ? (snapContainer.scrollTop / totalHeight) * 100 : 0;
        setScrollProgress(Math.min(progress, 100));
      } else {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Also listen to snap container scroll events
    const snapContainer = document.querySelector(snapSelector);
    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll);
    }

    // Re-check for snap container after DOM updates
    const timer = setTimeout(() => {
      const sc = document.querySelector(snapSelector);
      if (sc) {
        sc.addEventListener('scroll', handleScroll);
        // Trigger initial calculation
        handleScroll();
      }
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const sc = document.querySelector(snapSelector);
      if (sc) sc.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
        setShouldRender(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black/30 backdrop-blur-sm z-50 border-b border-gray-700/50 fade-in"
    style={{
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2))'
    }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center fade-in">
            <div className="relative overflow-hidden rounded-full">
              <img 
                src={logo} 
                alt="Catapp Logo" 
                className="h-10 w-auto rounded-full relative z-10"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse fade-in">
            <Link
              to="/"
              className={`relative px-2 py-1 font-medium transition-colors duration-200 ${isActive('/') ? 'text-[#1a79f6]' : 'text-white hover:text-[#1a79f6]'} group`}
            >
              בית
              <span
                className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#1a79f6] rounded transition-all duration-300 ${isActive('/') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
              />
            </Link>
            <Link
              to="/about-full"
              className={`relative px-2 py-1 font-medium transition-colors duration-200 ${isActive('/about-full') ? 'text-[#1a79f6]' : 'text-white hover:text-[#1a79f6]'} group`}
            >
              אודות
              <span
                className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#1a79f6] rounded transition-all duration-300 ${isActive('/about-full') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
              />
            </Link>

            <Link
              to="/portfolio"
              className={`relative px-2 py-1 font-medium transition-colors duration-200 ${isActive('/portfolio') ? 'text-[#1a79f6]' : 'text-white hover:text-[#1a79f6]'} group`}
            >
              פרוייקטים
              <span
                className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#1a79f6] rounded transition-all duration-300 ${isActive('/portfolio') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
              />
            </Link>
            <Link
              to="/pricing"
              className={`relative px-2 py-1 font-medium transition-colors duration-200 ${isActive('/pricing') ? 'text-[#1a79f6]' : 'text-white hover:text-[#1a79f6]'} group`}
            >
              מחירון
              <span
                className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#1a79f6] rounded transition-all duration-300 ${isActive('/pricing') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
              />
            </Link>
            <Link
              to="/testimonials"
              className={`relative px-2 py-1 font-medium transition-colors duration-200 ${isActive('/testimonials') ? 'text-[#1a79f6]' : 'text-white hover:text-[#1a79f6]'} group`}
            >
              המלצות
              <span
                className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#1a79f6] rounded transition-all duration-300 ${isActive('/testimonials') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
              />
            </Link>
              <Link
                to="/articles"
                className={`relative px-2 py-1 font-medium transition-colors duration-200 ${isActive('/articles') ? 'text-[#1a79f6]' : 'text-white hover:text-[#1a79f6]'} group`}
              >
                מאמרים
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#1a79f6] rounded transition-all duration-300 ${isActive('/articles') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                />
              </Link>

            <Link
              to="/contact"
              className={`relative px-2 py-1 font-medium transition-colors duration-200 ${isActive('/contact') ? 'text-[#1a79f6]' : 'text-white hover:text-[#1a79f6]'} group`}
            >
              פרטי קשר
              <span
                className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#1a79f6] rounded transition-all duration-300 ${isActive('/contact') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
              />
            </Link>
            <Link
              to="/ask-ai"
              className={`relative px-2 py-1 font-medium transition-colors duration-200 ${isActive('/ask-ai') ? 'text-[#1a79f6]' : 'text-white hover:text-[#1a79f6]'} group`}
            >
              שאל AI
              <span
                className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-[#1a79f6] rounded transition-all duration-300 ${isActive('/ask-ai') ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
              />
            </Link>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse fade-in">
            {/* <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-[#1a79f6] transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button> */}
            {/* Mobile menu button */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-[#1a79f6]"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {shouldRender && (
          <div className={`md:hidden ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/"
                onClick={handleMenuToggle}
                className={`flex items-center gap-3 px-3 py-2 transition-colors ${isClosing ? '' : 'animate-menuItemIn'} ${isActive('/') ? 'text-[#1a79f6]' : 'text-gray-700 dark:text-gray-300 hover:text-[#1a79f6]'}`}
                style={{ animationDelay: isClosing ? '0s' : '0.05s' }}
              >
                <Home size={18} />
                בית
              </Link>
              <Link 
                to="/about-full"
                onClick={handleMenuToggle}
                className={`flex items-center gap-3 px-3 py-2 transition-colors ${isClosing ? '' : 'animate-menuItemIn'} ${isActive('/about-full') ? 'text-[#1a79f6]' : 'text-gray-700 dark:text-gray-300 hover:text-[#1a79f6]'}`}
                style={{ animationDelay: isClosing ? '0s' : '0.1s' }}
              >
                <Users size={18} />
                אודות
              </Link>

              <Link 
                to="/portfolio"
                onClick={handleMenuToggle}
                className={`flex items-center gap-3 px-3 py-2 transition-colors ${isClosing ? '' : 'animate-menuItemIn'} ${isActive('/portfolio') ? 'text-[#1a79f6]' : 'text-gray-700 dark:text-gray-300 hover:text-[#1a79f6]'}`}
                style={{ animationDelay: isClosing ? '0s' : '0.2s' }}
              >
                <Briefcase size={18} />
                פרוייקטים
              </Link>
              <Link 
                to="/pricing"
                onClick={handleMenuToggle}
                className={`flex items-center gap-3 px-3 py-2 transition-colors ${isClosing ? '' : 'animate-menuItemIn'} ${isActive('/pricing') ? 'text-[#1a79f6]' : 'text-gray-700 dark:text-gray-300 hover:text-[#1a79f6]'}`}
                style={{ animationDelay: isClosing ? '0s' : '0.25s' }}
              >
                <DollarSign size={18} />
                מחירון
              </Link>
              <Link 
                to="/testimonials"
                onClick={handleMenuToggle}
                className={`flex items-center gap-3 px-3 py-2 transition-colors ${isClosing ? '' : 'animate-menuItemIn'} ${isActive('/testimonials') ? 'text-[#1a79f6]' : 'text-gray-700 dark:text-gray-300 hover:text-[#1a79f6]'}`}
                style={{ animationDelay: isClosing ? '0s' : '0.275s' }}
              >
                <Star size={18} />
                המלצות
              </Link>
                <Link 
                  to="/articles"
                  onClick={handleMenuToggle}
                  className={`flex items-center gap-3 px-3 py-2 transition-colors ${isClosing ? '' : 'animate-menuItemIn'} ${isActive('/articles') ? 'text-[#1a79f6]' : 'text-gray-700 dark:text-gray-300 hover:text-[#1a79f6]'}`}
                  style={{ animationDelay: isClosing ? '0s' : '0.3s' }}
                >
                  <BookOpen size={18} />
                  מאמרים
                </Link>

              <Link 
                to="/contact"
                onClick={handleMenuToggle}
                className={`flex items-center gap-3 px-3 py-2 transition-colors ${isClosing ? '' : 'animate-menuItemIn'} ${isActive('/contact') ? 'text-[#1a79f6]' : 'text-gray-700 dark:text-gray-300 hover:text-[#1a79f6]'}`}
                style={{ animationDelay: isClosing ? '0s' : '0.35s' }}
              >
                <Phone size={18} />
                פרטי קשר
              </Link>
              <Link 
                to="/ask-ai"
                onClick={handleMenuToggle}
                className={`flex items-center gap-3 px-3 py-2 transition-colors ${isClosing ? '' : 'animate-menuItemIn'} ${isActive('/ask-ai') ? 'text-[#1a79f6]' : 'text-gray-700 dark:text-gray-300 hover:text-[#1a79f6]'}`}
                style={{ animationDelay: isClosing ? '0s' : '0.4s' }}
              >
                <Sparkles size={18} />
                שאל AI
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800/50">
        <div 
          className="h-full bg-[#1a79f6] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};

export default Header;