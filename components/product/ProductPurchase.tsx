"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { packs } from "@/lib/pricing";
import { PackSelector } from "./PackSelector";
import { Price } from "./Price";
import { AddToCartButton } from "./AddToCartButton";

/** Pack selector, price and add button for the product page. */
export function ProductPurchase({ product }: { product: Product }) {
  const [pack, setPack] = useState(0);
  return (
    <div className="mt-6 grid max-w-[420px] gap-4 rounded-[24px] bg-kernel p-5 text-ink">
      {!product.fixedPrice && <PackSelector value={pack} onChange={setPack} size="lg" />}
      <div className="flex items-center justify-between gap-3">
        <Price product={product} packIndex={pack} className="text-[34px]" />
        <AddToCartButton
          productId={product.id}
          packIndex={pack}
          label={product.fixedPrice ? "Add to cart" : `Add ${packs[pack].label}`}
        />
      </div>
    </div>
  );
}
