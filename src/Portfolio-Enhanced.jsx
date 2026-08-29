// Portfolio_NoExternalCalls.jsx
import React, { useState, useEffect, useRef } from 'react';

const protectionStyles = {
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
};

const WatermarkWrapper = ({ children }) => {
  return (
    <div className="relative overflow-hidden pointer-events-none select-none">
      {children}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20">
        <div
          className="absolute inset-[-40%]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                rgba(255,255,255,0.02) 0px,
                rgba(255,255,255,0.02) 160px,
                transparent 160px,
                transparent 320px
              )
            `,
          }}
        />
        <div className="absolute inset-[-25%] md:inset-[-40%] rotate-[-45deg] flex flex-wrap gap-[24px] md:gap-[48px] items-center justify-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="text-white/25 leading-none" aria-hidden="true">
              Abdullah Rashid
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

const Card = ({ children, className, ...props }) => (
  <div className={`bg-neutral-900/80 border border-neutral-800 rounded-xl shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

const personalInfo = {
  name: "Abdullah Rashid",
  title: "E-Com Media Buyer | Shopify Developer | Google Certificated Digital Marketer & E-commerce expert",
  profileImage: null, // مسح اللينك
  linkedin: null, // مسح اللينك
  whatsapp: null, // مسح اللينك
  tiktok: null, // مسح اللينك
};

const sections = [
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Results" },
];

const skillsData = [
  "Problems-Solver", "Meta Ads", "TikTok Ads", "Google Ads",
  "Conversion Rate Optimization", "Business Consultant", "Copywriting", "Shopify Developer",
];

const SectionWrapper = ({ id, title, children, className }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">{title}</span>
    </h2>
    {children}
  </section>
);

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
            {isMenuOpen ? "X" : "☰"}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-900">
          <div className="flex flex-col items-center gap-4 py-4">
            {sections.map((sec) => (
              <a key={sec.id} href={`#${sec.id}`} onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium transition-colors ${activeSection === sec.id ? 'text-teal-400' : 'text-neutral-300 hover:text-teal-400'}`}>
                {sec.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const GalleryModal = ({ images = [], startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  if (!images.length) return null;
  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4" onClick={onClose}>
      <div className="relative w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-3 right-3 z-50 bg-black/60 p-2 rounded-md text-white">
          X
        </button>
        <div className="max-w-full max-h-[90vh] flex items-center justify-center rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 p-4">
          <WatermarkWrapper>
            <div className="w-full h-64 bg-neutral-800 flex items-center justify-center text-white">
              Image
            </div>
          </WatermarkWrapper>
        </div>
      </div>
    </div>
  );
};

const ImageSlider = () => {
  return (
    <div className="w-full py-12">
      <div className="max-w-5xl mx-auto overflow-hidden">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-amber-400">Google Certifications</h3>
        <div className="flex overflow-x-hidden gap-4 py-4 no-scrollbar">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 bg-neutral-800 rounded-xl overflow-hidden cursor-pointer border border-neutral-700">
              <div className="w-full h-full bg-neutral-700 flex items-center justify-center text-white">
                Cert {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BannerStrip = () => {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-x-auto no-scrollbar flex touch-pan-x select-none">
      <div className="flex">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-screen md:w-[60vw] lg:w-[40vw] flex-shrink-0 px-2 md:px-4 py-4">
            <div className="w-full h-[250px] md:h-[400px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer shadow-2xl relative">
              <WatermarkWrapper>
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white">
                  Result {i + 1}
                </div>
              </WatermarkWrapper>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MultiStripBanners = () => {
  const [zoomSrc, setZoomSrc] = useState(null);
  return (
    <div className="space-y-4 md:space-y-8">
      <BannerStrip />
      <BannerStrip />
      <BannerStrip />
      {zoomSrc && <GalleryModal images={[]} startIndex={0} onClose={() => setZoomSrc(null)} />}
    </div>
  );
};

const ServicesModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4" onClick={onClose}>
      <div className="bg-neutral-900 p-8 rounded-2xl w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">For E-Commerce</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {["Startup", "Scale"].map((title, index) => (
            <div key={index} className="bg-neutral-800 rounded-lg p-6 flex flex-col items-center text-center shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-4">{title}</h3>
              <Button className="bg-teal-500 w-full text-white">Start</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
    <div className="bg-neutral-950 text-white min-h-screen font-sans antialiased relative overflow-x-hidden" onContextMenu={(e) => e.preventDefault()} style={protectionStyles}>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-60"></div>
      </div>

      <Navbar activeSection={activeSection} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[120px] rounded-full -z-10" />
          <div className="w-32 h-32 rounded-full object-cover border-4 border-neutral-700 mb-6 bg-neutral-800 flex items-center justify-center text-white">
            Profile Image
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Abdullah Rashid<br /> Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Growth</span> Partner.
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-8">{personalInfo.title}</p>
          <Button className="bg-teal-500 text-white" onClick={() => setShowServices(true)}>Start Here</Button>
        </section>

        <ImageSlider />

        <SectionWrapper id="skills" title="Skills">
          <div className="flex flex-wrap justify-center gap-3">
            {skillsData.map((skill, i) => (
              <div key={i} className="bg-neutral-800/60 backdrop-blur-md text-neutral-300 px-4 py-2 rounded-full text-sm font-medium border border-neutral-700">{skill}</div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="projects" title="Results">
          <MultiStripBanners />
        </SectionWrapper>

        <div className="text-center mt-20">
          <p className="text-neutral-300">Bachelor of Business Administration from Ain Shams University.</p>
        </div>
      </main>

      <footer className="relative z-10 text-center py-12 border-t border-neutral-800/50 bg-neutral-950/50 backdrop-blur-sm">
        <div className="flex justify-center gap-6 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500">
            LinkedIn
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500">
            WhatsApp
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-500">
            TikTok
          </div>
        </div>
        <p className="text-neutral-500 text-sm">
          © 2022 - {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
        </p>
      </footer>
      <ScrollToTopButton />
      {showServices && <ServicesModal onClose={() => setShowServices(false)} />}
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
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 bg-teal-500 text-white p-3 rounded-full shadow-lg z-50">
      ↑
    </button>
  );
}
