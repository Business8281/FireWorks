'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Plus, Minus, ArrowRight, Ban, XCircle } from 'lucide-react';
import { CrackerItem } from '@/types/cracker';

interface FeaturedProductsSectionProps {
  crackers?: CrackerItem[];
  onOpenSpecs?: (cracker: CrackerItem) => void;
}

interface BestsellerProduct {
  id: string;
  name: string;
  rating: string;
  reviews: string;
  image: string;
  price: number;
  packSize: string;
  isBestseller?: boolean;
}

const BESTSELLER_PRODUCTS: BestsellerProduct[] = [
  {
    id: 'ign-aer-01',
    name: 'Sky Shots',
    rating: '4.9',
    reviews: '2.3K+',
    image: '/images/products/bijli-box.jpg',
    price: 270,
    packSize: '1 BOX (12 SHOTS)',
    isBestseller: true,
  },
  {
    id: 'ign-spk-01',
    name: 'Sparklers',
    rating: '4.8',
    reviews: '4.1K+',
    image: '/images/products/bijli-box.jpg',
    price: 24,
    packSize: '10 PCS / BOX',
  },
  {
    id: 'ign-fnt-01',
    name: 'Flower Pots',
    rating: '4.9',
    reviews: '3.7K+',
    image: '/images/products/bijli-box.jpg',
    price: 70,
    packSize: '10 PCS / BOX',
  },
  {
    id: 'ign-chk-01',
    name: 'Chakkar',
    rating: '4.7',
    reviews: '2.9K+',
    image: '/images/products/bijli-box.jpg',
    price: 60,
    packSize: '10 PCS / BOX',
  },
  {
    id: 'ign-snd-bijli',
    name: 'Bijli Crackers',
    rating: '4.8',
    reviews: '3.2K+',
    image: '/images/products/bijli-box.jpg',
    price: 35,
    packSize: '1 PKT (100 PCS)',
  },
];

export default function FeaturedProductsSection({
  crackers,
  onOpenSpecs,
}: FeaturedProductsSectionProps) {
  const { cart, updateQuantity } = useCart();

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-10 md:pt-12 pb-24 sm:pb-32 md:pb-40 border-b border-slate-200 bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FA] to-[#FFEEF8]">
      {/* Bottom Single Festival Landscape */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 md:h-44 lg:h-52 pointer-events-none z-0 select-none overflow-hidden">
        <Image
          src="/images/decorative/landscape-bottom.jpg"
          alt="Festival landscape"
          fill
          priority
          unoptimized
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-6 sm:space-y-8">
        {/* 5. Crisp High-Resolution Header Composition with Individual PNG Assets */}
        <div className="relative text-center max-w-4xl mx-auto">
          {/* Top Golden Crown with Sparkles PNG */}
          <div className="flex justify-center mb-1.5 sm:mb-2">
            <div className="relative w-24 sm:w-28 md:w-32 h-7 sm:h-8 md:h-9 select-none">
              <Image
                src="/images/decorative/crown.png"
                alt="Crown"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading Row Flanked by Golden Laurel Branches */}
          <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-4 md:gap-6">
            {/* Left Golden Laurel PNG */}
            <div className="relative w-4 xs:w-7 sm:w-10 md:w-12 h-8 xs:h-12 sm:h-16 md:h-20 shrink-0 select-none">
              <Image
                src="/images/decorative/laurel-left.png"
                alt="Laurel Left"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>

            {/* Pure Vector HTML Typography (100% Crisp on all laptops & displays) */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight leading-tight">
                <span className="text-[#1A0B4B]">Most Bought </span>
                <span className="text-[#D11A2A]">Fire Crackers</span>
              </h2>
              <p className="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-[#2B2A4A] mt-1 sm:mt-1.5 tracking-tight">
                Customer Favorites for Every Celebration
              </p>
            </div>

            {/* Right Golden Laurel PNG */}
            <div className="relative w-4 xs:w-7 sm:w-10 md:w-12 h-8 xs:h-12 sm:h-16 md:h-20 shrink-0 select-none">
              <Image
                src="/images/decorative/laurel-right.png"
                alt="Laurel Right"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* 6. 5 Product Cards Grid Matching Reference Design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {BESTSELLER_PRODUCTS.map((item) => {
            const quantity = cart[item.id] || 0;
            const fullCracker = crackers?.find((c) => c.id === item.id);
            const isOutOfStock = fullCracker ? !fullCracker.isAvailable : false;

            return (
              <div
                key={item.id}
                title={isOutOfStock ? `${item.name} - Currently Out of Stock` : item.name}
                className={`rounded-2xl bg-white border shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 p-2.5 sm:p-3 flex flex-col justify-between group relative ${
                  isOutOfStock ? 'border-rose-200/90' : 'border-slate-200/90'
                }`}
              >
                {/* Floating "Out of Stock" Tooltip on Hover */}
                {isOutOfStock && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-[105%] transition-all duration-200 pointer-events-none z-40">
                    <div className="relative px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-2xl border border-slate-700/60 flex items-center gap-1.5 whitespace-nowrap">
                      <Ban className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Out of Stock</span>
                      {/* Downward triangle arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-slate-700/60" />
                    </div>
                  </div>
                )}

                <div>
                  {/* Card Visual Thumbnail with EXPLICIT HEIGHT so it NEVER collapses */}
                  <div
                    onClick={() => {
                      if (fullCracker && onOpenSpecs) onOpenSpecs(fullCracker);
                    }}
                    className="relative w-full h-32 xs:h-36 sm:h-40 lg:h-36 xl:h-40 rounded-xl overflow-hidden bg-slate-900 mb-2.5 cursor-pointer shadow-xs"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      priority
                      unoptimized
                      className={`object-cover transition-transform duration-300 ${
                        isOutOfStock ? 'grayscale opacity-60' : 'group-hover:scale-105'
                      }`}
                    />

                    {/* Bestseller Badge */}
                    {item.isBestseller && (
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-md">
                        <span>🔥</span>
                        <span>Bestseller</span>
                      </div>
                    )}
                  </div>

                  {/* Product Title */}
                  <h3
                    onClick={() => {
                      if (fullCracker && onOpenSpecs) onOpenSpecs(fullCracker);
                    }}
                    className={`text-xs xs:text-sm sm:text-base font-bold transition-colors cursor-pointer truncate tracking-tight text-left ${
                      isOutOfStock ? 'text-slate-500' : 'text-slate-900 hover:text-[#B91C1C]'
                    }`}
                    title={item.name}
                  >
                    {item.name}
                  </h3>
                </div>

                {/* Bottom Row: Rating on Left, Wholesale Rate & Cart / Out-of-Stock Symbol Button on Right */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-1.5 min-w-0">
                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1 min-w-0">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-400 shrink-0" />
                    <span className="font-extrabold text-slate-900 text-[11px] sm:text-xs font-mono">
                      {item.rating}
                    </span>
                    <span className="text-slate-400 text-[9px] sm:text-[10px] font-medium font-mono truncate">
                      ({item.reviews})
                    </span>
                  </div>

                  {/* Right Action: Wholesale Rate + Cart / Out-of-Stock Symbol Button */}
                  <div className="flex items-center justify-between min-[380px]:justify-end gap-1.5 w-full min-[380px]:w-auto shrink-0">
                    <span className={`text-xs sm:text-sm font-black font-mono ${isOutOfStock ? 'text-rose-600' : 'text-slate-900'}`}>
                      ₹{item.price}
                    </span>

                    {isOutOfStock ? (
                      <div
                        className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center cursor-not-allowed shadow-xs"
                        title="Out of Stock - Unavailable for Ordering"
                        aria-label="Out of Stock"
                      >
                        <Ban className="w-4 h-4 text-rose-600" />
                      </div>
                    ) : quantity === 0 ? (
                      <motion.button
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7E1360] via-[#941370] to-[#B31885] hover:from-[#6B0F51] hover:to-[#9E1475] text-white flex items-center justify-center shadow-md shadow-pink-900/25 transition-all cursor-pointer"
                        title={`Add ${item.name} to Cart`}
                        aria-label={`Add ${item.name} to Cart`}
                      >
                        <ShoppingCart className="w-4 h-4 text-white" />
                      </motion.button>
                    ) : (
                      <div className="inline-flex items-center gap-0.5 bg-[#7E1360] text-white p-0.5 rounded-full shadow-md">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-2.5 h-2.5 stroke-[3]" />
                        </motion.button>

                        <AnimatePresence mode="wait">
                          <motion.span
                            key={quantity}
                            initial={{ scale: 1.3, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            className="w-4 text-center text-[11px] font-black text-white font-mono"
                          >
                            {quantity}
                          </motion.span>
                        </AnimatePresence>

                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-2.5 h-2.5 stroke-[3]" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 7. Bottom Center Pill: "Explore All Crackers →" */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <Link
            href="#wholesale-catalog"
            className="px-8 sm:px-10 py-3 rounded-full bg-gradient-to-r from-[#990033] via-[#D11A2A] to-[#FF4500] hover:from-[#80002A] hover:to-[#E63900] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore All Crackers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
