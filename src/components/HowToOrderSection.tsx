'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, MapPin, MessageCircle, Flame } from 'lucide-react';

export default function HowToOrderSection() {
  const steps = [
    {
      step: '01',
      title: 'Select From Price List',
      desc: 'Browse our online wholesale price list table. Use the search bar or category filters to find products and tap (+) to specify your counts.',
      icon: ClipboardList,
    },
    {
      step: '02',
      title: 'Enter Delivery Information',
      desc: 'Open your cart and provide your contact phone number, valid email, and exact physical delivery destination for parcel booking.',
      icon: MapPin,
    },
    {
      step: '03',
      title: 'Dispatch on WhatsApp',
      desc: 'Click "Order on WhatsApp" to send a pre-formatted manifest directly to our Hyderabad booking desk for instant confirmation & express truck loading.',
      icon: MessageCircle,
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Eyebrow matching navbar theme */}
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B91C1C] uppercase tracking-widest font-mono">
            <Flame className="w-3.5 h-3.5 text-[#B91C1C] fill-[#B91C1C]" />
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            How to Book <span className="text-[#B91C1C]">Wholesale Fireworks</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mt-2">
            Direct Hyderabad wholesale ordering with factory pricing and zero middleman commissions.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#B91C1C]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E00] via-[#FF3B00] to-[#E60000] text-white flex items-center justify-center font-mono font-black text-sm shadow-md shadow-orange-500/20">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#B91C1C] border border-red-100 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
