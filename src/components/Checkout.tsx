// CI trigger commit
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, Download, Loader2, Minus, Plus } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { egyptLocations } from '../data/egyptLocations';

type Step = 'form' | 'instapay' | 'success';

function SuccessContent({
  orderNumber, formData, quantity, subtotal, vat, shipping, appliedDiscount,
  total, pdfUrl, isGeneratingPdf, handlePrint, invoiceRef, getFullAddress
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
}) {
  // Auto-redirect to home after 4 seconds, replace history so back button also goes home
  useEffect(() => {
    // Push the current state and then replace so back goes to '/' not the order page
    window.history.pushState(null, '', window.location.href);
    const onPopState = () => {
      window.location.replace('/');
    };
    window.addEventListener('popstate', onPopState);

    const timer = setTimeout(() => {
      window.location.replace('/');
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <>
      <div className="text-center mb-8 hidden-print">
        <div className="w-16 h-16 bg-brand-accent3/10 text-brand-accent3 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-serif text-brand-deep mb-3">Order Received!</h2>
        <p className="text-brand-text/80 font-light max-w-md mx-auto">
          Thank you for your order. We have received your request and will contact you shortly to confirm the details.
        </p>
        <p className="text-sm text-brand-text/50 mt-3">
          Redirecting to home in a few seconds...
        </p>
      </div>

      {/* Printable Invoice Area */}
      <div ref={invoiceRef} className="bg-white border border-brand-border p-8 printable-area">
        <div className="flex justify-between items-start border-b border-brand-border pb-6 mb-6">
          <div>
            <h3 className="font-serif italic text-3xl text-brand-deep">The OVi</h3>
            <p className="text-sm text-brand-text/60 mt-1">Proforma Invoice / Order Summary</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-brand-deep">{orderNumber}</p>
            <p className="text-sm text-brand-text/60">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-medium text-brand-text/50 uppercase tracking-widest mb-3">Bill To</h4>
          <p className="font-medium text-brand-deep">{formData.name}</p>
          <p className="text-brand-text/80">+20 {formData.phone}</p>
          {formData.email && <p className="text-brand-text/80">{formData.email}</p>}
          <p className="text-brand-text/80 mt-1">{getFullAddress()}</p>
        </div>

        <table className="w-full mb-8 text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-brand-border">
              <th className="py-3 text-sm font-medium text-brand-text/50 uppercase tracking-wider">Item</th>
              <th className="py-3 text-sm font-medium text-brand-text/50 uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-border">
              <td className="py-4 text-brand-deep">The OVi (250 ml) - Strawberry & Blueberry (x{quantity})</td>
              <td className="py-4 text-brand-deep text-right">EGP {subtotal}</td>
            </tr>
            {appliedDiscount > 0 && (
              <tr className="border-b border-brand-border">
                <td className="py-4 text-brand-accent3">Discount applied</td>
                <td className="py-4 text-brand-accent3 text-right">- EGP {appliedDiscount}</td>
              </tr>
            )}
            <tr className="border-b border-brand-border">
              <td className="py-4 text-brand-text/70">VAT</td>
              <td className="py-4 text-brand-text/70 text-right">EGP {vat}</td>
            </tr>
            <tr className="border-b border-brand-border">
              <td className="py-4 text-brand-text/70">Shipping fee</td>
              <td className="py-4 text-brand-text/70 text-right">{shipping === 0 ? 'Free' : `EGP ${shipping}`}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="py-4 font-medium text-brand-deep text-lg">Total Amount</td>
              <td className="py-4 font-medium text-brand-accent3 text-xl text-right">EGP {total}</td>
            </tr>
          </tfoot>
        </table>

        <div className="text-center text-sm text-brand-text/60 italic border-t border-brand-border pt-6">
          This is a preliminary order summary and does not serve as a final receipt of payment.
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 hidden-print">
        {pdfUrl ? (
          <a 
            href={pdfUrl}
            download={`OVi_Order_${orderNumber}.pdf`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-brand-deep text-white px-6 py-3 hover:bg-brand-text transition-colors font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF (Click here if it didn't start)</span>
          </a>
        ) : (
          <button 
            onClick={handlePrint}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border text-brand-deep px-6 py-3 hover:bg-brand-light transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-wait"
          >
            {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download / Print PDF'}</span>
          </button>
        )}
      </div>
    </>
  );
}

export default function Checkout({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    governorate: '',
    city: '',
    street: '',
    email: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'cod'>('instapay');
  const [orderNumber, setOrderNumber] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isFreeShippingCode, setIsFreeShippingCode] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const price = 350;
  const subtotal = price * quantity;
  const isFreeGov = ['Cairo', 'Giza', 'Qalyubia'].includes(formData.governorate);
  const shipping = (isFreeGov || isFreeShippingCode) ? 0 : 35;
  const vat = 0;
  const total = Math.max(0, subtotal + shipping + vat - appliedDiscount);

  const hasTrackedPurchase = useRef(false);

  // Track when checkout page is opened (InitiateCheckout / begin_checkout)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Google Analytics Direct Event
      if ((window as any).gtag) {
        (window as any).gtag('event', 'begin_checkout', {
          currency: 'EGP',
          value: total,
          items: [{
            item_id: 'OVI-BS-001',
            item_name: 'The OVi Body Splash - Strawberry & Blueberry',
            price: price,
            quantity: quantity
          }]
        });
      }

      // 2. Meta Pixel Event
      if ((window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_ids: ['OVI-BS-001'],
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
        // 1. Google Analytics Direct Event
        if ((window as any).gtag) {
          (window as any).gtag('event', 'purchase', {
            transaction_id: orderNumber,
            value: total,
            currency: 'EGP',
            shipping: shipping,
            tax: 0,
            items: [{
              item_id: 'OVI-BS-001',
              item_name: 'The OVi Body Splash - Strawberry & Blueberry',
              price: price,
              quantity: quantity
            }]
          });
        }

        // 2. Google Tag Manager dataLayer
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
                item_id: 'OVI-BS-001',
                item_name: 'The OVi Body Splash - Strawberry & Blueberry',
                price: price,
                quantity: quantity
              }]
            }
          });
        }

        // 3. Meta Pixel Event
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Purchase', {
            content_ids: ['OVI-BS-001'],
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
    if (!discountCode.trim()) return;
    const code = discountCode.trim().toUpperCase();
    if (code === 'OVI2026FREE') {
      setIsFreeShippingCode(true);
      setAppliedDiscount(0);
    } else if (code === 'OVI10') {
      setIsFreeShippingCode(false);
      setAppliedDiscount(subtotal * 0.1);
    } else {
      setIsFreeShippingCode(false);
      setAppliedDiscount(0); // Invalid code
      alert("Invalid discount code");
    }
  };

  const getFullAddress = () => {
    return [formData.street, formData.city, formData.governorate].filter(Boolean).join(', ');
  };

  const sendToSheet = async (generatedOrderNumber: string) => {
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
    if (!sheetUrl) return;

    const orderData = {
      orderNumber: generatedOrderNumber,
      timestamp: new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' }),
      product: 'The OVi (250 ml) - Strawberry & Blueberry',
      quantity: quantity,
      name: formData.name,
      phone: `+20${formData.phone}`,
      governorate: formData.governorate,
      city: formData.city,
      street: formData.street,
      fullAddress: getFullAddress(),
      email: formData.email || '—',
      paymentMethod: paymentMethod === 'instapay' ? 'Instapay' : 'Cash on Delivery',
      discountCode: discountCode.trim().toUpperCase() || 'لا يوجد',
      discountAmount: appliedDiscount,
      total: total,
      status: paymentMethod === 'cod' ? 'انتظار التأكيد (COD)' : 'انتظار التحويل (Instapay)',
    };

    try {
      await fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    } catch (err) {
      console.error('Failed to save order to sheet:', err);
    }
  };

  const handleNext = async () => {
    // Generate order number
    let currentOrderNumber = orderNumber;
    if (!currentOrderNumber) {
      currentOrderNumber = `ORD-${Math.floor(Math.random() * 90000) + 10000}`;
      setOrderNumber(currentOrderNumber);
    }

    // Send order data to Google Sheets
    await sendToSheet(currentOrderNumber);

    if (paymentMethod === 'instapay') {
      setStep('instapay');
    } else {
      setStep('success');
    }
  };

  const handlePrint = () => {
    try {
      setIsGeneratingPdf(true);
      const doc = new jsPDF();
      
      // We will create a clean textual representation for the PDF so it's simple and fast.
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
      doc.text(`Address: ${getFullAddress()}`, 20, formData.email ? 80 : 74);
      
      let tableStartY = formData.email ? 90 : 84;
      doc.line(20, tableStartY, 190, tableStartY);
      
      doc.setFont("helvetica", "bold");
      doc.text("Item", 20, tableStartY + 8);
      doc.text("Amount", 170, tableStartY + 8);
      doc.line(20, tableStartY + 12, 190, tableStartY + 12);
      
      doc.setFont("helvetica", "normal");
      doc.text(`The OVi (250 ml) - Strawberry & Blueberry (x${quantity})`, 20, tableStartY + 22);
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

      // Save it out immediately
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 bg-brand-light overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button 
          onClick={step === 'form' ? onBack : () => setStep('form')}
          className="flex items-center gap-2 text-brand-text/70 hover:text-brand-deep transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="font-serif italic text-4xl text-brand-deep mb-8">Secure Checkout</h1>

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid md:grid-cols-2 gap-12"
            >
              {/* Form Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium text-brand-deep border-b border-brand-border pb-2 mb-4">Customer Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-brand-text/80 mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-brand-border bg-white px-4 py-2 focus:outline-none focus:border-brand-accent3 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-brand-text/80 mb-1">Phone Number (+20) *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-brand-border bg-brand-surface text-brand-text/70">
                          +20
                        </span>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                          className={`w-full border bg-white px-4 py-2 focus:outline-none transition-colors ${formData.phone && formData.phone.length < 10 ? 'border-red-400 focus:border-red-500' : 'border-brand-border focus:border-brand-accent3'}`}
                        />
                      </div>
                      {formData.phone && formData.phone.length < 10 && (
                        <p className="text-xs text-red-500 mt-1">Phone number must be at least 10 digits.</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-brand-text/80 mb-1">Governorate *</label>
                      <select 
                        required
                        value={formData.governorate}
                        onChange={(e) => setFormData({...formData, governorate: e.target.value, city: ''})}
                        className="w-full border border-brand-border bg-white px-4 py-2 focus:outline-none focus:border-brand-accent3 transition-colors"
                      >
                        <option value="">Select Governorate</option>
                        {egyptLocations.map(gov => (
                          <option key={gov.name} value={gov.name}>{gov.name} ({gov.arabicName})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-brand-text/80 mb-1">City *</label>
                      <select 
                        required
                        disabled={!formData.governorate}
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full border border-brand-border bg-white px-4 py-2 focus:outline-none focus:border-brand-accent3 transition-colors disabled:opacity-50"
                      >
                        <option value="">Select City</option>
                        {formData.governorate && egyptLocations.find(g => g.name === formData.governorate)?.cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-brand-text/80 mb-1">Detailed Address (Street, Neighborhood) *</label>
                      <textarea 
                        required
                        rows={2}
                        value={formData.street}
                        onChange={(e) => setFormData({...formData, street: e.target.value})}
                        className="w-full border border-brand-border bg-white px-4 py-2 focus:outline-none focus:border-brand-accent3 transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-brand-text/80 mb-1">Email <span className="text-brand-text/50">(Optional)</span></label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-brand-border bg-white px-4 py-2 focus:outline-none focus:border-brand-accent3 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-brand-deep border-b border-brand-border pb-2 mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${paymentMethod === 'instapay' ? 'border-brand-accent3 bg-brand-accent1/20' : 'border-brand-border bg-white'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'instapay'}
                        onChange={() => setPaymentMethod('instapay')}
                        className="w-4 h-4 text-brand-accent3 focus:ring-brand-accent3"
                      />
                      <img src="/photos/instapay-logo.png" alt="Instapay" className="h-6 w-auto object-contain" />
                      <span className="font-medium text-brand-text">Instapay</span>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-brand-accent3 bg-brand-accent1/20' : 'border-brand-border bg-white'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 text-brand-accent3 focus:ring-brand-accent3"
                      />
                      <img src="/photos/cod-logo.png" alt="Cash on Delivery" className="h-6 w-auto object-contain" />
                      <span className="font-medium text-brand-text">Cash on Delivery</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary Section */}
              <div>
                <div className="bg-white border border-brand-border p-6 sticky top-6">
                  <h2 className="text-xl font-medium text-brand-deep border-b border-brand-border pb-2 mb-4">Order Summary</h2>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-brand-light flex items-center justify-center p-2 border border-brand-border shrink-0">
                       <img src="/photos/farawla.png" alt="The OVi" className="h-full w-full object-contain mix-blend-darken" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-brand-deep">The OVi (250 ml)</h3>
                      <p className="text-sm text-brand-text/70 mb-2">Strawberry & Blueberry</p>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center border border-brand-border rounded-full hover:bg-brand-light transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-brand-border rounded-full hover:bg-brand-light transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="font-medium text-brand-deep">EGP {subtotal}</div>
                  </div>

                  <div className="mb-4 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Discount code" 
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 border border-brand-border bg-white px-3 py-2 text-sm focus:outline-none focus:border-brand-accent3 transition-colors"
                    />
                    <button 
                      onClick={handleApplyDiscount}
                      className="bg-brand-surface border border-brand-border text-brand-deep px-4 py-2 text-sm font-medium hover:bg-brand-light transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-brand-border text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-text/70">Subtotal</span>
                      <span className="text-brand-deep font-medium">EGP {subtotal}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-brand-accent3">
                        <span>Discount</span>
                        <span className="font-medium">- EGP {appliedDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-brand-text/70">VAT</span>
                      <span className="text-brand-deep font-medium">EGP {vat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text/70">Shipping</span>
                      <span className="text-brand-deep font-medium">
                        {shipping === 0 ? <span className="text-brand-accent3">Free</span> : `EGP ${shipping}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-brand-border">
                    <span className="font-medium text-brand-deep text-lg">Total</span>
                    <span className="font-medium text-brand-accent3 text-xl">EGP {total}</span>
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!formData.name || !formData.phone || formData.phone.length < 10 || !formData.street || !formData.city || !formData.governorate}
                    className="w-full mt-8 bg-brand-deep text-white py-4 font-medium tracking-wide hover:bg-brand-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Place Order
                  </button>
                  {(!formData.name || !formData.phone || !formData.street || !formData.city || !formData.governorate) ? (
                     <p className="text-xs text-center text-brand-text/50 mt-2">Please fill in all required fields</p>
                  ) : formData.phone.length < 10 ? (
                     <p className="text-xs text-center text-red-500 mt-2">Please enter a valid phone number</p>
                  ) : null}
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
            >
              <h2 className="text-2xl font-serif text-brand-deep mb-4">Complete Payment</h2>
              <p className="text-brand-text/80 mb-6 font-light">
                Please transfer the amount of <strong className="text-brand-deep font-medium">EGP {total}</strong> to our Instapay account using the barcode below.
              </p>
              
              <div className="bg-white border border-brand-border p-4 inline-block mb-8">
                <img 
                  src="https://drive.google.com/thumbnail?id=1G2IgA1jCwHjxAmtcPzvVKD-eSQADjJeZ&sz=w1000" 
                  alt="Instapay Barcode" 
                  className="w-48 h-auto"
                />
              </div>

              <div className="bg-brand-accent1/30 p-4 border-l-4 border-brand-accent3 text-left mb-8">
                <p className="text-sm text-brand-text/80 leading-relaxed">
                  After transferring the amount, please click the button below. We will contact you within 1 hour to confirm your transfer and finalize the order.
                </p>
              </div>

              <button
                onClick={() => setStep('success')}
                className="w-full bg-brand-deep text-white py-4 font-medium tracking-wide hover:bg-brand-text transition-colors"
              >
                I have transferred the amount
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
