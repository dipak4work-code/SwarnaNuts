"use client";

import { useRef, useState } from "react";
import { grades, kernelScale, kernelsPerHandful } from "@/data/grades";
import { products } from "@/data/products";
import { rupees } from "@/lib/pricing";
import { GOLDEN_ANGLE } from "@/components/art/pile";
import { AddToCartButton } from "@/components/product/AddToCartButton";

const MAX_KERNELS = kernelsPerHandful(Math.max(...grades.map((g) => g.count)));
const R = 150;
const CENTRE = 210;

function kernelStyle(j: number, n: number, scale: number): React.CSSProperties {
  if (j >= n) return { transform: `translate(${CENTRE}px,${CENTRE}px) rotate(0deg) scale(0)`, opacity: 0 };
  const r = R * Math.sqrt((j + 0.5) / n);
  const a = j * GOLDEN_ANGLE;
  return {
    transform: `translate(${(CENTRE + r * Math.cos(a)).toFixed(1)}px,${(CENTRE + r * Math.sin(a)).toFixed(1)}px) rotate(${(j * 73) % 360}deg) scale(${scale.toFixed(3)})`,
    opacity: 1,
  };
}

export function GradeExplorer() {
  const [index, setIndex] = useState(2); // W240, the bestseller
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const grade = grades[index];
  const n = kernelsPerHandful(grade.count);
  const scale = 1.02 * kernelScale(grade.count);
  const product = products.find((p) => p.subcategory === grade.code && p.category === "whole")!;

  const move = (to: number) => {
    const i = Math.max(0, Math.min(grades.length - 1, to));
    setIndex(i);
    tabs.current[i]?.focus();
  };

  return (
    <div className="rounded-panel border border-leaf-line bg-leaf-deep p-[clamp(16px,2.4vw,28px)]">
      <div className="relative mx-auto max-w-[440px]">
        <svg viewBox="0 0 420 420" role="img" aria-labelledby="plate-label" className="h-auto w-full">
          <title id="plate-label">{`A 28 gram handful of cashews at grade ${grade.code}`}</title>
          <circle cx="210" cy="214" r="200" fill="#051A14" opacity=".55" />
          <circle cx="210" cy="210" r="200" fill="url(#g-bowl)" />
          <circle cx="210" cy="210" r="186" fill="none" stroke="#E9B23C" strokeOpacity=".5" strokeWidth="1.5" />
          <g>
            {Array.from({ length: MAX_KERNELS }, (_, j) => (
              <g key={j} className="plate-kernel" style={kernelStyle(j, n, scale)}>
                <use href="#kern" style={{ animationDelay: `${j * 35}ms` }} />
              </g>
            ))}
          </g>
        </svg>
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
