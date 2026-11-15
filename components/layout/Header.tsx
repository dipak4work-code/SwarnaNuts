import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CartButton } from "./CartButton";

const nav = [
  { href: "/#grades", label: "Grades" },
  { href: "/#shop", label: "Shop" },
  { href: "/#wholesale", label: "Wholesale and export" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-leaf-line bg-leaf/90 backdrop-blur-[10px]">
      <div className="wrap flex h-[72px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label={`${siteConfig.name} home`}>
          <Image src="/logo-icon.png" alt="" width={42} height={42} className="size-[42px] flex-none" priority />
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
