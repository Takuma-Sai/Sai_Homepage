"use client";

import { useEffect } from "react";

/**
 * scroll-driven animations 非対応ブラウザ向けフォールバック。
 * スクロール進行度（0→1）を documentElement の CSS 変数 --scroll に供給する。
 * 対応ブラウザ / reduced-motion では何もしない（リスナを張らない）。
 */
export function ScrollFallback() {
  useEffect(() => {
    const supportsTimeline =
      typeof CSS !== "undefined" &&
      CSS.supports("animation-timeline: scroll()");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (supportsTimeline || prefersReduced) return;

    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? root.scrollTop / max : 0;
      root.style.setProperty("--scroll", progress.toFixed(4));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--scroll");
    };
  }, []);

  return null;
}
