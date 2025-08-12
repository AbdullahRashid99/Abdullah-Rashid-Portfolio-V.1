// src/components/SocialCircle.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaGoogle, FaSnapchatGhost, FaLinkedinIn, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';

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

export default function SocialCircle() {
  const radius = 120; // نصف قطر الدائرة
  return (
    <div className="relative flex items-center justify-center w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
      
      {/* مجموعة الأيقونات اللي بتلف */}
      <div className="absolute w-full h-full animate-spin-slow">
        {platforms.map((platform, index) => {
          const angle = (index / platforms.length) * (2 * Math.PI);
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <div
              key={platform.name}
              className="absolute transition-transform duration-300 hover:scale-125"
              style={{
                transform: `translate(${160 + x}px, ${160 + y}px)` // 160 هو نصف عرض الـ container
              }}
            >
              <div className="bg-neutral-900 p-3 rounded-full shadow-lg border border-neutral-800">
                {platform.icon}
              </div>
            </div>
          );
        })}
      </div>

      {/* النص في المنتصف */}
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-neutral-300 font-semibold">Follow Me</span>
      </div>
    </div>
  );
}
