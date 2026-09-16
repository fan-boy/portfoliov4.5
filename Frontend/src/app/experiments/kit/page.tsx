'use client';

import { useState } from 'react';
import Link from 'next/link';
import { scopeClasses, type Expression, type Theme } from '../registry';

const THEMES: { value: Theme; label: string; use: string }[] = [
  { value: 'neutral', label: 'Neutral', use: 'Structure-first briefs. The palette stays quiet.' },
  { value: 'product', label: 'Product', use: 'B2B tooling. 14px body, ratio 1.2, figures that stack.' },
  { value: 'consumer', label: 'Consumer', use: 'B2C product. 16px body floor, ratio 1.25, phone-first.' },
  { value: 'editorial', label: 'Editorial', use: 'Marketing and long-form. Serif display, ratio 1.33.' },
  { value: 'dark', label: 'Dark', use: 'Solid borders, desaturated accent, layering preserved.' },
];

const EXPRESSIONS: { value: Expression; label: string; use: string }[] = [
  { value: 'restrained', label: 'Restrained', use: 'Fast and flat. Nothing draws attention to itself.' },
  { value: 'balanced', label: 'Balanced', use: 'The default. Motion you notice only if you look.' },
  { value: 'expressive', label: 'Expressive', use: 'Round, slower, staggered. For briefs asking for a voice.' },
];

const SWATCHES = [
  { token: '--exp-canvas', label: 'Canvas' },
  { token: '--exp-surface', label: 'Surface' },
  { token: '--exp-surface-raised', label: 'Raised' },
  { token: '--exp-surface-sunken', label: 'Sunken' },
  { token: '--exp-accent', label: 'Accent' },
  { token: '--exp-accent-subtle', label: 'Accent subtle' },
  { token: '--exp-success', label: 'Success' },
  { token: '--exp-warning', label: 'Warning' },
  { token: '--exp-danger', label: 'Danger' },
];

const ROWS = [
  { name: 'Acme Corp', plan: 'Enterprise', seats: 1240, spend: 48200 },
  { name: 'Northwind', plan: 'Growth', seats: 86, spend: 7310 },
  { name: 'Initech', plan: 'Starter', seats: 9, spend: 432 },
];

export default function DesignKit() {
  const [theme, setTheme] = useState<Theme>('neutral');
  const [expression, setExpression] = useState<Expression>('balanced');

  return (
    <div className={scopeClasses({ theme, expression, chrome: 'fullbleed' })}>
      <div
        className="sticky top-0 z-50"
        style={{
          background: 'var(--exp-surface)',
          borderBottom: '1px solid var(--exp-border)',
          padding: 'var(--exp-space-3) var(--exp-space-6)',
        }}
      >
        <div
          className="mx-auto flex flex-wrap items-center gap-6"
          style={{ maxWidth: 1200 }}
        >
          <Fieldset legend="Theme">
            {THEMES.map((t) => (
              <Segment
                key={t.value}
                label={t.label}
                selected={theme === t.value}
                onSelect={() => setTheme(t.value)}
              />
            ))}
          </Fieldset>

          <Fieldset legend="Expression">
            {EXPRESSIONS.map((x) => (
              <Segment
                key={x.value}
                label={x.label}
                selected={expression === x.value}
                onSelect={() => setExpression(x.value)}
              />
            ))}
          </Fieldset>
        </div>
      </div>

      <div
        className="mx-auto"
        style={{ maxWidth: 1200, padding: 'var(--exp-space-16) var(--exp-space-6) var(--exp-space-24)' }}
      >
        <p className="exp-caps" style={{ marginBottom: 'var(--exp-space-4)' }}>
          Design kit
        </p>
        <h1 className="exp-display" style={{ marginBottom: 'var(--exp-space-4)' }}>
          Same components, different conviction.
        </h1>
        <p className="exp-lead exp-measure" style={{ marginBottom: 'var(--exp-space-6)' }}>
          {THEMES.find((t) => t.value === theme)?.use}{' '}
          {EXPRESSIONS.find((x) => x.value === expression)?.use}
        </p>

        <Section title="Surfaces">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
          >
            {SWATCHES.map((s) => (
              <div key={s.token}>
                <div
                  style={{
                    height: 64,
                    background: `var(${s.token})`,
                    border: '1px solid var(--exp-border)',
                    borderRadius: 'var(--exp-radius-md)',
                  }}
                />
                <p className="exp-caption" style={{ marginTop: 'var(--exp-space-2)' }}>
                  {s.label}
                </p>
                <p
                  className="exp-mono"
                  style={{ fontSize: 'var(--exp-text-xs)', color: 'var(--exp-text-muted)' }}
                >
                  {s.token}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Type scale">
          <div className="flex flex-col" style={{ gap: 'var(--exp-space-6)' }}>
            <Role name="exp-display" note="balance · display face · tightest tracking">
              <p className="exp-display">Same components, different conviction</p>
            </Role>
            <Role name="exp-h1" note="balance · display face">
              <h2 className="exp-h1">Heading one, set in the display face</h2>
            </Role>
            <Role name="exp-h2" note="balance">
              <h3 className="exp-h2">Heading two</h3>
            </Role>
            <Role name="exp-h3" note="balance · text face">
              <h4 className="exp-h3">Heading three</h4>
            </Role>
            <Role name="exp-lead" note="pretty · no stranded last word">
              <p className="exp-lead exp-measure">
                The standfirst under a hero, or the description on a card. Short enough that
                balancing would look odd, long enough that one word alone on the last line would.
              </p>
            </Role>
            <Role name="exp-body" note="no wrap mode · capped at the measure">
              <div className="exp-measure">
                <p className="exp-body">
                  Body copy capped at the measure, because a line running the full width of a
                  1200px container takes real effort to read — the eye loses its return path and
                  has to hunt for the start of the next line.
                </p>
                <p className="exp-body">
                  A second paragraph, spaced at exactly one line-height so the vertical rhythm
                  survives a change of type size.
                </p>
              </div>
            </Role>
            <Role name="exp-caption" note="pretty">
              <p className="exp-caption">Metadata, helper text, and the line under a chart.</p>
            </Role>
            <Role name="exp-caps" note="opened tracking · nowrap">
              <p className="exp-caps">Section label</p>
            </Role>
            <Role name="exp-mono" note="tabular figures">
              <p className="exp-mono">const ratio = 1.25</p>
            </Role>
          </div>
        </Section>

        <Section title="Text behaviour">
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
          >
            <div>
              <p className="exp-caps" style={{ marginBottom: 'var(--exp-space-2)' }}>
                Link
              </p>
              <p className="exp-body">
                Underline thickness and position come{' '}
                <a className="exp-link" href="#link-demo">
                  from the font&rsquo;s own metrics
                </a>
                , and the ink skips descenders.
              </p>
            </div>
            <div>
              <p className="exp-caps" style={{ marginBottom: 'var(--exp-space-2)' }}>
                Defined term
              </p>
              <p className="exp-body">
                A dotted underline is the established cue for{' '}
                <span className="exp-term" title="A line that reads too long to scan comfortably">
                  measure
                </span>{' '}
                — hover for more.
              </p>
            </div>
            <div>
              <p className="exp-caps" style={{ marginBottom: 'var(--exp-space-2)' }}>
                Truncation
              </p>
              <p
                className="exp-body exp-truncate"
                title="Enterprise Security Posture Review for the Northwind Trading Company"
              >
                Enterprise Security Posture Review for the Northwind Trading Company
              </p>
              <p className="exp-caption">The full string stays on the title attribute.</p>
            </div>
            <div>
              <p className="exp-caps" style={{ marginBottom: 'var(--exp-space-2)' }}>
                Overflow guard
              </p>
              <p className="exp-body">
                https://example.com/a/very/long/path/that/would/otherwise/punch/out/of/this/card
              </p>
            </div>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap items-center" style={{ gap: 'var(--exp-space-3)' }}>
            <button className="exp-btn exp-btn-primary">Save changes</button>
            <button className="exp-btn exp-btn-secondary">Preview</button>
            <button className="exp-btn exp-btn-ghost">Cancel</button>
            <button className="exp-btn exp-btn-primary" disabled>
              Saving…
            </button>
          </div>
          <p className="exp-caption" style={{ marginTop: 'var(--exp-space-4)' }}>
            One primary per view. Destructive actions sit apart from confirmations, never beside
            them.
          </p>
          <div
            style={{
              marginTop: 'var(--exp-space-6)',
              paddingTop: 'var(--exp-space-6)',
              borderTop: '1px solid var(--exp-border)',
            }}
          >
            <button className="exp-btn exp-btn-danger">Delete workspace</button>
          </div>
        </Section>

        <Section title="Inputs">
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', maxWidth: 760 }}
          >
            <div>
              <label className="exp-label" htmlFor="kit-default">
                Workspace name
              </label>
              <input id="kit-default" className="exp-input" placeholder="Acme Corp" />
            </div>
            <div>
              <label className="exp-label" htmlFor="kit-error">
                Email
              </label>
              <input
                id="kit-error"
                className="exp-input"
                defaultValue="aadityashete"
                aria-invalid="true"
                aria-describedby="kit-error-msg"
              />
              <p className="exp-error" id="kit-error-msg">
                <span aria-hidden="true">⚠</span> Your email must include an @ symbol.
              </p>
            </div>
            <div>
              <label className="exp-label" htmlFor="kit-disabled">
                Billing owner
              </label>
              <input id="kit-disabled" className="exp-input" defaultValue="Admin only" disabled />
            </div>
          </div>
        </Section>

        <Section title="Cards and data">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
          >
            {ROWS.map((row, i) => (
              <div
                key={row.name}
                className="exp-card exp-lift exp-enter"
                style={{ '--exp-index': i } as React.CSSProperties}
              >
                <p className="exp-caps">{row.plan}</p>
                <p className="exp-h3" style={{ marginTop: 'var(--exp-space-2)' }}>
                  {row.name}
                </p>
                <div
                  className="exp-nums"
                  style={{
                    marginTop: 'var(--exp-space-4)',
                    paddingTop: 'var(--exp-space-4)',
                    borderTop: '1px solid var(--exp-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 'var(--exp-text-sm)',
                    color: 'var(--exp-text-secondary)',
                  }}
                >
                  <span>{row.seats.toLocaleString()} seats</span>
                  <span>${row.spend.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <table
            className="exp-nums"
            style={{
              width: '100%',
              marginTop: 'var(--exp-space-8)',
              borderCollapse: 'collapse',
              fontSize: 'var(--exp-text-sm)',
            }}
          >
            <thead>
              <tr>
                <th style={headCell}>Account</th>
                <th style={headCell}>Plan</th>
                <th style={{ ...headCell, textAlign: 'end' }}>Seats</th>
                <th style={{ ...headCell, textAlign: 'end' }}>Spend</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.name}>
                  <td style={bodyCell}>{row.name}</td>
                  <td style={{ ...bodyCell, color: 'var(--exp-text-secondary)' }}>{row.plan}</td>
                  <td style={{ ...bodyCell, textAlign: 'end' }}>{row.seats.toLocaleString()}</td>
                  <td style={{ ...bodyCell, textAlign: 'end' }}>
                    ${row.spend.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="exp-caption" style={{ marginTop: 'var(--exp-space-3)' }}>
            Right-aligned tabular figures do the work zebra striping was compensating for.
          </p>
        </Section>
      </div>

      <Link href="/experiments" className="exp-escape exp-focusable">
        ← Experiments
      </Link>
    </div>
  );
}

const headCell: React.CSSProperties = {
  textAlign: 'start',
  padding: 'var(--exp-space-2) var(--exp-space-3)',
  borderBottom: '1px solid var(--exp-border-strong)',
  fontSize: 'var(--exp-text-xs)',
  fontWeight: 500,
  letterSpacing: 'var(--exp-tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--exp-text-muted)',
};

const bodyCell: React.CSSProperties = {
  padding: 'var(--exp-space-3)',
  borderBottom: '1px solid var(--exp-border)',
  color: 'var(--exp-text)',
};

function Role({
  name,
  note,
  children,
}: {
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--exp-space-2)',
          alignItems: 'baseline',
          marginBottom: 'var(--exp-space-2)',
        }}
      >
        <code
          style={{
            fontFamily: 'var(--exp-font-mono)',
            fontSize: 'var(--exp-text-xs)',
            color: 'var(--exp-text-secondary)',
          }}
        >
          .{name}
        </code>
        <span style={{ fontSize: 'var(--exp-text-xs)', color: 'var(--exp-text-muted)' }}>
          {note}
        </span>
      </div>
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 'var(--exp-space-16)' }}>
      <h2
        className="exp-caps"
        style={{
          paddingBottom: 'var(--exp-space-3)',
          marginBottom: 'var(--exp-space-6)',
          borderBottom: '1px solid var(--exp-border)',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="exp-caps" style={{ marginBottom: 'var(--exp-space-2)' }}>
        {legend}
      </legend>
      <div style={{ display: 'flex', gap: 'var(--exp-space-1)' }}>{children}</div>
    </fieldset>
  );
}

function Segment({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="exp-btn"
      style={{
        minHeight: 30,
        padding: 'var(--exp-space-1) var(--exp-space-3)',
        fontSize: 'var(--exp-text-xs)',
        background: selected ? 'var(--exp-accent-subtle)' : 'transparent',
        borderColor: selected ? 'var(--exp-accent)' : 'var(--exp-border)',
        color: selected ? 'var(--exp-text)' : 'var(--exp-text-secondary)',
      }}
    >
      {label}
    </button>
  );
}
