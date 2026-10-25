"use client";

import { useEffect, useRef } from "react";
import { DEG, getLandPoints, lonLatToVec } from "@/lib/globe/geometry";
import { HUB, ROUTES } from "@/lib/globe/routes";

// 都市の位置は回転前の単位ベクトルとして一度だけ計算しておく
const HUB_VEC = lonLatToVec(HUB);
const ARCS = ROUTES.map((route) => ({
  from: HUB_VEC,
  to: lonLatToVec(route.to),
  period: route.period,
  delay: route.delay,
}));
const CITY_VECS = [HUB_VEC, ...ARCS.map((arc) => arc.to)];

const TILT = 18 * DEG; // 北半球をやや手前に傾ける
const SPIN = (2 * Math.PI) / 95; // 95秒で1自転
const THETA0 = -HUB[0] * DEG; // 初期表示で日本を正面に
const BUCKETS = 8; // 深度ごとの描画バケット（fillStyle 切替回数を抑える）

/**
 * 回転する点描地球儀。Canvas 2D + 正射投影の自前実装（依存ライブラリなし）。
 * タブ非表示・画面外では描画を停止し、prefers-reduced-motion では静止フレームのみ描く。
 */
export function GlobeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const land = getLandPoints();
    const count = land.length / 3;

    const bucketPts = Array.from({ length: BUCKETS }, () => new Float32Array(count * 2));
    const bucketCount = new Int32Array(BUCKETS);
    const bucketStyle: string[] = [];
    for (let b = 0; b < BUCKETS; b++) {
      const t = (b + 0.5) / BUCKETS;
      const mix = (from: number, to: number) => Math.round(from + (to - from) * t);
      // 奥: cyan-700 系の暗色 → 手前: cyan-200 系の明色
      bucketStyle.push(
        `rgba(${mix(34, 165)}, ${mix(150, 243)}, ${mix(170, 252)}, ${(0.26 + 0.64 * t).toFixed(3)})`,
      );
    }

    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let radius = 0;
    let dotBase = 0;

    // 自転(Y軸)→傾き(X軸)を適用した座標。z > 0 が手前。
    const rotate = (
      x: number,
      y: number,
      z: number,
      cs: number,
      sn: number,
    ): readonly [number, number, number] => {
      const xr = x * cs + z * sn;
      const zr = z * cs - x * sn;
      return [xr, y * cosT - zr * sinT, y * sinT + zr * cosT];
    };

    const drawFrame = (tSec: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (radius <= 0) return;

      const theta = THETA0 + SPIN * tSec;
      const cs = Math.cos(theta);
      const sn = Math.sin(theta);

      // 海（球体のベース）
      const ocean = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius,
      );
      ocean.addColorStop(0, "rgba(8, 145, 178, 0.10)");
      ocean.addColorStop(0.8, "rgba(8, 145, 178, 0.04)");
      ocean.addColorStop(1, "rgba(8, 145, 178, 0)");
      ctx.fillStyle = ocean;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // 大気（縁のグロー）
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.94, cx, cy, radius * 1.07);
      glow.addColorStop(0, "rgba(103, 232, 249, 0)");
      glow.addColorStop(0.55, "rgba(103, 232, 249, 0.10)");
      glow.addColorStop(1, "rgba(103, 232, 249, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.07, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(103, 232, 249, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 陸地ドット（深度バケットごとにまとめて描画）
      bucketCount.fill(0);
      for (let i = 0; i < count; i++) {
        const [px, py, pz] = rotate(land[i * 3], land[i * 3 + 1], land[i * 3 + 2], cs, sn);
        if (pz <= 0) continue;
        const b = Math.min(BUCKETS - 1, Math.floor(pz * BUCKETS));
        const k = bucketCount[b]++;
        bucketPts[b][k * 2] = cx + px * radius;
        bucketPts[b][k * 2 + 1] = cy - py * radius;
      }
      for (let b = 0; b < BUCKETS; b++) {
        const n = bucketCount[b];
        if (n === 0) continue;
        ctx.fillStyle = bucketStyle[b];
        const size = dotBase * (0.65 + 0.5 * ((b + 0.5) / BUCKETS));
        const half = size / 2;
        const arr = bucketPts[b];
        for (let k = 0; k < n; k++) {
          ctx.fillRect(arr[k * 2] - half, arr[k * 2 + 1] - half, size, size);
        }
      }

      // 都市マーカー
      for (const v of CITY_VECS) {
        const [px, py, pz] = rotate(v[0], v[1], v[2], cs, sn);
        if (pz <= 0.05) continue;
        const sx = cx + px * radius;
        const sy = cy - py * radius;
        ctx.fillStyle = `rgba(103, 232, 249, ${(0.25 * pz).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, dotBase * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(240, 253, 255, ${(0.9 * pz).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, dotBase * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // 都市間アーク（大円 + 高度リフト、進行パルス）
      const STEPS = 26;
      const TRAIL = 0.3;
      for (const arc of ARCS) {
        const local = (((tSec - arc.delay) % arc.period) + arc.period) % arc.period / arc.period;
        const fade = Math.sin(Math.PI * local);
        if (fade <= 0.02) continue;

        const [ax, ay, az] = rotate(arc.from[0], arc.from[1], arc.from[2], cs, sn);
        const [bx, by, bz] = rotate(arc.to[0], arc.to[1], arc.to[2], cs, sn);
        const dot = Math.min(1, Math.max(-1, ax * bx + ay * by + az * bz));
        const ang = Math.acos(dot);
        const sinAng = Math.sin(ang);
        if (sinAng < 1e-4) continue;
        const lift = 0.16 + ang * 0.08;

        for (let s = 0; s <= STEPS; s++) {
          const tt = local - TRAIL * (1 - s / STEPS);
          if (tt < 0 || tt > 1) continue;
          const w1 = Math.sin((1 - tt) * ang) / sinAng;
          const w2 = Math.sin(tt * ang) / sinAng;
          const scale = 1 + lift * Math.sin(Math.PI * tt);
          const px = (ax * w1 + bx * w2) * scale;
          const py = (ay * w1 + by * w2) * scale;
          const pz = az * w1 + bz * w2;
          // 手前側、またはリフトで球のシルエット外に出た点のみ可視
          if (pz <= 0 && px * px + py * py <= 1) continue;
          const frac = s / STEPS;
          const alpha = fade * Math.pow(frac, 1.5) * 0.9;
          const size = dotBase * (0.7 + 0.9 * frac);
          ctx.fillStyle = `rgba(165, 243, 252, ${alpha.toFixed(3)})`;
          ctx.fillRect(cx + px * radius - size / 2, cy - py * radius - size / 2, size, size);
          if (s === STEPS) {
            // 先頭のグロー
            ctx.fillStyle = `rgba(224, 254, 255, ${(fade * 0.35).toFixed(3)})`;
            const haloSize = size * 2.6;
            ctx.fillRect(
              cx + px * radius - haloSize / 2,
              cy - py * radius - haloSize / 2,
              haloSize,
              haloSize,
            );
          }
        }
      }
    };

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let rafId = 0;
    let elapsed = 0;
    let lastTime = 0;
    let inView = true;

    const loop = (now: number) => {
      rafId = 0;
      if (lastTime > 0) {
        elapsed += Math.min((now - lastTime) / 1000, 0.1);
      }
      lastTime = now;
      drawFrame(elapsed);
      schedule();
    };

    const schedule = () => {
      const shouldRun = inView && !document.hidden && !reducedQuery.matches;
      if (shouldRun && rafId === 0) {
        rafId = requestAnimationFrame(loop);
      } else if (!shouldRun && rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        lastTime = 0;
      }
      if (reducedQuery.matches) {
        drawFrame(3.1); // 静止フレーム（アークが一部見える時刻）
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      cx = w / 2;
      cy = h * 0.55;
      radius = Math.min(w * 0.7, h * 0.46);
      dotBase = Math.min(2.6, Math.max(1.2, radius / 210));
      drawFrame(reducedQuery.matches ? 3.1 : elapsed);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      schedule();
    });
    intersectionObserver.observe(canvas);

    const onVisibility = () => schedule();
    document.addEventListener("visibilitychange", onVisibility);
    reducedQuery.addEventListener("change", schedule);

    resize();
    schedule();

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedQuery.removeEventListener("change", schedule);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
