import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-32 px-6 md:px-12 bg-brand-surface relative border-y border-brand-border">
      <div className="max-w-4xl mx-auto text-center">
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
            Introducing our exquisite <strong className="text-brand-deep font-semibold">The OVi</strong> body splash, the perfect fragrance companion for those seeking a refreshing and invigorating scent experience. Our body splash is meticulously crafted to captivate your senses and leave you feeling revitalized throughout the day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
