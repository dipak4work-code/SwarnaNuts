export interface Grade {
  /** Trade grade code, also the product subcategory. */
  code: string;
  /** Approximate whole kernels per pound. */
  count: number;
  name: string;
  text: string;
  /** Longer explanation shown on the product page. */
  detail: string;
}

export const grades: Grade[] = [
  {
    code: "W180",
    count: 180,
    name: "W180 King",
    text: "The largest whole cashew sold. Choose it for gifting and festive platters.",
    detail: "W180 is the largest standard grade of whole white cashew. It takes about 180 kernels to make a pound, so each one is big, heavy and snaps cleanly.",
  },
  {
    code: "W210",
    count: 210,
    name: "W210 Jumbo",
    text: "Bold kernels with an even ivory colour. A treat for snacking.",
    detail: "W210 means about 210 whole kernels to the pound. It is a step below W180 in size and a step above in value, a good jar for snacking.",
  },
  {
    code: "W240",
    count: 240,
    name: "W240 Premium",
    text: "Our bestseller. Large, uniform kaju for the everyday jar.",
    detail: "W240 means about 240 whole kernels to the pound. Large and even, it is the grade most families settle on for daily use and gifting.",
  },
  {
    code: "W320",
    count: 320,
    name: "W320 Classic",
    text: "The all-rounder for snacks, kaju katli and rich gravies.",
    detail: "W320 means about 320 whole kernels to the pound. It is the most widely traded grade and works for snacks, sweets and cooking alike.",
  },
  {
    code: "W450",
    count: 450,
    name: "W450 Petite",
    text: "Small whole kernels at the best price. Ideal for cooking and baking.",
    detail: "W450 means about 450 whole kernels to the pound. The kernels are small but whole, which keeps the price low for cooking and baking.",
  },
];

export const gradeByCode = (code: string) => grades.find((g) => g.code === code);

/** Kernels in a 28 g handful. */
export const kernelsPerHandful = (count: number) => Math.round((count / 453.6) * 28);

/** Kernel length scales with the cube root of its weight. */
export const kernelScale = (count: number) => Math.cbrt(180 / count);
