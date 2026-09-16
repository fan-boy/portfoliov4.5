import { notFound } from "next/navigation";
import { findCase } from "../../../lib/data";
import { Events } from "../../../components/events/Events";

export default async function EventsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = findCase(id);
  if (!data) notFound();
  return <Events data={data} />;
}
