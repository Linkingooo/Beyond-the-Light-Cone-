import Link from "next/link";

const links = [
  { href: "/quantum", label: "量子力学" },
  { href: "/relativity", label: "相对论" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-cosmos-bg/70 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative inline-flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-lightcone opacity-80 blur-[2px] animate-spin-slow" />
            <span className="absolute inset-1 rounded-full bg-cosmos-bg" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          </span>
          <span className="text-sm font-medium tracking-wider text-white/90">
            BEYOND THE LIGHT CONE
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="flex gap-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/70 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
