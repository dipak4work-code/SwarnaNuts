const promises = [
  {
    title: "Graded by count",
    text: "Every whole cashew is sold under its trade grade, so a pack of W240 holds W240 and nothing smaller.",
  },
  {
    title: "Packed to order",
    text: "We seal your pack after you order and dispatch within 48 hours, so it reaches you crisp.",
  },
  {
    title: "Nothing added",
    text: "Plain cashews and dry fruits carry no preservatives or colour. Flavoured kaju is roasted in small batches.",
  },
];

export function PromiseBand() {
  return (
    <section className="bg-swarna py-[clamp(44px,6vw,80px)] text-ink">
      <div className="wrap">
        <h2 className="max-w-[16em] text-[clamp(32px,4.4vw,56px)]">Gold standard, kernel by kernel.</h2>
        <div className="mt-9 grid gap-[clamp(20px,3vw,48px)] min-[821px]:grid-cols-3">
          {promises.map((p) => (
            <div key={p.title} className="border-t-2 border-ink pt-4">
              <h3 className="mb-2 text-[25px]">{p.title}</h3>
              <p className="max-w-[30em] text-[17px]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
