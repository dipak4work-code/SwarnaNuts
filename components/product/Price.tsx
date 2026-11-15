import type { Product } from "@/data/products";
import { mrpOf, priceOf, rupees } from "@/lib/pricing";

export function Price({ product, packIndex, className = "text-[28px]" }: { product: Product; packIndex: number; className?: string }) {
  return (
    <div className={`font-display leading-none tabular-nums ${className}`}>
      {rupees(priceOf(product, packIndex))}
      <s className="ml-1.5 font-body text-sm text-on-kernel-soft">{rupees(mrpOf(product, packIndex))}</s>
    </div>
  );
}
