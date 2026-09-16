"use client";

import { useState } from "react";
import { ChevronDown, Plus, X } from "../ui/Icon";
import { Menu, MenuItem, MenuList } from "../ui/Menu";
import { Modal } from "../ui/Modal";
import {
  FIELDS, GLYPH, operatorsFor, summarise,
  type BarState, type Chip, type Joiner,
} from "../../lib/filters";

/* The builder is the only shape that scales past depth two. The bar handles
   nesting up to about two levels and the query is exact at any depth, but
   editing deep nesting needs a vertical editor — one condition per line, one
   joiner per line, nothing wrapping.

   Within a single level the joiner is the same for every row, so there is
   never any precedence to guess. Changing one changes them all. */

type OpenId = string | null;

function Select({
  label, strong, width, id, open, setOpen, title, children,
}: {
  label: string; strong?: boolean; width: number; id: string;
  open: OpenId; setOpen: (o: OpenId) => void; title: string; children: React.ReactNode;
}) {
  return (
    <span className="relative shrink-0" style={{ width }}>
      <button
        onClick={() => setOpen(open === id ? null : id)}
        className={[
          "flex h-31 w-full items-center justify-between gap-6 rounded-sm border border-line pr-7 pl-9",
          "transition-colors duration-120 ease-out",
          open === id ? "bg-hover" : "bg-inset hover:bg-hover",
        ].join(" ")}
      >
        <span
          className={[
            "min-w-0 truncate text-[12px] leading-[17px] font-medium",
            strong ? "text-primary" : "text-secondary",
          ].join(" ")}
        >
          {label}
        </span>
        <span className="shrink-0 text-faint"><ChevronDown size={11} /></span>
      </button>
      {open === id && (
        <Menu title={title} width={Math.max(width, 196)} onClose={() => setOpen(null)}>
          <MenuList>{children}</MenuList>
        </Menu>
      )}
    </span>
  );
}

function JoinerSlot({
  first, word, slot, id, open, setOpen, onChange, accent,
}: {
  first: boolean; word: Joiner; slot: number; id: string;
  open: OpenId; setOpen: (o: OpenId) => void; onChange: (j: Joiner) => void; accent?: boolean;
}) {
  return (
    <span className="flex shrink-0 items-center" style={{ width: slot }}>
      {first ? (
        <span className="text-[11.5px] leading-[16px] text-faint">Where</span>
      ) : (
        <span className="relative">
          <button
            onClick={() => setOpen(open === id ? null : id)}
            className="flex h-25 items-center gap-5 rounded-[5px] border pr-6 pl-8"
            style={
              accent
                ? { background: "var(--accent-bg)", borderColor: "var(--accent-border)" }
                : { background: "var(--bg-surface-hover)", borderColor: "var(--border-default)" }
            }
          >
            <span
              className="font-mono text-[10.5px] leading-[15px] font-medium"
              style={{ color: accent ? "var(--accent-hover)" : "var(--text-secondary)" }}
            >
              {word}
            </span>
            <span className="text-faint"><ChevronDown size={10} /></span>
          </button>
          {open === id && (
            <Menu title="Joiner" width={160} onClose={() => setOpen(null)}>
              <MenuList>
                {(["and", "or"] as Joiner[]).map((j) => (
                  <MenuItem key={j} label={j} selected={word === j} onClick={() => { onChange(j); setOpen(null); }} />
                ))}
              </MenuList>
            </Menu>
          )}
        </span>
      )}
    </span>
  );
}

function Condition({
  chip, i, first, joiner, nested, idBase, open, setOpen, onChange, onJoiner, onRemove,
}: {
  chip: Chip; i: number; first: boolean; joiner: Joiner; nested?: boolean; idBase: string;
  open: OpenId; setOpen: (o: OpenId) => void;
  onChange: (c: Chip) => void; onJoiner: (j: Joiner) => void; onRemove: () => void;
}) {
  const w = nested
    ? { slot: 52, field: 108, op: 68, value: 114 }
    : { slot: 66, field: 128, op: 84, value: 164 };

  const pick = (v: string) => {
    const multi = chip.op === "is any of";
    const values = multi
      ? chip.values.includes(v) ? chip.values.filter((x) => x !== v) : [...chip.values, v]
      : [v];
    onChange({ ...chip, values });
    if (!multi) setOpen(null);
  };

  return (
    <div className="flex items-center gap-8">
      <JoinerSlot
        first={first} word={joiner} slot={w.slot} id={`${idBase}-j${i}`}
        open={open} setOpen={setOpen} onChange={onJoiner}
      />

      <Select
        id={`${idBase}-${i}-f`} width={w.field} label={chip.field.label} title="Field"
        open={open} setOpen={setOpen}
      >
        {Object.values(FIELDS).map((f) => (
          <MenuItem
            key={f.key}
            label={f.label}
            selected={f.key === chip.field.key}
            onClick={() => { onChange({ field: f, op: "is", values: [] }); setOpen(null); }}
          />
        ))}
      </Select>

      <Select
        /* Glyph, not words — "is or above" doesn't fit a 68px select, and the
           bar already taught the reader what ≥ means here. */
        id={`${idBase}-${i}-o`} width={w.op} label={GLYPH[chip.op] ?? chip.op} title="Operator"
        open={open} setOpen={setOpen}
      >
        {operatorsFor(chip.field).map((o) => (
          <MenuItem
            key={o}
            label={o}
            selected={chip.op === o}
            onClick={() => {
              onChange({ ...chip, op: o, values: o === "is any of" ? chip.values : chip.values.slice(0, 1) });
              setOpen(null);
            }}
          />
        ))}
      </Select>

      <Select
        id={`${idBase}-${i}-v`} width={w.value} label={summarise(chip)} strong title="Value"
        open={open} setOpen={setOpen}
      >
        {chip.field.values.map((v) => (
          <MenuItem
            key={v.value}
            label={v.label}
            swatch={v.swatch}
            trailing
            selected={chip.values.includes(v.value)}
            onClick={() => pick(v.value)}
          />
        ))}
      </Select>

      <button
        onClick={onRemove}
        className="flex size-24 shrink-0 items-center justify-center rounded-[5px] text-faint transition-colors duration-120 ease-out hover:bg-hover hover:text-primary"
      >
        <X size={11} />
      </button>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-28 shrink-0 items-center gap-6 rounded-sm border border-line pr-10 pl-9 transition-colors duration-120 ease-out hover:bg-hover"
    >
      <span className="text-muted"><Plus /></span>
      <span className="text-[11.5px] leading-[16px] font-medium text-secondary">{label}</span>
    </button>
  );
}

export function Builder({
  open, onClose, bar, onChange, matching, onSwitchToQuery,
}: {
  open: boolean; onClose: () => void; bar: BarState;
  onChange: (b: BarState) => void; matching: number; onSwitchToQuery: () => void;
}) {
  const [menu, setMenu] = useState<OpenId>(null);

  const setIn = (where: "group" | "tail", i: number, c: Chip) =>
    onChange({ ...bar, [where]: bar[where].map((x, j) => (j === i ? c : x)) });
  const removeIn = (where: "group" | "tail", i: number) =>
    onChange({ ...bar, [where]: bar[where].filter((_, j) => j !== i) });

  return (
    <Modal open={open} onClose={onClose} width={532} label="Filter builder">
      <div className="flex items-center justify-between border-b border-hairline py-12 pr-12 pl-16">
        <span className="block text-[12.5px] leading-[18px] font-medium text-primary">Filter</span>
        <button
          onClick={onSwitchToQuery}
          className="text-[11.5px] leading-[16px] text-faint hover:text-primary"
        >
          Switch to query
        </button>
      </div>

      <div className="flex flex-col gap-8 px-16 py-14">
        {/* The parenthesised group gets a box, because that's what the bar
            draws around it. One visual language for one idea. */}
        {bar.group.length > 0 && (
          <div className="flex flex-col gap-8 rounded-[8px] border border-line bg-canvas p-12">
            {bar.group.map((c, i) => (
              <Condition
                key={`g${i}`} chip={c} i={i} first={i === 0} joiner={bar.groupJoiner} nested
                idBase="g" open={menu} setOpen={setMenu}
                onChange={(n) => setIn("group", i, n)}
                onJoiner={(j) => onChange({ ...bar, groupJoiner: j })}
                onRemove={() => removeIn("group", i)}
              />
            ))}
            <div className="pl-60">
              <AddButton
                label="Condition"
                onClick={() => onChange({ ...bar, group: [...bar.group, { field: FIELDS.severity, op: "is", values: [] }] })}
              />
            </div>
          </div>
        )}

        {bar.tail.map((c, i) => (
          <Condition
            key={`t${i}`} chip={c} i={i} first={i === 0 && bar.group.length === 0}
            joiner={i === 0 ? bar.outerJoiner : "and"}
            idBase="t" open={menu} setOpen={setMenu}
            onChange={(n) => setIn("tail", i, n)}
            onJoiner={(j) => onChange({ ...bar, outerJoiner: j })}
            onRemove={() => removeIn("tail", i)}
          />
        ))}

        <div className="flex gap-8 pt-4 pl-66">
          <AddButton
            label="Add condition"
            onClick={() => onChange({ ...bar, tail: [...bar.tail, { field: FIELDS.severity, op: "is", values: [] }] })}
          />
          <AddButton
            label="Add condition group"
            onClick={() => onChange({ ...bar, group: [...bar.group, { field: FIELDS.severity, op: "is", values: [] }] })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-hairline py-11 pr-12 pl-16">
        <span className="flex items-center gap-6">
          <span className="tabular font-mono text-[12px] leading-[17px] font-medium text-primary">
            {matching}
          </span>
          <span className="text-[11.5px] leading-[16px] text-faint">of 431 cases</span>
        </span>
        <span className="flex items-center gap-8">
          <button className="pressable rounded-sm border border-line bg-hover px-10 py-5 text-[11.5px] leading-[16px] font-medium text-secondary">
            Save as view
          </button>
          <button
            onClick={onClose}
            className="pressable rounded-sm px-12 py-5 text-[11.5px] leading-[16px] font-medium"
            style={{ background: "var(--accent-solid)", color: "var(--text-on-accent)" }}
          >
            Apply
          </button>
        </span>
      </div>
    </Modal>
  );
}
