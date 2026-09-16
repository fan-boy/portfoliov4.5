"use client";

import { Layout, Menu, Search } from "../ui/Icon";

export function TopBar({ released = "431 released today" }: { released?: string }) {
  return (
    <header className="flex h-64 shrink-0 items-center justify-between border-b border-hairline px-28">
      <div className="flex items-baseline gap-10">
        <h1 className="text-[18px] leading-[25px] font-semibold tracking-[-0.2px] text-primary">
          Cases
        </h1>
        <span className="tabular font-mono text-[12.5px] leading-[18px] text-faint">
          {released}
        </span>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex h-32 w-280 items-center gap-8 rounded-[8px] border border-line bg-inset pr-8 pl-10">
          <span className="text-faint"><Search /></span>
          <span className="flex-1 text-[12.5px] leading-[18px] text-faint">
            Search cases and entities
          </span>
          <span className="rounded-xs bg-hover px-5 py-2 font-mono text-[10px] leading-[14px] text-faint">
            ⌘K
          </span>
        </div>
        <button className="flex size-32 items-center justify-center rounded-[8px] border border-line bg-inset text-muted hover:bg-hover">
          <Menu />
        </button>
        <button className="flex size-32 items-center justify-center rounded-[8px] border border-line bg-inset text-muted hover:bg-hover">
          <Layout />
        </button>
      </div>
    </header>
  );
}
