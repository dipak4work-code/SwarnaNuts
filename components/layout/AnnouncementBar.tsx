import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="bg-swarna px-gutter py-[7px] text-center text-sm font-semibold text-ink [font-stretch:90%]">
      Free delivery in India on orders above ₹{siteConfig.freeDeliveryFrom}. Wholesale and export
      enquiries welcome.
    </div>
  );
}
