'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CrackerItem } from '@/types/cracker';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Package, Tag, Ban } from 'lucide-react';

interface ProductTableRowProps {
  serialNo: number;
  cracker: CrackerItem;
  index: number;
  onOpenSpecs?: (cracker: CrackerItem) => void;
}

const ProductTableRow = React.forwardRef<HTMLDivElement, ProductTableRowProps>(
  function ProductTableRow({ serialNo, cracker, index, onOpenSpecs }, ref) {
    const { cart, updateQuantity } = useCart();
    const quantity = cart[cracker.id] || 0;
    const lineTotal = quantity * cracker.price;
    const isEven = index % 2 === 1;

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.15 }}
      className={`grid grid-cols-12 items-center py-3 sm:py-3.5 px-3 sm:px-6 border-b border-slate-100 transition-colors ${
        quantity > 0
          ? 'bg-red-50/30'
          : isEven
          ? 'bg-slate-50/40 hover:bg-slate-100/60'
          : 'bg-white hover:bg-slate-50/60'
      } ${!cracker.isAvailable ? 'opacity-60' : ''}`}
    >
      {/* 1. S.NO (Light rounded pill circle matching reference) */}
      <div className="col-span-2 sm:col-span-1 flex items-center justify-start sm:justify-center">
        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100/90 text-slate-800 font-bold text-xs flex items-center justify-center font-mono shadow-2xs">
          {serialNo}
        </span>
      </div>

      {/* 2. PRODUCT SPECIFICATIONS (Image + Name + Pack Size + SKU) */}
      <div className="col-span-10 sm:col-span-5 flex items-center gap-3 min-w-0 pr-2">
        {/* Product Image Thumbnail */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onOpenSpecs && onOpenSpecs(cracker)}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-slate-900 border border-slate-200/90 shrink-0 cursor-pointer shadow-xs"
        >
          <Image
            src={cracker.image}
            alt={cracker.name}
            fill
            sizes="(max-width: 640px) 48px, 56px"
            className={`object-cover ${!cracker.isAvailable ? 'grayscale' : ''}`}
          />
        </motion.div>

        {/* Title, Pack Size & SKU */}
        <div className="min-w-0 flex-1">
          <h3
            onClick={() => onOpenSpecs && onOpenSpecs(cracker)}
            className="text-xs sm:text-sm font-extrabold text-slate-900 hover:text-[#B91C1C] transition-colors cursor-pointer truncate tracking-tight"
            title={cracker.name}
          >
            {cracker.name}
          </h3>
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mt-1 text-[11px] text-slate-600 font-medium">
            <span className="inline-flex items-center gap-1 uppercase tracking-wider font-semibold font-mono text-[10.5px] sm:text-[11px] text-slate-700">
              <Package className="w-3 h-3 text-slate-500 shrink-0" />
              <span>{cracker.packSize}</span>
            </span>
            <span className="text-slate-300 font-light hidden xs:inline">|</span>
            <span className="hidden xs:inline-flex items-center gap-1 font-mono text-[10.5px] sm:text-[11px] text-slate-600 uppercase">
              <Tag className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{cracker.sku}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. PRICE (Bold Crimson Red) */}
      <div className="col-span-3 sm:col-span-2 text-left sm:text-center mt-2 sm:mt-0">
        <span className="text-[10px] text-slate-500 sm:hidden block uppercase font-mono">Price</span>
        <span className="text-xs sm:text-base font-black text-[#AF170F] font-mono tracking-tight">
          ₹{cracker.price.toFixed(2)}
        </span>
      </div>

      {/* 4. QUANTITY STEPPER (White body with dark navy [+] button matching reference) */}
      <div className="col-span-5 sm:col-span-2 flex items-center justify-center mt-2 sm:mt-0">
        {cracker.isAvailable ? (
          <div className="inline-flex items-center rounded-lg bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            {/* [-] Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => updateQuantity(cracker.id, -1)}
              disabled={quantity === 0}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm transition-colors ${
                quantity === 0
                  ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                  : 'text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 cursor-pointer'
              }`}
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 stroke-[3]" />
            </motion.button>

            {/* Qty Display */}
            <AnimatePresence mode="wait">
              <motion.span
                key={quantity}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="w-8 sm:w-9 text-center text-xs sm:text-sm font-black text-slate-900 font-mono"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>

            {/* [+] Button (Deep Navy Background matching reference) */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => updateQuantity(cracker.id, 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-[#0B1E48] hover:bg-[#071638] text-white flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
            </motion.button>
          </div>
        ) : (
          <span
            className="text-[10px] sm:text-[11px] font-bold text-rose-600 uppercase tracking-wide font-mono inline-flex items-center gap-1 cursor-not-allowed whitespace-nowrap"
            title="Out of Stock - Unavailable for Ordering"
          >
            <Ban className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 shrink-0" />
            <span className="hidden xs:inline">Out of Stock</span>
            <span className="xs:hidden">No Stock</span>
          </span>
        )}
      </div>

      {/* 5. TOTAL (Bold Dark Navy Price) */}
      <div className="col-span-4 sm:col-span-2 text-right mt-2 sm:mt-0 pr-1 sm:pr-4">
        <span className="text-[10px] text-slate-500 sm:hidden block uppercase font-mono">Total</span>
        <span className={`text-xs sm:text-sm font-black font-mono tracking-tight ${
          lineTotal > 0 ? 'text-[#0B1E48]' : 'text-slate-700'
        }`}>
          ₹{lineTotal.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
});

ProductTableRow.displayName = 'ProductTableRow';
export default ProductTableRow;
