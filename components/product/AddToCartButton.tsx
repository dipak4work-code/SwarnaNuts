"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { buttonClass } from "@/components/ui/buttons";

interface Props {
  productId: number;
  packIndex?: number;
  label?: string;
  doneLabel?: string;
  variant?: "card" | "gold" | "ink";
  className?: string;
}

export function AddToCartButton({
  productId,
  packIndex = 0,
  label = "Add to cart",
  doneLabel = "Added",
  variant = "card",
  className = "",
}: Props) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const style =
    variant === "card"
      ? `min-w-[118px] rounded-pill px-[18px] py-[11px] text-[15px] font-bold transition-colors ${
          done ? "bg-swarna text-ink" : "bg-ink text-kernel hover:bg-leaf"
        }`
      : buttonClass(variant);

  return (
    <button
      type="button"
      className={`${style} ${className}`}
      onClick={() => {
        add(productId, packIndex);
        setDone(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setDone(false), 1100);
      }}
    >
      <span aria-live="polite">{done ? doneLabel : label}</span>
    </button>
  );
}
