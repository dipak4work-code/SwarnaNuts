import { Hero } from "@/components/home/Hero";
import { Catalogue } from "@/components/home/Catalogue";
import { PromiseBand } from "@/components/home/PromiseBand";
import { Wholesale } from "@/components/home/Wholesale";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Catalogue />
      <PromiseBand />
      <Wholesale />
    </>
  );
}
