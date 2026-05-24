type Props = {
  beforeLabel: string;
  beforeValue: string | number;
  beforeDots: number;
  afterLabel: string;
  afterValue: string | number;
  afterDots: number;
  caption?: string;
};

function Dots({ count, variant }: { count: number; variant: "before" | "after" }) {
  const cap = Math.min(Math.max(count, 0), 100);
  return (
    <div className={`token-dots token-dots--${variant}`} aria-hidden>
      {Array.from({ length: cap }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

export function TokenDots({
  beforeLabel,
  beforeValue,
  beforeDots,
  afterLabel,
  afterValue,
  afterDots,
  caption,
}: Props) {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              {beforeLabel}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-zinc-300">
              {beforeValue}
            </span>
          </div>
          <Dots count={beforeDots} variant="before" />
        </div>
        <div className="hidden sm:block font-mono text-2xl text-[var(--color-accent)] text-center">
          ⟶
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {afterLabel}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-zinc-100">
              {afterValue}
            </span>
          </div>
          <Dots count={afterDots} variant="after" />
        </div>
      </div>
      {caption ? (
        <div className="mt-3 sm:mt-4 font-mono text-[10px] sm:text-[11px] text-zinc-500 text-center">
          {caption}
        </div>
      ) : null}
    </div>
  );
}
