import type { ReactNode } from "react";

type Props = {
  num: string;
  label: string;
  kicker?: string;
  children?: ReactNode;
  rule?: boolean;
};

export function SectionMarker({ num, label, kicker, rule = true }: Props) {
  return (
    <div className={rule ? "section-rule pt-6 sm:pt-8" : ""}>
      <div className="flex items-baseline gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500">
        <span className="text-zinc-600">§ {num}</span>
        <span className="text-zinc-700">·</span>
        <span className="text-[var(--color-accent)]">{label}</span>
      </div>
      {kicker ? (
        <p className="mt-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-600">
          {kicker}
        </p>
      ) : null}
    </div>
  );
}
