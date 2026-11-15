"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { siteConfig } from "@/config/site";
import { productById } from "@/data/products";
import { packs, priceOf } from "@/lib/pricing";

export interface CartLine {
  key: string;
  productId: number;
  packIndex: number;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  /** False until the saved cart has been read, so an empty first render never overwrites it. */
  hydrated: boolean;
}

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; productId: number; packIndex: number }
  | { type: "change"; key: string; delta: number };

const STORAGE_KEY = "swarna_cart";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, hydrated: true };
    case "add": {
      const product = productById(action.productId);
      if (!product) return state;
      const packIndex = product.fixedPrice ? 0 : action.packIndex;
      const key = `${product.id}-${packIndex}`;
      const exists = state.lines.some((l) => l.key === key);
      return {
        ...state,
        lines: exists
          ? state.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
          : [...state.lines, { key, productId: product.id, packIndex, qty: 1 }],
      };
    }
    case "change":
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.key === action.key ? { ...l, qty: l.qty + action.delta } : l))
          .filter((l) => l.qty > 0),
      };
  }
}

/** Read the saved cart, dropping anything that no longer exists in the catalogue. */
function loadSaved(): CartLine[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(
      (l): l is CartLine =>
        l &&
        typeof l.key === "string" &&
        Number.isInteger(l.qty) &&
        l.qty > 0 &&
        !!productById(l.productId) &&
        !!packs[l.packIndex],
    );
  } catch {
    return [];
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  /** Rupees still needed for free delivery; 0 once reached. */
  remainingForFree: number;
  isOpen: boolean;
  /** Bumps each time an item is added, so the header badge can animate. */
  addedTick: number;
  add: (productId: number, packIndex?: number) => void;
  change: (key: string, delta: number) => void;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], hydrated: false });
  const [isOpen, setOpen] = useState(false);
  const [addedTick, setTick] = useState(0);

  // Read localStorage after mount so server and first client render match.
  useEffect(() => {
    dispatch({ type: "hydrate", lines: loadSaved() });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* storage unavailable (private mode, quota): cart still works for this visit */
    }
  }, [state.lines, state.hydrated]);

  const add = useCallback((productId: number, packIndex = 0) => {
    dispatch({ type: "add", productId, packIndex });
    setTick((t) => t + 1);
  }, []);
  const change = useCallback((key: string, delta: number) => dispatch({ type: "change", key, delta }), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.lines.reduce((t, l) => {
      const p = productById(l.productId);
      return p ? t + priceOf(p, l.packIndex) * l.qty : t;
    }, 0);
    const deliveryFee = !subtotal || subtotal >= siteConfig.freeDeliveryFrom ? 0 : siteConfig.deliveryFee;
    return {
      lines: state.lines,
      count: state.lines.reduce((t, l) => t + l.qty, 0),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      remainingForFree: Math.max(0, siteConfig.freeDeliveryFrom - subtotal),
      isOpen,
      addedTick,
      add,
      change,
      open,
      close,
    };
  }, [state.lines, isOpen, addedTick, add, change, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
