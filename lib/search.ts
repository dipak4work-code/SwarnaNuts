import type { Product } from "@/data/products";

/**
 * Hindi and Gujarati names people type, mapped to the English words used in the catalogue.
 * Each entry lists alternatives that should all find the same products.
 */
const synonymGroups: string[][] = [
  ["kaju", "kaaju", "cashew", "cashews", "काजू", "કાજુ"],
  ["badam", "baadam", "almond", "almonds", "बादाम", "બદામ"],
  ["pista", "pistachio", "pistachios", "पिस्ता", "પિસ્તા"],
  ["kishmish", "kismis", "draksh", "raisin", "raisins", "किशमिश", "કિશમિશ", "દ્રાક્ષ"],
  ["akhrot", "akhrod", "walnut", "walnuts", "अखरोट", "અખરોટ"],
  ["anjeer", "anjir", "fig", "figs", "अंजीर", "અંજીર"],
];

const norm = (s: string) => s.toLowerCase().normalize("NFC");

/** Expand one search word into itself plus its synonyms. */
function expand(word: string): string[] {
  const group = synonymGroups.find((g) => g.some((w) => w === word));
  return group ? group : [word];
}

export function matchesQuery(p: Product, query: string): boolean {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const haystack = norm(`${p.name} ${p.description} ${p.subcategory} ${p.keywords}`);
  // Every typed word must match, directly or through a synonym.
  return words.every((w) => expand(w).some((alt) => haystack.includes(alt)));
}
