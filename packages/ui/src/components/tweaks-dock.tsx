"use client";

import { useEffect, useState } from "react";

const HUE_KEY = "so-tweak-hue";
const GRAIN_KEY = "so-tweak-grain";
const DENSITY_KEY = "so-tweak-density";

const DEFAULT_HUE = 32;
const DEFAULT_GRAIN = 4;
const DEFAULT_DENSITY = "comfortable" as const;

type Density = "compact" | "comfortable";

function applyHue(h: number) {
  document.documentElement.style.setProperty("--accent", `oklch(0.72 0.18 ${h})`);
}
function applyGrain(g: number) {
  document.documentElement.style.setProperty("--grain-opacity", String(g / 100));
}
function applyDensity(d: Density) {
  document.documentElement.dataset.density = d;
}

export function TweaksDock() {
  const [open, setOpen] = useState(false);
  const [hue, setHue] = useState(DEFAULT_HUE);
  const [grain, setGrain] = useState(DEFAULT_GRAIN);
  const [density, setDensity] = useState<Density>(DEFAULT_DENSITY);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const h = Number(localStorage.getItem(HUE_KEY) ?? DEFAULT_HUE);
    const g = Number(localStorage.getItem(GRAIN_KEY) ?? DEFAULT_GRAIN);
    const d = (localStorage.getItem(DENSITY_KEY) as Density) ?? DEFAULT_DENSITY;
    setHue(h);
    setGrain(g);
    setDensity(d);
    applyHue(h);
    applyGrain(g);
    applyDensity(d);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyHue(hue);
    localStorage.setItem(HUE_KEY, String(hue));
  }, [hue, mounted]);

  useEffect(() => {
    if (!mounted) return;
    applyGrain(grain);
    localStorage.setItem(GRAIN_KEY, String(grain));
  }, [grain, mounted]);

  useEffect(() => {
    if (!mounted) return;
    applyDensity(density);
    localStorage.setItem(DENSITY_KEY, density);
  }, [density, mounted]);

  function reset() {
    setHue(DEFAULT_HUE);
    setGrain(DEFAULT_GRAIN);
    setDensity(DEFAULT_DENSITY);
  }

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 font-mono text-[11px]">
      {open ? (
        <div className="w-[260px] sm:w-[280px] rounded-md border border-zinc-800 bg-zinc-950/95 backdrop-blur p-3 sm:p-4 shadow-2xl glow">
          <div className="flex items-center justify-between mb-3">
            <span className="uppercase tracking-[0.2em] text-zinc-500">
              tweaks
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 hover:text-zinc-200"
              aria-label="Close tweaks"
            >
              ×
            </button>
          </div>

          <label className="block mb-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span>accent hue</span>
              <span className="text-[var(--color-accent)]">{hue}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              className="mt-1 w-full accent-[var(--color-accent)]"
              aria-label="Accent hue"
            />
          </label>

          <label className="block mb-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span>grain</span>
              <span className="text-[var(--color-accent)]">{grain}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              value={grain}
              onChange={(e) => setGrain(Number(e.target.value))}
              className="mt-1 w-full accent-[var(--color-accent)]"
              aria-label="Grain opacity"
            />
          </label>

          <div className="mb-3">
            <div className="text-zinc-400 mb-1">density</div>
            <div className="grid grid-cols-2 gap-1">
              {(["compact", "comfortable"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDensity(d)}
                  className={`px-2 py-1 rounded border text-[11px] uppercase tracking-[0.2em] ${
                    density === d
                      ? "border-[var(--color-accent)]/60 text-[var(--color-accent)] bg-[color-mix(in_oklch,var(--color-accent)_10%,transparent)]"
                      : "border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full px-2 py-1.5 rounded border border-zinc-800 text-zinc-400 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 uppercase tracking-[0.2em] text-[10px]"
          >
            reset
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-md border border-zinc-800 bg-zinc-950/90 backdrop-blur px-3 py-2 uppercase tracking-[0.25em] text-zinc-400 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 shadow-lg"
          aria-label="Open tweaks"
        >
          ⚙ tweaks
        </button>
      )}
    </div>
  );
}
