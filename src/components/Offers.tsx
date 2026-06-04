import { useState } from 'react';

const strawberryImg = "https://drive.google.com/thumbnail?id=1FURKfpppRsalzXtvzDsgJ2RCjyug8EFP&sz=w500";
const blueberryImg  = "https://drive.google.com/thumbnail?id=1le60dx37njHGiayDUbP1B06OZZ7S0212&sz=w500";

interface OffersProps {
  onCheckout: (quantity: number, product: 'strawberry' | 'oud') => void;
}

const PRODUCTS = [
  {
    id: 'strawberry' as const,
    name: 'اوفي رائحة الفراولة والتوت',
    reviewCount: '430',
    img: '/photos/farawla.webp',
    bgImages: (
      <>
        <img src={strawberryImg} alt="" className="absolute" style={{ width: 60, top: 0, right: 10, transform: 'rotate(-15deg)', opacity: 0.9, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
        <img src={blueberryImg}  alt="" className="absolute" style={{ width: 45, bottom: 10, left: 10, transform: 'rotate(10deg)', opacity: 0.88, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
        <img src={strawberryImg} alt="" className="absolute" style={{ width: 40, bottom: 40, left: 20, transform: 'rotate(20deg)', opacity: 0.7, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
      </>
    ),
    options: [
      { qty: 1, label: '١ زجاجة', price: 350, oldPrice: 510, freeShipping: false },
      { qty: 2, label: '٢ زجاجة', price: 599, oldPrice: 1020, freeShipping: true },
      { qty: 3, label: '٣ زجاجات', price: 860, oldPrice: 1530, freeShipping: true, bestValue: true },
    ]
  },
  {
    id: 'oud' as const,
    name: 'اوفي رائحة العود وجوز الهند',
    reviewCount: '128',
    img: '/photos/oud.webp',
    bgImages: (
      <>
        <img src="/photos/oud-coco.webp" alt="" className="absolute" style={{ width: 70, top: -10, right: 0, transform: 'rotate(-10deg)', opacity: 0.9, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
        <img src="/photos/coco.webp" alt="" className="absolute" style={{ width: 35, bottom: 5, left: 10, transform: 'rotate(15deg)', opacity: 0.88, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
        <img src="/photos/oud-coco.webp" alt="" className="absolute" style={{ width: 50, bottom: 30, left: 20, transform: 'rotate(20deg)', opacity: 0.7, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
      </>
    ),
    options: [
      { qty: 1, label: '١ زجاجة', price: 450, oldPrice: 740, freeShipping: false },
      { qty: 2, label: '٢ زجاجة', price: 850, oldPrice: 1480, freeShipping: true },
      { qty: 3, label: '٣ زجاجات', price: 1230, oldPrice: 2220, freeShipping: true, bestValue: true },
    ]
  }
];

function ProductCard({ product, onCheckout }: { product: typeof PRODUCTS[0], onCheckout: OffersProps['onCheckout'] }) {
  const [selectedQty, setSelectedQty] = useState(1);

  const handleWhatsApp = () => {
    const selectedOption = product.options.find(o => o.qty === selectedQty);
    const cost = selectedOption?.price || 0;
    const shippingNote = selectedOption?.freeShipping
      ? 'شحن مجاني'
      : 'تكلفة الشحن: القاهرة والجيزة والقليوبية 35 جنيه — باقي المحافظات 65 جنيه';
    const message = `أهلاً، أريد طلب:\nالمنتج: ${product.name}\nالكمية: ${selectedQty} زجاجة\nالسعر: ${cost} جنيه\nالشحن: ${shippingNote}\n\nبياناتي كالتالي:\nالاسم:\nرقم الهاتف:\nالعنوان بالتفصيل:`;
    const whatsappUrl = `https://wa.me/+201130428385?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row gap-8 mb-10 w-full max-w-4xl mx-auto items-center" dir="rtl">
      
      {/* Product Image */}
      <div className="relative w-full md:w-1/3 flex justify-center items-center h-56 md:h-72">
        {product.bgImages}
        <img src={product.img} alt={product.name} className="relative z-10 h-full object-contain mix-blend-darken" />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-2/3 flex flex-col">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-xl text-[#fbbf24]">
            {'★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            <span className="relative inline-block w-[0.5em] overflow-hidden text-gray-200">
              <span className="absolute left-0 top-0 text-[#fbbf24] w-1/2 overflow-hidden">★</span>
              ★
            </span>
          </div>
          <span className="text-gray-500 font-medium">({product.reviewCount} تقييم)</span>
        </div>

        <p className="text-gray-800 font-bold mb-3 text-lg">حدد الكمية:</p>
        
        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 mt-2">
          {product.options.map((opt) => {
            const isSelected = selectedQty === opt.qty;
            return (
              <div 
                key={opt.qty}
                onClick={() => setSelectedQty(opt.qty)}
                className={`relative flex-1 cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                  isSelected ? 'border-[#5b3146] bg-[#5b3146]/5' : 'border-gray-200 hover:border-gray-300'
                } ${opt.bestValue ? 'pt-7 shadow-md' : 'shadow-sm'}`}
                style={opt.bestValue ? { borderColor: isSelected ? '#5b3146' : '#5b3146' } : {}}
              >
                {opt.bestValue && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#5b3146] text-white text-xs font-bold py-1 px-4 rounded-full whitespace-nowrap shadow-md">
                    الأفضل قيمةً
                  </span>
                )}
                
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-bold text-lg ${isSelected ? 'text-[#5b3146]' : 'text-gray-700'}`}>{opt.label}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#5b3146]' : 'border-gray-300'}`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#5b3146]"></div>}
                  </div>
                </div>
                
                <div className="flex flex-col items-start">
                   <div className="flex items-end gap-2 mb-1">
                     <span className={`font-bold text-2xl ${isSelected ? 'text-[#5b3146]' : 'text-gray-900'}`}>{opt.price} <span className="text-sm">EGP</span></span>
                     {opt.oldPrice && <span className="text-gray-400 line-through text-sm mb-1">{opt.oldPrice}</span>}
                   </div>
                   {opt.freeShipping ? (
                     <div className="text-[#25D366] font-bold text-sm bg-[#25D366]/10 px-2 py-1 rounded w-fit mt-1">
                       + الشحن المجاني!
                     </div>
                   ) : (
                     <div className="text-gray-500 text-xs mt-1 leading-snug">
                       شحن القاهرة/الجيزة/القليوبية: <span className="font-bold text-gray-700">35 جـ</span><br/>
                       باقي المحافظات: <span className="font-bold text-gray-700">65 جـ</span>
                     </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <button 
            onClick={() => onCheckout(selectedQty, product.id)}
            className="flex-1 bg-[#5b3146] hover:bg-[#452434] text-white font-bold py-3.5 px-4 rounded-xl flex justify-center items-center gap-2 transition-colors shadow-md text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            الطلب السريع
          </button>
          
          <button 
            onClick={handleWhatsApp}
            className="flex-1 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3.5 px-4 rounded-xl flex justify-center items-center gap-2 transition-colors shadow-md text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            اطلب عبر واتساب
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Offers({ onCheckout }: OffersProps) {
  return (
    <section className="py-20 bg-[#faf8f9] font-['Cairo']" id="offers-section">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
      `}} />
      <div className="max-w-6xl mx-auto text-center px-4 mb-12">
        <h2 className="text-4xl text-[#5b3146] mb-4 font-bold" dir="rtl">عروضنا الخاصة</h2>
        <p className="text-gray-600 mb-8 font-semibold text-lg" dir="rtl">اختر العرض الأنسب لك واستمتع بشحن مجاني للقاهرة، الجيزة، والقليوبية.</p>
      </div>

      <div className="px-4">
        {PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} onCheckout={onCheckout} />
        ))}
      </div>
    </section>
  );
}
