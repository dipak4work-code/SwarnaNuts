import type { FlavourTone } from "@/data/products";
import { shapes, shapeWidth, type PileKind } from "./shapes";

/** Golden angle in radians, for sunflower-seed packing. */
export const GOLDEN_ANGLE = 2.39996;

/** How many items of a kind, at a scale, fill a circle of radius R. */
export function fillCount(kind: PileKind, R: number, scale: number) {
  const w = shapeWidth[kind] * scale;
  return Math.max(5, Math.min(48, Math.round((Math.PI * R * R) / (w * w * 0.52))));
}

interface PileProps {
  kind: PileKind;
  n: number;
  cx: number;
  cy: number;
  R: number;
  scale: number;
  tone?: FlavourTone;
  seed?: number;
}

/** Sunflower-seed packing: fills a circle evenly with n items. */
export function Pile({ kind, n, cx, cy, R, scale, tone, seed = 0 }: PileProps) {
  const draw = shapes[kind];
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const r = R * Math.sqrt((i + 0.5) / n);
        const a = i * GOLDEN_ANGLE + seed;
        const rot = (i * 73 + seed * 40) % 360;
        return (
          <g
            key={i}
            transform={`translate(${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}) rotate(${rot}) scale(${scale.toFixed(3)})`}
          >
            {draw(i, tone)}
          </g>
        );
      })}
    </>
  );
}
