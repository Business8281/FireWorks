'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCrackers } from './CrackerContext';
import { CrackerItem } from '@/types/cracker';
import confetti from 'canvas-confetti';

export interface CartItemDetail {
  cracker: CrackerItem;
  quantity: number;
  itemTotal: number;
}

interface CartContextType {
  cart: Record<string, number>;
  cartItems: CartItemDetail[];
  totalCount: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  updateQuantity: (id: string, delta: number) => void;
  setItemQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkoutWhatsApp: (customerName?: string, deliveryCity?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ignis_pyro_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { crackers, whatsAppPhone } = useCrackers();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load cart', e);
    }
  }, []);

  // Save cart
  const saveCart = (newCart: Record<string, number>) => {
    setCart(newCart);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const cracker = crackers.find((c) => c.id === id);
    if (!cracker || (!cracker.isAvailable && delta > 0)) {
      return;
    }

    const current = cart[id] || 0;
    const nextQty = Math.max(0, current + delta);

    const nextCart = { ...cart };
    if (nextQty === 0) {
      delete nextCart[id];
    } else {
      nextCart[id] = nextQty;
    }
    saveCart(nextCart);
  };

  const setItemQuantity = (id: string, quantity: number) => {
    const cracker = crackers.find((c) => c.id === id);
    if (!cracker || (!cracker.isAvailable && quantity > 0)) {
      return;
    }

    const nextQty = Math.max(0, quantity);
    const nextCart = { ...cart };
    if (nextQty === 0) {
      delete nextCart[id];
    } else {
      nextCart[id] = nextQty;
    }
    saveCart(nextCart);
  };

  const removeFromCart = (id: string) => {
    const nextCart = { ...cart };
    delete nextCart[id];
    saveCart(nextCart);
  };

  const clearCart = () => {
    saveCart({});
  };

  // Compile full cart details
  const cartItems: CartItemDetail[] = Object.entries(cart)
    .map(([id, qty]) => {
      const cracker = crackers.find((c) => c.id === id);
      if (!cracker) return null;
      return {
        cracker,
        quantity: qty,
        itemTotal: cracker.price * qty,
      };
    })
    .filter((item): item is CartItemDetail => item !== null && item.quantity > 0);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);

  const checkoutWhatsApp = (customerName?: string, deliveryCity?: string) => {
    if (cartItems.length === 0) return;

    // Trigger celebratory sparkler confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
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
    msg += `📋 *Ref ID:* #${orderId}\n`;
    msg += `📅 *Date:* ${dateStr}\n`;
    if (customerName?.trim()) {
      msg += `👤 *Client / Org:* ${customerName.trim()}\n`;
    }
    if (deliveryCity?.trim()) {
      msg += `📍 *Destination:* ${deliveryCity.trim()}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `*SELECTED FIRECRACKERS MANIFEST:*\n`;

    cartItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.cracker.name}*\n`;
      msg += `   └ SKU: ${item.cracker.sku} | ${item.cracker.packSize}\n`;
      msg += `   └ Qty: *${item.quantity}* × ₹${item.cracker.price.toFixed(2)} = *₹${item.itemTotal.toFixed(2)}*\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📦 *Total Items:* ${totalCount} items\n`;
    msg += `💳 *TOTAL AMOUNT:* ₹${totalAmount.toFixed(2)}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `💬 _Please verify stock reservation, batch certification & dispatch schedule._`;

    const encoded = encodeURIComponent(msg);
    const targetPhone = whatsAppPhone.replace(/[^\d]/g, '');
    const url = `https://wa.me/${targetPhone}?text=${encoded}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        totalCount,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        setItemQuantity,
        removeFromCart,
        clearCart,
        checkoutWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

