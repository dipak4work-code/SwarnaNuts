import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CartButton } from "./CartButton";

const nav = [
  { href: "/#grades", label: "Grades" },
  { href: "/#shop", label: "Shop" },
  { href: "/#wholesale", label: "Wholesale and export" },
  { href: "/#contact", label: "Contact" },
];

function Logo() {
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden="true" className="size-[42px] flex-none">
      <circle r="48" fill="#E9B23C" />
      <path
        transform="rotate(-24) scale(.82)"
        d="M-41 2C-47-16-27-30-7-24C5-20 13-12 25-16C37-20 45-10 41 2C35 20 9 28-13 24C-27 22-37 16-41 2Z"
        fill="#0F3D30"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-leaf-line bg-leaf/90 backdrop-blur-[10px]">
      <div className="wrap flex h-[72px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label={`${siteConfig.name} home`}>
          <Logo />
          <span>
            <span className="block font-display text-xl leading-none min-[561px]:text-2xl">{siteConfig.name}</span>
            <span lang="hi" className="hidden font-display text-[15px] leading-tight text-swarna min-[561px]:block">
              {siteConfig.nameHindi}
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden gap-7 min-[1001px]:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="border-b-2 border-transparent py-1.5 font-medium no-underline hover:border-swarna"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
