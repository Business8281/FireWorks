'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  SlidersHorizontal,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Package,
  X,
  Layers,
} from 'lucide-react';
import { useCrackers } from '@/context/CrackerContext';
import { CrackerCategory } from '@/types/cracker';

export default function AdminPage() {
  const {
    crackers,
    toggleStock,
    setStock,
    resetToDefaults,
    totalAvailable,
    totalOutOfStock,
  } = useCrackers();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CrackerCategory>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'outofstock'>('all');

  // Filter crackers
  const filteredCrackers = crackers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'available'
        ? c.isAvailable
        : !c.isAvailable;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSetAll = (available: boolean) => {
    crackers.forEach((c) => setStock(c.id, available));
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5E00] via-[#FF3B00] to-[#B91C1C] flex items-center justify-center text-white shadow-xs shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate">
                Inventory &amp; Stock Portal
              </h1>
              <p className="text-[11px] text-slate-700 truncate font-medium">
                Toggle customer stock availability in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="h-9 px-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span className="hidden sm:inline">Preview Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 w-full flex-1 space-y-6">
        {/* Top 3 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Total Products */}
          <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                Total Products
              </span>
              <div className="text-3xl font-black font-mono text-slate-900 mt-1">
                {crackers.length}
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Catalog pyrotechnic items
              </p>
            </div>
            <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Available In Stock */}
          <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                Available In Stock
              </span>
              <div className="text-3xl font-black font-mono text-emerald-600 mt-1">
                {totalAvailable}
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">
                {Math.round((totalAvailable / (crackers.length || 1)) * 100)}% inventory online
              </p>
            </div>
            <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Out of Stock */}
          <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                Out of Stock
              </span>
              <div className="text-3xl font-black font-mono text-rose-600 mt-1">
                {totalOutOfStock}
              </div>
              <p className="text-xs text-rose-700 font-medium mt-0.5">
                Cart addition disabled
              </p>
            </div>
            <div className="w-11 h-11 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Actions Toolbar */}
        <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-3.5">
          {/* Top Row: Search Input + Batch Actions */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, SKU, or category..."
                className="w-full pl-10 pr-9 py-2 rounded-lg bg-slate-50 hover:bg-white border border-slate-300 focus:border-slate-900 focus:bg-white text-xs text-slate-900 placeholder-slate-600 outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Actions Group */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleSetAll(true)}
                className="h-8 px-3 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Mark All Available</span>
              </button>

              <button
                onClick={() => handleSetAll(false)}
                className="h-8 px-3 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Mark All Out of Stock</span>
              </button>

              <button
                onClick={resetToDefaults}
                className="h-8 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                title="Reset stock to initial catalog state"
              >
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Subtle Divider */}
          <div className="h-px bg-slate-100" />

          {/* Bottom Row: Category Filters + Status Segmented Control */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  'All',
                  'Ground Spinners',
                  'Sound & Crackle',
                  'Sparklers & Flares',
                  'Fountains & Cones',
                  'Sky Rockets',
                  'Aerial Cakes',
                  'Executive Hampers',
                ] as CrackerCategory[]
              ).map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#B91C1C] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Status Segmented Control */}
            <div className="inline-flex items-center p-1 bg-slate-100/90 rounded-lg border border-slate-200 shrink-0 self-start lg:self-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                All ({crackers.length})
              </button>
              <button
                onClick={() => setStatusFilter('available')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === 'available'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    statusFilter === 'available' ? 'bg-white' : 'bg-emerald-500'
                  }`}
                />
                <span>In Stock ({totalAvailable})</span>
              </button>
              <button
                onClick={() => setStatusFilter('outofstock')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === 'outofstock'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    statusFilter === 'outofstock' ? 'bg-white' : 'bg-rose-500'
                  }`}
                />
                <span>Out of Stock ({totalOutOfStock})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Master Stock Matrix Table */}
        <div className="rounded-lg bg-white border border-slate-200 overflow-hidden shadow-xs">
          {/* Table Header Bar */}
          <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Product Stock Switch Matrix
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-800 text-[10px] font-mono font-bold">
                  {filteredCrackers.length} {filteredCrackers.length === 1 ? 'Product' : 'Products'} Listed
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Toggle products to instantly update their availability across the customer store & cart
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Live in Store</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span>Disabled / Out of Stock</span>
              </span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {filteredCrackers.length === 0 ? (
              <div className="p-12 text-center text-slate-600 text-xs">
                <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-slate-700">No products match your search or filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setStatusFilter('all');
                  }}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredCrackers.map((cracker) => {
                const isAvail = cracker.isAvailable;
                return (
                  <div
                    key={cracker.id}
                    className="p-4 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Left: Thumbnail + Name + Category + Price */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <Image
                          src={cracker.image}
                          alt={cracker.name}
                          fill
                          className={`object-cover ${!isAvail ? 'grayscale opacity-60' : ''}`}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase border border-slate-200/70">
                            {cracker.sku}
                          </span>
                          <span className="text-[11px] font-medium text-slate-600">
                            {cracker.category}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[11px] text-slate-600">
                            {cracker.packSize}
                          </span>
                        </div>

                        <h3 className={`text-sm font-bold tracking-tight truncate mt-0.5 ${isAvail ? 'text-slate-900' : 'text-slate-600 line-through'}`}>
                          {cracker.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-slate-900 font-mono">
                            ₹{cracker.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-600 font-medium">
                            / unit
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status Pill Badge + Live Toggle Switch */}
                    <div className="flex items-center gap-3.5 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-2.5 sm:pt-0 border-slate-100">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-colors ${
                          isAvail
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                            : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                        }`}
                      >
                        {isAvail ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </span>

                      {/* iOS-Style Custom Switch */}
                      <button
                        onClick={() => toggleStock(cracker.id)}
                        className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 ${
                          isAvail ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                        role="switch"
                        aria-checked={isAvail}
                        title={`Click to mark ${isAvail ? 'Out of Stock' : 'In Stock'}`}
                      >
                        <motion.span
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            isAvail ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
