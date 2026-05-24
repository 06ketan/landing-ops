import {
  ArchitectureTable,
  CodeCompare,
  EcosystemFlow,
  InstallTabs,
  MarqueeBand,
  NavSticky,
  ProofCards,
  Reveal,
  SectionMarker,
  SplitSection,
  SurfaceGrid,
  TerminalDemo,
  TokenDots,
  ToolLayers,
  TweaksDock,
} from "@landing/ui";

const repo = "https://github.com/06ketan/substack-ops";
const pypi = "https://pypi.org/project/substack-ops/";
const promptsRaw =
  "https://raw.githubusercontent.com/06ketan/substack-ops/main/examples/PROMPTS.md";
const VERSION = "v0.3.3";

const READ_BEFORE = `# 3 browser tabs · 17 clicks · ~6 min
1. open dashboard.substack.com
2. switch to Notes tab
3. scroll, copy/paste threads…
4. tab to Cursor, paste, ask LLM
5. copy reply back, paste in browser
6. submit, wait, repeat`;

const READ_AFTER = `from substack_ops import SubstackOps

so = SubstackOps()

posts = so.posts.list(limit=20)
for p in posts:
    threads = so.comments.unanswered(p.id)
    for t in threads:
        ...  # one shot, scriptable, audited`;

const REPLY_BEFORE = `// you, in chat
"draft replies to my unanswered comments"

// LLM:
"sure, can you paste the comments here?"
... 12 more turns of copy/paste ...
$$$ tokens spent retyping context $$$`;

const REPLY_AFTER = `// host LLM, via MCP
1. tool: get_unanswered_comments(post_id=…)
2. tool: propose_reply(token=A, body="…")
3. you: ✓ ship it
4. tool: confirm_reply(token=A)
   → posted, deduped, audited.
   → token TTL 5 min, single-use.`;

const NAV_ITEMS = [
  { id: "surface", label: "Surface" },
  { id: "read", label: "Read" },
  { id: "reply", label: "Reply" },
  { id: "safety", label: "Safety" },
  { id: "mcp", label: "MCP" },
  { id: "why", label: "Why" },
  { id: "arch", label: "Arch" },
  { id: "open", label: "Open" },
];

const SAFETY = [
  { t: "SQLite dedup", b: "Hash of (kind, target, body) deduped at write. Re-runs return the original audit entry." },
  { t: "JSONL audit log", b: "Append-only, grep-friendly. Every dry-run and every real call lands in one file." },
  { t: "ancestor_path guard", b: "Replies are pinned to the right thread root. No accidental top-level posts under the wrong comment." },
  { t: "rate limiter", b: "Per-target spacing, configurable seconds. Gentle to Substack, gentle to your reputation." },
  { t: "dry-run default", b: "Every write is a preview unless you flip --dry-run=false. Newcomers can&apos;t fire blanks." },
  { t: "dedup_status tool", b: "Inspect the dedup DB live from your IDE. Never wonder if a draft already shipped." },
];

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <NavSticky
        brand="substack-ops"
        version={VERSION}
        items={NAV_ITEMS}
        rightLabel="github"
        rightHref={repo}
      />

      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden bg-noise">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-60" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-24">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 font-mono text-[11px] sm:text-xs flex-wrap">
            <span className="px-2 py-1 rounded border border-[var(--color-accent)] text-[var(--color-accent)] pulse">
              {VERSION}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500">MIT</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-500">Python 3.12+</span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-500">MCP-compatible</span>
            <span className="text-zinc-700">·</span>
            <a
              href="https://medium-ops.chavan.in"
              className="text-zinc-500 hover:text-[var(--color-accent)] transition"
            >
              sibling: medium-ops ↗
            </a>
          </div>

          <h1 className="serif text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl text-zinc-100 max-w-5xl tracking-tight">
            Reply to your{" "}
            <span className="text-[var(--color-accent)] italic">Substack</span>
            <br className="hidden sm:block" /> from Cursor.
            <br />
            <span className="text-zinc-500">Without an API bill.</span>
          </h1>

          <p className="mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
            <code className="text-zinc-200 font-mono text-sm sm:text-base">substack-ops</code>{" "}
            is a standalone Substack CLI <em className="serif text-zinc-300">and</em>{" "}
            a 26-tool MCP server. Your IDE&apos;s LLM does the drafting through{" "}
            <code className="text-zinc-200 font-mono text-sm">propose_reply</code> /{" "}
            <code className="text-zinc-200 font-mono text-sm">confirm_reply</code>. You
            never pay an Anthropic or OpenAI bill for a reply you&apos;d write yourself
            anyway.
          </p>

          <div className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <div className="min-w-0">
              <InstallTabs />
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3 text-sm font-mono">
                <a
                  href={repo}
                  target="_blank"
                  rel="noreferrer"
                  className="lift px-3 sm:px-4 py-2 rounded-md bg-[var(--color-accent)] text-zinc-950 font-semibold hover:brightness-110"
                >
                  GitHub →
                </a>
                <a
                  href={pypi}
                  target="_blank"
                  rel="noreferrer"
                  className="lift px-3 sm:px-4 py-2 rounded-md border border-zinc-700 text-zinc-200"
                >
                  PyPI ↗
                </a>
                <a
                  href={promptsRaw}
                  target="_blank"
                  rel="noreferrer"
                  className="lift px-3 sm:px-4 py-2 rounded-md border border-zinc-700 text-zinc-200"
                >
                  Example prompts ↗
                </a>
              </div>
            </div>
            <div className="min-w-0">
              <TerminalDemo />
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand />

      {/* ============== § 01 · SURFACE ============== */}
      <section id="surface" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionMarker num="01" label="Surface" rule={false} />
          <Reveal>
            <h2 className="serif text-3xl sm:text-5xl lg:text-6xl text-zinc-100 mt-4 max-w-3xl leading-[1.05]">
              One binary. <span className="text-zinc-500">Four surfaces.</span>
            </h2>
            <p className="mt-4 sm:mt-5 max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
              The same Python package you{" "}
              <code className="font-mono text-zinc-200 text-sm">pip install</code>{" "}
              shows up as a CLI, an MCP server, an audit layer, and a daemon. Pick
              whichever surface fits the moment.
            </p>
          </Reveal>
          <div className="mt-8 sm:mt-12">
            <SurfaceGrid />
          </div>
        </div>
      </section>

      {/* ============== § 02 · READ SURFACE — split (sticky right) ============== */}
      <section id="read" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            copy={
              <Reveal>
                <SectionMarker num="02" label="Read surface" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05]">
                  Every Substack endpoint,{" "}
                  <span className="italic text-zinc-400">one import.</span>
                </h2>
                <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                  Posts, notes, comments, search, feed, profiles. Read-only by design,
                  scriptable by default, idempotent by convention.
                </p>
                <ul className="mt-6 space-y-3 text-sm sm:text-base text-zinc-400">
                  <li className="flex gap-3"><span className="text-[var(--color-accent)]">·</span><span><b className="text-zinc-200">RSS-equivalent reads</b> with paging, sort, search.</span></li>
                  <li className="flex gap-3"><span className="text-[var(--color-accent)]">·</span><span><b className="text-zinc-200">Markdown conversion</b> built-in via <code className="font-mono text-zinc-200 text-xs">as_markdown</code>.</span></li>
                  <li className="flex gap-3"><span className="text-[var(--color-accent)]">·</span><span><b className="text-zinc-200">Search</b> hits Substack&apos;s full-text endpoint, no scraping.</span></li>
                  <li className="flex gap-3"><span className="text-[var(--color-accent)]">·</span><span><b className="text-zinc-200">Profile + feed</b> for For-You / Subscribed tabs.</span></li>
                </ul>
              </Reveal>
            }
            visual={
              <CodeCompare
                beforeTitle="manual workflow"
                beforeCode={READ_BEFORE}
                afterTitle="substack-ops"
                afterCode={READ_AFTER}
                stats={[
                  { value: "26", label: "MCP tools" },
                  { value: "48", label: "CLI commands" },
                  { value: "10", label: "command groups" },
                  { value: "0", label: "AI tokens spent" },
                ]}
              />
            }
          />
        </div>
      </section>

      {/* ============== § 03 · REPLY ENGINE — split reverse (sticky left) ============== */}
      <section id="reply" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            reverse
            copy={
              <Reveal>
                <SectionMarker num="03" label="Reply engine" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05]">
                  Token-gated{" "}
                  <span className="text-[var(--color-accent)] italic">propose</span>{" "}
                  → <span className="text-[var(--color-accent)] italic">confirm</span>.
                </h2>
                <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                  The host LLM drafts. You see the preview. You confirm. The token
                  expires in 5 minutes. SQLite dedup means a stuck loop replays as a
                  no-op.
                </p>
                <div className="mt-8">
                  <TokenDots
                    beforeLabel="paid LLM, retyping context"
                    beforeValue="~4,820 tok"
                    beforeDots={48}
                    afterLabel="propose / confirm"
                    afterValue="0 AI tok"
                    afterDots={0}
                    caption="every reply pays your subscription, never a per-token bill"
                  />
                </div>
              </Reveal>
            }
            visual={
              <CodeCompare
                beforeTitle="copy / paste with paid LLM"
                beforeCode={REPLY_BEFORE}
                afterTitle="propose_reply / confirm_reply"
                afterCode={REPLY_AFTER}
                stats={[
                  { value: "5m", label: "token TTL" },
                  { value: "1×", label: "dedup hash" },
                  { value: "JSONL", label: "audit log" },
                  { value: "$0", label: "AI bill" },
                ]}
              />
            }
          />
        </div>
      </section>

      {/* ============== § 04 · SAFETY STACK — split (sticky right) ============== */}
      <section id="safety" className="anchor relative bg-zinc-950">
        <div className="absolute inset-0 bg-grid-soft pointer-events-none opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            copy={
              <Reveal>
                <SectionMarker num="04" label="Safety stack" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05]">
                  Replays are no-ops.{" "}
                  <span className="text-zinc-500">Mistakes leave a trail.</span>
                </h2>
                <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                  Six guards stack on every write. None of them are opt-in — they
                  ship in the box, dry-run by default.
                </p>
              </Reveal>
            }
            visual={
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {SAFETY.map((c) => (
                  <div
                    key={c.t}
                    className="lift rounded-md border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5"
                  >
                    <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                      {c.t}
                    </div>
                    <p
                      className="mt-2 text-sm text-zinc-400 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: c.b }}
                    />
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      {/* ============== § 05 · 26-TOOL MCP SERVER — split reverse (sticky left) ============== */}
      <section id="mcp" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            reverse
            copy={
              <Reveal>
                <SectionMarker num="05" label="The 26-tool MCP server" kicker="flagship" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05]">
                  Four layers. <span className="italic text-zinc-400">All shipping.</span>
                </h2>
                <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                  Tool definitions are written for TDQS — every entry tags side
                  effects, parameter shape, and the sibling tool you should reach
                  for instead.
                </p>
                <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                  Layers stack: <b className="text-zinc-200">Read</b> never writes.
                  <b className="text-zinc-200"> Write</b> always dry-runs first.
                  <b className="text-zinc-200"> Safety</b> dedups + audits every call.
                  <b className="text-zinc-200"> Draft loop</b> hands the keyboard back to you.
                </p>
              </Reveal>
            }
            visual={<ToolLayers />}
          />
        </div>
      </section>

      {/* ============== § 06 · WHY THIS MATTERS — split (sticky right) ============== */}
      <section id="why" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            copy={
              <Reveal>
                <SectionMarker num="06" label="Why this matters" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05] max-w-xl">
                  Stop double-paying<br />
                  <span className="text-zinc-500">for tokens.</span>
                </h2>
                <p className="mt-5 sm:mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
                  Most “AI” CLIs make you bring an{" "}
                  <code className="font-mono text-zinc-200 text-sm">ANTHROPIC_API_KEY</code>.
                  You then pay twice — once for your Cursor / Claude subscription,
                  once for tokens your IDE could have generated for free.
                </p>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
                  MCP fixes that. The IDE talks to{" "}
                  <code className="font-mono text-zinc-200 text-sm">substack-ops</code>{" "}
                  over stdio, calls{" "}
                  <code className="font-mono text-zinc-200 text-sm">get_unanswered_comments</code>,
                  drafts the reply locally, hands it to{" "}
                  <code className="font-mono text-zinc-200 text-sm">propose_reply</code>{" "}
                  — you confirm — Substack ships it. The CLI is just hands.
                </p>
              </Reveal>
            }
            visual={<EcosystemFlow />}
          />
        </div>
      </section>

      {/* ============== § 07 · ARCHITECTURE — split reverse (sticky left) ============== */}
      <section id="arch" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            reverse
            copy={
              <Reveal>
                <SectionMarker num="07" label="Architecture" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05]">
                  How we compare to{" "}
                  <span className="italic text-zinc-400">the field</span>.
                </h2>
                <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                  One toolkit, two real alternatives, one row per capability. No
                  asterisks.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-zinc-400">
                  <li><b className="text-zinc-200">Substack-side parity</b>: every endpoint we found, exposed.</li>
                  <li><b className="text-zinc-200">Operational parity</b>: dedup + audit + dry-run, baked in.</li>
                  <li><b className="text-zinc-200">Distribution parity</b>: PyPI, official MCP Registry, Glama.</li>
                </ul>
              </Reveal>
            }
            visual={<ArchitectureTable />}
          />
        </div>
      </section>

      {/* ============== § 08 · BUILT IN THE OPEN ============== */}
      <section id="open" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionMarker num="08" label="Built in the open" />
          <Reveal>
            <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 max-w-3xl leading-[1.05]">
              Public package, public registry,{" "}
              <span className="italic text-zinc-400">public PRs.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
              Six surfaces of receipts. Click any card to verify.
            </p>
          </Reveal>
          <div className="mt-8 sm:mt-12">
            <ProofCards />
          </div>
          <div className="mt-10 sm:mt-12 lift rounded-md border border-zinc-800 bg-zinc-950/60 p-5 sm:p-6">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
              contribute
            </div>
            <p className="mt-2 sm:mt-3 serif text-2xl sm:text-3xl text-zinc-100 leading-tight">
              Open an issue. Open a PR. Or just install it and tell me what broke.
            </p>
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3 font-mono text-xs sm:text-sm">
              <a
                href={`${repo}/issues/new`}
                target="_blank"
                rel="noreferrer"
                className="lift px-3 py-2 rounded-md border border-zinc-700 text-zinc-300 hover:text-[var(--color-accent)]"
              >
                File an issue ↗
              </a>
              <a
                href={`${repo}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noreferrer"
                className="lift px-3 py-2 rounded-md border border-zinc-700 text-zinc-300 hover:text-[var(--color-accent)]"
              >
                Contributing guide ↗
              </a>
              <a
                href="https://ketanchavan.substack.com"
                target="_blank"
                rel="noreferrer"
                className="lift px-3 py-2 rounded-md border border-zinc-700 text-zinc-300 hover:text-[var(--color-accent)]"
              >
                Subscribe (the dogfood) ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-zinc-900 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-zinc-500">
          <div className="font-mono">
            <span className="text-zinc-300">substack-ops</span> ·{" "}
            <span>{VERSION}</span> · MIT
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-5 font-mono">
            <a className="hover:text-[var(--color-accent)] transition" href={repo} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-[var(--color-accent)] transition" href={pypi} target="_blank" rel="noreferrer">PyPI</a>
            <a className="hover:text-[var(--color-accent)] transition" href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">MCP</a>
            <a className="hover:text-[var(--color-accent)] transition" href="https://glama.ai/mcp/servers/06ketan/substack-ops" target="_blank" rel="noreferrer">Glama</a>
            <a className="hover:text-[var(--color-accent)] transition" href="https://ketanchavan.substack.com" target="_blank" rel="noreferrer">Substack</a>
            <a className="hover:text-[var(--color-accent)] transition" href="https://medium-ops.chavan.in" target="_blank" rel="noreferrer">medium-ops</a>
          </div>
        </div>
      </footer>

      <TweaksDock />
    </main>
  );
}
