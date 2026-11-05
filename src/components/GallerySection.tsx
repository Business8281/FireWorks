'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Aerial Skyburst Spectacle',
    category: 'Aerial Displays',
    image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&q=80&w=800',
    caption: 'High-altitude 120-shot synchronized multi-color aerial canopy.',
  },
  {
    id: '2',
    title: 'Golden Sparklers Celebration',
    category: 'Family & Sparklers',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800',
    caption: 'Low-emission smokeless golden sparkler sticks for joyous family celebrations.',
  },
  {
    id: '3',
    title: 'Ground Chakkar Swirls',
    category: 'Spinners & Pots',
    image: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?auto=format&fit=crop&q=80&w=800',
    caption: 'High-velocity spinning ground chakkar casting vibrant emerald and silver sparks.',
  },
  {
    id: '4',
    title: 'Festive Diwali Night Illumination',
    category: 'Festive Lights',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800',
    caption: 'Bright floral fountains reaching heights of up to 15 feet.',
  },
  {
    id: '5',
    title: 'Sivakasi Packaging Depot',
    category: 'Depot & Dispatch',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    caption: 'Strict moisture-proof corrugated wholesale export cartons prepared for transport.',
  },
  {
    id: '6',
    title: 'Multi-Color Night Flares',
    category: 'Aerial Displays',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800',
    caption: 'Brilliant magnesium-free color chemical formulations approved by PESO.',
  },
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Aerial Displays', 'Family & Sparklers', 'Spinners & Pots', 'Depot & Dispatch'];

  const filteredItems = galleryData.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            {/* Clean label without background color or border */}
            <span className="text-xs font-bold text-[#B91C1C] uppercase tracking-widest font-mono">
              Festive Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Ignis Pyrotechnics Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Explore authentic Sivakasi pyrotechnic effects and depot dispatch operations.
            </p>
          </div>

          {/* Category Filter Tabs (Pure White, 8px Radius, Zero Cement) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-lg bg-white border border-slate-200 self-start sm:self-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative px-3.5 py-1.5 text-xs font-bold transition-colors whitespace-nowrap rounded-lg"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryPill"
                      className="absolute inset-0 bg-[#B91C1C] rounded-lg shadow-sm -z-0"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-700 hover:text-slate-900'}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid (Mobile Responsive: 1-col mobile, 2-col sm, 3-col lg) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveModalItem(item)}
                className="group relative rounded-lg overflow-hidden bg-white border border-slate-200 shadow-xs cursor-pointer aspect-4/3"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold tracking-tight mt-0.5">{item.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal (8px Radius, Pure White) */}
        <AnimatePresence>
          {activeModalItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalItem(null)}
                className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-y-auto rounded-lg bg-white shadow-2xl border border-slate-200 my-auto"
              >
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-white/95 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all shadow-xs"
                  aria-label="Close image modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative aspect-video w-full bg-white">
                  <Image
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 bg-white">
                  {/* Clean label without background color or border */}
                  <span className="text-xs font-mono font-bold text-[#B91C1C] uppercase tracking-wider">
                    {activeModalItem.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {activeModalItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {activeModalItem.caption}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
