"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { count, open, addedTick } = useCart();
  const badge = useRef<HTMLElement>(null);

  // Replay the bump animation each time something is added.
  useEffect(() => {
    if (!addedTick) return;
    const el = badge.current;
    el?.classList.remove("animate-bump");
    void el?.offsetWidth;
    el?.classList.add("animate-bump");
  }, [addedTick]);

  return (
    <button
      type="button"
      onClick={open}
      aria-haspopup="dialog"
      className="flex items-center gap-2.5 rounded-pill bg-kernel py-2.5 pl-[18px] pr-4 font-bold text-ink"
    >
      Cart
      <b
        ref={badge}
        aria-label={`${count} items`}
        className="grid h-[26px] min-w-[26px] place-items-center rounded-pill bg-ink px-[7px] text-sm text-kernel tabular-nums"
      >
        {count}
      </b>
    </button>
  );
}
