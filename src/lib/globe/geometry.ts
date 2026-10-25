import { LAND_POLYGONS, type LonLat } from "@/lib/globe/land";

export const DEG = Math.PI / 180;

/** 単位球上の点 [x, y, z]。y が北極、z > 0 が初期状態の手前 */
export type Vec3 = readonly [number, number, number];

export function lonLatToVec([lon, lat]: LonLat): Vec3 {
  const phi = lat * DEG;
  const lambda = lon * DEG;
  const c = Math.cos(phi);
  return [c * Math.sin(lambda), Math.sin(phi), c * Math.cos(lambda)];
}

export function pointInPolygon(lon: number, lat: number, poly: readonly LonLat[]): boolean {
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

export function isLand(lon: number, lat: number): boolean {
  if (lat <= -72) return true; // 南極
  return LAND_POLYGONS.some((poly) => pointInPolygon(lon, lat, poly));
}

// フィボナッチ球面格子で単位球をサンプリングし、陸地点のみ保持（単位ベクトル列）
let landCache: Float32Array | null = null;

export function getLandPoints(): Float32Array {
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
