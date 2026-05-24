"use client";

import { useState } from "react";

type Host = {
  id: string;
  label: string;
  cmd: string;
  note?: string;
};

const hosts: Host[] = [
  {
    id: "cursor",
    label: "Cursor",
    cmd: "uvx substack-ops mcp install cursor",
    note: "Writes ~/.cursor/mcp.json. Restart Cursor.",
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    cmd: "uvx substack-ops mcp install claude-desktop",
    note: "Writes Claude Desktop config. Restart the app.",
  },
  {
    id: "claude-code",
    label: "Claude Code",
    cmd: "uvx substack-ops mcp install claude-code",
    note: "Runs `claude mcp add`. Persists to your Claude Code config.",
  },
  {
    id: "opencode",
    label: "OpenCode",
    cmd: "uvx substack-ops mcp install opencode",
    note: "Writes ~/.config/opencode/opencode.json. Restart OpenCode.",
  },
  {
    id: "continue",
    label: "Continue",
    cmd: "uvx substack-ops mcp install print",
    note: "Paste printed `mcpServers` JSON into Continue’s MCP config — see docs.continue.dev.",
  },
];

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className="absolute right-3 top-3 text-xs px-2 py-1 rounded border border-zinc-700 bg-zinc-900/80 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition"
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}

export function InstallTabs() {
  const [active, setActive] = useState(hosts[0].id);
  const current = hosts.find((h) => h.id === active)!;

  return (
    <div>
      <div className="flex gap-1 mb-3 flex-wrap">
        {hosts.map((h) => (
          <button
            key={h.id}
            onClick={() => setActive(h.id)}
            className={`px-3 py-1.5 text-sm font-mono rounded-t-md border-b-2 transition ${
              active === h.id
                ? "text-[var(--color-accent)] border-[var(--color-accent)]"
                : "text-zinc-400 border-transparent hover:text-zinc-200"
            }`}
          >
            {h.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <pre className="bg-black border border-zinc-800 rounded-md p-4 pr-20 font-mono text-sm text-zinc-100 overflow-x-auto">
          <span className="text-zinc-500">$ </span>
          <span>{current.cmd}</span>
        </pre>
        <CopyBtn text={current.cmd} />
      </div>
      {current.note ? (
        <p className="mt-2 text-xs text-zinc-500 font-mono">{current.note}</p>
      ) : null}
    </div>
  );
}
