import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, User, Briefcase, Star, Folder, Menu, X, Send, Linkedin, Phone,
  Award, Target, Megaphone, ShoppingCart, UserCheck, Building, LineChart,
  Camera, GraduationCap, ArrowRight, Palette, Code, BarChart3,
  Tiktok, Instagram, Dribbble, Twitter, ArrowUp,
  ShoppingCart as IconShopify,
  HelpCircle, Users, Layers, BarChart2, MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion';

// استيراد أيقونات من react-icons لمكون SocialCircle
import { FaFacebookF, FaInstagram, FaGoogle, FaSnapchatGhost, FaLinkedinIn, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';

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

// --- بيانات شخصية ---
const personalInfo = {
  name: "Abdullah Rashid",
  title: "Senior Performance Marketer | E-commerce Expert | Certified by Google",
  linkedin: "https://www.linkedin.com/in/abdullah-rashid4444/",
  whatsapp: "http://wa.me/+201025030220",
  profileImage: "https://i.postimg.cc/RFmtpNSy/Abdullah-Rashid.jpg",
};

// --- أقسام الصفحة ---
const sections = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
];

// --- خبرات ---
const experienceData = [
  { icon: <Award />, title: "Certified Digital Marketing & Ecommerce Expert", company: "Google", description: "Earned 8 certifications covering SMM, SEO, SEM, Email, Ads, Analytics, and Customer Loyalty." },
  { icon: <Megaphone />, title: "Digital Marketing Specialist", company: "Lasers", description: "Helped scale social campaigns for mental health in the Arab world, boosting organic reach beyond internal capacity." },
  { icon: <Target />, title: "Media Buyer ", company: "Azrak", description: "Planned, launched, and optimized paid media campaigns on Meta & Tiktok, significantly improving ROI and reducing CPA." },
  { icon: <ShoppingCart />, title: "E-commerce & Dropshipping Expert", company: "Freelance", description: "Created high-converting Shopify stores, specializing in pricing, competitor analysis, and product development." },
  { icon: <UserCheck />, title: "One-to-One Digital Marketing Coach", company: "Freelance", description: "Delivered personalized training sessions, simplifying complex concepts to help clients execute real-world campaigns." },
  { icon: <Briefcase />, title: "Account Manager", company: "Business Empire", description: "Managed key accounts across diverse niches including fashion, cosmetics & real estate." },
  { icon: <Building />, title: "Real Estate Campaigns", company: "OFQ, Royal City", description: "Led successful digital marketing campaigns for major real estate developers." },
  { icon: <LineChart />, title: "Stock Market & Financial Analyst", company: "Self-Directed", description: "Specialized in economic, political, and technical analysis of financial markets." },
];

// --- مهارات ---
const skillsData = [
  "Analytical & Creative Thinker", "Content Strategy", "Google Ads", "Meta Ads", "TikTok Ads",
  "Snapchat Ads", "Email Marketing", "Lead Generation", "Shopify Development",
  "KPI Tracking", "A/B Testing", "Communication", "Presentation Skills", "Media Strategy", "Budget Management"
];

// --- مشاريع ---
const projectsData = [
  { title: "Fashion & Apparel", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format&fit=crop&q=60" },
  { title: "Cosmetics & Beauty", image: "https://www.dhl.com/discover/content/dam/hong-kong/desktop/e-commerce-advice/e-commerce-guides-by-country/guide-to-packaging-and-shipping-cosmetics-and-beauty-products-from-hong-kong/cosmetic-and-beauty-products-in-a-shipping-box-1920x998.jpg" },
  { title: "Real Estate", image: "https://www.agentadvice.com/wp-content/uploads/2020/12/shutterstock_1247473441-scaled.jpg" },
  { title: "Medical & Healthcare", image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=500&auto=format&fit=crop&q=60" },
  { title: "Restaurants & Cafés", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60" },
  { title: "Furniture & Interiors", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60" },
  { title: "SaaS", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60" },
  { title: "Tech", image: "https://www.eurokidsindia.com/blog/wp-content/uploads/2023/12/names-of-electronic-devices-in-english.jpg" },
];

// --- العدّاد المتحرك ---
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

// --- التفاف الأقسام (لنفس الهيكل) ---
const SectionWrapper = React.forwardRef(({ id, title, children, className }, ref) => (
  <motion.section
    ref={ref}
    id={id}
    className={`py-20 md:py-28 ${className}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
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

// --- زر العودة للأعلى ---
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

// --- مودال الخدمات ---
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
  { title: 'Build Shopify Store', icon: <IconShopify size={48} />, link: 'https://forms.gle/SfkP6rgmFm2oVPs79' },
  { title: 'Consultations', icon: <HelpCircle size={48} />, link: 'https://forms.gle/C1pAyQRi2fmxzFEK8' },
  { title: 'E-Commerce Brand? Scale or Startup', icon: <Users size={48} />, link: 'https://forms.gle/CzZKmtHBNmXWeKDHA' },
  { title: 'Lead-Gen / Digital-Products', icon: <Layers size={48} />, link: 'https://forms.gle/KP7VhseUnEmmBmz49' },
  { title: 'Multi-Brand Management', icon: <BarChart2 size={48} />, link: 'https://docs.google.com/forms/d/e/1FAIpQLSfw9dkRCOMLaoN2FwDmcG6iCpyjQq5kQFnr4SZVo0h0gLYqiA/viewform' },
  { title: 'Others', icon: <MoreHorizontal size={48} />, link: 'https://docs.google.com/forms/d/e/1FAIpQLSciaASGQ9zYjllG3gXcZVq5Z_1pu-mSh8dtCqgJeyIRswTExw/viewform' },
];

function ServicesModal({ onClose }) {
  return (
    <ModalBackdrop onClose={onClose}>
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

// ===== مكون SocialCircle: دائرة أيقونات السوشيال المتحركة والديناميكية ====

const platforms = [
  { name: 'Facebook', icon: <FaFacebookF size={28} color="#1877F2" /> },
  { name: 'Instagram', icon: <FaInstagram size={28} color="#fff" /> },
  { name: 'Google', icon: <FaGoogle size={28} color="#fff" /> },
  { name: 'Snapchat', icon: <FaSnapchatGhost size={28} color="#222" /> },
  { name: 'LinkedIn', icon: <FaLinkedinIn size={28} color="#fff" /> },
  { name: 'YouTube', icon: <FaYoutube size={28} color="#fff" /> },
  { name: 'X', icon: <FaXTwitter size={28} color="#fff" /> },
  { name: 'TikTok', icon: <FaTiktok size={28} color="#fff" /> },
  { name: 'Pinterest', icon: <FaPinterestP size={28} color="#fff" /> }
];

function SocialCircle() {
  const circleRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [velocity, setVelocity] = useState(0.02); // سرعة الدوران الافتراضية
  const [dragLastX, setDragLastX] = useState(null);
  const [iconBump, setIconBump] = useState(Array(platforms.length).fill(false));
  const animReq = useRef();

  // الدوران الاوتوماتيكي
  useEffect(() => {
    function animate(ts) {
      if (!dragging) setAngle(a => a + velocity);
      animReq.current = requestAnimationFrame(animate);
    }
    animReq.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animReq.current);
  }, [dragging, velocity]);

  // تعامل مع السحب
  function handlePointerDown(e) {
    setDragging(true);
    setDragLastX(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  }
  function handlePointerUp() {
    setDragging(false);
    setDragLastX(null);
    // اهتزاز عند ترك السحب
    setVelocity(Math.max(Math.min(velocity, 0.06), -0.06));
    setTimeout(() => setVelocity(0.02), 600);
  }
  function handlePointerMove(e) {
    if (!dragging) return;
    const posX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const dx = posX - dragLastX;
    setAngle(a => a + dx * 0.01);
    setVelocity(dx * 0.003);
    setDragLastX(posX);
  }

  // فرقعة أو أنيميشن الأيقونة عند الضغط
  function boomIcon(idx) {
    setIconBump(b => {
      let res = [...b];
      res[idx] = true;
      return res;
    });
    setTimeout(() => {
      setIconBump(b => {
        let res = [...b];
        res[idx] = false;
        return res;
      });
    }, 250);
  }

  // حجم الدائرة بناءً على عرض الشاشة
  const size = typeof window !== "undefined" && window.innerWidth < 600 ? 220 : 330;
  const radius = size / 2 - 38;

  return (
    <div
      ref={circleRef}
      className="relative w-[220px] h-[220px] sm:w-[330px] sm:h-[330px] mx-auto my-16 select-none touch-none"
      style={{
        userSelect: 'none',
        touchAction: 'none',
        WebkitTapHighlightColor: 'transparent',
        cursor: dragging ? 'grabbing' : 'grab',
        marginTop: '56px',
        marginBottom: '30px',
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      onTouchMove={handlePointerMove}
      title="اسحب أو لف الدائرة للعب!"
    >
      {/* دائرة خارجية خفيفة محيطية */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "3px solid rgba(255,0,0,0.13)",
          boxShadow: "0 0 32px 2px rgba(255,0,0,0.13) inset"
        }}
      />

      {/* الأيقونات موزعة بشكل دائري */}
      {platforms.map((platform, idx) => {
        const θ = ((2 * Math.PI) / platforms.length) * idx + angle;
        const x = radius * Math.cos(θ) + size / 2 - 28;
        const y = radius * Math.sin(θ) + size / 2 - 28;
        return (
          <motion.div
            key={platform.name}
            style={{ position: "absolute", left: x, top: y, zIndex: 10 }}
            animate={{
              scale: iconBump[idx] ? [1, 1.7, 0.8, 1.2, 1] : 1,
              rotate: iconBump[idx] ? [0, 22, -16, 8, 0] : 0,
            }}
            transition={{ type: "spring", stiffness: 340, damping: 16, duration: 0.35 }}
            whileHover={{ scale: 1.24 }}
            onPointerDown={e => { e.stopPropagation(); boomIcon(idx); }}
            onTouchStart={e => { e.stopPropagation(); boomIcon(idx); }}
            className="transition-transform pointer-events-auto hover:shadow-2xl"
            tabIndex={0}
            title={platform.name}
          >
            <div
              className="bg-neutral-950 border border-neutral-800/80 p-3 rounded-full shadow-md select-none"
              style={{ boxShadow: "0 8px 26px -2px rgba(255,0,0,0.08)" }}
            >
              {platform.icon}
            </div>
            <span className="block mt-2 text-xs text-neutral-400 text-center font-semibold pointer-events-none">
              {platform.name} <span className="text-red-500 font-bold">Ads</span>
            </span>
          </motion.div>
        );
      })}

      {/* النص في المركز */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20 select-none pointer-events-none"
        initial={{ scale: 0.76, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <div
          className="text-3xl font-extrabold text-neutral-100 tracking-tight"
          style={{
            letterSpacing: '0.14em',
            textShadow: '0 1px 16px rgba(255,0,0,0.09), 0 1px 8px rgba(20,180,190,0.14)'
          }}
        >
          Ads
        </div>
      </motion.div>
    </div>
  );
}

// --- ملف Portfolio الرئيسي مع دمج SocialCircle ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showServices, setShowServices] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)),
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
            Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Digital Growth</span> Partner.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-300 mb-8"
          >
            {personalInfo.title}
          </motion.p>

          {/* زرار Let’s Work Together */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
              onClick={() => setShowServices(true)}
              type="button"
            >
              Let’s Work Together
            </Button>
          </motion.div>
        </section>

        {/* هنا نضيف مكون SocialCircle بين زر Let’s Work Together وقسم About Me */}
        <SocialCircle />

        {/* قسم About Me */}
        <SectionWrapper ref={sectionRefs.about} id="about" title="About Me">
          <p className="text-lg text-center leading-relaxed text-neutral-300 max-w-3xl mx-auto">
            With over 4 years in digital marketing, performance media buying, and e-commerce growth,
            I specialize in transforming brands. I develop high-converting Shopify stores, scale ad campaigns to new heights,
            and coach businesses to success. My diverse background in trading, economic analysis, and content production gives me
            a unique, data-driven yet creative approach to every challenge.
          </p>
        </SectionWrapper>

        {/* باقي الأقسام كما هي */}
        <SectionWrapper ref={sectionRefs.experience} id="experience" title="Experience Timeline">
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-neutral-800 -translate-x-1/2" />
            {experienceData.map((item, index) => (
              <motion.div
                key={index}
                className={`mb-12 flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <div className="hidden md:block w-1/2" />
                <div className="relative w-full md:w-1/2">
                  <div className="absolute -left-1.5 md:left-auto md:right-full md:mr-6 lg:mr-7 top-1 w-8 h-8 rounded-full bg-neutral-800 border-2 border-teal-500 flex items-center justify-center text-teal-400">{item.icon}</div>
                  <Card className="hover:border-teal-500/50 transition-colors">
                    <CardContent>
                      <p className="text-xs text-amber-400 mb-1">{item.date}</p>
                      <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-400 font-medium mb-3">{item.company}</p>
                      <p className="text-neutral-400">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills & Expertise">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skillsData.map((skill, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium">{skill}</motion.div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Industries">
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

        {/* تاريخ التعليم والخبرات الإضافية */}
        <div className="grid md:grid-cols-2 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center max-w-md mx-auto">
            <Camera className="mx-auto text-amber-400 mb-4" size={40} />
            <p className="text-neutral-300 leading-relaxed">
              Supervised full-cycle photo/video shoots, managed influencer collaborations, and developed compelling ad creatives and storytelling strategies to build brand narratives that resonate.
            </p>
          </div>
          <div className="text-center max-w-md mx-auto">
            <GraduationCap className="mx-auto text-amber-400 mb-4" size={40} />
            <p className="text-neutral-300 leading-relaxed">
              Bachelor of Business Administration from Ain Shams University, gaining foundations in marketing, finance, and economics. Explored emerging markets like crypto, NFTs, and digital goods.
            </p>
          </div>
        </div>
      </main>

      {/* الفوتر */}
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

      {/* زر العودة لأعلى */}
      <ScrollToTopButton />

      {/* مودال الخدمات */}
      <AnimatePresence>
        {showServices && <ServicesModal onClose={() => setShowServices(false)} />}
      </AnimatePresence>
    </div>
  );
}
