'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ShieldCheck, MapPin, Leaf } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useCrackers } from '@/context/CrackerContext';

export default function Footer() {
  const { whatsAppPhone } = useCrackers();

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 text-xs">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-10 sm:pt-12 pb-28 sm:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info matching Navbar Identity */}
          <div className="md:col-span-2 space-y-3.5">
            <Link
              href="/#home"
              onClick={(e) => scrollTo(e, 'home')}
              className="inline-flex items-center gap-2.5 sm:gap-3 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF5E00] via-[#FF3B00] to-[#E60000] flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
                <Flame className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                    IGNIS
                  </span>
                  <span className="text-base sm:text-lg font-black tracking-tight text-[#B91C1C]">
                    FIREWORKS
                  </span>
                  <span className="text-slate-300 font-light mx-0.5 hidden xs:inline">|</span>
                  <span className="hidden xs:inline-flex items-center gap-1 text-[#B91C1C] text-xs font-extrabold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" strokeWidth={2.2} />
                    <span>HYDERABAD</span>
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                  <Leaf className="w-3 h-3 text-emerald-600 fill-emerald-600/30 shrink-0" />
                  <span>Hyderabad Central Depot • Sivakasi Factory Direct</span>
                </p>
              </div>
            </Link>

            <p className="text-xs text-slate-600 max-w-sm leading-relaxed pt-1">
              Central wholesale distribution depot in Hyderabad, Telangana. Direct Sivakasi factory pricing with express delivery across Telangana & Andhra Pradesh, and nationwide explosive cargo transport.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href={`https://wa.me/${whatsAppPhone.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-600/80 bg-white hover:bg-emerald-50 text-slate-900 text-xs font-bold transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp Desk: +{whatsAppPhone}</span>
              </a>
            </div>
          </div>

          {/* Corporate Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#B91C1C] uppercase tracking-wider font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-slate-700 font-medium">
              <li>
                <a
                  href="/#home"
                  onClick={(e) => scrollTo(e, 'home')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#products"
                  onClick={(e) => scrollTo(e, 'products')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  Wholesale Price List
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  onClick={(e) => scrollTo(e, 'about')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  About Hyderabad Depot
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => scrollTo(e, 'contact')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#B91C1C] transition-colors">
                  Your Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#B91C1C] uppercase tracking-wider font-mono">
              Safety & Regulations
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Always ignite outdoors on flat, open ground under adult supervision. Keep buckets of water and sand nearby. Store fireworks in a dry, ventilated area away from flammable materials.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>100% PESO Green Certified Depot</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits with Developer Hyperlink */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <p>
            © {new Date().getFullYear()} <span className="font-extrabold text-slate-900">IGNIS</span> <span className="font-extrabold text-[#B91C1C]">FIREWORKS</span> Hyderabad. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span>Diwali 2026 Wholesale Booking Portal</span>
            <span className="text-slate-300">•</span>
            <span>
              Developed by{' '}
              <a
                href="https://xrmarketing.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-700 hover:text-[#B91C1C] transition-colors hover:underline"
              >
                XRMarketing
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
