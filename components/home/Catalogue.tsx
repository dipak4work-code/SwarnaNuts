"use client";

import { useCallback, useEffect, useState } from "react";
import { categories, categoryById, type CategoryId } from "@/data/categories";
import { products } from "@/data/products";
import { matchesQuery } from "@/lib/search";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryTiles } from "./CategoryTiles";

type CatFilter = CategoryId | "all";
type Sort = "pop" | "low" | "high";

const pill =
  "whitespace-nowrap rounded-pill border border-leaf-line px-[18px] py-2.5 font-semibold hover:border-on-leaf-soft";
const pillOn = "!border-kernel bg-kernel text-ink";

export function Catalogue() {
  const [cat, setCat] = useState<CatFilter>("all");
  const [sub, setSub] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("pop");

  const pickCategory = useCallback((id: CatFilter, scroll = false) => {
    setCat(id);
    setSub(null);
    if (scroll) document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Footer links use #shop-<category>, which also works when arriving from another page.
  useEffect(() => {
    const apply = () => {
      const m = /^#shop-(\w+)$/.exec(window.location.hash);
      if (m && categoryById(m[1])) pickCategory(m[1] as CategoryId, true);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [pickCategory]);

  const category = cat === "all" ? undefined : categoryById(cat);

  const list = (() => {
    const filtered = products.filter(
      (p) => (cat === "all" || p.category === cat) && (!sub || p.subcategory === sub) && matchesQuery(p, query),
    );
    return filtered.sort(
      sort === "low" ? (a, b) => a.price - b.price : sort === "high" ? (a, b) => b.price - a.price : (a, b) => b.popularity - a.popularity,
    );
  })();

  return (
    <>
      <section className="wrap" aria-label="Categories">
        <CategoryTiles onPick={(id) => pickCategory(id, true)} />
      </section>

      <section id="shop" className="wrap pb-[clamp(48px,7vw,96px)]">
        <div className="mb-[22px] flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="text-[clamp(34px,4.4vw,56px)]">{category ? category.name : "All products"}</h2>
          <div className="flex flex-wrap gap-2.5 max-[560px]:w-full">
            <label className="sr-only" htmlFor="search">
              Search products
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kaju, badam…"
              className="w-60 min-w-0 rounded-xl border border-leaf-line bg-leaf-deep px-3.5 py-[11px] placeholder:text-on-leaf-soft max-[560px]:w-auto max-[560px]:flex-1"
            />
            <label className="sr-only" htmlFor="sort">
              Sort products
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-w-0 rounded-xl border border-leaf-line bg-leaf-deep px-3.5 py-[11px]"
            >
              <option value="pop">Most popular</option>
              <option value="low">Price, low to high</option>
              <option value="high">Price, high to low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[{ id: "all" as const, name: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={cat === c.id}
              onClick={() => pickCategory(c.id)}
              className={`${pill} ${cat === c.id ? pillOn : ""}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mb-[26px] mt-3 flex min-h-9 flex-wrap gap-1.5">
          {category &&
            [{ value: null, label: `All ${category.name.toLowerCase()}` }, ...category.subcategories.map((s) => ({ value: s, label: s }))].map(
              (s) => (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={sub === s.value}
                  onClick={() => setSub(s.value)}
                  className={`${pill} !px-3.5 !py-1.5 text-[15px] ${sub === s.value ? "!border-swarna !bg-swarna text-ink" : ""}`}
                >
                  {s.label}
                </button>
              ),
            )}
        </div>

        <div
          className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(248px,1fr))] max-[560px]:grid-cols-1 max-[560px]:min-[400px]:grid-cols-2 max-[560px]:min-[400px]:gap-2.5"
          aria-live="polite"
        >
          {list.length ? (
            list.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="col-span-full rounded-[24px] border border-dashed border-leaf-line px-5 py-12 text-center text-on-leaf-soft">
              No products match “{query}”.{" "}
              <button
                type="button"
                className="font-bold text-swarna underline"
                onClick={() => {
                  setQuery("");
                  pickCategory("all");
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
