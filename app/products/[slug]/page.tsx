import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { categoryById } from "@/data/categories";
import { gradeByCode, kernelsPerHandful } from "@/data/grades";
import { productBySlug, products } from "@/data/products";
import { ProductArt } from "@/components/art/ProductArt";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { absoluteUrl, productJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  const url = absoluteUrl(`/products/${product.slug}/`);
  return {
    title: product.name,
    description: product.description,
    ...(siteConfig.siteUrl ? { alternates: { canonical: url } } : {}),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: product.name,
      description: product.description,
      url,
      ...(product.image ? { images: [{ url: absoluteUrl(product.image) }] } : {}),
    },
    twitter: { card: "summary_large_image", title: product.name, description: product.description },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const category = categoryById(product.category);
  const grade = product.category === "whole" ? gradeByCode(product.subcategory) : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so product text can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)).replace(/</g, "\\u003c") }}
      />
      <article className="wrap pb-[clamp(40px,6vw,72px)] pt-[clamp(24px,4vw,48px)]">
        <nav aria-label="Breadcrumb" className="mb-6 text-[15px] text-on-leaf-soft">
          <Link href="/" className="hover:text-kernel">
            Home
          </Link>
          {" / "}
          <Link href={`/#shop-${product.category}`} className="hover:text-kernel">
            {category?.name}
          </Link>
          {" / "}
          <span aria-current="page" className="text-kernel">
            {product.name}
          </span>
        </nav>

        <div className="grid items-start gap-[clamp(28px,5vw,72px)] min-[821px]:grid-cols-2">
          <div className="rounded-panel border border-leaf-line bg-leaf-deep p-[clamp(20px,4vw,48px)]">
            <ProductArt product={product} sizes="(max-width: 820px) 90vw, 520px" className="mx-auto max-w-[460px]" />
          </div>

          <div>
            {product.badge && (
              <span
                className={`mb-3 inline-block rounded-pill px-3 py-[3px] text-sm font-bold ${
                  product.badgeHot ? "bg-apple text-white" : "bg-kernel text-ink"
                }`}
              >
                {product.badge}
              </span>
            )}
            <h1 className="text-[clamp(38px,5vw,64px)]">{product.name}</h1>
            <p className="mt-4 max-w-[32em] text-[19px] text-on-leaf-soft">{product.description}</p>
            <ProductPurchase product={product} />
            <p className="mt-3 text-sm text-on-leaf-soft">
              {product.fixedPrice
                ? "One fixed price per box."
                : "Price per pack. Prices include taxes."}{" "}
              Free delivery in India above ₹{siteConfig.freeDeliveryFrom}.
            </p>
          </div>
        </div>

        {grade && (
          <section className="mt-[clamp(40px,6vw,72px)] max-w-[44em]" aria-labelledby="grade-title">
            <h2 id="grade-title" className="text-[clamp(28px,3.4vw,40px)]">
              What {grade.code} means
            </h2>
            <p className="mt-3 text-[18px] text-on-leaf-soft">{grade.detail}</p>
            <p className="mt-3 text-[18px] text-on-leaf-soft">
              A 28 g handful holds about {kernelsPerHandful(grade.count)} kernels. The lower the number, the bigger the
              cashew.
            </p>
          </section>
        )}
      </article>
      <RelatedProducts product={product} />
    </>
  );
}
