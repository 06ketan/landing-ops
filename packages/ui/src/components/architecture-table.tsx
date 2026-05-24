type Row = {
  feature: string;
  ours: string | boolean;
  theirs: string | boolean;
  manual: string | boolean;
};

const ROWS: Row[] = [
  { feature: "CLI commands", ours: "48", theirs: "—", manual: "—" },
  { feature: "MCP server (tools)", ours: "26", theirs: "12", manual: "—" },
  { feature: "Host-LLM drafting (no AI key)", ours: true, theirs: false, manual: false },
  { feature: "SQLite dedup", ours: true, theirs: false, manual: false },
  { feature: "JSONL audit log", ours: true, theirs: false, manual: false },
  { feature: "Auto-install into Cursor / Claude", ours: true, theirs: false, manual: false },
  { feature: "Daemon + TUI", ours: true, theirs: false, manual: false },
  { feature: "Dry-run by default", ours: true, theirs: false, manual: "n/a" },
  { feature: "License", ours: "MIT", theirs: "MIT", manual: "—" },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return <span className="text-[var(--color-accent)]">✓</span>;
  if (value === false) return <span className="text-zinc-700">✗</span>;
  return <span className="text-zinc-300">{value}</span>;
}

export function ArchitectureTable() {
  return (
    <div className="overflow-x-auto rounded-md border border-zinc-800 bg-zinc-950/40">
      <table className="w-full min-w-[640px] font-mono text-[11px] sm:text-xs">
        <thead>
          <tr className="border-b border-zinc-900 text-left text-zinc-500 uppercase tracking-[0.18em]">
            <th className="px-3 sm:px-4 py-3 font-normal">feature</th>
            <th className="px-3 sm:px-4 py-3 font-normal text-[var(--color-accent)]">
              substack-ops
            </th>
            <th className="px-3 sm:px-4 py-3 font-normal">conorbronsdon/substack-mcp</th>
            <th className="px-3 sm:px-4 py-3 font-normal">manual / browser</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr
              key={r.feature}
              className={
                i % 2
                  ? "bg-zinc-950/20 border-b border-zinc-900/60"
                  : "border-b border-zinc-900/60"
              }
            >
              <td className="px-3 sm:px-4 py-2.5 text-zinc-300">{r.feature}</td>
              <td className="px-3 sm:px-4 py-2.5">
                <Cell value={r.ours} />
              </td>
              <td className="px-3 sm:px-4 py-2.5">
                <Cell value={r.theirs} />
              </td>
              <td className="px-3 sm:px-4 py-2.5">
                <Cell value={r.manual} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
