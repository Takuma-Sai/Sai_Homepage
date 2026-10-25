"use client";

import { useEffect, useRef } from "react";

type LonLat = readonly [number, number];

const DEG = Math.PI / 180;

/**
 * 陸地の粗いアウトライン [経度, 緯度]。
 * ドット点描の解像度（約2°間隔）で大陸として読めれば十分なため、
 * 画像アセットや外部データを使わずコードに埋め込んでいる。
 */
const LAND_POLYGONS: readonly (readonly LonLat[])[] = [
  // 北アメリカ
  [
    [-168, 66], [-166, 60], [-158, 57], [-146, 60], [-136, 57], [-130, 53],
    [-125, 48], [-124, 42], [-120, 34], [-115, 29], [-110, 23], [-106, 21],
    [-102, 17], [-96, 15], [-92, 14], [-87, 12], [-83, 8], [-78, 7],
    [-82, 14], [-86, 16], [-88, 18], [-87, 21], [-90, 21], [-91, 19],
    [-95, 18], [-97, 21], [-97, 26], [-93, 29], [-89, 29], [-84, 30],
    [-81, 25], [-80, 27], [-81, 31], [-77, 34], [-75, 38], [-71, 41],
    [-66, 44], [-60, 46], [-53, 47], [-56, 50], [-60, 53], [-64, 58],
    [-70, 60], [-78, 62], [-85, 66], [-95, 68], [-105, 68], [-115, 69],
    [-125, 70], [-135, 69], [-145, 70], [-155, 71], [-162, 68], [-168, 66],
  ],
  // グリーンランド
  [
    [-46, 60], [-50, 63], [-54, 67], [-58, 72], [-64, 76], [-58, 80],
    [-45, 83], [-30, 83], [-20, 81], [-18, 76], [-22, 72], [-26, 68],
    [-33, 65], [-40, 62], [-46, 60],
  ],
  // 南アメリカ
  [
    [-78, 7], [-72, 12], [-64, 11], [-60, 9], [-55, 6], [-51, 4],
    [-50, 0], [-44, -3], [-37, -5], [-35, -8], [-37, -12], [-39, -16],
    [-41, -22], [-46, -24], [-48, -28], [-53, -34], [-57, -38], [-62, -40],
    [-65, -45], [-67, -50], [-69, -53], [-73, -54], [-73, -48], [-72, -42],
    [-71, -35], [-70, -27], [-70, -18], [-75, -14], [-79, -7], [-81, -3],
    [-80, 1], [-77, 4], [-78, 7],
  ],
  // アフリカ
  [
    [-6, 35], [-10, 32], [-15, 28], [-16, 23], [-17, 15], [-15, 11],
    [-11, 7], [-6, 5], [0, 5], [8, 4], [9, -1], [13, -6], [12, -12],
    [13, -17], [15, -22], [16, -28], [18, -33], [20, -35], [25, -34],
    [28, -32], [33, -27], [35, -22], [36, -18], [38, -15], [40, -11],
    [40, -6], [41, -2], [45, 2], [51, 12], [44, 11], [40, 15], [37, 18],
    [36, 23], [34, 28], [32, 31], [27, 31], [20, 32], [15, 33], [10, 34],
    [3, 37], [-2, 35], [-6, 35],
  ],
  // ユーラシア（本体）
  [
    [-9, 37], [-9, 43], [-2, 44], [-4, 48], [-1, 49], [3, 51], [7, 53],
    [9, 55], [13, 54], [19, 54], [24, 56], [28, 59], [30, 60], [31, 63],
    [30, 67], [33, 69], [40, 68], [50, 69], [60, 69], [70, 73], [85, 74],
    [95, 76], [105, 77], [115, 74], [130, 72], [140, 72], [150, 70],
    [160, 69], [170, 67], [178, 66], [178, 64], [172, 61], [164, 59],
    [162, 56], [158, 52], [156, 51], [155, 57], [152, 59], [147, 59],
    [142, 54], [138, 52], [135, 45], [132, 43], [129, 42], [128, 39],
    [129, 36], [126, 34], [125, 38], [122, 39], [118, 38], [120, 35],
    [121, 32], [120, 28], [116, 23], [110, 20], [108, 16], [107, 11],
    [104, 9], [100, 13], [100, 8], [102, 3], [104, 1], [101, 3], [99, 7],
    [97, 13], [94, 16], [91, 22], [88, 22], [86, 20], [83, 17], [80, 13],
    [77, 8], [73, 15], [70, 21], [66, 25], [61, 25], [57, 26], [52, 25],
    [56, 22], [58, 20], [55, 17], [52, 14], [45, 13], [43, 13], [39, 21],
    [36, 28], [33, 30], [34, 33], [36, 36], [33, 36], [30, 36], [27, 37],
    [26, 39], [26, 41], [23, 40], [23, 37], [21, 39], [19, 42], [13, 45],
    [14, 44], [16, 42], [18, 40], [16, 38], [15, 40], [13, 41], [11, 43],
    [9, 44], [6, 43], [3, 43], [1, 41], [0, 39], [-2, 37], [-5, 36],
    [-9, 37],
  ],
  // スカンジナビア + フィンランド
  [
    [5, 58], [5, 61], [10, 63], [14, 66], [18, 69], [24, 71], [29, 70],
    [31, 66], [30, 62], [28, 60], [24, 60], [21, 61], [17, 61], [16, 58],
    [12, 56], [10, 59], [5, 58],
  ],
  // イギリス
  [
    [-5, 50], [-6, 53], [-6, 56], [-4, 59], [-2, 58], [-1, 54], [1, 52],
    [-2, 50], [-5, 50],
  ],
  // アイルランド
  [[-10, 52], [-10, 55], [-7, 55], [-6, 53], [-8, 51], [-10, 52]],
  // アイスランド
  [[-22, 64], [-20, 66], [-16, 66], [-14, 65], [-17, 63], [-22, 64]],
  // 日本（本州・九州）
  [
    [130, 31], [133, 34], [137, 35], [140, 35], [141, 38], [141, 41],
    [139, 40], [136, 36], [132, 34], [129, 32], [130, 31],
  ],
  // 日本（北海道）
  [[140, 42], [142, 45], [145, 45], [144, 42], [141, 41], [140, 42]],
  // 台湾
  [[120, 25], [122, 25], [121, 22], [120, 23], [120, 25]],
  // フィリピン
  [
    [120, 18], [122, 17], [123, 13], [125, 9], [126, 7], [123, 7],
    [121, 13], [119, 16], [120, 18],
  ],
  // スマトラ
  [[95, 5], [99, 3], [103, -1], [106, -5], [103, -5], [99, 0], [95, 3], [95, 5]],
  // ジャワ
  [[105, -6], [110, -7], [114, -8], [110, -8], [105, -7], [105, -6]],
  // ボルネオ
  [
    [109, 1], [110, 4], [114, 6], [118, 5], [119, 1], [116, -3], [111, -3],
    [109, 1],
  ],
  // スラウェシ
  [[119, 0], [121, 1], [123, 0], [122, -3], [120, -5], [119, -2], [119, 0]],
  // ニューギニア
  [
    [131, -1], [136, -2], [141, -3], [146, -6], [150, -9], [146, -8],
    [141, -7], [136, -5], [132, -3], [131, -1],
  ],
  // オーストラリア
  [
    [113, -22], [114, -26], [115, -32], [118, -35], [122, -34], [128, -32],
    [132, -32], [136, -35], [140, -38], [145, -38], [150, -37], [153, -32],
    [153, -27], [151, -24], [149, -20], [146, -17], [143, -13], [142, -11],
    [140, -17], [136, -12], [131, -12], [126, -14], [122, -18], [117, -21],
    [113, -22],
  ],
  // ニュージーランド
  [
    [173, -35], [176, -38], [178, -38], [175, -41], [172, -44], [168, -46],
    [170, -43], [172, -41], [174, -38], [173, -35],
  ],
  // マダガスカル
  [[44, -12], [47, -15], [50, -16], [48, -21], [45, -25], [43, -22], [43, -16], [44, -12]],
  // キューバ
  [[-85, 22], [-80, 23], [-75, 20], [-77, 20], [-82, 22], [-85, 22]],
];

const TOKYO: LonLat = [139.69, 35.69];

/** 東京をハブに世界を結ぶアーク（AIエンジニアとして世界とつながるメタファー） */
const ARCS: readonly { from: LonLat; to: LonLat; period: number; delay: number }[] = [
  { from: TOKYO, to: [-122.42, 37.77], period: 7, delay: 0 }, // San Francisco
  { from: TOKYO, to: [151.21, -33.87], period: 7, delay: 1.2 }, // Sydney
  { from: TOKYO, to: [-0.13, 51.51], period: 9, delay: 2.5 }, // London
  { from: TOKYO, to: [103.82, 1.35], period: 6, delay: 4.2 }, // Singapore
  { from: TOKYO, to: [-74.01, 40.71], period: 10, delay: 5.6 }, // New York
];

const CITY_VECS: readonly (readonly [number, number, number])[] = [
  TOKYO,
  [-122.42, 37.77],
  [151.21, -33.87],
  [-0.13, 51.51],
  [103.82, 1.35],
  [-74.01, 40.71],
].map((c) => lonLatToVec(c[0], c[1]));

function lonLatToVec(lon: number, lat: number): readonly [number, number, number] {
  const phi = lat * DEG;
  const lambda = lon * DEG;
  const c = Math.cos(phi);
  return [c * Math.sin(lambda), Math.sin(phi), c * Math.cos(lambda)];
}

function pointInPolygon(lon: number, lat: number, poly: readonly LonLat[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function isLand(lon: number, lat: number): boolean {
  if (lat <= -72) return true; // 南極
  return LAND_POLYGONS.some((poly) => pointInPolygon(lon, lat, poly));
}

// フィボナッチ球面格子で単位球をサンプリングし、陸地点のみ保持（単位ベクトル列）
let landCache: Float32Array | null = null;

function getLandPoints(): Float32Array {
  if (landCache) return landCache;
  const N = 26000;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts: number[] = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * i) / (N - 1);
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    if (isLand(Math.atan2(x, z) / DEG, Math.asin(y) / DEG)) {
      pts.push(x, y, z);
    }
  }
  landCache = new Float32Array(pts);
  return landCache;
}

const TILT = 18 * DEG; // 北半球をやや手前に傾ける
const SPIN = (2 * Math.PI) / 95; // 95秒で1自転
const THETA0 = -TOKYO[0] * DEG; // 初期表示で日本を正面に
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

        const a = lonLatToVec(arc.from[0], arc.from[1]);
        const b = lonLatToVec(arc.to[0], arc.to[1]);
        const [ax, ay, az] = rotate(a[0], a[1], a[2], cs, sn);
        const [bx, by, bz] = rotate(b[0], b[1], b[2], cs, sn);
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
