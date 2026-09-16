/* THROWAWAY — prototype surface. */
import type { CSSProperties } from 'react';
import type { Bloom } from './shared';

/** Blurred ellipses that scale up to uncover a wash. */
export function BloomMask({
  id,
  blurId,
  blooms,
}: {
  id: string;
  blurId: string;
  blooms: Bloom[];
}) {
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x="-200" y="-200" width="1600" height="1220">
      <g filter={`url(#${blurId})`}>
        {blooms.map((b, i) => (
          <ellipse
            key={i}
            className="wc-bloom"
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill="#fff"
            style={{ '--wc-delay': `${b.d}s` } as CSSProperties}
          />
        ))}
      </g>
    </mask>
  );
}
