import { motion } from 'motion/react';
import { AlertCircle, EyeOff, Thermometer, Baby } from 'lucide-react';

export default function Precautions() {
  const items = [
    { icon: <AlertCircle className="w-5 h-5" />, text: "For external use only." },
    { icon: <EyeOff className="w-5 h-5" />, text: "Avoid contact with eyes. Rinse thoroughly with water if contact occurs." },
    { icon: <Thermometer className="w-5 h-5" />, text: "Store at room temperature (not exceeding 30°C)." },
    { icon: <Baby className="w-5 h-5" />, text: "Keep out of reach of children." },
  ];

  return (
    <section className="py-20 bg-brand-light">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-surface border border-brand-border rounded-3xl p-8 md:p-12 shadow-sm"
        >
          <h2 className="font-serif italic text-2xl text-brand-deep mb-8 flex items-center gap-3">
            Precautions
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 text-brand-text/70"
              >
                <div className="text-brand-accent3 mt-1 shrink-0">
                  {item.icon}
                </div>
                <p className="font-light text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
