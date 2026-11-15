import { EnquiryForm } from "./EnquiryForm";

const points = [
  "Better rates from 5 kg upward",
  "All grades from W180 to W450, plus splits and pieces",
  "Gift boxes with your company name for Diwali and events",
  "Export packing on request",
];

export function Wholesale() {
  return (
    <section id="wholesale" className="bg-leaf-deep py-[clamp(48px,7vw,96px)]">
      <div className="wrap grid items-start gap-[clamp(28px,5vw,72px)] min-[821px]:grid-cols-2">
        <div>
          <h2 className="text-[clamp(32px,4.4vw,56px)]">Wholesale, gifting and export</h2>
          <p className="mt-[18px] max-w-[32em] text-on-leaf-soft">
            Buying for a shop, a sweet kitchen, a wedding or a market outside India? Tell us the grade and quantity and
            we will send a quote on WhatsApp.
          </p>
          <ul className="mt-5 grid gap-2.5">
            {points.map((p) => (
              <li key={p} className="relative pl-[26px]">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.5em] h-[9px] w-3.5 -rotate-[20deg] rounded-[9px_9px_9px_2px] bg-swarna"
                />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
