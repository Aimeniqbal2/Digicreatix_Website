import React, { useEffect } from 'react';
import Portfolio from '../components/Portfolio';

export default function PortfolioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center">
      <Portfolio />
    </div>
  );
}
