"use client";

import { Activity, AlignLeft, ChartBar, LayoutGrid, User } from "../ui/Icon";

const ITEMS = [
  { label: "Cases", Icon: AlignLeft, active: true },
  { label: "Entities", Icon: User, active: false },
  { label: "Detections", Icon: Activity, active: false },
  { label: "Sources", Icon: LayoutGrid, active: false },
  { label: "Reports", Icon: ChartBar, active: false },
];

export function Nav() {
  return (
    <nav className="flex w-236 shrink-0 flex-col gap-2 border-r border-hairline bg-panel px-14 pt-18 pb-16">
      <div className="mb-20 flex items-center gap-9 pt-2 pl-8">
        <span
          className="flex size-20 items-center justify-center rounded-sm text-[12px] leading-[15px] font-semibold"
          style={{ background: "var(--accent-solid)", color: "var(--text-on-accent)" }}
        >
          A
        </span>
        <span className="text-[14px] leading-[20px] font-semibold tracking-[-0.1px] text-primary">
          Artemis
        </span>
      </div>

      {ITEMS.map(({ label, Icon, active }) => (
        <a
          key={label}
          href="#"
          className={[
            "flex h-32 items-center gap-10 rounded-[7px] px-8",
            active ? "bg-hover" : "hover:bg-hover",
          ].join(" ")}
        >
          <span style={{ color: active ? "var(--text-primary)" : "var(--text-muted)" }}>
            <Icon />
          </span>
          <span
            className={[
              "text-[13px] leading-[18px]",
              active ? "font-medium text-primary" : "text-secondary",
            ].join(" ")}
          >
            {label}
          </span>
        </a>
      ))}

      <div className="flex-1" />

      <div className="flex items-center gap-9 pt-10 pl-8">
        <span className="flex size-22 items-center justify-center rounded-full bg-hover text-[9px] leading-[13px] font-medium text-secondary">
          MC
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-[12.5px] leading-[18px] font-medium text-primary">M. Chen</span>
          <span className="text-[11px] leading-[15px] text-faint">Tier 2 · SOC</span>
        </div>
      </div>
    </nav>
  );
}
