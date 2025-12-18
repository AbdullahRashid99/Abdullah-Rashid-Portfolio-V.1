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
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';
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

// --- Animated Counter ---
const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useSpring(0, { stiffness: 50, damping: 30 });
  const [display, setDisplay] = useState('£0');

  useEffect(() => {
    const unsub = motionValue.onChange(latest => {
      setDisplay(`£${Math.round(latest).toLocaleString()}+`);
    });
    if (isInView) motionValue.set(value);
    return () => unsub && unsub();
  }, [isInView, value, motionValue]);

  return <span ref={ref}>{display}</span>;
};

// --- Modal Backdrop / Image Zoom Modal ---
const ModalBackdrop = ({ children, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="bg-neutral-900 rounded-lg shadow-xl max-w-4xl w-full max-h-full overflow-auto p-6 relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onClick={e => e.stopPropagation()}
    >
      {children}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute top-3 right-3 text-neutral-400 hover:text-white transition"
      >
        <X size={28} />
      </button>
    </motion.div>
  </motion.div>
);

// --- Services Modal ---
const servicesList = [
  { title: 'Startup', icon: <BarChart2 size={48} />, link: 'https://docs.google.com/forms/d/e/1FAIpQLSdEBwP65M40klTsS3_3eez_y8Sjj5lbLI276pYZ1omnuF2ZVQ/viewform' },
  { title: 'Scale', icon: <LineChart size={48} />, link: 'https://docs.google.com/forms/d/e/1FAIpQLSfpnHDVpZeI_7Q5srnURXlnPzfLUhuyiPzptUeqj77uyeeRVg/viewform' },
];

function ServicesModal({ onClose }) {
  return (
    <ModalBackdrop onClose={onClose}>
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">What do you need help with?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {servicesList.map(({ title, icon, link }, index) => (
          <motion.div key={index} className="bg-neutral-800 rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-teal-500 transition-shadow cursor-pointer" whileHover={{ scale: 1.05 }}>
            <div className="text-teal-400 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <a href={link} target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
              <Button className="bg-teal-500 w-full text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition">Start</Button>
            </a>
          </motion.div>
        ))}
      </div>
    </ModalBackdrop>
  );
}

// --- ImageZoomModal ---
const ImageZoomModal = ({ src, onClose }) => (
  <ModalBackdrop onClose={onClose}>
    <div className="flex justify-center items-center">
      <img src={src} alt="zoom" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg" />
    </div>
  </ModalBackdrop>
);

// --- BANNER_IMAGES ---
const BANNER_IMAGES = [
  // Row 1 (0..3)
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  // Row 2 (4..7)
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://placehold.co/800x600?text=7",
  "https://placehold.co/800x600?text=8",
  // Row 3 (8..11)
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://placehold.co/800x600?text=10",
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://placehold.co/800x600?text=12",
];

// --- useAutoScrollStrip Hook ---
function useAutoScrollStrip(containerRef, { speed = 100, reverse = false, playing = true, pauseRef }) {
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
          if (el.scrollLeft <= 0) {
            el.scrollLeft = el.scrollLeft + el.scrollWidth / 2;
          }
        } else {
          el.scrollLeft += distance;
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft = el.scrollLeft - el.scrollWidth / 2;
          }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [containerRef, speed, reverse, playing, pauseRef]);
}

// --- BannerStrip Component ---
const BannerStrip = ({
  images = [],
  reverse = false,
  playing = true,
  globalPauseRef,
}) => {
  const ref = useRef(null);
  const isTouchRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const pauseRef = useRef(false);
  const pointerStartRef = useRef(null);
  const [zoomSrc, setZoomSrc] = useState(null);
  const duplicated = [...images, ...images];

  useEffect(() => {
    isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  useEffect(() => {
    pauseRef.current = !!(hoveredIndex !== null || globalPauseRef.current === true);
  }, [hoveredIndex, globalPauseRef]);

  useAutoScrollStrip(ref, { speed: 60, reverse, playing, pauseRef });

  const handlePointerUpOnItem = (e, src) => {
    const start = pointerStartRef.current;
    const end = { x: e.clientX, y: e.clientY };
    const dx = Math.abs((start?.x || 0) - end.x);
    const dy = Math.abs((start?.y || 0) - end.y);
    const moved = Math.sqrt(dx * dx + dy * dy);
    if (moved < 8) {
      setZoomSrc(src);
    }
    pauseRef.current = !!(hoveredIndex !== null || globalPauseRef.current === true);
  };

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="w-screen overflow-hidden">
        <div
          ref={ref}
          className="flex gap-0 no-scrollbar"
          onMouseLeave={() => {
            if (!isTouchRef.current) setHoveredIndex(null);
          }}
        >
          {duplicated.map((src, i) => {
            const originalIndex = i % images.length;
            const isThisHovered = hoveredIndex === originalIndex;
            return (
              <div key={i} className="flex-shrink-0 w-1/4 p-0">
                <div
                  onPointerDown={(e) => {
                    pointerStartRef.current = { x: e.clientX, y: e.clientY };
                    pauseRef.current = true;
                  }}
                  onPointerUp={(e) => handlePointerUpOnItem(e, src)}
                  onMouseEnter={() => {
                    if (!isTouchRef.current) setHoveredIndex(originalIndex);
                  }}
                  onMouseLeave={() => {
                    if (!isTouchRef.current) setHoveredIndex(null);
                  }}
                  className={`w-full h-[200px] overflow-hidden relative cursor-pointer transition-transform duration-300`}
                >
                  <img
                    src={src}
                    alt={`banner-${originalIndex}`}
                    className={`w-full h-full object-cover transform transition-transform duration-300 ${
                      isThisHovered ? 'scale-105 z-20' : ''
                    }`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/1200x600?text=No+Image';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {zoomSrc && (
          <ImageZoomModal src={zoomSrc} onClose={() => setZoomSrc(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

// --- MultiStripBanners Component ---
const MultiStripBanners = ({ images = BANNER_IMAGES }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const globalPauseRef = useRef(false);

  useEffect(() => {
    globalPauseRef.current = !isPlaying;
  }, [isPlaying]);

  const strip1 = images.slice(0, 4);
  const strip2 = images.slice(4, 8);
  const strip3 = images.slice(8, 12);

  return (
    <div className="w-screen overflow-hidden">
      <div className="flex items-center justify-end px-6 mb-4">
        <Button
          onClick={() => setIsPlaying((p) => !p)}
          className="bg-neutral-800 text-white px-3 py-2"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
      {/* Row 1: Right to Left */}
      <BannerStrip
        images={strip1}
        reverse={true}
        playing={isPlaying}
        globalPauseRef={globalPauseRef}
      />
      {/* Row 2: Left to Right */}
      <BannerStrip
        images={strip2}
        reverse={false}
        playing={isPlaying}
        globalPauseRef={globalPauseRef}
      />
      {/* Row 3: Right to Left */}
      <BannerStrip
        images={strip3}
        reverse={true}
        playing={isPlaying}
        globalPauseRef={globalPauseRef}
      />
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
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-30% 0px -70% 0px' }
    );
    Object.values(sectionRefs).forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans antialiased relative">
      <Navbar activeSection={activeSection} />
      <main className="max-w-5xl mx-auto px-4 pb-24">
        {/* Hero Section */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:32px_32px]" />
          <motion.img
            src={personalInfo.profileImage}
            alt="Profile Picture of Abdullah Rashid"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6"
            onError={(e) => {
              e.target.src = "https://placehold.co/128x128/334155/E2E8F0?text=AR";
              e.target.alt = "Placeholder image with initials AR";
            }}
          />
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Abdullah Rashid<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Your Growth Partner.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg md:text-xl text-neutral-300 mb-8">
            {personalInfo.title}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30" onClick={() => setShowServices(true)} type="button">
              Start Here
            </Button>
          </motion.div>
        </section>

        {/* Social Circle Component */}
        <SocialCircle />

        {/* Skills Section */}
        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skillsData.map((skill, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium">
                {skill}
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Achievements Section */}
        <SectionWrapper id="achievements" title="Key Achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-center">
            <Card>
              <CardContent>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">Total Ad Spend Managed</h3>
                <p className="text-5xl font-mono font-bold text-white flex justify-center"><AnimatedCounter value={5000000} /></p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="text-2xl font-bold text-teal-400 mb-2">Average ROAS Generated</h3>
                <p className="text-5xl font-mono font-bold text-white">8x - 25x</p>
                <div className="flex justify-center items-end gap-2 mt-4 h-16">
                  <motion.div initial={{ height: 0 }} whileInView={{ height: '25%' }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-12 bg-neutral-700 rounded-t-sm flex items-end justify-center"><span className="text-xs -mb-5">Spend</span></motion.div>
                  <motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="w-12 bg-gradient-to-t from-teal-500 to-sky-400 rounded-t-sm flex items-end justify-center"><span className="text-xs -mb-5">Return</span></motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionWrapper>

        {/* RESULTS Section - full width moving grid */}
        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Results">
          <MultiStripBanners images={BANNER_IMAGES} />
          <p className="text-sm text-neutral-400 mt-4 text-center max-w-2xl mx-auto">
            Hover a single image to pause its row and apply a light zoom. Tap/click to open image modal. Replace the placeholder image links in <code>BANNER_IMAGES</code> with your 12 image URLs (4 per row).
          </p>
        </SectionWrapper>

        {/* Additional Content (education block) */}
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
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-teal-400 transition-colors">
            <Linkedin />
          </a>
          <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-green-500 transition-colors">
            <Phone />
          </a>
        </div>
        <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Services Modal */}
      <AnimatePresence>
        {showServices && <ServicesModal onClose={() => setShowServices(false)} />}
      </AnimatePresence>
    </div>
  );
}
