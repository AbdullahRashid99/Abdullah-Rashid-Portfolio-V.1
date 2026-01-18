import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Linkedin, Phone, GraduationCap, ArrowUp, ChevronLeft, ChevronRight,
  LineChart, BarChart2
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';
import SocialCircle from '../src/components/SocialCircle.jsx';

// --- Global Protection Styles ---
const protectionStyles = {
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
};

// --- Watermark Component ---
const WatermarkWrapper = ({ children }) => (
  <div className="relative overflow-hidden group w-full h-full flex items-center justify-center">
    {children}
    <div className="absolute inset-0 pointer-events-none opacity-30 flex flex-wrap justify-around items-around overflow-hidden select-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <span 
          key={i} 
          className="text-[10px] md:text-[14px] font-bold text-white/40 -rotate-45 whitespace-nowrap m-8 uppercase tracking-widest"
        >
          Abdullah Rashid
        </span>
      ))}
    </div>
  </div>
);

// --- UI Components ---
const Button = ({ children, className, ...props }) => (
  <button className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${className}`} {...props}>
    {children}
  </button>
);

// --- Personal Info ---
const personalInfo = {
  name: "Abdullah Rashid",
  title: "E-Com Media Buyer | Shopify Developer | Google Digital Marketer",
  linkedin: "https://www.linkedin.com/in/abdullah-rashid4444/",
  whatsapp: "http://wa.me/+201025030220",
  profileImage: "https://i.postimg.cc/2574Ss9d/9c10a25ab53cc9bdf0a8fc20082d0868-tplv-tiktokx-cropcenter-1080-1080.jpg",
  tiktok: "https://www.tiktok.com/@abdallah_rashidx",
};

const row1 = ["https://i.postimg.cc/C5GsYm88/11.png", "https://i.postimg.cc/wMXQH0N1/8.png", "https://i.postimg.cc/qqsx0jK6/10.png"];
const row2 = ["https://i.postimg.cc/L5t3RNPm/1.png", "https://i.postimg.cc/D0rPFBGm/5.png", "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png", "https://i.postimg.cc/cCRBZX34/2.png", "https://i.postimg.cc/90dYVJ9W/3.png", "https://i.postimg.cc/7h3nDmzH/4.png"];
const row3 = ["https://i.postimg.cc/Zn8xZVNp/12.png", "https://i.postimg.cc/Xqfk3Q5G/9.png"];
const allResults = [...row1, ...row2, ...row3];

// --- GALLERY MODAL (Enhanced Navigation & Logic) ---
const GalleryModal = ({ images, currentIndex, onClose }) => {
  const [idx, setIdx] = useState(currentIndex);

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    const handlePopState = () => onClose();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onClose]);

  const next = useCallback(() => setIdx((prev) => (prev + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIdx((prev) => (prev - 1 + images.length) % images.length), [images.length]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-md touch-none"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative flex items-center justify-center max-w-[80vw] max-h-[80vh]" onClick={e => e.stopPropagation()}>
        
        {/* Navigation Arrows (Desktop) */}
        <button onClick={prev} className="hidden md:flex absolute -left-16 text-white/50 hover:text-white"><ChevronLeft size={48}/></button>
        <button onClick={next} className="hidden md:flex absolute -right-16 text-white/50 hover:text-white"><ChevronRight size={48}/></button>

        {/* The Image Container */}
        <div className="relative inline-block overflow-hidden rounded-lg shadow-2xl border border-white/10">
          {/* X Button - Inside the image bounds at corner */}
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 z-[110] bg-neutral-900/60 hover:bg-neutral-900 text-white p-1.5 rounded-full backdrop-blur-md transition"
          >
            <X size={20} />
          </button>

          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) next();
              if (info.offset.x > 50) prev();
            }}
          >
            <WatermarkWrapper>
              <img 
                src={images[idx]} 
                alt="Result" 
                className="max-h-[80vh] max-w-[80vw] object-contain select-none"
                draggable="false"
              />
            </WatermarkWrapper>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Banner Strip Component ---
const BannerStrip = ({ images, reverse, onImageClick }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);
  const duplicated = [...images, ...images];

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isPaused) return;
    let lastTime = 0;
    let rafId;
    const step = (ts) => {
      if (!lastTime) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;
      const move = 90 * dt;
      if (reverse) {
        el.scrollLeft -= move;
        if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2;
      } else {
        el.scrollLeft += move;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [reverse, isPaused]);

  const handleStart = () => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  const handleEnd = () => {
    timeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <div 
      ref={containerRef}
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-auto no-scrollbar flex select-none"
      onMouseEnter={handleStart} onMouseLeave={handleEnd}
      onTouchStart={handleStart} onTouchEnd={handleEnd}
      style={{ touchAction: 'pan-y', scrollbarWidth: 'none' }}
    >
      <div className="flex">
        {duplicated.map((src, i) => (
          <div key={i} className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 px-2 py-4">
            <motion.div 
              className="w-full h-[250px] md:h-[400px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
              whileHover={{ scale: 1.01 }}
              onClick={() => onImageClick(src)}
            >
              <WatermarkWrapper>
                <img src={src} className="w-full h-full object-cover md:object-contain" draggable="false" style={protectionStyles} alt="Result" />
              </WatermarkWrapper>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sections ---
const SectionWrapper = React.forwardRef(({ id, title, children, className }, ref) => (
  <motion.section
    ref={ref} id={id} className={`py-20 ${className}`}
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">{title}</h2>
    {children}
  </motion.section>
));

// --- Main Portfolio ---
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [galleryIdx, setGalleryIdx] = useState(null);
  const sectionRefs = { home: useRef(null), skills: useRef(null), projects: useRef(null) };

  return (
    <div className="bg-neutral-950 text-white min-h-screen relative overflow-x-hidden antialiased" style={protectionStyles}>
      
      {/* OLD STARS BACKGROUND - Restored */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-60"></div>
        <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0))`,
            backgroundSize: '200px 200px'
          }}></div>
      </div>

      <nav className="fixed top-0 w-full bg-neutral-950/70 backdrop-blur-lg z-50 border-b border-neutral-800/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <span className="text-xl font-bold">{personalInfo.name}</span>
          <div className="hidden md:flex gap-8">
            <a href="#skills" className="hover:text-teal-400 transition">Skills</a>
            <a href="#projects" className="hover:text-teal-400 transition">Results</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4">
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center">
          <motion.img src={personalInfo.profileImage} className="w-32 h-32 rounded-full border-4 border-neutral-700 mb-6 shadow-xl" alt="Profile" />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Abdullah Rashid</h1>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl">{personalInfo.title}</p>
          <Button className="bg-teal-500 text-white shadow-lg shadow-teal-500/20">Let's Grow Your Brand</Button>
        </section>

        <SocialCircle />

        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Proven Results">
          <div className="space-y-4">
            <BannerStrip images={row1} reverse={false} onImageClick={(src) => setGalleryIdx(allResults.indexOf(src))} />
            <BannerStrip images={row2} reverse={true} onImageClick={(src) => setGalleryIdx(allResults.indexOf(src))} />
            <BannerStrip images={row3} reverse={false} onImageClick={(src) => setGalleryIdx(allResults.indexOf(src))} />
          </div>
        </SectionWrapper>

        <div className="text-center py-20">
          <GraduationCap className="mx-auto text-amber-400 mb-4" size={40} />
          <p className="text-neutral-300">Bachelor of Business Administration from Ain Shams University.</p>
        </div>
      </main>

      <AnimatePresence>
        {galleryIdx !== null && (
          <GalleryModal 
            images={allResults} 
            currentIndex={galleryIdx} 
            onClose={() => setGalleryIdx(null)} 
          />
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-neutral-800 text-center text-neutral-500">
        <p>© {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
