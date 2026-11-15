import type { ReactNode } from "react";
import type { ArtType, FlavourTone } from "@/data/products";
import { KERNEL_PATH } from "./SvgDefs";

export type PileKind = Exclude<ArtType, "tray" | "tin">;

const PIECES = [
  "M-16-9L8-15L18-1L8 13L-12 11Z",
  "M-14-12L12-10L16 6L-4 14L-18 2Z",
  "M-10-14L14-6L10 12L-14 10Z",
];

/** One drawing per product type, centred on 0,0. `i` varies pieces; `tone` colours flavoured kaju. */
export const shapes: Record<PileKind, (i: number, tone?: FlavourTone) => ReactNode> = {
  whole: () => <use href="#kern" />,
  half: () => (
    <>
      <path d={KERNEL_PATH} fill="#FBEFCF" stroke="#C9A55C" strokeWidth="1.5" />
      <path d="M-33 1C-14-9 12-3 35-3" fill="none" stroke="#D9BD80" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  piece: (i) => (
    <path d={PIECES[i % 3]} fill="url(#g-plain)" stroke="#C9A55C" strokeWidth="2" strokeLinejoin="round" />
  ),
  flav: (_i, tone = "roast") => (
    <>
      <path d={KERNEL_PATH} fill={`url(#g-${tone})`} stroke="rgba(60,25,5,.45)" strokeWidth="1.5" />
      {tone === "peri" || tone === "pepper" ? (
        <g fill={tone === "peri" ? "#5E1708" : "#2A2118"}>
          <circle cx="-18" cy="-4" r="2.6" />
          <circle cx="2" cy="8" r="2.2" />
          <circle cx="20" cy="-2" r="2.6" />
          <circle cx="-6" cy="-12" r="1.8" />
          <circle cx="12" cy="14" r="1.8" />
        </g>
      ) : (
        <path d="M-29 9C-15 19 10 19 29 7" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="3.5" strokeLinecap="round" />
      )}
    </>
  ),
  almond: () => (
    <>
      <path d="M-36 0C-22-24 18-22 36 0C18 22-22 24-36 0Z" fill="#A9683C" stroke="#75421F" strokeWidth="1.5" />
      <path d="M-24-2C-8-10 12-9 26-1M-22 6C-6 0 12 1 24 6" fill="none" stroke="#7F4A26" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  pista: () => (
    <>
      <ellipse rx="30" ry="21" fill="#EADBB8" stroke="#B49B6B" strokeWidth="1.5" />
      <path d="M-22 2C-8-12 10-12 22 2C10 12-8 12-22 2Z" fill="#8DAF4A" stroke="#5E7C2B" strokeWidth="1.2" />
    </>
  ),
  raisin: () => (
    <>
      <path d="M-22 0C-20-16 14-18 22-2C24 12-12 18-22 0Z" fill="#D9A036" stroke="#96671A" strokeWidth="1.5" />
      <path d="M-10-4C-2-8 8-6 12 0" fill="none" stroke="#B07F22" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  walnut: () => (
    <>
      <path d="M-30 0C-30-22-4-26 0-12C4-26 30-22 30 0C30 22 4 26 0 12C-4 26-30 22-30 0Z" fill="#BE8C52" stroke="#7E5629" strokeWidth="1.5" />
      <path d="M-18-6C-12-12-8-2-14 4M18-6C12-12 8-2 14 4" fill="none" stroke="#8A5F30" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  fig: () => (
    <>
      <circle r="30" fill="#8E603C" stroke="#5F3C22" strokeWidth="1.5" />
      <circle r="18" fill="#C98F58" />
      <g fill="#F3D9A0">
        <circle cx="-6" cy="-5" r="2" />
        <circle cx="6" cy="-7" r="2" />
        <circle cx="8" cy="5" r="2" />
        <circle cx="-4" cy="8" r="2" />
        <circle cx="-11" cy="3" r="1.6" />
        <circle cx="0" cy="0" r="1.8" />
      </g>
    </>
  ),
};

/** Approximate width of each shape at scale 1, used to decide how many fit a bowl. */
export const shapeWidth: Record<PileKind, number> = {
  whole: 88, half: 88, piece: 36, flav: 88, almond: 72, pista: 60, raisin: 46, walnut: 60, fig: 60,
};
