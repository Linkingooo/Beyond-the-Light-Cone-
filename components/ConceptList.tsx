type Concept = {
  title: string;
  formula?: string;
  body: string;
};

type ConceptListProps = {
  items: Concept[];
  accent: "quantum" | "relativity";
};

const accentBorder = {
  quantum: "before:bg-cosmos-quantum",
  relativity: "before:bg-cosmos-relativity",
};

export default function ConceptList({ items, accent }: ConceptListProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 pl-8 before:absolute before:inset-y-4 before:left-3 before:w-[2px] ${accentBorder[accent]}`}
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <span className="font-mono text-xs text-white/40">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          {item.formula && (
            <p className="mt-2 font-mono text-sm text-white/70">
              {item.formula}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
