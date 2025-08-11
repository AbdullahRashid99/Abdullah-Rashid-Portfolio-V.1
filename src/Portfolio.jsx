import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, User, Briefcase, Star, Folder, Menu, X, Send, Linkedin, Phone,
  Award, Target, Megaphone, ShoppingCart, UserCheck, Building, LineChart,
  Camera, GraduationCap, ArrowRight, Palette, Code, BarChart3,
  Tiktok, Instagram, Dribbble, Twitter, ArrowUp,
  ShoppingCart as IconShopify,   // تجنب تكرار اسم ShoppingCart
  HelpCircle,
  Users,
  Layers,
  BarChart2,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion';

// استيراد أيقونات منصات التواصل من react-icons
import { FaFacebookF, FaInstagram, FaGoogle, FaSnapchatGhost, FaLinkedinIn, FaTiktok } from "react-icons/fa";

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
  { id: "contact", title: "Contact" },
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

// --- مكون أيقونات منصات التواصل الاجتماعي بشكل مثلث ---
import { FaFacebookF, FaInstagram, FaGoogle, FaSnapchatGhost, FaLinkedinIn, FaTiktok } from "react-icons/fa";

function SocialMediaIcons() {
  const icons = [
    { icon: <FaFacebookF size={30} color="#fff" />, name: "Facebook", ads: "Facebook Ads", colorClass: "from-[#1877f2] to-[#4364f7]", hoverShadow: "rgba(33,207,239,0.3)" },
    { icon: <FaInstagram size={30} color="#fff" />, name: "Instagram", ads: "Instagram Ads", colorClass: "from-pink-500 via-[#fccc63] to-purple-500", hoverShadow: "rgba(236,72,153,0.14)" },
    { icon: <FaGoogle size={30} color="#fff" />, name: "Google", ads: "Google Ads", colorClass: "from-[#34a853] via-[#fbbc05] to-[#ea4335]", hoverShadow: "rgba(52,168,83,0.12)" },
    { icon: <FaTiktok size={30} color="#fff" />, name: "TikTok", ads: "TikTok Ads", colorClass: "from-[#222] to-[#222]", hoverShadow: "rgba(105,201,208,0.3)" },
    { icon: <FaSnapchatGhost size={30} color="#222" />, name: "Snapchat", ads: "Snapchat Ads", colorClass: "from-yellow-300 to-yellow-500", hoverShadow: "rgba(255,234,0,0.10)" },
    { icon: <FaLinkedinIn size={30} color="#fff" />, name: "LinkedIn", ads: "LinkedIn Ads", colorClass: "from-[#00aaff] to-[#283e63]", hoverShadow: "rgba(0,170,255,0.11)" },
  ];

  const renderIcon = ({ icon, name, ads, colorClass, hoverShadow }, key) => (
    <motion.div
      key={key}
      className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110"
      whileHover={{ scale: 1.1 }}
    >
      <div 
        className={`bg-gradient-to-br ${colorClass} rounded-full p-3 shadow-md`}
        style={{ boxShadow: `0 6px 20px -2px ${hoverShadow}` }}
      >
        {icon}
      </div>
      <span className="mt-2 font-medium text-sm text-neutral-300 select-none">{name}</span>
      <span className="text-xs text-neutral-400 select-none">{ads}</span>
    </motion.div>
  );

  return (
    <div className="mt-12 flex flex-col items-center gap-8">
      {/* صف 1 - 3 أيقونات */}
      <div className="flex gap-8 justify-center w-full max-w-lg">
        {icons.slice(0, 3).map((icon, idx) => renderIcon(icon, idx))}
      </div>
      {/* صف 2 - 2 أيقونة */}
      <div className="flex gap-8 justify-center w-full max-w-md">
        {icons.slice(3, 5).map((icon, idx) => renderIcon(icon, idx+3))}
      </div>
      {/* صف 3 - 1 أيقونة */}
      <div className="flex justify-center w-full max-w-xs">
        {renderIcon(icons[5], 5)}
      </div>
    </div>
  );
}

// في ملف Portfolio نضيف بين زر Let’s Work Together وقسم About Me
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
          {/* background */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-950 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:32px_32px]" />

          {/* صورة ونص */}
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

          {/* زر Let’s Work Together */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30"
              onClick={() => setShowServices(true)}
              type="button"
            >
              Let’s Work Together
            </Button>
          </motion.div>
        </section>

        {/* هنا المكون الجديد لأيقونات السوشيال ميديا بالترتيب المثلث */}
        <SocialMediaIcons />

        {/* قسم About Me */}
        <SectionWrapper ref={sectionRefs.about} id="about" title="About Me">
          <p className="text-lg text-center leading-relaxed text-neutral-300 max-w-3xl mx-auto">
            With over 4 years in digital marketing, performance media buying, and e-commerce growth,
            I specialize in transforming brands. I develop high-converting Shopify stores, scale ad campaigns to new heights, and coach businesses to success. My diverse background in trading, economic analysis, and content production gives me a unique, data-driven yet creative approach to every challenge.
          </p>
        </SectionWrapper>

        {/* باقي الأقسام كما هي */}

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

      {/* زر العودة لأعلى */}
      <ScrollToTopButton />

      {/* مودال الخدمات */}
      <AnimatePresence>
        {showServices && <ServicesModal onClose={() => setShowServices(false)} />}
      </AnimatePresence>
    </div>
  );
}
