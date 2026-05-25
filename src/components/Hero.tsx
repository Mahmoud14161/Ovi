import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yBottle = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const yBerry1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const yBerry2 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const yBerry3 = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-light"
    >
      {/* Background Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent1/50 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-brand-accent2/30 rounded-full blur-2xl" />

      {/* Parallax Content */}
      <motion.div style={{ y: yBg }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, filter: 'blur(12px)', y: 40 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="font-serif italic text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-brand-deep mb-6"
        >
          The OVi
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-brand-text/80 font-sans font-light tracking-wide uppercase mb-10"
        >
          Fruity & Lovely • 250 ml
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          onClick={() => {
            document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-brand-deep text-white px-8 py-3 text-sm md:text-base font-medium tracking-widest uppercase hover:bg-brand-text transition-colors"
        >
          Shop Now
        </motion.button>
      </motion.div>

      {/* Bottle and Floor Shadow */}
      <motion.div 
        style={{ y: yBottle }}
        className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[70vh] md:h-[80vh] flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
          transition={{ 
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 1.2, type: 'spring', bounce: 0.6 },
            y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }
          }}
          className="h-full w-full relative"
        >
          <img 
            src="/photos/farawla.png" 
            alt="The OVi Body Splash" 
            className="h-full w-auto object-contain mix-blend-darken"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div style="height: 100%; width: 250px; background: rgba(214, 51, 108, 0.1); border-radius: 20px; border: 2px dashed rgba(214, 51, 108, 0.4); display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;">Image failed to load</div>';
            }}
          />
        </motion.div>
        
        {/* Soft floating shadow underneath the bottle */}
        <motion.div 
          animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }}
          className="w-48 h-6 bg-brand-deep blur-[20px] rounded-[100%] absolute -bottom-10"
        />
      </motion.div>

      {/* Floating Berries */}
      <motion.div 
        style={{ y: yBerry1 }}
        className="absolute z-30 top-1/4 left-[15%] w-24 md:w-32"
      >
        <motion.img 
          src="https://drive.google.com/thumbnail?id=1FURKfpppRsalzXtvzDsgJ2RCjyug8EFP&sz=w1000" 
          alt="Strawberry" 
          initial={{ opacity: 0, x: -100, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, rotate: [-15, 15, -15], y: [0, -25, 0], scale: 1 }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.5, ease: "easeOut" },
            scale: { duration: 1.2, delay: 0.5, type: "spring" },
            x: { duration: 1.2, delay: 0.5, ease: "easeOut" },
            rotate: { repeat: Infinity, duration: 8, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
          }}
          className="w-full h-auto drop-shadow-xl mix-blend-darken" 
          onError={(e) => e.currentTarget.style.display = 'none'} 
        />
      </motion.div>

      <motion.div 
        style={{ y: yBerry2 }}
        className="absolute z-30 bottom-1/4 right-[20%] w-20 md:w-28"
      >
        <motion.img 
          src="https://drive.google.com/thumbnail?id=1le60dx37njHGiayDUbP1B06OZZ7S0212&sz=w1000" 
          alt="Blueberry" 
          initial={{ opacity: 0, x: 100, rotate: 90, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, rotate: [15, -15, 15], y: [0, 20, 0], scale: 1 }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.7, ease: "easeOut" },
            scale: { duration: 1.2, delay: 0.7, type: "spring" },
            x: { duration: 1.2, delay: 0.7, ease: "easeOut" },
            rotate: { repeat: Infinity, duration: 9, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }
          }}
          className="w-full h-auto drop-shadow-xl mix-blend-darken" 
          onError={(e) => e.currentTarget.style.display = 'none'} 
        />
      </motion.div>

      <motion.div 
        style={{ y: yBerry3 }}
        className="absolute z-10 top-1/3 right-[10%] w-16 md:w-20 opacity-60"
      >
        <motion.img 
          src="https://drive.google.com/thumbnail?id=1FURKfpppRsalzXtvzDsgJ2RCjyug8EFP&sz=w1000" 
          alt="Strawberry" 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1, rotate: [45, 90, 45], x: [0, -15, 0], y: [0, -10, 0] }}
          transition={{ 
            opacity: { duration: 1.2, delay: 0.9 },
            scale: { duration: 1.2, delay: 0.9, type: "spring" },
            rotate: { repeat: Infinity, duration: 12, ease: "easeInOut" },
            x: { repeat: Infinity, duration: 10, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 11, ease: "easeInOut" }
          }}
          className="w-full h-auto blur-[3px] mix-blend-darken" 
          onError={(e) => e.currentTarget.style.display = 'none'} 
        />
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-sm font-medium tracking-widest text-brand-deep/60 mb-2">SCROLL</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-brand-deep/40"
        />
      </motion.div>
    </section>
  );
}
