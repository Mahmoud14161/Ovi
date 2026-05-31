import { motion } from 'motion/react';

const strawberryImg = "https://drive.google.com/thumbnail?id=1FURKfpppRsalzXtvzDsgJ2RCjyug8EFP&sz=w500";
const blueberryImg  = "https://drive.google.com/thumbnail?id=1le60dx37njHGiayDUbP1B06OZZ7S0212&sz=w500";

interface OffersProps {
  onCheckout: (quantity: number) => void;
}

export default function Offers({ onCheckout }: OffersProps) {
  return (
    <section className="py-12 bg-brand-light" id="offers-section">
      <style dangerouslySetInnerHTML={{__html: `
        .offers-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 40px 20px;
          font-family: sans-serif;
        }
        .offer-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 15px;
          padding: 25px 20px;
          width: 300px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 420px;
          overflow: hidden;
        }
        .offer-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .offer-image-container {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          position: relative;
        }
        .berry-bg {
          position: absolute;
          object-fit: contain;
          mix-blend-mode: darken;
          pointer-events: none;
          user-select: none;
        }
        .best-value {
          border: 2px solid #5b3146;
          padding-top: 35px;
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(91,49,70,0.15);
          overflow: visible !important;
        }
        .best-value:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 12px 30px rgba(91,49,70,0.2);
        }
        .badge {
          background: linear-gradient(135deg, #5b3146, #7a425e);
          color: #fff;
          padding: 6px 16px;
          border-radius: 20px;
          font-family: inherit;
          font-size: 13px;
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-weight: 600;
          letter-spacing: 0.5px;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(91,49,70,0.3);
        }
        .price-new {
          font-size: 28px;
          color: #5b3146;
          font-weight: bold;
          margin: 10px 0 5px;
        }
        .price-old {
          font-size: 18px;
          color: #999;
          text-decoration: line-through;
          margin-bottom: 20px;
        }
        .btn-order {
          background: #5b3146;
          color: #fff;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          transition: background 0.3s;
          font-weight: bold;
        }
        .btn-order:hover {
          background: #452434;
        }
      `}} />

      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="font-serif italic text-4xl text-brand-deep mb-2">Special Offers</h2>
        <p className="text-brand-text/70 mb-8 font-light">Choose the best offer for you and get free shipping to Cairo, Giza, and Qalyubia</p>
      </div>

      <div className="offers-container" dir="ltr">

        {/* Offer 1 — 1 Bottle */}
        <div className="offer-card">
          <div className="offer-image-container">
            {/* Background berries */}
            <img src={strawberryImg} alt="" className="berry-bg" style={{ width: 80, top: 0, left: 8, transform: 'rotate(-15deg)', opacity: 0.92, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={blueberryImg}  alt="" className="berry-bg" style={{ width: 56, bottom: 0, right: 10, transform: 'rotate(10deg)', opacity: 0.88, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={strawberryImg} alt="" className="berry-bg" style={{ width: 48, bottom: 10, left: 10, transform: 'rotate(20deg)', opacity: 0.7, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            {/* Bottle on top */}
            <img src="/photos/farawla.png" alt="1 Bottle" className="mix-blend-darken relative" style={{ zIndex: 2, height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <h3>1 Bottle</h3>
            <p className="price-new">EGP 350</p>
            <p className="price-old">EGP 510</p>
            <div style={{ display: 'flex', alignItems: 'center', color: '#28a745', marginTop: '4px', justifyContent: 'center' }}>
              <img src="/photos/free.png" alt="Free shipping" style={{ width: 16, height: 16, marginRight: 4 }} />
              <span>Free Shipping</span>
            </div>
          </div>
          <button onClick={() => onCheckout(1)} className="btn-order">Order Now</button>
        </div>

        {/* Offer 2 — 2 Bottles */}
        <div className="offer-card">
          <div className="offer-image-container">
            {/* Background berries */}
            <img src={strawberryImg} alt="" className="berry-bg" style={{ width: 72, top: 0, left: 0, transform: 'rotate(-20deg)', opacity: 0.90, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={blueberryImg}  alt="" className="berry-bg" style={{ width: 60, top: 4, right: 0, transform: 'rotate(15deg)', opacity: 0.85, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={blueberryImg}  alt="" className="berry-bg" style={{ width: 44, bottom: 0, left: 16, transform: 'rotate(-5deg)', opacity: 0.75, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={strawberryImg} alt="" className="berry-bg" style={{ width: 50, bottom: 4, right: 8, transform: 'rotate(25deg)', opacity: 0.70, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            {/* Two bottles on top */}
            <div className="relative w-full h-full flex justify-center items-center" style={{ zIndex: 2 }}>
              <img src="/photos/farawla.png" alt="Bottle 1" className="mix-blend-darken absolute h-full -translate-x-6 rotate-[-6deg] z-10" />
              <img src="/photos/farawla.png" alt="Bottle 2" className="mix-blend-darken absolute h-full translate-x-6 rotate-[6deg]" />
            </div>
          </div>
          <div>
            <h3>2 Bottles</h3>
            <p className="price-new">EGP 580</p>
            <p className="price-old">EGP 1020</p>
            <div style={{ display: 'flex', alignItems: 'center', color: '#28a745', marginTop: '4px', justifyContent: 'center' }}>
              <img src="/photos/free.png" alt="Free shipping" style={{ width: 16, height: 16, marginRight: 4 }} />
              <span>Free Shipping</span>
            </div>
          </div>
          <button onClick={() => onCheckout(2)} className="btn-order">Order Now</button>
        </div>

        {/* Offer 3 — 3 Bottles (Best Value) */}
        <div className="offer-card best-value">
          <div className="badge">Best Value</div>
          <div className="offer-image-container">
            {/* Background berries */}
            <img src={strawberryImg} alt="" className="berry-bg" style={{ width: 80, top: 0, left: 0, transform: 'rotate(-18deg)', opacity: 0.92, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={blueberryImg}  alt="" className="berry-bg" style={{ width: 62, top: 0, right: 2, transform: 'rotate(12deg)', opacity: 0.88, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={strawberryImg} alt="" className="berry-bg" style={{ width: 50, bottom: 2, left: 6, transform: 'rotate(22deg)', opacity: 0.75, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={blueberryImg}  alt="" className="berry-bg" style={{ width: 46, bottom: 0, right: 6, transform: 'rotate(-8deg)', opacity: 0.80, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            <img src={strawberryImg} alt="" className="berry-bg" style={{ width: 38, bottom: 20, left: '45%', transform: 'rotate(30deg)', opacity: 0.60, zIndex: 1 }} onError={e => e.currentTarget.style.display='none'} />
            {/* Three bottles on top */}
            <div className="relative w-full h-full flex justify-center items-center" style={{ zIndex: 2 }}>
              <img src="/photos/farawla.png" alt="Bottle 1" className="mix-blend-darken absolute h-[95%] -translate-x-10 rotate-[-10deg]" />
              <img src="/photos/farawla.png" alt="Bottle 2" className="mix-blend-darken absolute h-[102%] z-20" />
              <img src="/photos/farawla.png" alt="Bottle 3" className="mix-blend-darken absolute h-[95%] translate-x-10 rotate-[10deg] z-10" />
            </div>
          </div>
          <div>
            <h3>3 Bottles</h3>
            <p className="price-new">EGP 810</p>
            <p className="price-old">EGP 1530</p>
            <div style={{ display: 'flex', alignItems: 'center', color: '#28a745', marginTop: '4px', justifyContent: 'center' }}>
              <img src="/photos/free.png" alt="Free shipping" style={{ width: 16, height: 16, marginRight: 4 }} />
              <span>Free Shipping</span>
            </div>
          </div>
          <button onClick={() => onCheckout(3)} className="btn-order">Order Now</button>
        </div>

      </div>
    </section>
  );
}
