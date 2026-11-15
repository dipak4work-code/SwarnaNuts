/**
 * Site-wide settings. Edit this file, nothing else, to change contact details,
 * delivery rules or the WhatsApp number.
 */
export const siteConfig = {
  name: "Swarna Kernel",
  nameHindi: "स्वर्ण",
  tagline: "Graded cashews and dry fruits from Gujarat, India",
  description:
    "Swarna Kernel sells whole cashews graded by count, from W180 to W450, with splits, flavoured kaju, dry fruits and gift boxes.",

  // TODO: production URL, e.g. "https://www.example.com" (no trailing slash).
  // Used for the sitemap, canonical links and Open Graph URLs.
  siteUrl: "https://swarna-kernel.pages.dev",

  // TODO: WhatsApp number with country code, digits only, no plus sign (e.g. "919812345678").
  // While empty, order and enquiry buttons show a disabled state.
  whatsappNumber: "919016565037",

  freeDeliveryFrom: 999, // rupees
  deliveryFee: 60, // rupees

  // TODO: full postal address. Only the state is confirmed for now.
  address: "Gujarat, India",
  // TODO: public contact email.
  email: "",
  // TODO: FSSAI licence number (14 digits).
  fssai: "",
} as const;
