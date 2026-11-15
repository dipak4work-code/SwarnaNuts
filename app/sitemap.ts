import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Sitemaps need absolute URLs. Until siteUrl is set in config/site.ts there is nothing valid to list.
  if (!siteConfig.siteUrl) return [];
  const now = new Date();
  return [
    { url: `${siteConfig.siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...products.map((p) => ({
      url: `${siteConfig.siteUrl}/products/${p.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
