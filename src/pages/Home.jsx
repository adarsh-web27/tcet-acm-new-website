import React from 'react';
import Hero from '../components/Hero';
import CurtainSecondPage from '../components/CurtainSecondPage';
import PureCss3DCarousel from '../components/PureCss3DCarousel';
import BentoGrid from '../components/BentoGrid';
import EventsHorizontalScroll from '../components/EventsHorizontalScroll';

export default function Home() {
  return (
    <>
      {/* 1st Page: Hero (Eagerly rendered on first viewport paint) */}
      <Hero />
      
      {/* 2nd Page: Chapter Kinetic Typography */}
      <CurtainSecondPage />
      
      {/* 3rd Page: Glimpse of Memories 3D Carousel */}
      <PureCss3DCarousel />
      
      {/* 4th Page: Bento Grid ("About The Chapter") */}
      <BentoGrid />
      
      {/* 5th Page: Events Timeline ("Building Experiences") */}
      <EventsHorizontalScroll />
    </>
  );
}
