"use client";

import { useState, useEffect } from "react";

const breakpoints: Record<string, number> = {
  xs: 480,
  sm: 600,
  md: 768,
  lg: 1024,
  xl: 1280,
};

type Breakpoint = keyof typeof breakpoints;

const useResponsive = (breakpoint: Breakpoint): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false; // Handle SSR
    return window.matchMedia(`(max-width: ${breakpoints[breakpoint]}px)`)
      .matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it only runs in the client

    const mediaQuery = window.matchMedia(
      `(max-width: ${breakpoints[breakpoint]}px)`
    );
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);

  return matches;
};

export default useResponsive;
