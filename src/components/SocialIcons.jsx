// src/components/SocialIcons.jsx
import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaGoogle, 
  FaSnapchatGhost, 
  FaLinkedinIn, 
  FaYoutube, 
  FaPinterestP
} from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';

const platforms = [
  {
    name: 'Facebook',
    icon: <FaFacebookF size={30} color="#1877F2" />,
    gradient: 'from-[#1877f2] to-[#4364f7]',
    shadow: 'rgba(33,207,239,0.3)'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram size={30} color="#fff" />,
    gradient: 'from-pink-500 via-[#fccc63] to-purple-500',
    shadow: 'rgba(236,72,153,0.14)'
  },
  {
    name: 'Google',
    icon: <FaGoogle size={30} color="#fff" />,
    gradient: 'from-[#34a853] via-[#fbbc05] to-[#ea4335]',
    shadow: 'rgba(52,168,83,0.12)'
  },
  {
    name: 'Snapchat',
    icon: <FaSnapchatGhost size={30} color="#222" />,
    gradient: 'from-yellow-300 to-yellow-500',
    shadow: 'rgba(255,234,0,0.10)'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedinIn size={30} color="#fff" />,
    gradient: 'from-[#00aaff] to-[#283e63]',
    shadow: 'rgba(0,170,255,0.11)'
  },
  {
    name: 'YouTube',
    icon: <FaYoutube size={30} color="#fff" />,
    gradient: 'from-red-600 to-red-800',
    shadow: 'rgba(255,0,0,0.15)'
  },
  {
    name: 'X',
    icon: <FaXTwitter size={30} color="#fff" />,
    gradient: 'from-black to-gray-800',
    shadow: 'rgba(0,0,0,0.15)'
  },
  {
    name: 'TikTok',
    icon: <FaTiktok size={30} color="#fff" />,
    gradient: 'from-black via-[#25F4EE] to-[#FE2C55]',
    shadow: 'rgba(0,0,0,0.15)'
  },
  {
    name: 'Pinterest',
    icon: <FaPinterestP size={30} color="#fff" />,
    gradient: 'from-red-500 to-red-700',
    shadow: 'rgba(189,8,28,0.15)'
  }
];

export default function SocialIcons() {
  return (
    <div className="flex justify-center py-10 mb-5">
      <div className="flex flex-wrap gap-8 bg-neutral-900/80 px-8 py-6 rounded-2xl shadow-xl border border-neutral-800 max-w-4xl mx-auto">
        {platforms.map(({ name, icon, gradient, shadow }) => (
          <div key={name} className="flex flex-col items-center cursor-pointer transition duration-300 hover:scale-110">
            <div
              className={`bg-gradient-to-br ${gradient} rounded-full p-3 shadow-md`}
              style={{ boxShadow: `0 6px 20px -2px ${shadow}` }}
            >
              {icon}
            </div>
            <span className="mt-2 font-medium text-sm text-neutral-300">{name}</span>
            <span className="text-xs text-neutral-400">Ads</span>
          </div>
        ))}
      </div>
    </div>
  );
}
