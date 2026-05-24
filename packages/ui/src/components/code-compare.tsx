type Stat = { value: string; label: string };

type Props = {
  beforeTitle: string;
  beforeCode: string;
  afterTitle: string;
  afterCode: string;
  stats?: Stat[];
};

function Block({
  title,
  code,
  variant,
}: {
  title: string;
  code: string;
  variant: "before" | "after";
}) {
  const dot =
    variant === "before"
      ? "bg-red-500/70"
      : "bg-[var(--color-accent)]";
  const border =
    variant === "before"
      ? "border-zinc-800"
      : "border-[var(--color-accent)]/30";

  return (
    <div
      className={`rounded-md border ${border} bg-zinc-950/60 overflow-hidden`}
    >
      <div className="flex items-center justify-between border-b border-zinc-900 px-3 sm:px-4 py-2">
        <div className="flex items-center gap-2">
          <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            {variant === "before" ? "before" : "after"} · {title}
          </span>
        </div>
      </div>
      <pre className="px-3 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-xs leading-relaxed font-mono text-zinc-300 overflow-x-auto whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function CodeCompare({
  beforeTitle,
  beforeCode,
  afterTitle,
  afterCode,
  stats,
}: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <Block title={beforeTitle} code={beforeCode} variant="before" />
        <Block title={afterTitle} code={afterCode} variant="after" />
      </div>
      {stats?.length ? (
        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-md border border-zinc-800 bg-zinc-950/40 px-3 py-2"
            >
              <div className="serif text-2xl sm:text-3xl text-zinc-100 leading-none">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
