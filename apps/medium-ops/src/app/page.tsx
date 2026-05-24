import {
  CodeCompare,
  InstallTabsMedium,
  MarqueeBand,
  NavSticky,
  ProofCardsMedium,
  Reveal,
  SectionMarker,
  SplitSection,
  TerminalDemoMedium,
  TokenDots,
} from "@landing/ui";

const repo = "https://github.com/06ketan/medium-ops";
const pypi = "https://pypi.org/project/medium-ops/";
const sibling = "https://substack-ops.chavan.in";
const promptsRaw =
  "https://raw.githubusercontent.com/06ketan/medium-ops/main/examples/PROMPTS.md";
const VERSION = "v0.1.0";

const READ_BEFORE = `# 3 browser tabs · 14 clicks · ~5 min
1. open medium.com/me/stats
2. switch to Responses tab
3. scroll, copy/paste threads…
4. tab to Cursor, paste, ask LLM
5. copy reply back, paste in browser
6. submit, wait, repeat`;

const READ_AFTER = `from medium_ops import MediumClient

c = MediumClient.create()
posts = c.list_posts(limit=20, source="rss")  # zero-auth
for p in posts:
    threads = c.list_responses(p.post_id)
    for r in threads:
        ...  # one shot, scriptable, audited`;

const REPLY_BEFORE = `// you, in chat
"draft replies to my unanswered Medium responses"

// LLM:
"sure, can you paste them here?"
... 12 more turns of copy/paste ...
$$$ tokens spent retyping context $$$`;

const REPLY_AFTER = `// host LLM, via MCP
1. tool: get_unanswered_responses(post_id=…)
2. tool: propose_reply(token=A, body="…")
3. you: ✓ ship it
4. tool: confirm_reply(token=A)
   → savePostResponse, audited, deduped.
   → token TTL 5 min, single-use.`;

const NAV_ITEMS = [
  { id: "surface", label: "Surface" },
  { id: "read", label: "Read" },
  { id: "reply", label: "Reply" },
  { id: "safety", label: "Safety" },
  { id: "hybrid", label: "Hybrid" },
  { id: "arch", label: "Arch" },
  { id: "open", label: "Open" },
];

const SURFACES = [
  {
    label: "RSS",
    head: "Public reads, no auth",
    body: "medium.com/feed/@you returns ~10 latest stories with body_html. Default for list_posts / get_post when limit fits.",
  },
  {
    label: "GraphQL",
    head: "Authenticated reads + writes",
    body: "medium.com/_/graphql with sid + xsrf. Powers stats, full archive, post_response, publishPost, deletePost.",
  },
  {
    label: "Integration Token",
    head: "Legacy REST",
    body: "api.medium.com/v1/* with Bearer token. Optional: Medium stopped issuing new tokens in 2023, kept for backward compat.",
  },
  {
    label: "MCP server",
    head: "23 tools, stdio",
    body: "Drop-in for Cursor, Claude Desktop, Claude Code. Your IDE's LLM does the drafting.",
  },
];

const SAFETY = [
  { t: "SQLite dedup", b: "Hash of (kind, target, body) deduped at write. Re-runs return the original audit entry." },
  { t: "JSONL audit log", b: "Append-only, grep-friendly. Every dry-run and every real call lands in one file." },
  { t: "HAR re-snapshot", b: "When Medium changes the GraphQL schema, <code class='font-mono text-zinc-200'>medium-ops auth har file.har</code> ingests a devtools export and snapshots the live wire format." },
  { t: "rate limiter", b: "Per-target spacing, configurable seconds. Gentle to Medium, gentle to your reputation." },
  { t: "dry-run default", b: "Every write is a preview unless you flip --dry-run=false. Newcomers can&apos;t fire blanks." },
  { t: "RSS-first reads", b: "Public path is the default. Auth is only required when you exceed RSS coverage or write." },
];

const HYBRID = [
  {
    label: "RSS",
    body: (
      <>
        Stable. Public. ~10 most recent posts with body, tags, hero image. We default to it for{" "}
        <code className="font-mono text-zinc-200">list_posts</code> /{" "}
        <code className="font-mono text-zinc-200">get_post</code>.
      </>
    ),
  },
  {
    label: "Dashboard GraphQL",
    body: (
      <>
        Undocumented. Powers stats, full archive, all writes. We reverse-engineered{" "}
        <code className="font-mono text-zinc-200">createPost</code> /{" "}
        <code className="font-mono text-zinc-200">publishPost</code> /{" "}
        <code className="font-mono text-zinc-200">savePostResponse</code> via probe payloads.
      </>
    ),
  },
  {
    label: "Integration Token",
    body: (
      <>
        Official REST at <code className="font-mono text-zinc-200">api.medium.com/v1/*</code>. Medium
        stopped issuing new tokens in 2023; if you have one, it still works for{" "}
        <code className="font-mono text-zinc-200">publish_post</code>.
      </>
    ),
  },
];

const ARCH_ROWS = [
  { cap: "Auth surface", us: "Hybrid (RSS / GQL / Token)", a: "Token only", b: "Cookie only" },
  { cap: "Reads", us: "RSS-first, GQL fallback", a: "Public posts only", b: "GQL only" },
  { cap: "Write paths", us: "Token + dashboard GQL", a: "Token only", b: "GQL only" },
  { cap: "Schema-drift recovery", us: "auth har snapshot diff", a: "—", b: "—" },
  { cap: "MCP tools", us: "23", a: "—", b: "—" },
  { cap: "License", us: "MIT", a: "MIT", b: "Various" },
];

export default function MediumOpsPage() {
  return (
    <main id="top" className="flex-1">
      <NavSticky
        brand="medium-ops"
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
              className="text-zinc-500 hover:text-[var(--color-accent)] transition"
              href={sibling}
            >
              sibling: substack-ops ↗
            </a>
          </div>

          <h1 className="serif text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl text-zinc-100 max-w-5xl tracking-tight">
            Reply to your{" "}
            <span className="text-[var(--color-accent)] italic">Medium</span>
            <br className="hidden sm:block" /> from Cursor.
            <br />
            <span className="text-zinc-500">Without an API bill.</span>
          </h1>

          <p className="mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
            <code className="text-zinc-200 font-mono text-sm sm:text-base">medium-ops</code>{" "}
            is a standalone Medium CLI{" "}
            <em className="serif text-zinc-300">and</em> a 23-tool MCP server.
            Hybrid auth: public RSS for reads, undocumented dashboard GraphQL for
            writes, legacy Integration Token when you have one. Your IDE&apos;s
            LLM does the drafting through{" "}
            <code className="text-zinc-200 font-mono text-sm">propose_reply</code> /{" "}
            <code className="text-zinc-200 font-mono text-sm">confirm_reply</code>.
          </p>

          <div className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <div className="min-w-0">
              <InstallTabsMedium />
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
              <TerminalDemoMedium />
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
              One package. <span className="text-zinc-500">Three Medium APIs.</span>
            </h2>
            <p className="mt-4 sm:mt-5 max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
              Medium exposes three usable surfaces. We use all of them — public RSS
              by default, dashboard GraphQL when you need writes, official REST
              when you have a legacy token.
            </p>
          </Reveal>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {SURFACES.map((s) => (
              <div
                key={s.label}
                className="lift rounded-md border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5"
              >
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
                  {s.label}
                </div>
                <div className="mt-3 serif text-lg sm:text-xl text-zinc-100 leading-tight">
                  {s.head}
                </div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== § 02 · READ — split (sticky right) ============== */}
      <section id="read" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            copy={
              <Reveal>
                <SectionMarker num="02" label="Read surface" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05]">
                  Posts, responses, claps —{" "}
                  <span className="italic text-zinc-400">one import.</span>
                </h2>
                <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                  RSS-first. No credentials needed for the common case. Drops to
                  authenticated GraphQL automatically when you ask for more than
                  the feed contains.
                </p>
                <ul className="mt-6 space-y-3 text-sm sm:text-base text-zinc-400">
                  <li className="flex gap-3"><span className="text-[var(--color-accent)]">·</span><span><b className="text-zinc-200">Zero-auth defaults</b> — public RSS first, GQL only when needed.</span></li>
                  <li className="flex gap-3"><span className="text-[var(--color-accent)]">·</span><span><b className="text-zinc-200">Markdown-clean</b> body extraction from messy Medium HTML.</span></li>
                  <li className="flex gap-3"><span className="text-[var(--color-accent)]">·</span><span><b className="text-zinc-200">Stats + archive</b> behind one helper, when you authenticate.</span></li>
                </ul>
              </Reveal>
            }
            visual={
              <CodeCompare
                beforeTitle="manual workflow"
                beforeCode={READ_BEFORE}
                afterTitle="medium-ops"
                afterCode={READ_AFTER}
                stats={[
                  { value: "23", label: "MCP tools" },
                  { value: "31", label: "CLI commands" },
                  { value: "0", label: "auth needed for RSS" },
                  { value: "0", label: "AI tokens spent" },
                ]}
              />
            }
          />
        </div>
      </section>

      {/* ============== § 03 · REPLY — split reverse (sticky left) ============== */}
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
                  no-op. The actual write goes through Medium&apos;s{" "}
                  <code className="font-mono text-sm text-zinc-200">savePostResponse</code>{" "}
                  mutation with the indexed Delta payload format we reverse-engineered.
                </p>
                <div className="mt-8">
                  <TokenDots
                    beforeLabel="paid LLM, retyping context"
                    beforeValue="~3,910 tok"
                    beforeDots={40}
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

      {/* ============== § 04 · SAFETY — split (sticky right) ============== */}
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
                  Plus a Medium-specific guard: HAR re-snapshot. When the
                  dashboard schema drifts, capture a devtools export and re-pin
                  in seconds.
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

      {/* ============== § 05 · HYBRID — split reverse (sticky left) ============== */}
      <section id="hybrid" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            reverse
            copy={
              <Reveal>
                <SectionMarker num="05" label="Why hybrid" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05]">
                  Medium has{" "}
                  <span className="italic text-zinc-400">three half-APIs</span>. We
                  stitched them.
                </h2>
                <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                  No single Medium endpoint covers everything. Public RSS is
                  stable but read-only and capped. The dashboard GraphQL covers
                  stats and writes but is undocumented. The legacy Integration
                  Token works for publishing if you have one. We wrap all three.
                </p>
              </Reveal>
            }
            visual={
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {HYBRID.map((h) => (
                  <div
                    key={h.label}
                    className="lift rounded-md border border-zinc-800 bg-zinc-950/40 p-5"
                  >
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                      {h.label}
                    </div>
                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                      {h.body}
                    </p>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      {/* ============== § 06 · ARCHITECTURE — split (sticky right) ============== */}
      <section id="arch" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <SplitSection
            copy={
              <Reveal>
                <SectionMarker num="06" label="Architecture" />
                <h2 className="serif text-3xl sm:text-5xl text-zinc-100 mt-4 leading-[1.05]">
                  How we compare to{" "}
                  <span className="italic text-zinc-400">the field</span>.
                </h2>
                <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                  One toolkit, two real alternatives, one row per capability.
                  No asterisks.
                </p>
              </Reveal>
            }
            visual={
              <div className="overflow-x-auto rounded-md border border-zinc-800">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-950/60">
                      <th className="text-left px-4 py-3 text-zinc-500 font-mono uppercase tracking-[0.15em] text-[10px]">
                        capability
                      </th>
                      <th className="text-left px-4 py-3 text-[var(--color-accent)] font-mono uppercase tracking-[0.15em] text-[10px]">
                        medium-ops
                      </th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-mono uppercase tracking-[0.15em] text-[10px]">
                        Medium SDK
                      </th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-mono uppercase tracking-[0.15em] text-[10px]">
                        medium-unofficial
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ARCH_ROWS.map((r) => (
                      <tr key={r.cap} className="border-b border-zinc-900/60">
                        <td className="px-4 py-3 text-zinc-300">{r.cap}</td>
                        <td className="px-4 py-3 text-zinc-100">{r.us}</td>
                        <td className="px-4 py-3 text-zinc-500">{r.a}</td>
                        <td className="px-4 py-3 text-zinc-500">{r.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          />
        </div>
      </section>

      {/* ============== § 07 · BUILT IN THE OPEN ============== */}
      <section id="open" className="anchor relative bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionMarker num="07" label="Built in the open" />
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
            <ProofCardsMedium />
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
                href="https://medium.com/@ketan-chavan"
                target="_blank"
                rel="noreferrer"
                className="lift px-3 py-2 rounded-md border border-zinc-700 text-zinc-300 hover:text-[var(--color-accent)]"
              >
                Read me on Medium ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-zinc-900 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-zinc-500">
          <div className="font-mono">
            <span className="text-zinc-300">medium-ops</span> ·{" "}
            <span>{VERSION}</span> · MIT
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-5 font-mono">
            <a className="hover:text-[var(--color-accent)] transition" href={repo} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-[var(--color-accent)] transition" href={pypi} target="_blank" rel="noreferrer">PyPI</a>
            <a className="hover:text-[var(--color-accent)] transition" href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">MCP</a>
            <a className="hover:text-[var(--color-accent)] transition" href="https://glama.ai/mcp/servers/06ketan/medium-ops" target="_blank" rel="noreferrer">Glama</a>
            <a className="hover:text-[var(--color-accent)] transition" href={sibling} target="_blank" rel="noreferrer">substack-ops</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
