export type CategoryId = "whole" | "splits" | "flavoured" | "dryfruits" | "gifts";

export interface Category {
  id: CategoryId;
  name: string;
  note: string;
  subcategories: string[];
}

export const categories: Category[] = [
  { id: "whole", name: "Whole cashews", note: "W180 to W450", subcategories: ["W180", "W210", "W240", "W320", "W450"] },
  { id: "splits", name: "Splits and pieces", note: "For sweets and cooking", subcategories: ["JH", "LWP", "SWP", "BB"] },
  { id: "flavoured", name: "Flavoured kaju", note: "Roasted and spiced", subcategories: ["Roasted", "Masala", "Sweet"] },
  { id: "dryfruits", name: "Dry fruits", note: "Badam, pista and more", subcategories: ["Almonds", "Pistachios", "Raisins", "Walnuts", "Figs"] },
  { id: "gifts", name: "Gift boxes", note: "Festive and corporate", subcategories: ["Under ₹1000", "Premium"] },
];

export const categoryById = (id: string) => categories.find((c) => c.id === id);
