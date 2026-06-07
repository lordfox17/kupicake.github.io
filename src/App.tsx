import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import {
  Dribbble,
  Instagram,
  Play,
  Linkedin,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isSoundOn) {
        audioRef.current.play().catch(() => {
          setIsSoundOn(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isSoundOn]);

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 3,
      wheelMultiplier: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    setWindowHeight(window.innerHeight);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isScrolled = scrollY > 115;
  const isAtBottom = windowHeight > 0 && typeof document !== 'undefined' ? (scrollY + windowHeight >= document.documentElement.scrollHeight - 50) : false;
  
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  let aboutTitleProgress = 0;
  if (aboutTitleRef.current && windowHeight > 0) {
    const rect = aboutTitleRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    aboutTitleProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  const aboutRef = useRef<HTMLParagraphElement>(null);
  let scrollProgress = 0;
  if (aboutRef.current && windowHeight > 0) {
    const rect = aboutRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    scrollProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  const whatIDoRef = useRef<HTMLHeadingElement>(null);
  let whatIDoProgress = 0;
  if (whatIDoRef.current && windowHeight > 0) {
    const rect = whatIDoRef.current.getBoundingClientRect();
    const startY = windowHeight * 0.9;
    const endY = windowHeight * 0.3;
    whatIDoProgress = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
  }

  const aboutWords = [
    { w: "I", h: false },
    { w: "am", h: false },
    { w: "a", h: false },
    { w: "multidisciplinary", h: true },
    { w: "visual", h: true },
    { w: "artist", h: true },
    { w: "dedicated", h: false },
    { w: "to", h: false },
    { w: "creating", h: false },
    { w: "vibrant", h: true },
    { w: "worlds", h: true },
    { w: "that", h: false },
    { w: "capture", h: false },
    { w: "the", h: false },
    { w: "imagination", h: false },
    { w: "and", h: false },
    { w: "stay", h: false },
    { w: "with", h: false },
    { w: "the", h: false },
    { w: "audience", h: false },
    { w: "long", h: false },
    { w: "after.", h: false }
  ];

  return (
    <main className="bg-[#1c1c1c] flex flex-col gap-[1px] w-full min-h-screen font-sans">
      <audio
        ref={audioRef}
        src="https://raw.githubusercontent.com/kupicake/database/main/main%20illus_hero%20section.webm"
        loop
      />
      
      {/* MENU BACKDROP */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-30 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMenuOpen(false)}
      />

      {/* CIRCULAR MENU */}
      <div 
        className={`fixed top-[-10px] right-[-10px] md:top-[-15px] md:right-[-15px] w-[280px] md:w-[360px] h-[280px] md:h-[360px] rounded-full bg-[#0a0a0a]/50 backdrop-blur-xl z-40 flex flex-col items-center justify-center border border-white/10 shadow-[0_8_32px_rgba(0,0,0,0.5)] transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-[calc(100%-50px)_50px] md:origin-[calc(100%-70px)_70px] ${isMenuOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-start gap-4 md:gap-5 mb-6 md:mb-8 pt-6 pr-6 md:pt-8 md:pr-8">
          {['About', 'Work', 'Contact'].map((item, idx) => (
            <div key={item} className="overflow-hidden">
              <a 
                href="#" 
                onClick={() => setIsMenuOpen(false)} 
                className={`flex items-center gap-1.5 md:gap-2 text-[#E8E6E3] hover:text-[#F05C3B] text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] font-bold uppercase transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: isMenuOpen ? `${100 + idx * 75}ms` : '0ms' }}
              >
                <div className="h-[1px] bg-current transition-all w-0 group-hover:w-2 md:group-hover:w-3" />
                <span>{item}</span>
              </a>
            </div>
          ))}
        </div>
        <div 
          className={`flex gap-6 pr-6 md:pr-8 transition-all duration-700 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: isMenuOpen ? '350ms' : '0ms' }}
        >
           <a href="#" className="text-[#5A5957] hover:text-[#F05C3B] transition-colors"><Instagram className="w-4 h-4 md:w-5 md:h-5" /></a>
           <a href="#" className="text-[#5A5957] hover:text-[#F05C3B] transition-colors"><Dribbble className="w-4 h-4 md:w-5 md:h-5" /></a>
           <a href="#" className="text-[#5A5957] hover:text-[#F05C3B] transition-colors"><Linkedin className="w-4 h-4 md:w-5 md:h-5" /></a>
        </div>
      </div>

      {/* FIXED FLOATING UI */}
      <div className={`fixed inset-0 pointer-events-none z-50 transition-colors duration-500`}>
        {/* Top Left - Logo */}
        <div className="absolute top-0 left-0 w-[75px] md:w-[115px] h-[75px] md:h-[115px] flex items-center justify-center pointer-events-auto bg-transparent">
          <div className="text-[#E8E6E3] hover:text-[#F05C3B] transition-colors cursor-pointer group flex flex-col items-center">
              <div className="relative w-8 h-8 rounded-full border-2 border-current rounded-b flex items-end justify-center pb-1 overflow-hidden group-hover:scale-110 transition-transform">
                  <div className="w-1.5 h-3 bg-current rounded-full" />
                  <div className="absolute top-0 right-1 border-l-4 border-r-4 border-b-8 border-transparent border-b-current w-0 h-0 rotate-12 origin-bottom-right" />
                  <div className="absolute top-0 left-1 border-l-4 border-r-4 border-b-8 border-transparent border-b-current w-0 h-0 -rotate-12 origin-bottom-left" />
              </div>
          </div>
        </div>

        {/* Top Right - Nav */}
        <div className={`absolute top-0 right-0 w-[75px] md:w-[115px] h-[75px] md:h-[115px] flex items-center justify-center bg-transparent overflow-hidden ${isScrolled || isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isScrolled || isMenuOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#E8E6E3] hover:text-[#F05C3B] p-2 flex items-center justify-center transition-colors">
              {isMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>
        </div>

        {/* Bottom Right - Sound */}
        <div className="absolute bottom-0 right-0 w-[75px] md:w-[115px] h-[75px] md:h-[115px] flex items-center justify-center pointer-events-auto bg-transparent"
             style={{ '--sp': `${Math.min(100, Math.max(0, (scrollY / (typeof window !== 'undefined' ? (window.innerWidth >= 768 ? 115 : 75) : 115)) * 100))}%` } as React.CSSProperties}
        >
          <div 
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="-rotate-90 origin-center cursor-pointer group grid relative"
          >
              {/* Back Layer (Video Area - Light Color) */}
              <div className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap text-[8px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em]">
                  <span className="text-[#c0c0c0] transition-colors group-hover:text-white">SOUND</span>
                  <div className="grid overflow-hidden">
                    <span className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${isSoundOn ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'} text-white group-hover:text-gray-200`}>OFF</span>
                    <span className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${isSoundOn ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'} text-white group-hover:text-gray-200`}>ON</span>
                  </div>
              </div>

              {/* Front Layer (Black Area - Gray Color) using Clip Path */}
              <div className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap text-[8px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em]"
                   style={{ clipPath: 'inset(0 calc(100% - var(--sp)) 0 0)' }}>
                  <span className="text-[#5A5957] transition-colors group-hover:text-[#8C8A87]">SOUND</span>
                  <div className="grid overflow-hidden">
                    <span className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${isSoundOn ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'} text-[#E8E6E3] group-hover:text-[#F05C3B]`}>OFF</span>
                    <span className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${isSoundOn ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'} text-[#F05C3B]`}>ON</span>
                  </div>
              </div>
          </div>

          {/* Song Info */}
          <div 
              className={`absolute right-[calc(50%+15px)] md:right-[calc(50%+20px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-[8px] md:text-[9px] font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#8C8A87] transition-all duration-500 ease-out flex items-center gap-3 bg-black px-3 py-1.5 md:px-4 md:py-2 rounded-full ${
                isSoundOn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
              }`}
          >
              scott buckley - growing up
              <div className="flex gap-1 items-center h-2.5">
                <span className="w-[1.5px] h-full bg-[#F05C3B] animate-pulse" />
                <span className="w-[1.5px] h-2/3 bg-[#F05C3B] animate-pulse" style={{ animationDelay: '200ms' }} />
                <span className="w-[1.5px] h-full bg-[#F05C3B] animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>
          </div>
        </div>
      </div>
      
      {/* HERO SECTION */}
      <div className="relative flex-none h-[100svh] w-full bg-black grid grid-cols-[75px_1fr_75px] md:grid-cols-[115px_1fr_115px] grid-rows-[75px_1fr_75px] md:grid-rows-[115px_1fr_115px] overflow-hidden">
        
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video 
            src="https://raw.githubusercontent.com/kupicake/database/main/main%20illus_hero%20section.webm" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover z-0 opacity-100 scale-105" 
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          />
        </div>

        {/* Top Left - Logo (Moved to fixed) */}
        <div className="relative z-10 border-b border-r border-white/20" />

        {/* Top Center - Name */}
        <div className="relative z-10 border-b border-white/20 flex flex-col items-center justify-end pb-6 md:pb-8">
          <div className="border border-white/30 px-6 py-2 md:px-8 md:py-3 rounded-full uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-xs font-extrabold text-white mix-blend-difference opacity-90 hover:opacity-100 transition-opacity cursor-default bg-white/20">
            KUPI CAKE
          </div>
        </div>

        {/* Top Right - Navigation */}
        <div className="relative z-10 border-b border-l border-white/20 flex flex-col items-center justify-center">
          <div className="flex flex-col items-start gap-1.5 md:gap-2.5">
             {['About', 'Work', 'Contact'].map((item, idx) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] font-bold uppercase transition-opacity flex items-center gap-1.5 md:gap-2 group text-white mix-blend-difference ${
                    idx === 0 ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                    <div className={`h-[1px] bg-white transition-all ${idx === 0 ? 'w-2 md:w-3' : 'w-0 group-hover:w-2 md:group-hover:w-3'}`} />
                    <span>{item}</span>
                </a>
             ))}
          </div>
        </div>

        {/* Center Left - Social Media */}
        <div className="relative z-10 border-r border-white/20 flex flex-col items-center justify-center gap-8 md:gap-10">
          {[
            { Icon: Dribbble, label: 'Dribbble' },
            { Icon: Instagram, label: 'Instagram' },
            { Icon: Play, label: 'Play', className: 'fill-current' },
            { Icon: Linkedin, label: 'LinkedIn' }
          ].map(({ Icon, label, className }) => (
            <a 
              key={label}
              href="#" 
              aria-label={label}
              className="text-white mix-blend-difference opacity-60 hover:opacity-100 transition-all hover:scale-110"
            >
              <Icon className={`w-4 h-4 md:w-5 md:h-5 ${className || ''}`} strokeWidth={2} />
            </a>
          ))}
        </div>

        {/* Center Main - Blank Area */}
        <div className="relative z-10 flex items-center justify-center group cursor-crosshair mix-blend-difference px-10 py-10">
          {/* Inner flexible wrapper for animations without breaking grid */}
          <div className="relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-95 group-active:rotate-[45deg]">
            <div className="absolute top-1/4 left-1/4 w-3 h-3 md:w-4 md:h-4 border-l-[2px] border-t-[2px] border-white/80 transition-all duration-300 opacity-50 group-hover:opacity-100 group-active:translate-x-4 group-active:translate-y-4" />
            <div className="absolute top-1/4 right-1/4 w-3 h-3 md:w-4 md:h-4 border-r-[2px] border-t-[2px] border-white/80 transition-all duration-300 opacity-50 group-hover:opacity-100 group-active:-translate-x-4 group-active:translate-y-4" />
            <div className="absolute bottom-1/4 left-1/4 w-3 h-3 md:w-4 md:h-4 border-l-[2px] border-b-[2px] border-white/80 transition-all duration-300 opacity-50 group-hover:opacity-100 group-active:translate-x-4 group-active:-translate-y-4" />
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 md:w-4 md:h-4 border-r-[2px] border-b-[2px] border-white/80 transition-all duration-300 opacity-50 group-hover:opacity-100 group-active:-translate-x-4 group-active:-translate-y-4" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-[2px] bg-white/80 transition-all duration-300 opacity-50 group-hover:opacity-100 group-active:scale-[0.2]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-2 bg-white/80 transition-all duration-300 opacity-50 group-hover:opacity-100 group-active:scale-[0.2]" />
          </div>
        </div>

        {/* Center Right - Blank Area */}
        <div className="relative z-10 border-l border-white/20 flex items-center justify-center">
        </div>

        {/* Bottom Left - Corner Detailing */}
        <div className="relative z-10 border-t border-r border-white/20 flex items-center justify-center">
           <div className="w-1.5 h-1.5 bg-white mix-blend-difference opacity-50 rounded-sm transform rotate-45" />
        </div>

        {/* Bottom Center - Empty / Subtle Detail */}
        <div className="relative z-10 border-t border-white/20 flex items-center justify-center mix-blend-difference">
           <div className="w-[100px] h-[1px] bg-white opacity-40" />
        </div>

         {/* Bottom Right - Sound (Moved to fixed) */}
         <div className="relative z-10 border-t border-l border-white/20" />

      </div>

      {/* ABOUT SECTION */}
      <div className="w-full bg-[#1c1c1c] grid grid-cols-[75px_1fr_75px] md:grid-cols-[115px_1fr_115px] auto-rows-auto gap-[1px]">
        
        {/* Left Grid Margin */}
        <div className="bg-black col-start-1 col-end-2 row-start-1" />
        
        {/* Center Content */}
        <div className="bg-black col-start-2 col-end-3 row-start-1 pt-40 lg:pt-64 pb-48 lg:pb-64 px-8 md:px-12 lg:px-24 flex flex-col justify-center items-start">
          <h2 ref={aboutTitleRef} className="font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase mb-8 md:mb-12">
            <span 
              style={{
                backgroundImage: `linear-gradient(to right, #D1CFC9 ${Math.min(100, aboutTitleProgress * 100)}%, #5A5957 ${Math.min(100, aboutTitleProgress * 100)}%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              ABOUT ME
            </span>
          </h2>
          <p ref={aboutRef} className="text-2xl md:text-4xl xl:text-[52px] font-normal leading-[1.1] md:leading-[1.15] tracking-tight">
            {aboutWords.map((word, i) => {
               const fillPercentage = Math.max(0, Math.min(100, (scrollProgress * aboutWords.length - i) * 100));
               const targetColor = word.h ? '#F05C3B' : '#D1CFC9';
               return (
                  <span key={i}>
                    <span 
                      style={{
                        backgroundImage: `linear-gradient(to right, ${targetColor} ${fillPercentage}%, #5A5957 ${fillPercentage}%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      {word.w}
                    </span>
                    {i < aboutWords.length - 1 && ' '}
                  </span>
               );
            })}
          </p>
        </div>

        {/* Right Grid Margin */}
        <div className="bg-black col-start-3 col-end-4 row-start-1" />

      </div>

      {/* --- Section 3: What I Do (Bento Grid) --- */}
      <div className="min-h-screen grid md:grid-cols-[115px_1fr_115px] grid-cols-[75px_1fr_75px] gap-[1px]">
        {/* Left Grid Margin */}
        <div className="bg-black col-start-1 col-end-2 row-start-1" />
        
        {/* Center Content */}
        <div className="bg-black col-start-2 col-end-3 row-start-1 pt-32 lg:pt-48 pb-0 flex flex-col justify-start items-start w-full">
           <h2 ref={whatIDoRef} className="px-6 md:px-12 lg:px-24 font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase mb-16 md:mb-24 lg:mb-32">
             <span 
               style={{
                 backgroundImage: `linear-gradient(to right, #D1CFC9 ${Math.min(100, whatIDoProgress * 100)}%, #5A5957 ${Math.min(100, whatIDoProgress * 100)}%)`,
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
                 color: 'transparent'
               }}
             >
               WHAT I DO
             </span>
           </h2>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-[#1c1c1c] border-t border-[#1c1c1c] w-full flex-grow">
             {/* Box 1 */}
             <div className="relative bg-black pt-16 pb-16 lg:pt-32 lg:pb-24 px-8 md:px-16 lg:px-20 flex flex-col gap-10 md:gap-16 group transition-all duration-500 hover:bg-[#050505] min-h-[600px] lg:min-h-[800px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img src="https://raw.githubusercontent.com/kupicake/database/main/raw%20concept.webp" referrerPolicy="no-referrer" className="w-full h-full object-cover object-center grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Raw Concept" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent"></div>
                </div>
                
                <div className="w-full relative z-10">
                  <div className="text-[#5A5957] font-mono text-sm md:text-base lg:text-lg mb-4">Branding &amp; Visual Identity</div>
                  <div className="h-[1px] w-full bg-[#1c1c1c] group-hover:bg-[#F05C3B] transition-colors duration-500"></div>
                </div>
                <div className="flex flex-col gap-4 -mt-2 md:-mt-4 relative z-10">
                  <div className="text-[#E8E6E3] font-normal text-3xl md:text-5xl xl:text-[52px] leading-[1.1] tracking-tight group-hover:text-[#F05C3B] transition-colors duration-500">Raw Concept</div>
                </div>
                <div className="text-[#8C8A87] text-base md:text-lg lg:text-xl font-light leading-[1.6] relative z-10">
                  Transforming abstract ideas into structured blueprints, from clean vector logo design to initial layout concepts.
                </div>
                <div className="mt-auto flex justify-start items-end pt-12 relative z-10">
                  <div className="text-white/50 font-normal text-3xl md:text-4xl xl:text-5xl leading-[1.05] md:leading-[1.1] tracking-tight group-hover:text-[#F05C3B] transition-colors duration-500 select-none">01</div>
                </div>
             </div>

             {/* Box 2 */}
             <div className="relative bg-black pt-16 pb-16 lg:pt-32 lg:pb-24 px-8 md:px-16 lg:px-20 flex flex-col gap-10 md:gap-16 group transition-all duration-500 hover:bg-[#050505] min-h-[600px] lg:min-h-[800px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img src="https://raw.githubusercontent.com/kupicake/database/main/full%20illustration.webp" referrerPolicy="no-referrer" className="w-full h-full object-cover object-center grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Full Illustration" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent"></div>
                </div>

                <div className="w-full relative z-10">
                  <div className="text-[#5A5957] font-mono text-sm md:text-base lg:text-lg mb-4">Narrative &amp; Character Design</div>
                  <div className="h-[1px] w-full bg-[#1c1c1c] group-hover:bg-[#F05C3B] transition-colors duration-500"></div>
                </div>
                <div className="flex flex-col gap-4 -mt-2 md:-mt-4 relative z-10">
                  <div className="text-[#E8E6E3] font-normal text-3xl md:text-5xl xl:text-[52px] leading-[1.1] tracking-tight group-hover:text-[#F05C3B] transition-colors duration-500">Full Illustration</div>
                </div>
                <div className="text-[#8C8A87] text-base md:text-lg lg:text-xl font-light leading-[1.6] relative z-10">
                  Building rich, immersive worlds, detailed character designs, and full publication layouts.
                </div>
                <div className="mt-auto flex justify-start items-end pt-12 relative z-10">
                  <div className="text-white/50 font-normal text-3xl md:text-4xl xl:text-5xl leading-[1.05] md:leading-[1.1] tracking-tight group-hover:text-[#F05C3B] transition-colors duration-500 select-none">02</div>
                </div>
             </div>

             {/* Box 3 */}
             <div 
               className="relative bg-black pt-16 pb-16 lg:pt-32 lg:pb-24 px-8 md:px-16 lg:px-20 flex flex-col gap-10 md:gap-16 group transition-all duration-500 hover:bg-[#050505] min-h-[600px] lg:min-h-[800px] overflow-hidden"
               onMouseEnter={(e) => {
                 const video = e.currentTarget.querySelector('video');
                 if (video) video.play();
               }}
               onMouseLeave={(e) => {
                 const video = e.currentTarget.querySelector('video');
                 if (video) video.pause();
               }}
             >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <video 
                    src="https://raw.githubusercontent.com/kupicake/database/main/3.animasi_fin.webm" 
                    className="w-full h-full object-cover object-center absolute inset-0 grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" 
                    loop 
                    muted 
                    playsInline 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none"></div>
                </div>

                <div className="w-full relative z-10">
                  <div className="text-[#5A5957] font-mono text-sm md:text-base lg:text-lg mb-4">Motion Graphics &amp; 2D Movement</div>
                  <div className="h-[1px] w-full bg-[#1c1c1c] group-hover:bg-[#F05C3B] transition-colors duration-500"></div>
                </div>
                <div className="flex flex-col gap-4 -mt-2 md:-mt-4 relative z-10">
                  <div className="absolute -left-6 md:-left-8 top-1 md:top-2 text-[#E8E6E3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-2xl md:text-4xl">✦</div>
                  <div className="text-[#E8E6E3] font-normal text-3xl md:text-5xl xl:text-[52px] leading-[1.1] tracking-tight group-hover:text-[#F05C3B] transition-colors duration-500">Lively Animation</div>
                </div>
                <div className="text-[#8C8A87] text-base md:text-lg lg:text-xl font-light leading-[1.6] relative z-10">
                  Breathing movement into static artwork through traditional frame-by-frame loops and dynamic motion sequences.
                </div>
                <div className="mt-auto flex justify-start items-end pt-12 relative z-10">
                  <div className="text-white/50 font-normal text-3xl md:text-4xl xl:text-5xl leading-[1.05] md:leading-[1.1] tracking-tight group-hover:text-[#F05C3B] transition-colors duration-500 select-none">03</div>
                </div>
             </div>
           </div>
        </div>

        {/* Right Grid Margin */}
        <div className="bg-black col-start-3 col-end-4 row-start-1" />
      </div>

      {/* --- Section 4: My Work --- */}
      <div className="w-full bg-[#1c1c1c] grid md:grid-cols-[115px_1fr_115px] grid-cols-[75px_1fr_75px] auto-rows-auto gap-[1px]">
        {/* Left Grid Margin */}
        <div className="bg-black col-start-1 col-end-2 row-start-1" />
        
        {/* Center Content */}
        <div className="bg-black col-start-2 col-end-3 row-start-1 pt-32 lg:pt-48 pb-32 lg:pb-48 flex flex-col justify-start items-start w-full">
           <h2 className="px-6 md:px-12 lg:px-24 text-[#8C8A87] font-bold text-xs md:text-sm tracking-[0.4em] md:tracking-[0.6em] uppercase mb-16 md:mb-24 lg:mb-32">MY WORK</h2>
           
           <div className="w-full flex flex-col gap-32 lg:gap-48 px-6 md:px-12 lg:px-24">
              {/* Project 1 */}
              <div className="w-full flex flex-col gap-8 md:gap-12 group cursor-pointer">
                 <div className="w-full aspect-[16/9] lg:aspect-[21/9] bg-[#111111] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1c1c1c] to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-0" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#1c1c1c] text-8xl lg:text-[200px] font-light scale-150 transition-transform duration-[1500ms] group-hover:scale-100 ease-[cubic-bezier(0.34,1.56,0.64,1)]">01</div>
                 </div>
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
                    <div className="flex flex-col gap-4">
                       <h3 className="text-[#E8E6E3] font-normal text-3xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-tight group-hover:text-[#F05C3B] transition-colors duration-500">Project Alpha</h3>
                       <div className="flex gap-4 md:gap-6 font-mono text-[10px] md:text-xs lg:text-sm text-[#5A5957] uppercase tracking-wider">
                          <span>Branding</span>
                          <span>//</span>
                          <span>Identity</span>
                       </div>
                    </div>
                    <div className="text-[#8C8A87] text-sm md:text-base lg:text-lg md:max-w-xs lg:max-w-sm font-light leading-[1.6]">
                       A comprehensive visual identity capturing the essence of modern architectural design concepts.
                    </div>
                 </div>
              </div>

              {/* Project 2 */}
              <div className="w-full flex flex-col gap-8 md:gap-12 group cursor-pointer">
                 <div className="w-full aspect-[16/9] lg:aspect-[21/9] bg-[#111111] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tl from-[#1c1c1c] to-transparent opacity-50 transition-opacity duration-700 group-hover:opacity-0" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#1c1c1c] text-8xl lg:text-[200px] font-light scale-150 transition-transform duration-[1500ms] group-hover:scale-100 ease-[cubic-bezier(0.34,1.56,0.64,1)]">02</div>
                 </div>
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
                    <div className="flex flex-col gap-4">
                       <h3 className="text-[#E8E6E3] font-normal text-3xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-tight group-hover:text-[#F05C3B] transition-colors duration-500">Neon Nights</h3>
                       <div className="flex gap-4 md:gap-6 font-mono text-[10px] md:text-xs lg:text-sm text-[#5A5957] uppercase tracking-wider">
                          <span>Illustration</span>
                          <span>//</span>
                          <span>Editorial</span>
                       </div>
                    </div>
                    <div className="text-[#8C8A87] text-sm md:text-base lg:text-lg md:max-w-xs lg:max-w-sm font-light leading-[1.6]">
                       Vibrant editorial series reflecting the dynamic pulse and neon aesthetics of nocturnal cityscapes.
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Grid Margin */}
        <div className="bg-black col-start-3 col-end-4 row-start-1" />
      </div>

    </main>
  );
}
