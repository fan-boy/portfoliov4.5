"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CaseRow } from "../../components/row/CaseRow";
import { BandHeader, ClosedBand, ShowMore } from "../../components/queue/Bands";
import { FilterBar } from "../../components/queue/FilterBar";
import { Footer } from "../../components/queue/Footer";
import { Nav } from "../../components/queue/Nav";
import { Peek } from "../../components/queue/Peek";
import { TopBar } from "../../components/queue/TopBar";
import { ViewBar } from "../../components/queue/ViewBar";
import { Disclose } from "../../components/ui/Disclose";
import { bands, closedBand } from "../../lib/data";
import { matches, sortCases, SORTS, type BarState, type Sort } from "../../lib/filters";
import { VIEW_BARS, type View } from "../../lib/views";

/* 1440 x 1288: nav 236, main 1204. The list pads 28 either side, which lands
   the row at its 1148.

   Interaction follows the legend in the footer: arrows move the cursor, Space
   peeks, Enter opens. The peek animates when you open it and doesn't when it
   is only following the cursor — see the note on --ease-out in globals.css. */

export default function QueuePage() {
  const router = useRouter();
  const [selected, setSelected] = useState("CASE-4885");
  const [peeked, setPeeked] = useState<string | null>(null);
  /* True only while the peek is following the cursor on arrow keys — that
     move must not animate. See the note on motion in globals.css. */
  const [instant, setInstant] = useState(false);
  const [view, setView] = useState<View>("Everything");
  const [bar, setBar] = useState<BarState>(VIEW_BARS.Everything);

  /* A view is a named filter state, so picking one loads its filters. Editing
     them afterwards leaves the view selected but dirty — which is what the
     "Save as view" and "Update view" controls in the bar are for. */
  const pickView = useCallback((v: View) => {
    setView(v);
    setBar(VIEW_BARS[v]);
  }, []);
  const [sort, setSort] = useState<Sort>(SORTS[0]);

  /* Every band is an accordion. The two open bands start open because they are
     the shift's work; the closed pile starts shut because its count is the
     contract, not its contents. */
  const [shut, setShut] = useState<Record<string, boolean>>({ closed: true });
  const toggle = useCallback(
    (id: string) => setShut((s) => ({ ...s, [id]: !s[id] })),
    [],
  );

  /* The chips aren't decoration — severity and confidence are on every record,
     so the bar narrows the list for real and the count follows it. */
  const shown = useMemo(
    () =>
      bands.map((b) => ({
        ...b,
        cases: sortCases(b.cases.filter((c) => matches(c, bar)), sort),
      })),
    [bar, sort],
  );
  /* A collapsed band's rows are not on screen, so the cursor must not be able
     to land on them — otherwise arrow keys walk into nothing. */
  const order = useMemo(
    () => [
      ...shown.filter((b) => !shut[b.id]).flatMap((b) => b.cases.map((c) => c.id)),
      ...(shut.closed ? [] : closedBand.cases.map((c) => c.id)),
    ],
    [shown, shut],
  );

  const move = useCallback(
    (delta: number) => {
      const i = order.indexOf(selected);
      const next = order[Math.min(Math.max(i + delta, 0), order.length - 1)];
      if (!next || next === selected) return;
      setInstant(true);
      setSelected(next);
      setPeeked((p) => (p ? next : null));
    },
    [selected, order],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      /* Never take keys off a text field. Without this, Space in the filter
         search is swallowed by preventDefault (you cannot type a space) and
         Enter navigates away mid-query. */
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === " ") {
        e.preventDefault();
        setInstant(false);
        setPeeked((p) => (p === selected ? null : selected));
      } else if (e.key === "Enter") {
        e.preventDefault();
        router.push(`/experiments/artemissecurity/cases/${selected}`);
      } else if (e.key === "Escape") {
        setInstant(false);
        setPeeked(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, selected, router]);

  const onRow = useCallback((id: string) => {
    setInstant(false);
    setSelected(id);
    setPeeked((p) => (p === id ? null : id));
  }, []);

  /* Tabbing into the list moves the cursor to the row that received focus, so
     the visual cursor and the DOM focus never disagree. Deliberately does not
     toggle the peek — that is what clicking and Space are for. */
  const onRowFocus = useCallback((id: string) => {
    setInstant(true);
    setSelected(id);
  }, []);

  return (
    <div className="flex h-screen bg-canvas">
      <Nav />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <ViewBar view={view} onView={pickView} sort={sort} onSort={setSort} />
        <FilterBar value={bar} onChange={setBar} matching={order.length} />

        <div className="min-h-0 flex-1 overflow-y-auto px-28 pt-2 pb-8">
          {shown.map((band, i) => (
            <section key={band.id}>
              <BandHeader
                label={band.label}
                count={band.count}
                note={band.note}
                progress={i === 0 ? "4 of 9 reviewed" : undefined}
                first={i === 0}
                open={!shut[band.id]}
                onToggle={() => toggle(band.id)}
                controls={`band-${band.id}`}
              />
              <Disclose open={!shut[band.id]}>
              <div role="rowgroup" id={`band-${band.id}`}>
                {band.cases.map((row) => (
                  <div key={row.id}>
                    <CaseRow
                      data={row}
                      selected={row.id === selected}
                      onSelect={onRow}
                      onFocus={onRowFocus}
                    />
                    {/* The wrapper is mounted for every row so opening is a
                        property change on an element that already exists —
                        otherwise the first frame has nothing to transition. */}
                    <Disclose open={peeked === row.id} instant={instant}>
                      {(row.id === selected || row.id === peeked) && (
                        <Peek
                          caseId={row.id}
                          verdict={`${row.verdict === "TP" ? "True positive" : row.verdict} · ${row.confidence} confidence`}
                        />
                      )}
                    </Disclose>
                  </div>
                ))}
              </div>
              </Disclose>
            </section>
          ))}

          <ShowMore>Show 14 more</ShowMore>

          <ClosedBand
            {...closedBand}
            open={!shut.closed}
            onToggle={() => toggle("closed")}
            controls="band-closed"
          >
            <Disclose open={!shut.closed}>
              <div role="rowgroup" id="band-closed">
                {closedBand.cases.map((row) => (
                  <div key={row.id}>
                    <CaseRow
                      data={row}
                      selected={row.id === selected}
                      onSelect={onRow}
                      onFocus={onRowFocus}
                    />
                    <Disclose open={peeked === row.id} instant={instant}>
                      {(row.id === selected || row.id === peeked) && (
                        <Peek
                          caseId={row.id}
                          verdict={`${row.verdict === "TP" ? "True positive" : row.verdict} · ${row.confidence} confidence`}
                        />
                      )}
                    </Disclose>
                  </div>
                ))}
              </div>
            </Disclose>
          </ClosedBand>
        </div>

        <Footer />
      </main>
    </div>
  );
}
