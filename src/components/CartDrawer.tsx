'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Phone,
  Mail,
  MapPin,
  User,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useCart } from '@/context/CartContext';
import { useCrackers } from '@/context/CrackerContext';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    totalCount,
    totalAmount,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const { whatsAppPhone } = useCrackers();

  // Customer details (Strictly NO ugly labels)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [exactAddress, setExactAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!exactAddress.trim()) {
      setErrorMsg('Please enter your exact delivery address.');
      return;
    }

    setErrorMsg('');

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2563EB', '#25D366', '#0F172A', '#38BDF8'],
      });
    } catch {}

    const orderId = `IGN-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let msg = `✨ *DIWALI FIRECRACKERS ORDER MANIFEST*\n`;
    msg += `🏢 *IGNIS FIREWORKS SIVAKASI*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *Order Ref:* #${orderId}\n`;
    msg += `📅 *Date:* ${dateStr}\n\n`;

    msg += `*CUSTOMER & DELIVERY DETAILS:*\n`;
    if (fullName.trim()) msg += `👤 *Name:* ${fullName.trim()}\n`;
    msg += `📞 *Phone:* ${phoneNumber.trim()}\n`;
    msg += `✉️ *Email:* ${emailAddress.trim()}\n`;
    msg += `📍 *Exact Delivery Address:* ${exactAddress.trim()}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    msg += `*SELECTED FIRECRACKERS:*\n`;
    cartItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.cracker.name}*\n`;
      msg += `   └ ${item.cracker.packSize}\n`;
      msg += `   └ Qty: *${item.quantity}* × ₹${item.cracker.price.toFixed(2)} = *₹${item.itemTotal.toFixed(2)}*\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📦 *Total Items:* ${totalCount}\n`;
    msg += `💳 *TOTAL AMOUNT:* ₹${totalAmount.toFixed(2)}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `💬 _Please confirm booking & send delivery schedule._`;

    const encoded = encodeURIComponent(msg);
    const targetPhone = whatsAppPhone.replace(/[^\d]/g, '');
    const url = `https://wa.me/${targetPhone}?text=${encoded}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Subtle light backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            {/* Drawer Window (Pure White, 8px Radius, Mobile Friendly) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full sm:w-[420px] bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Your Cart</span>
                    {totalCount > 0 && (
                      /* Clean label without background color or border */
                      <span className="text-xs font-mono font-bold text-[#B91C1C]">
                        ({totalCount} {totalCount === 1 ? 'Item' : 'Items'})
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-700 font-mono mt-0.5">
                    Direct WhatsApp Order Manifest
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all text-xs flex items-center gap-1 shadow-xs"
                    title="Open Full Page Cart"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all shadow-xs"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-white">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-14 h-14 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#B91C1C] mb-3 shadow-xs">
                      <ShoppingBag className="w-7 h-7 text-[#B91C1C]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Your Cart is Empty</h3>
                    <p className="text-xs text-slate-700 mt-1 max-w-xs">
                      Select items from the wholesale price list to configure your order.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 px-5 py-2.5 rounded-lg bg-[#B91C1C] hover:bg-[#991b1b] text-white font-bold text-xs shadow-sm transition-colors"
                    >
                      Browse Price List
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item.cracker.id}
                      className="p-3.5 rounded-lg bg-white border border-slate-200 flex gap-3 items-center justify-between shadow-xs"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                        <Image
                          src={item.cracker.image}
                          alt={item.cracker.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.cracker.name}
                        </h4>
                        <span className="text-[11px] text-slate-600 block mt-0.5 font-mono">
                          {item.cracker.packSize}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-xs font-bold font-mono text-slate-900">
                            ₹{item.cracker.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Stepper with Modern Clean Buttons (8px Radius) */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-white border border-slate-300">
                          <button
                            onClick={() => updateQuantity(item.cracker.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center font-bold text-xs transition-colors"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold font-mono text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cracker.id, 1)}
                            className="w-6 h-6 rounded-lg bg-[#B91C1C] hover:bg-[#991b1b] text-white flex items-center justify-center font-bold text-xs shadow-xs transition-colors"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>

                        <span className="text-xs font-bold font-mono text-[#B91C1C]">
                          ₹{item.itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Form */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-slate-200 bg-white space-y-4">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-xs font-bold uppercase text-slate-700">
                      Total Amount
                    </span>
                    <span className="text-xl font-black text-slate-900 font-mono">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Customer Details Form (8px Radius, Pure White Inputs, Zero Cement) */}
                  <form onSubmit={handleWhatsAppCheckout} className="space-y-2.5">
                    {errorMsg && (
                      <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                        {errorMsg}
                      </div>
                    )}

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20 text-xs text-slate-900 placeholder-slate-500 outline-none font-medium transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone / WhatsApp Number *"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20 text-xs text-slate-900 placeholder-slate-500 outline-none font-medium transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20 text-xs text-slate-900 placeholder-slate-500 outline-none font-medium transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-slate-700">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <textarea
                        required
                        rows={2}
                        value={exactAddress}
                        onChange={(e) => setExactAddress(e.target.value)}
                        placeholder="Exact Delivery Address *"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20 text-xs text-slate-900 placeholder-slate-500 outline-none resize-none font-medium transition-colors"
                      />
                    </div>

                    {/* DIRECT BUTTON: ORDER ON WHATSAPP (8px Radius) */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full h-11 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 mt-1"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                      <span>Order on WhatsApp</span>
                    </motion.button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
