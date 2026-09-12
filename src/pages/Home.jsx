import React, { Suspense, lazy, useEffect } from 'react';
import Hero from '../components/Hero';
import CurtainSecondPage from '../components/CurtainSecondPage';

const PureCss3DCarousel = lazy(() => import('../components/PureCss3DCarousel'));
const BentoGrid = lazy(() => import('../components/BentoGrid'));
const EventsHorizontalScroll = lazy(() => import('../components/EventsHorizontalScroll'));

export default function Home() {
  // Idle-preload below-the-fold modules on desktop after critical route hydration (0ms pop-in on scroll)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const preload = () => {
      import('../components/PureCss3DCarousel');
      import('../components/BentoGrid');
      import('../components/EventsHorizontalScroll');
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preload, { timeout: 4000 });
    } else {
      setTimeout(preload, 2500);
    }
  }, []);
  return (
    <>
      {/* 1st Page: Hero (Eagerly rendered on first viewport paint) */}
      <Hero />
      
      {/* 2nd Page: Chapter Kinetic Typography */}
      <CurtainSecondPage />
      
      {/* 3rd Page: Glimpse of Memories 3D Carousel */}
      <Suspense fallback={<div className="w-full min-h-[440px] md:min-h-[720px] bg-transparent" />}>
        <PureCss3DCarousel />
      </Suspense>
      
      {/* 4th Page: Bento Grid ("About The Chapter") */}
      <Suspense fallback={<div className="w-full min-h-[600px] bg-transparent" />}>
        <BentoGrid />
      </Suspense>
      
      {/* 5th Page: Events Timeline ("Building Experiences") */}
      <Suspense fallback={<div className="w-full min-h-[500px] bg-transparent" />}>
        <EventsHorizontalScroll />
      </Suspense>
    </>
  );
}
