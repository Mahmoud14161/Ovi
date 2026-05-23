import { motion } from 'motion/react';
import { Droplets, Wind } from 'lucide-react';

export default function Usage() {
  const steps = [
    {
      icon: <Droplets className="w-8 h-8 text-brand-accent2" />,
      title: "Cleanse",
      description: "Start with clean, dry skin after a shower or bath."
    },
    {
      icon: <Wind className="w-8 h-8 text-brand-accent2" />,
      title: "Apply",
      description: "Hold the bottle 15-10 centimeters away and spray a light mist."
    }
  ];

  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-4xl text-brand-deep"
          >
            How to Use
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-brand-surface p-10 rounded-3xl border border-brand-border hover:bg-brand-light transition-colors"
            >
              <div className="w-16 h-16 bg-brand-accent1/50 rounded-full flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-serif text-brand-deep mb-3">{step.title}</h3>
              <p className="text-brand-text/70 font-light leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
