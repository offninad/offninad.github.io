/*
 * Motion system. One place for every duration the site uses.
 *
 *   feedback   120ms  hover/active states (CSS --t-fast)
 *   hover      180ms  color/border transitions (CSS --t-hover)
 *   reveal     320ms  panel content, annotation fades (CSS --t-reveal)
 *   orchestral ≤2.6s  camera flights only (GSAP, the one justified exception)
 *
 * Under prefers-reduced-motion every tween collapses to an instant cut and
 * the bottle's idle float stops. Read once at load: the OS setting rarely
 * changes mid-session and a static flag keeps the R3F frame loop branch-free.
 */
export const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
