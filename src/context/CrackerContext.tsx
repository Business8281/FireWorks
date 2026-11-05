'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CrackerItem } from '@/types/cracker';
import { DEFAULT_CRACKERS } from '@/data/defaultCrackers';

interface CrackerContextType {
  crackers: CrackerItem[];
  toggleStock: (id: string) => void;
  setStock: (id: string, isAvailable: boolean) => void;
  resetToDefaults: () => void;
  whatsAppPhone: string;
  setWhatsAppPhone: (phone: string) => void;
  totalAvailable: number;
  totalOutOfStock: number;
}

const CrackerContext = createContext<CrackerContextType | undefined>(undefined);

const STORAGE_KEY_ITEMS = 'ignis_pyro_catalog_v1';
export const HARDCODED_WHATSAPP_PHONE = '919876543210';

export function CrackerProvider({ children }: { children: React.ReactNode }) {
  const [crackers, setCrackers] = useState<CrackerItem[]>(DEFAULT_CRACKERS);
  const whatsAppPhone = HARDCODED_WHATSAPP_PHONE;
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (savedItems) {
        const parsed = JSON.parse(savedItems);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCrackers(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved crackers from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to LocalStorage
  const saveCrackers = (updated: CrackerItem[]) => {
    setCrackers(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(updated));
      // Dispatch custom event for cross-tab or in-page listeners
      window.dispatchEvent(new Event('ignis-catalog-updated'));
    } catch (e) {
      console.error('Failed to write to localStorage', e);
    }
  };

  const toggleStock = (id: string) => {
    setCrackers((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      );
      try {
        localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const setStock = (id: string, isAvailable: boolean) => {
    setCrackers((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, isAvailable } : item
      );
      try {
        localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const resetToDefaults = () => {
    saveCrackers(DEFAULT_CRACKERS);
  };

  const setWhatsAppPhone = (phone: string) => {
    // WhatsApp phone is hardcoded to customer pages
  };

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_ITEMS && e.newValue) {
        try {
          setCrackers(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const totalAvailable = crackers.filter((c) => c.isAvailable).length;
  const totalOutOfStock = crackers.filter((c) => !c.isAvailable).length;

  return (
    <CrackerContext.Provider
      value={{
        crackers,
        toggleStock,
        setStock,
        resetToDefaults,
        whatsAppPhone,
        setWhatsAppPhone,
        totalAvailable,
        totalOutOfStock,
      }}
    >
      {children}
    </CrackerContext.Provider>
  );
}

export function useCrackers() {
  const context = useContext(CrackerContext);
  if (!context) {
    throw new Error('useCrackers must be used within a CrackerProvider');
  }
  return context;
}

