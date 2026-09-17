'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { unlock, type GateState } from './actions';

/**
 * The lock screen. Deliberately quiet — it is a doorway, not a destination.
 *
 * A real <form> with a real <button type="submit">, so Enter submits and the
 * browser's password manager behaves. The action is a server action, so this
 * still works with JavaScript disabled.
 */

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 self-start rounded-full bg-accent-secondary px-7 text-base font-medium text-white
                 transition-[box-shadow,scale] duration-150 ease-out
                 hover:shadow-md active:scale-[0.97]
                 disabled:opacity-60 disabled:shadow-none
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fonttertiary"
    >
      {/* Disabled while in flight so a double Enter cannot fire it twice. */}
      {pending ? 'Checking…' : 'View project'}
    </button>
  );
}

export function PasswordGate({ from }: { from?: string }) {
  const [state, action] = useActionState<GateState, FormData>(unlock, {});

  return (
    <div className="flex min-h-[70dvh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-fonttertiary text-base tracking-wider uppercase mb-4">
          Protected case study
        </p>
        <h1 className="text-h2 text-fontprimary tracking-tight mb-3">Artemis Security</h1>
        <p className="text-lg text-fontsecondary leading-relaxed mb-8">
          This one&rsquo;s under wraps while the interview process is live. If you have the
          password, you&rsquo;re in the right place.
        </p>

        <form action={action} className="flex flex-col gap-3">
          {/* Carries the visitor back to whatever they were reaching for. */}
          <input type="hidden" name="from" value={from ?? ''} />
          <div>
            <label htmlFor="artemis-password" className="block text-base text-fontsecondary mb-2">
              Password
            </label>
            <input
              id="artemis-password"
              name="password"
              type="password"
              /* A real password field, so managers offer to fill and save it. */
              autoComplete="current-password"
              required
              aria-invalid={!!state.error}
              aria-describedby={state.error ? 'artemis-password-error' : undefined}
              /* 16px floor — anything smaller and iOS Safari zooms the page on focus. */
              className="w-full h-12 rounded-full border border-black/[0.14] bg-bg-elevated px-5
                         text-base text-fontprimary placeholder:text-fontmuted
                         transition-colors duration-150 ease-out
                         hover:border-black/25
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fonttertiary
                         aria-[invalid=true]:border-[var(--color-error)]"
            />
          </div>

          {/* Colocated with the field that caused it, not summarised at the top. */}
          {state.error && (
            <p
              id="artemis-password-error"
              role="alert"
              className="text-base"
              style={{ color: 'var(--color-error)' }}
            >
              {state.error}
            </p>
          )}

          <Submit />
        </form>
      </div>
    </div>
  );
}
