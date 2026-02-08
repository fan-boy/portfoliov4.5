'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HERO_BLOBS = [
  { left: "8vw", top: "-6vw", width: "28vw", height: "26vw", opacity: 0.6, filter: "blur(60px)" },
  { left: "30vw", top: "-10vw", width: "34vw", height: "28vw", opacity: 0.55, filter: "blur(70px)" },
  { left: "55vw", top: "-4vw", width: "30vw", height: "28vw", opacity: 0.5, filter: "blur(55px)" }
];

// Refined, sophisticated color palette
const COLORS = [
  "radial-gradient(circle at 35% 35%, #E0D4FC 10%, #B8A4E8 90%)",    // Soft lavender
  "radial-gradient(circle at 70% 20%, #C5E8F7 30%, #8DCAE8 100%)",   // Soft sky blue
  "radial-gradient(circle at 40% 80%, #FEE8D6 0%, #FCCFA8 90%)"      // Warm peach/cream
];

// Helper for smooth return, only when loading becomes false.
const transition = {
  type: "spring",
  stiffness: 38,
  damping: 18,
  mass: 1.4
};

export default function AnimatedBlobs({
  expanded,
  loading
}: {
  expanded: boolean;
  loading: boolean;
}) {
  const [shouldSnapToBase, setSnapToBase] = useState(false);

  // Detect transition from loading -> not loading, so we can play return-to-base animation.
  useEffect(() => {
    if (!loading) {
      setSnapToBase(true);
      // After 1s, go back to normal base mode (no further animation)
      const timer = setTimeout(() => setSnapToBase(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const containerClass = expanded
    ? "fixed inset-0 z-0 pointer-events-none"
    : "absolute inset-0 z-0 pointer-events-none";

  return (
    <div className={containerClass}
      style={{
        height: expanded ? "100vh" : "32vw",
        minHeight: expanded ? "100vh" : 220,
        maxHeight: expanded ? "100vh" : 360,
      }}
    >
      {COLORS.map((color, i) => {
        // For loading: infinite keyframes. On "not loading transition", motion.div animates home.
        if (loading && !shouldSnapToBase) {
          return (
            <div
              key={i}
              className={`absolute blob-float${i+1} rounded-[44%_60%_64%_48%/66%_49%_70%_45%]`}
              style={{
                background: color,
                mixBlendMode: "lighten",
                opacity: HERO_BLOBS[i].opacity,
                width: HERO_BLOBS[i].width,
                height: HERO_BLOBS[i].height,
                filter: HERO_BLOBS[i].filter,
              }}
            />
          );
        }
        // If we just stopped loading, smoothly animate home.
        if (shouldSnapToBase) {
          return (
            <motion.div
              key={i}
              className="absolute rounded-[44%_60%_64%_48%/66%_49%_70%_45%]"
              initial={false}
              animate={HERO_BLOBS[i]}
              transition={transition}
              style={{
                background: color,
                opacity: HERO_BLOBS[i].opacity,
                filter: HERO_BLOBS[i].filter,
                mixBlendMode: "lighten",
              }}
            />
          );
        }
        // Normal hero state: just render at hero position.
        return (
          <div
            key={i}
            className="absolute rounded-[44%_60%_64%_48%/66%_49%_70%_45%]"
            style={{
              background: color,
              left: HERO_BLOBS[i].left,
              top: HERO_BLOBS[i].top,
              width: HERO_BLOBS[i].width,
              height: HERO_BLOBS[i].height,
              opacity: HERO_BLOBS[i].opacity,
              filter: HERO_BLOBS[i].filter,
              mixBlendMode: "lighten",
            }}
          />
        );
      })}
    </div>
  );
}
