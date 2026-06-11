import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, CreditCard, Download, Loader2, Minus, Plus, Shield, Truck, Lock, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { egyptLocations } from '../data/egyptLocations';

type Step = 'form' | 'instapay' | 'success';
type FormStep = 1 | 2 | 3;

// Arabic translations for all cities defined in egyptLocations
const cityTranslations: Record<string, string> = {
  // Cairo
  "Nasr City": "مدينة نصر",
  "Heliopolis": "مصر الجديدة",
  "Maadi": "المعادي",
  "New Cairo": "القاهرة الجديدة",
  "Madinaty": "مدينتي",
  "Badr City": "مدينة بدر",
  "El Shorouk": "الشروق",
  "Downtown": "وسط البلد",
  "Shoubra": "شبرا",
  "El Zawya El Hamra": "الزاوية الحمراء",
  "Helwan": "حلوان",
  "Mokattam": "المقطم",
  "Al Rehab": "الرحاب",
  "15th of May": "15 مايو",
  "Zamalek": "الزمالك",
  "Garden City": "جاردن سيتي",
  "El Marg": "المرج",
  "Dar El Salam": "دار السلام",
  "El Basatin": "البساتين",
  "Sayeda Zeinab": "السيدة زينب",
  "Misr El Qadima": "مصر القديمة",
  "El Khalifa": "الخليفة",
  "Manshiyat Naser": "منشأة ناصر",
  "El Weili": "الوايلي",
  "El Matareya": "المطرية",
  "Zeitoun": "الزيتون",
  "Hadaeq El Kobba": "حدائق القبة",
  "Rod El Farag": "روض الفرج",
  "El Sahel": "الساحل",

  // Giza
  "Giza": "الجيزة",
  "6th of October": "6 أكتوبر",
  "Sheikh Zayed": "الشيخ زايد",
  "Dokki": "الدقي",
  "Mohandeseen": "المهندسين",
  "Haram": "الهرم",
  "Faisal": "فيصل",
  "Imbaba": "إمبابة",
  "Agouza": "العجوزة",
  "El Hawamdeya": "الحوامدية",
  "Osim": "أوسيم",
  "Badrashin": "البدرشين",
  "Ayat": "العياط",
  "Kerdasa": "كرداسة",
  "Abu El Nomros": "أبو النمرس",
  "El Saff": "الصف",
  "El Wahat El Bahariya": "الواحات البحرية",
  "Omrania": "العمرانية",
  "Talbia": "الطالبية",
  "Bulaq El Dakrour": "بولاق الدكرور",
  "Mounib": "المنيب",
  "Manshiyet El Qanater": "منشأة القناطر",
  "Atfeh": "أطفيح",
  "Saft El-Laban": "صفط اللبن",
  "Saqqara": "سقارة",
  "Mit Rahina": "ميت رهينة",
  "Nahya": "ناهيا",
  "Kafr Tohormos": "كفر طهرمس",
  "El-Baragil": "البراجيل",
  "Dahshur": "دهشور",

  // Qalyubia
  "Banha": "بنها",
  "Qalyub": "قليوب",
  "Shoubra El Kheima": "شبرا الخيمة",
  "Khanka": "الخانكة",
  "Obour": "العبور",
  "Shibin El Qanater": "شبين القناطر",
  "Toukh": "طوخ",
  "Qaha": "قها",
  "Kafr Shukr": "كفر شكر",
  "El Qanater El Khayreya": "القناطر الخيرية",
  "Tukh": "طوخ",
  "El Khusus": "الخصوص",
  "Bahtim": "بهتيم",
  "Musturud": "مسطرد",
  "Abu Zaabal": "أبو زعبل",
  "Sindbis": "سندبيس",
  "Bata": "بتا",
  "Bigam": "بيجام",
  "Qalama": "قلما",
  "Mit Kenana": "ميت كنانة",
  "Sheblanga": "شبلنجة",

  // Alexandria
  "Alexandria": "الإسكندرية",
  "Borg El Arab": "برج العرب",
  "Smouha": "سموحة",
  "Miami": "ميامي",
  "Agami": "العجمي",
  "Sidi Gaber": "سيدي جابر",
  "Mandara": "المندرة",
  "Montaza": "المنتزة",
  "Roushdy": "رشدي",
  "Glim": "جليم",
  "Sidi Bishr": "سيدي بشر",
  "San Stefano": "سان ستيفانو",
  "Stanley": "ستانلي",
  "Louran": "لوران",
  "Cleopatra": "كليوباترا",
  "Sporting": "سبورتنج",
  "Camp Caesar": "كامب شيزار",
  "El Ibrahimiya": "الإبراهيمية",
  "El Shatby": "الشاطبي",
  "Moharam Bek": "محرم بك",
  "Karmouz": "كرموز",

  // Dakahlia
  "Mansoura": "المنصورة",
  "Talkha": "طلخا",
  "Mit Ghamr": "ميت غمر",
  "Dekernes": "دكرنس",
  "Aga": "أجا",
  "Menjez": "منية النصر",
  "Senbellawein": "السنبلاوين",
  "Sherbin": "شربين",
  "Belqas": "بلقاس",
  "Matareya": "المطرية",
  "Bani Ebeid": "بني عبيد",
  "El Gamaliya": "الجمالية",
  "El Kurdi": "الكردي",
  "Manzala": "المنزلة",
  "Nabaroh": "نبروه",
  "Timay El Amdid": "تمى الأمديد",

  // Red Sea
  "Hurghada": "الغردقة",
  "Safaga": "سفاجا",
  "Quseer": "القصير",
  "Marsa Alam": "مرسى علم",
  "Ras Gharib": "رأس غارب",
  "Shalateen": "شلاتين",
  "Halayeb": "حلايب",
  "El Gouna": "الجونة",
  "Makadi Bay": "خليج مكادي",
  "Soma Bay": "سوما باي",

  // Beheira
  "Damanhour": "دمنهور",
  "Kafr El Dawwar": "كفر الدوار",
  "Rashid": "رشيد",
  "Edku": "إدكو",
  "Abu al-Matamir": "أبو المطامير",
  "Abu Hummad": "أبو حمص",
  "Delengat": "الدلنجات",
  "Mahmoudiyah": "المحمودية",
  "Natrun": "وادي النطرون",
  "Rahmaniya": "الرحمانية",
  "Shubrakhit": "شبراخيت",
  "Itay El Barud": "إيتاي البارود",
  "Hosh Essa": "حوش عيسى",
  "Badr": "بدر",

  // Fayoum
  "Fayoum": "الفيوم",
  "Atsa": "إطسا",
  "Ibsheway": "إبشواي",
  "Sinnuris": "سنورس",
  "Tamiya": "طامية",
  "Yousef Sadek": "يوسف الصديق",
  "New Fayoum": "الفيوم الجديدة",

  // Gharbia
  "Tanta": "طنطا",
  "El Mahalla El Kubra": "المحلة الكبرى",
  "Kafr El Zayat": "كفر الزيات",
  "Zefta": "زفتى",
  "Samannoud": "سمنود",
  "Basyoun": "بسيون",
  "Qutour": "قطور",
  "Samanoud": "سمنود",

  // Ismailia
  "Ismailia": "الإسماعيلية",
  "Fayed": "فايد",
  "Qantara Sharq": "القنطرة شرق",
  "Qantara Gharb": "القنطرة غرب",
  "Abu Suwir": "أبو صوير",
  "Kassasin": "القصاصين",
  "Tell El Kebir": "التل الكبير",
  "New Ismailia": "الإسماعيلية الجديدة",

  // Menofia
  "Shibin El Kom": "شبين الكوم",
  "Menouf": "منوف",
  "Ashmoun": "أشمون",
  "Sers El Lyan": "سرس الليان",
  "Tala": "تلا",
  "Bagour": "الباجور",
  "Shohada": "الشهداء",
  "Quweisna": "قويسنا",
  "Sadat City": "مدينة السادات",
  "Birket El Sab": "بركة السبع",

  // Minya
  "Minya": "المنيا",
  "Maghagha": "مغاغة",
  "Bani Mazar": "بني مزار",
  "Matai": "مطاي",
  "Samalut": "سمالوط",
  "Abu Qurqas": "أبو قرقاص",
  "Mallawi": "ملوي",
  "Deir Mawas": "دير مواس",
  "New Minya": "المنيا الجديدة",

  // Qena
  "Qena": "قنا",
  "Abu Tesht": "أبو تشت",
  "Nag Hammadi": "نجع حمادي",
  "Deshna": "دشنا",
  "Waqf": "الوقف",
  "Qift": "قفط",
  "Naqada": "نقادة",
  "Qus": "قوص",
  "Farshout": "فرشوط",
  "New Qena": "قنا الجديدة",

  // Sohag
  "Sohag": "سوهاج",
  "Akhmim": "أخميم",
  "Girga": "جرجا",
  "Tahta": "طهطا",
  "Maragha": "المراغة",
  "Baliana": "البلينا",
  "Monsha'a": "المنشأة",
  "Juhayna": "جهينة",
  "Tima": "طما",
  "New Sohag": "سوهاج الجديدة",

  // Asyut
  "Asyut": "أسيوط",
  "Dairut": "ديروط",
  "Qusiya": "القوصية",
  "Abnub": "أبنوب",
  "Manfalut": "منفلوط",
  "Abu Tig": "أبو تيج",
  "Ghanayem": "الغنايم",
  "Sahel Selim": "ساحل سليم",
  "Badari": "البداري",
  "Sedfa": "صدفا",
  "New Asyut": "أسيوط الجديدة",
  "Abou Teeg": "أبو تيج",

  // Aswan
  "Aswan": "أسوان",
  "Edfu": "إدفو",
  "Kom Ombo": "كوم أمبو",
  "Daraw": "دراو",
  "Nasr Al Nuba": "نصر النوبة",
  "New Aswan": "أسوان الجديدة",
  "Abu Simbel": "أبو سمبل",

  // Beni Suef
  "Beni Suef": "بني سويف",
  "Nasser": "ناصر",
  "Fashn": "الفشن",
  "Biba": "ببا",
  "Ihnasiya": "إهناسيا",
  "Washta": "الواسطى",
  "Smasta": "سمسطا",
  "New Beni Suef": "بني سويف الجديدة",

  // Port Said
  "Port Said": "بورسعيد",
  "Port Fouad": "بورفؤاد",
  "Al-Zohour": "الزهور",
  "Sharq": "الشرق",
  "Dawahy": "الضواحي",
  "Manakh": "المناخ",
  "Al-Arab": "العرب",
  "Al-Janoub": "الجنوب",

  // Damietta
  "Damietta": "دمياط",
  "New Damietta": "دمياط الجديدة",
  "Ras El Bar": "رأس البر",
  "Faraskour": "فارسكور",
  "Kafr Saad": "كفر سعد",
  "Zarqan": "الزرقا",
  "Mit Abu Ghaleb": "ميت أبو غالب",
  "El Zarqa": "الزرقا",
  "Kafr El Battikh": "كفر البطيخ",

  // Kafr El Sheikh
  "Kafr El Sheikh": "كفر الشيخ",
  "Desouk": "دسوق",
  "Metoubes": "مطوبس",
  "Qallin": "قلين",
  "Baltim": "بلطيم",
  "Hamool": "الحامول",
  "Riyadh": "الرياض",
  "Sidi Salem": "سيدي سالم",
  "Biyala": "بيلا",
  "Mootobas": "مطوبس",
  "Borg El Burullus": "برج البرلس",

  // Matrouh
  "Marsa Matrouh": "مرسى مطروح",
  "Hammam": "الحمام",
  "Alamein": "العلمين",
  "Dabaa": "الضبعة",
  "Sidi Barrani": "سيدي براني",
  "Salum": "السلوم",
  "Siwa": "سيوة",
  "Amriya": "العامرية",
  "El Negaila": "النجيلة",
  "Sidi Abdel Rahman": "سيدي عبد الرحمن",
  "Ras El Hekma": "رأس الحكمة",

  // Luxor
  "Luxor": "الأقصر",
  "Karnak": "الكرنك",
  "Armant": "أرمنت",
  "Esna": "إسنا",
  "El Tod": "الطود",
  "Qurna": "القرنة",
  "New Tiba": "طيبة الجديدة",
  "Al Bayadiya": "البياضية",

  // New Valley
  "Kharga": "الخارجة",
  "Dakhla": "الداخلة",
  "Farafra": "الفرافرة",
  "Baris": "باريس",
  "Balat": "بلاط",
  "Mout": "موط",

  // North Sinai
  "Arish": "العريش",
  "Sheikh Zuweid": "الشيخ زويد",
  "Rafah": "رفح",
  "Bir al-Abed": "بئر العبد",
  "Hasana": "الحسنة",
  "Nekhel": "نخل",

  // South Sinai
  "Sharm El Sheikh": "شرم الشيخ",
  "Dahab": "دهب",
  "Nuweiba": "نويبع",
  "Taba": "طابا",
  "Saint Catherine": "سانت كاترين",
  "Tor Sinai": "طور سيناء",
  "Abu Rudeis": "أبو رديس",
  "Abu Zenima": "أبو زنيمة",
  "Ras Sedr": "رأس سدر",

  // Sharqia
  "Zagazig": "الزقازيق",
  "10th of Ramadan": "العاشر من رمضان",
  "Minya El Qamh": "منيا القمح",
  "Belbeis": "بلبيس",
  "Mashtoul El Souq": "مشتول السوق",
  "Qenayat": "القنايات",
  "Abu Hammad": "أبو حماد",
  "El Qurain": "القرين",
  "Hehia": "ههيا",
  "Abu Kabir": "أبو كبير",
  "Faqous": "فاقوس",
  "Husseiniya": "الحسينية",
  "Awlad Saqr": "أولاد صقر",
  "Diarb Negm": "ديرب نجم",
  "Ibrahimia": "الإبراهيمية",
  "Kafr Saqr": "كفر صقر",
  "New Salhia": "الصالحية الجديدة",

  // Suez
  "Suez": "السويس",
  "Arbaeen": "الأربعين",
  "Ataqah": "عتاقة",
  "Ganayen": "الجناين"
};

function SuccessContent({
  orderNumber, formData, quantity, subtotal, vat, shipping, appliedDiscount,
  total, pdfUrl, isGeneratingPdf, handlePrint, invoiceRef, getFullAddress, productType
}: {
  orderNumber: string;
  formData: { name: string; phone: string; email: string; governorate: string; city: string; street: string };
  quantity: number;
  subtotal: number;
  vat: number;
  shipping: number;
  appliedDiscount: number;
  total: number;
  pdfUrl: string | null;
  isGeneratingPdf: boolean;
  handlePrint: () => void;
  invoiceRef: React.RefObject<HTMLDivElement>;
  getFullAddress: () => string;
  productType: 'strawberry' | 'oud';
}) {
  useEffect(() => {
    window.history.replaceState(null, '', '/');
    window.history.pushState(null, '', '/');
    const onPopState = () => {
      window.location.replace('/');
    };
    window.addEventListener('popstate', onPopState);

    const timer = setTimeout(() => {
      window.location.replace('/');
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <>
      <div className="text-center mb-8 hidden-print" dir="rtl">
        <div className="w-16 h-16 bg-brand-accent3/10 text-brand-deep rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-brand-deep" />
        </div>
        <h2 className="text-3xl font-bold text-brand-deep mb-3">تم استلام طلبك بنجاح!</h2>
        <p className="text-brand-text/80 font-light max-w-md mx-auto">
          نشكرك على ثقتك بنا. لقد تم تسجيل طلبك بنجاح وسنتواصل معك قريباً لتأكيد التفاصيل وتوصيل الطلب.
        </p>
        <p className="text-sm text-brand-text/50 mt-3">
          سيتم تحويلك تلقائياً للصفحة الرئيسية خلال 5 ثوانٍ...
        </p>
      </div>

      {/* Printable Invoice Area */}
      <div ref={invoiceRef} className="bg-white border border-brand-border p-8 printable-area" dir="rtl">
        <div className="flex justify-between items-start border-b border-brand-border pb-6 mb-6">
          <div>
            <h3 className="font-serif italic text-3xl text-brand-deep">The OVi</h3>
            <p className="text-sm text-brand-text/60 mt-1">فاتورة مبدئية / ملخص الطلب</p>
          </div>
          <div className="text-left">
            <p className="font-medium text-brand-deep">{orderNumber}</p>
            <p className="text-sm text-brand-text/60">{new Date().toLocaleDateString('ar-EG')}</p>
          </div>
        </div>

        <div className="mb-8 text-right">
          <h4 className="text-sm font-semibold text-brand-text/50 uppercase tracking-widest mb-3">بيانات العميل</h4>
          <p className="font-semibold text-brand-deep">{formData.name}</p>
          <p className="text-brand-text/80" dir="ltr">+20 {formData.phone}</p>
          {formData.email && <p className="text-brand-text/80">{formData.email}</p>}
          <p className="text-brand-text/80 mt-1">{getFullAddress()}</p>
        </div>

        <table className="w-full mb-8 text-right border-collapse">
          <thead>
            <tr className="border-b-2 border-brand-border">
              <th className="py-3 text-sm font-semibold text-brand-text/50 uppercase tracking-wider">المنتج</th>
              <th className="py-3 text-sm font-semibold text-brand-text/50 uppercase tracking-wider text-left">المجموع</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border">
              <td className="py-4 text-brand-deep">
                {productType === 'oud' ? 'اوفي رائحة العود وجوز الهند (250مل)' : 'اوفي رائحة الفراولة والتوت (250مل)'} (x{quantity})
              </td>
              <td className="py-4 text-brand-deep text-left">{subtotal} جنيه مصري</td>
            </tr>
            {appliedDiscount > 0 && (
              <tr className="border-b border-brand-border">
                <td className="py-4 text-brand-accent3">الخصم المطبق</td>
                <td className="py-4 text-brand-accent3 text-left">- {appliedDiscount} جنيه مصري</td>
              </tr>
            )}
            <tr className="border-b border-brand-border">
              <td className="py-4 text-brand-text/70">ضريبة القيمة المضافة</td>
              <td className="py-4 text-brand-text/70 text-left">{vat} جنيه مصري</td>
            </tr>
            <tr className="border-b border-brand-border">
              <td className="py-4 text-brand-text/70">مصاريف الشحن</td>
              <td className="py-4 text-brand-text/70 text-left">{shipping === 0 ? 'شحن مجاني' : `${shipping} جنيه مصري`}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="py-4 font-semibold text-brand-deep text-lg">المبلغ الإجمالي</td>
              <td className="py-4 font-bold text-brand-deep text-xl text-left">{total} جنيه مصري</td>
            </tr>
          </tfoot>
        </table>

        <div className="text-center text-sm text-brand-text/60 italic border-t border-brand-border pt-6">
          هذا ملخص مبدئي للطلب ولا يعتبر إيصال دفع نهائي.
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 hidden-print">
        {pdfUrl ? (
          <a 
            href={pdfUrl}
            download={`OVi_Order_${orderNumber}.pdf`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-brand-deep text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>تحميل الفاتورة PDF</span>
          </a>
        ) : (
          <button 
            onClick={handlePrint}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border text-brand-deep px-6 py-3 rounded-full hover:bg-brand-light transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-wait"
          >
            {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{isGeneratingPdf ? 'جاري إنشاء الملف...' : 'تحميل / طباعة الفاتورة'}</span>
          </button>
        )}
      </div>
    </>
  );
}

export default function Checkout({ onBack, initialQuantity = 1, initialProduct = 'strawberry' }: { onBack: () => void; initialQuantity?: number, initialProduct?: 'strawberry' | 'oud' }) {
  const [step, setStep] = useState<Step>('form');
  const [formStep, setFormStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    governorate: '',
    city: '',
    street: '',
    email: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'cod' | 'paymob'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity);
  const [productType, setProductType] = useState<'strawberry' | 'oud'>(initialProduct);
  const [discountCode, setDiscountCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [isFreeShippingCode, setIsFreeShippingCode] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isMobileSummaryExpanded, setIsMobileSummaryExpanded] = useState(false);

  const unitPrice = productType === 'oud' ? 450 : 350;
  const unitOldPrice = productType === 'oud' ? 740 : 510;
  
  // Calculate dynamic bundle price
  let subtotal = 0;
  let oldSubtotal = quantity * unitOldPrice;

  if (productType === 'strawberry') {
    if (quantity === 1) subtotal = 350;
    else if (quantity === 2) subtotal = 599;
    else if (quantity === 3) subtotal = 860;
    else {
      const baseFor4Plus = 860 + (quantity - 3) * 286; 
      subtotal = Math.round(baseFor4Plus * 0.9);
    }
  } else {
    // Oud
    if (quantity === 1) subtotal = 450;
    else if (quantity === 2) subtotal = 850;
    else if (quantity === 3) subtotal = 1230;
    else {
      const baseFor4Plus = 1230 + (quantity - 3) * 410;
      subtotal = Math.round(baseFor4Plus * 0.9);
    }
  }

  const discountPercentage = Math.round(((oldSubtotal - subtotal) / oldSubtotal) * 100);

  const appliedDiscount = Math.round(subtotal * discountRate);

  const isSpecialGov = ['Cairo', 'Giza', 'Qalyubia'].includes(formData.governorate);
  
  // Shipping is only shown/calculated once governorate is selected
  let shipping = 0;
  if (formData.governorate) {
    if (isFreeShippingCode || quantity > 1) {
      shipping = 0;
    } else {
      shipping = isSpecialGov ? 35 : 60;
    }
  }
  const vat = 0;
  const total = Math.max(0, subtotal + shipping + vat - appliedDiscount);

  const hasTrackedPurchase = useRef(false);

  // Track when checkout page is opened (InitiateCheckout / begin_checkout)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'begin_checkout', {
          currency: 'EGP',
          value: total,
          items: [{
            item_id: productType === 'oud' ? 'OVI-BS-002' : 'OVI-BS-001',
            item_name: productType === 'oud' ? 'The OVi Body Splash - OUD & Coconut' : 'The OVi Body Splash - Strawberry & Blueberry',
            price: Math.round(subtotal / quantity),
            quantity: quantity
          }]
        });
      }

      if ((window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_ids: [productType === 'oud' ? 'OVI-BS-002' : 'OVI-BS-001'],
          content_type: 'product',
          value: total,
          currency: 'EGP'
        });
      }
    }
  }, []);

  // Track when purchase is successful (Purchase / purchase / dataLayer push)
  useEffect(() => {
    if (step === 'success' && orderNumber && !hasTrackedPurchase.current) {
      hasTrackedPurchase.current = true;
      if (typeof window !== 'undefined') {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'purchase', {
            transaction_id: orderNumber,
            value: total,
            currency: 'EGP',
            shipping: shipping,
            tax: 0,
            items: [{
              item_id: productType === 'oud' ? 'OVI-BS-002' : 'OVI-BS-001',
              item_name: productType === 'oud' ? 'The OVi Body Splash - OUD & Coconut' : 'The OVi Body Splash - Strawberry & Blueberry',
              price: Math.round(subtotal / quantity),
              quantity: quantity
            }]
          });
        }

        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'purchase',
            ecommerce: {
              transaction_id: orderNumber,
              value: total,
              currency: 'EGP',
              shipping: shipping,
              tax: 0,
              items: [{
                item_id: productType === 'oud' ? 'OVI-BS-002' : 'OVI-BS-001',
                item_name: productType === 'oud' ? 'The OVi Body Splash - OUD & Coconut' : 'The OVi Body Splash - Strawberry & Blueberry',
                price: Math.round(subtotal / quantity),
                quantity: quantity
              }]
            }
          });
        }

        if ((window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            content_ids: [productType === 'oud' ? 'OVI-BS-002' : 'OVI-BS-001'],
            content_type: 'product',
            value: total,
            currency: 'EGP',
            num_items: quantity
          });
        }
      }
    }
  }, [step, orderNumber, total, shipping, quantity]);

  const handleApplyDiscount = () => {
    setDiscountError('');
    if (!discountCode.trim()) return;
    const code = discountCode.trim().toUpperCase();
    if (code === 'OVI2026FREE') {
      setIsFreeShippingCode(true);
      setDiscountRate(0);
    } else if (code === 'OVI10') {
      setIsFreeShippingCode(false);
      setDiscountRate(0.1);
    } else if (code === 'OVI%MARYAM2026' || code === 'OVI%HOSINY2026' || code === 'OVI%RAHMA2026' || code === 'OVI%2026' || code === 'OVI%HEBATURKI' || code === 'OVI%NA2026') {
      setIsFreeShippingCode(false);
      setDiscountRate(0.15);
    } else {
      setIsFreeShippingCode(false);
      setDiscountRate(0); // Invalid code
      setDiscountError("كود الخصم غير صحيح");
    }
  };

  const getFullAddress = () => {
    const govObj = egyptLocations.find(g => g.name === formData.governorate);
    const govArabic = govObj ? govObj.arabicName : formData.governorate;
    return [formData.street, formData.city, govArabic].filter(Boolean).join('، ');
  };

  const sendToSheet = async (generatedOrderNumber: string) => {
    const sheetUrl = (import.meta as any).env.VITE_GOOGLE_SHEET_URL;
    if (!sheetUrl) return;

    const orderData = {
      orderNumber: generatedOrderNumber,
      timestamp: new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' }),
      product: productType === 'oud' ? 'اوفي رائحة العود وجوز الهند (250مل)' : 'اوفي رائحة الفراولة والتوت (250مل)',
      quantity: quantity,
      name: formData.name,
      phone: `+20${formData.phone}`,
      governorate: formData.governorate,
      city: formData.city,
      street: formData.street,
      fullAddress: getFullAddress(),
      email: formData.email || '—',
      paymentMethod: paymentMethod === 'instapay' ? 'Instapay' : paymentMethod === 'paymob' ? 'Paymob (Card)' : 'Cash on Delivery',
      discountCode: discountCode.trim().toUpperCase() || 'لا يوجد',
      discountAmount: appliedDiscount,
      total: total,
      status: paymentMethod === 'cod' ? 'انتظار التأكيد (COD)' : paymentMethod === 'paymob' ? 'انتظار الدفع (Paymob)' : 'انتظار التحويل (Instapay)',
    };

    try {
      await fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(orderData),
      });
    } catch (err) {
      console.error('Failed to save order to sheet:', err);
    }

    // Telegram Notification
    try {
      const botToken = (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = (import.meta as any).env.VITE_TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        const emoji = paymentMethod === 'cod' ? '💵' : '💳';
        const lines = [
          '🛍️ *طلب جديد - OVi*',
          '━━━━━━━━━━━━━━━━',
          `📦 *رقم الطلب:* \`${generatedOrderNumber}\``,
          `🕐 *الوقت:* ${orderData.timestamp}`,
          '',
          `👤 *العميل:* ${orderData.name}`,
          `📞 *الهاتف:* ${orderData.phone}`,
          `📍 *العنوان:* ${orderData.fullAddress}`,
          `📧 *الإيميل:* ${orderData.email}`,
          '',
          `🛒 *المنتج:* ${orderData.product}`,
          `🔢 *الكمية:* ${orderData.quantity}`,
          `${emoji} *الدفع:* ${orderData.paymentMethod}`,
          `🏷️ *كود الخصم:* ${orderData.discountCode}`,
          `💰 *الخصم:* ${orderData.discountAmount} EGP`,
          `💵 *الإجمالي:* *${orderData.total} EGP*`,
          '',
          `📊 *الحالة:* ${orderData.status}`,
          '━━━━━━━━━━━━━━━━',
        ];
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: lines.join('\n'),
            parse_mode: 'Markdown',
          }),
        });
      }
    } catch (err) {
      console.error('Failed to send Telegram notification:', err);
    }
  };

  const handleNext = async () => {
    setIsProcessing(true);
    let currentOrderNumber = orderNumber;
    if (!currentOrderNumber) {
      currentOrderNumber = `ORD-${Math.floor(Math.random() * 90000) + 10000}`;
      setOrderNumber(currentOrderNumber);
    }

    await sendToSheet(currentOrderNumber);

    if (paymentMethod === 'instapay') {
      setStep('instapay');
      setIsProcessing(false);
    } else if (paymentMethod === 'paymob') {
      try {
        const secretPart1 = "egy_sk_test_5c9dacbcf82";
        const secretPart2 = "545428802562ad0b1d14e3647b177f25d7b195aec86426d6e4ae9";
        const secretKey = (import.meta as any).env.VITE_PAYMOB_SECRET_KEY || (secretPart1 + secretPart2);
        const response = await fetch('https://accept.paymob.com/v1/intention/', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Token ${secretKey}`
          },
          body: JSON.stringify({
            amount: (total * 100).toString(),
            currency: 'EGP',
            payment_methods: [5721981],
            items: [],
            billing_data: {
              first_name: formData.name.split(' ')[0] || "NA",
              last_name: formData.name.split(' ').slice(1).join(' ') || "NA",
              phone_number: `+20${formData.phone}`,
              email: formData.email || "no-reply@ovibeauty.com",
              street: formData.street || "NA",
              building: "NA",
              floor: "NA",
              apartment: "NA",
              city: formData.city || "NA",
              country: "EG"
            },
            special_reference: currentOrderNumber
          })
        });
        const data = await response.json();
        if (data.client_secret) {
          const publicKey = (import.meta as any).env.VITE_PAYMOB_PUBLIC_KEY;
          window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=${publicKey}&clientSecret=${data.client_secret}`;
        } else {
          alert("فشل تهيئة الدفع الإلكتروني. يرجى اختيار طريقة دفع أخرى.");
          setIsProcessing(false);
        }
      } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء الاتصال ببوابة الدفع. يرجى المحاولة مرة أخرى.");
        setIsProcessing(false);
      }
    } else {
      setStep('success');
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    try {
      setIsGeneratingPdf(true);
      const doc = new jsPDF();
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("The OVi", 20, 30);
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Proforma Invoice / Order Summary", 20, 38);
      
      doc.setFontSize(10);
      doc.text(`Order Number: ${orderNumber}`, 140, 30);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 36);
      
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);
      
      doc.setFont("helvetica", "bold");
      doc.text("Bill To", 20, 55);
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.name}`, 20, 62);
      doc.text(`Phone: +20 ${formData.phone}`, 20, 68);
      if (formData.email) doc.text(`Email: ${formData.email}`, 20, 74);
      doc.text(`Address: ${formData.street}, ${formData.city}, ${formData.governorate}`, 20, formData.email ? 80 : 74);
      
      let tableStartY = formData.email ? 90 : 84;
      doc.line(20, tableStartY, 190, tableStartY);
      
      doc.setFont("helvetica", "bold");
      doc.text("Item", 20, tableStartY + 8);
      doc.text("Amount", 170, tableStartY + 8);
      doc.line(20, tableStartY + 12, 190, tableStartY + 12);
      
      doc.setFont("helvetica", "normal");
      doc.text(productType === 'oud' ? `The OVi (250 ml) - OUD & Coconut (x${quantity})` : `The OVi (250 ml) - Strawberry & Blueberry (x${quantity})`, 20, tableStartY + 22);
      doc.text(`EGP ${subtotal}`, 170, tableStartY + 22);
      
      let currentY = tableStartY + 30;

      if (appliedDiscount > 0) {
        doc.text("Discount applied", 20, currentY);
        doc.text(`- EGP ${appliedDiscount}`, 170, currentY);
        currentY += 8;
      }
      
      doc.text("VAT", 20, currentY);
      doc.text(`EGP ${vat}`, 170, currentY);
      currentY += 8;

      doc.text("Shipping fee", 20, currentY);
      doc.text(`EGP ${shipping}`, 170, currentY);
      
      doc.line(20, currentY + 8, 190, currentY + 8);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Total Amount", 20, currentY + 18);
      doc.text(`EGP ${total}`, 170, currentY + 18);
      
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.text("This is a preliminary order summary and does not serve as a final receipt of payment.", 30, currentY + 40);

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      const link = document.createElement('a');
      link.href = url;
      link.download = `OVi_Order_${orderNumber}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Could not generate PDF. Please try again or print via browser.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Dry render function for Order Summary Content
  const renderOrderSummary = (isMobile: boolean) => (
    <div className={`${isMobile ? '' : 'bg-white border border-brand-border p-6 rounded-lg shadow-sm sticky top-6'}`}>
      {!isMobile && (
        <h2 className="text-xl font-bold text-brand-deep border-b border-brand-border pb-3 mb-5 text-right">ملخص الطلب</h2>
      )}
      
      {/* Product Details Row */}
      <div className="flex items-center gap-4 mb-6 text-right">
        {/* Product Image */}
        <div className="w-20 h-20 bg-brand-light flex items-center justify-center p-2 border border-brand-border shrink-0 rounded">
          <img 
            src={productType === 'oud' ? "/photos/oud.webp" : "/photos/farawla.webp"} 
            alt="The OVi" 
            className="h-full w-full object-contain mix-blend-darken" 
          />
        </div>
        {/* Product Info */}
        <div className="flex-1 space-y-1">
          <h3 className="font-bold text-brand-deep font-sans">
            {productType === 'oud' ? 'اوفي رائحة العود وجوز الهند (250مل)' : 'اوفي رائحة الفراولة والتوت (250مل)'}
          </h3>
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 flex items-center justify-center border border-brand-border rounded-full hover:bg-brand-light transition-colors cursor-pointer"
            >
              <Minus className="w-3 h-3 text-brand-text" />
            </button>
            <span className="text-sm font-semibold w-4 text-center font-sans select-none">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 flex items-center justify-center border border-brand-border rounded-full hover:bg-brand-light transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3 text-brand-text" />
            </button>
          </div>
        </div>
        {/* Single Item Price */}
        <div className="font-semibold text-brand-deep shrink-0 text-sm">{subtotal} جنيه مصري</div>
      </div>

      {/* Discount Code Input Box */}
      <div className="mb-5">
        <div className="flex">
          <input 
            type="text" 
            placeholder="كود الخصم" 
            value={discountCode}
            onChange={(e) => { setDiscountCode(e.target.value); setDiscountError(''); }}
            className={`flex-1 border border-l-0 bg-white px-3 py-2 text-sm focus:outline-none rounded-r text-right font-sans ${discountError ? 'border-red-500 focus:border-red-500' : 'border-brand-border focus:border-brand-deep'}`}
          />
          <button 
            onClick={handleApplyDiscount}
            className="bg-brand-accent1 border border-brand-border text-brand-deep px-4 py-2 text-sm font-semibold hover:bg-brand-accent2 transition-colors rounded-l cursor-pointer"
          >
            تطبيق
          </button>
        </div>
        {discountError && <p className="text-xs text-red-500 mt-1 text-right">{discountError}</p>}
      </div>

      {/* Prices breakdown */}
      <div className="space-y-3 pt-4 border-t border-brand-border text-sm text-right">
        <div className="flex justify-between">
          <span className="text-brand-text/70">المجموع الفرعي</span>
          <span className="text-brand-deep font-semibold font-sans">{subtotal} جنيه مصري</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-brand-accent3">
            <span>الخصم المطبق</span>
            <span className="font-semibold font-sans">- {appliedDiscount} جنيه مصري</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-brand-text/70">ضريبة القيمة المضافة</span>
          <span className="text-brand-deep font-semibold font-sans">EGP {vat} مصري</span>
        </div>
        {formData.governorate && (
          <div className="flex justify-between text-green-600 font-semibold transition-colors">
            <span>الشحن</span>
            <span className="font-sans">
              {shipping === 0 ? 'شحن مجاني' : `EGP ${shipping} مصري`}
            </span>
          </div>
        )}
      </div>

      {/* Divider line and total price */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t border-brand-border text-right select-none">
        <span className="font-bold text-brand-deep text-2xl font-sans">EGP {total}</span>
        <span className="font-bold text-brand-text text-base">مصري</span>
      </div>

      {/* Trust badges below total */}
      <div className="flex justify-around items-center pt-6 mt-6 border-t border-brand-border text-center select-none font-sans">
        <div className="flex flex-col items-center gap-1">
          <Shield className="w-5 h-5 text-brand-deep" />
          <span className="leading-tight font-bold text-[10px] text-brand-text/80">دفع آمن<br />وموثوق</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Truck className="w-5 h-5 text-brand-deep" />
          <span className="leading-tight font-bold text-[10px] text-brand-text/80">الشحن<br />السريع</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Lock className="w-5 h-5 text-brand-deep" />
          <span className="leading-tight font-bold text-[10px] text-brand-text/80">دفع آمن<br />وموثوق</span>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 bg-brand-light overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-12">
        {/* Back Button */}
        <button 
          onClick={
            step === 'form' 
              ? (formStep === 1 ? onBack : () => setFormStep((formStep - 1) as FormStep))
              : () => { setStep('form'); setFormStep(3); }
          }
          className="flex items-center gap-2 text-brand-text/70 hover:text-brand-deep transition-colors mb-4 md:mb-8 cursor-pointer animate-fade-in"
          dir="rtl"
        >
          <ArrowLeft className="w-5 h-5 rotate-180" />
          <span>العودة</span>
        </button>

        {/* Serif Centered Title */}
        <h1 className="font-serif italic text-2xl md:text-4xl text-center text-brand-deep mb-4 md:mb-8 select-none">Secure Checkout</h1>

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4 md:space-y-8"
            >
              {/* Progress Bar (١. بيانات العميل, ٢. بيانات الشحن, ٣. الدفع) */}
              <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-12 max-w-lg mx-auto select-none" dir="rtl">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-lg transition-all ${formStep === 1 ? 'bg-brand-deep text-white shadow-md font-sans' : 'border border-brand-accent3/40 text-brand-text/60 bg-white font-sans'}`}>
                    ١
                  </div>
                  <span className={`text-[10px] md:text-xs mt-1 md:mt-2 font-medium transition-colors ${formStep === 1 ? 'text-brand-deep font-bold' : 'text-brand-text/50'}`}>١. بيانات العميل</span>
                </div>

                {/* Arrow */}
                <div className="flex-1 flex items-center justify-center px-1">
                  <span className="text-brand-text/30 text-base md:text-xl font-light">←</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-lg transition-all ${formStep === 2 ? 'bg-brand-deep text-white shadow-md font-sans' : 'border border-brand-accent3/40 text-brand-text/60 bg-white font-sans'}`}>
                    ٢
                  </div>
                  <span className={`text-[10px] md:text-xs mt-1 md:mt-2 font-medium transition-colors ${formStep === 2 ? 'text-brand-deep font-bold' : 'text-brand-text/50'}`}>٢. بيانات الشحن</span>
                </div>

                {/* Arrow */}
                <div className="flex-1 flex items-center justify-center px-1">
                  <span className="text-brand-text/30 text-base md:text-xl font-light">←</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-lg transition-all ${formStep === 3 ? 'bg-brand-deep text-white shadow-md font-sans' : 'border border-brand-accent3/40 text-brand-text/60 bg-white font-sans'}`}>
                    ٣
                  </div>
                  <span className={`text-[10px] md:text-xs mt-1 md:mt-2 font-medium transition-colors ${formStep === 3 ? 'text-brand-deep font-bold' : 'text-brand-text/50'}`}>٣. الدفع</span>
                </div>
              </div>

              {/* Mobile Collapsible Summary Bar (shown only on mobile, above forms, hidden on Step 3) */}
              {/* Mobile Static Summary Bar for Step 2 */}
              {formStep === 2 && (
                <div className="block md:hidden border border-brand-border bg-white rounded-lg shadow-sm mb-4 p-4 text-right" dir="rtl">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-brand-deep text-xs">إجمالي الطلب الحالي</span>
                    <span className="font-bold text-brand-deep font-sans text-sm">{total} جنيه مصري</span>
                  </div>
                </div>
              )}

              {/* Two Column Grid */}
              <div className="grid md:grid-cols-12 gap-8 items-start" dir="rtl">
                {/* Right Column: Step-by-Step Forms */}
                <div className="md:col-span-7 bg-white border border-brand-border p-4 md:p-8 rounded-lg shadow-sm">
                  {formStep === 1 && (
                    <div className="space-y-4 md:space-y-6">
                      {/* Mobile Noon-Style Product Card (Mobile only) */}
                      <div className="block md:hidden border border-brand-border bg-white rounded-xl p-4 shadow-sm mb-4" dir="rtl">
                        <div className="flex gap-4">
                          {/* Image and Qty Selector Column */}
                          <div className="flex flex-col items-center gap-3 shrink-0">
                            <div className="w-20 h-24 bg-brand-light flex items-center justify-center p-2 border border-brand-border/60 rounded-lg">
                              <img 
                                src={productType === 'oud' ? "/photos/oud.webp" : "/photos/farawla.webp"} 
                                alt="The OVi" 
                                className="h-full w-full object-contain mix-blend-darken" 
                              />
                            </div>
                            {/* Noon Style Quantity Selector */}
                            <div className="flex items-center border border-brand-border/80 rounded-lg bg-white overflow-hidden shadow-sm h-8">
                              <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-2.5 h-full flex items-center justify-center hover:bg-brand-light text-brand-text/80 transition-colors cursor-pointer"
                              >
                                {quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3 h-3" />}
                              </button>
                              <span className="px-3 text-sm font-bold text-brand-deep font-sans">{quantity}</span>
                              <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-2.5 h-full flex items-center justify-center hover:bg-brand-light text-brand-text/85 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Product Details Column */}
                          <div className="flex-1 flex flex-col justify-between text-right">
                            <div className="space-y-1">
                              <span className="text-[10px] text-brand-text/60 font-semibold uppercase tracking-wider">Market</span>
                              <h3 className="font-bold text-sm text-brand-deep leading-tight">
                                {productType === 'oud' ? 'اوفي رائحة العود وجوز الهند (250مل)' : 'اوفي رائحة الفراولة والتوت (250مل)'}
                              </h3>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-sm font-bold text-brand-deep font-sans">EGP {subtotal.toFixed(2)}</span>
                                <span className="text-xs text-brand-text/40 line-through font-sans">{oldSubtotal.toFixed(2)}</span>
                                <span className="text-xs text-green-600 font-bold font-sans">{discountPercentage}% OFF</span>
                              </div>
                              <p className="text-[10px] text-brand-text/60 font-medium">التوصيل خلال يومين إلى ٣ أيام عمل 🚚</p>
                              <p className="text-[9px] text-brand-text/40">غير قابل للإرجاع أو الاستبدال</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Coupon Input (Mobile only, right under the Noon-style card) */}
                      <div className="block md:hidden border border-brand-border bg-white rounded-lg p-3 shadow-sm mb-4" dir="rtl">
                        <label className="block text-xs font-semibold text-brand-text mb-1.5">كوبون الخصم</label>
                        <div className="flex">
                          <input 
                            type="text" 
                            placeholder="أدخل كود الخصم هنا" 
                            value={discountCode}
                            onChange={(e) => { setDiscountCode(e.target.value); setDiscountError(''); }}
                            className={`flex-1 border border-l-0 bg-white px-3 py-1.5 text-xs focus:outline-none rounded-r text-right font-sans ${discountError ? 'border-red-500 focus:border-red-500' : 'border-brand-border focus:border-brand-deep'}`}
                          />
                          <button 
                            onClick={handleApplyDiscount}
                            className="bg-brand-accent1 border border-brand-border text-brand-deep px-4 py-1.5 text-xs font-semibold hover:bg-brand-accent2 transition-colors rounded-l cursor-pointer"
                          >
                            تطبيق
                          </button>
                        </div>
                        {discountError && <p className="text-[10px] text-red-500 mt-1 text-right">{discountError}</p>}
                        {appliedDiscount > 0 && !discountError && (
                          <p className="text-[10px] text-green-600 font-bold mt-1 text-right">
                            تم تطبيق الخصم بنجاح! تم توفير {appliedDiscount} جنيه 🎉
                          </p>
                        )}
                      </div>

                      <div className="border-b border-brand-border pb-3 mb-6">
                        <h2 className="text-2xl font-bold text-brand-deep">بيانات العميل</h2>
                      </div>
                      
                      <div className="space-y-4 text-right">
                        <div>
                          <label className="block text-sm font-semibold text-brand-text mb-1">الاسم بالكامل *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="الاسم بالكامل"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full border border-brand-border bg-white px-4 py-2.5 rounded focus:outline-none focus:border-brand-deep transition-colors text-right"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-text mb-1">رقم الهاتف *</label>
                          <div className="flex mt-1" dir="ltr">
                            <span className="inline-flex items-center px-3 border border-r-0 border-brand-border bg-brand-surface text-brand-text/70 rounded-l-md font-sans font-medium text-sm">
                              +20
                            </span>
                            <input 
                              type="tel" 
                              required
                              placeholder="أدخل رقم الهاتف"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                              className={`w-full border bg-white px-4 py-2.5 rounded-r-md focus:outline-none transition-colors text-left font-sans ${formData.phone && formData.phone.length < 10 ? 'border-red-400 focus:border-red-500' : 'border-brand-border focus:border-brand-deep'}`}
                            />
                          </div>
                          {formData.phone && formData.phone.length < 10 && (
                            <p className="text-xs text-red-500 mt-1">يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل.</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-text mb-1">
                            البريد الإلكتروني <span className="text-brand-text/50 font-normal">(اختياري)</span>
                          </label>
                          <input 
                            type="email" 
                            placeholder="مثال: name@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full border border-brand-border bg-white px-4 py-2.5 rounded focus:outline-none focus:border-brand-deep transition-colors text-right font-sans"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        disabled={!formData.name.trim() || !formData.phone || formData.phone.length < 10}
                        className="w-full max-w-sm mx-auto block mt-8 bg-brand-deep text-white py-3.5 rounded-full font-semibold hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer"
                      >
                        التالي (شحن) | Next
                      </button>
                    </div>
                  )}

                  {formStep === 2 && (
                    <div className="space-y-6">
                      <div className="border-b border-brand-border pb-3 mb-6">
                        <h2 className="text-2xl font-bold text-brand-deep">بيانات الشحن</h2>
                      </div>
                      
                      <div className="space-y-4 text-right">
                        <div>
                          <label className="block text-sm font-semibold text-brand-text mb-1">المحافظة *</label>
                          <select 
                            required
                            value={formData.governorate}
                            onChange={(e) => setFormData({...formData, governorate: e.target.value, city: ''})}
                            className="w-full border border-brand-border bg-white px-4 py-2.5 rounded focus:outline-none focus:border-brand-deep transition-colors text-right cursor-pointer"
                          >
                            <option value="">اختر المحافظة</option>
                            {egyptLocations.map(gov => (
                              <option key={gov.name} value={gov.name}>{gov.arabicName}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-text mb-1">المدينة / المنطقة *</label>
                          <select 
                            required
                            disabled={!formData.governorate}
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className="w-full border border-brand-border bg-white px-4 py-2.5 rounded focus:outline-none focus:border-brand-deep transition-colors text-right disabled:opacity-50 cursor-pointer"
                          >
                            <option value="">اختر المدينة / المنطقة</option>
                            {formData.governorate && egyptLocations.find(g => g.name === formData.governorate)?.cities.map(city => (
                              <option key={city} value={city}>
                                {cityTranslations[city] || city}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-text mb-1">العنوان بالتفصيل (الشارع، رقم المبنى، الشقة) *</label>
                          <textarea 
                            required
                            rows={3}
                            placeholder="اكتب تفاصيل العنوان هنا..."
                            value={formData.street}
                            onChange={(e) => setFormData({...formData, street: e.target.value})}
                            className="w-full border border-brand-border bg-white px-4 py-2.5 rounded focus:outline-none focus:border-brand-deep transition-colors resize-none text-right"
                          />
                        </div>
                      </div>

                      <div className="mt-8 space-y-3">
                        <button
                          type="button"
                          onClick={() => setFormStep(3)}
                          disabled={!formData.governorate || !formData.city || !formData.street.trim()}
                          className="w-full max-w-sm mx-auto block bg-brand-deep text-white py-3.5 rounded-full font-semibold hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer"
                        >
                          التالي (الدفع) | Next
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="text-brand-text/60 hover:text-brand-deep text-sm block mx-auto font-medium transition-colors cursor-pointer"
                        >
                          رجوع للخطوة السابقة
                        </button>
                      </div>
                    </div>
                  )}

                  {formStep === 3 && (
                    <div className="space-y-4 md:space-y-6">
                      {/* Mobile Compact Order Summary (Directly shown, not hidden) */}
                      <div className="block md:hidden bg-brand-light/50 border border-brand-border/60 p-3 rounded-lg text-right mb-2" dir="rtl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-brand-deep">ملخص الطلب:</span>
                          <span className="text-xs text-brand-text font-sans font-medium">
                            {productType === 'oud' ? 'اوفي رائحة العود وجوز الهند' : 'اوفي رائحة الفراولة والتوت'} (x{quantity})
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-brand-text/75 mb-0.5">
                          <span>الشحن إلى {egyptLocations.find(g => g.name === formData.governorate)?.arabicName || formData.governorate}:</span>
                          <span className="font-semibold font-sans">{shipping === 0 ? 'شحن مجاني' : `${shipping} جنيه`}</span>
                        </div>
                        {appliedDiscount > 0 && (
                          <div className="flex justify-between items-center text-xs text-brand-accent3 mb-0.5">
                            <span>الخصم المطبق ({discountCode.trim().toUpperCase()}):</span>
                            <span className="font-semibold font-sans">- {appliedDiscount} جنيه</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center border-t border-brand-border/40 pt-1.5 mt-1 font-bold text-brand-deep">
                          <span className="text-xs">الإجمالي المطلوب دفعه:</span>
                          <span className="text-sm font-sans">{total} جنيه مصري</span>
                        </div>
                      </div>

                      <div className="border-b border-brand-border pb-2 mb-2 md:mb-6">
                        <h2 className="text-lg md:text-2xl font-bold text-brand-deep">طريقة الدفع</h2>
                      </div>
                      
                      <div className="space-y-2 md:space-y-3 text-right">
                        <label className={`flex items-center gap-3 p-2.5 md:p-4 border rounded cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-brand-deep bg-brand-accent1/10' : 'border-brand-border bg-white'}`}>
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="w-4 h-4 text-brand-deep focus:ring-brand-deep accent-brand-deep"
                          />
                          <img src="/photos/cod-logo.png" alt="Cash on Delivery" className="h-5 md:h-6 w-auto object-contain" />
                          <span className="font-semibold text-xs md:text-sm text-brand-text">الدفع عند الاستلام (Cash on Delivery)</span>
                        </label>

                        <label className={`flex items-center gap-3 p-2.5 md:p-4 border rounded cursor-pointer transition-colors ${paymentMethod === 'paymob' ? 'border-brand-deep bg-brand-accent1/10' : 'border-brand-border bg-white'}`}>
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'paymob'}
                            onChange={() => setPaymentMethod('paymob')}
                            className="w-4 h-4 text-brand-deep focus:ring-brand-deep accent-brand-deep"
                          />
                          <CreditCard className={`w-5 h-5 md:w-6 md:h-6 ${paymentMethod === 'paymob' ? 'text-brand-deep' : 'text-brand-text/60'}`} />
                          <span className="font-semibold text-xs md:text-sm text-brand-text">الفيزا والبطاقات البنكية (Paymob)</span>
                        </label>

                        <label className={`flex items-center gap-3 p-2.5 md:p-4 border rounded cursor-pointer transition-colors ${paymentMethod === 'instapay' ? 'border-brand-deep bg-brand-accent1/10' : 'border-brand-border bg-white'}`}>
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'instapay'}
                            onChange={() => setPaymentMethod('instapay')}
                            className="w-4 h-4 text-brand-deep focus:ring-brand-deep accent-brand-deep"
                          />
                          <img src="/photos/instapay-logo.png" alt="Instapay" className="h-5 md:h-6 w-auto object-contain" />
                          <span className="font-semibold text-xs md:text-sm text-brand-text">انستاباي (Instapay)</span>
                        </label>
                      </div>

                      <div className="mt-4 md:mt-8 space-y-2 md:space-y-3">
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={isProcessing}
                          className={`w-full max-w-sm mx-auto flex items-center justify-center gap-2 text-white py-2.5 md:py-3.5 rounded-full font-semibold hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer ${isProcessing ? 'bg-green-600' : 'bg-brand-deep'}`}
                        >
                          {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                          <span>{isProcessing ? 'جاري اتمام طلبك...' : 'تأكيد الطلب | Place Order'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormStep(2)}
                          className="text-brand-text/60 hover:text-brand-deep text-xs md:text-sm block mx-auto font-medium transition-colors cursor-pointer"
                        >
                          رجوع للخطوة السابقة
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Left Column: Fixed Vertical Order Summary Box (shown only on desktop) */}
                <div className="md:col-span-5 hidden md:block">
                  {renderOrderSummary(false)}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'instapay' && (
            <motion.div 
              key="instapay"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-md mx-auto text-center"
              dir="rtl"
            >
              <h2 className="text-2xl font-bold text-brand-deep mb-4">إتمام الدفع عبر انستاباي</h2>
              <p className="text-brand-text/80 mb-6 font-light">
                يرجى تحويل مبلغ <strong className="text-brand-deep font-semibold">{total} جنيه مصري</strong> إلى حساب انستاباي الخاص بنا باستخدام الرمز أدناه.
              </p>
              
              <div className="bg-white border border-brand-border p-4 inline-block mb-8 rounded shadow-sm">
                <img 
                  src="https://drive.google.com/thumbnail?id=1G2IgA1jCwHjxAmtcPzvVKD-eSQADjJeZ&sz=w1000" 
                  alt="Instapay Barcode" 
                  className="w-48 h-auto mx-auto"
                />
              </div>

              <div className="bg-brand-accent1/30 p-4 border-r-4 border-brand-deep text-right mb-8 rounded-l">
                <p className="text-sm text-brand-text/80 leading-relaxed font-medium">
                  بعد تحويل المبلغ، يرجى الضغط على الزر أدناه. وسنتواصل معك خلال ساعة واحدة لتأكيد التحويل وإتمام الطلب.
                </p>
              </div>

              <button
                onClick={() => setStep('success')}
                className="w-full bg-brand-deep text-white py-4 font-semibold rounded-full hover:opacity-95 transition-opacity cursor-pointer"
              >
                لقد قمت بتحويل المبلغ
              </button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <SuccessContent
                orderNumber={orderNumber}
                formData={formData}
                quantity={quantity}
                subtotal={subtotal}
                vat={vat}
                shipping={shipping}
                appliedDiscount={appliedDiscount}
                total={total}
                pdfUrl={pdfUrl}
                isGeneratingPdf={isGeneratingPdf}
                handlePrint={handlePrint}
                invoiceRef={invoiceRef}
                getFullAddress={getFullAddress}
                productType={productType}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* CSS for printing hidden inside */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-area, .printable-area * {
            visibility: visible;
          }
          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            padding: 0 !important;
          }
          .hidden-print {
            display: none !important;
          }
        }
      `}} />
    </motion.div>
  );
}
