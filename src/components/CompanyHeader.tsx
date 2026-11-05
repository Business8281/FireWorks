'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShoppingCart, MapPin, Leaf, Menu, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useCart } from '@/context/CartContext';
import { useCrackers } from '@/context/CrackerContext';

export default function CompanyHeader() {
  const pathname = usePathname();
  const { totalCount, totalAmount, setIsCartOpen } = useCart();
  const { whatsAppPhone } = useCrackers();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'products', label: 'Products', href: '#products' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Scroll spy to update active section in real-time
  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page check
      if (scrollPosition + windowHeight >= docHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Top of page check
      if (scrollPosition < 200) {
        setActiveSection('home');
        return;
      }

      const sectionIds = ['home', 'products', 'about', 'contact'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when section top is within top 250px of viewport
          if (rect.top <= 250) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Support initial hash navigation if arrived with /#products etc.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const el = document.getElementById(hashId);
      if (el) {
        setTimeout(() => {
          if (hashId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const headerEl = document.querySelector('header');
            const headerHeight = headerEl ? headerEl.offsetHeight : 65;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 10);
            window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
          }
          setActiveSection(hashId);
        }, 150);
      }
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      window.history.pushState(null, '', '#home');
      return;
    }

    // Small delay ensures mobile touch tap closes without gesture collision
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 65;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + 10);

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
        setActiveSection(sectionId);
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }, 40);
  };

  return (
    <header className="relative sticky top-0 z-50 w-full max-w-full py-1.5 xs:py-2 sm:py-3 px-1.5 xs:px-2.5 sm:px-4 md:px-6 lg:px-8 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto rounded-2xl bg-white shadow-[0_4px_25px_rgba(0,0,0,0.06)] px-2 xs:px-3 sm:px-5 lg:px-6 py-1.5 xs:py-2 sm:py-2.5 flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-4">
        {/* 1. Brand Logo & Identity */}
        <Link
          href="/#home"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('home');
              window.history.pushState(null, '', '#home');
            }
          }}
          className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 group shrink-0 min-w-0"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 rounded-lg xs:rounded-xl bg-gradient-to-br from-[#FF5E00] via-[#FF3B00] to-[#E60000] flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0"
          >
            <Flame className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-6 sm:h-6 text-white fill-white" />
          </motion.div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[11px] xs:text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-900 whitespace-nowrap">
                IGNIS
              </span>
              <span className="text-[11px] xs:text-sm sm:text-base md:text-lg font-black tracking-tight text-[#B91C1C] whitespace-nowrap">
                FIREWORKS
              </span>
              <span className="text-slate-300 font-light mx-0.5 sm:mx-1 hidden md:inline">|</span>
              <span className="hidden md:inline-flex items-center gap-1 text-[#B91C1C] text-xs sm:text-[13px] font-extrabold uppercase tracking-wider whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" strokeWidth={2.2} />
                <span>HYDERABAD</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium hidden lg:flex items-center gap-1 mt-0.5">
              <Leaf className="w-3 h-3 text-emerald-600 fill-emerald-600/30 shrink-0" />
              <span>Hyderabad Central Depot • Direct Sivakasi Factory Pricing</span>
            </p>
          </div>
        </Link>

        {/* 2. Desktop Navigation Bar (Single Page Smooth Scroll) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === '/' ? activeSection === link.id : false;

            return (
              <a
                key={link.id}
                href={pathname === '/' ? link.href : `/${link.href}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`px-4 xl:px-5 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#B91C1C] text-white shadow-sm'
                    : 'text-slate-700 hover:text-[#B91C1C] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* 3. Right: Let's Talk + Cart Button + Mobile Menu */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
          {/* Subtle Vertical Divider */}
          <div className="hidden lg:block h-6 w-px bg-slate-200" />

          {/* Let's Talk WhatsApp Pill Button */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${whatsAppPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hello IGNIS Fireworks Hyderabad, I would like to inquire about wholesale order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 rounded-full border border-emerald-600/80 bg-white hover:bg-emerald-50 text-slate-900 font-bold text-xs tracking-wide shadow-xs transition-colors shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
            <span>Let&apos;s Talk</span>
          </motion.a>

          {/* Cart Capsule Pill */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCartOpen(true)}
            className="relative h-7 xs:h-8 sm:h-10 px-1.5 xs:px-2.5 sm:px-4 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm transition-all flex items-center gap-1 xs:gap-1.5 sm:gap-2 cursor-pointer shrink-0"
            title="Open Shopping Cart"
          >
            <ShoppingCart className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />

            {/* Mobile-only compact cart display */}
            <span className="sm:hidden font-mono font-bold text-emerald-400 text-[11px] xs:text-xs">
              {totalCount === 0 ? 'Cart' : `₹${Math.round(totalAmount)}`}
            </span>

            {/* Desktop / Tablet expanded view */}
            <span className="hidden sm:inline font-bold text-white whitespace-nowrap">
              {totalCount === 0 ? '0 Items' : `${totalCount} ${totalCount === 1 ? 'Item' : 'Items'}`}
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline font-mono text-emerald-400 font-bold whitespace-nowrap">
              ₹{totalAmount.toFixed(2)}
            </span>

            {/* Red Notification Badge */}
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#DC2626] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-in zoom-in-50 duration-200">
                {totalCount}
              </span>
            )}
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 xs:p-1.5 sm:p-2.5 rounded-lg xs:rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> : <Menu className="w-3.5 h-3.5 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop to close when tapping outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 top-[48px] xs:top-[56px] sm:top-[64px] bg-slate-900/15 backdrop-blur-[2px] z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="lg:hidden absolute top-full left-1.5 right-1.5 xs:left-2.5 xs:right-2.5 sm:left-4 sm:right-4 mt-1 rounded-2xl border border-slate-200/90 bg-white p-2.5 max-h-[85vh] overflow-y-auto shadow-2xl z-50"
            >
              {/* Clean, user-first navigation list without distracting icons */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === '/' ? activeSection === link.id : false;

                  return (
                    <a
                      key={link.id}
                      href={pathname === '/' ? link.href : `/${link.href}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className={`block px-4 py-3 rounded-xl text-base tracking-tight transition-all cursor-pointer ${
                        isActive
                          ? 'bg-red-50 text-[#B91C1C] font-bold'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* Quick Action Footer inside Drawer */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                <a
                  href={`https://wa.me/${whatsAppPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hello IGNIS Fireworks Hyderabad, I would like to inquire about wholesale order.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-800 font-bold text-xs tracking-wide transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>Chat with Hyderabad Dispatch Desk</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
