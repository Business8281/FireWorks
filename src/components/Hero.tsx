'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#FBF1E6] min-h-[500px] xs:min-h-[540px] sm:min-h-[580px] md:min-h-[620px] lg:min-h-[660px] xl:min-h-[700px] flex items-center border-b border-slate-200/80 scroll-mt-24 select-none"
    >
      {/* 1. Direct Background Image (Responsive Positioning Across All Viewports) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Diwali Firecrackers Wholesale"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-[80%_center] xs:object-[76%_center] sm:object-[72%_center] lg:object-center"
        />

        {/* Soft Mobile/Tablet Vignette for Pristine Text Readability Across Small Screens */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-4/5 md:w-3/4 lg:w-3/5 lg:hidden bg-gradient-to-r from-[#FCEAD9]/95 via-[#FCEAD9]/90 to-transparent pointer-events-none" />
      </div>

      {/* 2. Hero Content Typography (Fluid Scaled Typography & Touch Targets) */}
      <div className="relative z-10 max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 w-full py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="max-w-xl lg:max-w-2xl xl:max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3.5 sm:space-y-4 md:space-y-5"
          >
            {/* Headline with Brand Flame Gradient - Responsive Scaling from 320px to 4K */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.14]">
              Light Up Your Diwali With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E00] via-[#FF3B00] to-[#E60000]">
                Authentic Sivakasi Firecrackers
              </span>
              <span className="block mt-1 sm:mt-1.5 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#B91C1C] tracking-tight">
                2026 Festive Wholesale Price List
              </span>
            </h1>

            {/* Punchy, Crisp, Clean Subtitle */}
            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-medium max-w-xl">
              Experience genuine Sivakasi factory wholesale rates on 100% PESO green-certified crackers. Express 24–48 hour delivery across Hyderabad, Telangana &amp; Andhra Pradesh.
            </p>

            {/* Action Link Buttons - Full width on small phones, inline on larger screens */}
            <div className="pt-2 sm:pt-3 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3">
              <a
                href="#products"
                onClick={(e) => scrollTo(e, 'products')}
                className="h-10 xs:h-11 px-3.5 xs:px-6 rounded-xl bg-gradient-to-r from-[#FF5E00] via-[#FF3B00] to-[#E60000] hover:opacity-95 text-white font-bold text-[11px] xs:text-xs uppercase tracking-wide xs:tracking-wider shadow-lg shadow-orange-500/25 inline-flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 text-center"
              >
                <span>Explore Wholesale Price List</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="#about"
                onClick={(e) => scrollTo(e, 'about')}
                className="h-10 xs:h-11 px-4 xs:px-5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center transition-all shadow-md shadow-slate-900/5 border border-slate-200/90 cursor-pointer hover:scale-105 active:scale-95"
              >
                About Our Depot
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollTo(e, 'contact')}
                className="h-10 xs:h-11 px-4 xs:px-5 rounded-xl bg-white/85 hover:bg-white text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider border border-slate-300/80 inline-flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
