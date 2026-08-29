// Portfolio-Clean.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, User, Briefcase, Star, Folder, Menu, X, Send, Linkedin, Phone,
  Award, Target, Megaphone, ShoppingCart, UserCheck, Building, LineChart,
  Camera, GraduationCap, ArrowRight, Palette, Code, BarChart3,
  Instagram, Dribbble, Twitter, ArrowUp,
  ShoppingCart as IconShopify, HelpCircle, Users, Layers, BarChart2,
  MoreHorizontal, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';

const SVG_PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%231f2937'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'>Local Placeholder</text></svg>";

const protectionStyles = {
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
};

const WatermarkWrapper = ({ children }) => {
  const RenderName = () => (
    <span className="inline-flex items-baseline gap-1 select-none pointer-events-none leading-none">
      <span className="text-[18px] md:text-[24px] font-semibold leading-none">A</span>
      <span className="text-[12px] md:text-[14px] font-normal leading-none">bdullah</span>
      <span className="w-1 md:w-2" />
      <span className="text-[18px] md:text-[24px] font-semibold leading-none">R</span>
      <span className="text-[12px] md:text-[14px] font-normal leading-none">ashid</span>
    </span>
  );

  return (
    <div className="relative overflow-hidden pointer-events-none select-none">
      {children}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20">
        <div
          className="absolute inset-[-40%]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 160px, transparent 160px, transparent 320px)`,
          }}
        />
        <div className="absolute inset-[-25%] md:inset-[-40%] rotate-[-45deg] flex flex-wrap gap-[24px] md:gap-[48px] items-center justify-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="text-white/25 leading-none" aria-hidden="true">
              <RenderName />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Button = ({ children, className, ...props }) => (
  <button className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out ${className}`} {...props}>
    {children}
  </button>
);

const personalInfo = {
  name: "Abdullah Rashid",
  title: "E-Com Media Buyer | Shopify Developer | Google Certificated Digital Marketer & E-commerce expert",
  linkedin: "#",
  whatsapp: "#",
  profileImage: SVG_PLACEHOLDER,
  tiktok: "#",
};

const sections = [
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Results" },
];

const skillsData = [
  "Problems-Solver", "Meta Ads", "TikTok Ads", "Google Ads", 
  "Conversion Rate Optimization", "Business Consultant", "Copywriting", "Shopify Developer",
];

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

const GalleryModal = ({ images = [], startIndex = 0, onClose, middleSet = new Set() }) => {
  const [index, setIndex] = useState(startIndex);
  const containerRef = useRef(null);

  useEffect(() => { setIndex(startIndex); }, [startIndex]);

  if (!images.length) return null;

  const isMiddle = middleSet.has(images[index]);
  const imgStyle = isMiddle ? { maxWidth: '80vw', maxHeight: '80vh' } : { maxWidth: '100vw', maxHeight: '100vh' };

  return (
    <motion.div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex items-center justify-center" initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} ref={containerRef}>
        <button type="button" onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-3 right-3 z-50 bg-black/60 p-2 rounded-md text-white">
          <X />
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); setIndex(i => (i - 1 + images.length) % images.length); }} className="hidden md:flex absolute left-3 z-50 items-center justify-center h-10 w-10 rounded-full bg-black/40 text-white">
          <ChevronLeft />
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); setIndex(i => (i + 1) % images.length); }} className="hidden md:flex absolute right-3 z-50 items-center justify-center h-10 w-10 rounded-full bg-black/40 text-white">
          <ChevronRight />
        </button>
        <div className="max-w-full max-h-[90vh] flex items-center justify-center rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 p-4">
          <WatermarkWrapper>
            <img src={images[index]} alt={`zoom-${index}`} className="object-contain" draggable={false} style={{ ...protectionStyles, ...imgStyle }} />
          </WatermarkWrapper>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CERT_IMAGES = [SVG_PLACEHOLDER, SVG_PLACEHOLDER, SVG_PLACEHOLDER];

const ImageSlider = ({ images = CERT_IMAGES }) => {
  const [zoomSrc, setZoomSrc] = useState(null);
  return (
    <div className="w-full py-12">
      <div className="max-w-5xl mx-auto overflow-hidden">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-amber-400">Google Certifications</h3>
        <div className="flex overflow-x-auto gap-4 py-4 no-scrollbar">
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 bg-neutral-800 rounded-xl overflow-hidden cursor-pointer border border-neutral-700" onClick={() => setZoomSrc({ start: i })}>
              <img src={src} className="w-full h-full object-cover" alt="Cert" style={protectionStyles} />
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {zoomSrc && <GalleryModal images={images} startIndex={zoomSrc.start} onClose={() => setZoomSrc(null)} />}
      </AnimatePresence>
    </div>
  );
};

const MultiStripBanners = () => {
  const [zoomSrc, setZoomSrc] = useState(null);
  const row1 = [SVG_PLACEHOLDER, SVG_PLACEHOLDER];
  return (
    <div className="space-y-4">
      <div className="flex overflow-x-auto gap-4 py-4">
        {row1.map((src, i) => (
          <div key={i} className="w-[300px] h-[200px] bg-neutral-900 border border-neutral-800 rounded-xl flex-shrink-0 overflow-hidden cursor-pointer" onClick={() => setZoomSrc({ start: i })}>
            <img src={src} className="w-full h-full object-cover" alt="Result" />
          </div>
        ))}
      </div>
      <AnimatePresence>
        {zoomSrc && <GalleryModal images={row1} startIndex={zoomSrc.start} onClose={() => setZoomSrc(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = { home: useRef(null), skills: useRef(null), projects: useRef(null) };

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans antialiased relative overflow-x-hidden" style={protectionStyles}>
      <Navbar activeSection={activeSection} />
      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24 pt-20">
        <section ref={sectionRefs.home} id="home" className="min-h-[60vh] flex flex-col justify-center items-center text-center relative">
          <img src={personalInfo.profileImage} className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Abdullah Rashid<br /> Your <span className="text-amber-400">Growth</span> Partner.
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-8">{personalInfo.title}</p>
        </section>

        <ImageSlider />

        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills">
          <div className="flex flex-wrap justify-center gap-3">
            {skillsData.map((skill, i) => (
              <div key={i} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium border border-neutral-700">{skill}</div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Results">
          <MultiStripBanners />
        </SectionWrapper>
      </main>

      <footer className="text-center py-12 border-t border-neutral-800 bg-neutral-950">
        <div className="flex justify-center gap-6 mb-4">
          <a href={personalInfo.linkedin} className="text-neutral-500 hover:text-teal-400"><Linkedin size={20} /></a>
          <a href={personalInfo.whatsapp} className="text-neutral-500 hover:text-green-500"><Phone size={20} /></a>
        </div>
        <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
