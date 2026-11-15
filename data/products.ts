import type { CategoryId } from "./categories";

export type ArtType =
  | "whole"
  | "half"
  | "piece"
  | "flav"
  | "almond"
  | "pista"
  | "raisin"
  | "walnut"
  | "fig"
  | "tray"
  | "tin";

export type FlavourTone = "roast" | "peri" | "pepper" | "honey";

export interface Product {
  id: number;
  slug: string;
  category: CategoryId;
  subcategory: string;
  name: string;
  description: string;
  /** Rupees for 250 g. For gift boxes (fixedPrice) this is the price of one box. */
  price: number;
  /** Printed MRP in the same unit as price. */
  mrp: number;
  badge?: string;
  /** Red badge. Red is reserved for badges only. */
  badgeHot?: boolean;
  art: ArtType;
  /** Piece size multiplier for art: "piece". */
  pieceScale?: number;
  tone?: FlavourTone;
  /** Contents of a tray, one entry per compartment. */
  parts?: ArtType[];
  /** Gift boxes: one fixed price, no pack sizes. */
  fixedPrice?: boolean;
  /** Higher sorts first under "Most popular". */
  popularity: number;
  /** Extra search terms: Hindi and Gujarati names, spellings. */
  keywords: string;
  /** Optional real photo, path under /public (e.g. "/products/w240.jpg"). Shown instead of the SVG art. */
  image?: string;
}

/* Sample prices in rupees for 250 g (gift boxes: per box). Replace with your real prices. */
export const products: Product[] = [
  { id: 1, slug: "w180-king-cashews", category: "whole", subcategory: "W180", name: "W180 King cashews", description: "King-size whole kaju, creamy with a clean snap.", price: 399, mrp: 460, badge: "Biggest", art: "whole", popularity: 8, keywords: "kaju cashew jumbo", image: "/products/w180-king-cashews.webp" },
  { id: 2, slug: "w210-jumbo-cashews", category: "whole", subcategory: "W210", name: "W210 Jumbo cashews", description: "Bold whole kernels with an even ivory colour.", price: 349, mrp: 399, art: "whole", popularity: 6, keywords: "kaju cashew", image: "/products/w210-jumbo-cashews.webp" },
  { id: 3, slug: "w240-premium-cashews", category: "whole", subcategory: "W240", name: "W240 Premium cashews", description: "Large, uniform kaju for everyday snacking.", price: 299, mrp: 349, badge: "Bestseller", badgeHot: true, art: "whole", popularity: 10, keywords: "kaju cashew", image: "/products/w240-premium-cashews.webp" },
  { id: 4, slug: "w320-classic-cashews", category: "whole", subcategory: "W320", name: "W320 Classic cashews", description: "The all-rounder for snacks, sweets and gravies.", price: 259, mrp: 299, art: "whole", popularity: 9, keywords: "kaju cashew regular", image: "/products/w320-classic-cashews.webp" },
  { id: 5, slug: "w450-petite-cashews", category: "whole", subcategory: "W450", name: "W450 Petite cashews", description: "Small whole kernels for cooking and baking.", price: 229, mrp: 265, art: "whole", popularity: 4, keywords: "kaju cashew small", image: "/products/w450-petite-cashews.webp" },
  { id: 6, slug: "jumbo-halves-jh", category: "splits", subcategory: "JH", name: "Jumbo halves (JH)", description: "Large halves split along the natural seam. Good for sweets and garnish.", price: 219, mrp: 255, art: "half", popularity: 5, keywords: "kaju cashew split", image: "/products/jumbo-halves-jh.webp" },
  { id: 7, slug: "large-white-pieces-lwp", category: "splits", subcategory: "LWP", name: "Large white pieces (LWP)", description: "Large broken pieces for pulao, biryani and kheer.", price: 199, mrp: 230, art: "piece", pieceScale: 1, popularity: 5, keywords: "kaju cashew tukda broken", image: "/products/large-white-pieces-lwp.webp" },
  { id: 8, slug: "small-white-pieces-swp", category: "splits", subcategory: "SWP", name: "Small white pieces (SWP)", description: "Small pieces for halwa, cookies and laddoo.", price: 179, mrp: 210, art: "piece", pieceScale: 0.72, popularity: 3, keywords: "kaju cashew tukda broken", image: "/products/small-white-pieces-swp.webp" },
  { id: 9, slug: "baby-bits-bb", category: "splits", subcategory: "BB", name: "Baby bits (BB)", description: "Fine bits for kaju paste, gravies and bakery fillings.", price: 159, mrp: 185, badge: "Lowest price", art: "piece", pieceScale: 0.5, popularity: 3, keywords: "kaju cashew tukda", image: "/products/baby-bits-bb.webp" },
  { id: 10, slug: "roasted-salted-kaju", category: "flavoured", subcategory: "Roasted", name: "Roasted and salted kaju", description: "Slow-roasted W320 kaju with a light touch of salt.", price: 289, mrp: 330, art: "flav", tone: "roast", popularity: 7, keywords: "cashew salted", image: "/products/roasted-salted-kaju.webp" },
  { id: 11, slug: "peri-peri-kaju", category: "flavoured", subcategory: "Masala", name: "Peri peri kaju", description: "Roasted kaju in a hot, tangy peri peri coat.", price: 309, mrp: 350, badge: "New", badgeHot: true, art: "flav", tone: "peri", popularity: 7, keywords: "cashew spicy masala", image: "/products/peri-peri-kaju.webp" },
  { id: 12, slug: "black-pepper-kaju", category: "flavoured", subcategory: "Masala", name: "Black pepper kaju", description: "Roasted kaju with crushed black pepper and rock salt.", price: 299, mrp: 340, art: "flav", tone: "pepper", popularity: 5, keywords: "cashew kali mirch masala", image: "/products/black-pepper-kaju.webp" },
  { id: 13, slug: "honey-roasted-kaju", category: "flavoured", subcategory: "Sweet", name: "Honey roasted kaju", description: "A golden honey glaze with a hint of cinnamon.", price: 319, mrp: 360, art: "flav", tone: "honey", popularity: 4, keywords: "cashew sweet", image: "/products/honey-roasted-kaju.webp" },
  { id: 14, slug: "california-almonds", category: "dryfruits", subcategory: "Almonds", name: "California almonds", description: "Crunchy whole badam. Good soaked overnight.", price: 249, mrp: 290, art: "almond", popularity: 8, keywords: "badam", image: "/products/california-almonds.webp" },
  { id: 15, slug: "roasted-salted-pistachios", category: "dryfruits", subcategory: "Pistachios", name: "Roasted salted pistachios", description: "Pista in the shell, lightly roasted and salted.", price: 349, mrp: 399, art: "pista", popularity: 6, keywords: "pista", image: "/products/roasted-salted-pistachios.webp" },
  { id: 16, slug: "golden-raisins", category: "dryfruits", subcategory: "Raisins", name: "Golden raisins", description: "Sweet, plump, seedless kishmish.", price: 129, mrp: 150, art: "raisin", popularity: 5, keywords: "kishmish kismis draksh", image: "/products/golden-raisins.webp" },
  { id: 17, slug: "walnut-kernels", category: "dryfruits", subcategory: "Walnuts", name: "Walnut kernels", description: "Light halves with a mild, buttery taste.", price: 329, mrp: 380, art: "walnut", popularity: 4, keywords: "akhrot", image: "/products/walnut-kernels.webp" },
  { id: 18, slug: "dried-figs", category: "dryfruits", subcategory: "Figs", name: "Dried figs", description: "Soft, naturally sweet anjeer.", price: 379, mrp: 430, art: "fig", popularity: 3, keywords: "anjeer anjir", image: "/products/dried-figs.webp" },
  { id: 19, slug: "festive-duo-box", category: "gifts", subcategory: "Under ₹1000", name: "Festive duo box", description: "W240 cashews and California almonds, 200 g each.", price: 749, mrp: 850, fixedPrice: true, art: "tray", parts: ["whole", "almond"], popularity: 6, keywords: "gift diwali hamper", image: "/products/festive-duo-box.webp" },
  { id: 20, slug: "royal-dry-fruit-tray", category: "gifts", subcategory: "Premium", name: "Royal dry fruit tray", description: "W180 cashews, pistachios, almonds and figs, 200 g each.", price: 1899, mrp: 2200, badge: "Premium", badgeHot: true, fixedPrice: true, art: "tray", parts: ["whole", "pista", "almond", "fig"], popularity: 5, keywords: "gift diwali hamper wedding", image: "/products/royal-dry-fruit-tray.webp" },
  { id: 21, slug: "kaju-gift-tin", category: "gifts", subcategory: "Under ₹1000", name: "Kaju gift tin", description: "500 g of W240 cashews in a gold-rimmed tin.", price: 649, mrp: 740, fixedPrice: true, art: "tin", popularity: 4, keywords: "gift diwali cashew", image: "/products/kaju-gift-tin.webp" },
];

export const productById = (id: number) => products.find((p) => p.id === id);
export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
