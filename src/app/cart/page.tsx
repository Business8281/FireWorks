'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Phone,
  Mail,
  MapPin,
  User,
  ShoppingBag,
  Info,
  ShieldAlert,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { useCart } from '@/context/CartContext';
import { useCrackers } from '@/context/CrackerContext';
import CompanyHeader from '@/components/CompanyHeader';
import Footer from '@/components/Footer';
import confetti from 'canvas-confetti';

export default function CartPage() {
  const { cartItems, totalCount, totalAmount, updateQuantity, removeFromCart } = useCart();
  const { whatsAppPhone } = useCrackers();

  // Customer details (Strictly NO labels)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [exactAddress, setExactAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isBelowMin = totalAmount < 3000;

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setErrorMsg('Please enter your phone number to proceed.');
      return;
    }
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!exactAddress.trim()) {
      setErrorMsg('Please enter your exact physical delivery address.');
      return;
    }

    setErrorMsg('');

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#B91C1C', '#FF5E00', '#25D366', '#0F172A'],
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
    msg += `💬 _Please verify stock reservation & send payment link._`;

    const encoded = encodeURIComponent(msg);
    const targetPhone = whatsAppPhone.replace(/[^\d]/g, '');
    const url = `https://wa.me/${targetPhone}?text=${encoded}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-x-hidden w-full max-w-full">
      <CompanyHeader />

      <main className="pt-8 pb-20 max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 w-full flex-1 overflow-x-hidden">
        {/* Cart Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Your Cart
            </h1>
            <p className="text-sm text-slate-700 mt-1">
              {totalCount === 1 ? '1 item configured in your cart' : `${totalCount} items configured in your cart`}
            </p>
          </div>

          <Link
            href="/#products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100 font-bold text-xs tracking-wider uppercase transition-all shadow-xs self-start sm:self-auto bg-white"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4 text-[#B91C1C] shadow-xs">
              <ShoppingBag className="w-8 h-8 text-[#B91C1C]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
            <p className="text-sm text-slate-700 mt-1">
              Browse our Diwali wholesale price list and add firecrackers to your cart.
            </p>
            <Link
              href="/#products"
              className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#FF5E00] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20"
            >
              Browse Wholesale Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.cracker.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 sm:p-5 rounded-lg bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-5 transition-all"
                  >
                    {/* Item Image + Details */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0 p-0.5">
                        <Image
                          src={item.cracker.image}
                          alt={item.cracker.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="min-w-0 pr-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug truncate">
                          {item.cracker.name}
                        </h3>
                        <span className="text-xs text-slate-700 font-medium block mt-0.5 font-mono">
                          {item.cracker.packSize}
                        </span>

                        {/* Stepper Buttons (8px Border Radius) */}
                        <div className="mt-3 inline-flex items-center gap-2 p-1 rounded-lg bg-white border border-slate-300">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.cracker.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center font-bold text-xs transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </motion.button>

                          <span className="w-6 text-center text-xs sm:text-sm font-bold text-slate-900 font-mono">
                            {item.quantity}
                          </span>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.cracker.id, 1)}
                            className="w-7 h-7 rounded-lg bg-[#B91C1C] hover:bg-[#991b1b] text-white flex items-center justify-center font-bold text-xs shadow-xs transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Price & Subtotal (NO DISCOUNT / NO MRP) */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                      {/* Unit Price */}
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-600 uppercase font-mono block">
                          PRICE
                        </span>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900 font-mono mt-0.5">
                          ₹{item.cracker.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Line Subtotal & Delete */}
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <span className="text-[10px] text-slate-600 uppercase font-mono block">
                            SUBTOTAL
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[#B91C1C] font-mono mt-0.5 block">
                            ₹{item.itemTotal.toFixed(2)}
                          </span>
                        </div>

                        {/* Trash Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.cracker.id)}
                          className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-red-50 text-slate-600 hover:text-red-600 flex items-center justify-center transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* STORE INFORMATION NOTICE (Pure White, 8px Radius) */}
              <div className="rounded-lg bg-white border border-slate-200 p-5 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#B91C1C] border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <span>Store Information &amp; Booking Guidelines</span>
                      {/* Clean label without background color or border */}
                      <span className="text-xs font-mono text-[#B91C1C] font-bold">
                        Diwali 2026
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      Crackers available 365 days. Minimum order <strong>₹3,000.00</strong> for Telangana & Andhra Pradesh and <strong>₹5,000.00</strong> for other states. Direct WhatsApp manifest dispatch. Cash on Delivery (COD) is not available for licensed transport safety compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card (8px Radius) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 rounded-lg bg-white border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Order Summary
                </h2>

                {/* Price Breakdown (ZERO DISCOUNT MENTIONS) */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-700 font-mono">
                    <span>Items Subtotal</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-slate-700 font-mono">
                    <span>Packing & Handling</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      TOTAL AMOUNT
                    </span>
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Minimum Order Alert */}
                {isBelowMin && (
                  <div className="p-3.5 rounded-lg bg-white border border-amber-300 text-slate-800 text-xs flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Minimum wholesale order amount is <strong>₹3,000.00</strong>. Please add ₹{(3000 - totalAmount).toFixed(2)} more to qualify for dispatch.
                    </span>
                  </div>
                )}

                {/* Customer Details Form (8px Radius, Pure White Inputs, Zero Cement) */}
                <form onSubmit={handleWhatsAppOrder} className="space-y-3 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Customer Delivery Details
                  </span>

                  {errorMsg && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {/* Customer Full Name */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20 focus:outline-none text-xs sm:text-sm text-slate-900 placeholder-slate-500 transition-all font-medium"
                    />
                  </div>

                  {/* Phone Number (Required) */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone / WhatsApp Number *"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20 focus:outline-none text-xs sm:text-sm text-slate-900 placeholder-slate-500 transition-all font-medium"
                    />
                  </div>

                  {/* Email (Required) */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-700">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20 focus:outline-none text-xs sm:text-sm text-slate-900 placeholder-slate-500 transition-all font-medium"
                    />
                  </div>

                  {/* Exact Address (Required) */}
                  <div className="relative">
                    <div className="absolute top-3 left-3.5 pointer-events-none text-slate-700">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <textarea
                      required
                      rows={2}
                      value={exactAddress}
                      onChange={(e) => setExactAddress(e.target.value)}
                      placeholder="Exact Delivery Address (Door No, Street, Landmark, Pin) *"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white border border-slate-300 focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]/20 focus:outline-none text-xs sm:text-sm text-slate-900 placeholder-slate-500 transition-all resize-none font-medium"
                    />
                  </div>

                  {/* DIRECT BUTTON: ORDER ON WHATSAPP (8px Radius) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full h-11 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                    <span>Order on WhatsApp</span>
                  </motion.button>

                  <p className="text-[11px] text-center text-slate-600 font-medium pt-1">
                    Direct instant booking with Hyderabad wholesale dispatch desk
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
