// Portfolio-Enhanced.jsx
import React, { useState, useEffect, useRef } from 'react';

import {
  Menu, X, Linkedin, Phone, LineChart,
  GraduationCap, Code, BarChart2,
  ArrowUp
} from 'lucide-react';

import { SiTiktok } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

// Import SocialCircle component
import SocialCircle from '../src/components/SocialCircle.jsx';

// --- Global Protection Styles ---
const protectionStyles = {
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
};

// --- Watermark Sub-component ---
const RenderName = () => (
  <span
    className="text-[14px] md:text-[22px] font-semibold text-white/40 tracking-[0.3em] uppercase leading-none select-none pointer-events-none"
    style={{ textShadow: '0 0 2px rgba(0,0,0,0.4)' }}
  >
    Abdullah Rashid
  </span>
);

// --- Watermark Component ---
const WatermarkWrapper = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      {children}

      <div className="absolute inset-0 pointer-events-none select-none opacity-50">
        <div
          className="absolute inset-[-50%] md:inset-[-50%]"
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

        <div className="absolute inset-[-30%] md:inset-[-50%] rotate-[-45deg] flex flex-wrap gap-[60px] md:gap-[120px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <RenderName key={i} />
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

// --- Metric Badge Component (Matching Exact Image Design) ---
const MetricBadge = ({ label, value }) => (
  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#031d1d]/90 border border-[#0d5c56] text-teal-400 backdrop-blur-md shadow-lg text-xs md:text-sm font-semibold">
    <div className="w-4 h-4 rounded-full border border-teal-400 flex items-center justify-center text-teal-300 text-[10px] font-bold">
      ✓
    </div>
    <span>
      {label}: <strong className="text-white font-bold ml-1">{value}</strong>
    </span>
  </div>
);

// --- Personal Info ---
const personalInfo = {
  name: "Abdullah Rashid",
  title: "E-Com Media Buyer | Shopify Developer | Google Certificated Digital Marketer & E-commerce expert",
  linkedin: "https://www.linkedin.com/in/abdullah-rash-id/",
  whatsapp: "http://wa.me/+201025030220",
  tiktok: "https://www.tiktok.com/", // تم إضافة الخاصية المفقودة
  profileImage: "https://i.postimg.cc/2574Ss9d/9c10a25ab53cc9bdf0a8fc20082d0868-tplv-tiktokx-cropcenter-1080-1080.jpg",
};

const sections = [
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Results" },
];

const skillsData = [
  "Analytical Mindset",
  "Problem-Solver",
  "E-commerce Expert",
  "Master, Optimize & Scale",
  "Strong interpersonal skills",
  "All Social Platforms Ads",
  "Content Strategys",
  "Business & Pricing Strategys",
  "Financial & Data Analyst",
  "Data-Driven Decision Making",
  "Shopify Developer",
  "Websites CRO"
];

// --- 10 Cases Data with 30 Metric Badges Variations ---
const caseStudiesData = [
  {
    id: 1,
    title: "Case 1",
    image: "https://i.postimg.cc/C5GsYm88/11.png",
    metrics: [
      { label: "Conversion Rate", value: "4.1%" },
      { label: "CPA Reduction", value: "-42%" },
      { label: "ROAS", value: "4.8x" }
    ]
  },
  {
    id: 2,
    title: "Case 2",
    image: "https://i.postimg.cc/wMXQH0N1/8.png",
    metrics: [
      { label: "CPM", value: "$4.20" },
      { label: "Total Sales", value: "$125,000" },
      { label: "ROAS", value: "5.2x" }
    ]
  },
  {
    id: 3,
    title: "Case 3",
    image: "https://i.postimg.cc/qqsx0jK6/10.png",
    metrics: [
      { label: "CPP (Cost Per Purchase)", value: "$12.5" },
      { label: "AOV", value: "$85" },
      { label: "Conversion Rate", value: "3.9%" }
    ]
  },
  {
    id: 4,
    title: "Case 4",
    image: "https://i.postimg.cc/L5t3RNPm/1.png",
    metrics: [
      { label: "ROAS", value: "6.1x" },
      { label: "CPA Reduction", value: "-38%" },
      { label: "Total Sales", value: "$240,000" }
    ]
  },
  {
    id: 5,
    title: "Case 5",
    image: "https://i.postimg.cc/D0rPFBGm/5.png",
    metrics: [
      { label: "CPM", value: "$3.50" },
      { label: "CPP", value: "$9.80" },
      { label: "Profit Margin", value: "+32%" }
    ]
  },
  {
    id: 6,
    title: "Case 6",
    image: "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png",
    metrics: [
      { label: "Total Sales", value: "$195,000" },
      { label: "Conversion Rate", value: "4.8%" },
      { label: "ROAS", value: "5.7x" }
    ]
  },
  {
    id: 7,
    title: "Case 7",
    image: "https://i.postimg.cc/cCRBZX34/2.png",
    metrics: [
      { label: "CPP", value: "$11.20" },
      { label: "CPA Reduction", value: "-45%" },
      { label: "AOV Growth", value: "+28%" }
    ]
  },
  {
    id: 8,
    title: "Case 8",
    image: "https://i.postimg.cc/7h3nDmzH/4.png",
    metrics: [
      { label: "CPM", value: "$3.90" },
      { label: "ROAS", value: "7.1x" },
      { label: "Total Sales", value: "$310,000" }
    ]
  },
  {
    id: 9,
    title: "Case 9",
    image: "https://i.postimg.cc/Zn8xZVNp/12.png",
    metrics: [
      { label: "Conversion Rate", value: "5.3%" },
      { label: "CPP", value: "$8.90" },
      { label: "CPA Reduction", value: "-51%" }
    ]
  },
  {
    id: 10,
    title: "Case 10",
    image: "https://i.postimg.cc/Xqfk3Q5G/9.png",
    metrics: [
      { label: "Total Sales", value: "$420,000" },
      { label: "ROAS", value: "6.4x" },
      { label: "CPM", value: "$4.10" }
    ]
  }
];

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

// --- Gallery Modal ---
const GalleryModal = ({ images = [], startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => { setIndex(startIndex); }, [startIndex]);

  if (!images.length) return null;

  return (
    <motion.div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex items-center justify-center max-w-5xl" initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-50 bg-black/60 hover:bg-black/70 p-2 rounded-md text-white"
        >
          <X />
        </button>

        <div className="max-w-full max-h-[90vh] flex items-center justify-center rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 p-4">
          <WatermarkWrapper>
            <img src={images[index]} alt={`zoom-${index}`} className="object-contain max-h-[80vh]" draggable={false} style={protectionStyles} />
          </WatermarkWrapper>
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
              onClick={() => setZoomSrc(src)}
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
          <GalleryModal images={images} startIndex={images.indexOf(zoomSrc)} onClose={() => setZoomSrc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- TABBED CASES COMPONENT (Interactive Case Switcher) ---
const InteractiveCasesView = () => {
  const [activeCaseId, setActiveCaseId] = useState(1);
  const [zoomSrc, setZoomSrc] = useState(null);

  const activeCase = caseStudiesData.find(c => c.id === activeCaseId) || caseStudiesData[0];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Case Selector Buttons */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {caseStudiesData.map((caseItem) => {
          const isActive = caseItem.id === activeCaseId;
          return (
            <button
              key={caseItem.id}
              onClick={() => setActiveCaseId(caseItem.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex-shrink-0 border ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.4)]'
                  : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              {caseItem.title}
            </button>
          );
        })}
      </div>

      {/* Selected Case Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="mt-6 flex flex-col items-center"
        >
          {/* Metrics Badges Container directly ABOVE the image */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            {activeCase.metrics.map((metric, idx) => (
              <MetricBadge key={idx} label={metric.label} value={metric.value} />
            ))}
          </div>

          {/* Case Image Card */}
          <motion.div
            className="w-full max-w-2xl h-[320px] md:h-[450px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer shadow-2xl relative"
            whileHover={{ scale: 1.01 }}
            onClick={() => setZoomSrc(activeCase.image)}
          >
            <WatermarkWrapper>
              <img
                src={activeCase.image}
                alt={activeCase.title}
                className="w-full h-full object-contain"
                draggable={false}
                style={protectionStyles}
              />
            </WatermarkWrapper>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {zoomSrc && (
          <GalleryModal
            images={caseStudiesData.map(c => c.image)}
            startIndex={caseStudiesData.findIndex(c => c.image === zoomSrc)}
            onClose={() => setZoomSrc(null)}
          />
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
      {/* Background */}
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
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skillsData.map((skill, i) => (
              <motion.div 
                key={i} 
                className="bg-neutral-800/60 backdrop-blur-md text-neutral-200 px-5 py-2.5 rounded-full text-sm font-medium border border-neutral-700 hover:border-teal-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Results Section with Dynamic Cases Tabs */}
        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Results">
          <InteractiveCasesView />
        </SectionWrapper>

        {/* Yellow Cards Container */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-neutral-900/90 border-2 border-amber-400/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all"
          >
            <GraduationCap className="text-amber-400 mb-4" size={38} />
            <p className="text-neutral-200 font-semibold text-base">
              Bachelor of Business Administration from Ain Shams University.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-neutral-900/90 border-2 border-amber-400/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all"
          >
            <LineChart className="text-amber-400 mb-4" size={38} />
            <p className="text-neutral-200 font-semibold text-base">
              Financial Analyst with over 4 years of experience in financial markets.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-neutral-900/90 border-2 border-amber-400/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all"
          >
            <Code className="text-amber-400 mb-4" size={38} />
            <p className="text-neutral-200 font-semibold text-base">
              Web Developer & E-commerce Solutions.⭐
            </p>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 text-center py-12 border-t border-neutral-800/50 bg-neutral-950/50 backdrop-blur-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-teal-400 hover:bg-neutral-800 transition-all"
          >
            <Linkedin size={20} />
          </a>

          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-green-500 hover:bg-neutral-800 transition-all"
          >
            <Phone size={20} />
          </a>

          <a
            href={personalInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-pink-500 hover:bg-neutral-800 transition-all"
          >
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

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
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
