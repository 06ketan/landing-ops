type Card = {
  label: string;
  value: string;
  caption: string;
  href: string;
  badge?: string;
};

const CARDS: Card[] = [
  {
    label: "PyPI",
    value: "medium-ops",
    caption: "pip install · uvx · pipx",
    href: "https://pypi.org/project/medium-ops/",
    badge:
      "https://img.shields.io/pypi/v/medium-ops.svg?style=flat-square&color=00ab6c&labelColor=18181b",
  },
  {
    label: "GitHub",
    value: "06ketan/medium-ops",
    caption: "MIT · open issues welcome",
    href: "https://github.com/06ketan/medium-ops",
    badge:
      "https://img.shields.io/github/stars/06ketan/medium-ops.svg?style=flat-square&color=00ab6c&labelColor=18181b",
  },
  {
    label: "MCP Registry",
    value: "io.github.06ketan/medium-ops",
    caption: "official model-context-protocol",
    href: "https://registry.modelcontextprotocol.io/v0/servers?search=medium",
  },
  {
    label: "Glama",
    value: "medium-ops",
    caption: "tool-definition quality score",
    href: "https://glama.ai/mcp/servers/06ketan/medium-ops",
    badge: "https://glama.ai/mcp/servers/06ketan/medium-ops/badge",
  },
  {
    label: "Sibling",
    value: "substack-ops",
    caption: "same shape · different platform",
    href: "https://substack-ops.chavan.in",
  },
  {
    label: "License",
    value: "MIT",
    caption: "fork it · ship it · resell it",
    href: "https://github.com/06ketan/medium-ops/blob/main/LICENSE",
  },
];

export function ProofCardsMedium() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {CARDS.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-md border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5 transition-colors hover:border-[var(--color-accent)]/40"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-500">
              {c.label}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-700 group-hover:text-[var(--color-accent)] transition-colors">
              ↗
            </span>
          </div>
          <div className="mt-3 sm:mt-4 serif text-xl sm:text-2xl text-zinc-100 leading-tight break-all">
            {c.value}
          </div>
          <div className="mt-2 font-mono text-[11px] sm:text-xs text-zinc-500">
            {c.caption}
          </div>
          {c.badge ? (
            <div className="mt-3 sm:mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.badge}
                alt={`${c.label} badge`}
                className="h-5 sm:h-6"
                loading="lazy"
              />
            </div>
          ) : null}
        </a>
      ))}
    </div>
  );
}
