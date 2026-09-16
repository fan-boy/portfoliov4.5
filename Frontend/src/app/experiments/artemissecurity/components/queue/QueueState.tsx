"use client";

import { EmptyState } from "./EmptyState";
import { FilterBar } from "./FilterBar";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { QueueSkeleton } from "./Skeleton";
import { TopBar } from "./TopBar";
import { ViewBar } from "./ViewBar";

type StateKey = "quiet" | "ingestion-stopped" | "all-closed" | "loading";

const COPY = {
  quiet: {
    released: "431 released today",
    kind: "quiet" as const,
    heading: "Nothing needs your verdict",
    body: "Artemis released 431 cases today and closed 404 of them itself. None of the rest met your review bar. The pipeline is running, there just isn't anything here for you right now.",
    actions: ["Review the 404 Artemis closed", "Sample 10"] as [string, string],
    note: "Last case reviewed 12 minutes ago by M. Chen",
  },
  "ingestion-stopped": {
    released: "0 released in 2h",
    kind: "ingestion" as const,
    heading: "The queue is empty because ingestion stopped",
    body: "Artemis hasn't received events from AWS CloudTrail since 09:12 UTC. Detections that rely on it aren't running, so an empty queue right now doesn't mean a quiet day. Treat this as a blind spot, not a result.",
    detail: { source: "AWS CloudTrail", status: "no events for 2h 14m" },
    actions: ["Retry connection", "Open Sources"] as [string, string],
    note: "",
  },
  "all-closed": {
    released: "404 released today",
    kind: "closed" as const,
    heading: "Artemis closed everything today",
    body: "404 cases released, 404 closed. Nothing crossed your review bar, which happens on a genuinely quiet day. It's still worth pulling a sample — the agent's misses look exactly like this.",
    actions: ["Review all 404", "Sample 10"] as [string, string],
    note: "False positive 361 · True benign 43 · Last sampled 2h ago, no disagreements",
  },
};

export function QueueState({ state }: { state: StateKey }) {
  const loading = state === "loading";
  const copy = loading ? null : COPY[state];

  return (
    <div className="flex h-screen bg-canvas">
      <Nav />
      <main className="flex min-w-0 flex-1 flex-col">
        <TopBar released={loading ? "431 released today" : copy!.released} />
        <ViewBar />
        {/* Loading shows the count it's about to land on rather than 0 — a
            hard zero next to a skeleton reads as "no results", which is the
            one thing the loading state must not say. */}
        <FilterBar empty={!loading} matching={loading ? 13 : undefined} />

        <div
          className={[
            "min-h-0 flex-1 overflow-y-auto px-28 pb-8",
            loading ? "pt-2" : "flex items-center justify-center",
          ].join(" ")}
        >
          {loading ? (
            <QueueSkeleton />
          ) : (
            <EmptyState
              kind={copy!.kind}
              heading={copy!.heading}
              body={copy!.body}
              detail={"detail" in copy! ? copy!.detail : undefined}
              actions={copy!.actions}
              note={copy!.note}
            />
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
}
