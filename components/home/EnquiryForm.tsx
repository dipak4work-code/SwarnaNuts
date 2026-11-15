"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/ui/buttons";

const field =
  "w-full rounded-xl border-[1.5px] border-kernel-shade bg-kernel-pale px-3.5 py-3 text-[17px] font-normal";
const label = "grid gap-[5px] text-[15px] font-semibold";

export function EnquiryForm() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [type, setType] = useState("Shop or resale");
  const [need, setNeed] = useState("");

  const v = (s: string) => s.trim() || "-";
  const href = waLink(
    `Hello ${siteConfig.name}, I have a bulk enquiry.\n\nName: ${v(name)}\nCity and country: ${v(place)}\nPurpose: ${type}\nRequirement: ${v(need)}`,
  );

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-3.5 rounded-[24px] bg-kernel p-[clamp(18px,2.6vw,30px)] text-ink"
    >
      <div className="grid gap-3.5 min-[561px]:grid-cols-2">
        <label className={label} htmlFor="eName">
          Your name
          <input id="eName" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </label>
        <label className={label} htmlFor="ePlace">
          City and country
          <input id="ePlace" placeholder="Dubai, UAE" value={place} onChange={(e) => setPlace(e.target.value)} className={field} />
        </label>
      </div>
      <label className={label} htmlFor="eType">
        What is it for?
        <select id="eType" value={type} onChange={(e) => setType(e.target.value)} className={field}>
          <option>Shop or resale</option>
          <option>Export</option>
          <option>Corporate gifting</option>
          <option>Wedding or event</option>
          <option>Sweet shop or bakery</option>
        </select>
      </label>
      <label className={label} htmlFor="eNeed">
        What do you need?
        <input id="eNeed" placeholder="25 kg of W320 every month" value={need} onChange={(e) => setNeed(e.target.value)} className={field} />
      </label>
      <WhatsAppLink href={href} variant="ink">
        Send enquiry on WhatsApp
      </WhatsAppLink>
      <small className="text-sm text-on-kernel-soft">
        Opens WhatsApp with your enquiry written out. Nothing is sent until you press send there.
      </small>
    </form>
  );
}
