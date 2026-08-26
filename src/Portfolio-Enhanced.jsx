// Portfolio.jsx — simplified version
// - Removed duplicate/broken WatermarkWrapper (the original file declared it twice
//   and had a raw "//" comment inside JSX, which is invalid and would crash the build).
// - Removed unused icon imports.
// - Replaced the complex pointer-capture / requestAnimationFrame auto-scroll strips
//   with a simple CSS-only marquee for certifications and a plain responsive grid
//   for Results. Same visual idea (auto-scrolling logos, clickable results grid),
//   far less code and nothing that can desync state or leak event listeners.
// - Simplified the image modal to basic prev/next/close/keyboard, no drag logic.
// - window.pageYOffset (deprecated) replaced with window.scrollY.

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Linkedin, Phone, ChevronLeft, ChevronRight, ArrowUp, GraduationCap } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import SocialCircle from '../src/components/SocialCircle.jsx';

// --- Basic anti-copy styling (best-effort only; not real protection) ---
const noSelect = { userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' };

// --- Watermark ---
function Watermark({ children }) {
  return (
    <div className="relative overflow-hidden">
      {children}
      <div
        className="absolute inset-[-30%] rotate-[-45deg] flex flex-wrap gap-10 items-center justify-center pointer-events-none select-none opacity-25"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-white/40 text-sm font-semibold whitespace-nowrap">
            {personalInfo.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- Simple UI primitives ---
const Button = ({ children, className = '', ...props }) => (
  <button className={`px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${className}`} {...props}>
    {children}
  </button>
);

// --- Content ---
const personalInfo = {
  name: 'Abdullah Rashid',
  title: 'E-Com Media Buyer | Shopify Developer | Google Certified Digital Marketer & E-commerce Expert',
  linkedin: 'https://www.linkedin.com/in/abdullah-rashid4444/',
  whatsapp: 'https://wa.me/201025030220',
  profileImage: 'https://i.postimg.cc/2574Ss9d/9c10a25ab53cc9bdf0a8fc20082d0868-tplv-tiktokx-cropcenter-1080-1080.jpg',
  tiktok: 'https://www.tiktok.com/@abdallah_rashidx',
};

const sections = [
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Results' },
];

const skillsData = [
  'Problem Solver', 'Meta Ads', 'TikTok Ads', 'Google Ads',
  'Conversion Rate Optimization', 'Business Consultant', 'Copywriting', 'Shopify Developer',
];

const CERT_IMAGES = [
  'https://i.postimg.cc/rsxncdPk/65952225.jpg',
  'https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg',
  'https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg',
  'https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg',
  'https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg',
  'https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87_page_0001.jpg',
  'https://i.postimg.cc/BZKw2ynt/Google-Certification.png',
];

const RESULT_IMAGES = [
  'https://i.postimg.cc/C5GsYm88/11.png',
  'https://i.postimg.cc/wMXQH0N1/8.png',
  'https://i.postimg.cc/qqsx0jK6/10.png',
  'https://i.postimg.cc/L5t3RNPm/1.png',
  'https://i.postimg.cc/D0rPFBGm/5.png',
  'https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png',
  'https://i.postimg.cc/cCRBZX34/2.png',
  'https://i.postimg.cc/7h3nDmzH/4.png',
  'https://i.postimg.cc/Zn8xZVNp/12.png',
  'https://i.postimg.cc/Xqfk3Q5G/9.png',
];

// --- Section wrapper ---
const SectionWrapper = React.forwardRef(({ id, title, children }, ref) => (
  <motion.section
    ref={ref}
    id={id}
    className="py-20 md:py-28"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">{title}</span>
    </h2>
    {children}
  </motion.section>
));

// --- Navbar ---
function Navbar({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral-950/70 backdrop-blur-lg z-50 border-b border-neutral-800/50">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <a href="#home" className="text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors">
          {personalInfo.name}
        </a>
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
        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen((v) => !v)} aria-label="Toggle menu">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- Simple full-screen image modal (prev/next/close/keyboard, no drag) ---
function ImageModal({ images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => setIndex(startIndex), [startIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  if (!images.length) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-md text-white"
        >
          <X />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous"
              className="hidden md:flex absolute left-[-56px] z-10 h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              aria-label="Next"
              className="hidden md:flex absolute right-[-56px] z-10 h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white"
            >
              <ChevronRight />
            </button>
          </>
        )}

        <div className="rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 p-4">
          <Watermark>
            <img
              src={images[index]}
              alt={`View ${index + 1} of ${images.length}`}
              className="max-w-[85vw] max-h-[80vh] object-contain"
              draggable={false}
              style={noSelect}
            />
          </Watermark>
        </div>
      </div>
    </motion.div>
  );
}

// --- Certifications: CSS-only marquee (no JS animation loop needed) ---
function CertificationsMarquee({ images = CERT_IMAGES }) {
  const [zoomIndex, setZoomIndex] = useState(null);
  const track = [...images, ...images]; // duplicated for seamless loop

  return (
    <div className="w-full py-12">
      <div className="max-w-5xl mx-auto overflow-hidden">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-amber-400">Google Certifications</h3>
        <div className="marquee-track flex gap-4 py-4">
          {track.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setZoomIndex(i % images.length)}
              className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700"
            >
              <img src={src} className="w-full h-full object-cover" alt="Certification" draggable={false} style={noSelect} />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {zoomIndex !== null && <ImageModal images={images} startIndex={zoomIndex} onClose={() => setZoomIndex(null)} />}
      </AnimatePresence>
      <style>{`
        .marquee-track {
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}

// --- Results: plain responsive grid, click to zoom ---
function ResultsGrid({ images = RESULT_IMAGES }) {
  const [zoomIndex, setZoomIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((src, i) => (
        <motion.button
          key={i}
          type="button"
          onClick={() => setZoomIndex(i)}
          whileHover={{ scale: 1.02 }}
          className="h-64 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-lg"
        >
          <Watermark>
            <img src={src} alt={`Result ${i + 1}`} className="w-full h-full object-cover" draggable={false} style={noSelect} />
          </Watermark>
        </motion.button>
      ))}
      <AnimatePresence>
        {zoomIndex !== null && <ImageModal images={images} startIndex={zoomIndex} onClose={() => setZoomIndex(null)} />}
      </AnimatePresence>
    </div>
  );
}

// --- Services modal ---
function ServicesModal({ onClose }) {
  const servicesList = [
    { title: 'Startup', link: 'https://docs.google.com/forms/d/e/1FAIpQLSdEBwP65M40klTsS3_3eez_y8Sjj5lbLI276pYZ1omnuF2ZVQ/viewform' },
    { title: 'Scale', link: 'https://docs.google.com/forms/d/e/1FAIpQLSfpnHDVpZeI_7Q5srnURXlnPzfLUhuyiPzptUeqj77uyeeRVg/viewform' },
  ];
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-neutral-900 p-8 rounded-2xl w-full max-w-2xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">For E-Commerce</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {servicesList.map(({ title, link }) => (
            <div key={title} className="bg-neutral-800 rounded-lg p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-4">{title}</h3>
              <a href={link} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="bg-teal-500 w-full text-white hover:bg-teal-600">Start</Button>
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 bg-teal-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-teal-400 transition-colors"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}

// --- Main Portfolio ---
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showServices, setShowServices] = useState(false);
  const sectionRefs = { home: useRef(null), skills: useRef(null), projects: useRef(null) };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-30% 0px -70% 0px' }
    );
    Object.values(sectionRefs).forEach((ref) => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans antialiased relative" onContextMenu={(e) => e.preventDefault()} style={noSelect}>
      <Navbar activeSection={activeSection} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        {/* Hero */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center">
          <motion.img
            src={personalInfo.profileImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6"
            draggable={false}
          />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            {personalInfo.name}
            <br />
            Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Growth</span> Partner.
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-8">{personalInfo.title}</p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white" onClick={() => setShowServices(true)}>
            Start Here
          </Button>
        </section>

        <SocialCircle />
        <CertificationsMarquee />

        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills">
          <div className="flex flex-wrap justify-center gap-3">
            {skillsData.map((skill) => (
              <div key={skill} className="bg-neutral-800/60 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium border border-neutral-700">
                {skill}
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Results">
          <ResultsGrid />
        </SectionWrapper>

        <div className="text-center mt-20">
          <GraduationCap className="mx-auto text-amber-400 mb-4" size={40} />
          <p className="text-neutral-300">Bachelor of Business Administration from Ain Shams University.</p>
        </div>
      </main>

      <footer className="relative z-10 text-center py-12 border-t border-neutral-800/50 bg-neutral-950/50">
        <div className="flex justify-center gap-6 mb-4">
          <a href={personalInfo.linkedin} className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-teal-400 hover:bg-neutral-800">
            <Linkedin size={20} />
          </a>
          <a href={personalInfo.whatsapp} className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-green-500 hover:bg-neutral-800">
            <Phone size={20} />
          </a>
          <a href={personalInfo.tiktok} className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-pink-500 hover:bg-neutral-800">
            <SiTiktok size={18} />
          </a>
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
