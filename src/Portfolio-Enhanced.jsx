// Portfolio.jsx (final fixed file with Enhanced Results)
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

// --- Modal Backdrop ---
const ModalBackdrop = ({ children, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[100] p-4 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="bg-neutral-900 rounded-lg shadow-xl max-w-5xl w-full max-h-full overflow-hidden relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onClick={e => e.stopPropagation()}
    >
      {children}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-teal-500 transition"
      >
        <X size={24} />
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
      <div className="p-8">
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
      </div>
    </ModalBackdrop>
  );
}

// -------------------------
// ImageSlider (Original Restored for Top)
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
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [containerRef, speed, playing, pauseRef]);
}

const ImageSlider = ({ images = DEFAULT_IMAGES, speed = 60 }) => {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const pauseRef = useRef(false);
  const [zoomSrc, setZoomSrc] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const duplicated = [...images, ...images];
  useAutoScroll(containerRef, { speed, playing: isPlaying, pauseRef });
  useEffect(() => { pauseRef.current = isPausedByHover || !isPlaying; }, [isPausedByHover, isPlaying]);

  return (
    <div className="w-full py-8">
      <div className="max-w-5xl mx-auto overflow-hidden">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-amber-400">Certifications</h3>
        <div 
          ref={containerRef}
          className="flex overflow-x-hidden gap-4 py-4 no-scrollbar"
          onMouseEnter={() => setIsPausedByHover(true)}
          onMouseLeave={() => setIsPausedByHover(false)}
        >
          {duplicated.map((src, i) => (
            <motion.div 
              key={i} 
              className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 bg-neutral-800 rounded-xl overflow-hidden cursor-pointer border border-neutral-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => setZoomSrc(src)}
            >
              <img src={src} className="w-full h-full object-cover" alt="Cert" />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {zoomSrc && (
          <ModalBackdrop onClose={() => setZoomSrc(null)}>
            <img src={zoomSrc} className="w-full max-h-[80vh] object-contain" alt="zoom" />
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </div>
  );
};

// -------------------------
// NEW IMPROVED RESULTS SECTION
// -------------------------

const BANNER_IMAGES = [
  // Row 1
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://i.postimg.cc/rsxncdPk/65952225.jpg",
  "https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg",
  "https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg",
  // Row 2
  "https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg",
  "https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg",
  "https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87-page-0001.jpg",
  "https://i.postimg.cc/rsxncdPk/65952225.jpg",
  // Row 3
  "https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg",
  "https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg",
  "https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg",
  "https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg",
];

function useAutoScrollStrip(containerRef, { speed = 100, reverse = false, isHovered = false }) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastTime = 0;
    let rafId;

    const step = (ts) => {
      if (!lastTime) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;

      if (!isHovered) {
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
  }, [speed, reverse, isHovered]);
}

const BannerStrip = ({ images, reverse, onImageClick }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const duplicated = [...images, ...images];

  useAutoScrollStrip(containerRef, { speed: 80, reverse, isHovered });

  return (
    <div 
      ref={containerRef}
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-hidden flex touch-pan-x select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex">
        {duplicated.map((src, i) => (
          <div key={i} className="w-screen flex-shrink-0 px-4 py-2">
            <motion.div 
              className="w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
              whileHover={{ scale: 0.98 }}
              onClick={() => onImageClick(src)}
            >
              <img src={src} className="w-full h-full object-contain" alt="Result" draggable="false" />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MultiStripBanners = () => {
  const [zoomSrc, setZoomSrc] = useState(null);
  const row1 = BANNER_IMAGES.slice(0, 4);
  const row2 = BANNER_IMAGES.slice(4, 8);
  const row3 = BANNER_IMAGES.slice(8, 12);

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Row 1: Right to Left */}
      <BannerStrip images={row1} reverse={false} onImageClick={setZoomSrc} />
      {/* Row 2: Left to Right */}
      <BannerStrip images={row2} reverse={true} onImageClick={setZoomSrc} />
      {/* Row 3: Right to Left */}
      <BannerStrip images={row3} reverse={false} onImageClick={setZoomSrc} />

      <AnimatePresence>
        {zoomSrc && (
          <ModalBackdrop onClose={() => setZoomSrc(null)}>
            <img src={zoomSrc} className="w-full max-h-[90vh] object-contain" alt="Zoomed Result" />
          </ModalBackdrop>
        )}
      </AnimatePresence>
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
    <div className="bg-neutral-950 text-white min-h-screen font-sans antialiased relative overflow-x-hidden">
      <Navbar activeSection={activeSection} />

      <main className="max-w-5xl mx-auto px-4 pb-24">
        {/* Hero Section */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:32px_32px]" />
          <motion.img
            src={personalInfo.profileImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6"
          />
          <motion.h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Abdullah Rashid<br /> Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Growth</span> Partner.
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-neutral-300 mb-8">{personalInfo.title}</motion.p>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg" onClick={() => setShowServices(true)}>Start Here</Button>
        </section>

        <SocialCircle />
        <ImageSlider />

        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skillsData.map((skill, index) => (
              <motion.div key={index} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium">{skill}</motion.div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="achievements" title="Key Achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-center">
            <Card><CardContent>
              <h3 className="text-2xl font-bold text-amber-400 mb-2">Total Ad Spend Managed</h3>
              <p className="text-5xl font-mono font-bold"><AnimatedCounter value={5000000} /></p>
            </CardContent></Card>
            <Card><CardContent>
              <h3 className="text-2xl font-bold text-teal-400 mb-2">Average ROAS Generated</h3>
              <p className="text-5xl font-mono font-bold">8x - 25x</p>
            </CardContent></Card>
          </div>
        </SectionWrapper>

        {/* RESULTS SECTION */}
        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Results">
          <MultiStripBanners />
          <p className="text-sm text-neutral-500 mt-12 text-center max-w-2xl mx-auto italic">
            Swipe left/right to browse. Hover on desktop to pause and zoom.
          </p>
        </SectionWrapper>

        <div className="text-center mt-20">
          <GraduationCap className="mx-auto text-amber-400 mb-4" size={40} />
          <p className="text-neutral-300 leading-relaxed">Bachelor of Business Administration from Ain Shams University.</p>
        </div>
      </main>

      <footer className="text-center py-12 border-t border-neutral-800/50">
        <div className="flex justify-center gap-6 mb-4">
          <a href={personalInfo.linkedin} className="text-neutral-500 hover:text-teal-400 transition-colors"><Linkedin /></a>
          <a href={personalInfo.whatsapp} className="text-neutral-500 hover:text-green-500 transition-colors"><Phone /></a>
        </div>
        <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
      </footer>

      <ScrollToTopButton />
      <AnimatePresence>{showServices && <ServicesModal onClose={() => setShowServices(false)} />}</AnimatePresence>
    </div>
  );
}
