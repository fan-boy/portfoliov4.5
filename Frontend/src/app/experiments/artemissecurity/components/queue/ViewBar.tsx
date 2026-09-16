"use client";

import { useState } from "react";
import { ArrowsSort, ChevronDown, Plus } from "../ui/Icon";
import { Menu, MenuItem, MenuList } from "../ui/Menu";
import { SORTS, type Sort } from "../../lib/filters";
import { VIEWS, type View } from "../../lib/views";


/* Everything is the default. A saved view that hides cases is a decision the
   analyst should make, not one the product makes for them on load — and the
   bar's own filters are the honest way to narrow from there. */
export function ViewBar({
  view, onView, sort, onSort,
}: {
  view?: View; onView?: (v: View) => void;
  sort?: Sort; onSort?: (s: Sort) => void;
} = {}) {
  const [open, setOpen] = useState(false);
  const current = sort ?? SORTS[0];
  const selected = view ?? VIEWS[0];

  return (
    <div className="flex h-48 shrink-0 items-center justify-between px-28">
      <div className="flex items-center gap-4">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => onView?.(v)}
            className={[
              "rounded-[7px] px-10 py-6 text-[12.5px] leading-[18px]",
              "transition-colors duration-120 ease-out",
              v === selected
                ? "border border-line bg-hover font-medium text-primary"
                : "text-muted hover:bg-hover",
            ].join(" ")}
          >
            {v}
          </button>
        ))}
        <button className="rounded-[7px] px-8 py-6 text-faint hover:bg-hover">
          <Plus size={12} />
        </button>
      </div>

      <div className="flex items-center gap-8">
        <button
          className="rounded-sm border px-10 py-5 text-[11.5px] leading-[16px] font-medium"
          style={{
            background: "var(--accent-bg)",
            borderColor: "var(--accent-border)",
            color: "var(--accent-hover)",
          }}
        >
          Save as view
        </button>
        <button className="text-[11.5px] leading-[16px] text-faint hover:text-primary">
          Update view
        </button>
        <span className="mx-4 h-16 w-1 bg-line" />
        <span className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={[
              "flex h-32 items-center gap-7 rounded-[7px] border border-line pr-8 pl-9",
              "transition-colors duration-120 ease-out",
              open ? "bg-hover" : "bg-inset hover:bg-hover",
            ].join(" ")}
          >
            <span className="text-muted"><ArrowsSort /></span>
            <span className="text-[12.5px] leading-[18px] font-medium text-secondary">{current}</span>
            {/* A down-chevron flips, it doesn't turn — .chev rotates 90deg,
                which would leave this one pointing left. */}
            <span
              className="text-faint transition-transform duration-200 ease-out"
              style={{ transform: open ? "rotate(180deg)" : undefined }}
            >
              <ChevronDown />
            </span>
          </button>
          {open && (
            <Menu title="Sort by" width={250} align="right" onClose={() => setOpen(false)}>
              <MenuList>
                {SORTS.map((s) => (
                  <MenuItem
                    key={s}
                    label={s}
                    selected={s === current}
                    onClick={() => { onSort?.(s); setOpen(false); }}
                  />
                ))}
              </MenuList>
            </Menu>
          )}
        </span>
      </div>
    </div>
  );
}
