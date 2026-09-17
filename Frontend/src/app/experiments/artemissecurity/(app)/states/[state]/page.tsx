import { notFound } from "next/navigation";
import { QueueState } from "../../../components/queue/QueueState";

const STATES = ["quiet", "ingestion-stopped", "all-closed", "loading"] as const;
export type StateKey = (typeof STATES)[number];

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  if (!STATES.includes(state as StateKey)) notFound();
  return <QueueState state={state as StateKey} />;
}
