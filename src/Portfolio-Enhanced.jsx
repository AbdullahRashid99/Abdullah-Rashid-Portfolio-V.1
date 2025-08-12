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

// استيراد المكونات الجديدة
import SocialCircle from './components/SocialCircle';
import AnimatedBackground from './components/AnimatedBackground';

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

// زر "Let's Work Together" المتوهج
const GlowingWorkButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-8 py-4 bg-gradient-to-r from-teal-500 to-sky-500 text-white font-bold rounded-lg overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* التوهج الأساسي */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-sky-400 opacity-75 blur-lg animate-glass-shine"></div>
      
      {/* الخلفية الأساسية */}
      <div className="relative z-10">
        Let's Work Together
      </div>
      
      {/* تأثير الزجاج المتحرك */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      
      <style jsx>{`
        @keyframes glass-shine {
          0%, 100% { 
            opacity: 0.75;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        .animate-glass-shine {
          animation: glass-shine 4s ease-in-out infinite;
        }
      `}</style>
    </motion.button>
  );
};

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

// --- التفاف الأقسام مع تحسين توقيت الظهور ---
const SectionWrapper = React.forwardRef(({ id, title, children, className }, ref) => (
  <motion.section
    ref={ref}
    id={id}
    className={`py-20 md:py-28 ${className}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }} // تقليل amount لظهور أسرع
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">{title}</span>
    </h2>
    {children}
  </motion.section>
));

// --- الناف بار ---
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

// --- ملف Portfolio الرئيسي ---
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
    <>
      {/* CSS للتحكم في التمرير والزوم */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
          width: 100%;
          max-width: 100vw;
        }
        
        * {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          box-sizing: border-box;
        }
        
        body {
          position: relative;
          -webkit-overflow-scrolling: touch;
        }
        
        /* منع التمرير الأفقي */
        .container, .max-w-7xl, .max-w-6xl, .max-w-4xl {
          max-width: 100%;
          overflow-x: hidden;
        }
        
        /* تحسين Industries section */
        #projects {
          scroll-margin-top: 100px;
        }
      `}</style>

      {/* الخلفية المتحركة */}
      <AnimatedBackground />
      
      <div className="min-h-screen bg-neutral-950 text-white relative">
        <Navbar activeSection={activeSection} />
        
        {/* Hero Section */}
        <section ref={sectionRefs.home} id="home" className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
          <div className="max-w-4xl mx-auto z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-teal-400 shadow-xl"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-sky-400">
                {personalInfo.name}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                {personalInfo.title}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <GlowingWorkButton onClick={() => setShowServices(true)} />
                <div className="flex gap-4">
                  <motion.a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={20} />
                    LinkedIn
                  </motion.a>
                  <motion.a
                    href={personalInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone size={20} />
                    WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* العجلة الاجتماعية */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <SocialCircle />
          </div>
        </section>

        {/* About Section */}
        <SectionWrapper ref={sectionRefs.about} id="about" title="About Me" className="px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-lg md:text-xl leading-relaxed text-neutral-300 mb-8">
                I'm a results-driven Senior Performance Marketer with extensive experience in E-commerce, 
                Google Ads, Meta Ads, and comprehensive digital marketing strategies. With 8+ Google 
                certifications and a proven track record of ROI optimization, I help businesses scale 
                through data-driven marketing approaches.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <Card className="text-center p-6">
                  <Award className="mx-auto mb-4 text-teal-400" size={48} />
                  <h3 className="text-xl font-semibold mb-2">8+ Certifications</h3>
                  <p className="text-neutral-400">Google certified across multiple marketing disciplines</p>
                </Card>
                <Card className="text-center p-6">
                  <Target className="mx-auto mb-4 text-teal-400" size={48} />
                  <h3 className="text-xl font-semibold mb-2">ROI Focused</h3>
                  <p className="text-neutral-400">Proven track record of campaign optimization</p>
                </Card>
                <Card className="text-center p-6">
                  <LineChart className="mx-auto mb-4 text-teal-400" size={48} />
                  <h3 className="text-xl font-semibold mb-2"><AnimatedCounter value={500000} /></h3>
                  <p className="text-neutral-400">Revenue generated for clients</p>
                </Card>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Experience Section */}
        <SectionWrapper ref={sectionRefs.experience} id="experience" title="Experience" className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="text-teal-400 mt-1 flex-shrink-0">
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                        <p className="text-teal-400 font-medium mb-3">{exp.company}</p>
                        <p className="text-neutral-300 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Skills Section */}
        <SectionWrapper ref={sectionRefs.skills} id="skills" title="Skills & Expertise" className="px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-4 text-center hover:border-teal-400 transition-colors"
                >
                  <span className="text-sm md:text-base font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Projects/Industries Section - محسن للظهور الأسرع */}
        <SectionWrapper ref={sectionRefs.projects} id="projects" title="Industries" className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projectsData.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }} // تقليل amount للظهور الأسرع
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent>
                      <h3 className="font-semibold text-center">{project.title}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Contact Section */}
        <SectionWrapper ref={sectionRefs.contact} id="contact" title="Get In Touch" className="px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-lg text-neutral-300 mb-8"
            >
              Ready to scale your business with performance marketing? 
              Let's discuss how I can help you achieve your goals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Linkedin size={20} />
                Connect on LinkedIn
              </a>
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Footer */}
        <footer className="bg-neutral-900 py-8 px-4 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-neutral-400">
              © 2024 {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </footer>

        <ScrollToTopButton />
        
        <AnimatePresence>
          {showServices && <ServicesModal onClose={() => setShowServices(false)} />}
        </AnimatePresence>
      </div>
    </>
  );
}
