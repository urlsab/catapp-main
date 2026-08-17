import React, { useRef, useEffect, useState } from 'react';
// import Values from '../components/Values';
// import KnowledgeHub from '../components/KnowledgeHub';
// import logo from '../../Assets/Catapp logo no bg.png';
import benjiLogo from '../../Assets/benjilogo1-no bg.png';
import maakafLogo from '../../Assets/hebrew_horizontal_dark.png';
import mosheLogo from '../../Assets/moshelogo.png';
import officeLogo from '../../Assets/office logo.webp';
import codersClanLogo from '../../Assets/coders_clan_logo-removebg-preview.png';
import amiBirdLogo from '../../Assets/logo_ami-removebg-preview.png';
import meiravLogo from '../../Assets/logo-meirav.png';

import logoCenter from '../../Assets/logoiCatapp.png';
import Footer from '../components/Footer';
import '../styles/scroll.css';
import '../styles/homeSnap.css';
// import SmoothScroll from '../components/SmoothScroll';
import { Zap, TrendingUp, Shield, DollarSign, Scale, FileText, Briefcase, Eye, Clock, Palette, Star, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import GroupsIcon from '@mui/icons-material/Groups';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { FaReact, FaNodeJs, FaGithub, FaGitAlt, FaSass, FaBolt } from 'react-icons/fa';
import { SiMongodb, SiMui, SiTypescript, SiJavascript, SiVite, SiExpress, SiVercel, SiTailwindcss, SiFirebase, SiGodaddy, SiHeroku, SiStyledcomponents, SiGooglegemini, SiGooglecloud } from 'react-icons/si';
import { BsBootstrapFill } from "react-icons/bs";
import codeServiceImage from '../../Assets/code service.jpg';
import refaelResponsiveImage from '../../Assets/refael website responsive no bg.png';



const HomePage: React.FC = () => {
  const typingTexts = [
    'בניית אתרים לעסקים',
    'פיתוח אפליקציות',
    'אתרים לעורכי דין',
    'אתרים לבעלי עסקים',
    'פיתוח תוכנה מותאם אישית',
    'דפי נחיתה ממוקדים',
    'אתרי תדמית מקצועיים',
    'בניית אפליקציות',
    'הטמעת AI לאתרים'
  ];
  const [currentText, setCurrentText] = React.useState('');
  const [textIdx, setTextIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [headlineVisible, setHeadlineVisible] = React.useState(false);
  const [typingStarted, setTypingStarted] = React.useState(false);
  const [heroStatsVisible, setHeroStatsVisible] = React.useState([false, false, false]);
  const [currentRecommendation, setCurrentRecommendation] = React.useState(0);
  // Removed showBlinkingCursor state (cursor always blinks)
  // For sequential image animation
  const [heroImagesVisible, setHeroImagesVisible] = React.useState([false, false, false, false]);
  const valuesAnimated = true; // Set to true since observer is disabled
  const valuesRef = React.useRef<HTMLDivElement>(null);
  const heroImagesRef = React.useRef<HTMLDivElement>(null);
  
  // New refs for fade animations
  const serviceImage1Ref = React.useRef<HTMLDivElement>(null);
  const techOrbitRef = React.useRef<HTMLDivElement>(null);
  const recommendationsRef = React.useRef<HTMLDivElement>(null);
  const valuesContainerRef = React.useRef<HTMLDivElement>(null);
  const happyClientsRef = React.useRef<HTMLDivElement>(null);
  const servicesHeaderRef = React.useRef<HTMLDivElement>(null);
  const valuesHeaderRef = React.useRef<HTMLDivElement>(null);
  const recommendationsHeaderRef = React.useRef<HTMLDivElement>(null);
  const aboutBtnRef = React.useRef<HTMLDivElement>(null);
  const testimonialsBtnRef = React.useRef<HTMLDivElement>(null);
  const heroTextMobileRef = React.useRef<HTMLDivElement>(null);
  const heroImagesMobileRef = React.useRef<HTMLDivElement>(null);
  const heroStatsDesktopRef = React.useRef<HTMLDivElement>(null);
  const seoContentRef = React.useRef<HTMLDivElement>(null);
  
  const [serviceImage1Visible, setServiceImage1Visible] = React.useState(false);
  const [techOrbitVisible, setTechOrbitVisible] = React.useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = React.useState(false);
  const [valuesContainerVisible, setValuesContainerVisible] = React.useState(false);
  const [happyClientsVisible, setHappyClientsVisible] = React.useState(false);
  const [servicesHeaderVisible, setServicesHeaderVisible] = React.useState(false);
  const [valuesHeaderVisible, setValuesHeaderVisible] = React.useState(false);
  const [recommendationsHeaderVisible, setRecommendationsHeaderVisible] = React.useState(false);
  const [aboutBtnVisible, setAboutBtnVisible] = React.useState(false);
  const [testimonialsBtnVisible, setTestimonialsBtnVisible] = React.useState(false);
  const [heroTextMobileVisible, setHeroTextMobileVisible] = React.useState(false);
  const [heroImagesMobileVisible, setHeroImagesMobileVisible] = React.useState(false);
  const [heroStatsDesktopVisible, setHeroStatsDesktopVisible] = React.useState(false);
  const [seoContentVisible, setSeoContentVisible] = React.useState(false);
  const snapContainerRef = React.useRef<HTMLDivElement>(null);

  // Hide body scroll and global footer when snap container is active
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Hide the global footer in App.tsx so it doesn't bleed through
    const globalFooter = document.querySelector('.min-h-screen > footer') as HTMLElement;
    if (globalFooter) globalFooter.style.display = 'none';
    return () => {
      document.body.style.overflow = '';
      if (globalFooter) globalFooter.style.display = '';
    };
  }, []);

  // Stats data
  // const targetStats = { years: 5, clients: 50, tools: 20, growth: 214 };


  // 1. Headline fade-in after spinner
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHeadlineVisible(true);
    }, 1100); // after spinner
    return () => clearTimeout(timer);
  }, []);

  // 2. Typing animation after headline
  React.useEffect(() => {
    if (!headlineVisible) return;
    const timer = setTimeout(() => {
      setTypingStarted(true);
    }, 600); // after headline fade-in
    return () => clearTimeout(timer);
  }, [headlineVisible]);


  // 3. Stats fade-in after typing animation
  React.useEffect(() => {
    if (!typingStarted) return;
    const timer = setTimeout(() => {
      setHeroStatsVisible([true, false, false]);
      setTimeout(() => setHeroStatsVisible([true, true, false]), 350);
      setTimeout(() => setHeroStatsVisible([true, true, true]), 700);
    }, 800); // after typing animation appears
    return () => clearTimeout(timer);
  }, [typingStarted]);

  // 4. Animate hero images sequentially after headline appears
  React.useEffect(() => {
    if (!headlineVisible) return;
    const timers: number[] = [];
    const initialDelay = 500; // ms after headline appears
    timers.push(window.setTimeout(() => setHeroImagesVisible([true, false, false, false]), initialDelay));
    timers.push(window.setTimeout(() => setHeroImagesVisible([true, true, false, false]), initialDelay + 500));
    timers.push(window.setTimeout(() => setHeroImagesVisible([true, true, true, false]), initialDelay + 800));
    timers.push(window.setTimeout(() => setHeroImagesVisible([true, true, true, true]), initialDelay + 1100));
    return () => timers.forEach(t => clearTimeout(t));
  }, [headlineVisible]);


  // Animate stats numbers (if you want to trigger this, use heroStatsVisible or another trigger)
  // React.useEffect(() => {
  //   if (!heroStatsVisible[0]) return;
  //   ...
  // }, [heroStatsVisible]);



  // Typing animation effect (cursor always blinks)
  React.useEffect(() => {
    if (!typingStarted) return;
    let typingTimeout: ReturnType<typeof setTimeout>;
    const fullText = typingTexts[textIdx];
    if (!isDeleting && charIdx < fullText.length) {
      typingTimeout = setTimeout(() => {
        setCurrentText(fullText.substring(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 100);
    } else if (isDeleting && charIdx > 0) {
      typingTimeout = setTimeout(() => {
        setCurrentText(fullText.substring(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 50);
    } else if (!isDeleting && charIdx === fullText.length) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && charIdx === 0) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(false);
        setTextIdx((textIdx + 1) % typingTexts.length);
      }, 500);
    }
    return () => clearTimeout(typingTimeout);
  }, [charIdx, isDeleting, textIdx, typingStarted]);

  // Recommendations carousel effect
  React.useEffect(() => {
    const recommendationsCount = 4; // Total number of recommendations
    const interval = setInterval(() => {
      setCurrentRecommendation((prev) => (prev + 1) % recommendationsCount);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for service descriptions
  React.useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === serviceImage1Ref.current) {
            setServiceImage1Visible(entry.isIntersecting);
          }
          if (entry.target === techOrbitRef.current) {
            setTechOrbitVisible(entry.isIntersecting);
          }
          if (entry.target === recommendationsRef.current) {
            setRecommendationsVisible(entry.isIntersecting);
          }
          if (entry.target === valuesContainerRef.current) {
            setValuesContainerVisible(entry.isIntersecting);
          }
          if (entry.target === happyClientsRef.current) {
            setHappyClientsVisible(entry.isIntersecting);
          }
          if (entry.target === servicesHeaderRef.current) {
            setServicesHeaderVisible(entry.isIntersecting);
          }
          if (entry.target === valuesHeaderRef.current) {
            setValuesHeaderVisible(entry.isIntersecting);
          }
          if (entry.target === recommendationsHeaderRef.current) {
            setRecommendationsHeaderVisible(entry.isIntersecting);
          }
          if (entry.target === aboutBtnRef.current) {
            setAboutBtnVisible(entry.isIntersecting);
          }
          if (entry.target === testimonialsBtnRef.current) {
            setTestimonialsBtnVisible(entry.isIntersecting);
          }
          if (entry.target === heroTextMobileRef.current) {
            setHeroTextMobileVisible(entry.isIntersecting);
          }
          if (entry.target === heroImagesMobileRef.current) {
            setHeroImagesMobileVisible(entry.isIntersecting);
          }
          if (entry.target === heroStatsDesktopRef.current) {
            setHeroStatsDesktopVisible(entry.isIntersecting);
          }
          if (entry.target === seoContentRef.current) {
            setSeoContentVisible(entry.isIntersecting);
          }
        });
      },
      {
        root: container,
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (serviceImage1Ref.current) observer.observe(serviceImage1Ref.current);
    if (techOrbitRef.current) observer.observe(techOrbitRef.current);
    if (recommendationsRef.current) observer.observe(recommendationsRef.current);
    if (valuesContainerRef.current) observer.observe(valuesContainerRef.current);
    if (happyClientsRef.current) observer.observe(happyClientsRef.current);
    if (servicesHeaderRef.current) observer.observe(servicesHeaderRef.current);
    if (valuesHeaderRef.current) observer.observe(valuesHeaderRef.current);
    if (recommendationsHeaderRef.current) observer.observe(recommendationsHeaderRef.current);
    if (aboutBtnRef.current) observer.observe(aboutBtnRef.current);
    if (testimonialsBtnRef.current) observer.observe(testimonialsBtnRef.current);
    if (heroTextMobileRef.current) observer.observe(heroTextMobileRef.current);
    if (heroImagesMobileRef.current) observer.observe(heroImagesMobileRef.current);
    if (heroStatsDesktopRef.current) observer.observe(heroStatsDesktopRef.current);
    if (seoContentRef.current) observer.observe(seoContentRef.current);

    return () => {
      if (serviceImage1Ref.current) observer.unobserve(serviceImage1Ref.current);
      if (techOrbitRef.current) observer.unobserve(techOrbitRef.current);
      if (recommendationsRef.current) observer.unobserve(recommendationsRef.current);
      if (valuesContainerRef.current) observer.unobserve(valuesContainerRef.current);
      if (happyClientsRef.current) observer.unobserve(happyClientsRef.current);
      if (servicesHeaderRef.current) observer.unobserve(servicesHeaderRef.current);
      if (valuesHeaderRef.current) observer.unobserve(valuesHeaderRef.current);
      if (recommendationsHeaderRef.current) observer.unobserve(recommendationsHeaderRef.current);
      if (aboutBtnRef.current) observer.unobserve(aboutBtnRef.current);
      if (testimonialsBtnRef.current) observer.unobserve(testimonialsBtnRef.current);
      if (heroTextMobileRef.current) observer.unobserve(heroTextMobileRef.current);
      if (heroImagesMobileRef.current) observer.unobserve(heroImagesMobileRef.current);
      if (heroStatsDesktopRef.current) observer.unobserve(heroStatsDesktopRef.current);
      if (seoContentRef.current) observer.unobserve(seoContentRef.current);
    };
  }, []);

  // Intersection Observer for Values section animation
  // React.useEffect(() => {
  //   const valuesSection = valuesRef.current;
  //   if (!valuesSection) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting && !valuesAnimated) {
  //           setValuesAnimated(true);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.1,
  //       rootMargin: '0px'
  //     }
  //   );

  //   observer.observe(valuesSection);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [valuesAnimated]);

  return (
    <div className="home-snap-container" ref={snapContainerRef}>

      {/* ===== SECTION 1: Hero - Desktop (headline + images) ===== */}
      <section className="home-snap-section snap-hero snap-hero-desktop-only">
      <div className="w-full flex justify-center items-center relative flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-1 sm:py-2 md:py-3 w-full h-full">
          <div className="grid grid-cols-2 gap-6 items-center h-full">
            
            {/* Left Side - Headline only */}
            <div className="text-right flex flex-col justify-center">
              <h1
                className={`text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-700 ease-out ${headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
              >
                בניית אתרים ופיתוח תוכנה
                <br />
                <span className="text-[#1a79f6]">לעסקים ובעלי מקצוע</span>
              </h1>
            </div>

            {/* Right Side - Screenshots Grid */}
            <div className="relative flex justify-center" ref={heroImagesRef}>
                <div 
                  className={`relative rounded-3xl overflow-visible transition-all duration-700 ease-out hover:scale-105 h-fit max-w-2xl mx-auto ${
                    heroImagesVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    filter: 'drop-shadow(0 20px 40px rgba(26, 121, 246, 0.4))'
                  }}
                >
                  <img 
                    src={refaelResponsiveImage} 
                    alt="אתר רספונסיבי" 
                    className="w-full h-auto block max-h-[75vh] object-contain"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* ===== SECTION 1.5: Typing + Stats - Desktop only ===== */}
      <section className="home-snap-section snap-hero snap-hero-desktop-only">
        <div className="w-full flex justify-center items-center relative flex-1">
          <div ref={heroStatsDesktopRef} className="max-w-4xl mx-auto px-3 lg:px-6 w-full flex flex-col justify-center items-center">
            <div className={`w-full transition-all duration-1000 ${
              heroStatsDesktopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>

              {/* Typing Animation - large */}
              <div className="mb-8 w-full min-h-[4rem] flex justify-center" dir="rtl">
                <h2
                  className={`text-3xl lg:text-4xl xl:text-5xl font-bold text-white inline-flex items-center transition-all duration-800 transform ${
                    typingStarted ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="leading-tight whitespace-nowrap">{currentText || '\u00A0'}</span>
                  {typingStarted && (
                    <span
                      className="inline-block bg-[#1a79f6] align-middle animate-blink"
                      style={{
                        width: '4px',
                        height: '1.4em',
                        borderRadius: '2px',
                        marginRight: '4px',
                      }}
                    />
                  )}
                </h2>
              </div>

              {/* Stats Row - larger */}
              <div className="flex flex-nowrap gap-6 md:gap-10 lg:gap-14 justify-center items-start">
                <div
                  className={`text-center flex-shrink-0 transition-all duration-700 ease-out ${heroStatsVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                >
                  <div className="flex justify-center mb-2">
                    <WorkHistoryIcon style={{ color: '#1a79f6', fontSize: '2.75rem' }} />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">+5</div>
                  <p className="text-gray-400 text-sm md:text-base lg:text-lg mt-1 whitespace-nowrap">שנות ניסיון</p>
                </div>
                <div
                  className={`text-center flex-shrink-0 transition-all duration-700 ease-out ${heroStatsVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                  style={{ transitionDelay: heroStatsVisible[1] ? '200ms' : '0ms' }}
                >
                  <div className="flex justify-center mb-2">
                    <GroupsIcon style={{ color: '#1a79f6', fontSize: '2.75rem' }} />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">+50</div>
                  <p className="text-gray-400 text-sm md:text-base lg:text-lg mt-1 whitespace-nowrap">לקוחות מרוצים</p>
                </div>
                <div
                  className={`text-center flex-shrink-0 transition-all duration-700 ease-out ${heroStatsVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                  style={{ transitionDelay: heroStatsVisible[2] ? '400ms' : '0ms' }}
                >
                  <div className="flex justify-center mb-2">
                    <IntegrationInstructionsIcon style={{ color: '#1a79f6', fontSize: '2.75rem' }} />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"><span dir="ltr">20+</span></div>
                  <p className="text-gray-400 text-sm md:text-base lg:text-lg mt-1 whitespace-nowrap">טכנולוגיות בשימוש</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1a: Hero Headline + Images - Mobile/Portrait only ===== */}
      <section className="home-snap-section snap-hero snap-hero-mobile-only">
        <div className="w-full flex justify-center items-center relative flex-1">
          <div ref={heroTextMobileRef} className="max-w-2xl mx-auto px-4 w-full flex flex-col justify-center items-center">
            <div className={`w-full transition-all duration-1000 ${
              heroTextMobileVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>

              {/* Main Headline */}
              <h1
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight text-center"
              >
                בניית אתרים ופיתוח תוכנה
                <br />
                <span className="text-[#1a79f6]">לעסקים ובעלי מקצוע</span>
              </h1>

              {/* Hero Image */}
              <div className="flex justify-center w-full max-w-xl mx-auto">
                <div 
                  className="relative rounded-3xl overflow-visible h-fit mx-auto"
                  style={{ 
                    filter: 'drop-shadow(0 20px 40px rgba(26, 121, 246, 0.4))'
                  }}
                >
                  <img 
                    src={refaelResponsiveImage} 
                    alt="אתר רספונסיבי" 
                    className="w-full h-auto block max-h-[65vh] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1b: Typing + Stats - Mobile/Portrait only ===== */}
      <section className="home-snap-section snap-hero snap-hero-mobile-only">
        <div className="w-full flex justify-center items-center relative flex-1">
          <div ref={heroImagesMobileRef} className="max-w-2xl mx-auto px-4 w-full flex flex-col justify-center items-center">
            <div className={`w-full transition-all duration-1000 ${
              heroImagesMobileVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>

              {/* Typing Animation - larger for mobile */}
              <div className="mb-6 sm:mb-10 w-full min-h-[2.5rem] sm:min-h-[3rem] flex justify-center" dir="rtl">
                <h2
                  className={`text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white inline-flex items-center transition-all duration-800 transform ${
                    typingStarted ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="leading-tight whitespace-nowrap">{currentText || '\u00A0'}</span>
                  {typingStarted && (
                    <span
                      className="inline-block bg-[#1a79f6] align-middle animate-blink"
                      style={{
                        width: '3px',
                        height: '1.4em',
                        borderRadius: '2px',
                        marginRight: '2px',
                      }}
                    />
                  )}
                </h2>
              </div>

              {/* Stats Row - larger */}
              <div className="flex flex-nowrap gap-4 xs:gap-6 sm:gap-12 justify-center items-start">
                <div className={`text-center flex-shrink-0 transition-all duration-700 ease-out ${heroStatsVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                  <div className="flex justify-center mb-1.5">
                    <WorkHistoryIcon style={{ color: '#1a79f6', fontSize: 'clamp(1.75rem, 7vw, 2.75rem)' }} />
                  </div>
                  <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white">+5</div>
                  <p className="text-gray-400 text-xs xs:text-sm sm:text-base mt-0.5 whitespace-nowrap">שנות ניסיון</p>
                </div>
                <div
                  className={`text-center flex-shrink-0 transition-all duration-700 ease-out ${heroStatsVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                  style={{ transitionDelay: heroStatsVisible[1] ? '200ms' : '0ms' }}
                >
                  <div className="flex justify-center mb-1.5">
                    <GroupsIcon style={{ color: '#1a79f6', fontSize: 'clamp(1.75rem, 7vw, 2.75rem)' }} />
                  </div>
                  <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white">+50</div>
                  <p className="text-gray-400 text-xs xs:text-sm sm:text-base mt-0.5 whitespace-nowrap">לקוחות מרוצים</p>
                </div>
                <div
                  className={`text-center flex-shrink-0 transition-all duration-700 ease-out ${heroStatsVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                  style={{ transitionDelay: heroStatsVisible[2] ? '400ms' : '0ms' }}
                >
                  <div className="flex justify-center mb-1.5">
                    <IntegrationInstructionsIcon style={{ color: '#1a79f6', fontSize: 'clamp(1.75rem, 7vw, 2.75rem)' }} />
                  </div>
                  <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white"><span dir="ltr">20+</span></div>
                  <p className="text-gray-400 text-xs xs:text-sm sm:text-base mt-0.5 whitespace-nowrap">טכנולוגיות בשימוש</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: Services - Websites + Tech Orbit ===== */}
      <section className="home-snap-section snap-compact">
        <div className="w-full flex justify-center items-center bg-transparent relative flex-1">
          <div className="max-w-5xl w-full flex flex-col items-center px-2 justify-center">
                <div ref={servicesHeaderRef}>
                  <h2 className={`text-3xl sm:text-3xl md:text-4xl font-bold text-[#1a79f6] mb-2 text-center tracking-tight transition-all duration-1000 ${
                    servicesHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}>שירותי בניית אתרים ופיתוח תוכנה</h2>
                </div>
                {/* שורה 1: פיתוח אתרים + עיגולים מסתובבים */}
                <div className="flex flex-col md:flex-row w-full items-center justify-between gap-3 md:gap-6 mb-2">
                  <div 
                    ref={serviceImage1Ref}
                    className={`flex-1 flex flex-col items-end text-right transition-all duration-1000 ${
                      serviceImage1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                  >
                    <div className="relative w-full max-w-[340px] h-[160px] sm:h-[200px] md:h-[280px] mb-2 sm:mb-4 border-2 border-[#1a79f6] rounded-2xl">
                      <img src={codeServiceImage} alt="פיתוח אתרים" className="w-full h-full object-cover rounded-2xl shadow-lg" />
                      <div className="absolute inset-0 w-full h-full rounded-2xl bg-black/50"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl sm:text-3xl md:text-5xl font-bold text-center drop-shadow-lg z-10 w-full px-4 leading-tight">
                        בניית אתרים
                        <br />
                        ופיתוח אתרים
                      </div>
                    </div>
                    {/* כפתורים */}
                    <div className="flex gap-3 w-full max-w-[340px] justify-center">
                      <Link
                        to="/portfolio"
                        className="flex-1 bg-[#1a79f6] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-center text-sm md:text-base"
                      >
                        לפרוייקטים
                      </Link>
                      <Link
                        to="/pricing"
                        className="flex-1 bg-white hover:bg-gray-100 text-[#1a79f6] px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-center text-sm md:text-base"
                      >
                        למחירון
                      </Link>
                    </div>
                  </div>
                  <div 
                    ref={techOrbitRef}
                    className={`flex-1 flex items-center justify-center px-2 md:px-4 transition-all duration-1000 ${
                      techOrbitVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                  >
                    {/* אנימציית אייקונים מסתובבים */}
                    <div className="relative w-full min-h-[200px] sm:min-h-[320px] md:min-h-[400px] flex items-center justify-center">
                      {/* Circular orbit container */}
                      <div className="tech-orbit">
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 0 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#61DAFB]/20 hover:scale-125">
                            <FaReact className="text-xs xs:text-base sm:text-xl md:text-2xl text-[#61DAFB]" />
                          </div>
                          <p className="tech-label">React</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 1 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#3178C6]/20 hover:scale-125">
                            <SiTypescript className="text-[10px] xs:text-sm sm:text-base md:text-xl text-[#3178C6]" />
                          </div>
                          <p className="tech-label">TypeScript</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 2 } as React.CSSProperties}>
                          <div className="tech-icon bg-yellow-500/20 hover:scale-125">
                            <SiJavascript className="text-[10px] xs:text-sm sm:text-base md:text-xl text-yellow-500" />
                          </div>
                          <p className="tech-label">JavaScript</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 3 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#646CFF]/20 hover:scale-125">
                            <SiVite className="text-[10px] xs:text-sm sm:text-base md:text-xl text-[#646CFF]" />
                          </div>
                          <p className="tech-label">Vite</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 4 } as React.CSSProperties}>
                          <div className="tech-icon bg-green-500/20 hover:scale-125">
                            <SiMongodb className="text-[10px] xs:text-sm sm:text-base md:text-xl text-green-500" />
                          </div>
                          <p className="tech-label">MongoDB</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 5 } as React.CSSProperties}>
                          <div className="tech-icon bg-blue-500/20 hover:scale-125">
                            <SiMui className="text-[10px] xs:text-sm sm:text-base md:text-xl text-blue-500" />
                          </div>
                          <p className="tech-label">MUI</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 6 } as React.CSSProperties}>
                          <div className="tech-icon bg-black border border-white hover:scale-125">
                            <SiVercel className="text-[10px] xs:text-sm sm:text-base md:text-xl text-white" />
                          </div>
                          <p className="tech-label">Vercel</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 7 } as React.CSSProperties}>
                          <div className="tech-icon bg-orange-600/20 hover:scale-125">
                            <FaNodeJs className="text-[10px] xs:text-sm sm:text-base md:text-xl text-orange-600" />
                          </div>
                          <p className="tech-label">Node.js</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 8 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#06B6D4]/20 hover:scale-125">
                            <SiTailwindcss className="text-[10px] xs:text-sm sm:text-base md:text-xl text-[#06B6D4]" />
                          </div>
                          <p className="tech-label">Tailwind CSS</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 9 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#FFCA28]/20 hover:scale-125">
                            <SiFirebase className="text-[10px] xs:text-sm sm:text-base md:text-xl text-[#FFCA28]" />
                          </div>
                          <p className="tech-label">Firebase</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 10 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#1BDBDB]/20 hover:scale-125">
                            <SiGodaddy className="text-[10px] xs:text-sm sm:text-base md:text-xl text-[#1BDBDB]" />
                          </div>
                          <p className="tech-label">GoDaddy</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 11 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#430098]/20 hover:scale-125">
                            <SiHeroku className="text-[10px] xs:text-sm sm:text-base md:text-xl text-[#430098]" />
                          </div>
                          <p className="tech-label">Heroku</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 12 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#181717]/20 border border-gray-700 hover:scale-125">
                            <FaGithub className="text-[10px] xs:text-sm sm:text-base md:text-xl text-white" />
                          </div>
                          <p className="tech-label">GitHub</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 13 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#F05032]/20 hover:scale-125">
                            <FaGitAlt className="text-[10px] xs:text-sm sm:text-base md:text-xl text-[#F05032]" />
                          </div>
                          <p className="tech-label">Git</p>
                        </div>
                        <div className="tech-icon-wrapper" style={{ '--icon-index': 14 } as React.CSSProperties}>
                          <div className="tech-icon bg-purple-500/20 hover:scale-125">
                            <span className="text-[10px] xs:text-sm sm:text-base md:text-xl font-bold text-purple-500">✨</span>
                          </div>
                          <p className="tech-label">AI</p>
                        </div>
                      </div>
                      
                      {/* Inner orbit for AI tools */}
                      <div className="tech-orbit-inner">
                        <div className="tech-icon-wrapper-inner" style={{ '--icon-index': 0 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#2563eb]/20 hover:scale-125">
                            <SiGooglecloud />
                          </div>
                          <p className="tech-label">GCP</p>
                        </div>
                        <div className="tech-icon-wrapper-inner" style={{ '--icon-index': 1 } as React.CSSProperties}>
                          <div className="tech-icon bg-yellow-400/20 hover:scale-125">
                            <FaBolt className="text-[8px] xs:text-xs sm:text-sm md:text-base text-yellow-400" />
                          </div>
                          <p className="tech-label">Bolt</p>
                        </div>
                        <div className="tech-icon-wrapper-inner" style={{ '--icon-index': 2 } as React.CSSProperties}>
                          <div className="tech-icon bg-white/10 border border-gray-500 hover:scale-125">
                            <BsBootstrapFill />
                          </div>
                          <p className="tech-label">Copilot</p>
                        </div>
                        <div className="tech-icon-wrapper-inner" style={{ '--icon-index': 3 } as React.CSSProperties}>
                          <div className="tech-icon bg-[#00CED1]/20 hover:scale-125">
                            <SiExpress />
                          </div>
                          <p className="tech-label">Cursor</p>
                        </div>
                        <div className="tech-icon-wrapper-inner" style={{ '--icon-index': 4 } as React.CSSProperties}>
                          <div className="tech-icon bg-blue-500/20 hover:scale-125">
                            <SiGooglegemini className="text-[8px] xs:text-xs sm:text-sm md:text-base text-blue-400" />
                          </div>
                          <p className="tech-label">GenAI</p>
                        </div>
                        <div className="tech-icon-wrapper-inner" style={{ '--icon-index': 5 } as React.CSSProperties}>
                          <div className="tech-icon bg-pink-900 hover:scale-125">
                            <SiStyledcomponents className="text-[32px] lg:text-lg sm:text-sm md:text-base text-yellow-200" />
                          </div>
                          <p className="tech-label">Styled</p>
                        </div>
                        <div className="tech-icon-wrapper-inner" style={{ '--icon-index': 6 } as React.CSSProperties}>
                          <div className="tech-icon bg-pink-500/20 hover:scale-125">
                            <FaSass className="text-[32px] lg:text-lg sm:text-sm md:text-base text-white" />
                          </div>
                          <p className="tech-label">SCSS</p>
                        </div>
                      </div>
                      
                      {/* Center Logo - Static */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <img 
                          src={logoCenter} 
                          alt="Catapp Logo" 
                          className="w-10 h-10 min-w-[40px] min-h-[40px] sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </section>


      {/* ===== SECTION 6: Process Steps ===== */}
      <section className="home-snap-section snap-compact">
      {(() => {
        // קו מתקדם בצבע כחול - אנימציה כשהסקשן נכנס לתצוגה
        const processRef = useRef<HTMLDivElement>(null);
        const [activeStep, setActiveStep] = useState(-1); // -1 = none, 0-5 = step index
        const isVisibleRef = useRef(false);
        const animTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

        useEffect(() => {
          const container = snapContainerRef.current;
          if (!container) return;
          
          const handleScroll = () => {
            if (!processRef.current) return;
            const rect = processRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            
            // When section is visible (snapped into view), start step-by-step animation
            if (rect.top >= -50 && rect.top <= windowH * 0.3) {
              if (!isVisibleRef.current) {
                isVisibleRef.current = true;
                // Animate step by step over ~3.5s (580ms per step)
                const totalSteps = 6;
                const delayPerStep = 580;
                animTimers.current.forEach(t => clearTimeout(t));
                animTimers.current = [];
                for (let i = 0; i < totalSteps; i++) {
                  const timer = setTimeout(() => setActiveStep(i), (i + 1) * delayPerStep);
                  animTimers.current.push(timer);
                }
              }
            } else if (rect.top > windowH) {
              isVisibleRef.current = false;
              setActiveStep(-1);
              animTimers.current.forEach(t => clearTimeout(t));
              animTimers.current = [];
            }
          };
          
          container.addEventListener('scroll', handleScroll);
          handleScroll();
          return () => {
            container.removeEventListener('scroll', handleScroll);
            animTimers.current.forEach(t => clearTimeout(t));
          };
        }, []);

        // Calculate progress as fraction (0 to 1) based on activeStep
        const progress = activeStep < 0 ? 0 : (activeStep + 1) / 6;

        return (
          <div 
            ref={processRef}
            className="w-full flex justify-center items-center relative px-2 sm:px-4 flex-1"
          >
            <div className="max-w-3xl w-full flex flex-col items-center">
              <h2 className="text-2xl sm:text-2xl md:text-[1.6rem] font-bold text-[#1a79f6] mb-2 md:mb-3 text-center">תהליך פיתוח אתר</h2>
              <div className="relative flex w-full">
                {/* Vertical line - לבן מלא בלבד (נגמר בדיוק בקו התחתון של המלבן האחרון) */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3 sm:w-3 md:w-3 bg-white rounded-full z-0" style={{ height: 'calc(100% - 30px)', minHeight: 0 }} />
                {/* קו כחול דק מעל הקו הלבן, מוצג רק לפי התקדמות הגלילה */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3 sm:w-3 md:w-3 pointer-events-none z-10" style={{ height: 'calc(100% - 30px)' }}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-2.5 sm:w-2.5 md:w-2.5 bg-gradient-to-b from-[#1a79f6] to-blue-400 rounded-full transition-all duration-[600ms] ease-out" style={{ height: `${progress * 100}%`, minHeight: 0, top: 0, opacity: progress > 0 ? 1 : 0 }} />
                </div>
                <div className="flex flex-col gap-2 md:gap-3 w-full z-20">
                  {/* שלבים */}
                  {[
                    {
                      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#1a79f6] bg-white rounded-full shadow-lg p-0.5 sm:p-1 md:p-1.5" />,
                      title: 'פנייה ראשונית',
                      desc: 'שיחה קצרה להיכרות והבנת הצורך.'
                    },
                    {
                      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#1a79f6] bg-white rounded-full shadow-lg p-0.5 sm:p-1 md:p-1.5" />,
                      title: 'אפיון האתר',
                      desc: 'מגדירים יחד מה האתר יכלול.'
                    },
                    {
                      icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#1a79f6] bg-white rounded-full shadow-lg p-0.5 sm:p-1 md:p-1.5" />,
                      title: 'איסוף חומרים',
                      desc: 'מקבלים חומרים ומעצבים דף בית.'
                    },
                    {
                      icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#1a79f6] bg-white rounded-full shadow-lg p-0.5 sm:p-1 md:p-1.5" />,
                      title: 'פיתוח האתר',
                      desc: 'הופכים את ההדמיה לאתר חי.'
                    },
                    {
                      icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#1a79f6] bg-white rounded-full shadow-lg p-0.5 sm:p-1 md:p-1.5" />,
                      title: 'בדיקות ותיקונים',
                      desc: 'בודקים ומוודאים שהאתר מושלם.'
                    },
                    {
                      icon: <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#1a79f6] bg-white rounded-full shadow-lg p-0.5 sm:p-1 md:p-1.5" />,
                      title: 'עלייה לאוויר',
                      desc: 'האתר באוויר – מזל טוב !!!'
                    },
                  ].map((step, idx) => {
                    // קובע האם המלבן מימין (זוגי) או משמאל (אי-זוגי)
                    const isRight = idx % 2 === 0;
                    // Calculate the progress for each step (icon)
                    const isActive = idx <= activeStep;
                    return (
                      <div key={idx} className="flex items-center w-full relative" style={{ minHeight: 'clamp(50px, 9vh, 58px)' }}>
                        {/* מלבן טקסט מימין */}
                        {isRight && (
                          <div className="flex-1 flex justify-end pr-2 sm:pr-3 mr-3 sm:mr-4 md:mr-6">
                            <div className="border-[#1a79f6] border-[1.5px] rounded-xl sm:rounded-2xl shadow-md text-right"
                              style={{ 
                                maxWidth: 'clamp(105px, 36vw, 230px)',
                                padding: 'clamp(0.25rem, 1.5vw, 0.6rem)'
                              }}>
                              <div className="font-bold text-[#1a79f6]" style={{ fontSize: 'clamp(0.65rem, 2.2vw, 0.8rem)', marginBottom: 'clamp(1px, 0.5vw, 3px)' }}>{step.title}</div>
                              <div className="text-white" style={{ fontSize: 'clamp(0.55rem, 2vw, 0.7rem)', lineHeight: 1.3 }}>{step.desc}</div>
                            </div>
                          </div>
                        )}
                        {/* אייקון ממורכז על הציר */}
                        <div className="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 z-30" style={{top: 0, minWidth: 'clamp(60px, 15vw, 110px)'}}>
                          <div className={`flex items-center justify-center rounded-full transition-all duration-500 ${isActive ? 'bg-[#1a79f6]' : 'bg-white'} shadow-lg`} style={{ width: 'clamp(34px, 7vw, 45px)', height: 'clamp(34px, 7vw, 45px)' }}>
                            {React.cloneElement(step.icon, {
                              className: `w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${isActive ? 'text-white' : 'text-[#1a79f6]'}`
                            })}
                          </div>
                        </div>
                        {/* מלבן טקסט משמאל */}
                        {!isRight && (
                          <div className="flex-1 flex justify-start pl-2 sm:pl-3 ml-3 sm:ml-4 md:ml-6">
                            <div className="border-[#1a79f6] border-[1.5px] rounded-xl sm:rounded-2xl shadow-md text-right"
                              style={{ 
                                maxWidth: 'clamp(105px, 36vw, 230px)',
                                padding: 'clamp(0.25rem, 1.5vw, 0.6rem)'
                              }}>
                              <div className="font-bold text-[#1a79f6]" style={{ fontSize: 'clamp(0.65rem, 2.2vw, 0.8rem)', marginBottom: 'clamp(1px, 0.5vw, 3px)' }}>{step.title}</div>
                              <div className="text-white" style={{ fontSize: 'clamp(0.55rem, 2vw, 0.7rem)', lineHeight: 1.3 }}>{step.desc}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      </section>

      {/* ===== SECTION 7: Happy Clients ===== */}
      <section className="home-snap-section">
      <div className="w-full flex flex-col justify-center items-center gap-8 sm:gap-12">
          <div
            ref={happyClientsRef}
            className={`transition-all duration-1000 ${
              happyClientsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#1a79f6] text-center">מבין לקוחותינו המרוצים</h2>
          </div>
          {/* Infinite horizontal carousel — full viewport width */}
          <div className="clients-carousel-wrapper">
            <div className="animate-client-carousel">
              {[
                { src: benjiLogo, alt: 'בנג\'י', style: {} },
                { src: maakafLogo, alt: 'מעקף', style: {} },
                { src: mosheLogo, alt: 'משה', style: { borderRadius: '20%' } },
                { src: officeLogo, alt: 'משרד עורכי דין', style: { borderRadius: '4%', border: '1px solid rgba(255,255,255,0.4)' } },
                { src: codersClanLogo, alt: 'Coders Clan', style: { borderRadius: '20%' } },
                { src: amiBirdLogo, alt: 'עמי-חי', style: { filter: 'brightness(0) invert(1)' }, sizeOverride: { height: 'clamp(144px, 21vw, 270px)', maxWidth: 'clamp(300px, 60vw, 780px)' } },
                { src: meiravLogo, alt: 'מירב דולה', style: { filter: 'brightness(0) invert(1)', clipPath: 'inset(0 48% 0 0)' } },
                { src: meiravLogo, alt: 'מירב דולה', style: { clipPath: 'inset(0 0 0 53%)', transform: 'translateX(clamp(-180px, -14vw, -90px))' } },
                { src: benjiLogo, alt: 'בנג\'י', style: {} },
                { src: maakafLogo, alt: 'מעקף', style: {} },
                { src: mosheLogo, alt: 'משה', style: { borderRadius: '20%' } },
                { src: officeLogo, alt: 'משרד עורכי דין', style: { borderRadius: '4%', border: '1px solid rgba(255,255,255,0.4)' } },
                { src: codersClanLogo, alt: 'Coders Clan', style: { borderRadius: '20%' } },
                { src: amiBirdLogo, alt: 'עמי-חי', style: { filter: 'brightness(0) invert(1)'}, sizeOverride: { height: 'clamp(144px, 21vw, 270px)', maxWidth: 'clamp(300px, 60vw, 780px)' } },
                { src: meiravLogo, alt: 'מירב דולה', style: { clipPath: 'inset(0 0 0 53%)', transform: 'translateX(clamp(-180px, -14vw, -90px))' } },
                { src: meiravLogo, alt: 'מירב דולה', style: { filter: 'brightness(0) invert(1)', clipPath: 'inset(0 48% 0 0)' } }
              ].map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    padding:
                      logo.alt === 'מירב דולה'
                        ? '0'
                        : '0 clamp(16px, 3vw, 48px)',
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="object-contain"
                    style={{
                      height: (logo as any).sizeOverride?.height ?? 'clamp(48px, 7vw, 90px)',
                      width: 'auto',
                      maxWidth: (logo as any).sizeOverride?.maxWidth ?? 'clamp(100px, 20vw, 260px)',
                      ...logo.style
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
      </div>
      </section>

      {/* ===== SECTION 8: Values ===== */}
      <section className="home-snap-section">
      <div
        ref={valuesRef}
        className="w-full flex justify-center items-center relative flex-1"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 w-full py-2 sm:py-4 md:py-6">
          <div className="text-center mb-3 sm:mb-6">
            <div ref={valuesHeaderRef}>
              <h2 className={`text-xl sm:text-2xl md:text-4xl font-bold text-[#1a79f6] mb-1 sm:mb-2 transition-all duration-1000 ${
                valuesHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                למה לבחור בנו לבניית האתר שלכם?
              </h2>
            </div>
            
          </div>

          <div 
            ref={valuesContainerRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6 max-w-6xl mx-auto transition-all duration-1000 ${
              valuesContainerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* שקיפות */}
            <div
              className={`bg-white/5 backdrop-blur-sm border border-[#1a79f6]/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 text-center hover:border-[#1a79f6]/60 hover:transform hover:scale-105 transition-all duration-300 ${
                valuesAnimated ? 'animate-fadeFromTop' : 'opacity-0'
              }`}
              style={
                valuesAnimated
                  ? { animationDelay: '0.2s', animationFillMode: 'forwards' }
                  : {}
              }
            >
              <div className="mb-1 sm:mb-2 flex justify-center"><Eye className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1a79f6]" /></div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                שקיפות
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">תקשורת פתוחה וברורה לאורך כל הדרך</p>
            </div>

            {/* זמינות */}
            <div
              className={`bg-white/5 backdrop-blur-sm border border-[#1a79f6]/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 text-center hover:border-[#1a79f6]/60 hover:transform hover:scale-105 transition-all duration-300 ${
                valuesAnimated ? 'animate-fadeFromTop' : 'opacity-0'
              }`}
              style={
                valuesAnimated
                  ? { animationDelay: '0.4s', animationFillMode: 'forwards' }
                  : {}
              }
            >
              <div className="mb-1 sm:mb-2 flex justify-center"><Clock className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1a79f6]" /></div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                זמינות
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">תמיד כאן לענות, לעזור ולתמוך</p>
            </div>

            {/* קידמה */}
            <div
              className={`bg-white/5 backdrop-blur-sm border border-[#1a79f6]/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 text-center hover:border-[#1a79f6]/60 hover:transform hover:scale-105 transition-all duration-300 ${
                valuesAnimated ? 'animate-fadeFromTop' : 'opacity-0'
              }`}
              style={
                valuesAnimated
                  ? { animationDelay: '0.6s', animationFillMode: 'forwards' }
                  : {}
              }
            >
              <div className="mb-1 sm:mb-2 flex justify-center"><TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1a79f6]" /></div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                קידמה
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">טכנולוגיות חדשניות ועדכניות</p>
            </div>

            {/* מהירות */}
            <div
              className={`bg-white/5 backdrop-blur-sm border border-[#1a79f6]/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 text-center hover:border-[#1a79f6]/60 hover:transform hover:scale-105 transition-all duration-300 ${
                valuesAnimated ? 'animate-fadeFromTop' : 'opacity-0'
              }`}
              style={
                valuesAnimated
                  ? { animationDelay: '0.8s', animationFillMode: 'forwards' }
                  : {}
              }
            >
              <div className="mb-1 sm:mb-2 flex justify-center"><Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1a79f6]" /></div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                מהירות
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">עבודה יעילה ומסירה בזמן</p>
            </div>

            {/* התאמה אישית */}
            <div
              className={`bg-white/5 backdrop-blur-sm border border-[#1a79f6]/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 text-center hover:border-[#1a79f6]/60 hover:transform hover:scale-105 transition-all duration-300 ${
                valuesAnimated ? 'animate-fadeFromTop' : 'opacity-0'
              }`}
              style={
                valuesAnimated
                  ? { animationDelay: '1s', animationFillMode: 'forwards' }
                  : {}
              }
            >
              <div className="mb-1 sm:mb-2 flex justify-center"><Palette className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1a79f6]" /></div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                התאמה אישית
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">עיצוב ובנייה לפי הבקשות והצרכים שלכם</p>
            </div>

            {/* מחירים הוגנים */}
            <div
              className={`bg-white/5 backdrop-blur-sm border border-[#1a79f6]/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 text-center hover:border-[#1a79f6]/60 hover:transform hover:scale-105 transition-all duration-300 ${
                valuesAnimated ? 'animate-fadeFromTop' : 'opacity-0'
              }`}
              style={
                valuesAnimated
                  ? { animationDelay: '1.2s', animationFillMode: 'forwards' }
                  : {}
              }
            >
              <div className="mb-1 sm:mb-2 flex justify-center"><DollarSign className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1a79f6]" /></div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                מחירים הוגנים
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">עלויות נוחות לכל כיס</p>
            </div>

            {/* היי */}

            {/* אחריות */}
            <div
              className={`bg-white/5 backdrop-blur-sm border border-[#1a79f6]/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 text-center hover:border-[#1a79f6]/60 hover:transform hover:scale-105 transition-all duration-300 ${
                valuesAnimated ? 'animate-fadeFromTop' : 'opacity-0'
              }`}
              style={
                valuesAnimated
                  ? { animationDelay: '1.4s', animationFillMode: 'forwards' }
                  : {}
              }
            >
              <div className="mb-1 sm:mb-2 flex justify-center"><Shield className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1a79f6]" /></div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                אחריות
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">עומדים מאחורי העבודה שלנו</p>
            </div>

            {/* הגדלת ראש */}
            <div
              className={`bg-white/5 backdrop-blur-sm border border-[#1a79f6]/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 text-center hover:border-[#1a79f6]/60 hover:transform hover:scale-105 transition-all duration-300 ${
                valuesAnimated ? 'animate-fadeFromTop' : 'opacity-0'
              }`}
              style={
                valuesAnimated
                  ? { animationDelay: '1.6s', animationFillMode: 'forwards' }
                  : {}
              }
            >
              <div className="mb-1 sm:mb-2 flex justify-center"><Star className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#1a79f6]" /></div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                הגדלת ראש
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">ההצלחה שלכם זו ההצלחה שלנו</p>
            </div>
          </div>

          <div 
            ref={aboutBtnRef}
            className={`text-center mt-4 transition-all duration-1000 ${
              aboutBtnVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link
              to="/about-full"
              className="bg-gradient-to-r from-[#1a79f6] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-xs md:text-sm"
            >
              קרא עוד על החברה
            </Link>
          </div>
        </div>
      </div>
      </section>

      {/* ===== SECTION 9: Recommendations ===== */}
      <section className="home-snap-section">
      <div className="w-full flex justify-center items-center">
        <div className="max-w-xl w-full flex flex-col items-center px-3 sm:px-4">
          <div ref={recommendationsHeaderRef}>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-[#1a79f6] mb-1 text-center transition-all duration-1000 ${
              recommendationsHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>המלצות</h2>
            <p className={`text-gray-400 text-xs sm:text-sm text-center mb-4 sm:mb-5 transition-all duration-1000 ${
              recommendationsHeaderVisible ? 'opacity-100' : 'opacity-0'
            }`}>מה הלקוחות שלנו אומרים עלינו בגוגל</p>
          </div>
          <div
            ref={recommendationsRef}
            className={`w-full transition-all duration-1000 ${
              recommendationsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Carousel */}
            <div className="relative overflow-hidden" style={{ minHeight: 'clamp(220px, 38vh, 295px)' }}>
              {[
                {
                  name: "אור בנג'י",
                  role: 'פסיכותרפיה',
                  text: "פנינו לחברת Catapp לבניית דף נחיתה לעסק. הכל נעשה בצורה מקצועית, יעילה ומדויקת עם הקשבה מלאה לצרכים שלנו. שילוב נפלא של עבודה ברמה גבוהה ויחס נהדר ללקוח.",
                  initials: 'א',
                  color: 'from-blue-500 to-blue-700',
                },
                {
                  name: 'יאיר אהרוני',
                  role: 'סטודנט להנדסת חשמל',
                  text: 'קיבלתי ליווי מקצועי ואישי ברמה גבוהה, עם תשומת לב לפרטים והבנה עמוקה של הצרכים שלי. התהליך היה מסודר וברור, והתוצאה – קורות חיים מרשימים. שירות ברמה הגבוהה ביותר.',
                  initials: 'י',
                  color: 'from-purple-500 to-purple-700',
                },
                {
                  name: 'רפאל סבג',
                  role: 'בעלים של משרד עו"ד',
                  text: 'קיבלתי יחס אישי, זמינות מלאה והקשבה לצרכים שלי. העבודה בוצעה במהירות ובמקצועיות כפי שסוכם – התוצאה עלתה על הציפיות. ממליץ מכל הלב!',
                  initials: 'ר',
                  color: 'from-emerald-500 to-emerald-700',
                },
                {
                  name: 'אוריאל',
                  role: 'מנהל קהילת מעקף',
                  text: 'חברת Catapp העבירה לקהילה שלנו הרצאה יוצאת דופן על כתיבת קורות חיים. ההרצאה הייתה מלאה בתוכן משמעותי ופרקטי עם דוגמאות מעשיות. ממליץ בחום רב!',
                  initials: 'א',
                  color: 'from-orange-500 to-orange-700',
                },
              ].map((review, idx) => (
                <div
                  key={idx}
                  className={`absolute w-full transition-all duration-700 ease-in-out ${
                    currentRecommendation === idx
                      ? 'opacity-100 translate-x-0'
                      : currentRecommendation === (idx - 1 + 4) % 4
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 text-right shadow-2xl hover:border-[#1a79f6]/30 transition-colors duration-300">
                    {/* Top: stars + Google badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-black" style={{ color: '#4285F4' }}>G</span>
                        </div>
                        <span className="text-gray-500 text-[11px]">מתוך ביקורות Google</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    {/* Review text */}
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4" dir="rtl">
                      "{review.text}"
                    </p>
                    {/* Footer: reviewer + CTA */}
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href="https://www.google.com/search?q=Catapp+%D7%91%D7%A0%D7%99%D7%99%D7%AA+%D7%90%D7%AA%D7%A8%D7%99%D7%9D+%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%95%D7%AA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 hover:text-[#1a79f6] transition-colors duration-200 border border-white/10 hover:border-[#1a79f6]/40 rounded-lg px-2.5 py-1.5 whitespace-nowrap"
                      >
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <span>צפה בביקורת בגוגל</span>
                      </a>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-semibold text-white text-sm leading-tight">{review.name}</div>
                          <div className="text-gray-500 text-[11px]">{review.role}</div>
                        </div>
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          {review.initials}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot navigation */}
            <div className="flex justify-center gap-2 mt-3 sm:mt-4">
              {[0, 1, 2, 3].map(i => (
                <button
                  key={i}
                  onClick={() => setCurrentRecommendation(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentRecommendation === i ? 'bg-[#1a79f6] w-6' : 'bg-white/30 w-1.5 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Button to all testimonials */}
          <div
            ref={testimonialsBtnRef}
            className={`text-center mt-4 sm:mt-5 transition-all duration-1000 ${
              testimonialsBtnVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link
              to="/testimonials"
              className="inline-block bg-gradient-to-r from-[#1a79f6] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 md:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
            >
              לכל ההמלצות
            </Link>
          </div>
        </div>
      </div>
      </section>

      {/* ===== SECTION 10: Footer ===== */}
      <section className="home-snap-section snap-footer">
        <Footer />
      </section>

    </div>
  );
};

export default HomePage;
