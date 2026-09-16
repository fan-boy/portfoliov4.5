import Link from 'next/link';
import DefaultPage from '../components/Pages/DefaultPage';
import { byStatus, challenges, studies, type Challenge, type Status } from './registry';

const GROUPS: { status: Status; label: string }[] = [
  { status: 'in-progress', label: 'In progress' },
  { status: 'submitted', label: 'Submitted' },
  { status: 'archived', label: 'Archived' },
];

export default function ExperimentsIndex() {
  return (
    <DefaultPage>
      <section className="w-full pt-16 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-fonttertiary text-base tracking-wider uppercase mb-6">Experiments</p>

          <h1 className="text-h1 text-fontprimary tracking-tight max-w-3xl mb-8">
            Design challenges, built end to end.
          </h1>

         
          {challenges.length === 0 ? (
           <></>
          ) : (
            <div className="flex flex-col gap-16">
              {GROUPS.map(({ status, label }) => {
                const group = byStatus(status);
                if (group.length === 0) return null;

                return (
                  <div key={status}>
                    <h2 className="text-base text-fonttertiary tracking-wider uppercase mb-6">
                      {label}
                    </h2>
                    <ul className="flex flex-col">
                      {group.map((challenge) => (
                        <ChallengeRow key={challenge.slug} challenge={challenge} />
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          <hr className="section-divider" />

          <h2 className="text-base text-fonttertiary tracking-wider uppercase mb-6">Studies</h2>
          <ul className="flex flex-col mb-16">
            {studies.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/experiments/${study.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-5 border-t border-black/[0.08]"
                >
                  <span className="text-lg text-fontprimary group-hover:text-accent transition-colors duration-200">
                    {study.title}
                  </span>
                  <span className="text-base text-fonttertiary sm:text-right">{study.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-base text-fonttertiary tracking-wider uppercase mb-6">Reference</h2>
          <Link
            href="/experiments/kit"
            className="group flex items-baseline justify-between gap-6 py-5 border-t border-black/[0.08]"
          >
            <span className="text-lg text-fontprimary group-hover:text-accent transition-colors duration-200">
              Design kit
            </span>
            <span className="text-base text-fonttertiary text-right">
              Every theme and expression level, side by side
            </span>
          </Link>
        </div>
      </section>
    </DefaultPage>
  );
}

function ChallengeRow({ challenge }: { challenge: Challenge }) {
  return (
    <li>
      <Link
        href={`/experiments/${challenge.slug}`}
        className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-5 border-t border-black/[0.08]"
      >
        <span className="flex items-baseline gap-3">
          <span className="text-lg text-fontprimary group-hover:text-accent transition-colors duration-200">
            {challenge.company}
          </span>
          <span className="text-base text-fonttertiary">{challenge.title}</span>
        </span>
        <span className="text-base text-fonttertiary tabular-nums whitespace-nowrap">
          {formatDate(challenge.received)}
        </span>
      </Link>
    </li>
  );
}



function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}
