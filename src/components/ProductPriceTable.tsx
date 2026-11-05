'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrackerCategory, CrackerItem } from '@/types/cracker';
import ProductTableRow from './ProductTableRow';
import { Search, X, ShieldCheck, CheckCircle2, Truck, Rocket } from 'lucide-react';

interface ProductPriceTableProps {
  crackers: CrackerItem[];
  onOpenSpecs?: (cracker: CrackerItem) => void;
}

interface CategoryMeta {
  firstWord: string;
  secondWord: string;
  tagline: string;
}

const CATEGORY_META_MAP: Record<string, CategoryMeta> = {
  'Ground Spinners': {
    firstWord: 'Ground',
    secondWord: 'Chakkars',
    tagline: 'Spinning ground fireworks with vibrant lights & patterns',
  },
  'Sound & Crackle': {
    firstWord: 'Sound',
    secondWord: 'Crackers',
    tagline: 'High-decibel traditional festival crackers & lightning red sparks',
  },
  'Sparklers & Flares': {
    firstWord: 'Sparklers',
    secondWord: '& Handhelds',
    tagline: 'Safe smokeless sparkling sticks, gold flares & colored dazzlers',
  },
  'Fountains & Cones': {
    firstWord: 'Flower Pots',
    secondWord: '& Cones',
    tagline: 'Towering golden sparks, colored showers & fountain cones',
  },
  'Sky Rockets': {
    firstWord: 'Sky',
    secondWord: 'Rockets',
    tagline: 'High-altitude whistling sonic rockets with dazzling breaks',
  },
  'Aerial Cakes': {
    firstWord: 'Multi-Shot',
    secondWord: 'Aerial Cakes',
    tagline: 'Grand celebration aerial cakes with synchronised sky bursts',
  },
  'Executive Hampers': {
    firstWord: 'Festive Gift',
    secondWord: 'Hampers',
    tagline: 'Family assorted collection boxes & wholesale corporate gift packs',
  },
};


/* Animated Category Fireworks Icons */
function AnimatedChakkar() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#EEBC46]"
      animate={{ rotate: 360 }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="5" stroke="#FF9E00" strokeWidth="1.5" />
      <motion.circle
        cx="12"
        cy="12"
        r="2.5"
        fill="#FFD700"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <path d="M12 3 C14 6 16 9 12 12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 12 C18 14 15 16 12 12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 21 C10 18 8 15 12 12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12 C6 10 9 8 12 12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
}

function AnimatedSoundCracker() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#EEBC46]"
      animate={{ scale: [1, 1.1, 0.95, 1.08, 1], rotate: [-2, 3, -3, 2, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="8" y="7" width="8" height="13" rx="2" fill="#E60000" stroke="#FFD700" strokeWidth="1.5" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="#FFD700" strokeWidth="1.5" />
      <path d="M12 7 C12 4 14 3 15 2" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
      <motion.circle
        cx="15"
        cy="2"
        r="1.8"
        fill="#FFF"
        animate={{ scale: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 0.35, repeat: Infinity }}
      />
      <motion.path
        d="M4 10 L2 9 M5 16 L2 17 M19 10 L22 9 M19 16 L22 17"
        stroke="#FF9E00"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.svg>
  );
}

function AnimatedSparkler() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#EEBC46]"
      animate={{ rotate: [-6, 6, -6] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <line x1="5" y1="19" x2="13" y2="11" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="11" x2="16" y2="8" stroke="#FFD700" strokeWidth="2.4" strokeLinecap="round" />
      <motion.path
        d="M16 4 L16 12 M12 8 L20 8 M13 5 L19 11 M13 11 L19 5"
        stroke="#FFD700"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="16"
        cy="8"
        r="2.2"
        fill="#FFF"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.svg>
  );
}

function AnimatedFlowerPot() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#EEBC46]"
    >
      <path d="M7 21 L9.5 13 L14.5 13 L17 21 Z" fill="#E60000" stroke="#FFD700" strokeWidth="1.5" />
      <motion.path
        d="M12 13 L12 2 M11 13 L7 5 M13 13 L17 5 M10 13 L5 8 M14 13 L19 8"
        stroke="#FFD700"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2 2"
        animate={{
          strokeDashoffset: [0, -8],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx="12"
        cy="3"
        r="1.8"
        fill="#FFFFFF"
        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      />
    </motion.svg>
  );
}

function AnimatedSkyRocket() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#EEBC46]"
      animate={{ y: [-2, 2, -2], rotate: [-3, 3, -3] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M14.5 4.5 C14.5 4.5 19 6 19.5 10.5 C19.5 12 18.5 14 17 15 L9 7 C10 5.5 12 4.5 14.5 4.5 Z"
        fill="#E60000"
        stroke="#FFD700"
        strokeWidth="1.5"
      />
      <path d="M9 7 L6 6 L7 9 Z" fill="#FF9E00" stroke="#FFD700" strokeWidth="1.2" />
      <path d="M17 15 L18 18 L15 17 Z" fill="#FF9E00" stroke="#FFD700" strokeWidth="1.2" />
      <circle cx="14" cy="10" r="1.8" fill="#FFF" />
      <motion.path
        d="M8 8 L4 12 C5 11 6 12 6 13 C6 14 5 15 4 16 L8 12"
        fill="#FFD700"
        animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 0.35, repeat: Infinity }}
      />
    </motion.svg>
  );
}

function AnimatedAerialCake() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#EEBC46]"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="5" y="12" width="14" height="9" rx="2" fill="#7E1360" stroke="#FFD700" strokeWidth="1.5" />
      <line x1="8" y1="12" x2="8" y2="16" stroke="#FFD700" strokeWidth="1.2" />
      <line x1="12" y1="12" x2="12" y2="16" stroke="#FFD700" strokeWidth="1.2" />
      <line x1="16" y1="12" x2="16" y2="16" stroke="#FFD700" strokeWidth="1.2" />
      <motion.circle
        cx="12"
        cy="6"
        r="3"
        stroke="#FF9E00"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        animate={{ scale: [0.6, 1.5, 0.6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.circle
        cx="7"
        cy="4"
        r="1.8"
        fill="#FFD700"
        animate={{ scale: [0.7, 1.4, 0.7], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle
        cx="17"
        cy="4"
        r="1.8"
        fill="#FFD700"
        animate={{ scale: [0.7, 1.4, 0.7], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  );
}

function AnimatedHamper() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#EEBC46]"
      animate={{ y: [-1.5, 1.5, -1.5], rotate: [-2, 2, -2] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="4" y="9" width="16" height="12" rx="2" fill="#E60000" stroke="#FFD700" strokeWidth="1.5" />
      <rect x="3" y="7" width="18" height="3" rx="1" fill="#FF9E00" stroke="#FFD700" strokeWidth="1.2" />
      <line x1="12" y1="7" x2="12" y2="21" stroke="#FFD700" strokeWidth="1.8" />
      <path d="M12 7 C10 4 7 4 8 6 C9 8 12 7 12 7 Z" fill="#FFD700" />
      <path d="M12 7 C14 4 17 4 16 6 C15 8 12 7 12 7 Z" fill="#FFD700" />
      <motion.circle
        cx="19"
        cy="5"
        r="1.5"
        fill="#FFF"
        animate={{ scale: [0.6, 1.5, 0.6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
    </motion.svg>
  );
}

function AnimatedDefaultCracker() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#EEBC46]"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M12 2C8 7 7 10 7 14a5 5 0 0 0 10 0c0-4-1-7-5-12z"
        fill="#FF5E00"
        stroke="#FFD700"
        strokeWidth="1.5"
      />
      <motion.path
        d="M12 8c-2 2.5-2.5 4-2.5 6a2.5 2.5 0 0 0 5 0c0-2-.5-3.5-2.5-6z"
        fill="#FFF"
        animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </motion.svg>
  );
}

function CategoryAnimatedIcon({ category }: { category: string }) {
  switch (category) {
    case 'Ground Spinners':
      return <AnimatedChakkar />;
    case 'Sound & Crackle':
      return <AnimatedSoundCracker />;
    case 'Sparklers & Flares':
      return <AnimatedSparkler />;
    case 'Fountains & Cones':
      return <AnimatedFlowerPot />;
    case 'Sky Rockets':
      return <AnimatedSkyRocket />;
    case 'Aerial Cakes':
      return <AnimatedAerialCake />;
    case 'Executive Hampers':
      return <AnimatedHamper />;
    default:
      return <AnimatedDefaultCracker />;
  }
}

export default function ProductPriceTable({ crackers, onOpenSpecs }: ProductPriceTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CrackerCategory>('All');

  const categories: CrackerCategory[] = [
    'All',
    'Ground Spinners',
    'Sound & Crackle',
    'Sparklers & Flares',
    'Fountains & Cones',
    'Sky Rockets',
    'Aerial Cakes',
    'Executive Hampers',
  ];

  const filteredCrackers = useMemo(() => {
    return crackers.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [crackers, selectedCategory, searchQuery]);

  const groupedCategories = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return [
        {
          categoryKey: 'SEARCH RESULTS',
          firstWord: 'Search',
          secondWord: 'Results',
          tagline: `Showing matches for "${searchQuery}" across all categories`,
          items: filteredCrackers,
        },
      ];
    }

    if (selectedCategory !== 'All') {
      const meta = CATEGORY_META_MAP[selectedCategory] || {
        firstWord: selectedCategory,
        secondWord: '',
        tagline: 'Selected fireworks collection',
      };
      return [
        {
          categoryKey: selectedCategory,
          firstWord: meta.firstWord,
          secondWord: meta.secondWord,
          tagline: meta.tagline,
          items: filteredCrackers,
        },
      ];
    }

    const order: Exclude<CrackerCategory, 'All'>[] = [
      'Ground Spinners',
      'Sound & Crackle',
      'Sparklers & Flares',
      'Fountains & Cones',
      'Sky Rockets',
      'Aerial Cakes',
      'Executive Hampers',
    ];

    return order
      .map((cat) => {
        const meta = CATEGORY_META_MAP[cat] || {
          firstWord: cat,
          secondWord: '',
          tagline: 'Wholesale crackers list',
        };
        return {
          categoryKey: cat,
          firstWord: meta.firstWord,
          secondWord: meta.secondWord,
          tagline: meta.tagline,
          items: crackers.filter((c) => c.category === cat),
        };
      })
      .filter((group) => group.items.length > 0);
  }, [crackers, selectedCategory, searchQuery, filteredCrackers]);

  return (
    <div className="w-full space-y-6">
      {/* 1. Spotlight Search & Category Filter Pills */}
      <div className="bg-white rounded-lg border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Spotlight Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B91C1C]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 60+ Diwali crackers by name or SKU (e.g. Chakkar, Bijli, Sky Shots, Sparklers)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-50/60 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/15 focus:outline-none text-sm text-slate-900 placeholder-slate-500 transition-all font-medium shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Counter */}
          <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
            <span className="font-mono text-xs font-bold text-[#B91C1C]">
              {filteredCrackers.length} Items Listed
            </span>
          </div>
        </div>

        {/* Sliding Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat && !searchQuery;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchQuery('');
                }}
                className={`relative px-4 py-2 rounded-lg text-xs font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-700 hover:text-[#B91C1C] hover:bg-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTableCatPill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#E60000] rounded-lg shadow-sm -z-0"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MASTER PRODUCT TABLES WITH MIDNIGHT NAVY FESTIVE BANNER */}
      <div className="space-y-8">
        {filteredCrackers.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-slate-700 text-sm shadow-xs">
            <p className="font-bold text-slate-900 text-base">No crackers found matching &quot;{searchQuery}&quot;.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for other popular crackers or clear filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-5 py-2 rounded-lg bg-[#B91C1C] text-white font-bold text-xs shadow-sm hover:scale-105 transition-all"
            >
              Show All Products
            </button>
          </div>
        ) : (
          groupedCategories.map((group) => (
            <motion.div
              layout
              key={group.categoryKey}
              className="rounded-lg border border-slate-200/90 shadow-md bg-white overflow-hidden mb-8"
            >
              {/* Category Header Banner: Deep Midnight Navy with Rocket & Badges */}
              <div className="relative bg-gradient-to-r from-[#011641] via-[#042058] to-[#0A2E7A] text-white py-4 px-4 sm:px-6 overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Left: Rocket Icon + Title + Tagline */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-amber-400/20 via-orange-500/15 to-red-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-xs overflow-hidden"
                    >
                      <CategoryAnimatedIcon category={group.categoryKey} />
                    </motion.div>

                    <div>
                      <h2 className="text-lg sm:text-2xl font-black tracking-tight leading-tight flex items-center gap-1.5 flex-wrap">
                        <span className="text-white">{group.firstWord}</span>
                        {group.secondWord && (
                          <span className="text-[#EEBC46]">{group.secondWord}</span>
                        )}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                        {group.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right: 3 Quality & Safety Badges matching reference */}
                  <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 pt-2 md:pt-0 border-t border-white/10 md:border-t-0 flex-wrap min-w-0">
                    {/* Badge 1: Verified Quality */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EEBC46] shrink-0" />
                      <span>Verified Quality</span>
                    </div>

                    <span className="text-white/20 hidden sm:inline">|</span>

                    {/* Badge 2: Safe to Use */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EEBC46] shrink-0" />
                      <span>Safe to Use</span>
                    </div>

                    <span className="text-white/20 hidden sm:inline">|</span>

                    {/* Badge 3: Fast Delivery */}
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white">
                      <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EEBC46] shrink-0" />
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Column Headers (Pale Slate/Blue Background matching reference) */}
              <div className="hidden sm:grid grid-cols-12 py-3 px-6 bg-[#EEF2F6] border-b border-slate-200 text-xs font-bold text-slate-800 tracking-wide">
                <div className="col-span-1 text-center font-mono">S.No</div>
                <div className="col-span-5 pl-1">Product Specifications</div>
                <div className="col-span-2 text-center font-mono">Price</div>
                <div className="col-span-2 text-center font-mono">Quantity</div>
                <div className="col-span-2 text-right pr-4 font-mono">Total</div>
              </div>

              {/* Rows with Alternating Tinting matching reference */}
              <div className="divide-y divide-slate-100">
                <AnimatePresence>
                  {group.items.map((cracker, index) => (
                    <ProductTableRow
                      key={cracker.id}
                      serialNo={index + 1}
                      cracker={cracker}
                      index={index}
                      onOpenSpecs={onOpenSpecs}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
