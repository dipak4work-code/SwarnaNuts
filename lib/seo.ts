import { siteConfig } from "@/config/site";
import type { Product } from "@/data/products";
import { packs, priceOf } from "@/lib/pricing";

/** Absolute URL for a path, or the path itself while no siteUrl is configured. */
export const absoluteUrl = (path: string) => `${siteConfig.siteUrl}${path}`;

export function productJsonLd(product: Product) {
  const url = absoluteUrl(`/products/${product.slug}/`);
  const offer = (price: number, name?: string) => ({
    "@type": "Offer",
    ...(name ? { name } : {}),
    priceCurrency: "INR",
    price,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    url,
  });
  const prices = product.fixedPrice ? [priceOf(product)] : packs.map((_, i) => priceOf(product, i));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: `SK-${product.id}`,
    category: product.category,
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.image ? { image: absoluteUrl(product.image) } : {}),
    url,
    offers: product.fixedPrice
      ? offer(prices[0])
      : {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: Math.min(...prices),
          highPrice: Math.max(...prices),
          offerCount: packs.length,
          offers: packs.map((p, i) => offer(prices[i], p.label)),
        },
  };
}
