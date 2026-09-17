import { notFound } from "next/navigation";
import { findCase } from "../../../lib/data";
import { CaseDetail } from "../../../components/case/CaseDetail";

export default async function CasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = findCase(id);
  if (!data) notFound();
  return <CaseDetail data={data} />;
}
