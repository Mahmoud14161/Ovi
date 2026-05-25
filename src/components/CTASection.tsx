import { motion } from 'motion/react';

export default function CTASection({ onCheckout }: { onCheckout: () => void }) {
  return (
    <section className="py-24 bg-brand-surface border-t border-brand-border" id="cta-section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-brand-light p-12 md:p-16 rounded-3xl"
        >
          <span className="text-brand-accent3 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Special Offer</span>
          <h2 className="font-serif italic text-4xl md:text-5xl text-brand-deep mb-4">
            Embrace the Freshness
          </h2>
          <p className="text-brand-text/70 mb-8 max-w-xl mx-auto font-light">
            Order your bottle of The OVi (250 ml) now and revitalize your daily routine with a burst of fruity & lovely scent.
          </p>
          
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center gap-4 text-3xl md:text-5xl font-serif text-brand-deep">
              <span>EGP 350</span>
              <span className="text-xl md:text-2xl text-brand-text/40 line-through decoration-brand-accent3/50 decoration-2">EGP 510</span>
            </div>
            <p className="text-sm text-brand-text/50 mt-2 font-light">Size: 250 ml • + EGP 35 Shipping Fee</p>
          </div>

          <div className="relative inline-block">
            {/* Background animating berries */}
            <motion.img
               src="https://drive.google.com/thumbnail?id=1FURKfpppRsalzXtvzDsgJ2RCjyug8EFP&sz=w500"
               className="absolute -top-10 -left-10 w-24 md:w-28 h-auto mix-blend-darken opacity-80 z-0 select-none pointer-events-none"
               animate={{ rotate: [-5, 10, -5], y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
               alt=""
            />
            <motion.img
               src="https://drive.google.com/thumbnail?id=1le60dx37njHGiayDUbP1B06OZZ7S0212&sz=w500"
               className="absolute -bottom-8 -right-8 w-20 md:w-24 h-auto mix-blend-darken opacity-80 z-0 select-none pointer-events-none"
               animate={{ rotate: [15, -10, 15], y: [0, 8, 0] }}
               transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
               alt=""
            />

            {/* The Actual Button */}
            <button 
              onClick={onCheckout}
              className="relative z-10 bg-brand-deep text-white px-10 py-4 text-lg font-medium tracking-wide hover:bg-brand-text transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-none"
            >
              Order Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
