import { products, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

/** Same category first (closest in popularity), topped up from the rest. */
export function relatedTo(product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.id !== product.id);
  const score = (p: Product) => (p.category === product.category ? 1000 : 0) + p.popularity;
  return others.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export function RelatedProducts({ product }: { product: Product }) {
  const related = relatedTo(product);
  return (
    <section className="wrap pb-[clamp(48px,7vw,96px)]" aria-labelledby="related-title">
      <h2 id="related-title" className="mb-6 text-[clamp(30px,3.6vw,44px)]">
        You may also like
      </h2>
      <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(248px,1fr))] max-[560px]:grid-cols-1 max-[560px]:min-[400px]:grid-cols-2 max-[560px]:min-[400px]:gap-2.5">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
