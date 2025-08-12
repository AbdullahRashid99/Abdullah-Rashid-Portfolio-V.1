import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, FaInstagram, FaGoogle, FaSnapchatGhost, 
  FaLinkedinIn, FaYoutube, FaPinterestP, FaTiktok, FaTwitter,
  FaBars,  // أيقونة المنيو
  FaArrowDown  // أيقونة السهم للتمرير
} from 'react-icons/fa';

const platforms = [
  { name: 'Facebook', Icon: FaFacebookF, color: '#1877F2' },
  { name: 'Instagram', Icon: FaInstagram, color: '#E1306C' },
  { name: 'Google', Icon: FaGoogle, color: '#4285F4' },
  { name: 'Snapchat', Icon: FaSnapchatGhost, color: '#FFFC00' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, color: '#0077B5' },
  { name: 'YouTube', Icon: FaYoutube, color: '#FF0000' },
  { name: 'X', Icon: FaTwitter, color: '#1DA1F2' },
  { name: 'TikTok', Icon: FaTiktok, color: '#000000' },
  { name: 'Pinterest', Icon: FaPinterestP, color: '#E60023' }
];

export default function SocialCircle() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 1024);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const radius = isDesktop ? 200 : 120;
  const size = isDesktop ? 400 : 280;
  const iconSize = isDesktop ? 32 : 20;  // زيادة حجم الأيقونات

  return (
    <section
      className="flex justify-center items-center"
      style={{
        paddingTop: isDesktop ? '64px' : '32px',
        paddingBottom: isDesktop ? '64px' : '32px',
        minHeight: isDesktop ? '600px' : 'auto',
        position: 'relative',
      }}
    >
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {platforms.map((platform, index) => {
            const angle = (index / platforms.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius + size / 2 - iconSize / 2;
            const y = Math.sin(angle) * radius + size / 2 - iconSize / 2;

            return (
              <motion.div
                key={platform.name}
                className="absolute cursor-pointer group"
                style={{ left: x, top: y }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.3, animationPlayState: "paused" }}
              >
                <div
                  className="rounded-full shadow-lg flex items-center justify-center border border-neutral-700/50"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    backgroundColor: platform.color,
                    boxShadow: `0 4px 15px ${platform.color}40`,
                  }}
                >
                  <platform.Icon 
                    size={iconSize * 0.6} 
                    color={platform.name === 'Snapchat' ? '#000000' : '#FFFFFF'}
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {platform.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* أيقونة المنيو - حركة تمايل مستمرة */}
        <motion.div
          className="absolute top-4 left-4 cursor-pointer"
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaBars size={isDesktop ? 40 : 28} color="#FFF" />
        </motion.div>

        {/* سهم التمرير - حركة تصاعد وهبوط مستمرة */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaArrowDown size={isDesktop ? 36 : 24} color="#FFF" />
        </motion.div>

        {/* Center "Ads" text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
          <motion.div
            className="text-3xl font-bold text-white tracking-wide px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-700 shadow-xl"
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
                "0 0 15px rgba(255, 255, 255, 1), 0 0 25px rgba(255, 255, 255, 0.8)",
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Ads
          </motion.div>
        </div>
      </div>
    </section>
  );
}
