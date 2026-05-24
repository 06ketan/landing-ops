"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

type Props = {
  brand: string;
  version: string;
  items: Item[];
  rightLabel?: string;
  rightHref?: string;
};

export function NavSticky({ brand, version, items, rightLabel, rightHref }: Props) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [items]);

  return (
    <header className="nav-sticky">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center gap-4">
        <a
          href="#top"
          className="font-mono text-[12px] sm:text-[13px] text-zinc-200 hover:text-[var(--color-accent)] transition flex items-center gap-2"
        >
          <span className="live-dot" aria-hidden />
          <span>{brand}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-500">{version}</span>
        </a>

        <nav className="ml-auto hidden md:flex items-center gap-1">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <a
                key={it.id}
                href={`#${it.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                  isActive
                    ? "text-[var(--color-accent)]"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full transition ${
                    isActive ? "bg-[var(--color-accent)]" : "bg-zinc-700 group-hover:bg-zinc-500"
                  }`}
                  aria-hidden
                />
                {it.label}
              </a>
            );
          })}
        </nav>

        {rightHref ? (
          <a
            href={rightHref}
            target="_blank"
            rel="noreferrer"
            className="ml-auto md:ml-3 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-zinc-400 hover:text-[var(--color-accent)] transition"
          >
            {rightLabel ?? "github"} ↗
          </a>
        ) : null}
      </div>
    </header>
  );
}
