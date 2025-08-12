export default function SocialCircle() {
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

  // Different container sizes for different screen sizes
  const containerSizes = {
    mobile: 280,
    sm: 350,
    md: 420,
    lg: 500,
    xl: 580
  };

  // Corresponding radius for each screen size
  const radiusSizes = {
    mobile: 100,
    sm: 125,
    md: 150,
    lg: 180,
    xl: 210
  };

  // Icon sizes for each screen
  const iconSizes = {
    mobile: { size: 40, iconText: 'text-sm' },
    sm: { size: 48, iconText: 'text-base' },
    md: { size: 56, iconText: 'text-lg' },
    lg: { size: 64, iconText: 'text-xl' },
    xl: { size: 72, iconText: 'text-2xl' }
  };

  return (
    <section className="py-8 flex justify-center items-center">
      <div className="relative mx-auto">
        {/* Mobile Container */}
        <div className="block sm:hidden relative" style={{ width: `${containerSizes.mobile}px`, height: `${containerSizes.mobile}px` }}>
          <div className="absolute inset-0 animate-rotate-slow">
            {socialPlatforms.map((platform, index) => {
              const angle = (index / socialPlatforms.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radiusSizes.mobile + containerSizes.mobile / 2 - iconSizes.mobile.size / 2;
              const y = Math.sin(angle) * radiusSizes.mobile + containerSizes.mobile / 2 - iconSizes.mobile.size / 2;

              return (
                <div
                  key={`mobile-${platform.name}`}
                  className="absolute cursor-pointer group transition-all duration-300 hover:scale-110 animate-counter-rotate"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div 
                    className="rounded-full shadow-lg flex items-center justify-center border border-neutral-700/50 transition-all duration-300"
                    style={{ 
                      backgroundColor: platform.color,
                      boxShadow: `0 4px 15px ${platform.color}66`,
                      width: `${iconSizes.mobile.size}px`,
                      height: `${iconSizes.mobile.size}px`
                    }}
                  >
                    <i 
                      className={`${platform.icon} ${iconSizes.mobile.iconText}`}
                      style={{ color: platform.textColor || '#FFFFFF' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="text-xl font-bold text-white tracking-wide px-3 py-2 rounded-full bg-neutral-900/90 border border-neutral-700 shadow-xl animate-pulse-glow">
              Ads
            </div>
          </div>
        </div>

        {/* Small Screen Container */}
        <div className="hidden sm:block md:hidden relative" style={{ width: `${containerSizes.sm}px`, height: `${containerSizes.sm}px` }}>
          <div className="absolute inset-0 animate-rotate-slow">
            {socialPlatforms.map((platform, index) => {
              const angle = (index / socialPlatforms.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radiusSizes.sm + containerSizes.sm / 2 - iconSizes.sm.size / 2;
              const y = Math.sin(angle) * radiusSizes.sm + containerSizes.sm / 2 - iconSizes.sm.size / 2;

              return (
                <div
                  key={`sm-${platform.name}`}
                  className="absolute cursor-pointer group transition-all duration-300 hover:scale-110 animate-counter-rotate"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div 
                    className="rounded-full shadow-lg flex items-center justify-center border border-neutral-700/50 transition-all duration-300"
                    style={{ 
                      backgroundColor: platform.color,
                      boxShadow: `0 4px 15px ${platform.color}66`,
                      width: `${iconSizes.sm.size}px`,
                      height: `${iconSizes.sm.size}px`
                    }}
                  >
                    <i 
                      className={`${platform.icon} ${iconSizes.sm.iconText}`}
                      style={{ color: platform.textColor || '#FFFFFF' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="text-2xl font-bold text-white tracking-wide px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-700 shadow-xl animate-pulse-glow">
              Ads
            </div>
          </div>
        </div>

        {/* Medium Screen Container */}
        <div className="hidden md:block lg:hidden relative" style={{ width: `${containerSizes.md}px`, height: `${containerSizes.md}px` }}>
          <div className="absolute inset-0 animate-rotate-slow">
            {socialPlatforms.map((platform, index) => {
              const angle = (index / socialPlatforms.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radiusSizes.md + containerSizes.md / 2 - iconSizes.md.size / 2;
              const y = Math.sin(angle) * radiusSizes.md + containerSizes.md / 2 - iconSizes.md.size / 2;

              return (
                <div
                  key={`md-${platform.name}`}
                  className="absolute cursor-pointer group transition-all duration-300 hover:scale-110 animate-counter-rotate"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div 
                    className="rounded-full shadow-lg flex items-center justify-center border border-neutral-700/50 transition-all duration-300"
                    style={{ 
                      backgroundColor: platform.color,
                      boxShadow: `0 4px 15px ${platform.color}66`,
                      width: `${iconSizes.md.size}px`,
                      height: `${iconSizes.md.size}px`
                    }}
                  >
                    <i 
                      className={`${platform.icon} ${iconSizes.md.iconText}`}
                      style={{ color: platform.textColor || '#FFFFFF' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="text-3xl font-bold text-white tracking-wide px-5 py-3 rounded-full bg-neutral-900/90 border border-neutral-700 shadow-xl animate-pulse-glow">
              Ads
            </div>
          </div>
        </div>

        {/* Large Screen Container */}
        <div className="hidden lg:block xl:hidden relative" style={{ width: `${containerSizes.lg}px`, height: `${containerSizes.lg}px` }}>
          <div className="absolute inset-0 animate-rotate-slow">
            {socialPlatforms.map((platform, index) => {
              const angle = (index / socialPlatforms.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radiusSizes.lg + containerSizes.lg / 2 - iconSizes.lg.size / 2;
              const y = Math.sin(angle) * radiusSizes.lg + containerSizes.lg / 2 - iconSizes.lg.size / 2;

              return (
                <div
                  key={`lg-${platform.name}`}
                  className="absolute cursor-pointer group transition-all duration-300 hover:scale-110 animate-counter-rotate"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div 
                    className="rounded-full shadow-lg flex items-center justify-center border border-neutral-700/50 transition-all duration-300"
                    style={{ 
                      backgroundColor: platform.color,
                      boxShadow: `0 4px 15px ${platform.color}66`,
                      width: `${iconSizes.lg.size}px`,
                      height: `${iconSizes.lg.size}px`
                    }}
                  >
                    <i 
                      className={`${platform.icon} ${iconSizes.lg.iconText}`}
                      style={{ color: platform.textColor || '#FFFFFF' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="text-4xl font-bold text-white tracking-wide px-6 py-3 rounded-full bg-neutral-900/90 border border-neutral-700 shadow-xl animate-pulse-glow">
              Ads
            </div>
          </div>
        </div>

        {/* Extra Large Screen Container */}
        <div className="hidden xl:block relative" style={{ width: `${containerSizes.xl}px`, height: `${containerSizes.xl}px` }}>
          <div className="absolute inset-0 animate-rotate-slow">
            {socialPlatforms.map((platform, index) => {
              const angle = (index / socialPlatforms.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radiusSizes.xl + containerSizes.xl / 2 - iconSizes.xl.size / 2;
              const y = Math.sin(angle) * radiusSizes.xl + containerSizes.xl / 2 - iconSizes.xl.size / 2;

              return (
                <div
                  key={`xl-${platform.name}`}
                  className="absolute cursor-pointer group transition-all duration-300 hover:scale-110 animate-counter-rotate"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  <div 
                    className="rounded-full shadow-lg flex items-center justify-center border border-neutral-700/50 transition-all duration-300"
                    style={{ 
                      backgroundColor: platform.color,
                      boxShadow: `0 4px 15px ${platform.color}66`,
                      width: `${iconSizes.xl.size}px`,
                      height: `${iconSizes.xl.size}px`
                    }}
                  >
                    <i 
                      className={`${platform.icon} ${iconSizes.xl.iconText}`}
                      style={{ color: platform.textColor || '#FFFFFF' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="text-5xl font-bold text-white tracking-wide px-8 py-4 rounded-full bg-neutral-900/90 border border-neutral-700 shadow-xl animate-pulse-glow">
              Ads
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
