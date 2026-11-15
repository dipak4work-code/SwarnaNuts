"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { productById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { packs, priceOf, rupees } from "@/lib/pricing";
import { waLink } from "@/lib/whatsapp";
import { ProductArt } from "@/components/art/ProductArt";
import { WhatsAppLink } from "@/components/ui/buttons";

const FOCUSABLE = 'button:not([disabled]), a[href], input, select, [tabindex]:not([tabindex="-1"])';

export function CartDrawer() {
  const cart = useCart();
  const { isOpen, close, lines, subtotal, deliveryFee, total, remainingForFree } = cart;
  const drawer = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    opener.current = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !drawer.current) return;
      const items = Array.from(drawer.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getAttribute("aria-disabled") !== "true" || el.tagName === "BUTTON",
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener.current?.focus();
    };
  }, [isOpen, close]);

  const rows = lines.flatMap((l, i) => {
    const p = productById(l.productId);
    if (!p) return [];
    const size = p.fixedPrice ? "" : `, ${packs[l.packIndex].label}`;
    return [`${i + 1}. ${p.name}${size} x ${l.qty} = ${rupees(priceOf(p, l.packIndex) * l.qty)}`];
  });
  const href = lines.length
    ? waLink(
        `Hello ${siteConfig.name}, I would like to order:\n\n${rows.join("\n")}\n\nSubtotal: ${rupees(subtotal)}\nDelivery: ${
          deliveryFee ? rupees(deliveryFee) : "Free"
        }\nTotal: ${rupees(total)}\n\nName:\nAddress:\nPIN code:`,
      )
    : null;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-shade transition-opacity duration-[250ms] ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        ref={drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(440px,100%)] flex-col bg-kernel text-ink transition-transform duration-[320ms] ease-drawer ${
          isOpen ? "visible translate-x-0" : "invisible translate-x-[102%]"
        }`}
      >
        <div className="flex items-center justify-between px-[22px] py-5">
          <h2 id="cart-title" className="text-[30px]">
            Your cart
          </h2>
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="size-10 rounded-full bg-kernel-shade text-[22px] leading-none"
          >
            ×
          </button>
        </div>

        {lines.length > 0 && (
          <div className="mx-[22px] mb-2 text-[15px] font-semibold">
            {remainingForFree > 0 ? `Add ${rupees(remainingForFree)} more for free delivery` : "You have free delivery"}
            <div className="mt-2 h-2 overflow-hidden rounded-lg bg-kernel-shade">
              <i
                className="block h-full rounded-lg bg-leaf transition-[width] duration-[400ms]"
                style={{ width: `${Math.min(100, (subtotal / siteConfig.freeDeliveryFrom) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-[22px] py-1.5">
          {lines.length ? (
            lines.map((l) => {
              const p = productById(l.productId);
              if (!p) return null;
              return (
                <div key={l.key} className="grid grid-cols-[60px_1fr_auto] items-center gap-3.5 border-b border-kernel-shade py-3.5">
                  <ProductArt product={p} sizes="60px" />
                  <div>
                    <strong className="block leading-tight">{p.name}</strong>
                    <span className="text-sm text-on-kernel-soft">
                      {p.fixedPrice ? "Gift box" : packs[l.packIndex].label}, {rupees(priceOf(p, l.packIndex))} each
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rounded-pill bg-kernel-shade p-[3px] font-bold tabular-nums">
                    <button
                      type="button"
                      onClick={() => cart.change(l.key, -1)}
                      aria-label={`Remove one ${p.name}`}
                      className="size-[30px] rounded-full bg-kernel text-lg leading-none"
                    >
                      −
                    </button>
                    <em className="min-w-[22px] text-center not-italic" aria-live="polite">
                      {l.qty}
                    </em>
                    <button
                      type="button"
                      onClick={() => cart.change(l.key, 1)}
                      aria-label={`Add one ${p.name}`}
                      className="size-[30px] rounded-full bg-kernel text-lg leading-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-2.5 py-14 text-center text-on-kernel-soft">
              Your cart is empty.
              <br />
              Add a pack from the shop to start an order.
            </div>
          )}
        </div>

        <div className="grid gap-1.5 border-t border-kernel-shade px-[22px] pb-[22px] pt-[18px]">
          <div className="flex justify-between text-base text-on-kernel-soft tabular-nums">
            <span>Subtotal</span>
            <span>{rupees(subtotal)}</span>
          </div>
          <div className="flex justify-between text-base text-on-kernel-soft tabular-nums">
            <span>Delivery</span>
            <span>{!subtotal ? rupees(0) : deliveryFee ? rupees(deliveryFee) : "Free"}</span>
          </div>
          <div className="mb-2.5 flex justify-between text-xl font-bold tabular-nums">
            <span>Total</span>
            <span>{rupees(total)}</span>
          </div>
          {lines.length ? (
            <WhatsAppLink href={href} variant="whatsapp" disabledLabel="WhatsApp number not set yet">
              Order on WhatsApp
            </WhatsAppLink>
          ) : (
            <button
              type="button"
              aria-disabled="true"
              className="w-full cursor-not-allowed rounded-pill bg-kernel-shade px-[26px] py-3.5 text-[17px] font-bold text-on-kernel-soft"
            >
              Add a pack to order
            </button>
          )}
          <small className="text-center text-[13px] text-on-kernel-soft">
            Opens WhatsApp with your order written out. You add your address and press send.
          </small>
        </div>
      </aside>
    </>
  );
}
