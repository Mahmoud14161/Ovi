/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Hero from './components/Hero';
import Offers from './components/Offers';
import FallingBerries from './components/FallingBerries';
import SplashScreen from './components/SplashScreen';

const About = lazy(() => import('./components/About'));
const Usage = lazy(() => import('./components/Usage'));
const Ingredients = lazy(() => import('./components/Ingredients'));
const Precautions = lazy(() => import('./components/Precautions'));
const CTASection = lazy(() => import('./components/CTASection'));
const Checkout = lazy(() => import('./components/Checkout'));
const Footer = lazy(() => import('./components/Footer'));
const Policies = lazy(() => import('./components/Policies'));
const FAQ = lazy(() => import('./components/FAQ'));

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      return path !== '/checkout' && path !== '/checkout/' && path !== '/policies' && path !== '/policies/';
    }
    return true;
  });
  const [isCheckout, setIsCheckout] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path === '/checkout' || path === '/checkout/';
    }
    return false;
  });
  const [isPolicies, setIsPolicies] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      return path === '/policies' || path === '/policies/';
    }
    return false;
  });
  const [isFAQ, setIsFAQ] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      return path === '/faq' || path === '/faq/';
    }
    return false;
  });
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);
  const [checkoutProduct, setCheckoutProduct] = useState<'strawberry' | 'oud'>('strawberry');


  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/checkout' || path === '/checkout/') {
        setIsCheckout(true);
        setIsPolicies(false);
        setIsFAQ(false);
        setShowSplash(false);
      } else if (path === '/policies' || path === '/policies/') {
        setIsPolicies(true);
        setIsCheckout(false);
        setIsFAQ(false);
        setShowSplash(false);
      } else if (path === '/faq' || path === '/faq/') {
        setIsFAQ(true);
        setIsPolicies(false);
        setIsCheckout(false);
        setShowSplash(false);
      } else {
        setIsCheckout(false);
        setIsPolicies(false);
        setIsFAQ(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleCheckoutOpen = (qty: number = 1, product: 'strawberry' | 'oud' = 'strawberry') => {
    setCheckoutQuantity(qty);
    setCheckoutProduct(product);
    window.history.pushState({}, '', '/checkout');
    setIsCheckout(true);
    setIsPolicies(false);
  };

  const handleCheckoutClose = () => {
    window.history.pushState({}, '', '/');
    setIsCheckout(false);
    setIsPolicies(false);
    setIsFAQ(false);
  };

  if (isFAQ) {
    return (
      <Suspense fallback={<div className="h-screen bg-brand-light flex items-center justify-center text-brand-deep">Loading...</div>}>
        <FAQ />
      </Suspense>
    );
  }

  if (isPolicies) {
    return (
      <Suspense fallback={<div className="h-screen bg-brand-light flex items-center justify-center text-brand-deep">Loading...</div>}>
        <Policies />
      </Suspense>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <main className={`font-sans antialiased text-gray-900 bg-brand-light relative ${(showSplash || isCheckout) ? 'h-screen overflow-hidden' : ''}`}>
        <FallingBerries />
        <Hero />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Offers onCheckout={handleCheckoutOpen} />
        </motion.div>
        <Suspense fallback={<div className="py-20 flex justify-center text-brand-deep">Loading...</div>}>
          <About />
          <Usage />
          <Ingredients />
          <Precautions />
          <CTASection onCheckout={() => handleCheckoutOpen(1, 'strawberry')} />
          <Footer />
        </Suspense>
      </main>

      <AnimatePresence>
        {isCheckout && (
          <Suspense fallback={<div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-light/90">Loading checkout...</div>}>
            <Checkout 
              onBack={handleCheckoutClose} 
              initialQuantity={checkoutQuantity} 
              initialProduct={checkoutProduct}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}

