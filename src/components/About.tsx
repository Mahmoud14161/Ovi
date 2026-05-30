import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smoothly fade in as it enters, and fade out as it scrolls past
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section 
      ref={containerRef} 
      className="py-32 px-6 md:px-12 bg-brand-surface relative border-y border-brand-border overflow-hidden"
    >
      {/* Floating Vertical "Order" Indicator */}
      <motion.div 
        style={{ opacity, y }}
        onClick={() => {
          document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="hidden md:flex absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 text-brand-deep/50 hover:text-brand-accent3 cursor-pointer select-none transition-colors duration-300 group"
      >
        <div className="flex flex-col items-center gap-1.5 font-sans font-bold text-[10px] tracking-[0.2em] uppercase leading-none">
          <span>O</span>
          <span>R</span>
          <span>D</span>
          <span>E</span>
          <span>R</span>
        </div>
        
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="bg-brand-light p-2 rounded-full border border-brand-border/40 group-hover:border-brand-accent3/40 group-hover:bg-brand-accent1/10 transition-colors duration-300"
        >
          <svg 
            className="w-3.5 h-3.5 text-brand-accent3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-accent3 font-bold tracking-[0.4em] text-xs uppercase mb-4 block">The Experience</span>
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-brand-deep mb-8 leading-tight">
            A refreshing and <br className="hidden md:block" /> invigorating scent
          </h2>
          <p className="text-lg md:text-xl text-brand-text/80 font-light leading-relaxed max-w-3xl mx-auto">
            Introducing our exquisite <strong className="text-brand-deep font-semibold">The OVi (250 ml)</strong> body splash, with the refreshing and natural scent of Strawberry & Blueberry. The perfect fragrance companion for those seeking a refreshing and invigorating scent experience. Our body splash is meticulously crafted to captivate your senses and leave you feeling revitalized throughout the day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

