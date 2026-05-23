/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import About from './components/About';
import Usage from './components/Usage';
import Ingredients from './components/Ingredients';
import Precautions from './components/Precautions';
import FallingBerries from './components/FallingBerries';
import SplashScreen from './components/SplashScreen';
import CTASection from './components/CTASection';
import Checkout from './components/Checkout';
import Footer from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <main className={`font-sans antialiased text-gray-900 bg-brand-light relative ${(showSplash || isCheckout) ? 'h-screen overflow-hidden' : ''}`}>
        <FallingBerries />
        <Hero />
        <About />
        <Usage />
        <Ingredients />
        <Precautions />
        <CTASection onCheckout={() => setIsCheckout(true)} />
        <Footer />
      </main>
      <AnimatePresence>
        {isCheckout && <Checkout onBack={() => setIsCheckout(false)} />}
      </AnimatePresence>
    </>
  );
}

