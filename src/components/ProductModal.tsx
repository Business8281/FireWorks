'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';
import { CrackerItem } from '@/types/cracker';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  cracker: CrackerItem | null;
  onClose: () => void;
}

export default function ProductModal({ cracker, onClose }: ProductModalProps) {
  const { cart, updateQuantity, setIsCartOpen } = useCart();

  if (!cracker) return null;

  const quantity = cart[cracker.id] || 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs"
        />

        {/* Modal Window (Pure White, 8px radius, Mobile-Safe Scroll) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-lg bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-lg bg-white/95 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all shadow-xs"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
            {/* Visual Preview */}
            <div className="relative aspect-square md:aspect-auto h-48 sm:h-56 md:h-full min-h-[200px] bg-white overflow-hidden border-b md:border-b-0 md:border-r border-slate-200">
              <Image
                src={cracker.image}
                alt={cracker.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Spec Sheet & Actions */}
            <div className="p-5 sm:p-6 flex flex-col justify-between bg-white">
              <div>
                {/* Clean label without background color or border */}
                <span className="text-xs font-bold text-[#B91C1C] uppercase font-mono tracking-wider">
                  {cracker.category}
                </span>

                <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug mt-2">
                  {cracker.name}
                </h2>

                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  {cracker.description}
                </p>

                {/* Specs (Clean White Card, 8px Radius, Zero Cement) */}
                <div className="mt-4 space-y-2 bg-white p-3.5 rounded-lg border border-slate-200 text-xs">
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-700">Packing Unit:</span>
                    <span className="text-slate-900 font-bold font-mono">{cracker.packSize}</span>
                  </div>
                  {cracker.specs.duration && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-700">Duration:</span>
                      <span className="text-slate-900 font-mono">{cracker.specs.duration}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-700">Sound Decibels:</span>
                    <span className="text-slate-900 font-mono">{cracker.specs.soundLevel}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-slate-700">Safety Distance:</span>
                    <span className="text-slate-900 font-mono">{cracker.specs.safetyRadius}</span>
                  </div>
                </div>
              </div>

              {/* Price & Cart Actions (ZERO DISCOUNT MENTIONS, 8px Border Radius) */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-2xl font-black font-mono text-slate-900">
                      ₹{cracker.price.toFixed(2)}
                    </span>
                  </div>
                  {/* Clean label without background color or border */}
                  <span className={`text-xs font-bold font-mono ${
                    cracker.isAvailable ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {cracker.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {cracker.isAvailable ? (
                  <div className="flex items-center gap-3">
                    {/* Stepper (8px Border Radius) */}
                    <div className="flex items-center gap-2 p-1 rounded-lg bg-white border border-slate-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(cracker.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center font-bold text-xs transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.button>
                      <span className="w-7 text-center text-xs font-bold font-mono text-slate-900">
                        {quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(cracker.id, 1)}
                        className="w-7 h-7 rounded-lg bg-[#B91C1C] hover:bg-[#991b1b] text-white flex items-center justify-center font-bold text-xs shadow-xs transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (quantity === 0) updateQuantity(cracker.id, 1);
                        setIsCartOpen(true);
                        onClose();
                      }}
                      className="flex-1 h-10 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>View Cart</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="w-full py-2.5 rounded-lg bg-white border border-slate-200 text-center text-xs text-rose-600 font-bold font-mono">
                    This item is currently sold out.
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
