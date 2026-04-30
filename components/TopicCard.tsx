import Link from "next/link";

type TopicCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  symbol: string;
  accent: "quantum" | "relativity";
};

const accentMap = {
  quantum: {
    glow: "from-cosmos-quantum/40 via-cosmos-accent/20 to-transparent",
    text: "text-cosmos-quantum",
    ring: "group-hover:ring-cosmos-quantum/50",
  },
  relativity: {
    glow: "from-cosmos-relativity/40 via-cosmos-accent/20 to-transparent",
    text: "text-cosmos-relativity",
    ring: "group-hover:ring-cosmos-relativity/50",
  },
};

export default function TopicCard({
  href,
  eyebrow,
  title,
  description,
  symbol,
  accent,
}: TopicCardProps) {
  const a = accentMap[accent];
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 ring-1 ring-transparent transition hover:bg-white/[0.05] ${a.ring}`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${a.glow} opacity-60 blur-2xl transition group-hover:opacity-90`}
      />
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="chip">{eyebrow}</span>
          <span className={`font-mono text-3xl ${a.text}`}>{symbol}</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <span>进入主题</span>
          <span aria-hidden className="transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
