type Surface = {
  tag: string;
  metric: string;
  caption: string;
  desc: string;
};

const SURFACES: Surface[] = [
  {
    tag: "CLI",
    metric: "48",
    caption: "commands",
    desc: "auth · posts · notes · comments · search · daemon",
  },
  {
    tag: "MCP",
    metric: "26",
    caption: "tools",
    desc: "host-LLM drafts. you confirm. zero AI key.",
  },
  {
    tag: "AUDIT",
    metric: "2",
    caption: "guards",
    desc: "SQLite dedup · JSONL append-only log",
  },
  {
    tag: "AUTO",
    metric: "1",
    caption: "daemon + TUI",
    desc: "scheduled tasks · TUI · pid file safety",
  },
];

export function SurfaceGrid() {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {SURFACES.map((s) => (
          <div
            key={s.tag}
            className="group relative rounded-md border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5 transition-colors hover:border-[var(--color-accent)]/40"
          >
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-500">
              ┌─ {s.tag} ─┐
            </div>
            <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
              <span className="serif text-4xl sm:text-5xl text-zinc-100 leading-none">
                {s.metric}
              </span>
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500">
                {s.caption}
              </span>
            </div>
            <p className="mt-3 sm:mt-4 font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-400">
              {s.desc}
            </p>
            <div className="mt-3 sm:mt-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-700">
              └────────┘
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2 text-center">
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-600">
          one line:
        </span>
        <code className="font-mono text-sm sm:text-base text-zinc-100 bg-zinc-900/70 border border-zinc-800 rounded px-3 sm:px-4 py-2 break-all">
          uvx substack-ops mcp install cursor
        </code>
      </div>
    </div>
  );
}
