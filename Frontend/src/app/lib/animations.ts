/**
 * Shared animation variants using Emil Kowalski's easing curves.
 * See: portfolio-research/animation-principles.md
 */

// Emil's custom easing curves
export const easings = {
  easeOutQuint: [0.23, 1, 0.32, 1] as const,
  easeOutQuart: [0.165, 0.84, 0.44, 1] as const,
  easeOutExpo: [0.19, 1, 0.22, 1] as const,
  easeInOutQuint: [0.86, 0, 0.07, 1] as const,
  easeIosSheet: [0.32, 0.72, 0, 1] as const,
};

// Standard fade-in-up animation
export const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easings.easeOutQuint }
  }
};

// Subtle fade-in-up (less movement)
export const fadeInSubtle = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOutQuint }
  }
};

// Stagger container for children
export const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

// Stagger with more delay
export const staggerSlow = {
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

// Image hover scale effect
export const imageHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: { duration: 0.5, ease: easings.easeOutQuint }
  }
};

// For scroll-triggered animations
export const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: easings.easeOutQuint }
  }
};
