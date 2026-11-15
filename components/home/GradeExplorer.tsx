"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { grades, kernelsPerHandful } from "@/data/grades";
import { products } from "@/data/products";
import { rupees } from "@/lib/pricing";
import { AddToCartButton } from "@/components/product/AddToCartButton";

export function GradeExplorer() {
  const [index, setIndex] = useState(2); // W240, the bestseller
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const grade = grades[index];
  const n = kernelsPerHandful(grade.count);
  const product = products.find((p) => p.subcategory === grade.code && p.category === "whole")!;

  const move = (to: number) => {
    const i = Math.max(0, Math.min(grades.length - 1, to));
    setIndex(i);
    tabs.current[i]?.focus();
  };

  return (
    <div className="rounded-panel border border-leaf-line bg-leaf-deep p-[clamp(16px,2.4vw,28px)]">
      <div className="relative mx-auto aspect-square w-full max-w-[440px]">
        <div className="absolute inset-0 rounded-full bg-[#051a14]/55 translate-y-1" aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden rounded-full border border-swarna/50 bg-leaf-deep">
          {grades.map((g, i) => (
            <Image
              key={g.code}
              src={`/grades/${g.code.toLowerCase()}.webp`}
              alt={i === index ? `A bowl of ${g.code} whole cashews` : ""}
              aria-hidden={i === index ? undefined : true}
              fill
              sizes="(max-width: 820px) 90vw, 440px"
              priority={i === 2}
              className={`origin-[50%_12%] scale-[1.3] object-cover transition-[opacity,transform] duration-500 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Cashew grade"
        className="mt-2 grid grid-cols-5 gap-1.5 rounded-2xl bg-leaf p-1.5"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); move(index + 1); }
          else if (e.key === "ArrowLeft") { e.preventDefault(); move(index - 1); }
          else if (e.key === "Home") { e.preventDefault(); move(0); }
          else if (e.key === "End") { e.preventDefault(); move(grades.length - 1); }
        }}
      >
        {grades.map((g, i) => (
          <button
            key={g.code}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`grade-tab-${g.code}`}
            aria-selected={i === index}
            aria-controls="grade-readout"
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            className={`rounded-[11px] px-1 py-2.5 text-[17px] font-bold tabular-nums transition-colors ${
              i === index ? "bg-kernel text-ink" : "text-on-leaf-soft hover:text-kernel"
            }`}
          >
            {g.code}
          </button>
        ))}
      </div>
      <div className="flex justify-between px-2.5 pt-1.5 text-[13px] text-on-leaf-soft" aria-hidden="true">
        <span>Biggest kernels</span>
        <span>Smallest kernels</span>
      </div>

      <div
        id="grade-readout"
        role="tabpanel"
        aria-labelledby={`grade-tab-${grade.code}`}
        aria-live="polite"
        className="mt-[18px] grid items-end gap-x-5 gap-y-3.5 border-t border-leaf-line pt-[18px] min-[561px]:grid-cols-[1fr_auto]"
      >
        <div>
          <h2 className="text-[clamp(30px,3.2vw,42px)]">{grade.name}</h2>
          <p className="mt-1.5 max-w-[30em] text-base text-on-leaf-soft">
            About {n} kernels in a 28 g handful. {grade.text}
          </p>
        </div>
        <div className="min-[561px]:text-right">
          <div className="mb-2 text-[15px] text-on-leaf-soft">
            250 g from <b className="font-display text-[26px] font-normal text-kernel">{rupees(product.price)}</b>
          </div>
          <AddToCartButton productId={product.id} variant="gold" label="Add 250 g to cart" doneLabel="Added to cart" />
        </div>
      </div>
    </div>
  );
}
