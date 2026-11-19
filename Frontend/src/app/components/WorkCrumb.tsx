import Link from "next/link";

/**
 * "← Work / Records": says which section a page belongs to, and leads back to it.
 * `trail` adds plain steps in between, e.g. "← About / Guides / New York".
 */
export default function WorkCrumb({
  page,
  parent = { href: "/", label: "Work" },
  trail = [],
  className = "",
}: {
  page: string;
  parent?: { href: string; label: string };
  trail?: string[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`font-mono text-[13px] tracking-[-0.01em] ${className}`}>
      <Link href={parent.href} className="opacity-60 transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100">
        ← {parent.label}
      </Link>
      {trail.map((step) => (
        <span key={step}>
          <span className="opacity-40"> / </span>
          <span className="opacity-60">{step}</span>
        </span>
      ))}
      <span className="opacity-40"> / </span>
      <span aria-current="page" className="opacity-80">{page}</span>
    </nav>
  );
}
