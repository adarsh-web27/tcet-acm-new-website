import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_META = {
  '/': {
    title: 'TCET ACM SIGITE — Student Chapter & Spatial Portal',
    description: "Thakur College of Engineering & Technology's premier ACM SIGITE Student Chapter. Empowering IT engineers through flagship hackathons, technical research, workshops, and spatial computing experiences."
  },
  '/who-we-are': {
    title: 'About Us — TCET ACM SIGITE Chapter',
    description: 'Discover TCET ACM SIGITE history, charter since July 2011, mission, vision, and faculty mentorship in computing education.'
  },
  '/events': {
    title: 'Flagship Events & Hackathons — TCET ACM SIGITE',
    description: 'Explore our 48-hour PixxelHack webathons, DSA masterclasses, DevOps bootcamps, and national tech symposiums.'
  },
  '/achievements': {
    title: 'Accolades & Honors — TCET ACM SIGITE',
    description: 'Celebrating our ACM India Summit Best Chapter Website honors, national hackathon podium finishes, and academic milestones.'
  },
  '/team': {
    title: 'Core Committee & Faculty — TCET ACM SIGITE',
    description: 'Meet the faculty mentors, branch counsellors, and student officers driving innovation at TCET ACM SIGITE.'
  },
  '/gallery': {
    title: 'Visual Archive & Memories — TCET ACM SIGITE',
    description: 'A curated gallery of moments, hackathons, seminars, and tech fest celebrations from TCET ACM chapter history.'
  },
  '/contact': {
    title: 'Contact & Feedback — TCET ACM SIGITE',
    description: 'Get in touch with the TCET ACM chapter committee for collaborations, student memberships, event sponsorships, and inquiries.'
  }
};

const DEFAULT_META = {
  title: 'TCET ACM SIGITE — Student Chapter & Spatial Portal',
  description: "Thakur College of Engineering & Technology's premier ACM SIGITE Student Chapter."
};

function updateMetaTag(selector, attrName, attrValue, content) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function usePageSEO() {
  const location = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[location.pathname] || DEFAULT_META;

    // 1. Page Title
    document.title = meta.title;

    // 2. Standard Meta Description
    updateMetaTag('meta[name="description"]', 'name', 'description', meta.description);
    updateMetaTag('meta[name="title"]', 'name', 'title', meta.title);

    // 3. Open Graph Metadata
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', `https://tcet.acm.org${location.pathname}`);

    // 4. Twitter Card Metadata
    updateMetaTag('meta[property="twitter:title"]', 'property', 'twitter:title', meta.title);
    updateMetaTag('meta[property="twitter:description"]', 'property', 'twitter:description', meta.description);
    updateMetaTag('meta[property="twitter:url"]', 'property', 'twitter:url', `https://tcet.acm.org${location.pathname}`);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://tcet.acm.org${location.pathname}`);
  }, [location.pathname]);
}
