import type { LonLat } from "@/lib/globe/land";

export type Route = {
  name: string;
  to: LonLat;
  /** 1 往路にかける秒数 */
  period: number;
  /** 開始の遅れ（秒）。アークが同時に光らないようずらす */
  delay: number;
};

export const HUB: LonLat = [139.69, 35.69]; // 東京

/** 東京をハブに世界を結ぶアーク（AIエンジニアとして世界とつながるメタファー） */
export const ROUTES: readonly Route[] = [
  { name: "San Francisco", to: [-122.42, 37.77], period: 7, delay: 0 },
  { name: "Sydney", to: [151.21, -33.87], period: 7, delay: 1.2 },
  { name: "London", to: [-0.13, 51.51], period: 9, delay: 2.5 },
  { name: "Singapore", to: [103.82, 1.35], period: 6, delay: 4.2 },
  { name: "New York", to: [-74.01, 40.71], period: 10, delay: 5.6 },
];
