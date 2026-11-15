"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { ProductArt } from "@/components/art/ProductArt";
import { PackSelector } from "./PackSelector";
import { Price } from "./Price";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const [pack, setPack] = useState(0);
  const isWhole = product.category === "whole";

  return (
    <article className="group relative flex flex-col gap-3 rounded-[24px] bg-kernel p-[14px] text-ink max-[560px]:min-[400px]:rounded-[18px] max-[560px]:min-[400px]:p-2.5">
      <Link href={`/products/${product.slug}/`} tabIndex={-1} aria-hidden="true" className="block">
        {product.image ? (
          <ProductArt product={product} className="transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <ProductArt
            product={product}
            className="rounded-2xl bg-kernel-shade px-[22%] py-[14px] transition-[padding] duration-300 group-hover:px-[19%]"
          />
        )}
      </Link>
      {product.badge && (
        <span
          className={`absolute left-6 top-6 rounded-pill px-2.5 py-[3px] text-[13px] font-bold ${
            product.badgeHot ? "bg-apple text-white" : "bg-ink text-kernel"
          } max-[560px]:min-[400px]:left-4 max-[560px]:min-[400px]:top-4`}
        >
          {product.badge}
        </span>
      )}
      <div>
        <h3 className="text-[23px] max-[560px]:min-[400px]:text-[19px]">
          <Link href={`/products/${product.slug}/`} className="no-underline hover:underline">
            {product.name}
          </Link>
        </h3>
        {isWhole && (
          <div className="text-sm font-semibold text-swarna-ink tabular-nums">
            About {product.subcategory.slice(1)} kernels per pound
          </div>
        )}
      </div>
      <p className="flex-1 text-[15px] leading-[1.4] text-on-kernel-soft max-[560px]:min-[400px]:hidden">
        {product.description}
      </p>
      {!product.fixedPrice && <PackSelector value={pack} onChange={setPack} />}
      <div className="flex items-center justify-between gap-2.5 max-[560px]:min-[400px]:flex-col max-[560px]:min-[400px]:items-stretch">
        <Price product={product} packIndex={pack} />
        <AddToCartButton productId={product.id} packIndex={pack} />
      </div>
    </article>
  );
}
