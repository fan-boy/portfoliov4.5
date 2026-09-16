"use client";

import { Fragment } from "react";

/* Syntax-coloured JSON in the same block treatment the query panels use —
   canvas ground, hairline border, r7, Geist Mono 11.5/19. Four colours, not
   eight: keys, strings, everything else, and punctuation. A log view that
   looks like a paint chart is harder to read, not easier. */

/* Built per call, not shared at module scope — a global regex carries
   lastIndex, and two of these rendering at once would corrupt each other. */
const token = () =>
  /("(?:\\.|[^"\\])*")(\s*:)|("(?:\\.|[^"\\])*")|(\btrue\b|\bfalse\b|\bnull\b)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;

export function Json({ value }: { value: unknown }) {
  const text = JSON.stringify(value, null, 2);
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  const re = token();
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(<Fragment key={last}>{text.slice(last, m.index)}</Fragment>);
    }
    const [, key, colon, str, bool, num] = m;
    if (key) {
      parts.push(
        <Fragment key={m.index}>
          <span style={{ color: "var(--text-muted)" }}>{key}</span>
          {colon}
        </Fragment>,
      );
    } else if (str) {
      parts.push(
        <span key={m.index} style={{ color: "var(--accent-default)" }}>
          {str}
        </span>,
      );
    } else {
      parts.push(
        <span key={m.index} style={{ color: "var(--text-primary)" }}>
          {bool ?? num}
        </span>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={last}>{text.slice(last)}</Fragment>);

  return (
    <pre className="overflow-x-auto rounded-[7px] border border-hairline bg-canvas px-14 py-11 font-mono text-[11.5px] leading-[19px] whitespace-pre text-faint">
      {parts}
    </pre>
  );
}
