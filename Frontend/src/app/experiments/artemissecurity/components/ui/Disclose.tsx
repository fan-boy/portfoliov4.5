"use client";

import type { ReactNode } from "react";

/* Wraps anything that expands in place. Height can't ride the GPU, so the
   wrapper animates a grid track from 0fr to 1fr and the content inside only
   fades and nudges — the two things that can. Being a transition rather than
   a keyframe means closing halfway through opening retargets smoothly.

   `instant` kills the transition for changes the user didn't ask for as an
   opening — specifically the peek following the cursor on arrow keys. */
export function Disclose({
  open,
  instant,
  children,
}: {
  open: boolean;
  instant?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="disclose" data-open={open || undefined} data-instant={instant || undefined}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
}
