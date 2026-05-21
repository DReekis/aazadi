import Link from "next/link";

export function Logo() {
  return (
    <Link className="focus-ring flex items-center gap-3" href="/" aria-label="AAZADI home">
      <svg
        aria-hidden="true"
        className="h-10 w-10 shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="4" width="40" height="40" rx="6" fill="#11100F" />
        <path d="M24 9L37 39H31.8L28.9 32H18.7L15.9 39H11L24 9Z" fill="#F7F0E4" />
        <path d="M24 18.2L20.4 27.4H27.7L24 18.2Z" fill="#5A1723" />
        <path d="M13 39H35" stroke="#E7AD95" strokeWidth="2.4" strokeLinecap="square" />
      </svg>
      <span className="leading-none">
        <span className="block font-editorial text-2xl font-black tracking-normal text-obsidian">
          AAZADI
        </span>
        <span className="hidden text-[0.68rem] font-bold uppercase tracking-[0.12em] text-maroon sm:block">
          Evidence first
        </span>
      </span>
    </Link>
  );
}
