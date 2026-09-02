// Portfolio-Enhanced.jsx
import React, { useState, useEffect, useRef } from 'react';

import {
  Mail, User, Briefcase, Star, Folder, Menu, X, Send, Linkedin, Phone,
  Award, Target, Megaphone, ShoppingCart, UserCheck, Building, LineChart,
  Camera, GraduationCap, ArrowRight, Palette, Code, BarChart3,
  Instagram, Dribbble, Twitter, ArrowUp,
  HelpCircle,
  Users,
  Layers,
  BarChart2,
  MoreHorizontal,
  ChevronLeft, ChevronRight,
  ArrowLeftRight, CheckCircle2, TrendingUp, Info, Zap
} from 'lucide-react';

import { SiTiktok } from 'react-icons/si';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';

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
    Rashid
  </span>
);

// --- Watermark Component ---
const WatermarkWrapper = ({ children }) => {
  return (
    <div className="relative overflow-hidden w-full h-full">
      {children}

      <div className="absolute inset-0 pointer-events-none select-none opacity-50 z-10">
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
  linkedin: "https://www.linkedin.com/in/abdullah-rash-id/",
  whatsapp: "http://wa.me/+201025030220",
  profileImage: "https://i.postimg.cc/2574Ss9d/9c10a25ab53cc9bdf0a8fc20082d0868-tplv-tiktokx-cropcenter-1080-1080.jpg",
};

const sections = [
  { id: "skills", title: "Skills" },
  { id: "highlights", title: "Highlights & Wins" },
  { id: "before-after", title: "Before & After" },
  { id: "projects", title: "Results" },
];

// --- Skills Data ---
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

// --- 30 Random Highlights & Marketing Wins Data ---
const highlightsData = [
  { id: 1, title: "ROAS Scale", metric: "+20% ROAS Growth", desc: "Scaled prospecting ad sets while maintaining high profitability.", img: "https://i.postimg.cc/C5GsYm88/11.png", tag: "Meta Ads" },
  { id: 2, title: "Target ROAS Upgrade", metric: "5.0 ROAS (from 2.0)", desc: "Optimized creative hooks and bid strategies.", img: "https://i.postimg.cc/wMXQH0N1/8.png", tag: "Scaling" },
  { id: 3, title: "CPA Reduction", metric: "-45% Lower CPA", desc: "Refined audience targeting and funnel friction points.", img: "https://i.postimg.cc/qqsx0jK6/10.png", tag: "CRO" },
  { id: 4, title: "CTR Boost", metric: "+3.2% Click-Through", desc: "A/B tested high-converting video hooks & thumbnail variations.", img: "https://i.postimg.cc/L5t3RNPm/1.png", tag: "Creatives" },
  { id: 5, title: "Monthly Revenue", metric: "£120,000+ Scaled", desc: "Omnichannel scaling across Meta, Google & TikTok Ads.", img: "https://i.postimg.cc/D0rPFBGm/5.png", tag: "Revenue" },
  { id: 6, title: "AOV Expansion", metric: "+28% Order Value", desc: "Introduced post-purchase upsells and threshold bundles.", img: "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png", tag: "Shopify" },
  { id: 7, title: "Thumb-Stop Rate", metric: "+40% Retention", desc: "First 3-second hook optimization for TikTok & Reels.", img: "https://i.postimg.cc/cCRBZX34/2.png", tag: "UGC" },
  { id: 8, title: "Store Conversion", metric: "4.2% CVR", desc: "Shopify theme speed optimization and streamlined checkout.", img: "https://i.postimg.cc/7h3nDmzH/4.png", tag: "CRO" },
  { id: 9, title: "Email Revenue", metric: "35% Total Sales", desc: "Automated Klaviyo flows for abandoned cart & win-back.", img: "https://i.postimg.cc/Zn8xZVNp/12.png", tag: "Klaviyo" },
  { id: 10, title: "Blended ROAS", metric: "4.5x Constant", desc: "Balanced brand search ads with cold acquisition campaigns.", img: "https://i.postimg.cc/Xqfk3Q5G/9.png", tag: "Google Ads" },
  { id: 11, title: "TikTok UGC Scale", metric: "$12 CPA Target", desc: "Whitelisting creator accounts & Spark Ads strategy.", img: "https://i.postimg.cc/C5GsYm88/11.png", tag: "TikTok" },
  { id: 12, title: "Dynamic Retargeting", metric: "8.5x Campaign ROI", desc: "DPA catalog ads targeted at 30-day view content users.", img: "https://i.postimg.cc/wMXQH0N1/8.png", tag: "Retargeting" },
  { id: 13, title: "BFCM Blitz", metric: "£68K in 48 Hours", desc: "High urgency offer stacking & VIP early access strategy.", img: "https://i.postimg.cc/qqsx0jK6/10.png", tag: "Q4 Scale" },
  { id: 14, title: "Google PMax", metric: "6.2x ROAS Peak", desc: "Feed optimization & high-intent audience signals.", img: "https://i.postimg.cc/L5t3RNPm/1.png", tag: "PMax" },
  { id: 15, title: "90-Day LTV Boost", metric: "+50% Customer LTV", desc: "Subscription model integration & loyalty incentives.", img: "https://i.postimg.cc/D0rPFBGm/5.png", tag: "Retention" },
  { id: 16, title: "Cart Abandonment", metric: "-22% Drop-off", desc: "Simplified 1-click checkout experience.", img: "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png", tag: "Checkout" },
  { id: 17, title: "Daily Spend Scale", metric: "£5,000/Day Scaled", desc: "Horizontal & vertical ad set scaling frameworks.", img: "https://i.postimg.cc/cCRBZX34/2.png", tag: "Scaling" },
  { id: 18, title: "Landing Page CRO", metric: "+3.8% Conversion", desc: "Custom Shopify page builder landing pages.", img: "https://i.postimg.cc/7h3nDmzH/4.png", tag: "PageBuilder" },
  { id: 19, title: "CPM Reduction", metric: "-30% Lower CPM", desc: "Broad targeting paired with engaging organic-style creatives.", img: "https://i.postimg.cc/Zn8xZVNp/12.png", tag: "Media Buying" },
  { id: 20, title: "Repeat Purchase", metric: "32% Return Rate", desc: "Post-purchase email sequences & SMS marketing.", img: "https://i.postimg.cc/Xqfk3Q5G/9.png", tag: "Klaviyo" },
  { id: 21, title: "MRR Growth", metric: "+65% Recurring Rev", desc: "Recharge subscription funnel implementation.", img: "https://i.postimg.cc/C5GsYm88/11.png", tag: "E-Com" },
  { id: 22, title: "Outbound CTR", metric: "2.8% Average CTR", desc: "Direct response copy with clear call-to-action overlays.", img: "https://i.postimg.cc/wMXQH0N1/8.png", tag: "Copywriting" },
  { id: 23, title: "Dynamic Catalog", metric: "+140% DPA Sales", desc: "Custom styled product feeds for Meta & Google.", img: "https://i.postimg.cc/qqsx0jK6/10.png", tag: "Meta" },
  { id: 24, title: "Search Share", metric: "85% Impression Share", desc: "Dominated high-intent branded search keywords.", img: "https://i.postimg.cc/L5t3RNPm/1.png", tag: "Google Search" },
  { id: 25, title: "Influencer Pipeline", metric: "$45K Sales Generated", desc: "Micro-influencer UGC content seeding strategy.", img: "https://i.postimg.cc/D0rPFBGm/5.png", tag: "Influencers" },
  { id: 26, title: "Add-To-Cart Rate", metric: "11.5% ATC Rate", desc: "Sticky add-to-cart buttons & prominent trust badges.", img: "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png", tag: "CRO" },
  { id: 27, title: "Checkout Finish", metric: "+18% Completion", desc: "Local payment options (Shop Pay, Apple Pay, Klarna).", img: "https://i.postimg.cc/cCRBZX34/2.png", tag: "Shopify" },
  { id: 28, title: "Ad Account Scale", metric: "12+ Accounts Scaled", desc: "Cross-niche experience in Fashion, Tech, & Supplements.", img: "https://i.postimg.cc/7h3nDmzH/4.png", tag: "Strategy" },
  { id: 29, title: "3-Sec Video Hook", metric: "+55% Hook Rate", desc: "Fast-paced visual edits and curiosity-driven hooks.", img: "https://i.postimg.cc/Zn8xZVNp/12.png", tag: "Creatives" },
  { id: 30, title: "Bundle Boost", metric: "+$35 AOV Lift", desc: "Buy-2-Get-1 & Tiered discount pricing tables.", img: "https://i.postimg.cc/Xqfk3Q5G/9.png", tag: "Pricing" },
];

// --- 10 Customizable Before & After Case Studies Data ---
const caseStudiesData = [
  {
    id: 1,
    title: "Fashion Brand - Scaling ROAS & Revenue",
    note: "Overhauled ad creatives, optimized conversion funnel, and scaled Meta prospecting campaigns.",
    beforeImage: "https://i.postimg.cc/C5GsYm88/11.png",
    afterImage: "https://i.postimg.cc/wMXQH0N1/8.png",
    metrics: [
      { label: "ROAS Growth", value: "4.2x" },
      { label: "Revenue Increase", value: "+280%" },
      { label: "CPA Reduction", value: "-35%" }
    ]
  },
  {
    id: 2,
    title: "Electronics Store - Conversion Rate Optimization",
    note: "Full Shopify theme customization & checkout speed optimization for seamless customer flow.",
    beforeImage: "https://i.postimg.cc/qqsx0jK6/10.png",
    afterImage: "https://i.postimg.cc/L5t3RNPm/1.png",
    metrics: [
      { label: "Total Revenue", value: "£45,000+" },
      { label: "Conversion Rate", value: "3.8%" },
      { label: "AOV Boost", value: "+22%" }
    ]
  },
  {
    id: 3,
    title: "Beauty & Cosmetics - TikTok & Meta UGC Scaling",
    note: "Implemented high-converting user-generated content (UGC) ad strategy and offer restructuring.",
    beforeImage: "https://i.postimg.cc/D0rPFBGm/5.png",
    afterImage: "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png",
    metrics: [
      { label: "Monthly Sales", value: "£32,000" },
      { label: "Average ROAS", value: "3.9x" }
    ]
  },
  {
    id: 4,
    title: "Home Decor - Multi-Channel Retargeting Funnel",
    note: "Deployed tailored email automation with Klaviyo alongside dynamic catalog retargeting.",
    beforeImage: "https://i.postimg.cc/cCRBZX34/2.png",
    afterImage: "https://i.postimg.cc/7h3nDmzH/4.png",
    metrics: [
      { label: "Email Revenue", value: "34%" },
      { label: "Repeat Purchase Rate", value: "+18%" }
    ]
  },
  {
    id: 5,
    title: "Fitness & Supplement Brand - Scaling Paid Media",
    note: "Built custom landing pages with high urgency elements & subscription model options.",
    beforeImage: "https://i.postimg.cc/Zn8xZVNp/12.png",
    afterImage: "https://i.postimg.cc/Xqfk3Q5G/9.png",
    metrics: [
      { label: "Ad Spend Scaled", value: "5x" },
      { label: "Customer LTV Boost", value: "+40%" }
    ]
  },
  {
    id: 6,
    title: "Jewelry Store - High-AOV Scaling Strategy",
    note: "Leveraged Google Shopping Ads & high-intent Meta search audiences.",
    beforeImage: "https://i.postimg.cc/C5GsYm88/11.png",
    afterImage: "https://i.postimg.cc/L5t3RNPm/1.png",
    metrics: [
      { label: "Average Order Value", value: "£120" },
      { label: "Overall ROAS", value: "5.1x" }
    ]
  },
  {
    id: 7,
    title: "Luxury Apparel - Creative Testing & Optimization",
    note: "Tested over 30 visual ad variations to find winning high-converting hooks.",
    beforeImage: "https://i.postimg.cc/qqsx0jK6/10.png",
    afterImage: "https://i.postimg.cc/wMXQH0N1/8.png",
    metrics: [
      { label: "Sales Multiplier", value: "3.5x" },
      { label: "CTR Increase", value: "+2.4%" }
    ]
  },
  {
    id: 8,
    title: "Gadgets & Accessories - Q4 Holiday Scaling Blitz",
    note: "Executed rapid scaling during Black Friday / Cyber Monday weekend.",
    beforeImage: "https://i.postimg.cc/D0rPFBGm/5.png",
    afterImage: "https://i.postimg.cc/cCRBZX34/2.png",
    metrics: [
      { label: "BFCM Revenue", value: "£68,000" },
      { label: "ROAS Peak", value: "4.8x" }
    ]
  },
  {
    id: 9,
    title: "Pet Accessories - Omnichannel Growth Strategy",
    note: "Combined Google Search Ads with Meta prospecting campaigns for maximum reach.",
    beforeImage: "https://i.postimg.cc/Zn8xZVNp/12.png",
    afterImage: "https://i.postimg.cc/7h3nDmzH/4.png",
    metrics: [
      { label: "ROAS Growth", value: "3.2x" },
      { label: "New Customers", value: "+1,400" }
    ]
  },
  {
    id: 10,
    title: "Skincare Line - CRO & A/B Offer Testing",
    note: "Split-tested bundle packages vs single product checkout pages to boost basket size.",
    beforeImage: "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png",
    afterImage: "https://i.postimg.cc/Xqfk3Q5G/9.png",
    metrics: [
      { label: "Conversion Rate", value: "4.1%" },
      { label: "CPA Reduction", value: "-42%" }
    ]
  }
];

// --- Interactive Before/After Comparison Component ---
const BeforeAfterSlider = ({ beforeImage, afterImage, title, note, metrics }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 md:p-6 shadow-2xl">
      <div className="mb-6 border-b border-neutral-800 pb-4">
        {title && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-teal-400" size={24} />
              {title}
            </h3>
            {metrics && metrics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {metrics.map((m, idx) => (
                  <div key={idx} className="bg-teal-950/60 border border-teal-500/30 text-teal-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-teal-400" />
                    <span>{m.label}:</span>
                    <span className="text-white font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {note && (
          <div className="flex items-center gap-2 text-neutral-400 text-xs md:text-sm bg-neutral-950/50 p-3 rounded-lg border border-neutral-800">
            <Info size={16} className="text-amber-400 flex-shrink-0" />
            <span>{note}</span>
          </div>
        )}
      </div>

      <div 
        ref={containerRef}
        className="relative w-full h-[280px] sm:h-[380px] md:h-[480px] rounded-xl overflow-hidden select-none cursor-ew-resize touch-pan-y"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <div className="absolute inset-0 w-full h-full">
          <WatermarkWrapper>
            <img 
              src={afterImage} 
              alt="After" 
              className="w-full h-full object-cover md:object-contain bg-neutral-950" 
              draggable={false}
              style={protectionStyles}
            />
          </WatermarkWrapper>
          <span className="absolute bottom-4 right-4 z-20 bg-teal-500/90 text-black font-extrabold text-xs md:text-sm px-3 py-1 rounded-md shadow-lg backdrop-blur-md pointer-events-none">
            After
          </span>
        </div>

        <div 
          className="absolute inset-0 h-full overflow-hidden z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}>
            <WatermarkWrapper>
              <img 
                src={beforeImage} 
                alt="Before" 
                className="w-full h-full object-cover md:object-contain bg-neutral-950 grayscale-[25%]" 
                draggable={false}
                style={protectionStyles}
              />
            </WatermarkWrapper>
            <span className="absolute bottom-4 left-4 z-20 bg-neutral-800/90 text-neutral-200 font-extrabold text-xs md:text-sm px-3 py-1 rounded-md shadow-lg backdrop-blur-md pointer-events-none">
              Before
            </span>
          </div>
        </div>

        <div 
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 via-sky-400 to-amber-400 shadow-[0_0_12px_rgba(20,184,166,0.8)] z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 md:w-11 md:h-11 bg-neutral-950 border-2 border-teal-400 rounded-full flex items-center justify-center text-teal-400 shadow-xl">
            <ArrowLeftRight size={18} />
          </div>
        </div>
      </div>
      <p className="text-center text-neutral-500 text-xs mt-3">Drag or swipe slider to compare Before & After</p>
    </div>
  );
};

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

// --- Gallery Modal ---
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
        // tap
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

  const isMiddle = middleSet.has(images[index]);
  const imgStyle = isMiddle ? { maxWidth: '80vw', maxHeight: '80vh' } : { maxWidth: '100vw', maxHeight: '100vh' };

  return (
    <motion.div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full flex items-center justify-center" initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} ref={containerRef}>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close"
          className="absolute top-3 right-3 z-50 bg-black/60 hover:bg-black/70 p-2 rounded-md text-white"
          style={{ pointerEvents: 'auto' }}
        >
          <X />
        </button>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIndex(i => (i - 1 + images.length) % images.length); }}
          aria-label="Previous"
          className="hidden md:flex absolute left-3 z-50 items-center justify-center h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 text-white"
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronLeft />
        </button>

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

// --- RESULTS STRIP LOGIC ---
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

// --- MultiStripBanners FIXED ---
const MultiStripBanners = () => {
  const [zoomSrc, setZoomSrc] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const row2 = [
    "https://i.postimg.cc/L5t3RNPm/1.png", 
    "https://i.postimg.cc/D0rPFBGm/5.png", 
    "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png", 
    "https://i.postimg.cc/cCRBZX34/2.png", 
    "https://i.postimg.cc/7h3nDmzH/4.png"
  ];

  const middleSet = new Set(row2);

  const onOpenFromStrip = (src) => {
    const idx = row2.indexOf(src);
    if (idx !== -1) {
      setGalleryImages(row2);
      setZoomSrc({ start: idx });
    }
  };

  return (
    <div className="py-8">
      <BannerStrip images={row2} reverse={false} onImageClick={onOpenFromStrip} />
      <AnimatePresence>
        {zoomSrc && (
          <GalleryModal images={galleryImages} startIndex={zoomSrc.start} onClose={() => setZoomSrc(null)} middleSet={middleSet} />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Portfolio Component ---
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("skills");
  const [selectedHighlightImg, setSelectedHighlightImg] = useState(null);

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-teal-500 selection:text-black">
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <header id="home" className="pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-400 text-xs font-semibold">
            <Zap size={14} /> E-Commerce Growth Specialist
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">{personalInfo.name}</span>
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl leading-relaxed">
            {personalInfo.title}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer">
              <Button className="bg-gradient-to-r from-teal-500 to-sky-500 text-black font-bold hover:opacity-90">
                Let's Talk WhatsApp
              </Button>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
              <Button className="bg-neutral-900 border border-neutral-800 text-white hover:border-neutral-700">
                LinkedIn Profile
              </Button>
            </a>
          </div>
        </div>

        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-teal-500 to-sky-500 shadow-2xl flex-shrink-0">
          <img 
            src={personalInfo.profileImage} 
            alt={personalInfo.name} 
            className="w-full h-full object-cover rounded-full border-4 border-neutral-950" 
          />
        </div>
      </header>

      {/* 1. Skills Section */}
      <SectionWrapper id="skills" title="Skills & Core Expertise">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skillsData.map((skill, index) => (
            <Card key={index} className="hover:border-teal-500/40 transition-colors">
              <CardContent className="p-4 text-center font-semibold text-neutral-200 text-sm md:text-base">
                {skill}
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* 2. Highlights & Wins Section (30 Random Marketing Items) */}
      <SectionWrapper id="highlights" title="30 Highlights & Key Wins">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {highlightsData.map((item) => (
            <Card key={item.id} className="hover:border-teal-500/50 transition-all duration-300 flex flex-col overflow-hidden group">
              <div 
                className="relative h-48 w-full overflow-hidden bg-neutral-950 cursor-pointer" 
                onClick={() => setSelectedHighlightImg(item.img)}
              >
                <WatermarkWrapper>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    draggable={false} 
                    style={protectionStyles} 
                  />
                </WatermarkWrapper>
                <span className="absolute top-3 right-3 bg-teal-500/90 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-md z-20">
                  {item.tag}
                </span>
              </div>
              <CardContent className="flex-1 flex flex-col justify-between p-5">
                <div>
                  <div className="text-2xl font-black text-teal-400 mb-1">{item.metric}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* 3. Before & After Case Studies */}
      <SectionWrapper id="before-after" title="Before & After Case Studies">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          {caseStudiesData.map((study) => (
            <BeforeAfterSlider 
              key={study.id}
              title={study.title}
              note={study.note}
              beforeImage={study.beforeImage}
              afterImage={study.afterImage}
              metrics={study.metrics}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* 4. Results Section */}
      <SectionWrapper id="projects" title="Proven Ad Results & Google Certifications">
        <MultiStripBanners />
        <ImageSlider />
      </SectionWrapper>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 text-center text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
      </footer>

      {/* Highlight Zoom Modal */}
      <AnimatePresence>
        {selectedHighlightImg && (
          <GalleryModal
            images={[selectedHighlightImg]}
            startIndex={0}
            onClose={() => setSelectedHighlightImg(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
