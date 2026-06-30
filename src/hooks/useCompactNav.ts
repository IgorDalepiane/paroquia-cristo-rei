"use client";

import { useEffect, useState } from "react";

const SHOW_THRESHOLD = 120;
const HIDE_THRESHOLD = 80;

export function useCompactNav() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact((prev) => {
        if (!prev && y > SHOW_THRESHOLD) return true;
        if (prev && y < HIDE_THRESHOLD) return false;
        return prev;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return compact;
}
