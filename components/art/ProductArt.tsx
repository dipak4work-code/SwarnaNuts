import { useId } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import { kernelScale } from "@/data/grades";
import { Pile, fillCount } from "./pile";
import type { PileKind } from "./shapes";

const TRAY_SCALE: Partial<Record<PileKind, number>> = { whole: 0.36, almond: 0.4, pista: 0.42, fig: 0.42 };

function Tray({ product, uid }: { product: Product; uid: string }) {
  const parts = (product.parts ?? []) as PileKind[];
  const two = parts.length === 2;
  const cells = two
    ? [[14, 14, 84, 172], [102, 14, 84, 172]]
    : [[14, 14, 84, 84], [102, 14, 84, 84], [14, 102, 84, 84], [102, 102, 84, 84]];
  return (
    <svg viewBox="0 0 200 204" aria-hidden="true">
      <rect x="4" y="8" width="192" height="192" rx="22" fill="#051A14" opacity=".28" />
      <rect x="4" y="4" width="192" height="192" rx="22" fill="#082720" stroke="#E9B23C" strokeWidth="3" />
      {cells.map(([x, y, w, h], i) => {
        const kind = parts[i];
        if (!kind) return null;
        const scale = TRAY_SCALE[kind] ?? 0.4;
        const R = Math.max(w, h) * 0.62;
        return (
          <g key={i}>
            <clipPath id={`${uid}-${i}`}>
              <rect x={x} y={y} width={w} height={h} rx="10" />
            </clipPath>
            <rect x={x} y={y} width={w} height={h} rx="10" fill="#14483A" />
            <g clipPath={`url(#${uid}-${i})`}>
              <Pile kind={kind} n={fillCount(kind, R, scale)} cx={x + w / 2} cy={y + h / 2} R={R} scale={scale} seed={i} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function Bowl({ product, uid }: { product: Product; uid: string }) {
  const kind: PileKind = product.art === "tin" ? "whole" : (product.art as PileKind);
  let scale = 0.42;
  let rim = "#24594A";
  let rimW = 2;
  if (kind === "whole" && product.art === "whole") scale = 0.44 * kernelScale(Number(product.subcategory.slice(1)));
  if (kind === "half") scale = 0.42;
  if (kind === "piece") scale = 0.62 * (product.pieceScale ?? 1);
  if (product.art === "tin") {
    scale = 0.4;
    rim = "#E9B23C";
    rimW = 7;
  }
  if (["almond", "pista", "raisin", "walnut", "fig"].includes(kind)) scale = 0.46;
  return (
    <svg viewBox="0 0 200 204" aria-hidden="true">
      <circle cx="100" cy="106" r="96" fill="#051A14" opacity=".28" />
      <circle cx="100" cy="100" r="96" fill="url(#g-bowl)" stroke={rim} strokeWidth={rimW} />
      <clipPath id={uid}>
        <circle cx="100" cy="100" r={92 - rimW} />
      </clipPath>
      <g clipPath={`url(#${uid})`}>
        <Pile kind={kind} n={fillCount(kind, 74, scale)} cx={100} cy={100} R={74} scale={scale} tone={product.tone} seed={product.id} />
      </g>
    </svg>
  );
}

interface ProductArtProps {
  product: Product;
  /** Used for the photo's `sizes` attribute. */
  sizes?: string;
  className?: string;
}

/** Real photo if product.image is set, otherwise the SVG bowl illustration. */
export function ProductArt({ product, sizes = "(max-width: 560px) 50vw, 280px", className }: ProductArtProps) {
  const reactId = useId();
  const uid = `art${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;

  if (product.image) {
    return (
      <div className={`relative aspect-[200/204] overflow-hidden rounded-2xl ${className ?? ""}`}>
        <Image src={product.image} alt={product.name} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={className} role="img" aria-label={product.name}>
      {product.art === "tray" ? <Tray product={product} uid={uid} /> : <Bowl product={product} uid={uid} />}
    </div>
  );
}
