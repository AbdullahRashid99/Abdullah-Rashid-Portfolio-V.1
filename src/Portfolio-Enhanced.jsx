// Portfolio.jsx (With Right-Click Protection, Abdullah Rashid Watermark,
// improved RESULTS touch/scroll behavior and in-modal gallery navigation
// Updates per user: modal browses all images across 3 rows, arrows/X fixed for desktop,
// auto-scroll resumes after 3s of inactivity, hold-for-3s resumes, row-specific modal sizing,
// certificates modal supports swipe between certs.

import React, { useState, useEffect, useRef } from 'react';

import {
  Mail, User, Briefcase, Star, Folder, Menu, X, Send, Linkedin, Phone,
  Award, Target, Megaphone, ShoppingCart, UserCheck, Building, LineChart,
  Camera, GraduationCap, ArrowRight, Palette, Code, BarChart3,
  Instagram, Dribbble, Twitter, ArrowUp,
  ShoppingCart as IconShopify,
  HelpCircle,
  Users,
  Layers,
  BarChart2,
  MoreHorizontal,
  ChevronLeft, ChevronRight
} from 'lucide-react';

import { SiTiktok } from 'react-icons/si';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';

// Import SocialCircle component (keep your path)
import SocialCircle from '../src/components/SocialCircle.jsx';

// --- Global Protection Styles ---
const protectionStyles = {
  userSelect: 'none',
  WebkitTouchCallout: 'none', // Disables long-press menu on iOS
  WebkitUserSelect: 'none',
};

// --- Watermark Component (Abdullah Rashid) ---
// --- Premium Watermark Component (Abdullah Rashid) ---

const WatermarkWrapper = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      {children}

      {/* Watermark Overlay */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-50">
        <div
          className="absolute inset-[-50%]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                rgba(255,255,255,0.08) 0px,
                rgba(255,255,255,0.08) 120px,
                transparent 120px,
                transparent 240px
              )
            `,
          }}
        />

        {/* Text Layer */}
        <div className="absolute inset-[-50%] rotate-[-45deg] flex flex-wrap gap-[120px]">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="text-[18px] md:text-[22px] font-semibold text-white/40 tracking-[0.3em] uppercase"
              style={{
                textShadow: '0 0 2px rgba(0,0,0,0.4)',
              }}
            >
              Abdullah Rashid
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
// --- UI Components ---
const Button = ({ children, className, ...props }) => (
  <button className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div className={`bg-neutral-900/80 border border-neutral-800 rounded-xl shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

// --- Personal Info ---
const personalInfo = {
  name: "Abdullah Rashid",
  title: "E-Com Media Buyer | Shopify Developer | Google Certificated Digital Marketer & E-commerce expert",
  linkedin: "https://www.linkedin.com/in/abdullah-rashid4444/",
  whatsapp: "http://wa.me/+201025030220",
  profileImage: "https://i.postimg.cc/2574Ss9d/9c10a25ab53cc9bdf0a8fc20082d0868-tplv-tiktokx-cropcenter-1080-1080.jpg",
  tiktok: "https://www.tiktok.com/@abdallah_rashidx",
};

const sections = [
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Results" },
];

const skillsData = [
  "Problems-Solver", "Meta Ads", "TikTok Ads", "Google Ads", 
  "Conversion Rate Optimization", "Business Consultant", "Copywriting", "Shopify Developer",
];

// --- Animated Counter ---
const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useSpring(0, { stiffness: 50, damping: 30 });
  const [display, setDisplay] = useState('£0');

  useEffect(() => {
    const unsub = motionValue.on("change", (latest) => {
      setDisplay(`£${Math.round(latest).toLocaleString()}+`);
    });
    if (isInView) motionValue.set(value);
    return () => unsub();
  }, [isInView, value, motionValue]);

  return <span ref={ref}>{display}</span>;
};

// --- Section Wrapper ---
const SectionWrapper = React.forwardRef(({ id, title, children, className }, ref) => (
  <motion.section
    ref={ref}
    id={id}
    className={`py-20 md:py-28 ${className}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">{title}</span>
    </h2>
    {children}
  </motion.section>
));

// --- Navbar ---
const Navbar = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral-950/70 backdrop-blur-lg z-50 border-b border-neutral-800/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <a href="#home" className="text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors">{personalInfo.name}</a>
        <div className="hidden md:flex gap-8 items-center">
          {sections.map((sec) => (
            <a key={sec.id} href={`#${sec.id}`} className={`font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}>
              {sec.title}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-transparent text-white p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-neutral-900">
            <div className="flex flex-col items-center gap-4 py-4">
              {sections.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}>
                  {sec.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Gallery Modal (supports swipe, arrows, keyboard) ---
const GalleryModal = ({ images = [], startIndex = 0, onClose, middleSet = new Set(), certMode = false }) => {
  const [index, setIndex] = useState(startIndex);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const pointerCaptureRef = useRef(null);

  useEffect(() => { setIndex(startIndex); }, [startIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + images.length) % images.length);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let pointerId = null;

    const down = (e) => {
      // ignore clicks on buttons/icons so arrows/X stay clickable
      if (e.target.closest && e.target.closest('button')) return;
      pointerId = e.pointerId;
      draggingRef.current = false;
      startXRef.current = e.clientX;
      lastXRef.current = e.clientX;
      try { el.setPointerCapture(pointerId); pointerCaptureRef.current = pointerId; } catch(err){ pointerCaptureRef.current = null; }
    };

    const move = (e) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startXRef.current;
      if (Math.abs(dx) > 10) draggingRef.current = true;
      lastXRef.current = e.clientX;
    };

    const up = (e) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const totalDx = e.clientX - startXRef.current;
      if (!draggingRef.current && Math.abs(totalDx) < 8) {
        // tap -> do nothing (keep modal open)
      } else {
        if (totalDx < -30) setIndex(i => (i + 1) % images.length);
        if (totalDx > 30) setIndex(i => (i - 1 + images.length) % images.length);
      }
      try { if (pointerCaptureRef.current) el.releasePointerCapture(pointerCaptureRef.current); } catch(err){}
      pointerCaptureRef.current = null;
      pointerId = null;
      draggingRef.current = false;
    };

    el.addEventListener('pointerdown', down, { passive: true });
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerup', up, { passive: true });
    el.addEventListener('pointercancel', up, { passive: true });

    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [images.length]);

  if (!images.length) return null;

  // determine sizing per current image: if in middleSet => 80%, else 100%
  const isMiddle = middleSet.has(images[index]);
  const imgStyle = isMiddle ? { maxWidth: '80vw', maxHeight: '80vh' } : { maxWidth: '95vw', maxHeight: '95vh' };

  return (
    <motion.div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex items-center justify-center" initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} ref={containerRef}>

        {/* Close X INSIDE image bounds */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close"
          className="absolute top-3 right-3 z-50 bg-black/60 hover:bg-black/70 p-2 rounded-md text-white"
          style={{ pointerEvents: 'auto' }}
        >
          <X />
        </button>

        {/* Left Arrow (desktop) */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIndex(i => (i - 1 + images.length) % images.length); }}
          aria-label="Previous"
          className="hidden md:flex absolute left-3 z-50 items-center justify-center h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white"
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronLeft />
        </button>

        {/* Right Arrow (desktop) */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIndex(i => (i + 1) % images.length); }}
          aria-label="Next"
          className="hidden md:flex absolute right-3 z-50 items-center justify-center h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white"
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronRight />
        </button>

        <div className="max-w-full max-h-[90vh] flex items-center justify-center rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 p-4">
          <WatermarkWrapper>
            <img src={images[index]} alt={`zoom-${index}`} className="object-contain" draggable={false} style={{ ...protectionStyles, ...imgStyle }} />
          </WatermarkWrapper>
        </div>

        {/* simple pager dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setIndex(i); }} className={`h-2 w-8 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`} type="button" />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- CERTIFICATIONS SECTION ---
const CERT_IMAGES = [
  'https://i.postimg.cc/rsxncdPk/65952225.jpg',
  'https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg',
  'https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg',
  'https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg',
  'https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg',
  'https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87_page_0001.jpg',
  'https://i.postimg.cc/BZKw2ynt/Google-Certification.png',
];

const ImageSlider = ({ images = CERT_IMAGES, speed = 60 }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomSrc, setZoomSrc] = useState(null);
  const duplicated = [...images, ...images];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastTime = 0;
    let rafId;
    const step = (ts) => {
      if (!lastTime) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;
      if (!isPaused) {
        el.scrollLeft += speed * dt;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [speed, isPaused]);

  const openGalleryForCerts = (src) => {
    const idx = images.indexOf(src);
    setZoomSrc({ start: idx });
  };

  return (
    <div className="w-full py-12">
      <div className="max-w-5xl mx-auto overflow-hidden">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-amber-400">Google Certifications</h3>
        <div 
          ref={containerRef}
          className="flex overflow-x-hidden gap-4 py-4 no-scrollbar"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicated.map((src, i) => (
            <motion.div 
              key={i} 
              className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 bg-neutral-800 rounded-xl overflow-hidden cursor-pointer border border-neutral-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => openGalleryForCerts(src)}
            >
              <img 
                src={src} 
                className="w-full h-full object-cover" 
                alt="Cert" 
                draggable={false}
                style={protectionStyles} 
              />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {zoomSrc && (
          <GalleryModal images={images} startIndex={zoomSrc.start} onClose={() => setZoomSrc(null)} middleSet={new Set()} certMode={true} />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- RESULTS LOGIC ---
function useAutoScrollResults(containerRef, { speed = 80, reverse = false, isPaused = false }) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastTime = 0;
    let rafId;
    const step = (ts) => {
      if (!lastTime) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;
      if (!isPaused) {
        const move = speed * dt;
        if (reverse) {
          el.scrollLeft -= move;
          if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2;
        } else {
          el.scrollLeft += move;
          if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [speed, reverse, isPaused]);
}

const BannerStrip = ({ images, reverse, onImageClick }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef(null);
  const holdResumeRef = useRef(null);

  const duplicated = [...images, ...images];
  useAutoScrollResults(containerRef, { speed: 100, reverse, isPaused });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let directionDetermined = false;
    let isHorizontal = false;
    let isDragging = false;
    let hasCapture = false;

    const clearResumeTimer = () => {
      if (resumeTimerRef.current) { clearTimeout(resumeTimerRef.current); resumeTimerRef.current = null; }
      if (holdResumeRef.current) { clearTimeout(holdResumeRef.current); holdResumeRef.current = null; }
    };

    const startResumeTimer = (ms = 3000) => {
      clearResumeTimer();
      resumeTimerRef.current = setTimeout(() => {
        setIsPaused(false);
        resumeTimerRef.current = null;
      }, ms);
    };

    const onPointerDown = (e) => {
      // if clicking buttons inside, ignore
      if (e.target.closest && e.target.closest('button')) return;
      if (pointerId !== null) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      lastX = startX;
      directionDetermined = false;
      isHorizontal = false;
      isDragging = true;
      setIsPaused(true);
      clearResumeTimer();
      // if user holds for 3s, resume auto-scroll even while still holding
      holdResumeRef.current = setTimeout(() => { setIsPaused(false); holdResumeRef.current = null; }, 3000);
      try { el.setPointerCapture(pointerId); hasCapture = true; } catch(err) { hasCapture = false; }
    };

    const onPointerMove = (e) => {
      if (!isDragging || e.pointerId !== pointerId) return;
      const dxTotal = e.clientX - startX;
      const dyTotal = e.clientY - startY;
      const dx = e.clientX - lastX;

      if (!directionDetermined) {
        if (Math.abs(dxTotal) > 6 || Math.abs(dyTotal) > 6) {
          directionDetermined = true;
          isHorizontal = Math.abs(dxTotal) > Math.abs(dyTotal);
        } else {
          return;
        }
      }

      if (isHorizontal) {
        e.preventDefault();
        el.scrollLeft -= dx;
        lastX = e.clientX;
      } else {
        if (hasCapture) { try { el.releasePointerCapture(pointerId); } catch(err){} hasCapture = false; }
        isDragging = false;
        pointerId = null;
      }
    };

    const onPointerUp = (e) => {
      if (pointerId !== e.pointerId && pointerId !== null) return;
      const totalDx = e.clientX - startX;
      const totalDy = e.clientY - startY;
      const isTap = Math.abs(totalDx) < 10 && Math.abs(totalDy) < 10;

      if (isTap) {
        const elAt = document.elementFromPoint(e.clientX, e.clientY);
        const card = elAt ? elAt.closest('[data-result-src]') : null;
        if (card) {
          const src = card.getAttribute('data-result-src');
          if (src) {
            setIsPaused(true);
            clearResumeTimer();
            onImageClick(src);
          }
        }
      }

      startResumeTimer(3000);

      if (pointerId !== null && hasCapture) { try { el.releasePointerCapture(pointerId); } catch(err){} hasCapture = false; }
      pointerId = null;
      isDragging = false;
      directionDetermined = false;
      isHorizontal = false;
    };

    const onMouseEnter = () => { setIsPaused(true); clearResumeTimer(); };
    const onMouseLeave = () => { startResumeTimer(3000); };

    el.addEventListener('pointerdown', onPointerDown, { passive: true });
    el.addEventListener('pointermove', onPointerMove, { passive: false });
    el.addEventListener('pointerup', onPointerUp, { passive: true });
    el.addEventListener('pointercancel', onPointerUp, { passive: true });
    el.addEventListener('lostpointercapture', onPointerUp, { passive: true });
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      clearResumeTimer();
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('lostpointercapture', onPointerUp);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };

  }, [onImageClick]);

  const handleImageClick = (src) => {
    setIsPaused(true);
    if (resumeTimerRef.current) { clearTimeout(resumeTimerRef.current); resumeTimerRef.current = null; }
    onImageClick(src);
  };

  return (
    <div 
      ref={containerRef}
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-auto no-scrollbar flex touch-pan-x select-none"
      style={{ scrollbarWidth: 'none', touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}
    >
      <div className="flex">
        {duplicated.map((src, i) => (
          <div key={i} className="w-screen md:w-[60vw] lg:w-[40vw] flex-shrink-0 px-2 md:px-4 py-4">
            <motion.div 
              data-result-src={src}
              className="w-full h-[250px] md:h-[400px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer shadow-2xl relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleImageClick(src)}
            >
              {/* Watermark + image */}
              <WatermarkWrapper>
                <img 
                  src={src} 
                  alt="Result" 
                  className="w-full h-full object-cover md:object-contain" 
                  draggable={false} 
                  style={protectionStyles}
                />
              </WatermarkWrapper>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MultiStripBanners = () => {
  const [zoomSrc, setZoomSrc] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const row1 = ["https://i.postimg.cc/C5GsYm88/11.png", "https://i.postimg.cc/wMXQH0N1/8.png", "https://i.postimg.cc/qqsx0jK6/10.png"];
  const row2 = ["https://i.postimg.cc/L5t3RNPm/1.png", "https://i.postimg.cc/D0rPFBGm/5.png", "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png", "https://i.postimg.cc/cCRBZX34/2.png", "https://i.postimg.cc/7h3nDmzH/4.png"];
  const row3 = ["https://i.postimg.cc/Zn8xZVNp/12.png", "https://i.postimg.cc/Xqfk3Q5G/9.png"];

  // combined gallery across all rows
  const combined = [...row1, ...row2, ...row3];
  const middleSet = new Set(row2);

  // onImageClick open gallery with all images, start at clicked index
  const onOpenFromStrip = (src) => {
    const idx = combined.indexOf(src);
    if (idx !== -1) {
      setGalleryImages(combined);
      setZoomSrc({ start: idx });
    } else {
      setGalleryImages([src]);
      setZoomSrc({ start: 0 });
    }
  };

  return (
    <div className="space-y-4 md:space-y-8">
      <BannerStrip images={row1} reverse={false} onImageClick={onOpenFromStrip} />
      <BannerStrip images={row2} reverse={true} onImageClick={onOpenFromStrip} />
      <BannerStrip images={row3} reverse={false} onImageClick={onOpenFromStrip} />
      <AnimatePresence>
        {zoomSrc && (
          <GalleryModal images={galleryImages} startIndex={zoomSrc.start} onClose={() => { setZoomSrc(null); setGalleryImages([]); }} middleSet={middleSet} />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Services Modal ---
function ServicesModal({ onClose }) {
  const servicesList = [
    { title: 'Startup', icon: <BarChart2 size={48} />, link: 'https://docs.google.com/forms/d/e/1FAIpQLSdEBwP65M40klTsS3_3eez_y8Sjj5lbLI276pYZ1omnuF2ZVQ/viewform' },
    { title: 'Scale', icon: <LineChart size={48} />, link: 'https://docs.google.com/forms/d/e/1FAIpQLSfpnHDVpZeI_7Q5srnURXlnPzfLUhuyiPzptUeqj77uyeeRVg/viewform' },
  ];
  return (
    <motion.div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="bg-neutral-900 p-8 rounded-2xl w-full max-w-4xl" initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">For E-Commerce</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {servicesList.map(({ title, icon, link }, index) => (
            <motion.div key={index} className="bg-neutral-800 rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-teal-500/20 transition-all cursor-pointer" whileHover={{ y: -5 }}>
              <div className="text-teal-400 mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-4">{title}</h3>
              <a href={link} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="bg-teal-500 w-full text-white hover:bg-teal-600">Start</Button>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Portfolio ---
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showServices, setShowServices] = useState(false);
  const sectionRefs = { home: useRef(null), skills: useRef(null), projects: useRef(null) };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-30% 0px -70% 0px' }
    );
    Object.values(sectionRefs).forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  return (
    <div 
        className="bg-neutral-950 text-white min-h-screen font-sans antialiased relative overflow-x-hidden"
        onContextMenu={(e) => e.preventDefault()} 
        style={protectionStyles}
    >
      {/* RESTORED ORIGINAL STARRY BACKGROUND (old look) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-60"></div>
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0))
            `,
            backgroundSize: '200px 200px'
          }}
        ></div>
      </div>

      <Navbar activeSection={activeSection} />
      
      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        {/* Hero */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[120px] rounded-full -z-10" />
          
          <motion.img 
            src={personalInfo.profileImage} 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6 shadow-[0_0_20px_rgba(20,184,166,0.3)]" 
            draggable="false"
          />
          <motion.h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Abdullah Rashid<br /> Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Growth</span> Partner.
          </motion.h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-8">{personalInfo.title}</p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-[0_0_15px_rgba(20,184,166,0.4)]" onClick={() => setShowServices(true)}>Start Here</Button>
        </section>

        <SocialCircle />
        <ImageSlider />

        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills">
          <div className="flex flex-wrap justify-center gap-3">
            {skillsData.map((skill, i) => (
              <motion.div key={i} className="bg-neutral-800/60 backdrop-blur-md text-neutral-300 px-4 py-2 rounded-full text-sm font-medium border border-neutral-700">{skill}</motion.div>
            ))}
          </div>
        </SectionWrapper>
        
        {/* Results Section with Watermark applied */}
        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Results">
          <MultiStripBanners />
        </SectionWrapper>

        <div className="text-center mt-20">
          <GraduationCap className="mx-auto text-amber-400 mb-4" size={40} />
          <p className="text-neutral-300">Bachelor of Business Administration from Ain Shams University.</p>
        </div>
      </main>

      <footer className="relative z-10 text-center py-12 border-t border-neutral-800/50 bg-neutral-950/50 backdrop-blur-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href={personalInfo.linkedin} className="text-neutral-500 hover:text-teal-400 transition-colors"><Linkedin /></a>
          <a href={personalInfo.whatsapp} className="text-neutral-500 hover:text-green-500 transition-colors"><Phone /></a>
          <a href={personalInfo.tiktok} className="text-neutral-500 hover:text-pink-500 transition-colors"><SiTiktok /></a>
        </div>
        <p className="text-neutral-500 text-sm">
          © 2022 - {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
        </p>
      </footer>
      <ScrollToTopButton />
      <AnimatePresence>{showServices && <ServicesModal onClose={() => setShowServices(false)} />}</AnimatePresence>
    </div>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 bg-teal-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-teal-400 transition-colors">
      <ArrowUp size={24} />
    </button>
  );
}
