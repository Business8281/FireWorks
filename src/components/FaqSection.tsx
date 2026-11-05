'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Flame } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useCrackers } from '@/context/CrackerContext';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What is the minimum order quantity for wholesale dispatch?',
    answer:
      'For Telangana and Andhra Pradesh destinations, our minimum order value is ₹3,000.00. For all other Indian states, the minimum booking amount is ₹5,000.00. This ensures compliant parcel dispatch through registered transport agencies directly from our central Hyderabad depot.',
  },
  {
    question: 'How are firecrackers safely transported to my location?',
    answer:
      'Under the Indian Explosives Act, fireworks cannot be sent via standard commercial air couriers or postal delivery. Orders are dispatched through certified hazardous-cargo road logistics trucks to your nearest regional transport booking office, from where you can collect your parcels.',
  },
  {
    question: 'Are all fireworks legal and PESO Green Certified?',
    answer:
      'Yes, 100% of our products are manufactured adhering to CSIR-NEERI and Petroleum and Explosives Safety Organisation (PESO) green firecracker specifications, containing zero barium nitrate salts with QR codes for authenticity verification.',
  },
  {
    question: 'How does the WhatsApp order process work?',
    answer:
      'Simply choose your required items and quantities from our online price list table, fill in your delivery details, and click "Order on WhatsApp". An itemized manifest with your order ID is generated instantly, and our Hyderabad trade desk confirms your stock and dispatch schedule.',
  },
  {
    question: 'Why is Cash on Delivery (COD) not available?',
    answer:
      'Specialized explosive goods carriers and transport agencies do not support COD collection facilities due to hazardous transit legal compliances. All orders are confirmed via advance bank transfer or UPI before truck dispatch.',
  },
  {
    question: 'What are the estimated delivery timelines for Diwali 2026?',
    answer:
      'Telangana orders arrive within 24 hours (with same-day dispatch across Hyderabad and Secunderabad). Andhra Pradesh orders arrive in 24 to 48 hours. Neighboring states (Karnataka, Tamil Nadu, Maharashtra) take 2 to 3 days. Central and North Indian states take 4 to 6 days.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { whatsAppPhone } = useCrackers();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white border-t border-slate-200 scroll-mt-24">
      <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="text-center mb-10">
          {/* Eyebrow matching navbar brand flame and crimson theme */}
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B91C1C] uppercase tracking-widest font-mono">
            <Flame className="w-3.5 h-3.5 text-[#B91C1C] fill-[#B91C1C]" />
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tracking-tight">
            Wholesale Ordering &amp; <span className="text-[#B91C1C]">Dispatch FAQ</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-xl mx-auto">
            Everything you need to know about our Hyderabad depot direct booking, transport logistics, and legal compliance.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-xl bg-white border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#B91C1C]/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                    isOpen ? 'bg-red-50/20' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <span
                    className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                      isOpen ? 'text-[#B91C1C]' : 'text-slate-900'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-red-50 text-[#B91C1C] border-red-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-red-100/60 bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Callout Box matching navbar Let's Talk CTA */}
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E00] via-[#FF3B00] to-[#E60000] flex items-center justify-center text-white shrink-0 shadow-md shadow-orange-500/20">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Have more questions regarding wholesale dispatch?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Our Hyderabad depot trade desk is active 365 days a year to assist you.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsAppPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hello IGNIS Fireworks Hyderabad, I have a question regarding wholesale orders.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 sm:h-10 px-4 rounded-full border border-emerald-600/80 bg-white hover:bg-emerald-50 text-slate-900 font-bold text-xs tracking-wide shadow-xs transition-colors shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
            <span>Let&apos;s Talk on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
