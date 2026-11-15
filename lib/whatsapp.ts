import { siteConfig } from "@/config/site";

/** Returns a wa.me link, or null while no WhatsApp number is configured. */
export function waLink(text: string): string | null {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
