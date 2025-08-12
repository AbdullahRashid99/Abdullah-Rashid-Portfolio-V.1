import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // إعداد الكانفاس
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // إنشاء النقط
    const createDots = () => {
      const dots = [];
      const numDots = Math.floor((width * height) / 15000); // كثافة النقط حسب حجم الشاشة
      
      for (let i = 0; i < numDots; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          originalRadius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          glowIntensity: Math.random() * 0.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          time: Math.random() * Math.PI * 2
        });
      }
      dotsRef.current = dots;
    };

    // رسم النقط
    const drawDots = (time) => {
      ctx.clearRect(0, 0, width, height);
      
      dotsRef.current.forEach(dot => {
        // تحديث الموقع
        dot.x += dot.speedX;
        dot.y += dot.speedY;
        
        // إعادة تدوير النقط عند خروجها من الشاشة
        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;
        
        // تحديث النبضة
        dot.time += dot.pulseSpeed;
        dot.radius = dot.originalRadius + Math.sin(dot.time) * 0.5;
        
        // تأثير التوهج المتغير
        const glowSize = dot.radius * (2 + Math.sin(dot.time * 0.5) * dot.glowIntensity);
        
        // رسم التوهج الخارجي
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, glowSize
        );
        gradient.addColorStop(0, `rgba(56, 189, 248, ${dot.opacity * 0.8})`); // sky-400
        gradient.addColorStop(0.3, `rgba(56, 189, 248, ${dot.opacity * 0.4})`);
        gradient.addColorStop(0.6, `rgba(14, 165, 233, ${dot.opacity * 0.2})`); // sky-500
        gradient.addColorStop(1, `rgba(14, 165, 233, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // رسم النقطة المركزية
        ctx.fillStyle = `rgba(56, 189, 248, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // حلقة الرسوم المتحركة
    const animate = (currentTime) => {
      drawDots(currentTime);
      animationRef.current = requestAnimationFrame(animate);
    };

    // إعداد أولي
    resizeCanvas();
    createDots();
    animate();

    // معالجة تغيير حجم النافذة
    const handleResize = () => {
      resizeCanvas();
      createDots();
    };

    window.addEventListener('resize', handleResize);

    // تنظيف
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default AnimatedBackground;
