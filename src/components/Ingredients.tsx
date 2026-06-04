import { motion } from 'motion/react';

export default function Ingredients() {
  const ingredientsList = [
    "Alcohol Denat.", "Glycerin", "Panthenol", "Propylene Glycol", "BHT", 
    "Caprylic/Capric Triglyceride", "PEG-7 GLYCERYL COCOATE", "Lavandula Angustifolia Oil", 
    "Cyperus Esculentus Root Oil", "Aloe Barbadensis Extract", "Tocopheryl acetate", 
    "Glyceryl Glucoside", "Aqua", "Trehalose", "Urea", "Serine", "Pentylene Glycol", 
    "Glyceryl Polyacrylate", "Algin", "Caprylyl Glycol", "Sodium Hyaluronate", 
    "Pullulan", "Disodium Phosphate", "Potassium Phosphate", "DMDM Hydantoin"
  ];

  return (
    <section className="py-24 bg-brand-surface border-y border-brand-border text-brand-deep overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif italic text-3xl md:text-4xl text-brand-deep"
        >
          Meticulously Selected Ingredients
        </motion.h2>
      </div>

      <div className="relative flex overflow-x-hidden py-10 w-full group">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="flex whitespace-nowrap min-w-max"
        >
          {/* Output 4 sets to ensure -50% translation is seamless */}
          {[...ingredientsList, ...ingredientsList, ...ingredientsList, ...ingredientsList].map((item, i) => (
            <span 
              key={i} 
              className="px-6 text-xl md:text-2xl font-light text-brand-text/70 font-serif hover:opacity-100 hover:text-brand-deep transition-colors cursor-default"
            >
              {item} <span className="text-brand-accent3 mx-4">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
