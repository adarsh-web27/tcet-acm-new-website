import React, { useState, useEffect, createContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis, { scrollToTop, getLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import FooterBento from './components/FooterBento';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';

import ErrorBoundary from './components/ErrorBoundary';

// Code-split secondary pages to dramatically reduce initial JavaScript payload & execution time
const WhoWeAre = lazy(() => import('./pages/WhoWeAre'));
const Events = lazy(() => import('./pages/Events'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Team = lazy(() => import('./pages/Team'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const LoadingContext = createContext({ isLoaded: true });

function ScrollFix() {
  const location = useLocation();

  useEffect(() => {
    // Handle anchor hash scrolling if present (e.g. /who-we-are#heritage)
    if (location.hash) {
      const targetEl = document.querySelector(location.hash);
      if (targetEl) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -80 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    }
    
    scrollToTop(true);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isGalleryPage = location.pathname === '/gallery';

  // Smooth Lenis momentum scrolling enabled within Router context
  useLenis();

  return (
    <div className="relative min-h-screen font-sans antialiased overflow-x-hidden selection:bg-[#2563EB] selection:text-white bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between">
      
      {/* Dynamic Scroll & Hash Position Handler */}
      <ScrollFix />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Dynamic Route Viewport */}
      <main className="relative z-10 flex-grow min-h-[85vh]">
        <ErrorBoundary>
          <Suspense fallback={<div className="w-full min-h-[85vh] bg-[#F8FAFC]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/who-we-are" element={<WhoWeAre />} />
              <Route path="/events" element={<Events />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/team" element={<Team />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Global Cinematic Bento Footer (Hidden on Gallery page to prevent layout overlapping) */}
      {!isGalleryPage && <FooterBento />}

    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoaded: !loading }}>
      <AnimatePresence mode="wait">
        {loading && <PageLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <Router>
        <AppContent />
      </Router>
    </LoadingContext.Provider>
  );
}