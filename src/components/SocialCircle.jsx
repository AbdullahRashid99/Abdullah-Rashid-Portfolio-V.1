import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import Footer from "@/components/footer";
import ServicesModal from "@/components/services-modal";
import AnimatedBackground from "@/components/animated-background";
import ScrollToTop from "@/components/scroll-to-top";

export default function Home() {
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  const showServicesModal = () => {
    setIsServicesModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const hideServicesModal = () => {
    setIsServicesModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Prevent unwanted touch behaviors and zoom
  useEffect(() => {
    // Prevent horizontal scrolling and unwanted scaling
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    const handleTouchEnd = (event: TouchEvent) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="bg-neutral-950 text-white font-inter overflow-x-hidden">
      <AnimatedBackground />
      
      <div className="main-content">
        <Navbar />
        <HeroSection onShowServicesModal={showServicesModal} />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <Footer />
        <ScrollToTop />
      </div>

      <ServicesModal 
        isOpen={isServicesModalOpen} 
        onClose={hideServicesModal} 
      />
    </div>
  );
}
