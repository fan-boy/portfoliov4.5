import Link from "next/link";

/** "← Work / Records": says these pages belong to Work, and leads back to it. */
export default function WorkCrumb({ page, className = "" }: { page: string; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`font-mono text-[13px] tracking-[-0.01em] ${className}`}>
      <Link href="/" className="opacity-60 transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100">
        ← Work
      </Link>
      <span className="opacity-40"> / </span>
      <span aria-current="page" className="opacity-80">{page}</span>
    </nav>
  );
}
