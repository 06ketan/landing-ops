const PHRASES = [
  "no API keys",
  "48 commands",
  "26 MCP tools",
  "SQLite dedup",
  "propose / confirm",
  "audit.jsonl",
  "$0 AI bill",
  "dry-run default",
];

export function MarqueeBand() {
  const sequence = [...PHRASES, ...PHRASES];
  return (
    <div className="relative overflow-hidden border-y border-zinc-900 bg-zinc-950/60">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-zinc-950 to-transparent" />
      <div className="marquee-track flex w-max gap-10 sm:gap-14 py-3 sm:py-4">
        {sequence.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="flex items-center gap-10 sm:gap-14 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap"
          >
            {phrase}
            <span className="text-[var(--color-accent)]">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
