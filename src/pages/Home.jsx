import React from 'react';
import Hero from '../components/Hero';
import AboutCEO from '../components/AboutCEO';
import ServicesSlider from '../components/ServicesSlider';
import Portfolio from '../components/Portfolio';

export default function Home() {
  return (
    <div className="pb-32 overflow-hidden">
      <Hero />
      <div className="mt-24 space-y-8">
        <AboutCEO />
        <ServicesSlider />
        <Portfolio />
      </div>
    </div>
  );
}
