"use client";

import { categories, type CategoryId } from "@/data/categories";
import { products } from "@/data/products";
import { ProductArt } from "@/components/art/ProductArt";

export function CategoryTiles({ onPick }: { onPick: (id: CategoryId) => void }) {
  return (
    <div className="grid grid-cols-5 gap-3.5 pb-[clamp(40px,6vw,72px)] max-[1000px]:grid-cols-3 max-[560px]:grid-cols-2">
      {categories.map((c) => {
        const first = products.find((p) => p.category === c.id)!;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onPick(c.id)}
            className="grid grid-cols-[64px_1fr] items-center gap-3.5 rounded-[20px] border border-leaf-line px-4 py-3.5 text-left transition-colors hover:border-swarna hover:bg-leaf-deep max-[560px]:grid-cols-[44px_1fr] max-[560px]:gap-2.5 max-[560px]:px-3 max-[560px]:py-2.5"
          >
            <ProductArt product={first} sizes="64px" />
            <span>
              <strong className="block text-[17px] font-bold leading-tight">{c.name}</strong>
              <span className="text-sm text-on-leaf-soft">{c.note}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
