type Layer = {
  id: string;
  title: string;
  count: number;
  desc: string;
  tools: string[];
};

const LAYERS: Layer[] = [
  {
    id: "L01",
    title: "Read",
    count: 10,
    desc: "Pull anything from Substack. Zero side effects.",
    tools: [
      "test_connection",
      "get_own_profile",
      "get_profile",
      "list_posts",
      "get_post",
      "get_post_by_id",
      "get_post_content",
      "search_posts",
      "list_notes",
      "list_comments",
      "get_feed",
    ],
  },
  {
    id: "L02",
    title: "Write",
    count: 9,
    desc: "Every mutation is dry-run first. Nothing ships unless you flip the flag.",
    tools: [
      "publish_note",
      "reply_to_note",
      "comment_on_post",
      "react_to_post",
      "react_to_comment",
      "restack_post",
      "restack_note",
      "delete_comment",
      "send_approved_drafts",
    ],
  },
  {
    id: "L03",
    title: "Safety",
    count: 4,
    desc: "Replays are no-ops. Mistakes leave a trail.",
    tools: [
      "audit_search",
      "dedup_status",
      "get_unanswered_comments",
      "bulk_draft_replies",
    ],
  },
  {
    id: "L04",
    title: "Draft loop",
    count: 3,
    desc: "Token-gated. Host LLM drafts. You confirm. Substack ships.",
    tools: ["propose_reply", "confirm_reply", "list_proposals"],
  },
];

export function ToolLayers() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
      {LAYERS.map((l) => (
        <div
          key={l.id}
          className="rounded-md border border-zinc-800 bg-zinc-950/40 p-4 sm:p-6"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
                {l.id}
              </span>
              <span className="serif text-2xl sm:text-3xl text-zinc-100">
                {l.title}
              </span>
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500">
              {l.count} tools
            </span>
          </div>
          <p className="mt-2 sm:mt-3 font-mono text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
            {l.desc}
          </p>
          <ul className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px] sm:text-xs text-zinc-300">
            {l.tools.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 before:content-['·'] before:text-zinc-700"
              >
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
