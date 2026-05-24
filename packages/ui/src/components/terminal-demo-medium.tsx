"use client";

import { useEffect, useState } from "react";

const lines = [
  { kind: "prompt", text: "uvx medium-ops mcp install cursor" },
  { kind: "stdout", text: "✓ wrote ~/.cursor/mcp.json (backup at .bak)" },
  { kind: "stdout", text: "✓ 23 tools registered. Restart Cursor." },
  { kind: "blank", text: "" },
  { kind: "user", text: "you ▸ list responses on my latest medium post" },
  { kind: "assistant", text: "cursor ▸ tool: list_responses(post_id=auto)" },
  { kind: "tool", text: "  → 4 responses, 2 unanswered" },
  { kind: "user", text: "you ▸ draft replies in my voice" },
  { kind: "assistant", text: "cursor ▸ \"appreciate the read — the trick was…\"" },
  { kind: "tool", text: "  → propose_reply (token=a3f9b2)" },
  { kind: "user", text: "you ▸ ship it" },
  { kind: "tool", text: "  → confirm_reply(token=a3f9b2) ✓" },
  { kind: "stdout", text: "✓ posted via savePostResponse, audited, deduped." },
];

const styleFor = (kind: string) => {
  switch (kind) {
    case "prompt":
      return "text-zinc-100";
    case "stdout":
      return "text-emerald-400";
    case "user":
      return "text-zinc-400";
    case "assistant":
      return "text-[var(--color-accent)]";
    case "tool":
      return "text-violet-400";
    default:
      return "text-zinc-500";
  }
};

const prefixFor = (kind: string) =>
  kind === "prompt" ? <span className="text-zinc-500">$ </span> : null;

export function TerminalDemoMedium() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const delay = lines[shown].kind === "blank" ? 200 : lines[shown].kind === "stdout" ? 500 : 800;
    const t = setTimeout(() => setShown((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [shown]);

  useEffect(() => {
    if (shown < lines.length) return;
    const t = setTimeout(() => setShown(0), 4000);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className="rounded-lg border border-zinc-800 bg-black/80 overflow-hidden glow w-full max-w-full">
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
        <span className="ml-2 sm:ml-3 text-[11px] sm:text-xs font-mono text-zinc-500 truncate">
          ~/projects · zsh
        </span>
      </div>
      <pre className="p-3 sm:p-4 font-mono text-[11px] sm:text-sm leading-relaxed min-h-[300px] sm:min-h-[340px] whitespace-pre-wrap break-words">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className={styleFor(l.kind)}>
            {prefixFor(l.kind)}
            {l.text || "\u00A0"}
          </div>
        ))}
        {shown < lines.length ? (
          <span className="cursor-blink text-zinc-100" />
        ) : null}
      </pre>
    </div>
  );
}
