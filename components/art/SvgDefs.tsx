export const KERNEL_PATH =
  "M-41 2C-47-16-27-30-7-24C5-20 13-12 25-16C37-20 45-10 41 2C35 20 9 28-13 24C-27 22-37 16-41 2Z";

/** Shared gradients and the cashew kernel symbol. Render once, in the root layout. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="g-plain" cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FFF6DC" />
          <stop offset=".6" stopColor="#F1DBA6" />
          <stop offset="1" stopColor="#D9B872" />
        </radialGradient>
        <radialGradient id="g-roast" cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#F2C98A" />
          <stop offset="1" stopColor="#B9772F" />
        </radialGradient>
        <radialGradient id="g-peri" cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#F08A55" />
          <stop offset="1" stopColor="#A93A1B" />
        </radialGradient>
        <radialGradient id="g-pepper" cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#EBD3A6" />
          <stop offset="1" stopColor="#A98654" />
        </radialGradient>
        <radialGradient id="g-honey" cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FFDD7A" />
          <stop offset="1" stopColor="#C98A1C" />
        </radialGradient>
        <radialGradient id="g-bowl" cx="50%" cy="42%" r="60%">
          <stop offset="0" stopColor="#14483A" />
          <stop offset="1" stopColor="#082720" />
        </radialGradient>
        <g id="kern">
          <path d={KERNEL_PATH} fill="url(#g-plain)" stroke="#C9A55C" strokeWidth="1.5" />
          <path d="M-29 9C-15 19 10 19 29 7" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </defs>
    </svg>
  );
}
