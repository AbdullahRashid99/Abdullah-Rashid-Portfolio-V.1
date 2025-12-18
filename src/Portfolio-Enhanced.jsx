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

// --- Sections (Experience removed) ---
const sections = [
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Results" },
];

// --- Skills Data ---
const skillsData = [
  "Problems-Solver", "Meta Ads", "TikTok Ads", "Google Ads", "Conversion Rate Optimization", "Business Consultant", "Copywriting", "Shopify Developer",
];

// --- Projects Data ---
const projectsData = [
  { title: "Fashion", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format&fit=crop&q=60" },
  { title: "Cosmetics", image: "https://www.dhl.com/discover/content/dam/hong-kong/desktop/e-commerce-advice/e-commerce-guides-by-country/guide-to-packaging-and-shipping-cosmetics-and-beauty-products-from-hong-kong/cosmetic-and-beauty-products-in-a-shipping-box-1920x998.jpg" },
];

// --- Animated Counter ---
const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useSpring(0, { stiffness: 50, damping: 30 });

  const formattedValue = useTransform(
    motionValue,
    (latest) => `£${Math.round(latest).toLocaleString()}+`
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{formattedValue}</motion.span>;
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}
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
};

// --- Scroll to Top Button ---
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition opacity-80 hover:opacity-100 z-50"
    >
      <ArrowUp size={24} />
    </button>
  );
}

// --- Services Modal ---
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
          <motion.div
            key={index}
            className="bg-neutral-800 rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-teal-500 transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-teal-400 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <a href={link} target="_blank" rel="noopener noreferrer" className="mt-auto w-full">
              <Button className="bg-teal-500 w-full text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition">
                Start
              </Button>
            </a>
          </motion.div>
        ))}
      </div>
    </ModalBackdrop>
  );
}

// -------------------------
// Image Slider Component (improved)
// Features:
// - Continuous seamless scroll by auto-updating scrollLeft (no framer marquee)
// - Pause on hover (desktop) and pause button
// - Hover zoom on desktop
// - Tap to open zoom modal on mobile
// - Native drag/scroll (touch/mouse) supported
// - Dots to jump to a specific image
// -------------------------

const DEFAULT_IMAGES = [
  'https://i.postimg.cc/rsxncdPk/65952225.jpg',
  'https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg',
  'https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg',
  'https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg',
  'https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg',
  'https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87_page_0001.jpg',
  'https://i.postimg.cc/BZKw2ynt/Google-Certification.png',
  'https://i.postimg.cc/rsxncdPk/65952225.jpg', // duplicate to reach 8
];

function useAutoScroll(containerRef, { speed = 60, playing = true, pauseRef }) {
  // speed in px/sec
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function step(ts) {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = ts;

      if (playing && (!pauseRef?.current)) {
        const distance = speed * dt;
        el.scrollLeft += distance;
        // seamless
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = el.scrollLeft - el.scrollWidth / 2;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
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
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const pauseRef = useRef(false); // used by auto-scroll hook
  const [zoomSrc, setZoomSrc] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isTouchRef = useRef(false);

  // duplicate images for seamless loop
  const duplicated = [...images, ...images];

  // auto-scroll
  useAutoScroll(containerRef, { speed, playing: isPlaying, pauseRef });

  // detect touch device (for hover vs tap behavior)
  useEffect(() => {
    isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // pauseRef mirrors state for hook
  useEffect(() => { pauseRef.current = isPausedByHover; }, [isPausedByHover]);
  useEffect(() => { pauseRef.current = !isPlaying || isPausedByHover; }, [isPlaying, isPausedByHover]);

  // stop scrolling while user is interacting (mouse down / touch start)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let pointerDown = false;

    const onPointerDown = () => { pointerDown = true; pauseRef.current = true; };
    const onPointerUp = () => { pointerDown = false; pauseRef.current = !isPlaying || isPausedByHover; };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isPlaying, isPausedByHover]);

  // helper to scroll to a specific original image index
  const jumpToIndex = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const children = Array.from(el.querySelectorAll('[data-slider-item]'));
    const target = children[index];
    if (!target) return;
    // Calculate position inside first set
    const left = target.offsetLeft;
    el.scrollTo({ left, behavior: 'smooth' });
  };

  const onImageClick = (src) => {
    if (isTouchRef.current) {
      // on mobile: open zoom modal
      setZoomSrc(src);
    } else {
      // on desktop: do nothing on click (hover handles zoom)
    }
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-amber-400">Testimonials</h3>

        <div className="relative">
          {/* Slider container */}
          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide no-scrollbar touch-pan-x will-change-scroll flex gap-3 items-center py-4 px-2"
            onMouseEnter={() => { if (!isTouchRef.current) { setIsPausedByHover(true); } }}
            onMouseLeave={() => { if (!isTouchRef.current) { setIsPausedByHover(false); } }}
            // allow user to drag/scroll naturally (native)
          >
            {duplicated.map((src, i) => {
              // compute original index (0..images.length-1)
              const originalIndex = i % images.length;
              return (
                <div
                  key={i}
                  data-slider-item
                  data-original-index={originalIndex}
                  className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 p-1"
                >
                  <div
                    onMouseEnter={() => { if (!isTouchRef.current) { setHoveredIndex(i); setIsPausedByHover(true); } }}
                    onMouseLeave={() => { if (!isTouchRef.current) { setHoveredIndex(null); setIsPausedByHover(false); } }}
                    onClick={() => onImageClick(src)}
                    className={`w-full h-28 sm:h-32 md:h-40 lg:h-44 bg-neutral-800 rounded-lg overflow-hidden border border-neutral-800 cursor-pointer transition-transform duration-300 ${hoveredIndex === i ? 'scale-105 z-20' : ''}`}
                    style={{ transformOrigin: 'center center' }}
                  >
                    <img
                      src={src}
                      alt={`Slide ${originalIndex + 1}`}
                      className={`w-full h-full object-cover block`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Play / Pause & Dots controls */}
          <div className="mt-4 flex items-center justify-between max-w-5xl mx-auto px-2">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsPlaying((p) => { const next = !p; if (!next) pauseRef.current = true; else pauseRef.current = !!isPausedByHover; return next; })}
                className={`bg-neutral-800 text-white px-3 py-2 flex items-center gap-2`}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <span className="text-sm text-neutral-400 hidden sm:inline">(Hover to zoom on desktop. Tap to open on mobile.)</span>
            </div>

            {/* dots for originals */}
            <div className="flex items-center gap-2">
              {images.slice(0, images.length).map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to ${idx + 1}`}
                  onClick={() => { setIsPlaying(false); jumpToIndex(idx); }}
                  className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-teal-400 transition"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Zoom modal for mobile */}
        <AnimatePresence>
          {zoomSrc && (
            <ImageZoomModal src={zoomSrc} onClose={() => setZoomSrc(null)} />
          )}
        </AnimatePresence>
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
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)),
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
        <section
          ref={sectionRefs.home}
          id="home"
          className="min-h-screen flex flex-col justify-center items-center text-center relative"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:32px_32px]" />
          <motion.img
            src={personalInfo.profileImage}
            alt="Profile Picture of Abdullah Rashid"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6"
            onError={e => {
              e.target.src = "https://placehold.co/128x128/334155/E2E8F0?text=AR";
              e.target.alt = "Placeholder image with initials AR";
            }}
          />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4"
          >
            Abdullah Rashid<br />
            Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Growth</span> Partner.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-300 mb-8"
          >
            {personalInfo.title}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
              onClick={() => setShowServices(true)}
              type="button"
            >
              Start Here
            </Button>
          </motion.div>
        </section>

        {/* Social Circle Component */}
        <SocialCircle />

        {/* Image Slider (NEW) - placed above Achievements as requested */}
        <ImageSlider />

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

        {/* Skills Section */}
        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skillsData.map((skill, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium">{skill}</motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Projects Section */}
        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Results">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <motion.a href={project.url} target="_blank" rel="noopener noreferrer" key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="group overflow-hidden h-full">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <CardContent>
                    <h3 className="text-xl font-semibold text-white flex items-center justify-between">
                      {project.title}
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-teal-400" />
                    </h3>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </SectionWrapper>

        {/* Additional Content (kept only the graduation/education block) */}
        <div className="grid md:grid-cols-1 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center max-w-md mx-auto">
            <GraduationCap className="mx-auto text-amber-400 mb-4" size={40} />
            <p className="text-neutral-300 leading-relaxed">
              Bachelor of Business Administration from Ain Shams University.
            </p>
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
