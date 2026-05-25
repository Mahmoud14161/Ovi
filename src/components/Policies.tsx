import { useState, useEffect } from 'react';
import { FileText, ShieldCheck, RefreshCw, Truck, Globe, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'terms' | 'privacy' | 'return' | 'delivery';
type Lang = 'ar' | 'en';

export default function Policies() {
  const [activeTab, setActiveTab] = useState<Tab>('terms');
  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as Tab;
      if (['terms', 'privacy', 'return', 'delivery'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.pushState({}, '', url.pathname + url.search);
    }
  };

  const handleBackToHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const tabNames = {
    ar: {
      terms: 'الشروط والأحكام',
      privacy: 'سياسة الخصوصية',
      return: 'سياسة الاستبدال والاسترجاع',
      delivery: 'الدفع والتوصيل',
    },
    en: {
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      return: 'Return Policy',
      delivery: 'Delivery & Payment',
    }
  };

  const tabs = [
    { id: 'terms' as Tab, icon: <FileText className="w-5 h-5" /> },
    { id: 'privacy' as Tab, icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'return' as Tab, icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'delivery' as Tab, icon: <Truck className="w-5 h-5" /> },
  ];

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
      <div className="max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="md:col-span-1 space-y-2">
          <div className="sticky top-24">
            <h2 className="text-xs uppercase tracking-widest text-brand-text/50 font-bold mb-4 px-3">
              {lang === 'ar' ? 'وثائق السياسات' : 'Policy Documents'}
            </h2>
            <nav className="flex flex-col gap-1.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-medium ${
                      isActive
                        ? 'bg-brand-deep text-white shadow-md'
                        : 'bg-white text-brand-text/70 border border-brand-border hover:bg-brand-surface hover:text-brand-deep'
                    }`}
                  >
                    <span className={isActive ? 'text-brand-accent1' : 'text-brand-accent3'}>
                      {tab.icon}
                    </span>
                    <span>{tabNames[lang][tab.id]}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="md:col-span-3 bg-white border border-brand-border rounded-3xl p-8 md:p-12 shadow-sm min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${lang}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="prose prose-brand max-w-none"
            >
              {activeTab === 'terms' && (
                lang === 'ar' ? (
                  <div className="space-y-6">
                    <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase block">الشروط والأحكام العامة</span>
                    <h2 className="font-serif italic text-3xl text-brand-deep border-b border-brand-border pb-4">شروط الخدمة والاستخدام</h2>
                    
                    <p className="text-brand-text/80 font-light leading-relaxed">
                      مرحباً بكم في موقع <strong>OVi</strong>. تسري هذه الشروط والأحكام على استخدامك للموقع وشرائك للمنتجات المعروضة فيه. من خلال تصفحك للموقع أو تسجيل طلب شراء، فإنك توافق على الالتزام الكامل بهذه الشروط.
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-brand-deep">1. الامتثال للقوانين المصرية</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        تخضع هذه الشروط والأحكام وجميع المعاملات التجارية وتُفسر وفقاً للقوانين المعمول بها في جمهورية مصر العربية، ولا سيما قانون التجارة وقانون المعاملات الإلكترونية، وقانون حماية المستهلك رقم 181 لسنة 2018.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">2. عمليات البيع وتأكيد الطلبات</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        عند تقديم طلب شراء عبر الموقع، يتم تسجيل طلبك كطلب مبدئي. سنقوم بالتواصل معك عبر الهاتف أو الواتساب خلال ساعة واحدة (أو في غضون ساعات العمل الرسمية) لتأكيد تفاصيل الشحن وعملية الدفع. لا يُعد الطلب مقبولاً ونهائياً إلا بعد التأكيد الهاتفي أو عبر الواتساب من قِبل فريق خدمة عملائنا.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">3. الأسعار والرسوم</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        جميع الأسعار المعروضة على الموقع بالجنيه المصري (EGP). نحتفظ بالحق في تعديل الأسعار أو إيقاف العروض الخاصة في أي وقت دون إشعار مسبق، مع الالتزام بالأسعار المحددة للطلبات التي تم تأكيدها بالفعل قبل التعديل. تضاف رسوم الشحن (35 جنيه مصري للمحافظات خارج القاهرة والجيزة والقليوبية) وتظهر بوضوح في ملخص الفاتورة قبل إتمام الطلب.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">4. الملكية الفكرية</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        جميع المحتويات المتوفرة على هذا الموقع، بما في ذلك النصوص، الشعارات، الصور، الأيقونات، التصاميم، والمواد البرمجية، هي ملكية حصرية لعلامة <strong>OVi Beauty</strong> ومحمية بموجب قوانين حماية الملكية الفكرية المصرية والدولية. يُمنع منعاً باتاً نسخ أو استخدام أي جزء من المحتوى لأغراض تجارية دون إذن كتابي مسبق.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">5. حدود المسؤولية</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        نحن نبذل قصارى جهدنا لضمان دقة معلومات المنتجات المعروضة. ومع ذلك، فإننا غير مسؤولين عن أي أضرار ناتجة عن الاستخدام الخاطئ للمنتجات أو عدم اتباع إرشادات الاستخدام والتحذيرات المرفقة بالعبوة. يرجى قراءة قائمة المكونات والتحذيرات لتجنب الحساسية.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase block text-left">General Terms</span>
                    <h2 className="font-serif italic text-3xl text-brand-deep border-b border-brand-border pb-4 text-left">Terms & Conditions of Service</h2>
                    
                    <p className="text-brand-text/80 font-light leading-relaxed text-left">
                      Welcome to <strong>OVi</strong>. These terms and conditions govern your use of our website and the purchase of our products. By browsing this website or placing an order, you agree to fully comply with and be bound by these terms.
                    </p>

                    <div className="space-y-4 text-left">
                      <h3 className="text-xl font-medium text-brand-deep">1. Compliance with Egyptian Laws</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        These terms and conditions and all commercial transactions are governed by and construed in accordance with the laws of the Arab Republic of Egypt, including trade laws, e-commerce guidelines, and the Egyptian Consumer Protection Law No. 181 of 2018.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">2. Sales & Order Confirmation</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        When placing an order through the site, your order is recorded as a preliminary request. We will contact you via phone call or WhatsApp within 1 hour (or during official working hours) to confirm shipping details and payment. The order is not deemed final until it is verbally or textually confirmed by our customer service team.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">3. Prices and Fees</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        All prices listed on the site are in Egyptian Pounds (EGP). We reserve the right to modify prices or terminate special offers at any time without prior notice. However, confirmed orders will be processed at the prices agreed upon at confirmation. Shipping fees (EGP 35 for governorates outside Cairo, Giza, and Qalyubia) are explicitly calculated in the invoice summary.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">4. Intellectual Property</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        All content on this site, including text, logos, images, icons, designs, and software code, is the exclusive property of <strong>OVi Beauty</strong> and protected by Egyptian and international intellectual property laws. Copying or using any content for commercial purposes without prior written consent is strictly prohibited.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">5. Limitation of Liability</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        We make every effort to ensure the accuracy of product information. However, we are not liable for any damages resulting from improper use of products or failure to follow the precautions printed on the packaging. Please check the ingredients list to avoid allergies.
                      </p>
                    </div>
                  </div>
                )
              )}

              {activeTab === 'privacy' && (
                lang === 'ar' ? (
                  <div className="space-y-6">
                    <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase block">أمن وسرية البيانات</span>
                    <h2 className="font-serif italic text-3xl text-brand-deep border-b border-brand-border pb-4">سياسة الخصوصية وحماية البيانات</h2>
                    
                    <p className="text-brand-text/80 font-light leading-relaxed">
                      تلتزم علامة <strong>OVi</strong> بحماية خصوصية بيانات عملائها وسريتها التامة. توضح هذه السياسة كيف نقوم بجمع واستخدام وحماية معلوماتك الشخصية.
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-brand-deep">1. البيانات التي نجمعها</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        عند قيامك بتقديم طلب عبر الموقع، نقوم بجمع البيانات الأساسية اللازمة للشحن والتوصيل فقط، وتشمل:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 text-brand-text/80 font-light mr-4">
                        <li>الاسم الكامل.</li>
                        <li>رقم الهاتف (للتأكيد والتنسيق مع المندوب).</li>
                        <li>العنوان التفصيلي (المحافظة، المدينة، الشارع).</li>
                        <li>البريد الإلكتروني (اختياري - لإرسال ملخص الفاتورة والتحديثات).</li>
                      </ul>

                      <h3 className="text-xl font-medium text-brand-deep">2. استخدام البيانات</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        تُستخدم البيانات التي تقدمها حصراً للأغراض التالية:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 text-brand-text/80 font-light mr-4">
                        <li>تأكيد الطلبات والتواصل معك بشأن الشحن والتوصيل.</li>
                        <li>تسليم الطلبات لشركة الشحن الشريكة لتوصيل المنتج لباب منزلك.</li>
                        <li>تحسين مستوى الخدمة وحل أي شكاوى متعلقة بالطلب.</li>
                      </ul>

                      <h3 className="text-xl font-medium text-brand-deep">3. مشاركة وحفظ البيانات</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        نحن لا نبيع أو نؤجر معلوماتك الشخصية لأي طرف ثالث. نقوم بحفظ تفاصيل الطلبات في أنظمة المتابعة الآمنة وسجلات الطلبات الداخلية المعتمدة على خوادم محمية لضمان عدم وصول أي شخص غير مصرح له إليها. يتم مشاركة معلومات الشحن (الاسم، العنوان، الهاتف) فقط مع شركة التوصيل المعتمدة لدينا.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">4. معلومات الدفع والبطاقات الائتمانية</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        <strong>هام جداً:</strong> نحن لا نطلب أو نقوم بتخزين أي معلومات خاصة بالبطاقات الائتمانية أو الحسابات البنكية على موقعنا. عمليات الدفع تتم بالكامل إما نقدًا عند الاستلام (COD) أو عبر مسح الباركود الآمن الخاص بتطبيق <strong>إنستاباي (Instapay)</strong> التابع للبنك المركزي المصري بشكل خارجي وآمن تماماً.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase block text-left">Data Protection</span>
                    <h2 className="font-serif italic text-3xl text-brand-deep border-b border-brand-border pb-4 text-left">Privacy & Data Security Policy</h2>
                    
                    <p className="text-brand-text/80 font-light leading-relaxed text-left">
                      At <strong>OVi</strong>, we are committed to protecting the privacy and confidentiality of our customers' data. This policy explains how we collect, use, and protect your personal information.
                    </p>

                    <div className="space-y-4 text-left">
                      <h3 className="text-xl font-medium text-brand-deep">1. Data We Collect</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        When you place an order, we collect only the necessary information required for shipping and delivery, which includes:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 text-brand-text/80 font-light ml-4">
                        <li>Full Name.</li>
                        <li>Phone Number (for verification and delivery coordination).</li>
                        <li>Detailed Address (Governorate, City, Street).</li>
                        <li>Email Address (Optional - for invoices and updates).</li>
                      </ul>

                      <h3 className="text-xl font-medium text-brand-deep">2. How We Use Your Data</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        The personal data you provide is used exclusively for the following purposes:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 text-brand-text/80 font-light ml-4">
                        <li>Confirming orders and communicating with you regarding shipping.</li>
                        <li>Handing over shipment details to our partner delivery companies to fulfill delivery.</li>
                        <li>Improving customer service and addressing order-related issues.</li>
                      </ul>

                      <h3 className="text-xl font-medium text-brand-deep">3. Data Sharing and Retention</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        We do not sell, rent, or lease your personal information to third parties. We store order details on secure sheet databases and internal logs to prevent unauthorized access. Delivery details (Name, Address, Phone) are only shared with our shipping partners.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">4. Payment Methods & Credit Cards</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        <strong>IMPORTANT:</strong> We never request or store credit card details or bank account info on our servers. Payments are handled entirely externally and securely, either through Cash on Delivery (COD) or via the official <strong>Instapay</strong> barcode payment system, regulated by the Central Bank of Egypt.
                      </p>
                    </div>
                  </div>
                )
              )}

              {activeTab === 'return' && (
                lang === 'ar' ? (
                  <div className="space-y-6">
                    <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase block">حقوق المستهلك المصري</span>
                    <h2 className="font-serif italic text-3xl text-brand-deep border-b border-brand-border pb-4">سياسة الاستبدال والاسترجاع</h2>
                    
                    <div className="bg-brand-accent1/20 border-l-4 border-brand-accent3 p-4 text-sm leading-relaxed mb-6">
                      تخضع سياسة الاسترجاع والاستبدال لدينا بالكامل لأحكام <strong>قانون حماية المستهلك المصري رقم 181 لسنة 2018</strong>. نحن ملتزمون بضمان حقوق عملائنا كاملة.
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-brand-deep">1. فترة الاسترجاع والاستبدال (14 يوماً)</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        يحق للعميل استرجاع أو استبدال المنتج خلال <strong>14 يوماً</strong> من تاريخ استلام الشحنة دون إبداء أسباب، بشرط أن يكون المنتج بحالته الأصلية تماماً (مغلق، مغلف بغلافه البلاستيكي الأصلي، ولم يتم فتحه أو استخدامه نهائياً). يتحمل العميل في هذه الحالة تكلفة مصاريف الشحن الخاصة بالاسترجاع.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">2. الاسترجاع في حالة وجود عيوب أو مخالفة للمواصفات (30 يوماً)</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        يحق للعميل استرجاع المنتج أو استبداله خلال <strong>30 يوماً</strong> من تاريخ الاستلام في حال تبين وجود عيب صناعة في المنتج (مثل تلف البخاخ أو تسريب بالعبوة) أو إذا كان المنتج مخالفاً للمواصفات المعروضة على الموقع. في هذه الحالة، تتحمل علامة <strong>OVi</strong> كافة تكاليف الشحن بالكامل دون تحميل العميل أي مبالغ إضافية.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">3. المنتجات غير القابلة للاسترجاع</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        بموجب المادة 40 من قانون حماية المستهلك ولأسباب تتعلق بالصحة العامة وحماية المستهلكين (مستحضرات التجميل والعناية الشخصية)، **لا يجوز استرجاع أو استبدال أي عبوة بدي سبلاش تم فتح غلافها الأصلي أو تم استخدامها ورشها**، إلا إذا كان بها عيب صناعة واضح أو تلف عند الاستلام.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">4. خطوات تقديم طلب الاسترجاع</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        لطلب استبدال أو استرجاع منتج، يرجى اتباع الخطوات التالية:
                      </p>
                      <ul className="list-decimal list-inside space-y-1.5 text-brand-text/80 font-light mr-4">
                        <li>التواصل معنا هاتفياً أو عبر الواتساب مع توضيح رقم الطلب المرفق بالفاتورة.</li>
                        <li>إرسال صورة أو فيديو يوضح حالة المنتج (خاصة في حالة وجود عيوب صناعة أو كسر).</li>
                        <li>سنقوم بتنسيق موعد مع المندوب لاستلام المنتج منك وفحصه.</li>
                        <li>يتم رد المبلغ بالكامل (نقداً أو تحويل إنستاباي) بعد استلام وفحص المنتج والتأكد من سلامته.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase block text-left">Consumer Rights</span>
                    <h2 className="font-serif italic text-3xl text-brand-deep border-b border-brand-border pb-4 text-left">Return & Exchange Policy</h2>
                    
                    <div className="bg-brand-accent1/20 border-l-4 border-brand-accent3 p-4 text-sm leading-relaxed mb-6 text-left">
                      Our return and exchange policy is fully compliant with the **Egyptian Consumer Protection Law No. 181 of 2018**. We guarantee your absolute rights.
                    </div>

                    <div className="space-y-4 text-left">
                      <h3 className="text-xl font-medium text-brand-deep">1. Return / Exchange Period (14 Days)</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        Customers have the right to return or exchange products within <strong>14 days</strong> from the date of receipt without giving reasons, provided that the product is in its original, sealed, and unused condition (original wrapping intact). In this case, the customer covers the return shipping fees.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">2. Returns Due to Defect or Mismatch (30 Days)</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        Customers have the right to return or exchange products within <strong>30 days</strong> from receipt if the product has a manufacturing defect (e.g., damaged spray nozzle, bottle leakage) or does not match online specifications. In this case, <strong>OVi</strong> covers all shipping costs and refunds the amount in full.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">3. Non-Returnable Products</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        Under Article 40 of the Consumer Protection Law, due to health, safety, and hygiene regulations regarding cosmetic products, **opened or used body splash bottles cannot be returned or exchanged** unless a manufacturing defect is present.
                      </p>

                      <h3 className="text-xl font-medium text-brand-deep">4. How to Request a Return</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        To request a return or exchange, please follow these steps:
                      </p>
                      <ul className="list-decimal list-inside space-y-1.5 text-brand-text/80 font-light ml-4">
                        <li>Contact us via phone or WhatsApp with your order number.</li>
                        <li>Send a photo or video showing the product condition (especially for defects).</li>
                        <li>We will schedule a courier to collect the item from your location.</li>
                        <li>Your refund will be processed (Cash or Instapay) after inspection.</li>
                      </ul>
                    </div>
                  </div>
                )
              )}

              {activeTab === 'delivery' && (
                lang === 'ar' ? (
                  <div className="space-y-6">
                    <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase block">الدفع والشحن</span>
                    <h2 className="font-serif italic text-3xl text-brand-deep border-b border-brand-border pb-4">سياسة الدفع والشحن والتوصيل</h2>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-brand-deep">1. وسائل الدفع المتاحة</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        نوفر لعملائنا خيارين آمنين تماماً للدفع:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-brand-text/80 font-light mr-4">
                        <li>
                          <strong>الدفع نقداً عند الاستلام (COD):</strong> الدفع نقداً للمندوب بعد استلام وفحص طرد الشحن الخاص بك.
                        </li>
                        <li>
                          <strong>التحويل المسبق عبر إنستاباي (Instapay):</strong> تحويل قيمة الفاتورة باستخدام رمز الاستجابة السريعة (QR Code) أو اسم المستخدم لـ Instapay الخاص بنا.
                        </li>
                      </ul>

                      <h3 className="text-xl font-medium text-brand-deep">2. رسوم وتكلفة الشحن</h3>
                      <ul className="list-disc list-inside space-y-2 text-brand-text/80 font-light mr-4">
                        <li>
                          <strong>شحن مجاني بالكامل:</strong> لمحافظات القاهرة، الجيزة، والقليوبية.
                        </li>
                        <li>
                          <strong>35 جنيه مصري فقط:</strong> رسوم شحن ثابتة لجميع المحافظات المصرية الأخرى خارج إقليم القاهرة الكبرى.
                        </li>
                      </ul>

                      <h3 className="text-xl font-medium text-brand-deep">3. مدة التوصيل المتوقعة</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        نحن نعمل مع أفضل شركات التوصيل السريع لضمان وصول شحنتك بأمان وفي أسرع وقت:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-brand-text/80 font-light mr-4">
                        <li>
                          <strong>القاهرة، الجيزة، والقليوبية:</strong> التوصيل خلال <strong>2 - 3 أيام عمل</strong> من تاريخ تأكيد الطلب هاتفياً.
                        </li>
                        <li>
                          <strong>باقي محافظات مصر:</strong> التوصيل خلال <strong>3 - 5 أيام عمل</strong> من تاريخ تأكيد الطلب هاتفياً.
                        </li>
                      </ul>
                      <p className="text-brand-text/60 font-light text-xs italic mt-2">
                        *ملاحظة: أيام العمل الرسمية لا تشمل العطلات الأسبوعية (الجمعة) أو الإجازات الرسمية للدولة.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <span className="text-brand-accent3 font-bold tracking-widest text-xs uppercase block text-left">Shipping & Payment</span>
                    <h2 className="font-serif italic text-3xl text-brand-deep border-b border-brand-border pb-4 text-left">Delivery & Payment Policy</h2>
                    
                    <div className="space-y-4 text-left">
                      <h3 className="text-xl font-medium text-brand-deep">1. Available Payment Methods</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        We offer two secure payment options for our clients:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-brand-text/80 font-light ml-4">
                        <li>
                          <strong>Cash on Delivery (COD):</strong> Pay cash directly to the courier upon receiving and verifying your package.
                        </li>
                        <li>
                          <strong>Advance Transfer via Instapay:</strong> Transfer the invoice total using our official Instapay QR Code or handle name securely.
                        </li>
                      </ul>

                      <h3 className="text-xl font-medium text-brand-deep">2. Shipping Fees</h3>
                      <ul className="list-disc list-inside space-y-2 text-brand-text/80 font-light ml-4">
                        <li>
                          <strong>Free Shipping:</strong> For Cairo, Giza, and Qalyubia governorates.
                        </li>
                        <li>
                          <strong>EGP 35 Flat Rate:</strong> Shipping fee for all other Egyptian governorates outside the Greater Cairo area.
                        </li>
                      </ul>

                      <h3 className="text-xl font-medium text-brand-deep">3. Estimated Delivery Times</h3>
                      <p className="text-brand-text/80 font-light leading-relaxed">
                        We partner with top shipping couriers to deliver your orders safely:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-brand-text/80 font-light ml-4">
                        <li>
                          <strong>Cairo, Giza, and Qalyubia:</strong> Delivery within <strong>2 - 3 business days</strong> from order confirmation.
                        </li>
                        <li>
                          <strong>Rest of Egypt:</strong> Delivery within <strong>3 - 5 business days</strong> from order confirmation.
                        </li>
                      </ul>
                      <p className="text-brand-text/60 font-light text-xs italic mt-2">
                        *Note: Business days exclude official public holidays and weekends (Fridays).
                      </p>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
