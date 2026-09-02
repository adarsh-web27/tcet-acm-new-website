import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

// Below-the-fold sections are lazy-loaded to ensure immediate Hero LCP and zero network contention
const CurtainSecondPage = lazy(() => import('../components/CurtainSecondPage'));
const PureCss3DCarousel = lazy(() => import('../components/PureCss3DCarousel'));
const BentoGrid = lazy(() => import('../components/BentoGrid'));
const EventsHorizontalScroll = lazy(() => import('../components/EventsHorizontalScroll'));

export default function Home() {
  return (
    <>
      {/* 1st Page: Hero (Eagerly rendered on first viewport paint) */}
      <Hero />
      
      {/* 2nd Page: Chapter Kinetic Typography */}
      <Suspense fallback={<div className="w-full min-h-[40vh]" />}>
        <CurtainSecondPage />
      </Suspense>
      
      {/* 3rd Page: Glimpse of Memories 3D Carousel */}
      <Suspense fallback={<div className="w-full min-h-[50vh]" />}>
        <PureCss3DCarousel />
      </Suspense>
      
      {/* 4th Page: Bento Grid */}
      <Suspense fallback={<div className="w-full min-h-[50vh]" />}>
        <BentoGrid />
      </Suspense>
      
      {/* 5th Page: Events Timeline */}
      <Suspense fallback={<div className="w-full min-h-[60vh]" />}>
        <EventsHorizontalScroll />
      </Suspense>
    </>
  );
}
