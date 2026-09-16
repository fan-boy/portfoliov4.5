"use client";

import { ChevronRight, Search } from "../ui/Icon";
import { Modal } from "../ui/Modal";
import { fieldFor, type FieldDef } from "../../lib/filters";

/* Every filterable field, grouped by the question it answers rather than by
   the table it lives in. Two columns because seven groups in one column is a
   scroll, and a menu you have to scroll stops teaching.

   SUGGESTED at the top is the part only this product can offer: three filters
   that exist because an agent did the triage. */

interface Item {
  label: string;
  /** What the value menu will hold, previewed so the row teaches. */
  hint: string;
  suggested?: boolean;
}

const COL_A: [string, Item[]][] = [
  ["SUGGESTED", [
    { label: "Coverage is not complete", hint: "complete, partial, failed", suggested: true },
    { label: "Escalated since you looked", hint: "yes / no", suggested: true },
    { label: "Continues a case you closed", hint: "yes / no", suggested: true },
  ]],
  ["TRIAGE", [
    { label: "Severity", hint: "4" },
    { label: "Verdict", hint: "3" },
    { label: "Confidence", hint: "3" },
    { label: "Status", hint: "3" },
  ]],
  ["EVIDENCE", [
    { label: "Source", hint: "7" },
    { label: "Coverage", hint: "complete, partial, failed" },
    { label: "Findings count", hint: "range" },
    { label: "Detection rule", hint: "142" },
  ]],
];

const COL_B: [string, Item[]][] = [
  ["ENTITIES & OBSERVABLES", [
    { label: "Entity", hint: "typeahead" },
    { label: "Entity attribute", hint: "privileged, exec" },
    { label: "Observable", hint: "IP, domain, hash" },
    { label: "MITRE technique", hint: "tactic or ID" },
  ]],
  ["ASSIGNMENT", [
    { label: "Assignee", hint: "me, unassigned" },
    { label: "Assignment group", hint: "4" },
  ]],
  ["TIME", [
    { label: "Detected", hint: "range" },
    { label: "Released", hint: "range" },
    { label: "Updated", hint: "range" },
  ]],
  ["SIGNALS", [
    { label: "Escalated", hint: "yes / no" },
    { label: "Changed since you viewed", hint: "yes / no" },
    { label: "Continues a closed case", hint: "yes / no" },
    { label: "In a campaign", hint: "yes / no" },
  ]],
];

/* The suggested rows are whole filters, not fields — picking one drops in a
   chip with its value already set. */
const SUGGESTED_PRESET: Record<string, { field: string; op: "is" | "is not"; value: string }> = {
  "Coverage is not complete": { field: "Coverage", op: "is not", value: "Complete" },
  "Escalated since you looked": { field: "Escalated", op: "is", value: "Yes" },
  "Continues a case you closed": { field: "Continues a closed case", op: "is", value: "yes" },
};

function Bolt() {
  return (
    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M4 0 L4 3.5 L7 3.5 L3 9 L3 5.5 L0 5.5 L4 0 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

function Row({ item, onPick }: { item: Item; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      className="flex h-30 items-center gap-8 rounded-sm px-8 text-left transition-colors duration-120 ease-out hover:bg-hover"
    >
      {item.suggested && (
        <span style={{ color: "var(--accent-default)" }}><Bolt /></span>
      )}
      <span className="min-w-0 flex-1 truncate text-[12.5px] leading-[18px] text-secondary">
        {item.label}
      </span>
      {!item.suggested && (
        <>
          <span className="shrink-0 text-[10.5px] leading-[15px] text-faint">{item.hint}</span>
          <span className="flex w-3 shrink-0 justify-center text-faint">
            <ChevronRight size={11} />
          </span>
        </>
      )}
    </button>
  );
}

function Group({ label, items, onPick }: { label: string; items: Item[]; onPick: (i: Item) => void }) {
  return (
    <div className="flex flex-col pt-12 pb-4">
      <span className="block text-[9.5px] leading-[13px] font-medium tracking-[0.7px] text-faint">
        {label}
      </span>
      <div className="flex flex-col pt-6">
        {items.map((i) => (
          <Row key={i.label} item={i} onPick={() => onPick(i)} />
        ))}
      </div>
    </div>
  );
}

export function AddFilter({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (field: FieldDef, op: "is" | "is not", values: string[]) => void;
}) {
  const pick = (item: Item) => {
    const preset = SUGGESTED_PRESET[item.label];
    if (preset) {
      onPick(fieldFor(preset.field, item.hint), preset.op, [preset.value]);
    } else {
      onPick(fieldFor(item.label, item.hint), "is", []);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} width={544} label="Add filter">
      <div className="flex items-center gap-9 border-b border-hairline px-14 py-12">
        <span className="text-faint"><Search size={13} /></span>
        <input
          /* Focus lands here when the dialog opens, which is both the useful
             behaviour and what moves focus inside the modal boundary. */
          autoFocus
          placeholder="Filter by field or value"
          aria-label="Filter by field or value"
          className="flex-1 bg-transparent text-[12.5px] leading-[18px] text-primary placeholder:text-faint"
        />
      </div>
      <div className="flex gap-8 px-8 pb-10">
        <div className="flex w-263 shrink-0 flex-col">
          {COL_A.map(([label, items]) => (
            <Group key={label} label={label} items={items} onPick={pick} />
          ))}
        </div>
        <div className="flex w-263 shrink-0 flex-col">
          {COL_B.map(([label, items]) => (
            <Group key={label} label={label} items={items} onPick={pick} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
