import { notFound } from "next/navigation";
import { findCase } from "../../../../lib/data";
import { Ledger } from "../../../../components/ledger/Ledger";

export default async function LedgerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = findCase(id);
  if (!data) notFound();
  return <Ledger data={data} />;
}
