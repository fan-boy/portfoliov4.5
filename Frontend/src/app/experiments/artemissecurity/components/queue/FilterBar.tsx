"use client";

import { useState } from "react";
import { AlignRight, ChevronDown, Code, Plus, X } from "../ui/Icon";
import { Menu, MenuItem, MenuList } from "../ui/Menu";
import { AddFilter } from "./AddFilter";
import { Builder } from "./Builder";
import { QueryEditor } from "./QueryEditor";
import {
  EMPTY_BAR, GLYPH, operatorsFor, summarise,
  type BarState, type Chip as ChipState, type FieldDef, type Joiner, type Operator,
} from "../../lib/filters";

/* The bar, the builder and the raw query are three views of one state. This is
   the bar. Nesting is drawn, not hidden behind an "advanced" mode — an analyst
   who needs a parenthesis needs to see the parenthesis.

   Every part that changes the query is its own hit target: the operator, the
   value, the joiner. The field name is the only thing that's just a label. */

type Where = "group" | "tail";
type OpenId = string | null;

const TONE = {
  accent: { background: "var(--accent-bg)", borderColor: "var(--accent-border)" },
  high: { background: "var(--sev-high-bg)", borderColor: "var(--sev-high-border)" },
};

function Part({
  children, active, onClick, strong,
}: { children: React.ReactNode; active?: boolean; onClick: () => void; strong?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={[
        "-mx-3 -my-1 rounded-[3px] px-3 py-1 text-[11.5px] leading-[16px] font-medium",
        "transition-colors duration-120 ease-out",
        strong ? "text-primary" : "text-secondary",
        active ? "bg-hover" : "hover:bg-hover",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Chip({
  chip, id, open, setOpen, onChange, onRemove,
}: {
  chip: ChipState;
  id: string;
  open: OpenId;
  setOpen: (o: OpenId) => void;
  onChange: (c: ChipState) => void;
  onRemove: () => void;
}) {
  const ops = operatorsFor(chip.field);
  /* Coverage is the one field the design tints amber — an incomplete
     investigation isn't the same kind of fact as a severity threshold. */
  const tone = chip.field.key === "coverage" ? TONE.high : TONE.accent;

  const setOp = (op: Operator) => {
    onChange({ ...chip, op, values: op === "is any of" ? chip.values : chip.values.slice(0, 1) });
    setOpen(null);
  };

  const pick = (v: string) => {
    const multi = chip.op === "is any of";
    const values = multi
      ? chip.values.includes(v) ? chip.values.filter((x) => x !== v) : [...chip.values, v]
      : [v];
    onChange({ ...chip, values });
    if (!multi) setOpen(null);
  };

  return (
    <span className="relative flex h-28 shrink-0 items-center gap-6 rounded-sm border pr-6 pl-9" style={tone}>
      <span className="text-[11.5px] leading-[16px] text-muted">{chip.field.label}</span>

      <span className="relative">
        <Part active={open === `${id}-op`} onClick={() => setOpen(open === `${id}-op` ? null : `${id}-op`)}>
          {GLYPH[chip.op] ?? chip.op}
        </Part>
        {open === `${id}-op` && (
          <Menu title={chip.field.label} width={250} onClose={() => setOpen(null)}>
            <MenuList>
              {ops.map((o) => (
                <MenuItem key={o} label={o} selected={chip.op === o} onClick={() => setOp(o)} />
              ))}
            </MenuList>
          </Menu>
        )}
      </span>

      <span className="relative">
        <Part strong active={open === `${id}-val`} onClick={() => setOpen(open === `${id}-val` ? null : `${id}-val`)}>
          {summarise(chip)}
        </Part>
        {open === `${id}-val` && (
          <Menu title="Value" width={196} onClose={() => setOpen(null)}>
            <MenuList>
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
            </MenuList>
          </Menu>
        )}
      </span>

      <button onClick={onRemove} className="text-muted hover:text-primary"><X /></button>
    </span>
  );
}

function JoinerChip({
  word, strong, id, open, setOpen, onChange,
}: {
  word: Joiner; strong?: boolean; id: string;
  open: OpenId; setOpen: (o: OpenId) => void; onChange: (j: Joiner) => void;
}) {
  return (
    <span className="relative shrink-0">
      <button
        onClick={() => setOpen(open === id ? null : id)}
        className={[
          "flex h-23 items-center gap-4 rounded-xs border pr-5 pl-7",
          "transition-colors duration-120 ease-out",
          strong ? "border-line bg-hover" : "border-hairline bg-inset",
        ].join(" ")}
      >
        <span
          className={[
            "font-mono text-[10.5px] leading-[15px] font-medium tracking-[0.3px]",
            strong ? "text-secondary" : "text-muted",
          ].join(" ")}
        >
          {word}
        </span>
        <span className="text-faint"><ChevronDown size={10} /></span>
      </button>
      {open === id && (
        <Menu title="Joiner" width={160} onClose={() => setOpen(null)}>
          <MenuList>
            {(["and", "or"] as Joiner[]).map((j) => (
              <MenuItem
                key={j}
                label={j}
                selected={word === j}
                onClick={() => { onChange(j); setOpen(null); }}
              />
            ))}
          </MenuList>
        </Menu>
      )}
    </span>
  );
}

const Paren = ({ c }: { c: string }) => (
  <span className="shrink-0 font-mono text-[12px] leading-[17px] text-faint">{c}</span>
);

export function FilterBar({
  empty, value, onChange, matching,
}: {
  empty?: boolean;
  value?: BarState;
  onChange?: (b: BarState) => void;
  matching?: number;
}) {
  /* Controlled from the page, because selecting a saved view has to be able
     to replace what's in here. */
  const bar = value ?? EMPTY_BAR;
  const setBar = (next: BarState) => onChange?.(next);
  const [open, setOpen] = useState<OpenId>(null);

  const setChip = (where: Where, i: number, c: ChipState) =>
    setBar({ ...bar, [where]: bar[where].map((x, j) => (j === i ? c : x)) });
  const removeChip = (where: Where, i: number) =>
    setBar({ ...bar, [where]: bar[where].filter((_, j) => j !== i) });
  const addChip = (field: FieldDef, op: Operator, values: string[]) =>
    setBar({ ...bar, group: [...bar.group, { field, op, values }] });

  const row = (where: Where, chips: ChipState[], joiner: Joiner) =>
    chips.flatMap((c, i) => [
      i > 0 && (
        <JoinerChip
          key={`${where}-j${i}`}
          id={`${where}-j${i}`}
          word={joiner}
          open={open}
          setOpen={setOpen}
          onChange={(j) => setBar({ ...bar, groupJoiner: j })}
        />
      ),
      <Chip
        key={`${where}-${i}-${c.field.key}`}
        id={`${where}-${i}`}
        chip={c}
        open={open}
        setOpen={setOpen}
        onChange={(n) => setChip(where, i, n)}
        onRemove={() => removeChip(where, i)}
      />,
    ]).filter(Boolean);

  const hasFilters = !empty && (bar.group.length > 0 || bar.tail.length > 0);

  return (
    /* min-h, not h — the bar keeps its 52 until someone adds enough filters to
       need a second line, and then it grows instead of clipping them. */
    <div className="flex min-h-52 shrink-0 items-center justify-between gap-12 border-y border-hairline bg-panel px-28 py-6">
      <div className="flex min-w-0 flex-wrap items-center gap-7">
        {hasFilters && bar.group.length > 0 && (
          <div className="flex min-h-38 flex-wrap items-center gap-6 rounded-[8px] border border-line bg-inset px-7 py-4">
            <Paren c="(" />
            {row("group", bar.group, bar.groupJoiner)}
            <Paren c=")" />
          </div>
        )}

        {hasFilters && bar.group.length > 0 && bar.tail.length > 0 && (
          <JoinerChip
            id="outer"
            word={bar.outerJoiner}
            strong
            open={open}
            setOpen={setOpen}
            onChange={(j) => setBar({ ...bar, outerJoiner: j })}
          />
        )}
        {hasFilters && row("tail", bar.tail, "and")}

        <button
          onClick={() => setOpen("add")}
          className={[
            "flex h-28 shrink-0 items-center gap-6 rounded-sm border border-line pr-10 pl-9",
            "transition-colors duration-120 ease-out",
            open === "add" ? "bg-hover" : "hover:bg-hover",
          ].join(" ")}
        >
          <span className="text-muted"><Plus /></span>
          <span className="text-[11.5px] leading-[16px] font-medium text-secondary">Add filter</span>
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-10">
        <span className="flex items-baseline gap-5">
          <span className="tabular font-mono text-[12.5px] leading-[18px] font-medium text-primary">
            {empty ? "0" : (matching ?? 0)}
          </span>
          <span className="text-[11.5px] leading-[16px] text-faint">of</span>
          <span className="tabular font-mono text-[12.5px] leading-[18px] text-muted">431</span>
          <span className="text-[11.5px] leading-[16px] text-faint">cases</span>
        </span>
        <span className="mx-2 h-16 w-1 bg-line" />
        <button
          onClick={() => setOpen("builder")}
          className={[
            "flex h-28 shrink-0 items-center gap-6 rounded-sm border border-line pr-9 pl-8",
            "transition-colors duration-120 ease-out",
            open === "builder" ? "bg-hover" : "bg-inset hover:bg-hover",
          ].join(" ")}
        >
          <span className="text-muted"><AlignRight /></span>
          <span className="text-[11.5px] leading-[16px] font-medium text-secondary">Builder</span>
        </button>
        <button
          onClick={() => setOpen("query")}
          className={[
            "flex h-28 shrink-0 items-center gap-6 rounded-sm border border-line pr-9 pl-8",
            "transition-colors duration-120 ease-out",
            open === "query" ? "bg-hover" : "bg-inset hover:bg-hover",
          ].join(" ")}
        >
          <span className="text-muted"><Code /></span>
          <span className="text-[11.5px] leading-[16px] font-medium text-secondary">Query</span>
        </button>
      </div>

      {/* Three views of one state, all centred — none of them has an edge to
          fall off, which is what anchoring them to their triggers kept doing. */}
      <AddFilter
        open={open === "add"}
        onClose={() => setOpen(null)}
        onPick={(f, op, values) => addChip(f, op, values)}
      />
      <Builder
        open={open === "builder"}
        onClose={() => setOpen(null)}
        bar={bar}
        onChange={setBar}
        matching={matching ?? 0}
        onSwitchToQuery={() => setOpen("query")}
      />
      <QueryEditor
        open={open === "query"}
        onClose={() => setOpen(null)}
        bar={bar}
        matching={matching ?? 0}
        onSwitchToChips={() => setOpen(null)}
      />
    </div>
  );
}
