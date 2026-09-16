import Link from 'next/link';
import { scopeClasses, type Challenge } from '../registry';

interface ChallengeFrameProps {
  challenge: Challenge;
  children: React.ReactNode;
}

/**
 * Wraps a challenge in its theme and expression, and gives it a way back.
 *
 * embedded  — brief header above the work, portfolio navbar intact.
 * fullbleed — the work fills the viewport, with one quiet escape link.
 */
export default function ChallengeFrame({ challenge, children }: ChallengeFrameProps) {
  const { chrome, company, title, prompt, received, due, note } = challenge;

  return (
    <div className={scopeClasses(challenge)}>
      {chrome === 'embedded' ? (
        <header className="exp-brief">
          <Link href="/experiments" className="exp-brief-back">
            Experiments
          </Link>
          <h1 className="exp-brief-title">
            {company} — {title}
          </h1>
          <p className="exp-brief-prompt exp-measure">{prompt}</p>
          <dl className="exp-brief-meta exp-nums">
            <div>
              <dt className="exp-caps">Received</dt>
              <dd>{formatDate(received)}</dd>
            </div>
            {due && (
              <div>
                <dt className="exp-caps">Due</dt>
                <dd>{formatDate(due)}</dd>
              </div>
            )}
            {note && (
              <div>
                <dt className="exp-caps">Constraint</dt>
                <dd>{note}</dd>
              </div>
            )}
          </dl>
          <hr className="exp-hairline" />
        </header>
      ) : (
        <Link href="/experiments" className="exp-escape exp-focusable">
          ← Experiments
        </Link>
      )}

      {children}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
