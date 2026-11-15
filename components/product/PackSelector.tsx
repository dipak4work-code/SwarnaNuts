"use client";

import { packs } from "@/lib/pricing";

export function PackSelector({
  value,
  onChange,
  size = "sm",
}: {
  value: number;
  onChange: (i: number) => void;
  size?: "sm" | "lg";
}) {
  return (
    <div
      role="group"
      aria-label="Pack size"
      className="grid grid-cols-3 gap-[3px] rounded-[11px] bg-kernel-shade p-[3px]"
    >
      {packs.map((p, i) => (
        <button
          key={p.label}
          type="button"
          aria-pressed={i === value}
          onClick={() => onChange(i)}
          className={`rounded-lg font-semibold ${size === "lg" ? "py-2.5 text-base" : "py-[7px] text-[15px]"} ${
            i === value ? "bg-ink text-kernel" : "text-on-kernel-soft"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
