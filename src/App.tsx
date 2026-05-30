/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Hero from './components/Hero';
import Offers from './components/Offers';
import About from './components/About';
import Usage from './components/Usage';
import Ingredients from './components/Ingredients';
import Precautions from './components/Precautions';
import FallingBerries from './components/FallingBerries';
import SplashScreen from './components/SplashScreen';
import CTASection from './components/CTASection';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import Policies from './components/Policies';
import BackgroundMusic from './components/BackgroundMusic';

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
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);


  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/checkout' || path === '/checkout/') {
        setIsCheckout(true);
        setIsPolicies(false);
        setShowSplash(false);
      } else if (path === '/policies' || path === '/policies/') {
        setIsPolicies(true);
        setIsCheckout(false);
        setShowSplash(false);
      } else {
        setIsCheckout(false);
        setIsPolicies(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleCheckoutOpen = (qty: number = 1) => {
    setCheckoutQuantity(qty);
    window.history.pushState({}, '', '/checkout');
    setIsCheckout(true);
    setIsPolicies(false);
  };

  const handleCheckoutClose = () => {
    window.history.pushState({}, '', '/');
    setIsCheckout(false);
    setIsPolicies(false);
  };

  if (isPolicies) {
    return <Policies />;
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <main className={`font-sans antialiased text-gray-900 bg-brand-light relative ${(showSplash || isCheckout) ? 'h-screen overflow-hidden' : ''}`}>
        <FallingBerries />
        <BackgroundMusic />
        <Hero />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Offers onCheckout={handleCheckoutOpen} />
        </motion.div>
        <About />
        <Usage />
        <Ingredients />
        <Precautions />
        <CTASection onCheckout={() => handleCheckoutOpen(1)} />
        <Footer />
      </main>

      <AnimatePresence>
        {isCheckout && (
          <Checkout 
            onBack={handleCheckoutClose} 
            initialQuantity={checkoutQuantity} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

