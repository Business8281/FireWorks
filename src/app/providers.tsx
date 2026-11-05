'use client';

import React from 'react';
import { CrackerProvider } from '@/context/CrackerContext';
import { CartProvider } from '@/context/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CrackerProvider>
      <CartProvider>{children}</CartProvider>
    </CrackerProvider>
  );
}

