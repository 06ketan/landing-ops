type Box = { title: string; meta: string; tone?: "ink" | "accent" };

const INPUTS: Box[] = [
  { title: "your Substack inbox", meta: "posts · notes · comments" },
  { title: "your IDE", meta: "Cursor · Claude Desktop · Codex" },
  { title: "your scripts", meta: "cron · GitHub Actions · TUI" },
];

const STACK: Box[] = [
  { title: "L01 · CLI", meta: "48 commands, every endpoint" },
  { title: "L02 · MCP server", meta: "26 tools — host LLM drafts" },
  { title: "L03 · Safety", meta: "dedup db · audit log · dry-run" },
  { title: "L04 · Auto", meta: "daemon + TUI · pid-file lock" },
];

function Card({ title, meta, tone = "ink" }: Box) {
  return (
    <div
      className={`rounded-md border bg-zinc-950/60 px-3 sm:px-4 py-3 ${
        tone === "accent"
          ? "border-[var(--color-accent)]/40"
          : "border-zinc-800"
      }`}
    >
      <div className="font-mono text-[11px] sm:text-xs text-zinc-100">
        {title}
      </div>
      <div className="mt-1 font-mono text-[10px] sm:text-[11px] text-zinc-500">
        {meta}
      </div>
    </div>
  );
}

export function EcosystemFlow() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {INPUTS.map((b) => (
          <Card key={b.title} {...b} />
        ))}
      </div>

      <div className="flow-arrow" />

      <div className="rounded-md border border-[var(--color-accent)]/40 bg-zinc-950 px-4 py-4 sm:px-6 sm:py-5 text-center glow">
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
          substack-ops
        </div>
        <div className="serif text-2xl sm:text-3xl mt-1 text-zinc-100">
          one binary. four surfaces.
        </div>
        <div className="mt-2 font-mono text-[10px] sm:text-[11px] text-zinc-500 break-all">
          pip install substack-ops · uvx substack-ops · pipx install substack-ops
        </div>
      </div>

      <div className="flow-arrow" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {STACK.map((b) => (
          <Card key={b.title} {...b} />
        ))}
      </div>

      <div className="flow-arrow" />

      <div className="rounded-md border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-center">
        <div className="font-mono text-[11px] sm:text-xs text-zinc-300">
          Substack API
          <span className="text-zinc-600"> ←→ </span>
          your subscribers
        </div>
      </div>
    </div>
  );
}
