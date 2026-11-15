import { buttonClass } from "@/components/ui/buttons";
import { GradeExplorer } from "./GradeExplorer";

export function Hero() {
  return (
    <section id="grades" className="wrap pb-[clamp(40px,6vw,80px)] pt-[clamp(36px,6vw,72px)]">
      <div className="grid items-center gap-[clamp(28px,5vw,72px)] min-[821px]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <h1 className="text-[clamp(44px,6.6vw,92px)] tracking-[-0.01em]">Know your kaju by its number.</h1>
          <p className="mt-[22px] max-w-[34em] text-[clamp(18px,1.6vw,21px)] text-on-leaf-soft">
            W180 means about 180 whole kernels to the pound. The lower the number, the bigger the cashew. Pick a grade
            and see what lands in your hand.
          </p>
          <div className="mt-[30px] flex flex-wrap gap-3">
            <a className={buttonClass("gold")} href="#shop">
              Shop all products
            </a>
            <a className={buttonClass("line")} href="#wholesale">
              Buy in bulk
            </a>
          </div>
        </div>
        <GradeExplorer />
      </div>
    </section>
  );
}
