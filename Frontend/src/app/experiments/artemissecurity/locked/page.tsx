import { PasswordGate } from '../PasswordGate';

/**
 * What a locked request is rewritten to. It contains nothing but the form, so
 * a locked response carries none of the protected case study — not in the
 * markup and not in the RSC payload.
 */
export default async function Locked({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return <PasswordGate from={from} />;
}
