import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, User, Briefcase, Star, Folder, Menu, X, Send, Linkedin, Phone,
  Award, Target, Megaphone, ShoppingCart, UserCheck, Building, LineChart,
  Camera, GraduationCap, ArrowRight, Palette, Code, BarChart3,
  Tiktok, Instagram, Dribbble, Twitter, ArrowUp,
  ShoppingCart as IconShopify,
  HelpCircle,
  Users,
  Layers,
  BarChart2,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion';

// Import SocialCircle component (keep your original path)
import SocialCircle from '../src/components/SocialCircle.jsx';

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
  title: "Media Buyer | Shopify Developer | Google Certificated Digital Marketer & E-commerce expert",
  linkedin: "https://www.linkedin.com/in/abdullah-rashid4444/",
  whatsapp: "http://wa.me/+201025030220",
  profileImage: "https://i.postimg.cc/RFmtpNSy/Abdullah-Rashid.jpg",
};

// --- Sections ---
const sections = [
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Results" },
];

// --- Skills Data ---
const skillsData = [
  "Problems-Solver", "Meta Ads", "TikTok Ads", "Google Ads", "Conversion Rate Optimization", "Business Consultant", "Copywriting", "Shopify Developer",
];

// --- Animated Counter (kept) ---
const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useSpring(0, { stiffness: 50, damping: 30 });

  const formattedValue = useTransform(
    motionValue,
    (latest) => `£${Math.round(latest).toLocaleString()}+`
  );

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{formattedValue}</motion.span>;
};

// --- Section Wrapper (kept) ---
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

// --- Navbar (kept) ---
const Navbar = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral-950/70 backdrop-blur-lg z-50 border-b border-neutral-800/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <a href="#home" className="text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors">{personalInfo.name}</a>
        <div className="hidden md:flex gap-8 items-center">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={`font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}
            >
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
                <a key={sec.id} href={`#${sec.id}`} onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}>{sec.title}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- ScrollToTop (kept) ---
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  if (!visible) return null;
  return (
    <button aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition opacity-80 hover:opacity-100 z-50">
      <ArrowUp size={24} />
    </button>
  );
}

// --- Modal backdrop used by zooms ---
const ModalBackdrop = ({ children, onClose }) => (
  <motion.div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.div className="bg-neutral-900 rounded-lg shadow-xl max-w-[95vw] w-full max-h-[95vh] overflow-auto p-4 relative" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
      <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 text-neutral-400 hover:text-white"><X /></button>
      {children}
    </motion.div>
  </motion.div>
);

// -------------------------
// X Google slider (kept as before)
// -------------------------
const DEFAULT_IMAGES = [
  'https://i.postimg.cc/rsxncdPk/65952225.jpg',
  'https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg',
  'https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg',
  'https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg',
  'https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg',
  'https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87_page_0001.jpg',
  'https://i.postimg.cc/BZKw2ynt/Google-Certification.png',
  'https://i.postimg.cc/rsxncdPk/65952225.jpg',
];

function useAutoScroll(containerRef, { speed = 60, playing = true, pauseRef }) {
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function step(ts) {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000;
      lastTimeRef.current = ts;
      if (playing && (!pauseRef?.current)) {
        const distance = speed * dt;
        el.scrollLeft += distance;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = el.scrollLeft - el.scrollWidth / 2;
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastTimeRef.current = null; };
  }, [containerRef, speed, playing, pauseRef]);
}

const ImageZoomModal = ({ src, onClose }) => (
  <ModalBackdrop onClose={onClose}>
    <div className="flex justify-center items-center">
      <img src={src} alt="zoom" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg" />
    </div>
  </ModalBackdrop>
);

const ImageSlider = ({ images = DEFAULT_IMAGES, speed = 60 }) => {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const pauseRef = useRef(false);
  const [zoomSrc, setZoomSrc] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isTouchRef = useRef(false);
  const pointerStartRef = useRef(null);

  const duplicated = [...images, ...images];
  useAutoScroll(containerRef, { speed, playing: isPlaying, pauseRef });

  useEffect(() => { isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0; }, []);
  useEffect(() => { pauseRef.current = hoveredIndex !== null; }, [hoveredIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onPointerDown = (e) => { pointerStartRef.current = { x: e.clientX, y: e.clientY }; pauseRef.current = true; };
    const onPointerUp = (e) => { pauseRef.current = false; };
    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    return () => { el.removeEventListener('pointerdown', onPointerDown); window.removeEventListener('pointerup', onPointerUp); };
  }, []);

  const handlePointerUpOnItem = (e, src) => {
    const start = pointerStartRef.current;
    const end = { x: e.clientX, y: e.clientY };
    const dx = Math.abs((start?.x || 0) - end.x);
    const dy = Math.abs((start?.y || 0) - end.y);
    const moved = Math.sqrt(dx * dx + dy * dy);
    if (moved < 8) setZoomSrc(src);
    pauseRef.current = false;
  };

  const hideScrollbarCSS = `
    .no-scrollbar::-webkit-scrollbar { display: none; height: 0; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  return (
    <div className="w-full py-8">
      <style>{hideScrollbarCSS}</style>
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-amber-400">X Google</h3>
        <div className="relative">
          <div ref={containerRef} className="overflow-x-auto no-scrollbar touch-pan-x will-change-scroll flex gap-3 items-center py-4 px-2">
            {duplicated.map((src, i) => {
              const originalIndex = i % images.length;
              return (
                <div key={i} data-slider-item data-original-index={originalIndex} className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 p-1">
                  <div
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onPointerDown={(e) => { pointerStartRef.current = { x: e.clientX, y: e.clientY }; pauseRef.current = true; }}
                    onPointerUp={(e) => handlePointerUpOnItem(e, src)}
                    className={`w-full h-28 sm:h-32 md:h-40 lg:h-44 bg-neutral-800 rounded-lg overflow-hidden border border-neutral-800 cursor-pointer transition-transform duration-300 ${hoveredIndex === i ? 'scale-105 z-20' : ''}`}
                    style={{ transformOrigin: 'center center' }}
                  >
                    <img src={src} alt={`Slide ${originalIndex + 1}`} className="w-full h-full object-cover block" loading="lazy" decoding="async" onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {zoomSrc && <ImageZoomModal src={zoomSrc} onClose={() => setZoomSrc(null)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

// -------------------------
// Multi-strip full-width banners (NEW requested behavior)
// -------------------------

/*
  IMPORTANT: Put your 12 image links here (row1: 0..3, row2: 4..7, row3: 8..11)
*/
const BANNER_IMAGES = [
  // Row 1
  "https://i.postimg.cc/BZKw2ynt/Google-Certification.png",
  "https://i.postimg.cc/rsxncdPk/65952225.jpg",
  "https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg",
  "https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg",
  // Row 2
  "https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg",
  "https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg",
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87_page_0001.jpg",
  "https://i.postimg.cc/BZKw2ynt/Google-Certification.png",
  // Row 3
  "https://i.postimg.cc/rsxncdPk/65952225.jpg",
  "https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg",
  "https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg",
  "https://i.postimg.cc/BZKw2ynt/Google-Certification.png",
];

function useAutoScrollStrip(containerRef, { speed = 80, reverse = false, playing = true, pauseRef }) {
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function step(ts) {
      if (!lastRef.current) lastRef.current = ts;
      const dt = (ts - lastRef.current) / 1000;
      lastRef.current = ts;
      if (playing && (!pauseRef?.current)) {
        const distance = speed * dt;
        if (reverse) {
          el.scrollLeft -= distance;
          if (el.scrollLeft <= 0) el.scrollLeft = el.scrollLeft + el.scrollWidth / 2;
        } else {
          el.scrollLeft += distance;
          if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = el.scrollLeft - el.scrollWidth / 2;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastRef.current = null; };
  }, [containerRef, speed, reverse, playing, pauseRef]);
}

const BannerStrip = ({ images = [], reverse = false, playing = true, globalPauseRef }) => {
  const ref = useRef(null);
  const isTouchRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const pauseRef = useRef(false);
  const pointerStartRef = useRef(null);
  const [zoomSrc, setZoomSrc] = useState(null);

  // duplicated array for seamless effect
  const duplicated = [...images, ...images];

  useEffect(() => { isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0; }, []);
  useEffect(() => { pauseRef.current = !!(hoveredIndex !== null || globalPauseRef.current === true); }, [hoveredIndex, globalPauseRef]);

  useAutoScrollStrip(ref, { speed: 70, reverse, playing, pauseRef });

  // pointer down/up to determine drag vs tap
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onPointerDown = (e) => { pointerStartRef.current = { x: e.clientX, y: e.clientY }; pauseRef.current = true; };
    const onPointerUp = (e) => { pauseRef.current = !!(hoveredIndex !== null || globalPauseRef.current === true); };
    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    return () => { el.removeEventListener('pointerdown', onPointerDown); window.removeEventListener('pointerup', onPointerUp); };
  }, [hoveredIndex, globalPauseRef]);

  const handlePointerUpOnItem = (e, src) => {
    const start = pointerStartRef.current;
    const end = { x: e.clientX, y: e.clientY };
    const dx = Math.abs((start?.x || 0) - end.x);
    const dy = Math.abs((start?.y || 0) - end.y);
    const moved = Math.sqrt(dx*dx + dy*dy);
    if (moved < 8) setZoomSrc(src);
    pauseRef.current = !!(hoveredIndex !== null || globalPauseRef.current === true);
  };

  const hideScrollbarCSS = `
    .no-scrollbar::-webkit-scrollbar { display: none; height: 0; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  return (
    <>
      <style>{hideScrollbarCSS}</style>
      <div className="w-full overflow-hidden">
        <div ref={ref} className="flex gap-0 no-scrollbar" onMouseLeave={() => setHoveredIndex(null)}>
          {duplicated.map((src, i) => {
            // per-item index inside the duplicated array
            return (
              <div key={i} className="flex-shrink-0 w-1/2 md:w-1/3 p-0" data-slider-item>
                <div
                  onMouseEnter={() => { if (!isTouchRef.current) setHoveredIndex(i); }}
                  onMouseLeave={() => { if (!isTouchRef.current) setHoveredIndex(null); }}
                  onPointerDown={(e) => { pointerStartRef.current = { x: e.clientX, y: e.clientY }; pauseRef.current = true; }}
                  onPointerUp={(e) => handlePointerUpOnItem(e, src)}
                  className={`w-full md:h-[320px] h-[180px] overflow-hidden relative cursor-pointer transition-transform duration-300`}
                  style={{ touchAction: 'pan-y' }}
                >
                  <img src={src} alt={`banner-${i}`} className={`w-full h-full object-cover transform transition-transform duration-300 ${hoveredIndex === i ? 'scale-105' : ''}`} loading="lazy" decoding="async" onError={(e)=>{ e.target.src = 'https://placehold.co/1200x600?text=No+Image'; }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {zoomSrc && (
          <ModalBackdrop onClose={() => setZoomSrc(null)}>
            <div className="flex justify-center items-center">
              <motion.img src={zoomSrc} alt="zoom" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-lg" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} />
            </div>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </>
  );
};

const MultiStripBanners = ({ images = BANNER_IMAGES }) => {
  // split into 3 strips of 4 images each
  const strip1 = images.slice(0,4);
  const strip2 = images.slice(4,8);
  const strip3 = images.slice(8,12);

  return (
    // breakout container: stretches full viewport width
    <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-neutral-950 py-8">
      <div className="max-w-screen mx-auto space-y-6">
        {/* Row1: reverse (move opposite) */}
        <BannerStrip images={strip1} reverse={true} playing={true} globalPauseRef={{ current: false }} />
        {/* Row2: normal */}
        <BannerStrip images={strip2} reverse={false} playing={true} globalPauseRef={{ current: false }} />
        {/* Row3: reverse */}
        <BannerStrip images={strip3} reverse={true} playing={true} globalPauseRef={{ current: false }} />
      </div>
    </div>
  );
};

// --- Main Portfolio Component ---
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showServices, setShowServices] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: '-30% 0px -70% 0px' });
    Object.values(sectionRefs).forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans antialiased relative">
      <Navbar activeSection={activeSection} />

      <main className="max-w-5xl mx-auto px-4 pb-24">
        {/* Hero */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:32px_32px]" />
          <motion.img src={personalInfo.profileImage} alt="Profile" initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.8 }} className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6" />
          <motion.h1 initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Abdullah Rashid<br />
            Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Growth</span> Partner.
          </motion.h1>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2 }} className="text-lg md:text-xl text-neutral-300 mb-8">{personalInfo.title}</motion.p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg" onClick={() => setShowServices(true)}>Start Here</Button>
        </section>

        {/* Social */}
        <SocialCircle />

        {/* X Google (original slider) */}
        <ImageSlider />

        {/* Skills */}
        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skillsData.map((skill, i) => (
              <motion.div key={i} initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.3, delay: i*0.05 }} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium">{skill}</motion.div>
            ))}
          </div>
        </SectionWrapper>

      </main>

      {/* Multi-strip full width RESULTS (placed under skills visually) */}
      <MultiStripBanners />

      {/* Continue main content (achievements etc.) */}
      <main className="max-w-5xl mx-auto px-4 pb-24">
        <SectionWrapper id="achievements" title="Key Achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-center">
            <Card><CardContent><h3 className="text-2xl font-bold text-amber-400 mb-2">Total Ad Spend Managed</h3><p className="text-5xl font-mono font-bold text-white flex justify-center"><AnimatedCounter value={5000000} /></p></CardContent></Card>
            <Card><CardContent><h3 className="text-2xl font-bold text-teal-400 mb-2">Average ROAS Generated</h3><p className="text-5xl font-mono font-bold text-white">8x - 25x</p></CardContent></Card>
          </div>
        </SectionWrapper>

        {/* Education block */}
        <div className="grid md:grid-cols-1 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center max-w-md mx-auto">
            <GraduationCap className="mx-auto text-amber-400 mb-4" size={40} />
            <p className="text-neutral-300 leading-relaxed">Bachelor of Business Administration from Ain Shams University.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 mt-16 border-t border-neutral-800/50">
        <div className="flex justify-center gap-6 mb-4">
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-teal-400 transition-colors"><Linkedin /></a>
          <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-green-500 transition-colors"><Phone /></a>
        </div>
        <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
      </footer>

      <ScrollToTopButton />

      <AnimatePresence>
        {showServices && <ModalBackdrop onClose={() => setShowServices(false)}><ServicesModal onClose={() => setShowServices(false)} /></ModalBackdrop>}
      </AnimatePresence>
    </div>
  );
}
