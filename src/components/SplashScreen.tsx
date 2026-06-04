import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Show splash screen for 2.5 seconds, then trigger exit
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-light"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative h-[40vh] md:h-[50vh] flex flex-col items-center"
      >
        <motion.img 
          src="/photos/farawla.webp"
          className="h-full w-auto object-contain mix-blend-darken"
          alt="The OVi Loading"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        />
        
        {/* Soft floating shadow underneath the bottle */}
        <motion.div 
          animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-32 h-4 bg-brand-deep blur-[15px] rounded-[100%] absolute -bottom-6"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-16 flex flex-col items-center"
      >
        <h1 className="font-serif italic text-4xl text-brand-deep tracking-tighter">The OVi</h1>
        <div className="mt-6 w-32 md:w-48 h-[2px] bg-brand-border overflow-hidden">
          <motion.div 
            className="h-full bg-brand-deep"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
