import { siteConfig } from "@/config/site";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-leaf-line bg-leaf-deep pb-7 pt-11">
      <div className="wrap">
        <div className="grid gap-8 max-[820px]:grid-cols-2 min-[821px]:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-[820px]:col-span-2">
            <div lang="hi" className="font-display text-[clamp(48px,7vw,88px)] leading-none text-swarna">
              {siteConfig.nameHindi}
            </div>
            <p className="mt-3 max-w-[26em] text-on-leaf-soft">
              Swarna means gold. {siteConfig.name} sells graded cashews and dry fruits from Gujarat, India.
            </p>
          </div>
          <div>
            <h3 className="mb-2.5 font-body text-base font-bold">Shop</h3>
            <ul className="grid gap-1.5 text-on-leaf-soft">
              {categories.map((c) => (
                <li key={c.id}>
                  <a href={`/#shop-${c.id}`} className="hover:text-kernel">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2.5 font-body text-base font-bold">Contact</h3>
            <ul className="grid gap-1.5 text-on-leaf-soft">
              <li>{siteConfig.address}</li>
              <li>
                {siteConfig.whatsappNumber ? `WhatsApp +${siteConfig.whatsappNumber}` : "WhatsApp number coming soon"}
              </li>
              <li>{siteConfig.email || "Email address coming soon"}</li>
              <li>{siteConfig.fssai ? `FSSAI licence ${siteConfig.fssai}` : "FSSAI licence number to be added"}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-leaf-line pt-[18px] text-sm text-on-leaf-soft">
          © {new Date().getFullYear()} {siteConfig.name}. Prices shown are in Indian rupees and include taxes.
        </div>
      </div>
    </footer>
  );
}
