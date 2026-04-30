type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: "quantum" | "relativity" | "default";
};

const accentClass = {
  quantum: "text-cosmos-quantum",
  relativity: "text-cosmos-relativity",
  default: "text-cosmos-accent",
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  accent = "default",
}: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      <p
        className={`font-mono text-xs uppercase tracking-[0.4em] ${accentClass[accent]}`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-white/65">
          {description}
        </p>
      )}
    </div>
  );
}
