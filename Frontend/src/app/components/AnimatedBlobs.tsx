'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HERO_BLOBS = [
  { left: "5vw", top: "-2vw", width: "32vw", height: "30vw", opacity: 0.7, filter: "blur(60px)" },
  { left: "28vw", top: "-4vw", width: "38vw", height: "32vw", opacity: 0.65, filter: "blur(70px)" },
  { left: "52vw", top: "0vw", width: "34vw", height: "30vw", opacity: 0.6, filter: "blur(55px)" }
];

const COLORS = [
  "radial-gradient(circle at 35% 35%, #E0D4FC 10%, #B8A4E8 90%)",
  "radial-gradient(circle at 70% 20%, #C5E8F7 30%, #8DCAE8 100%)",
  "radial-gradient(circle at 40% 80%, #FEE8D6 0%, #FCCFA8 90%)"
];

const springTransition = {
  type: "spring",
  stiffness: 38,
  damping: 18,
  mass: 1.4
};

// Emil's ease-out-quint for smooth, natural motion
const easeOutQuint = [0.23, 1, 0.32, 1];

// Stripe-style continuous directional movement
// Each blob drifts slowly in one direction, then loops back seamlessly
const floatVariants = [
  {
    // Purple blob: drifts right and slightly down
    animate: {
      x: [0, 80, 160, 80, 0],
      y: [0, 20, 0, -20, 0],
      scale: [1, 1.02, 1, 0.98, 1],
    },
    transition: {
      duration: 25,
      ease: easeOutQuint,
      repeat: Infinity,
      repeatType: "loop" as const,
    }
  },
  {
    // Blue blob: drifts left and up
    animate: {
      x: [0, -60, -120, -60, 0],
      y: [0, -30, 0, 30, 0],
      scale: [1, 0.98, 1.02, 1, 1],
    },
    transition: {
      duration: 30,
      ease: easeOutQuint,
      repeat: Infinity,
      repeatType: "loop" as const,
    }
  },
  {
    // Orange blob: drifts diagonally right-down
    animate: {
      x: [0, 100, 50, -50, 0],
      y: [0, 40, 20, -20, 0],
      scale: [1, 1.03, 0.97, 1.01, 1],
    },
    transition: {
      duration: 35,
      ease: easeOutQuint,
      repeat: Infinity,
      repeatType: "loop" as const,
    }
  }
];

export default function AnimatedBlobs({
  expanded,
  loading,
  move = false
}: {
  expanded: boolean;
  loading: boolean;
  move?: boolean;
}) {
  const [shouldSnapToBase, setSnapToBase] = useState(false);

  useEffect(() => {
    if (!loading) {
      setSnapToBase(true);
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
        height: expanded ? "100vh" : "38vw",
        minHeight: expanded ? "100vh" : 280,
        maxHeight: expanded ? "100vh" : 420,
      }}
    >
      {COLORS.map((color, i) => {
        // Loading state - use CSS blob-float animations
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
        
        // Snap back after loading
        if (shouldSnapToBase) {
          return (
            <motion.div
              key={i}
              className="absolute rounded-[44%_60%_64%_48%/66%_49%_70%_45%]"
              initial={false}
              animate={HERO_BLOBS[i]}
              transition={springTransition}
              style={{
                background: color,
                opacity: HERO_BLOBS[i].opacity,
                filter: HERO_BLOBS[i].filter,
                mixBlendMode: "lighten",
              }}
            />
          );
        }
        
        // Normal state with framer-motion floating animation
        if (move) {
          return (
            <motion.div
              key={i}
              className="absolute rounded-[44%_60%_64%_48%/66%_49%_70%_45%]"
              animate={floatVariants[i].animate}
              transition={floatVariants[i].transition}
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
        }
        
        // Static state
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
