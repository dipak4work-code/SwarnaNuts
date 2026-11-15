import type { ReactNode } from "react";

export type ButtonVariant = "gold" | "line" | "ink" | "whatsapp";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-[26px] py-3.5 text-[17px] font-bold no-underline transition-[transform,background-color,border-color] duration-150 active:scale-[0.97]";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-swarna text-ink hover:bg-swarna-hover",
  line: "border-[1.5px] border-on-leaf-soft text-kernel hover:border-kernel hover:bg-kernel/10",
  ink: "bg-ink text-kernel hover:bg-leaf",
  whatsapp: "w-full bg-whatsapp text-white hover:bg-whatsapp-deep",
};

export const buttonClass = (variant: ButtonVariant, extra = "") => `${base} ${variants[variant]} ${extra}`;

/**
 * A link that opens WhatsApp, or a disabled button while no number is configured
 * (href is null). Disabled uses aria-disabled so it stays focusable and readable.
 */
export function WhatsAppLink({
  href,
  variant,
  children,
  disabledLabel = "WhatsApp number not set yet",
}: {
  href: string | null;
  variant: ButtonVariant;
  children: ReactNode;
  disabledLabel?: string;
}) {
  if (!href) {
    return (
      <button
        type="button"
        aria-disabled="true"
        onClick={(e) => e.preventDefault()}
        className={buttonClass(variant, "!bg-kernel-shade !text-on-kernel-soft cursor-not-allowed active:!scale-100")}
      >
        {disabledLabel}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant)}>
      {children}
    </a>
  );
}
