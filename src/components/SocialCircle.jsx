import React from 'react';

const SocialCircle = () => {
  const socialPlatforms = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', color: '#1877F2' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: '#E1306C' },
    { name: 'Google', icon: 'fab fa-google', color: '#4285F4' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', color: '#0077B5' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: '#FF0000' },
    { name: 'TikTok', icon: 'fab fa-tiktok', color: '#000000' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2' },
    { name: 'Snapchat', icon: 'fab fa-snapchat-ghost', color: '#FFFC00', textColor: '#000000' },
    { name: 'Pinterest', icon: 'fab fa-pinterest-p', color: '#E60023' }
  ];

  const containerSizes = {
    mobile: 280,
    sm: 350,
    md: 420,
    lg: 500,
    xl: 580
  };

  const radiusSizes = {
    mobile: 100,
    sm: 125,
    md: 150,
    lg: 180,
    xl: 210
  };

  const iconSizes = {
    mobile: { size: 40, iconText: 'text-sm' },
    sm: { size: 48, iconText: 'text-base' },
    md: { size: 56, iconText: 'text-lg' },
    lg: { size: 64, iconText: 'text-xl' },
    xl: { size: 72, iconText: 'text-2xl' }
  };

  const renderIconContainer = (breakpoint, isVisible) => {
    const containerSize = containerSizes[breakpoint];
    const radius = radiusSizes[breakpoint];
    const iconConfig = iconSizes[breakpoint];

    const visibilityClasses = {
      mobile: 'block sm:hidden',
      sm: 'hidden sm:block md:hidden',
      md: 'hidden md:block lg:hidden', 
      lg: 'hidden lg:block xl:hidden',
      xl: 'hidden xl:block'
    };

    const centerTextSizes = {
      mobile: 'text-xl px-3 py-2',
      sm: 'text-2xl px-4 py-2',
      md: 'text-3xl px-5 py-3',
      lg: 'text-4xl px-6 py-3',
      xl: 'text-5xl px-8 py-4'
    };

    return (
      <div 
        key={breakpoint}
        className={`${visibilityClasses[breakpoint]} relative`}
        style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
      >
        <div className="absolute inset-0 animate-spin-slow">
          {socialPlatforms.map((platform, index) => {
            const angle = (index / socialPlatforms.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius + containerSize / 2 - iconConfig.size / 2;
            const y = Math.sin(angle) * radius + containerSize / 2 - iconConfig.size / 2;

            return (
              <div
                key={`${breakpoint}-${platform.name}`}
                className="absolute cursor-pointer group transition-all duration-300 hover:scale-110 animate-reverse-spin"
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                <div 
                  className="rounded-full shadow-lg flex items-center justify-center border border-gray-700/50 transition-all duration-300 hover:shadow-xl"
                  style={{ 
                    backgroundColor: platform.color,
                    boxShadow: `0 4px 15px ${platform.color}66`,
                    width: `${iconConfig.size}px`,
                    height: `${iconConfig.size}px`
                  }}
                >
                  <i 
                    className={`${platform.icon} ${iconConfig.iconText}`}
                    style={{ color: platform.textColor || '#FFFFFF' }}
                  />
                </div>
                
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none bg-gray-900 px-2 py-1 rounded">
                  {platform.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center "Ads" text */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div 
            className={`${centerTextSizes[breakpoint]} font-bold text-white tracking-wide rounded-full bg-gray-900/90 border border-gray-700 shadow-xl transition-all duration-300 glow-text`}
          >
            Ads
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* CSS Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% { 
            text-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 20s linear infinite;
        }
        
        .glow-text {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          * {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>

      <section className="py-8 flex justify-center items-center">
        <div className="relative mx-auto">
          {Object.keys(containerSizes).map(breakpoint => 
            renderIconContainer(breakpoint, true)
          )}
        </div>
      </section>
    </>
  );
};

export default SocialCircle;
