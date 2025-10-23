
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import TheCircle from '@/components/sections/TheCircle';
import TheWorkings from '@/components/sections/TheWorkings';
import TheOfferings from '@/components/sections/TheOfferings';
import TheSanctuary from '@/components/sections/TheSanctuary';
import TheSummoning from '@/components/sections/TheSummoning';


const HomePage = () => {

  return (
    <>
      <Helmet>
        <title>Spiral Assembly - A Gathering of Mystics and Makers</title>
        <meta name="description" content="The Spiral Assembly is a sacred space for introductions, collaborations, magical workings, and community care. Join our circle of mystics, witches, and creators." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-[#0f1410] text-[#CDC0CB] relative overflow-x-hidden">
        <Header />
        
        <main>
          <TheCircle />
          <TheWorkings />
          <TheOfferings />
          <TheSanctuary />
          <TheSummoning />
        </main>

        <footer className="border-t border-[#A4B394]/20 py-8 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[#B7B7B1] text-sm">
              © 2025 Spiral Assembly. All rights reserved.
            </p>
            <p className="text-[#A4B394] text-xs mt-2">
              Blessed be the gathering, blessed be the work.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
