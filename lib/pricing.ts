import type { Product } from "@/data/products";

export interface PackSize {
  label: string;
  multiplier: number;
}

export const packs: PackSize[] = [
  { label: "250 g", multiplier: 1 },
  { label: "500 g", multiplier: 1.95 },
  { label: "1 kg", multiplier: 3.8 },
];

export const rupees = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

const mult = (p: Product, packIndex: number) => (p.fixedPrice ? 1 : (packs[packIndex]?.multiplier ?? 1));

export const priceOf = (p: Product, packIndex = 0) => Math.round(p.price * mult(p, packIndex));
export const mrpOf = (p: Product, packIndex = 0) => Math.round(p.mrp * mult(p, packIndex));
