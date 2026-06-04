import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Lang = 'ar' | 'en';

export default function FAQ() {
  const [lang, setLang] = useState<Lang>('ar');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleBackToHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const faqs = {
    ar: [
      {
        q: 'إيه اللي بيميز بادي سبلاش OVi عن غيره؟',
        a: 'OVi بيتميز باستخدام زيوت عطرية فرنسية وعالمية عالية الجودة، ثباته عالي جداً بيدوم لساعات، لطيف ومغذي للبشرة، بروائح فاكهية منعشة تناسب كل الأذواق وتخليكي حاسة بالانتعاش طول اليوم.'
      },
      {
        q: 'ريحة البادي سبلاش بتثبت قد إيه؟',
        a: 'تركيبتنا مصممة عشان تثبت أطول فترة ممكنة. الثبات بيعتمد على نوع بشرتك، بس في المتوسط ريحتك هتفضل منعشة وجذابة لساعات طويلة، خصوصاً لو استخدمتيه بعد الشاور مباشرة.'
      },
      {
        q: 'أقدر أرشه على بشرتي دايركت؟',
        a: 'أكيد! تركيبة OVi آمنة تماماً ولطيفة على البشرة لأنها خالية من المواد الكيميائية القاسية. بننصحك ترشيه على أماكن النبض زي الرقبة والمعصم لثبات أقوى.'
      },
      {
        q: 'هل البادي سبلاش آمن للبشرة الحساسة؟',
        a: 'منتجاتنا مختبرة وآمنة للاستخدام اليومي، لكن لو بشرتك حساسة جداً أو عندك حساسية من العطور، يُفضل ترشيه على جزء صغير من الجلد الأول كاختبار، أو ترشيه على الملابس.'
      },
      {
        q: 'إيه أحسن طريقة لاستخدام البادي سبلاش عشان يثبت؟',
        a: 'لأفضل نتيجة، رشيه على جسمك بعد الشاور مباشرة والبشرة لسة منديّة، ركزي على أماكن النبض، وممكن كمان ترشي رشة خفيفة على هدومك من بعيد لضمان ثبات مضاعف.'
      },
      {
        q: 'هل بتجربوا منتجاتكم على الحيوانات؟',
        a: 'لأ تماماً، إحنا في OVi فخورين إننا علامة تجارية صديقة للبيئة (Cruelty-Free) ومش بنجرب أي منتج على الحيوانات.'
      },
      {
        q: 'منتجاتكم بتتصنع فين؟',
        a: 'منتجات OVi مصنوعة بكل فخر في مصر، وبنطبق أعلى معايير الجودة العالمية في التصنيع والتعبئة.'
      },
      {
        q: 'إزاي أقدر أطلب المنتجات؟ وهل في توصيل؟',
        a: 'بسهولة جداً من خلال موقعنا الإلكتروني، وبنوفر توصيل مجاني للقاهرة والجيزة والقليوبية، وتوصيل سريع لباقي محافظات مصر مقابل 35 جنيه بس!'
      }
    ],
    en: [
      {
        q: 'What makes OVi body splash different?',
        a: 'OVi is crafted with premium, high-quality fragrance oils. It offers long-lasting scents, is gentle on the skin, and features refreshing fruity notes that keep you feeling vibrant all day long.'
      },
      {
        q: 'How long does the scent last?',
        a: 'Our formula is designed for maximum longevity. While it depends on your skin type, the scent generally lasts for hours, keeping you fresh and confident, especially when applied right after a shower.'
      },
      {
        q: 'Can I apply it directly to my skin?',
        a: 'Absolutely! OVi is formulated to be completely safe and gentle. We recommend applying it to pulse points like your neck, wrists, and behind the ears for the best projection.'
      },
      {
        q: 'Is it safe for sensitive skin?',
        a: 'Our products are dermatologically tested and safe for daily use. However, if you have highly sensitive skin, we recommend doing a small patch test first or applying it to your clothes instead.'
      },
      {
        q: 'What is the best way to apply the body splash?',
        a: 'For best results, spray it on damp skin immediately after showering. Focus on pulse points, and you can also lightly mist your clothes from a distance for an extra layer of scent.'
      },
      {
        q: 'Do you test on animals?',
        a: 'Never. OVi is a proudly cruelty-free brand, and we do not test any of our products or ingredients on animals.'
      },
      {
        q: 'Where are your products made?',
        a: 'OVi products are proudly manufactured in Egypt, adhering to the highest international quality and safety standards.'
      },
      {
        q: 'How can I order? Do you offer delivery?',
        a: 'You can easily place an order right here on our website. We offer FREE delivery to Cairo, Giza, and Qalyubia, and fast shipping to all other governorates for only 35 EGP!'
      }
    ]
  };

  const currentFaqs = faqs[lang];

  return (
    <div className="min-h-screen bg-brand-light text-brand-deep font-sans pb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Area */}
      <header className="sticky top-0 z-40 bg-brand-light/80 backdrop-blur-md border-b border-brand-border py-4 px-6 md:px-12 flex justify-between items-center">
        <button
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-brand-text/70 hover:text-brand-deep transition-colors text-sm font-medium"
        >
          <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          <span>{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </button>

        <h1 className="font-serif italic text-3xl text-brand-deep hover:opacity-80 cursor-pointer" onClick={handleBackToHome}>
          OVi
        </h1>

        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-border rounded-full hover:bg-brand-surface transition-colors text-xs font-semibold uppercase tracking-wider"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
        </button>
      </header>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 mt-12 md:mt-16">
        <div className="text-center mb-12">
          <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase mb-3 inline-block">
            {lang === 'ar' ? 'مركز المساعدة' : 'Help Center'}
          </span>
          <h2 className="font-serif italic text-4xl md:text-5xl text-brand-deep mb-4">
            {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-brand-text/70 font-light text-sm md:text-base max-w-2xl mx-auto">
            {lang === 'ar' 
              ? 'كل اللي محتاجة تعرفيه عن منتجات OVi هتلاقيه هنا. لو عندك أي استفسار تاني متتردديش تتواصلي معانا.'
              : 'Everything you need to know about OVi products. If you have any other questions, feel free to reach out to us.'}
          </p>
        </div>

        <main className="bg-white border border-brand-border rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="space-y-4">
            {currentFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border border-brand-border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-brand-surface/30' : 'bg-white hover:bg-brand-surface/10'}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <span className="font-medium text-brand-deep pr-4 md:pr-0 md:text-lg">{faq.q}</span>
                    <span className={`text-brand-accent2 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 text-brand-text/80 font-light leading-relaxed border-t border-brand-border/50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
