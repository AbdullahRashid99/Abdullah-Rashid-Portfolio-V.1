<!DOCTYPE html>
<html lang="ar" dir="rtl" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abdullah Rashid - Portfolio</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            purple: '#623697',
                            gold: '#fbb03b',
                            teal: '#14b8a6',
                            sky: '#38bdf8'
                        }
                    }
                }
            }
        }
    </script>
    
    <!-- FontAwesome & Google Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- React & ReactDOM & Babel -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        body {
            font-family: 'Inter', 'Cairo', sans-serif;
            background-color: #09090b;
            color: #ffffff;
            overflow-x: hidden;
            user-select: none;
            -webkit-user-select: none;
            -webkit-touch-callout: none;
        }

        /* Hide Scrollbar */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* Smooth Star Animation */
        @keyframes pulseGlow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
        }
        .glow-bg {
            animation: pulseGlow 6s infinite ease-in-out;
        }
    </style>
</head>
<body class="bg-neutral-950 text-white min-h-screen relative selection:bg-teal-500 selection:text-black">

    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        // --- Personal Information Data ---
        const personalInfo = {
            name: "Abdullah Rashid",
            title: "E-Com Media Buyer | Shopify Developer | Google Certified Digital Marketer & E-commerce Expert",
            linkedin: "https://www.linkedin.com/in/abdullah-rashid4444/",
            whatsapp: "https://wa.me/+201025030220",
            profileImage: "https://i.postimg.cc/2574Ss9d/9c10a25ab53cc9bdf0a8fc20082d0868-tplv-tiktokx-cropcenter-1080-1080.jpg",
            tiktok: "https://www.tiktok.com/@abdallah_rashidx",
            email: "contact@abdullahrashid.com"
        };

        const skillsData = [
            "Problem Solver", "Meta Ads", "TikTok Ads", "Google Ads", 
            "Conversion Rate Optimization", "Business Consultant", "Copywriting", "Shopify Developer"
        ];

        const Navbar = ({ activeSection }) => {
            const [isMenuOpen, setIsMenuOpen] = useState(false);
            return (
                <nav className="sticky top-0 left-0 w-full bg-neutral-950/80 backdrop-blur-md z-50 border-b border-neutral-800/80">
                    <div className="max-w-6xl mx-auto flex justify-between items-center p-4" dir="ltr">
                        <a href="#home" className="text-xl md:text-2xl font-black tracking-tight text-white hover:text-teal-400 transition-colors">
                            {personalInfo.name}
                        </a>
                        <div className="hidden md:flex gap-8 items-center">
                            <a href="#skills" className={`text-sm font-medium transition-colors ${activeSection === 'skills' ? 'text-teal-400 font-bold' : 'text-neutral-400 hover:text-white'}`}>Skills</a>
                            <a href="#projects" className={`text-sm font-medium transition-colors ${activeSection === 'projects' ? 'text-teal-400 font-bold' : 'text-neutral-400 hover:text-white'}`}>Results</a>
                            <a href={personalInfo.whatsapp} target="_blank" className="bg-teal-500/10 text-teal-400 border border-teal-500/30 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-teal-500 hover:text-black transition-all">
                                Contact
                            </a>
                        </div>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-neutral-300 p-2">
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex flex-col gap-4 text-center">
                            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="text-neutral-300 hover:text-teal-400 py-1">Skills</a>
                            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-neutral-300 hover:text-teal-400 py-1">Results</a>
                            <a href={personalInfo.whatsapp} target="_blank" className="bg-teal-500 text-black font-bold py-2 rounded-lg">Get in Touch</a>
                        </div>
                    )}
                </nav>
            );
        };

        const SocialCircle = () => {
            const socialLinks = [
                { icon: 'fab fa-linkedin-in', url: personalInfo.linkedin, title: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
                { icon: 'fab fa-whatsapp', url: personalInfo.whatsapp, title: 'WhatsApp', color: 'hover:bg-emerald-500 hover:text-white' },
                { icon: 'fab fa-tiktok', url: personalInfo.tiktok, title: 'TikTok', color: 'hover:bg-pink-600 hover:text-white' },
                { icon: 'fas fa-envelope', url: `mailto:${personalInfo.email}`, title: 'Email', color: 'hover:bg-amber-500 hover:text-white' }
            ];

            return (
                <div className="py-8 flex flex-col items-center justify-center gap-4">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Connect & Follow</p>
                    <div className="flex items-center gap-4">
                        {socialLinks.map((s, idx) => (
                            <a
                                key={idx}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={s.title}
                                className={`w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 text-lg transition-all transform hover:-translate-y-1 hover:scale-110 shadow-lg ${s.color}`}
                            >
                                <i className={s.icon}></i>
                            </a>
                        ))}
                    </div>
                </div>
            );
        };

        const CERT_IMAGES = [
            'https://i.postimg.cc/rsxncdPk/65952225.jpg',
            'https://i.postimg.cc/B6dYd5MJ/6NXTTFXQ7B77-page-0001.jpg',
            'https://i.postimg.cc/Znp7Z9Mt/7WWC9OROA2E2-page-0001.jpg',
            'https://i.postimg.cc/0jDWx6Bv/CINQDM1IJMQR-page-0001.jpg',
            'https://i.postimg.cc/WzgWjDH4/CJB4ROD8WKVL-page-0001.jpg',
            'https://i.postimg.cc/9Mv8vP1d/3ZWC24LXWG87_page_0001.jpg',
            'https://i.postimg.cc/BZKw2ynt/Google-Certification.png',
        ];

        const ImageSlider = ({ onImageClick }) => {
            const containerRef = useRef(null);
            const [isPaused, setIsPaused] = useState(false);

            useEffect(() => {
                const el = containerRef.current;
                if (!el) return;
                let lastTime = 0;
                let rafId;
                const speed = 40;

                const step = (ts) => {
                    if (!lastTime) lastTime = ts;
                    const dt = (ts - lastTime) / 1000;
                    lastTime = ts;

                    if (!isPaused) {
                        el.scrollLeft += speed * dt;
                        if (el.scrollLeft >= el.scrollWidth / 2) {
                            el.scrollLeft = 0;
                        }
                    }
                    rafId = requestAnimationFrame(step);
                };
                rafId = requestAnimationFrame(step);
                return () => cancelAnimationFrame(rafId);
            }, [isPaused]);

            const duplicated = [...CERT_IMAGES, ...CERT_IMAGES];

            return (
                <div className="w-full py-10">
                    <div className="max-w-5xl mx-auto overflow-hidden px-4">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <i className="fas fa-certificate text-amber-400 text-xl"></i>
                            <h3 className="text-xl md:text-2xl font-bold text-center text-amber-400">Google & Official Certifications</h3>
                        </div>
                        <div 
                            ref={containerRef}
                            className="flex overflow-x-hidden gap-4 py-2 no-scrollbar cursor-grab"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {duplicated.map((src, i) => (
                                <div 
                                    key={i} 
                                    className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-400/50 transition-all hover:scale-105 cursor-pointer shadow-md"
                                    onClick={() => onImageClick(CERT_IMAGES, i % CERT_IMAGES.length)}
                                >
                                    <img src={src} className="w-full h-full object-cover" alt="Certification" draggable="false" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

        const GalleryModal = ({ images, startIndex, onClose }) => {
            const [index, setIndex] = useState(startIndex);

            useEffect(() => {
                const handleKeyDown = (e) => {
                    if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
                    if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
                    if (e.key === 'Escape') onClose();
                };
                window.addEventListener('keydown', handleKeyDown);
                return () => window.removeEventListener('keydown', handleKeyDown);
            }, [images, onClose]);

            if (!images || !images.length) return null;

            return (
                <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 backdrop-blur-md" onClick={onClose}>
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        
                        {/* Close Button */}
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 z-50 bg-neutral-900/80 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-all border border-neutral-700"
                        >
                            <i className="fas fa-times text-lg"></i>
                        </button>

                        {/* Prev Button */}
                        <button 
                            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                            className="absolute left-2 md:left-4 z-50 bg-neutral-900/80 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-all border border-neutral-700"
                        >
                            <i className="fas fa-chevron-left text-xl"></i>
                        </button>

                        {/* Image Display */}
                        <div className="rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 max-h-[85vh] flex items-center justify-center relative shadow-2xl">
                            <img 
                                src={images[index]} 
                                alt="Enlarged view" 
                                className="max-w-full max-h-[80vh] object-contain select-none"
                                draggable="false"
                            />
                        </div>

                        {/* Next Button */}
                        <button 
                            onClick={() => setIndex((i) => (i + 1) % images.length)}
                            className="absolute right-2 md:right-4 z-50 bg-neutral-900/80 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-neutral-800 transition-all border border-neutral-700"
                        >
                            <i className="fas fa-chevron-right text-xl"></i>
                        </button>

                        {/* Index Indicator */}
                        <div className="absolute -bottom-8 text-neutral-400 text-xs font-mono">
                            {index + 1} / {images.length}
                        </div>
                    </div>
                </div>
            );
        };

        const BannerStrip = ({ images, reverse, onImageClick }) => {
            const containerRef = useRef(null);
            const [isPaused, setIsPaused] = useState(false);
            const resumeTimerRef = useRef(null);

            useEffect(() => {
                const el = containerRef.current;
                if (!el) return;
                let lastTime = 0;
                let rafId;
                const speed = 70;

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
            }, [isPaused, reverse]);

            const handleMouseEnter = () => {
                setIsPaused(true);
                if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
            };

            const handleMouseLeave = () => {
                resumeTimerRef.current = setTimeout(() => {
                    setIsPaused(false);
                }, 3000);
            };

            const duplicated = [...images, ...images];

            return (
                <div 
                    ref={containerRef}
                    className="w-full overflow-x-auto no-scrollbar flex select-none py-2 cursor-grab active:cursor-grabbing"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex gap-4">
                        {duplicated.map((src, i) => (
                            <div 
                                key={i} 
                                className="w-[85vw] md:w-[45vw] lg:w-[32vw] flex-shrink-0 h-[260px] md:h-[350px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer shadow-xl transition-transform duration-300 hover:scale-[1.02] hover:border-teal-500/50"
                                onClick={() => onImageClick(src)}
                            >
                                <img 
                                    src={src} 
                                    alt="Proof of Result" 
                                    className="w-full h-full object-cover" 
                                    draggable="false"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        const MultiStripBanners = ({ onImageClick }) => {
            const row1 = ["https://i.postimg.cc/C5GsYm88/11.png", "https://i.postimg.cc/wMXQH0N1/8.png", "https://i.postimg.cc/qqsx0jK6/10.png"];
            const row2 = ["https://i.postimg.cc/L5t3RNPm/1.png", "https://i.postimg.cc/D0rPFBGm/5.png", "https://i.postimg.cc/mkfy00Pg/Untitled-design-(1).png", "https://i.postimg.cc/cCRBZX34/2.png", "https://i.postimg.cc/7h3nDmzH/4.png"];
            const row3 = ["https://i.postimg.cc/Zn8xZVNp/12.png", "https://i.postimg.cc/Xqfk3Q5G/9.png"];

            const allImages = [...row1, ...row2, ...row3];

            const handleSingleClick = (src) => {
                const idx = allImages.indexOf(src);
                onImageClick(allImages, idx >= 0 ? idx : 0);
            };

            return (
                <div className="space-y-6">
                    <BannerStrip images={row1} reverse={false} onImageClick={handleSingleClick} />
                    <BannerStrip images={row2} reverse={true} onImageClick={handleSingleClick} />
                    <BannerStrip images={row3} reverse={false} onImageClick={handleSingleClick} />
                </div>
            );
        };

        const ServicesModal = ({ onClose }) => {
            const servicesList = [
                { 
                    title: 'Startup Launchpad', 
                    desc: 'Perfect for new e-commerce stores wanting rapid initial sales traction & proven strategy.',
                    icon: 'fa-rocket', 
                    link: 'https://docs.google.com/forms/d/e/1FAIpQLSdEBwP65M40klTsS3_3eez_y8Sjj5lbLI276pYZ1omnuF2ZVQ/viewform' 
                },
                { 
                    title: 'Scale & Dominate', 
                    desc: 'For established brands looking to scale media buying budget efficiently with high ROAS.',
                    icon: 'fa-chart-line', 
                    link: 'https://docs.google.com/forms/d/e/1FAIpQLSfpnHDVpZeI_7Q5srnURXlnPzfLUhuyiPzptUeqj77uyeeRVg/viewform' 
                },
            ];

            return (
                <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4 backdrop-blur-md" onClick={onClose}>
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-2xl relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl">
                            <i className="fas fa-times"></i>
                        </button>
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-center text-teal-400">E-Commerce Growth Services</h2>
                        <p className="text-neutral-400 text-center text-sm mb-8">Select your business stage to get a tailored consultation</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {servicesList.map((item, index) => (
                                <div key={index} className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-teal-500/50 transition-all group">
                                    <div>
                                        <div className="w-12 h-12 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center text-2xl mb-4 group-hover:bg-teal-500 group-hover:text-black transition-colors">
                                            <i className={`fas ${item.icon}`}></i>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                        <p className="text-neutral-400 text-xs leading-relaxed mb-6">{item.desc}</p>
                                    </div>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block text-center bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-lg text-sm transition-all shadow-md">
                                        Start Form <i className="fas fa-arrow-right ml-1"></i>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

        const Portfolio = () => {
            const [activeSection, setActiveSection] = useState('home');
            const [showServices, setShowServices] = useState(false);
            const [modalGallery, setModalGallery] = useState({ open: false, images: [], index: 0 });
            const [showScrollTop, setShowScrollTop] = useState(false);

            useEffect(() => {
                const handleScroll = () => {
                    setShowScrollTop(window.scrollY > 400);
                };
                window.addEventListener('scroll', handleScroll);
                return () => window.removeEventListener('scroll', handleScroll);
            }, []);

            const openGallery = (images, startIndex = 0) => {
                setModalGallery({ open: true, images, index: startIndex });
            };

            return (
                <div className="min-h-screen flex flex-col justify-between relative" dir="ltr">
                    
                    {/* Background Star Overlay */}
                    <div className="fixed inset-0 pointer-events-none z-0 glow-bg">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-neutral-950 to-neutral-950"></div>
                    </div>

                    <div className="relative z-10">
                        {/* Top Navigation Bar */}
                        <Navbar activeSection={activeSection} />

                        {/* Main Container */}
                        <main className="max-w-5xl mx-auto px-4 pb-20 pt-12">
                            
                            {/* HERO SECTION */}
                            <section id="home" className="min-h-[80vh] flex flex-col justify-center items-center text-center relative py-12">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500 to-amber-400 blur-lg opacity-40 animate-pulse"></div>
                                    <img 
                                        src={personalInfo.profileImage} 
                                        alt={personalInfo.name} 
                                        className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-neutral-800 relative z-10 shadow-2xl" 
                                        draggable="false"
                                    />
                                </div>

                                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
                                    {personalInfo.name}
                                    <span className="block text-2xl md:text-3xl font-extrabold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-sky-400 to-amber-400">
                                        Your E-Com Growth Partner
                                    </span>
                                </h1>

                                <p className="max-w-2xl text-neutral-300 text-sm md:text-base leading-relaxed mb-8">
                                    {personalInfo.title}
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <button 
                                        onClick={() => setShowServices(true)}
                                        className="bg-teal-500 hover:bg-teal-400 text-black font-extrabold px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all transform hover:scale-105"
                                    >
                                        Start Here <i className="fas fa-sparkles ml-1"></i>
                                    </button>
                                </div>
                            </section>

                            {/* CERTIFICATIONS SECTION */}
                            <ImageSlider onImageClick={openGallery} />

                            {/* SKILLS SECTION */}
                            <section id="skills" className="py-16 border-t border-neutral-900">
                                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">
                                    Core <span className="text-teal-400">Expertise & Skills</span>
                                </h2>
                                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                                    {skillsData.map((skill, i) => (
                                        <div 
                                            key={i} 
                                            className="bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-teal-500/40 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm"
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* RESULTS SECTION */}
                            <section id="projects" className="py-16 border-t border-neutral-900">
                                <div className="text-center mb-10">
                                    <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
                                        Client <span className="text-teal-400">Results & Case Proofs</span>
                                    </h2>
                                    <p className="text-neutral-400 text-sm">Real ad accounts, revenue dashboards, and campaign metrics</p>
                                </div>
                                <MultiStripBanners onImageClick={openGallery} />
                            </section>

                            {/* EDUCATION BANNER */}
                            <div className="text-center my-16 bg-neutral-900/50 border border-neutral-800/80 p-8 rounded-2xl max-w-xl mx-auto">
                                <i className="fas fa-graduation-cap text-amber-400 text-3xl mb-3"></i>
                                <h4 className="text-white font-bold text-lg mb-1">Education Background</h4>
                                <p className="text-neutral-400 text-sm">Bachelor of Business Administration from Ain Shams University</p>
                            </div>
                        </main>
                    </div>

                    {/* FOOTER */}
                    <footer className="relative z-10 text-center py-10 border-t border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
                        <div className="flex justify-center gap-6 mb-4">
                            <a href={personalInfo.linkedin} target="_blank" className="text-neutral-500 hover:text-teal-400 text-xl transition-colors">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href={personalInfo.whatsapp} target="_blank" className="text-neutral-500 hover:text-emerald-500 text-xl transition-colors">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                            <a href={personalInfo.tiktok} target="_blank" className="text-neutral-500 hover:text-pink-500 text-xl transition-colors">
                                <i className="fab fa-tiktok"></i>
                            </a>
                        </div>
                        <p className="text-neutral-500 text-xs font-mono">
                            © 2022 - {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
                        </p>
                    </footer>

                    {/* Scroll To Top Button */}
                    {showScrollTop && (
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="fixed bottom-6 right-6 bg-teal-500 text-black w-12 h-12 rounded-full shadow-2xl z-50 flex items-center justify-center hover:bg-teal-400 transition-all"
                        >
                            <i className="fas fa-arrow-up text-lg"></i>
                        </button>
                    )}

                    {/* Modals */}
                    {showServices && <ServicesModal onClose={() => setShowServices(false)} />}
                    {modalGallery.open && (
                        <GalleryModal 
                            images={modalGallery.images} 
                            startIndex={modalGallery.index} 
                            onClose={() => setModalGallery({ open: false, images: [], index: 0 })} 
                        />
                    )}
                </div>
            );
        };

        const rootElement = document.getElementById('root');
        const root = ReactDOM.createRoot(rootElement);
        root.render(<Portfolio />);
    </script>
</body>
</html>
