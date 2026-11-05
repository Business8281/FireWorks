'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function FloatingOrderBar() {
  const { totalCount, totalAmount, setIsCartOpen } = useCart();

  if (totalCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Floating cart summary"
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 90, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed bottom-2 xs:bottom-3 sm:bottom-6 inset-x-0 z-40 px-1.5 xs:px-3 sm:px-6 pointer-events-none pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto w-full pointer-events-auto">
          {/* Executive Floating Order Card - 100% responsive across all screen sizes */}
          <div className="w-full p-2 xs:p-2.5 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl bg-white text-slate-900 shadow-[0_10px_35px_rgba(0,0,0,0.18)] border border-slate-200/90 flex items-center justify-between gap-1.5 xs:gap-3 sm:gap-4 md:gap-6 backdrop-blur-md">
            {/* Left: Navy Cart Icon + Amount & Count */}
            <div
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-3.5 cursor-pointer group min-w-0"
              title="Review selection and open cart drawer"
            >
              {/* Dark Slate Square Shopping Cart Box matching navbar */}
              <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0 shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white stroke-[2.2]" />
              </div>

              <div className="flex flex-col min-w-0 justify-center">
                {/* Price and Item Count: stacked cleanly on mobile, inline on sm+ */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 min-w-0">
                  <span className="text-xs xs:text-sm sm:text-base md:text-xl font-black font-mono text-slate-900 tracking-tight whitespace-nowrap leading-tight">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-[#B91C1C] font-bold font-mono whitespace-nowrap">
                    ({totalCount} {totalCount === 1 ? 'Item' : 'Items'})
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium truncate hidden md:block">
                  Tap to review selection
                </span>
              </div>
            </div>

            {/* Right: View Cart (Navy Outlined) + WhatsApp Order (Solid Green) */}
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
              {/* View Cart Button */}
              <Link
                href="/cart"
                className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 rounded-lg xs:rounded-xl border border-slate-900 bg-white hover:bg-slate-50 text-slate-900 text-[11px] xs:text-xs sm:text-sm font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 shrink-0"
                title="View Cart"
              >
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-slate-900 stroke-[2.2] shrink-0" />
                <span className="hidden sm:inline">View Cart</span>
                <span className="sm:hidden">Cart</span>
              </Link>

              {/* WhatsApp Order Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-2 xs:px-3 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-lg xs:rounded-xl bg-[#067F2A] hover:bg-[#056B23] text-white font-bold text-[11px] xs:text-xs sm:text-sm inline-flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
                title="Order via WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                <span className="tracking-wide hidden sm:inline">WhatsApp Order</span>
                <span className="tracking-wide sm:hidden">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
